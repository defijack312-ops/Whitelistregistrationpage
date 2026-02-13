import { Shield, Users, Sparkles, Trophy, Target, Heart } from 'lucide-react';

export function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">About the Project</h1>
          <div className="h-1 w-24 bg-yellow-500 mx-auto rounded mb-6" />
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Preserving the greatest moment in sports history — forever on-chain.
          </p>
        </div>
      </section>

      {/* The Story */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 sm:p-10 border-2 border-blue-600/30">
            <h2 className="text-3xl font-black text-gray-900 mb-6">The Miracle</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              On February 22, 1980, a group of college kids did the impossible — they defeated the
              Soviet Union's legendary hockey team at the Winter Olympics in Lake Placid. It wasn't
              just a game. It was a moment that united a nation and proved that belief can overcome
              any odds.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The Soviet team had won four consecutive Olympic gold medals. They were considered
              the greatest hockey team ever assembled. The American team, led by coach Herb Brooks,
              was the youngest in US Olympic hockey history — a squad of amateur and collegiate
              players who had been together for less than a year.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Against all odds, Team USA won 4-3. Two days later, they defeated Finland to clinch
              the gold medal. Al Michaels' iconic call — "Do you believe in miracles? YES!" — 
              became one of the most famous moments in broadcasting history.
            </p>
          </div>
        </div>
      </section>

      {/* The Mission */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 sm:p-10 border-2 border-blue-600/30">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The <strong>$1980 MIRACLE</strong> token commemorates this legacy by building a
              community-governed ecosystem dedicated to preserving and extending the cultural impact
              of the 1980 Olympic team. This is not an investment vehicle — it's a tribute built on
              blockchain technology to ensure the miracle lives on.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Through decentralized governance, Soulbound Token recognition, and community
              participation, we're creating a living, breathing monument to one of America's
              greatest sporting achievements — one that can never be taken down, altered, or
              forgotten.
            </p>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-10">Core Pillars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/95 backdrop-blur rounded-2xl p-6 text-center border-2 border-blue-400 shadow-lg">
              <Shield className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 text-lg mb-2">Legacy Preservation</h3>
              <p className="text-gray-600 text-sm">Community governance focused on honoring the 1980 team through educational content, events, and historical preservation initiatives.</p>
            </div>
            <div className="bg-white/95 backdrop-blur rounded-2xl p-6 text-center border-2 border-red-400 shadow-lg">
              <Users className="w-10 h-10 text-red-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 text-lg mb-2">Community First</h3>
              <p className="text-gray-600 text-sm">DAO-governed with a narrow scope to prevent speculation. Built by fans, for fans, with transparent on-chain operations.</p>
            </div>
            <div className="bg-white/95 backdrop-blur rounded-2xl p-6 text-center border-2 border-yellow-400 shadow-lg">
              <Sparkles className="w-10 h-10 text-yellow-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 text-lg mb-2">On-Chain Forever</h3>
              <p className="text-gray-600 text-sm">Built on Base blockchain with no pause function, no admin overrides — true decentralization that ensures the legacy endures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We're Building */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 sm:p-10 border-2 border-blue-600/30">
            <h2 className="text-3xl font-black text-gray-900 mb-6">What We're Building</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <Trophy className="w-6 h-6 text-yellow-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Soulbound Token Badges</h4>
                  <p className="text-gray-600 text-sm">Earn non-transferable legacy badges (Supporter, Team Player, All-Star, Legend) by contributing to the project.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Target className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">DAO Governance</h4>
                  <p className="text-gray-600 text-sm">Token holders participate in community decisions about events, grants, educational programs, and preservation efforts.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Heart className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Athlete & Legacy Fund</h4>
                  <p className="text-gray-600 text-sm">19.8% of the total supply is dedicated to the athletes and their families — honoring the people who made it happen.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Shield className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">True Decentralization</h4>
                  <p className="text-gray-600 text-sm">No pause function, no admin keys that can freeze your tokens. Once deployed, the contract belongs to the community.</p>
                </div>
              </div>
            </div>
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
