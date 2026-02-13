import { Link } from 'react-router-dom';
import { Coins, BarChart3, Star, Shield, Trophy, Zap, Vote, Gift, TrendingUp, ArrowRight, ArrowDown, ChevronRight } from 'lucide-react';

export function TokenomicsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Tokenomics</h1>
          <div className="h-1 w-24 bg-yellow-500 mx-auto rounded mb-6" />
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            A fixed supply, community-first token designed to preserve a legacy — not fuel speculation.
          </p>
        </div>
      </section>

      {/* Key Stats */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white/95 backdrop-blur rounded-xl p-5 text-center border-2 border-blue-600/30 shadow-lg">
              <Coins className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
              <p className="text-3xl font-black text-gray-900">1.98B</p>
              <p className="text-sm text-gray-600 mt-1">Total Supply</p>
            </div>
            <div className="bg-white/95 backdrop-blur rounded-xl p-5 text-center border-2 border-blue-600/30 shadow-lg">
              <p className="text-3xl font-black text-gray-900">$1980</p>
              <p className="text-sm text-gray-600 mt-1">Token Symbol</p>
            </div>
            <div className="bg-white/95 backdrop-blur rounded-xl p-5 text-center border-2 border-blue-600/30 shadow-lg">
              <p className="text-3xl font-black text-gray-900">Base</p>
              <p className="text-sm text-gray-600 mt-1">Blockchain</p>
            </div>
            <div className="bg-white/95 backdrop-blur rounded-xl p-5 text-center border-2 border-blue-600/30 shadow-lg">
              <Star className="w-6 h-6 text-red-600 mx-auto mb-2" />
              <p className="text-3xl font-black text-gray-900">1.98%</p>
              <p className="text-sm text-gray-600 mt-1">DEX Tax</p>
            </div>
          </div>
        </div>
      </section>

      {/* Distribution Breakdown */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 sm:p-10 border-2 border-blue-600/30">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Distribution Breakdown</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-bold text-gray-700">Allocation</th>
                    <th className="text-right py-3 px-4 font-bold text-gray-700">%</th>
                    <th className="text-right py-3 px-4 font-bold text-gray-700">Tokens</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-700">Vesting</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">Initial Access Sales</td>
                    <td className="text-right py-3 px-4">10%</td>
                    <td className="text-right py-3 px-4">198M</td>
                    <td className="py-3 px-4">No vesting</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">Future Access Sales</td>
                    <td className="text-right py-3 px-4">10%</td>
                    <td className="text-right py-3 px-4">198M</td>
                    <td className="py-3 px-4">No vesting</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">DAO Participation</td>
                    <td className="text-right py-3 px-4">15%</td>
                    <td className="text-right py-3 px-4">297M</td>
                    <td className="py-3 px-4">36–60 months</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">Athlete & Legacy</td>
                    <td className="text-right py-3 px-4">19.8%</td>
                    <td className="text-right py-3 px-4">392M</td>
                    <td className="py-3 px-4">12mo cliff, 48mo vest</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">Foundation & Ops</td>
                    <td className="text-right py-3 px-4">5.2%</td>
                    <td className="text-right py-3 px-4">103M</td>
                    <td className="py-3 px-4">48 months linear</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">Community Reserve</td>
                    <td className="text-right py-3 px-4">40%</td>
                    <td className="text-right py-3 px-4">792M</td>
                    <td className="py-3 px-4">Future use</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-yellow-50 rounded-xl p-5 border border-yellow-200">
              <p className="text-sm text-gray-700">
                <strong>Fixed supply.</strong> The total supply of 1.98 billion tokens is minted once at deployment and can never be increased. There is no mint function — what exists is all that will ever exist.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Token Utility & Benefits */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-10">Token Utility & Benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white/95 backdrop-blur rounded-2xl p-6 border-2 border-blue-600/30 shadow-lg">
              <div className="flex items-start gap-4">
                <Vote className="w-8 h-8 text-blue-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">DAO Governance Voting</h3>
                  <p className="text-gray-600 text-sm">Token holders vote on community proposals including budget allocation, grant distribution, events, educational content, and preservation initiatives.</p>
                </div>
              </div>
            </div>
            <div className="bg-white/95 backdrop-blur rounded-2xl p-6 border-2 border-blue-600/30 shadow-lg">
              <div className="flex items-start gap-4">
                <Trophy className="w-8 h-8 text-yellow-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Legacy Contributions</h3>
                  <p className="text-gray-600 text-sm">Use tokens to contribute to the legacy fund and earn non-transferable Soulbound Token badges that recognize your commitment level.</p>
                </div>
              </div>
            </div>
            <div className="bg-white/95 backdrop-blur rounded-2xl p-6 border-2 border-blue-600/30 shadow-lg">
              <div className="flex items-start gap-4">
                <Gift className="w-8 h-8 text-red-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Community Access</h3>
                  <p className="text-gray-600 text-sm">Holding $1980 tokens grants access to exclusive community channels, events, and content celebrating the Miracle on Ice legacy.</p>
                </div>
              </div>
            </div>
            <div className="bg-white/95 backdrop-blur rounded-2xl p-6 border-2 border-blue-600/30 shadow-lg">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-8 h-8 text-green-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Ecosystem Participation</h3>
                  <p className="text-gray-600 text-sm">Participate in future token sales, liquidity provision, and ecosystem activities. Early supporters shape the direction of the project.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEX Tax Explanation */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 sm:p-10 border-2 border-blue-600/30">
            <h2 className="text-3xl font-black text-gray-900 mb-6">1.98% DEX Tax</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Every trade on decentralized exchanges includes a 1.98% tax that flows directly to the DAO treasury. This creates a sustainable funding mechanism for the community without relying on donations or centralized revenue.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-200">
                <Zap className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <h4 className="font-bold text-gray-900 mb-1">Self-Sustaining</h4>
                <p className="text-xs text-gray-600">Tax revenue funds operations without selling reserves</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-200">
                <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <h4 className="font-bold text-gray-900 mb-1">Hard Cap: 5%</h4>
                <p className="text-xs text-gray-600">Tax can never exceed 5% — enforced by the smart contract</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-200">
                <BarChart3 className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <h4 className="font-bold text-gray-900 mb-1">Transparent</h4>
                <p className="text-xs text-gray-600">All tax revenue visible on-chain via Gnosis Safe treasury</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DAO Governance */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 sm:p-10 border-2 border-blue-600/30">
            <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" /> DAO Governance
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-3 text-lg">What the DAO controls:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2"><span className="text-green-500 mt-1">✓</span> Budget allocation & grant distribution</li>
                  <li className="flex items-start gap-2"><span className="text-green-500 mt-1">✓</span> Community events & gatherings</li>
                  <li className="flex items-start gap-2"><span className="text-green-500 mt-1">✓</span> Educational content & programs</li>
                  <li className="flex items-start gap-2"><span className="text-green-500 mt-1">✓</span> Historical preservation initiatives</li>
                  <li className="flex items-start gap-2"><span className="text-green-500 mt-1">✓</span> Partnerships & collaborations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-3 text-lg">What the DAO does NOT control:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2"><span className="text-red-500 mt-1">✕</span> Token price or market operations</li>
                  <li className="flex items-start gap-2"><span className="text-red-500 mt-1">✕</span> Liquidity tactics or trading strategy</li>
                  <li className="flex items-start gap-2"><span className="text-red-500 mt-1">✕</span> Athlete participation decisions</li>
                  <li className="flex items-start gap-2"><span className="text-red-500 mt-1">✕</span> Token contract modifications</li>
                  <li className="flex items-start gap-2"><span className="text-red-500 mt-1">✕</span> Pausing or freezing tokens</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SBT Upgrade Flow Diagram */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-4">Soulbound Token (SBT) Upgrade System</h2>
          <p className="text-center text-blue-200 mb-10 max-w-2xl mx-auto">
            Legacy contributions earn non-transferable Soulbound Tokens. Your badge upgrades as your cumulative contributions grow — and large contributions can generate multiple tokens through the overflow mechanism.
          </p>

          {/* Tier Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            <div className="bg-white/95 backdrop-blur rounded-xl p-5 text-center border-2 border-blue-400 shadow-lg">
              <div className="text-3xl mb-2">🔵</div>
              <h4 className="font-bold text-gray-900">Supporter</h4>
              <p className="text-xs text-gray-600 mt-1">Up to $10</p>
              <p className="text-xs text-blue-600 mt-2 font-semibold">Entry Level</p>
            </div>
            <div className="bg-white/95 backdrop-blur rounded-xl p-5 text-center border-2 border-amber-600 shadow-lg">
              <div className="text-3xl mb-2">🟤</div>
              <h4 className="font-bold text-gray-900">Team Player</h4>
              <p className="text-xs text-gray-600 mt-1">$10+</p>
              <p className="text-xs text-amber-700 mt-2 font-semibold">Growing Impact</p>
            </div>
            <div className="bg-white/95 backdrop-blur rounded-xl p-5 text-center border-2 border-gray-400 shadow-lg">
              <div className="text-3xl mb-2">⚪</div>
              <h4 className="font-bold text-gray-900">All-Star</h4>
              <p className="text-xs text-gray-600 mt-1">$25+</p>
              <p className="text-xs text-gray-600 mt-2 font-semibold">Dedicated Supporter</p>
            </div>
            <div className="bg-white/95 backdrop-blur rounded-xl p-5 text-center border-2 border-yellow-400 shadow-lg">
              <div className="text-3xl mb-2">🟡</div>
              <h4 className="font-bold text-gray-900">Legend</h4>
              <p className="text-xs text-gray-600 mt-1">$50+</p>
              <p className="text-xs text-yellow-600 mt-2 font-semibold">Legacy Champion</p>
            </div>
          </div>

          {/* Upgrade Flow Diagram */}
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 sm:p-10 border-2 border-blue-600/30">
            <h3 className="text-2xl font-black text-gray-900 mb-6 text-center">How SBT Upgrades Work</h3>
            
            {/* Flow Diagram */}
            <div className="space-y-4 max-w-lg mx-auto">
              {/* Step 1 */}
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">1</div>
                  <h4 className="font-bold text-gray-900">Make a Contribution</h4>
                </div>
                <p className="text-sm text-gray-600 ml-11">Contribute ETH or USDC via the Legacy Contributions page. Every contribution is tracked on-chain.</p>
              </div>

              <div className="flex justify-center"><ArrowDown className="w-5 h-5 text-white/60" /></div>

              {/* Step 2 */}
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">2</div>
                  <h4 className="font-bold text-gray-900">SBT Minted at Your Tier</h4>
                </div>
                <p className="text-sm text-gray-600 ml-11">Based on your cumulative contribution total, you receive an SBT at the matching tier. If you already have a lower-tier SBT, it upgrades automatically.</p>
              </div>

              <div className="flex justify-center"><ArrowDown className="w-5 h-5 text-white/60" /></div>

              {/* Step 3 */}
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">3</div>
                  <h4 className="font-bold text-gray-900">Keep Contributing to Level Up</h4>
                </div>
                <p className="text-sm text-gray-600 ml-11">Your contributions are cumulative. A $5 contribution followed by another $5 equals $10 total — enough to reach Team Player.</p>
              </div>

              <div className="flex justify-center"><ArrowDown className="w-5 h-5 text-white/60" /></div>

              {/* Step 4 - Overflow */}
              <div className="bg-yellow-50 rounded-xl p-5 border-2 border-yellow-400">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold text-sm shrink-0">⚡</div>
                  <h4 className="font-bold text-gray-900">Overflow Minting</h4>
                </div>
                <p className="text-sm text-gray-600 ml-11">Large contributions that exceed a tier threshold generate additional SBTs. For example, a $120 contribution creates 2 Legend SBTs ($50 each) plus an All-Star SBT for the remaining $20. This rewards generous contributors with multiple badges.</p>
              </div>
            </div>

            {/* Upgrade Path Visual */}
            <div className="mt-10 bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-4 text-center">Upgrade Path Example</h4>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
                <div className="text-center px-3">
                  <div className="text-2xl">🔵</div>
                  <p className="text-xs text-gray-600 mt-1">$5 first<br/>contribution</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 hidden sm:block" />
                <ArrowDown className="w-5 h-5 text-gray-400 sm:hidden" />
                <div className="text-center px-3">
                  <div className="text-2xl">🟤</div>
                  <p className="text-xs text-gray-600 mt-1">$5 more<br/>= $10 total</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 hidden sm:block" />
                <ArrowDown className="w-5 h-5 text-gray-400 sm:hidden" />
                <div className="text-center px-3">
                  <div className="text-2xl">⚪</div>
                  <p className="text-xs text-gray-600 mt-1">$15 more<br/>= $25 total</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 hidden sm:block" />
                <ArrowDown className="w-5 h-5 text-gray-400 sm:hidden" />
                <div className="text-center px-3">
                  <div className="text-2xl">🟡</div>
                  <p className="text-xs text-gray-600 mt-1">$25 more<br/>= $50 total</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center mt-4">Each upgrade replaces your previous SBT — you always hold your highest tier badge.</p>
            </div>

            {/* Key Properties */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                <p className="font-bold text-gray-900 text-sm">Non-Transferable</p>
                <p className="text-xs text-gray-600 mt-1">SBTs are soulbound — they can never be sold or transferred</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                <p className="font-bold text-gray-900 text-sm">Cumulative</p>
                <p className="text-xs text-gray-600 mt-1">All contributions stack — small amounts add up over time</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                <p className="font-bold text-gray-900 text-sm">On-Chain Proof</p>
                <p className="text-xs text-gray-600 mt-1">Your badge is permanent, verifiable proof of your support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Link to="/contribute" className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold py-4 px-8 rounded-xl transition-all shadow-lg text-lg inline-flex items-center gap-2">
            <Trophy className="w-5 h-5" /> Make a Legacy Contribution
          </Link>
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
    </>
  );
}
