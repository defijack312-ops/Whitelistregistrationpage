import { Link } from 'react-router-dom';
import { FileText, Download, CheckCircle, ArrowRight, Clock, Circle, Rocket, Trophy, Shield, Coins, BarChart3, Star, Users, Zap, Vote, MapPin, ArrowDown, ChevronRight } from 'lucide-react';

export function WhitepaperPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-bold text-yellow-400 tracking-widest uppercase mb-3">Official Program</p>
          <h1 className="text-6xl sm:text-7xl font-black text-white mb-2 drop-shadow-lg">$1980</h1>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Whitepaper</h2>
          <p className="text-lg text-blue-200 mb-2">Stewardship. Participation. Legacy.</p>
          <p className="text-sm text-white/50 mb-8">Base Network · v1.0 · February 2026</p>
          <a
            href="/1980_litepaper.pdf"
            download
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl transition-all border border-white/30 text-sm"
          >
            <Download className="w-4 h-4" /> Download PDF
          </a>
        </div>
      </section>

      {/* 1. Introduction */}
      <section className="pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 sm:p-10 border-2 border-blue-600/30">
            <h2 className="text-3xl font-black text-gray-900 mb-6">1. Introduction</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The $1980 ecosystem exists to steward and preserve the legacy of the 1980 U.S. Olympic Hockey Team through responsible coordination, cultural participation, and athlete-aligned initiatives.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The Miracle on Ice was more than a sporting event — it was a defining cultural moment. As the 50th anniversary approaches in 2030, $1980 exists to ensure this legacy is preserved digitally, physically, culturally, and intergenerationally.
            </p>
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <p className="text-gray-800 text-lg font-semibold">
                $1980 is not designed as a speculative instrument. It is a coordination layer that enables community participation around legacy initiatives in a transparent and disciplined manner.
              </p>
              <p className="text-blue-600 italic mt-4 font-semibold">"A coordination layer for preserving a moment."</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mission & Core Principles */}
      <section className="pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 sm:p-10 border-2 border-blue-600/30">
            <h2 className="text-3xl font-black text-gray-900 mb-4">2. Mission & Core Principles</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              To preserve, steward, and extend the legacy of the 1980 Olympic team through community governance, responsible funding, and athlete-approved initiatives.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">Stewardship Over Speculation</h4>
                <p className="text-sm text-gray-600">No yield. No profit promises. No price governance.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">Participation Over Promotion</h4>
                <p className="text-sm text-gray-600">Engagement is voluntary and opt-in.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">Legacy Before Liquidity</h4>
                <p className="text-sm text-gray-600">Physical and cultural preservation comes first.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">Deterministic Mechanics</h4>
                <p className="text-sm text-gray-600">No randomness. No hidden levers. No mid-stream rule changes.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 sm:col-span-2">
                <h4 className="font-bold text-gray-900 mb-2">Athlete Protection</h4>
                <p className="text-sm text-gray-600">No automation of personal obligations. No forced endorsements.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Token Overview */}
      <section className="pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 sm:p-10 border-2 border-blue-600/30">
            <h2 className="text-3xl font-black text-gray-900 mb-6">3. Token Overview</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                <p className="text-2xl font-black text-gray-900">$1980</p>
                <p className="text-xs text-gray-600 mt-1">Token Name</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                <p className="text-2xl font-black text-gray-900">Base</p>
                <p className="text-xs text-gray-600 mt-1">Network</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                <p className="text-2xl font-black text-gray-900">1.98B</p>
                <p className="text-xs text-gray-600 mt-1">Total Supply</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                <p className="text-2xl font-black text-gray-900">None</p>
                <p className="text-xs text-gray-600 mt-1">Inflation</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                <p className="text-lg font-bold text-gray-500">None</p>
                <p className="text-xs text-gray-600 mt-1">Rebasing</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                <p className="text-lg font-bold text-gray-500">None</p>
                <p className="text-xs text-gray-600 mt-1">Yield</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                <p className="text-lg font-bold text-gray-500">None</p>
                <p className="text-xs text-gray-600 mt-1">Revenue Share</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                <p className="text-lg font-bold text-gray-500">Fixed</p>
                <p className="text-xs text-gray-600 mt-1">Supply</p>
              </div>
            </div>
            <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-200">
              <p className="text-sm text-gray-700">
                $1980 does not represent equity, ownership, or financial rights. It is a governance and coordination token for legacy initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Tokenomics */}
      <section className="pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 sm:p-10 border-2 border-blue-600/30">
            <h2 className="text-3xl font-black text-gray-900 mb-6">4. Tokenomics</h2>
            <p className="text-gray-700 mb-6">Total Supply: <strong>1,980,000,000</strong></p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-bold text-gray-700">Category</th>
                    <th className="text-right py-3 px-4 font-bold text-gray-700">%</th>
                    <th className="text-right py-3 px-4 font-bold text-gray-700">Tokens</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-700">Vesting</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">DAO Treasury</td>
                    <td className="text-right py-3 px-4">40%</td>
                    <td className="text-right py-3 px-4">792,000,000</td>
                    <td className="py-3 px-4">Governed by DAO vote</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">Athlete & Legacy Treasury</td>
                    <td className="text-right py-3 px-4">19.8%</td>
                    <td className="text-right py-3 px-4">392,040,000</td>
                    <td className="py-3 px-4">25% at TGE, 75% monthly over 12mo</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">DAO Participation & Grants</td>
                    <td className="text-right py-3 px-4">15%</td>
                    <td className="text-right py-3 px-4">297,000,000</td>
                    <td className="py-3 px-4">3-mo cliff, 12-mo vest</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">Initial Access Sale</td>
                    <td className="text-right py-3 px-4">10%</td>
                    <td className="text-right py-3 px-4">198,000,000</td>
                    <td className="py-3 px-4">No vesting</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">Future Access Sales</td>
                    <td className="text-right py-3 px-4">10%</td>
                    <td className="text-right py-3 px-4">198,000,000</td>
                    <td className="py-3 px-4">No vesting</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">Foundation & Operations</td>
                    <td className="text-right py-3 px-4">5.2%</td>
                    <td className="text-right py-3 px-4">102,960,000</td>
                    <td className="py-3 px-4">24-month linear</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The MERC Gateway */}
      <section className="pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 sm:p-10 border-2 border-blue-600/30">
            <h2 className="text-3xl font-black text-gray-900 mb-6">5. The MERC Gateway</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              $1980 is not purchased directly with ETH or stablecoins. Access to the $1980 token sale is gated through MERC, a utility token on the Base network.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Participants first acquire MERC through supported trading pairs (ETH/MERC or USDC/MERC via Aerodrome DEX on Base), then use MERC to purchase $1980 tokens during access sale windows.
            </p>

            {/* Acquisition Flow */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="bg-blue-100 rounded-lg px-4 py-3 text-center border border-blue-200">
                <p className="font-bold text-gray-900 text-sm">ETH / USDC</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 hidden sm:block" />
              <ArrowDown className="w-5 h-5 text-gray-400 sm:hidden" />
              <div className="bg-yellow-100 rounded-lg px-4 py-3 text-center border border-yellow-300">
                <p className="font-bold text-gray-900 text-sm">Aerodrome DEX</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 hidden sm:block" />
              <ArrowDown className="w-5 h-5 text-gray-400 sm:hidden" />
              <div className="bg-green-100 rounded-lg px-4 py-3 text-center border border-green-200">
                <p className="font-bold text-gray-900 text-sm">MERC</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 hidden sm:block" />
              <ArrowDown className="w-5 h-5 text-gray-400 sm:hidden" />
              <div className="bg-red-100 rounded-lg px-4 py-3 text-center border border-red-200">
                <p className="font-bold text-gray-900 text-sm">$1980 Access Sale</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 hidden sm:block" />
              <ArrowDown className="w-5 h-5 text-gray-400 sm:hidden" />
              <div className="bg-blue-600 rounded-lg px-4 py-3 text-center">
                <p className="font-bold text-white text-sm">$1980 Token</p>
              </div>
            </div>

            <p className="text-gray-600 text-sm mt-6">
              This gateway creates a deliberate onboarding step that filters for intentional participants, establishes MERC as the settlement layer for all $1980 access sales, and aligns the ecosystem with the broader Liquid Mercury community.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Sale Mechanics */}
      <section className="pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 sm:p-10 border-2 border-blue-600/30">
            <h2 className="text-3xl font-black text-gray-900 mb-6">6. Sale Mechanics</h2>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Initial Access Sale</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              The initial access sale operates as a single, time-limited window with no tranches, no discounts, and one pricing model. Participants must be registered on the whitelist and hold MERC to participate.
            </p>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
              <div className="text-center mb-4">
                <p className="text-4xl font-black text-gray-900">$0.001</p>
                <p className="text-sm text-gray-600">USD Reference Per Token</p>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Pricing Doctrine</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                A one-time USD reference of $0.001 per $1980 token is used to determine the settlement rate. Settlement occurs in MERC. The MERC-to-$1980 ratio is determined on the day of sale so the USD reference equals $0.001. That ratio is then fixed. After the sale: no repricing, no oracle dependence, no mid-sale changes.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Future Access Sales</h3>
            <p className="text-gray-700 leading-relaxed">
              Future access sales are capped at 1–2% per window with strict annual limits and the same settlement rate. They are not reactive to market conditions. Access sales are distribution mechanisms — not primary funding.
            </p>
          </div>
        </div>
      </section>

      {/* 7. DAO Governance */}
      <section className="pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 sm:p-10 border-2 border-blue-600/30">
            <h2 className="text-3xl font-black text-gray-900 mb-6">7. DAO Governance</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The $1980 DAO governs budget allocation, initiative approval, grant distribution, and treasury oversight. Voting requires holding $1980 tokens on a one-token, one-vote basis.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-3">The DAO Governs:</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Budget allocation</li>
                  <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Initiative approval</li>
                  <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Grant distribution</li>
                  <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Treasury oversight</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-3">The DAO Does Not Govern:</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">✕</span> Token price</li>
                  <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">✕</span> Market making</li>
                  <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">✕</span> Liquidity support</li>
                  <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">✕</span> Athlete compensation</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 bg-blue-50 rounded-xl p-5 border border-blue-200">
              <p className="text-sm text-gray-700">This separation is intentional — the DAO's scope is limited to legacy stewardship, not financial engineering.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Funding Structure */}
      <section className="pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 sm:p-10 border-2 border-blue-600/30">
            <h2 className="text-3xl font-black text-gray-900 mb-6">8. Funding Structure</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">The ecosystem separates funding from token distribution.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 rounded-xl p-5 border border-green-200 text-center">
                <p className="text-sm font-bold text-green-700 uppercase tracking-wider mb-1">Primary</p>
                <p className="font-bold text-gray-900">Legacy Contributions</p>
                <p className="text-xs text-gray-600 mt-1">(non-dilutive)</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-200 text-center">
                <p className="text-3xl font-black text-gray-900">1.98%</p>
                <p className="font-bold text-gray-900">DEX Transaction Tax</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              The 1.98% transaction tax applies to DEX transfers only and is routed to the DAO Treasury to fund legacy initiatives, education, events, and preservation.
            </p>
            <div className="bg-red-50 rounded-xl p-5 border border-red-200">
              <p className="text-sm text-gray-700"><strong>The 1.98% tax is NOT used for:</strong> Price support, buybacks, or incentive programs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Legacy Contributions & SBTs */}
      <section className="pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 sm:p-10 border-2 border-blue-600/30">
            <h2 className="text-3xl font-black text-gray-900 mb-6">9. Legacy Contributions & SBTs</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Legacy Contributions are the primary funding mechanism for $1980 initiatives. Contributors donate USDC or ETH to the Legacy Contributions contract and receive a non-transferable Soulbound Token (SBT) that permanently records their participation on-chain.
            </p>

            {/* SBT Tier Table */}
            <h3 className="text-xl font-bold text-gray-900 mb-4">SBT Tier System</h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-bold text-gray-700">Tier</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-700">Badge</th>
                    <th className="text-right py-3 px-4 font-bold text-gray-700">USDC Threshold</th>
                    <th className="text-right py-3 px-4 font-bold text-gray-700">ETH Equivalent</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">Legend</td>
                    <td className="py-3 px-4">🟡 USA</td>
                    <td className="text-right py-3 px-4">≥ $25,000</td>
                    <td className="text-right py-3 px-4">Market rate</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">All-Star</td>
                    <td className="py-3 px-4">⚪ USA</td>
                    <td className="text-right py-3 px-4">≥ $5,000</td>
                    <td className="text-right py-3 px-4">Market rate</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">Team Player</td>
                    <td className="py-3 px-4">🟤 USA</td>
                    <td className="text-right py-3 px-4">≥ $1,000</td>
                    <td className="text-right py-3 px-4">Market rate</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">Supporter</td>
                    <td className="py-3 px-4">🔵 USA</td>
                    <td className="text-right py-3 px-4">Any amount</td>
                    <td className="text-right py-3 px-4">Any amount</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 mb-8">
              <h4 className="font-bold text-gray-900 mb-2">Price Feed & Staleness Protection</h4>
              <p className="text-sm text-gray-600">ETH contributions rely on a Chainlink price oracle to determine USD equivalence. The contract rejects ETH contributions if the price feed has not been updated within 24 hours. Contributors can always use USDC as a reliable fallback, which requires no price conversion.</p>
            </div>

            {/* Upgradeable Contributions */}
            <h3 className="text-xl font-bold text-gray-900 mb-4">Upgradeable Contributions</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Contributors are not required to reach any tier in a single transaction. A contributor might start with a $200 contribution (Supporter), add $800 more later (upgrading to Team Player), and continue building toward Legend status at their own pace.
            </p>

            {/* Upgrade Path Visual */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
              <div className="text-center px-4">
                <div className="text-2xl">🔵</div>
                <p className="text-xs text-gray-600 mt-1 font-semibold">$200<br/>Supporter</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 hidden sm:block" />
              <ArrowDown className="w-5 h-5 text-gray-400 sm:hidden" />
              <div className="text-center px-4">
                <div className="text-2xl">🟤</div>
                <p className="text-xs text-gray-600 mt-1 font-semibold">$1,000<br/>Team Player</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 hidden sm:block" />
              <ArrowDown className="w-5 h-5 text-gray-400 sm:hidden" />
              <div className="text-center px-4">
                <div className="text-2xl">⚪</div>
                <p className="text-xs text-gray-600 mt-1 font-semibold">$5,000<br/>All-Star</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 hidden sm:block" />
              <ArrowDown className="w-5 h-5 text-gray-400 sm:hidden" />
              <div className="text-center px-4">
                <div className="text-2xl">🟡</div>
                <p className="text-xs text-gray-600 mt-1 font-semibold">$25,000<br/>Legend</p>
              </div>
            </div>

            {/* Overflow Minting */}
            <h3 className="text-xl font-bold text-gray-900 mb-4">Overflow Minting</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When contributions push an SBT past the $25,000 Legend threshold, the system caps that SBT at Legend and mints a new SBT for the excess. The new SBT's tier is determined by the overflow amount.
            </p>
            <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-300 mb-8">
              <p className="font-bold text-gray-900 mb-2">Example: $30,000 Contribution</p>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-2xl">🟡</span><span className="text-sm text-gray-700 font-semibold">Legend ($25K)</span>
                <span className="text-gray-400">+</span>
                <span className="text-2xl">⚪</span><span className="text-sm text-gray-700 font-semibold">All-Star ($5K)</span>
              </div>
            </div>

            {/* Soulbound Properties */}
            <h3 className="text-xl font-bold text-gray-900 mb-4">Soulbound Properties</h3>
            <p className="text-gray-700 leading-relaxed">
              SBTs are non-transferable by design. They cannot be sold, traded, or moved between wallets. Each SBT is a permanent, on-chain record of contribution tied to the wallet that made it. This ensures that recognition reflects genuine participation, not secondary market activity.
            </p>
          </div>
        </div>
      </section>

      {/* 10. Miracle Statue Initiative */}
      <section className="pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 sm:p-10 border-2 border-blue-600/30">
            <h2 className="text-3xl font-black text-gray-900 mb-6">10. Miracle Statue Initiative</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The Miracle Statue Initiative is the first flagship initiative of the $1980 DAO. It supports the construction of the Miracle on Ice statue in Lake Placid ahead of the 50th anniversary in 2030.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The statue anchors the digital community to a permanent physical memorial — connecting on-chain participation to a tangible, enduring tribute.
            </p>
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 text-center">
              <p className="text-4xl font-black text-blue-600 mb-2">2030</p>
              <p className="text-gray-700 font-semibold">50th Anniversary</p>
              <p className="text-blue-600 italic mt-3">"Connecting on-chain participation to a tangible, enduring tribute."</p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Smart Contracts & Security */}
      <section className="pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 sm:p-10 border-2 border-blue-600/30">
            <h2 className="text-3xl font-black text-gray-900 mb-6">11. Smart Contracts & Security</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              All $1980 contracts are deployed on the Base network and built using industry-standard frameworks including OpenZeppelin libraries for access control, reentrancy protection, and ERC-721 compliance.
            </p>
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-1">MiracleOnIce1980</h4>
                <p className="text-sm text-gray-600">ERC-20 token contract with fixed supply and 1.98% DEX transfer tax</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-1">Token1980AccessSale</h4>
                <p className="text-sm text-gray-600">MERC-gated sale window management with whitelist verification</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-1">LegacyContributionsSBT</h4>
                <p className="text-sm text-gray-600">Soulbound token system with tiered badges, overflow minting, and Chainlink ETH/USD integration</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              The Legacy Contributions contract integrates a Chainlink ETH/USD price feed on Base for accurate ETH-to-USD conversion, with a 24-hour staleness check to ensure pricing integrity.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full">OpenZeppelin</span>
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full">Chainlink</span>
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full">Verified on BaseScan</span>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Roadmap */}
      <section className="pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-white text-center mb-10">12. Roadmap</h2>

          {/* Phase 1 */}
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
              <p className="text-gray-700">Governance finalization, whitelist registration, initial access sale preparation, and contract deployment on Base mainnet.</p>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="mb-8">
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 border-2 border-yellow-500/40">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-yellow-100 border-2 border-yellow-500 rounded-full flex items-center justify-center shrink-0">
                  <ArrowRight className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900">Phase 2 — Activation</h3>
                  <span className="text-sm font-bold text-yellow-700 bg-yellow-100 px-3 py-0.5 rounded-full">In Progress</span>
                </div>
              </div>
              <p className="text-gray-700">Legacy Contributions open, SBT minting live, initial liquidity provision, and public reporting established.</p>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="mb-8">
            <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 border-2 border-gray-300/40">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-100 border-2 border-gray-300 rounded-full flex items-center justify-center shrink-0">
                  <Circle className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900">Phase 3 — Building</h3>
                  <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-0.5 rounded-full">Upcoming</span>
                </div>
              </div>
              <p className="text-gray-700">Statue Initiative funding begins, DAO treasury operations active, community governance proposals enabled.</p>
            </div>
          </div>

          {/* Phase 4 */}
          <div className="mb-8">
            <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 border-2 border-gray-300/40">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-100 border-2 border-gray-300 rounded-full flex items-center justify-center shrink-0">
                  <Rocket className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900">Phase 4 — Legacy (2027–2030)</h3>
                  <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-0.5 rounded-full">Future</span>
                </div>
              </div>
              <p className="text-gray-700">Expansion of legacy initiatives, 50th anniversary coordination, statue completion, and long-term preservation.</p>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-block bg-white/95 rounded-xl px-8 py-4 border-2 border-yellow-400">
              <p className="text-3xl font-black text-gray-900">2030</p>
              <p className="text-sm text-gray-600">The goal. The legacy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 13. Long-Term Vision */}
      <section className="pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 sm:p-10 border-2 border-blue-600/30 text-center">
            <h2 className="text-3xl font-black text-gray-900 mb-8">13. Long-Term Vision</h2>
            <div className="space-y-4 text-gray-700 text-lg italic leading-relaxed max-w-2xl mx-auto">
              <p>$1980 is not a moment.</p>
              <p className="font-semibold text-gray-900">It is a coordination layer for preserving a moment.</p>
              <p>The DAO does not assign value to history. It provides a structured way for people to decide how they want to participate in preserving it.</p>
            </div>
            <div className="mt-8 space-y-2 text-lg font-bold text-blue-600">
              <p>Stewardship over speculation.</p>
              <p>Sacrifice over shortcuts.</p>
              <p>Participation over promotion.</p>
            </div>
            <p className="mt-8 text-gray-700 text-lg italic">The Miracle was improbable. Preserving it should not be.</p>
          </div>
        </div>
      </section>

      {/* Download + CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <a
            href="/1980_litepaper.pdf"
            download
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl transition-all border border-white/30 text-sm mb-8"
          >
            <Download className="w-4 h-4" /> Download PDF Version
          </a>
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
    </>
  );
}
