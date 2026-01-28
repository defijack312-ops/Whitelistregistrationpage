import { useEffect, useState } from 'react';

export function PrivyDiagnostic() {
  const [copied, setCopied] = useState(false);
  
  const currentOrigin = window.location.origin;
  const requiredOrigins = [
    currentOrigin,
    'https://figma.com',
    'https://www.figma.com',
  ];

  const copyToClipboard = () => {
    const text = requiredOrigins.join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    console.log('Required Privy origins:', requiredOrigins);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
        <div className="text-center mb-6">
          <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
            <svg className="w-12 h-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">
            Privy Configuration Required
          </h2>
          <p className="text-gray-600">
            The Privy iframe is blocked because your current domain isn't whitelisted
          </p>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-900">
            📋 Step-by-Step Fix:
          </h3>
          
          <ol className="space-y-3 text-sm text-gray-800">
            <li className="flex gap-3">
              <span className="font-bold text-yellow-600 flex-shrink-0">1.</span>
              <span>Go to <a href="https://dashboard.privy.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium">dashboard.privy.io</a></span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-yellow-600 flex-shrink-0">2.</span>
              <span>Select your app: <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">cmkydhjjw00y2lg0dmzcbjpde</code></span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-yellow-600 flex-shrink-0">3.</span>
              <span>Click <strong>"Settings"</strong> → <strong>"Web apps"</strong></span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-yellow-600 flex-shrink-0">4.</span>
              <span>Scroll to <strong>"Allowed origins"</strong></span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-yellow-600 flex-shrink-0">5.</span>
              <span>Add these URLs (click Copy button below)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-yellow-600 flex-shrink-0">6.</span>
              <span>Click <strong>"Save"</strong> or <strong>"Continue"</strong> at the bottom</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-yellow-600 flex-shrink-0">7.</span>
              <span>Refresh this page</span>
            </li>
          </ol>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wide">
              Add These Origins
            </span>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded transition-colors"
            >
              {copied ? '✓ Copied!' : 'Copy All'}
            </button>
          </div>
          <div className="space-y-2">
            {requiredOrigins.map((origin, index) => (
              <div key={index} className="bg-gray-800 rounded px-3 py-2 font-mono text-sm text-green-400 break-all">
                {origin}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-sm text-blue-900">
          <p className="font-bold mb-1">💡 Why is this happening?</p>
          <p>
            Privy uses an iframe for security, which requires explicit domain whitelisting. 
            Your Figma Make app runs on <code className="bg-blue-100 px-2 py-0.5 rounded font-mono text-xs">{currentOrigin}</code>, 
            which needs to be added to your Privy dashboard.
          </p>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          After saving in Privy dashboard, refresh this page
        </div>
      </div>
    </div>
  );
}
