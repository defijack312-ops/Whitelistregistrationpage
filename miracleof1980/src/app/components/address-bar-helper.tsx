export function AddressBarHelper() {
  return (
    <div className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 rounded-lg p-5 mb-4 shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-white rounded-full p-2">
          <span className="text-2xl">📍</span>
        </div>
        <p className="text-white font-bold text-lg">Where to Find the Correct URL:</p>
      </div>
      
      {/* Browser mockup */}
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden border-4 border-white/50">
        {/* Browser chrome */}
        <div className="bg-gray-200 px-4 py-2.5 flex items-center gap-3 border-b border-gray-300">
          <div className="flex gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer"></div>
          </div>
          <div className="text-xs text-gray-500 font-semibold">Browser Window</div>
        </div>
        
        {/* Address bar with animated arrow */}
        <div className="bg-gray-50 px-4 py-4 relative">
          {/* Animated arrow pointing to address bar */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-10">
            <div className="bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg animate-bounce">
              ☝️ COPY FROM HERE ☝️
            </div>
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-green-500 mx-auto"></div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-gray-500 text-lg">🔒</div>
            <div className="flex-1 bg-white rounded-lg px-4 py-3 border-4 border-green-500 shadow-inner relative overflow-hidden">
              {/* Glowing effect */}
              <div className="absolute inset-0 bg-green-500/10 animate-pulse"></div>
              
              <code className="text-base font-mono text-gray-900 font-semibold relative z-10 block">
                https://app-XXXXX.makeproxy-c.figma.site
              </code>
            </div>
            <div className="text-gray-400">⋯</div>
          </div>
        </div>
        
        {/* Fake page content */}
        <div className="bg-white px-4 py-3 border-t border-gray-200">
          <div className="h-2 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-2 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="mt-4 bg-black/20 rounded-lg p-4 backdrop-blur">
        <p className="text-white font-bold mb-2 flex items-center gap-2">
          <span className="text-xl">💡</span>
          How to Copy:
        </p>
        <ol className="text-white text-sm space-y-1.5 ml-7">
          <li><strong>1.</strong> Click in your browser's address bar (at the top)</li>
          <li><strong>2.</strong> Press <kbd className="bg-white/20 px-2 py-0.5 rounded font-mono">Ctrl+A</kbd> or <kbd className="bg-white/20 px-2 py-0.5 rounded font-mono">Cmd+A</kbd> to select all</li>
          <li><strong>3.</strong> Press <kbd className="bg-white/20 px-2 py-0.5 rounded font-mono">Ctrl+C</kbd> or <kbd className="bg-white/20 px-2 py-0.5 rounded font-mono">Cmd+C</kbd> to copy</li>
          <li><strong>4.</strong> Paste it into Privy Dashboard!</li>
        </ol>
      </div>
    </div>
  );
}
