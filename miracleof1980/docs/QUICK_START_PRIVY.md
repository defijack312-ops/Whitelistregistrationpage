# 🚀 Quick Start: Privy Setup for $1980 MIRACLE Whitelist

## ⚡ 2-Minute Setup

### Step 1: Get Your Privy App ID

1. Visit **https://dashboard.privy.io**
2. Sign up or log in
3. Click **"Create App"**
4. Name it: `$1980 MIRACLE Whitelist`
5. Copy your **App ID** (looks like: `clpxxxxxxxxxxxxx`)

### Step 2: Configure Your App in Privy Dashboard

In the Privy dashboard, configure:

#### **Login Methods** (Required)
- ✅ Enable: **Email**
- ✅ Enable: **Wallet**
- ✅ Enable: **Google** (optional, requires OAuth setup)
- ✅ Enable: **Twitter** (optional, requires OAuth setup)

#### **Chains** (Required)
- Set **Default Chain**: **Base** (Chain ID: 8453)
- Add to **Supported Chains**: **Base**

#### **Embedded Wallets** (Required)
- Enable: **Create wallet on login**
- Select: **"For users without wallets"**

#### **Allowed Domains** (Required)
Add your domains:
- `localhost` (for local development)
- Your production domain (e.g., `miracle1980.vercel.app`)

#### **Appearance** (Optional)
- **Theme**: Dark
- **Accent Color**: `#C9A227` (gold for MIRACLE branding)

### Step 3: Add App ID to Your Project

Create a file named `.env` in your project root:

```env
VITE_PRIVY_APP_ID=clpxxxxxxxxxxxxx
```

**Replace `clpxxxxxxxxxxxxx` with your actual App ID!**

### Step 4: Test It!

1. Run your app locally
2. Click **"Connect Wallet or Sign In"**
3. Try:
   - Email login (instant, no setup needed!)
   - Wallet connection (MetaMask, Coinbase, etc.)
   - Google/Twitter (if you configured OAuth)

---

## 🎯 What Users Will See

### Login Options:
1. **Email Magic Link** - Enter email, get magic link, done!
2. **Connect Wallet** - MetaMask, Coinbase, Rainbow, WalletConnect
3. **Google** - One-click sign-in with Google (if enabled)
4. **Twitter/X** - One-click sign-in with Twitter (if enabled)

### After Login:
- Wallet address auto-fills in the form
- Email auto-fills if they logged in via email/social
- They complete X profile field
- Submit to whitelist!

---

## 🔧 Optional: Social Login Setup

### Google OAuth (Optional)
Email and wallet login work WITHOUT this setup. Only do this if you want Google login:

1. In Privy dashboard, go to **Settings → Login Methods → Google**
2. Follow the guided setup (creates Google Cloud project)
3. Or follow: https://docs.privy.io/guide/guides/social-logins/google

### Twitter OAuth (Optional)
Email and wallet login work WITHOUT this setup. Only do this if you want Twitter login:

1. In Privy dashboard, go to **Settings → Login Methods → Twitter**
2. Follow the guided setup (creates Twitter OAuth app)
3. Or follow: https://docs.privy.io/guide/guides/social-logins/twitter

**Note:** I recommend starting with just Email + Wallet (zero setup), then adding social logins later if needed!

---

## ✅ Verification Checklist

After setup, verify:

- [ ] App ID is in `.env` file
- [ ] Email login is enabled in Privy dashboard
- [ ] Wallet login is enabled in Privy dashboard
- [ ] Base chain is set as default
- [ ] Your domain is in allowed domains list
- [ ] App loads without errors
- [ ] Can click "Connect Wallet or Sign In"
- [ ] Login modal appears with options
- [ ] Can test email login
- [ ] Can test wallet connection

---

## 🆘 Common Issues

### Issue: "Invalid App ID"
**Fix:** Check that `VITE_PRIVY_APP_ID` in `.env` matches your Privy dashboard App ID exactly.

### Issue: "Domain not allowed"
**Fix:** Add your domain to "Allowed Domains" in Privy dashboard Settings.

### Issue: Environment variable not loading
**Fix:** Restart your dev server after creating/updating `.env` file.

### Issue: Connect button doesn't do anything
**Fix:** Open browser console (F12) and check for errors. Likely an App ID or domain issue.

---

## 💰 Pricing Info

- **Free**: 1,000 monthly active users
- **Pro**: $99/month for more users
- See: https://www.privy.io/pricing

For a whitelist registration, the free tier should be plenty!

---

## 📚 Resources

- **Privy Dashboard**: https://dashboard.privy.io
- **Privy Docs**: https://docs.privy.io
- **Base Network**: https://base.org
- **Migration Guide**: See `PRIVY_MIGRATION.md` in this project

---

## 🎉 You're Done!

Once you've:
1. ✅ Created your Privy app
2. ✅ Added App ID to `.env`
3. ✅ Configured login methods
4. ✅ Added your domain

Your $1980 MIRACLE Whitelist is ready to accept registrations via wallet, email, Google, or Twitter! 🏒

**Test it now by clicking "Connect Wallet or Sign In"!**
