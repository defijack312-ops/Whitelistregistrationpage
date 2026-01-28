import { Copy, ExternalLink, AlertCircle, X } from 'lucide-react';
import { useState } from 'react';
import { AddressBarHelper } from './address-bar-helper';
import { URLDetector } from './url-detector';

const BANNER_DISMISSED_KEY = 'privy_oauth_banner_dismissed';

function getActualOrigin(): string {
  // Try to get the parent window's origin (the makeproxy URL)
  try {
    // If we're in an iframe, get the top-level window's URL
    if (window.top && window.top !== window.self) {
      // Try to access parent URL - this might fail due to cross-origin
      const parentUrl = window.top.location.href;
      const url = new URL(parentUrl);
      return url.origin;
    }
  } catch (e) {
    // Cross-origin restriction - can't access parent URL
    console.log('Cannot access parent URL due to cross-origin restrictions');
  }
  
  // Fallback to current origin
  return window.location.origin;
}

export function OAuthSetupBanner() {
  const [copied, setCopied] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    return localStorage.getItem(BANNER_DISMISSED_KEY) === 'true';
  });
  
  const currentOrigin = getActualOrigin();
  const isFigmaIframeUrl = currentOrigin.includes('figmaiframepreview');
  const privyAppId = import.meta.env.VITE_PRIVY_APP_ID || 'cmkydhjjw00y2lg0dmzcbjpde';
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentOrigin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openPrivyDashboard = () => {
    window.open('https://dashboard.privy.io', '_blank');
  };

  const dismissBanner = () => {
    localStorage.setItem(BANNER_DISMISSED_KEY, 'true');
    setDismissed(true);
  };

  // Log to console for easy access
  if (isFigmaIframeUrl) {
    console.log('🚨 PRIVY OAUTH SETUP - WARNING:');
    console.log('❌ Detected figmaiframepreview URL - DO NOT USE THIS:', currentOrigin);
    console.log('✅ Copy the URL from your browser\'s ADDRESS BAR instead!');
    console.log('   It should look like: https://app-XXXXX.makeproxy-c.figma.site');
  } else {
    console.log('🚨 PRIVY OAUTH SETUP REQUIRED:');
    console.log('Add this URL to Privy Dashboard → Settings → Allowed origins:');
    console.log(`✅ ${currentOrigin}`);
  }

  if (dismissed) {
    return null;
  }

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
      <div className="bg-red-600 border-4 border-red-800 rounded-2xl shadow-2xl p-6 text-white relative">
        {/* Dismiss button */}
        <button
          onClick={dismissBanner}
          className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1 transition-colors"
          title="Dismiss (you can still see the URL in browser console)"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex items-start gap-4">
          <AlertCircle className="w-8 h-8 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">🚨 OAuth Setup Required</h3>
            <p className="text-red-100 mb-4">
              Twitter/Google login requires adding <strong>THIS EXACT URL</strong> to Privy's allowed origins:
            </p>
            <p className="text-yellow-300 font-bold text-sm mb-2">
              ⚠️ Use the URL below, NOT the figmaiframepreview URL!
            </p>
            
            {/* URL to copy */}
            {isFigmaIframeUrl ? (
              <>
                <div className="bg-red-900/40 border-2 border-red-400 rounded-lg p-4 mb-4">
                  <p className="text-red-300 font-bold text-sm mb-3">
                    ❌ WRONG URL DETECTED - DO NOT USE THIS:
                  </p>
                  <div className="bg-black/40 rounded p-3">
                    <code className="text-red-300 font-mono text-sm break-all line-through opacity-60">
                      {currentOrigin}
                    </code>
                  </div>
                  <p className="text-red-200 text-xs mt-2">
                    ☝️ This is the iframe preview URL - it will NOT work!
                  </p>
                </div>
                
                <AddressBarHelper />
                
                <URLDetector />
              </>
            ) : (
              <div className="bg-yellow-400/20 border-2 border-yellow-400 rounded-lg p-4 mb-4">
                <p className="text-yellow-300 font-bold text-xs mb-2">
                  ⬇️ COPY THIS EXACT URL ⬇️
                </p>
                <div className="flex items-center justify-between gap-3">
                  <code className="text-yellow-300 font-mono text-base font-bold break-all">
                    {currentOrigin}
                  </code>
                  <button
                    onClick={copyToClipboard}
                    className="bg-yellow-400 text-black px-4 py-2 rounded-md font-bold hover:bg-yellow-300 transition-colors flex items-center gap-2 flex-shrink-0 shadow-lg"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? '✓ Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-black/30 rounded-lg p-4 mb-4 text-sm">
              <p className="font-bold mb-2">Quick Fix:</p>
              <ol className="list-decimal list-inside space-y-1 text-red-100">
                <li>Click "Open Privy Dashboard" below</li>
                <li>Go to Settings → Allowed origins</li>
                <li>
                  {isFigmaIframeUrl ? (
                    <div>
                      <strong className="text-yellow-300">Add BOTH of these URLs:</strong>
                      <ul className="list-disc list-inside ml-4 mt-1 space-y-0.5">
                        <li className="text-green-300">If you see a makeproxy URL in the detector above, use that</li>
                        <li className="text-yellow-300">Otherwise, add: <code className="bg-black/30 px-1">https://figma.com</code> and <code className="bg-black/30 px-1">https://www.figma.com</code></li>
                      </ul>
                    </div>
                  ) : (
                    <strong>Copy the URL from the yellow box above</strong>
                  )}
                </li>
                <li>In Privy, click "+ Add origin" and paste each URL</li>
                <li>Click Save, then hard refresh this page (Ctrl+Shift+R)</li>
              </ol>
              <div className="mt-3 pt-3 border-t border-red-400/30">
                <p className="text-yellow-300 font-semibold mb-1">✅ Valid URLs to add:</p>
                <div className="space-y-1">
                  <p className="text-green-300 font-mono text-xs">
                    • https://app-XXXXXXXXX.makeproxy-c.figma.site (best!)
                  </p>
                  <p className="text-yellow-300 font-mono text-xs">
                    • https://figma.com (if no makeproxy URL)
                  </p>
                  <p className="text-yellow-300 font-mono text-xs">
                    • https://www.figma.com (if no makeproxy URL)
                  </p>
                </div>
                <p className="text-red-300 font-semibold mt-2 mb-1">❌ Don't use:</p>
                <p className="text-red-300 font-mono text-xs line-through">
                  https://...figmaiframepreview.figma.site
                </p>
              </div>
            </div>

            {/* App ID for reference */}
            <p className="text-xs text-red-200 mb-4">
              App ID: <span className="font-mono">{privyAppId}</span>
            </p>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={openPrivyDashboard}
                className="bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 flex-1"
              >
                <ExternalLink className="w-5 h-5" />
                Open Privy Dashboard
              </button>
              <button
                onClick={dismissBanner}
                className="bg-black/40 text-white font-semibold px-4 py-3 rounded-lg hover:bg-black/60 transition-colors"
              >
                Dismiss
              </button>
            </div>
            <p className="text-xs text-red-200 mt-2">
              💡 Tip: After adding the URL and refreshing, this banner will go away!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
