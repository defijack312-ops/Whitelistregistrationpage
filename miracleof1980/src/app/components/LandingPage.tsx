import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PDFModal from './pdf-modal';
import { Users, Trophy, Star, Shield, Coins, BarChart3, FileText, ArrowRight, Sparkles } from 'lucide-react';

export function LandingPage() {
  const [showPDF, setShowPDF] = useState(false);
  const location = useLocation();

  // Scroll to hash section on load or hash change
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[85vh] flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl w-full text-center">
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-600 blur-2xl opacity-50 rounded-full scale-150" />
              <h1 className="relative text-8xl sm:text-9xl font-black text-white drop-shadow-2xl tracking-tight">1980</h1>
            </div>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white mb-4 drop-shadow-lg">Miracle on Ice</h2>
          <p className="text-xl sm:text-2xl text-blue-200 mb-3 font-semibold">"Do you believe in miracles?"</p>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
            Preserving the legacy of the greatest moment in sports history — forever on-chain.
            Join the community building a lasting tribute to the 1980 US Olympic Hockey Team.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/whitelist" className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold py-4 px-8 rounded-xl transition-all shadow-lg text-lg flex items-center gap-2">
              Join the Whitelist <ArrowRight className="w-5 h-5" />
            </Link>
            <button onClick={() => setShowPDF(true)} className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl transition-all border-2 border-white/30 text-lg cursor-pointer flex items-center gap-2">
              <FileText className="w-5 h-5" /> Read the Litepaper
            </button>
          </div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center border border-white/20">
              <p className="text-2xl font-black text-yellow-400">1.98B</p>
              <p className="text-xs text-blue-200 mt-1">Total Supply</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center border border-white/20">
              <p className="text-2xl font-black text-white">$1980</p>
              <p className="text-xs text-blue-200 mt-1">Token Ticker</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center border border-white/20">
              <p className="text-2xl font-black text-white">Base</p>
              <p className="text-xs text-blue-200 mt-1">Blockchain</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center border border-white/20">
              <p className="text-2xl font-black text-white">1.98%</p>
              <p className="text-xs text-blue-200 mt-1">DEX Tax</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section — Teaser */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">About the Project</h2>
            <div className="h-1 w-24 bg-yellow-500 mx-auto rounded" />
          </div>

          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 sm:p-10 border-2 border-blue-600/30">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              On February 22, 1980, a group of college kids did the impossible — they defeated the
              Soviet Union's legendary hockey team at the Winter Olympics in Lake Placid. The
              <strong> $1980 MIRACLE</strong> token commemorates this legacy by building a
              community-governed ecosystem to preserve and extend the cultural impact of that
              historic moment — forever on-chain.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-200">
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h4 className="font-bold text-gray-900 mb-1">Legacy Preservation</h4>
                <p className="text-sm text-gray-600">Community governance focused on honoring the 1980 team</p>
              </div>
              <div className="bg-red-50 rounded-xl p-5 text-center border border-red-200">
                <Users className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <h4 className="font-bold text-gray-900 mb-1">Community First</h4>
                <p className="text-sm text-gray-600">DAO-governed with narrow scope to prevent speculation</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-5 text-center border border-yellow-200">
                <Sparkles className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                <h4 className="font-bold text-gray-900 mb-1">On-Chain Forever</h4>
                <p className="text-sm text-gray-600">Built on Base blockchain with transparent operations</p>
              </div>
            </div>

            <div className="text-center">
              <Link to="/about" className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg">
                Learn More About the Project <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics Section — Teaser */}
      <section id="tokenomics" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Tokenomics</h2>
            <div className="h-1 w-24 bg-yellow-500 mx-auto rounded" />
          </div>

          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 sm:p-10 border-2 border-blue-600/30">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              A fixed supply of 1.98 billion tokens — minted once, never inflated. Community-governed through a DAO funded by a 1.98% DEX tax, with 19.8% reserved for athletes and their families.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 rounded-xl p-5 text-center border-2 border-gray-200">
                <Coins className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                <p className="text-3xl font-black text-gray-900">1.98B</p>
                <p className="text-sm text-gray-600 mt-1">Total Supply — Fixed Forever</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 text-center border-2 border-gray-200">
                <BarChart3 className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-3xl font-black text-gray-900">19.8%</p>
                <p className="text-sm text-gray-600 mt-1">Athlete & Legacy Fund</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 text-center border-2 border-gray-200">
                <Star className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <p className="text-3xl font-black text-gray-900">1.98%</p>
                <p className="text-sm text-gray-600 mt-1">DEX Tax — Funds DAO</p>
              </div>
            </div>

            <div className="text-center">
              <Link to="/tokenomics" className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg">
                View Full Tokenomics & SBT System <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Litepaper / Roadmap Teaser */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 sm:p-10 border-2 border-blue-600/30 text-center">
            <FileText className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-3xl font-black text-gray-900 mb-3">Litepaper & Roadmap</h2>
            <p className="text-gray-600 text-lg mb-6 max-w-xl mx-auto">
              Read our comprehensive litepaper and explore the full project roadmap — from foundation through expansion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setShowPDF(true)} className="bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer">
                <FileText className="w-5 h-5" /> View Litepaper
              </button>
              <Link to="/roadmap" className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                View Full Roadmap <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SBT Tiers Preview */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Legacy Contributions</h2>
            <p className="text-lg text-blue-200">Earn Soulbound Token badges by contributing to the legacy</p>
            <div className="h-1 w-24 bg-yellow-500 mx-auto rounded mt-4" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/95 backdrop-blur rounded-xl p-5 text-center border-2 border-blue-400 shadow-lg">
              <div className="text-3xl mb-2">🔵</div>
              <h4 className="font-bold text-gray-900">Supporter</h4>
              <p className="text-xs text-gray-600 mt-1">Up to $10</p>
            </div>
            <div className="bg-white/95 backdrop-blur rounded-xl p-5 text-center border-2 border-amber-600 shadow-lg">
              <div className="text-3xl mb-2">🟤</div>
              <h4 className="font-bold text-gray-900">Team Player</h4>
              <p className="text-xs text-gray-600 mt-1">$10+</p>
            </div>
            <div className="bg-white/95 backdrop-blur rounded-xl p-5 text-center border-2 border-gray-400 shadow-lg">
              <div className="text-3xl mb-2">⚪</div>
              <h4 className="font-bold text-gray-900">All-Star</h4>
              <p className="text-xs text-gray-600 mt-1">$25+</p>
            </div>
            <div className="bg-white/95 backdrop-blur rounded-xl p-5 text-center border-2 border-yellow-400 shadow-lg">
              <div className="text-3xl mb-2">🟡</div>
              <h4 className="font-bold text-gray-900">Legend</h4>
              <p className="text-xs text-gray-600 mt-1">$50+</p>
            </div>
          </div>

          <div className="text-center">
            <Link to="/contribute" className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold py-4 px-8 rounded-xl transition-all shadow-lg text-lg inline-flex items-center gap-2">
              <Trophy className="w-5 h-5" /> Make a Contribution
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/90 text-lg sm:text-xl font-bold italic drop-shadow-lg">"Do you believe in miracles?"</p>
          <p className="text-blue-200 text-sm mt-2">February 22, 1980 · Lake Placid, NY</p>
          <div className="mt-6 pt-4 border-t border-white/20">
            <p className="text-white/50 text-sm">© {new Date().getFullYear()} Miracle of 1980 LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* PDF Modal */}
      <PDFModal isOpen={showPDF} onClose={() => setShowPDF(false)} />
    </>
  );
}
