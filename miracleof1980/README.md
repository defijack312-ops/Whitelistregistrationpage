# $1980 MIRACLE Whitelist Registration

Community whitelist registration page for the 1980 Miracle token project.

## Features

- **Privy Authentication**: Email, wallet, Google, and Twitter login
- **Auto Wallet Creation**: Embedded wallets for users without one
- **Passcode Gate**: Exclusive access with invite codes
- **Supabase Backend**: Secure registration storage

## Live Site

- **Production**: [miracleof1980.com](https://miracleof1980.com)

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```
4. Add your Privy App ID to `.env`:
   ```
   VITE_PRIVY_APP_ID=your_privy_app_id
   ```
5. Start development server:
   ```bash
   npm run dev
   ```

## Deployment to Vercel

### Option 1: Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option 2: GitHub Integration

1. Push to GitHub
2. Import project in [vercel.com/new](https://vercel.com/new)
3. Add environment variables in Vercel dashboard:
   - `VITE_PRIVY_APP_ID`

### Domain Setup

After deployment, add your custom domain in Vercel:
1. Go to Project Settings → Domains
2. Add `miracleof1980.com`
3. Update DNS records at your registrar

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_PRIVY_APP_ID` | Yes | Your Privy application ID |
| `VITE_SUPABASE_PROJECT_ID` | No | Supabase project ID (has default) |
| `VITE_SUPABASE_ANON_KEY` | No | Supabase anon key (has default) |

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Privy (authentication)
- Supabase (backend)
- Wagmi/Viem (Web3)

## Privy Dashboard Setup

Make sure these are configured in [dashboard.privy.io](https://dashboard.privy.io):

1. **Allowed Origins**: Add `https://miracleof1980.com` and `http://localhost:5173`
2. **Login Methods**: Enable wallet, email, google, twitter
3. **OAuth Callbacks** (for Google/Twitter):
   - `https://auth.privy.io/api/v1/oauth/callback`
