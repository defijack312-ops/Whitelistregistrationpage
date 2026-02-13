import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
  'wallet',  // Always works - no setup needed
  'email',   // Always works - no setup needed
  // Uncomment after setting up OAuth in Privy dashboard:
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
            <Routes>
              <Route path="/" element={<WhitelistPage />} />
              <Route path="/sale" element={<TokenSale />} />
              <Route path="/contribute" element={<LegacyContribute />} />
            </Routes>
            <Analytics />
          </BrowserRouter>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
