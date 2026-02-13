# 🐦 Twitter OAuth Setup for Privy

## The Error You're Seeing

When you click "Sign in with Twitter" and get an error, it means Twitter OAuth hasn't been configured in your Privy dashboard yet.

## Quick Fix Options

### Option 1: Disable Twitter Login (Fastest)
If you don't need Twitter login, remove it from the config:

**In `/src/app/App.tsx`, change this:**
```typescript
loginMethods: ['wallet', 'email', 'google', 'twitter'],
```

**To this:**
```typescript
loginMethods: ['wallet', 'email'],
```

### Option 2: Set Up Twitter OAuth (Recommended for Full Features)

## How to Enable Twitter Login

### Step 1: Create a Twitter App

1. Go to **[Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)**
2. Sign in with your Twitter account
3. Click **"+ Create Project"** or **"+ Add App"**
4. Fill out the required information:
   - **App name**: `$1980 MIRACLE Whitelist`
   - **Description**: Whitelist registration for $1980 MIRACLE token
   - **Website**: Your makeproxy URL or production URL

### Step 2: Get OAuth 2.0 Credentials

1. In your Twitter app settings, go to **"User authentication settings"**
2. Click **"Set up"** 
3. Enable **"OAuth 2.0"**
4. Set the following:
   - **Type of App**: Web App
   - **Callback URL**: `https://auth.privy.io/api/v1/oauth/callback`
   - **Website URL**: Your app URL
5. Copy your **Client ID** and **Client Secret**

### Step 3: Configure in Privy Dashboard

1. Go to **[Privy Dashboard](https://dashboard.privy.io)**
2. Select your app: `cmkydhjjw00y2lg0dmzcbjpde`
3. Click **"Settings"** → **"Login methods"**
4. Find **"Twitter"** and click **"Configure"**
5. Paste your Twitter **Client ID** and **Client Secret**
6. Click **"Save"**

### Step 4: Test

1. Refresh your Figma Make page
2. Click **"Connect Wallet or Sign In"**
3. Click **"Continue with Twitter"**
4. Should redirect to Twitter and back successfully!

---

## Same Process for Google OAuth

If Google login also gives errors, follow the same process:

1. **[Google Cloud Console](https://console.cloud.google.com)**
2. Create OAuth 2.0 credentials
3. Add callback URL: `https://auth.privy.io/api/v1/oauth/callback`
4. Copy Client ID and Secret
5. Add to Privy Dashboard → Login methods → Google

---

## Current Login Methods Working

✅ **Wallet Connection** - Works immediately (no OAuth needed)
✅ **Email Login** - Works immediately (no OAuth needed)
⚠️ **Google Login** - Requires OAuth setup
⚠️ **Twitter Login** - Requires OAuth setup

---

## Recommended Approach

**For testing/MVP**: Use wallet + email only
**For production**: Set up all OAuth providers

Would you like me to remove Twitter/Google from the login methods, or do you want to set up OAuth?
