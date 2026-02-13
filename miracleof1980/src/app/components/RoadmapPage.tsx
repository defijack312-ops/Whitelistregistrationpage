import { useState } from 'react';
import { Link } from 'react-router-dom';
import PDFModal from './pdf-modal';
import { FileText, CheckCircle, ArrowRight, Clock, Circle, MapPin, Rocket, Users, Trophy, Shield, Zap } from 'lucide-react';

export function RoadmapPage() {
  const [showPDF, setShowPDF] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4 drop-shadow-lg">Litepaper & Roadmap</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto mb-8">
            Our complete vision for preserving the Miracle on Ice legacy — from foundation to expansion.
          </p>
          <button
            onClick={() => setShowPDF(true)}
            className="bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg text-lg inline-flex items-center gap-3 cursor-pointer"
          >
            <FileText className="w-6 h-6" /> Read the Full Litepaper
          </button>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">Project Roadmap</h2>
            <div className="h-1 w-24 bg-yellow-500 mx-auto rounded" />
          </div>

          {/* Phase 1 — Complete */}
          <div className="mb-8">
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 border-2 border-green-500/40">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-100 border-2 border-green-500 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900">Phase 1 — Foundation</h3>
                  <span className="text-sm font-bold text-green-600 bg-green-100 px-3 py-0.5 rounded-full">Complete</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Miracle of 1980 LLC</p>
                    <p className="text-sm text-gray-600">Wyoming-based legal entity established for corporate legitimacy</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Smart Contract Development</p>
                    <p className="text-sm text-gray-600">MiracleOnIce1980 token, Token1980AccessSale, and LegacyContributionsSBTv3 contracts built with Hardhat</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Litepaper Published</p>
                    <p className="text-sm text-gray-600">Comprehensive documentation covering tokenomics, sale mechanics, SBT rewards, and DAO governance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Whitelist Registration</p>
                    <p className="text-sm text-gray-600">Community registration site with Privy authentication and Supabase backend</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">SBT Reward System</p>
                    <p className="text-sm text-gray-600">Tiered Soulbound Token badges with overflow minting mechanics for legacy contributions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Testnet Deployment</p>
                    <p className="text-sm text-gray-600">All contracts deployed and tested on Base Sepolia testnet</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 2 — In Progress */}
          <div className="mb-8">
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 border-2 border-yellow-500/40">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-yellow-100 border-2 border-yellow-500 rounded-full flex items-center justify-center shrink-0">
                  <ArrowRight className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900">Phase 2 — Launch</h3>
                  <span className="text-sm font-bold text-yellow-700 bg-yellow-100 px-3 py-0.5 rounded-full">In Progress</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-yellow-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Mainnet Deployment</p>
                    <p className="text-sm text-gray-600">Deploying all smart contracts to Base mainnet — token, sale, and SBT contracts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-yellow-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Token Access Sale</p>
                    <p className="text-sm text-gray-600">Initial 10% distribution (198M tokens) via MERC settlement rail at fixed rate</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-yellow-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Liquidity Provision</p>
                    <p className="text-sm text-gray-600">$15–25K initial liquidity on Aerodrome DEX, MIRACLE/WETH or MIRACLE/USDC pairs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-yellow-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Security Review</p>
                    <p className="text-sm text-gray-600">Contract security evaluation via automated tools, LLM review, and community bug bounty program</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-yellow-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Community Building</p>
                    <p className="text-sm text-gray-600">Social media expansion on X/Twitter, potential Farcaster integration, email notifications for whitelist members</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-yellow-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Legal & Compliance</p>
                    <p className="text-sm text-gray-600">Terms of service, privacy policy, legal disclaimers, and regulatory compliance documentation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 3 — Upcoming */}
          <div className="mb-8">
            <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 border-2 border-gray-300/40">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-100 border-2 border-gray-300 rounded-full flex items-center justify-center shrink-0">
                  <Circle className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900">Phase 3 — Community</h3>
                  <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-0.5 rounded-full">Upcoming</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Circle className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">DAO Activation</p>
                    <p className="text-sm text-gray-600">Launch community governance with token-based voting on budget allocation and legacy preservation initiatives</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Circle className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Athlete Engagement</p>
                    <p className="text-sm text-gray-600">Outreach to 1980 US Olympic Hockey Team members for involvement and legacy partnership</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Circle className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Educational Programs</p>
                    <p className="text-sm text-gray-600">Historical content creation, documentary partnerships, and educational outreach about the 1980 miracle</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Circle className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Grant Distribution</p>
                    <p className="text-sm text-gray-600">DAO-governed grants for aligned projects, community events, and commemorative programs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 4 — Future */}
          <div className="mb-8">
            <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 border-2 border-gray-300/40">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-100 border-2 border-gray-300 rounded-full flex items-center justify-center shrink-0">
                  <Rocket className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900">Phase 4 — Expansion</h3>
                  <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-0.5 rounded-full">Future</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Circle className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Cross-Platform Community</p>
                    <p className="text-sm text-gray-600">Expand presence across Discord, Telegram, Farcaster, and other community platforms</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Circle className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Strategic Partnerships</p>
                    <p className="text-sm text-gray-600">Collaborations with sports organizations, museums, and cultural institutions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Circle className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Commemorative Events</p>
                    <p className="text-sm text-gray-600">Annual celebrations, reunions, and community gatherings honoring the 1980 team</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Circle className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Expanded DAO Scope</p>
                    <p className="text-sm text-gray-600">Community-voted expansion of governance scope based on project maturity and participation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA + Footer */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-black text-white mb-4">Ready to Join the Legacy?</h3>
          <p className="text-lg text-blue-200 mb-8">Be part of the community preserving the greatest moment in sports history.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/whitelist" className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold py-4 px-8 rounded-xl transition-all shadow-lg text-lg inline-flex items-center justify-center gap-2">
              Join the Whitelist <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/contribute" className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl transition-all border-2 border-white/30 text-lg inline-flex items-center justify-center gap-2">
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

      <PDFModal isOpen={showPDF} onClose={() => setShowPDF(false)} />
    </>
  );
}
