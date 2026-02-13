import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandingPage } from './components/LandingPage';
import { RoadmapPage } from './components/RoadmapPage';
import { WhitelistPage } from '@/app/components/whitelist-page';
import { TokenSale } from './components/token-sale';
import { LegacyContribute } from './components/legacy-contribute';
import { Analytics } from '@vercel/analytics/react';

// Create Wagmi config for Privy
const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
});

const queryClient = new QueryClient();

// Get Privy App ID from environment variable
const privyAppId = import.meta.env.VITE_PRIVY_APP_ID || 'cmkydhjjw00y2lg0dmzcbjpde';

// Login methods configuration
const loginMethods: ('wallet' | 'email' | 'google' | 'twitter')[] = [
  'wallet',
  'email',
  'google',
  'twitter',
];

export default function App() {
  return (
    <PrivyProvider
      appId={privyAppId}
      config={{
        appearance: {
          theme: 'dark',
          accentColor: '#C9A227',
        },
        loginMethods,
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
        defaultChain: base,
        supportedChains: [base],
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/whitelist" element={<WhitelistPage />} />
                <Route path="/dashboard" element={<WhitelistPage />} />
                <Route path="/sale" element={<TokenSale />} />
                <Route path="/contribute" element={<LegacyContribute />} />
                <Route path="/roadmap" element={<RoadmapPage />} />
              </Routes>
            </Layout>
            <Analytics />
          </BrowserRouter>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
