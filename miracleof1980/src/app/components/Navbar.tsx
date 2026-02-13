import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { Wallet, ChevronDown, Menu, X, Loader2 } from 'lucide-react';

export function Navbar() {
  const { login, logout, authenticated, ready } = usePrivy();
  const { wallets } = useWallets();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [whitelistOpen, setWhitelistOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const externalWallet = wallets.find(w => w.walletClientType !== 'privy');
  const address = externalWallet?.address || wallets[0]?.address;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setWhitelistOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setWhitelistOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;
  const isHashActive = (hash: string) => location.pathname === '/' && location.hash === hash;

  const navLinkClass = (active: boolean) =>
    `px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
      active ? 'text-yellow-400 bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-3xl font-black text-white tracking-tight">1980</span>
            <span className="hidden sm:block text-xs text-blue-300 font-semibold leading-tight">MIRACLE<br/>ON ICE</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            <Link to="/" className={navLinkClass(isActive('/') && !location.hash)}>Home</Link>

            {/* Whitelist Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setWhitelistOpen(!whitelistOpen)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 ${
                  isActive('/whitelist') || isActive('/dashboard') ? 'text-yellow-400 bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Whitelist <ChevronDown className={`w-3.5 h-3.5 transition-transform ${whitelistOpen ? 'rotate-180' : ''}`} />
              </button>
              {whitelistOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-gray-900/95 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl overflow-hidden">
                  <Link to="/whitelist" className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors">
                    Register
                  </Link>
                  <Link to="/dashboard" className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors border-t border-white/5">
                    Manage Wallet
                  </Link>
                </div>
              )}
            </div>

            <Link to="/sale" className={navLinkClass(isActive('/sale'))}>Token Sale</Link>
            <Link to="/#about" className={navLinkClass(isHashActive('#about'))}>About</Link>
            <Link to="/#tokenomics" className={navLinkClass(isHashActive('#tokenomics'))}>Tokenomics</Link>
            <Link to="/roadmap" className={navLinkClass(isActive('/roadmap'))}>Litepaper</Link>
            <Link to="/contribute" className={navLinkClass(isActive('/contribute'))}>Contribute</Link>
          </div>

          {/* Wallet Button + Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Wallet */}
            <div className="hidden sm:block">
              {!ready ? (
                <div className="bg-white/10 rounded-xl px-4 py-2 text-gray-400 text-sm flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading...
                </div>
              ) : !authenticated ? (
                <button onClick={login} className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold py-2 px-5 rounded-xl transition-all flex items-center gap-2 text-sm shadow-lg">
                  <Wallet className="w-4 h-4" /> Connect
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
                  <Wallet className="w-4 h-4 text-yellow-500" />
                  <span className="text-white font-mono text-xs">{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '...'}</span>
                  <button onClick={() => logout()} className="text-gray-400 hover:text-white text-xs ml-1 transition-colors">✕</button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-white/80 hover:text-white transition-colors">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-gray-900/95 backdrop-blur-lg border-t border-white/10">
          <div className="px-4 py-3 space-y-1">
            <Link to="/" className={`block ${navLinkClass(isActive('/') && !location.hash)}`}>Home</Link>
            <div className="text-xs text-white/40 uppercase tracking-wider px-3 pt-3 pb-1">Whitelist</div>
            <Link to="/whitelist" className={`block ${navLinkClass(isActive('/whitelist'))} pl-6`}>Register</Link>
            <Link to="/dashboard" className={`block ${navLinkClass(isActive('/dashboard'))} pl-6`}>Manage Wallet</Link>
            <Link to="/sale" className={`block ${navLinkClass(isActive('/sale'))}`}>Token Sale</Link>
            <Link to="/#about" className={`block ${navLinkClass(false)}`}>About</Link>
            <Link to="/#tokenomics" className={`block ${navLinkClass(false)}`}>Tokenomics</Link>
            <Link to="/roadmap" className={`block ${navLinkClass(isActive('/roadmap'))}`}>Litepaper</Link>
            <Link to="/contribute" className={`block ${navLinkClass(isActive('/contribute'))}`}>Contribute</Link>

            {/* Mobile Wallet */}
            <div className="pt-3 border-t border-white/10">
              {!ready ? (
                <div className="text-gray-400 text-sm flex items-center gap-2 px-3 py-2"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading...</div>
              ) : !authenticated ? (
                <button onClick={login} className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm">
                  <Wallet className="w-4 h-4" /> Connect Wallet
                </button>
              ) : (
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-yellow-500" />
                    <span className="text-white font-mono text-xs">{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '...'}</span>
                  </div>
                  <button onClick={() => logout()} className="text-gray-400 hover:text-white text-xs transition-colors">Disconnect</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
