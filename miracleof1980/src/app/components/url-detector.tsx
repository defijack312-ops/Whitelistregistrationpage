import { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';

export function URLDetector() {
  const [urls, setUrls] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const detectedUrls: string[] = [];

    // Current window URL
    detectedUrls.push(`Current: ${window.location.href}`);
    detectedUrls.push(`Origin: ${window.location.origin}`);

    // Try to get parent/top URLs
    try {
      if (window.parent && window.parent !== window) {
        detectedUrls.push(`Parent: ${window.parent.location.href}`);
      }
    } catch (e) {
      detectedUrls.push(`Parent: [Cross-origin - cannot access]`);
    }

    try {
      if (window.top && window.top !== window) {
        detectedUrls.push(`Top: ${window.top.location.href}`);
      }
    } catch (e) {
      detectedUrls.push(`Top: [Cross-origin - cannot access]`);
    }

    // Check document referrer
    if (document.referrer) {
      detectedUrls.push(`Referrer: ${document.referrer}`);
    }

    setUrls(detectedUrls);

    // Log to console
    console.log('🔍 URL DETECTION:');
    detectedUrls.forEach(url => console.log(url));
  }, []);

  const copyUrl = (url: string) => {
    // Extract just the origin from the URL string
    const match = url.match(/https?:\/\/[^\s]+/);
    if (match) {
      const fullUrl = match[0];
      const origin = new URL(fullUrl).origin;
      navigator.clipboard.writeText(origin);
      setCopied(origin);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  return (
    <div className="bg-blue-600 border-2 border-blue-800 rounded-lg p-4 mb-4">
      <h4 className="text-white font-bold mb-2">🔍 URL Detector</h4>
      <p className="text-blue-100 text-sm mb-3">
        Here are all the URLs I can detect. Look for one with "makeproxy" or copy the Figma URL:
      </p>
      <div className="space-y-2">
        {urls.map((url, i) => {
          const hasMakeproxy = url.includes('makeproxy');
          const hasFigma = url.includes('figma.com');
          const isCrossOrigin = url.includes('[Cross-origin');
          
          return (
            <div
              key={i}
              className={`p-2 rounded text-sm font-mono ${
                hasMakeproxy
                  ? 'bg-green-500 text-white font-bold'
                  : hasFigma
                  ? 'bg-yellow-500/20 text-yellow-200'
                  : isCrossOrigin
                  ? 'bg-red-500/20 text-red-200'
                  : 'bg-black/30 text-gray-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="break-all flex-1">
                  {hasMakeproxy && <span className="text-xs mr-2">✅</span>}
                  {url}
                </div>
                {!isCrossOrigin && (
                  <button
                    onClick={() => copyUrl(url)}
                    className="bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded text-xs flex items-center gap-1 flex-shrink-0"
                  >
                    <Copy className="w-3 h-3" />
                    {copied && url.includes(copied) ? '✓' : 'Copy'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-blue-200 text-xs mt-3">
        💡 Green = Makeproxy URL (best!), Yellow = Figma URL (also works), Red = Can't access
      </p>
    </div>
  );
}
