import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

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

// Submit whitelist registration
app.post("/make-server-6849dabd/register", async (c) => {
  try {
    const { walletAddress, xProfile, email, inviteCode } = await c.req.json();

    if (!walletAddress || !xProfile || !email) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const registrationData = {
      walletAddress,
      xProfile,
      email,
      inviteCode,
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

Deno.serve(app.fetch);