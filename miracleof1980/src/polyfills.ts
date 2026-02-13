// Polyfills for browser compatibility
// This file must be imported before any web3 libraries load

import { Buffer } from 'buffer';

// Set Buffer globally for web3 libraries that expect Node.js Buffer
window.Buffer = Buffer;
