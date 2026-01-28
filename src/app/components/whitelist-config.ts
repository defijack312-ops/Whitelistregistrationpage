// Whitelist Configuration
export const WHITELIST_CONFIG = {
  // Set to false to disable the passcode gate entirely
  gateEnabled: true,
  
  // OPTION 1: Use a single passcode for everyone
  useSinglePasscode: true,
  singlePasscode: '0891MIRACLE',
  
  // OPTION 2: Use individual invite codes (set useSinglePasscode to false)
  validInviteCodes: [
    'HERB-BROOKS-2024',
    'MIRACLE-ON-ICE',
    'USA-HOCKEY-80',
    'LAKE-PLACID-VIP',
    'DO-YOU-BELIEVE',
  ],
  
  // Whether to remember the passcode in browser (so users don't need to re-enter)
  rememberPasscode: true,
};

// Helper function to validate passcode
export function validatePasscode(code: string): boolean {
  const upperCode = code.toUpperCase().trim();
  
  if (WHITELIST_CONFIG.useSinglePasscode) {
    return upperCode === WHITELIST_CONFIG.singlePasscode.toUpperCase();
  } else {
    return WHITELIST_CONFIG.validInviteCodes
      .map(c => c.toUpperCase())
      .includes(upperCode);
  }
}

// Helper to mark a code as used (for tracking purposes)
export function markCodeAsUsed(code: string) {
  // You can implement this to track used codes in your database
  console.log('Code used:', code);
}
