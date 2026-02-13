import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.ts";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-6849dabd/health", (c) => {
  return c.json({ status: "ok" });
});

// Check if wallet is already registered
app.post("/make-server-6849dabd/check-registration", async (c) => {
  try {
    const { walletAddress } = await c.req.json();

    if (!walletAddress) {
      return c.json({ error: "Missing wallet address" }, 400);
    }

    const registration = await kv.get(`registration:${walletAddress.toLowerCase()}`);

    if (registration) {
      return c.json({
        isRegistered: true,
        registrationDate: registration.timestamp,
        email: registration.email,
        xProfile: registration.xProfile,
        xVerified: registration.xVerified || false,
        status: registration.status || 'pending',
      });
    } else {
      return c.json({
        isRegistered: false,
      });
    }
  } catch (error) {
    console.log(`Error in check-registration endpoint: ${error}`);
    return c.json({ error: "Server error checking registration" }, 500);
  }
});

// Submit whitelist registration
app.post("/make-server-6849dabd/register", async (c) => {
  try {
    const { walletAddress, xProfile, email, inviteCode } = await c.req.json();

    if (!walletAddress || !xProfile || !email) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Check if already registered
    const existingRegistration = await kv.get(`registration:${walletAddress.toLowerCase()}`);
    if (existingRegistration) {
      return c.json({ 
        error: "This wallet is already registered for the whitelist",
        alreadyRegistered: true 
      }, 400);
    }

    const registrationData = {
      walletAddress,
      xProfile,
      email,
      inviteCode,
      xVerified: false,
      status: 'pending',
      timestamp: new Date().toISOString(),
    };

    // Store registration
    await kv.set(`registration:${walletAddress.toLowerCase()}`, registrationData);

    // Also index by X username for easy lookup
    await kv.set(`registration_by_x:${xProfile.toLowerCase().replace('@', '')}`, registrationData);

    return c.json({
      success: true,
      message: "Successfully registered for whitelist",
    });
  } catch (error) {
    console.log(`Error in register endpoint: ${error}`);
    return c.json({ error: "Server error during registration" }, 500);
  }
});

// Verify X account - update registration with verified X handle
app.post("/make-server-6849dabd/verify-x", async (c) => {
  try {
    const { walletAddress, verifiedXHandle } = await c.req.json();

    if (!walletAddress || !verifiedXHandle) {
      return c.json({ error: "Missing wallet address or verified X handle" }, 400);
    }

    // Get existing registration
    const registration = await kv.get(`registration:${walletAddress.toLowerCase()}`);
    
    if (!registration) {
      return c.json({ error: "Registration not found" }, 404);
    }

    // Store old X profile index key for cleanup
    const oldXKey = `registration_by_x:${registration.xProfile.toLowerCase().replace('@', '')}`;

    // Update registration with verified X handle
    const updatedRegistration = {
      ...registration,
      xProfile: verifiedXHandle,
      xVerified: true,
      xVerifiedAt: new Date().toISOString(),
    };

    // Save updated registration
    await kv.set(`registration:${walletAddress.toLowerCase()}`, updatedRegistration);

    // Update X username index (delete old, add new)
    await kv.delete(oldXKey);
    await kv.set(`registration_by_x:${verifiedXHandle.toLowerCase().replace('@', '')}`, updatedRegistration);

    return c.json({
      success: true,
      message: "X account verified successfully",
      xProfile: verifiedXHandle,
      xVerified: true,
    });
  } catch (error) {
    console.log(`Error in verify-x endpoint: ${error}`);
    return c.json({ error: "Server error verifying X account" }, 500);
  }
});

Deno.serve(app.fetch);
