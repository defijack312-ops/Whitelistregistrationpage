# Whitelist Configuration Guide

## 🚀 New: Privy Authentication Setup

**We've migrated from RainbowKit to Privy!** This enables:
- ✅ Wallet connections (MetaMask, Coinbase, etc.)
- ✅ Email magic link login
- ✅ Google OAuth login
- ✅ Twitter OAuth login

**👉 See `QUICK_START_PRIVY.md` for 2-minute setup guide!**

---

## Passcode Gate Configuration

### Quick Setup

The passcode gate is configured in `/src/app/components/whitelist-config.ts`

## Configuration Options

### 1. Enable/Disable the Gate

```typescript
gateEnabled: true,  // Set to false to completely disable passcode requirement
```

**To disable the gate entirely:** Change `gateEnabled` to `false` and users can access the whitelist form directly.

### 2. Single Passcode Mode (Default)

Use one passcode that everyone can use:

```typescript
useSinglePasscode: true,
singlePasscode: 'MIRACLE1980',  // Change this to your desired code
```

### 3. Individual Invite Codes Mode

Use unique codes for different users/groups:

```typescript
useSinglePasscode: false,  // Switch to invite code mode
validInviteCodes: [
  'HERB-BROOKS-2024',
  'MIRACLE-ON-ICE',
  'USA-HOCKEY-80',
  'LAKE-PLACID-VIP',
  'DO-YOU-BELIEVE',
  // Add more codes as needed
],
```

### 4. Remember Passcode

```typescript
rememberPasscode: true,  // Users won't need to re-enter on return visits
```

## Common Scenarios

### Scenario 1: Launch with Passcode, Remove Later

**Phase 1 - Private Launch:**
```typescript
gateEnabled: true,
useSinglePasscode: true,
singlePasscode: 'EARLYACCESS2024',
```

**Phase 2 - Public Launch:**
```typescript
gateEnabled: false,  // Just change this one line!
```

### Scenario 2: Different Codes for Different Groups

```typescript
useSinglePasscode: false,
validInviteCodes: [
  'VIP-FOUNDERS-2024',      // For founders
  'DISCORD-OG-MEMBER',      // For Discord OGs
  'TWITTER-EARLY-BIRD',     // For Twitter followers
  'NFT-HOLDER-BONUS',       // For NFT holders
],
```

### Scenario 3: Temporary Code Rotation

You can change the codes anytime:

```typescript
// Week 1
singlePasscode: 'WEEK1-MIRACLE',

// Week 2 - just update the code
singlePasscode: 'WEEK2-HOCKEY',
```

## Tracking Used Codes

The system logs when codes are used. To implement database tracking, modify the `markCodeAsUsed` function:

```typescript
export function markCodeAsUsed(code: string) {
  // Add your database call here
  console.log('Code used:', code);
  
  // Example:
  // await fetch('/api/track-code', {
  //   method: 'POST',
  //   body: JSON.stringify({ code, timestamp: new Date() })
  // });
}
```

## Security Notes

- Codes are case-insensitive (automatically converted to uppercase)
- Whitespace is automatically trimmed
- Codes are stored in localStorage if `rememberPasscode` is true
- To revoke access, users can clear browser data or you can change the code

## Testing

Current default code: **MIRACLE1980**

Test it by:
1. Opening the app
2. Entering "MIRACLE1980" (or "miracle1980" - case doesn't matter)
3. You should gain access to the whitelist form
