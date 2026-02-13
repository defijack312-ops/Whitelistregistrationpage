import { useState, useEffect } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { Link } from 'react-router-dom';
import PDFModal from './pdf-modal';
import { createPublicClient, http, formatEther, parseEther } from 'viem';
import { baseSepolia } from 'viem/chains';

// Contract Configuration
const CONFIG = {
  TOKEN_ADDRESS: '0xF85839959C27A785d414844508E0489e222132Ce9' as `0x${string}`,
  SALE_ADDRESS: '0x8cC8d622A07A3EC87f7EC2308c28d9c04E94D152' as `0x${string}`,
  MERC_ADDRESS: '0x1Ba0f6Bfe66e3Bc86A1d5120d76C8A1fcc019A8B' as `0x${string}`,
  CHAIN_ID: 84532,
  MERC_RATE: 0.3954,
};

// ABIs
const SALE_ABI = [
  {
    name: 'buyTokens',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'tokenAmount', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'calculateMERCAmount',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'tokenAmount', type: 'uint256' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'getActiveWindow',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      { name: 'windowId', type: 'uint256' },
      { name: 'startTime', type: 'uint256' },
      { name: 'endTime', type: 'uint256' },
      { name: 'tokensAvailable', type: 'uint256' },
      { name: 'tokensSold', type: 'uint256' },
      { name: 'tokensRemaining', type: 'uint256' },
      { name: 'mercRate', type: 'uint256' },
      { name: 'isActive', type: 'bool' },
    ],
  },
  {
    name: 'getUserPurchaseInfo',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'user', type: 'address' },
      { name: 'windowId', type: 'uint256' },
    ],
    outputs: [
      { name: 'purchased', type: 'uint256' },
      { name: 'remaining', type: 'uint256' },
      { name: 'maxAllowed', type: 'uint256' },
    ],
  },
] as const;

const MERC_ABI = [
  {
    name: 'approve',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    name: 'allowance',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
] as const;

// Public client for reading contract data
const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

// Coming Soon Component
function ComingSoonPage() {
  const [showPDF, setShowPDF] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001f3f] via-[#003d7a] to-[#002868] flex items-center justify-center p-4">
      <div className="text-center">
        <h1
          className="text-6xl md:text-8xl font-bold mb-6"
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            color: '#FFD700',
            textShadow: '3px 3px 0 #DC143C, 6px 6px 0 #002868'
          }}
        >
          1980
        </h1>
        <h2
          className="text-3xl md:text-5xl mb-8 tracking-wider"
          style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#FFD700' }}
        >
          TOKEN SALE COMING SOON
        </h2>
        <p className="text-[#E8F4F8] text-lg mb-8 max-w-md mx-auto">
          The official 1980 Miracle on Ice token sale is not yet live.
          Join the whitelist to be notified when it launches.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="inline-block px-8 py-4 text-xl tracking-wider border-2 border-[#FFD700] text-white transition-all hover:scale-105 hover:shadow-[0_10px_30px_rgba(220,20,60,0.5)]"
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              background: 'linear-gradient(135deg, #DC143C 0%, #B01030 100%)'
            }}
          >
            Join Whitelist
          </Link>
          <button
            onClick={() => setShowPDF(true)}
            className="inline-block px-8 py-4 text-xl tracking-wider border-2 border-[#FFD700] text-[#FFD700] bg-transparent transition-all hover:scale-105 hover:bg-[#FFD700]/10 cursor-pointer"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            Read Litepaper
          </button>
        </div>
      </div>
      <PDFModal isOpen={showPDF} onClose={() => setShowPDF(false)} />
    </div>
  );
}

// Olympic Rings Component
function OlympicRings() {
  return (
    <div className="fixed top-5 right-5 flex gap-2 z-50 opacity-15">
      <div className="w-[30px] h-[30px] rounded-full border-[3px] border-[#0085C7]" />
      <div className="w-[30px] h-[30px] rounded-full border-[3px] border-black mt-[15px]" />
      <div className="w-[30px] h-[30px] rounded-full border-[3px] border-[#DF0024]" />
      <div className="w-[30px] h-[30px] rounded-full border-[3px] border-[#F4C300] mt-[15px]" />
      <div className="w-[30px] h-[30px] rounded-full border-[3px] border-[#009F3D]" />
    </div>
  );
}

// Stats Card Component
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="relative overflow-hidden bg-white/5 backdrop-blur-[10px] border-2 border-[#FFD700]/30 p-8 text-center transition-all hover:-translate-y-1 hover:border-[#FFD700] hover:shadow-[0_10px_40px_rgba(255,215,0,0.3)] group">
      <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent rotate-45 animate-scanline" />
      <span
        className="block text-5xl text-[#FFD700] mb-2"
        style={{ fontFamily: 'Bebas Neue, sans-serif' }}
      >
        {value}
      </span>
      <span className="text-sm text-[#E8F4F8] uppercase tracking-[2px]">{label}</span>
    </div>
  );
}

// Info Section Component
function InfoSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="max-w-[1200px] mx-auto my-20 px-[5%]">
      <div className="bg-[#002868]/60 backdrop-blur-[20px] border-2 border-[#FFD700]/30 p-12 rounded-[15px]">
        <h2
          className="text-5xl text-[#FFD700] tracking-[4px] mb-8 text-center"
          style={{ fontFamily: 'Bebas Neue, sans-serif' }}
        >
          {title}
        </h2>
        <div className="leading-relaxed text-lg">
          {children}
        </div>
      </div>
    </section>
  );
}

// Main Token Sale Component
export function TokenSale() {
  // Check if sale is enabled
  const saleEnabled = import.meta.env.VITE_SALE_ENABLED === 'true';

  if (!saleEnabled) {
    return <ComingSoonPage />;
  }

  // Privy hooks
  const { login, logout, authenticated, ready } = usePrivy();
  const { wallets } = useWallets();

  // State
  const [showPDF, setShowPDF] = useState(false);
  const [tokenAmount, setTokenAmount] = useState('');
  const [mercAmount, setMercAmount] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [saleInfo, setSaleInfo] = useState({
    tokensSold: '0',
    progress: 0,
    isActive: true,
  });
  const [userInfo, setUserInfo] = useState({
    remaining: '0',
    maxAllowed: '0',
  });

  // Derived state
  const address = wallets[0]?.address as `0x${string}` | undefined;
  const isConnected = authenticated && wallets.length > 0 && !!address;

  // Load sale info
  useEffect(() => {
    async function loadSaleInfo() {
      try {
        const result = await publicClient.readContract({
          address: CONFIG.SALE_ADDRESS,
          abi: SALE_ABI,
          functionName: 'getActiveWindow',
        });

        const tokensAvailable = Number(formatEther(result[3]));
        const tokensSold = Number(formatEther(result[4]));
        const progress = tokensAvailable > 0 ? (tokensSold / tokensAvailable) * 100 : 0;

        setSaleInfo({
          tokensSold: tokensSold.toLocaleString('en-US', { maximumFractionDigits: 0 }),
          progress,
          isActive: result[7],
        });
      } catch (error) {
        console.error('Error loading sale info:', error);
      }
    }

    loadSaleInfo();
    const interval = setInterval(loadSaleInfo, 30000);
    return () => clearInterval(interval);
  }, []);

  // Load user info when connected
  useEffect(() => {
    async function loadUserInfo() {
      if (!address) return;

      try {
        const windowResult = await publicClient.readContract({
          address: CONFIG.SALE_ADDRESS,
          abi: SALE_ABI,
          functionName: 'getActiveWindow',
        });

        const userResult = await publicClient.readContract({
          address: CONFIG.SALE_ADDRESS,
          abi: SALE_ABI,
          functionName: 'getUserPurchaseInfo',
          args: [address, windowResult[0]],
        });

        setUserInfo({
          remaining: Number(formatEther(userResult[1])).toLocaleString('en-US', { maximumFractionDigits: 0 }),
          maxAllowed: Number(formatEther(userResult[2])).toLocaleString('en-US', { maximumFractionDigits: 0 }),
        });
      } catch (error) {
        console.error('Error loading user info:', error);
      }
    }

    if (isConnected) {
      loadUserInfo();
    }
  }, [address, isConnected]);

  // Update MERC conversion
  useEffect(() => {
    const amount = parseFloat(tokenAmount) || 0;
    setMercAmount((amount * CONFIG.MERC_RATE).toFixed(4));
  }, [tokenAmount]);

  // Show alert helper
  const showAlert = (message: string, type: 'success' | 'error' | 'info') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  // Handle purchase
  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected || !address) {
      showAlert('Please connect your wallet first', 'error');
      return;
    }

    const amount = parseFloat(tokenAmount);
    if (!amount || amount <= 0) {
      showAlert('Please enter a valid token amount', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const wallet = wallets[0];
      const provider = await wallet.getEthersProvider();
      const signer = provider.getSigner();

      const tokenAmountWei = parseEther(tokenAmount);

      // Calculate MERC amount needed
      const mercAmountWei = await publicClient.readContract({
        address: CONFIG.SALE_ADDRESS,
        abi: SALE_ABI,
        functionName: 'calculateMERCAmount',
        args: [tokenAmountWei],
      });

      // Check MERC balance
      const mercBalance = await publicClient.readContract({
        address: CONFIG.MERC_ADDRESS,
        abi: MERC_ABI,
        functionName: 'balanceOf',
        args: [address],
      });

      if (mercBalance < mercAmountWei) {
        throw new Error('Insufficient MERC balance');
      }

      // Check allowance and approve if needed
      const allowance = await publicClient.readContract({
        address: CONFIG.MERC_ADDRESS,
        abi: MERC_ABI,
        functionName: 'allowance',
        args: [address, CONFIG.SALE_ADDRESS],
      });

      if (allowance < mercAmountWei) {
        showAlert('Approving MERC spending...', 'info');
        const mercContract = new (await import('ethers')).Contract(
          CONFIG.MERC_ADDRESS,
          ['function approve(address spender, uint256 amount) returns (bool)'],
          signer
        );
        const approveTx = await mercContract.approve(CONFIG.SALE_ADDRESS, mercAmountWei);
        await approveTx.wait();
      }

      // Buy tokens
      showAlert('Purchasing tokens...', 'info');
      const saleContract = new (await import('ethers')).Contract(
        CONFIG.SALE_ADDRESS,
        ['function buyTokens(uint256 tokenAmount)'],
        signer
      );
      const buyTx = await saleContract.buyTokens(tokenAmountWei);
      await buyTx.wait();

      showAlert(`Successfully purchased ${tokenAmount} tokens!`, 'success');
      setTokenAmount('');
    } catch (error: any) {
      console.error('Purchase error:', error);
      showAlert(`Purchase failed: ${error.message || 'Unknown error'}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white overflow-x-hidden relative" style={{ fontFamily: 'Outfit, sans-serif' }}>
      {/* Background */}
      <div
        className="fixed inset-0 -z-10"
        style={{ background: 'linear-gradient(135deg, #001f3f 0%, #003d7a 50%, #002868 100%)' }}
      />

      {/* Ice Pattern Overlay */}
      <div
        className="fixed inset-0 -z-10 opacity-40 animate-iceFlow"
        style={{
          backgroundImage: `
            linear-gradient(30deg, rgba(255,255,255,0.03) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.03) 87.5%, rgba(255,255,255,0.03)),
            linear-gradient(150deg, rgba(255,255,255,0.03) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.03) 87.5%, rgba(255,255,255,0.03)),
            linear-gradient(30deg, rgba(255,255,255,0.03) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.03) 87.5%, rgba(255,255,255,0.03)),
            linear-gradient(150deg, rgba(255,255,255,0.03) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.03) 87.5%, rgba(255,255,255,0.03))
          `,
          backgroundSize: '80px 140px',
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px',
        }}
      />

      <OlympicRings />

      {/* Header */}
      <header className="px-[5%] py-8 flex flex-col md:flex-row justify-between items-center gap-4 relative z-50">
        <div className="flex items-center gap-4">
          <div
            className="text-6xl text-[#FFD700] tracking-[2px] animate-glow"
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              textShadow: '3px 3px 0 #DC143C, 6px 6px 0 #002868'
            }}
          >
            1980
          </div>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif' }} className="text-2xl tracking-[3px] uppercase leading-tight">
            Miracle on Ice<br />
            <span className="text-sm opacity-70">Official Token Sale</span>
          </div>
        </div>

        <button
          onClick={() => isConnected ? logout() : login()}
          disabled={!ready}
          className="relative overflow-hidden px-8 py-4 text-xl tracking-[2px] text-white border-2 border-[#FFD700] cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(220,20,60,0.5)] disabled:opacity-50"
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            background: 'linear-gradient(135deg, #DC143C 0%, #B01030 100%)'
          }}
        >
          {isConnected
            ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
            : 'Connect Wallet'
          }
        </button>
      </header>

      {/* Hero Section */}
      <section className="text-center px-[5%] py-16">
        <h1
          className="text-4xl md:text-7xl lg:text-8xl tracking-[8px] mb-4 animate-shine bg-clip-text"
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            background: 'linear-gradient(45deg, #FFD700, #FFF, #FFD700)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shine 3s linear infinite',
          }}
        >
          DO YOU BELIEVE IN MIRACLES?
        </h1>
        <p className="text-xl md:text-2xl text-[#E8F4F8] font-light tracking-[2px]">
          Join the Legacy. Own a Piece of History.
        </p>
      </section>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1200px] mx-auto mb-16 px-[5%]">
        <StatCard value="1.98B" label="Total Supply" />
        <StatCard value={saleInfo.tokensSold} label="Tokens Sold" />
        <StatCard value="0.3954" label="MERC per Token" />
        <StatCard value="1.98%" label="DEX Tax" />
      </div>

      {/* Sale Container */}
      <div className="max-w-[800px] mx-auto px-[5%] pb-20">
        <div className="relative bg-[#002868]/60 backdrop-blur-[20px] border-[3px] border-[#FFD700] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-borderGlow">

          {/* Sale Header */}
          <div className="text-center mb-12">
            <h2
              className="text-5xl text-[#FFD700] tracking-[4px] mb-4"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              Token Access Sale
            </h2>
            <span
              className={`inline-block px-6 py-2 font-bold tracking-[2px] text-sm uppercase animate-pulse ${
                saleInfo.isActive
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-[#1a1a2e]'
                  : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
              }`}
            >
              {saleInfo.isActive ? 'SALE LIVE' : 'SALE ENDED'}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between mb-2 text-sm text-[#E8F4F8]">
              <span>Sale Progress</span>
              <span>{saleInfo.progress.toFixed(2)}%</span>
            </div>
            <div className="w-full h-[30px] bg-white/10 border-2 border-[#FFD700]/30 relative overflow-hidden">
              <div
                className="h-full animate-progressShine"
                style={{
                  width: `${saleInfo.progress}%`,
                  background: 'linear-gradient(90deg, #FFD700 0%, #FFF 50%, #FFD700 100%)',
                  backgroundSize: '200% 100%',
                  transition: 'width 0.5s ease',
                }}
              />
            </div>
          </div>

          {/* Alert */}
          {alert && (
            <div
              className={`p-4 mb-4 border-l-4 animate-slideIn ${
                alert.type === 'success' ? 'bg-green-500/10 border-green-500 text-green-400' :
                alert.type === 'error' ? 'bg-red-500/10 border-red-500 text-red-400' :
                'bg-blue-500/10 border-blue-400 text-blue-300'
              }`}
            >
              {alert.message}
            </div>
          )}

          {/* Purchase Form */}
          <form onSubmit={handlePurchase}>
            <div className="mb-8">
              <label className="block text-sm text-[#E8F4F8] mb-2 uppercase tracking-[2px] font-semibold">
                Enter Amount of 1980 Tokens
              </label>
              <input
                type="number"
                value={tokenAmount}
                onChange={(e) => setTokenAmount(e.target.value)}
                placeholder="1000"
                min="1"
                step="1"
                className="w-full p-5 bg-white/10 border-2 border-[#FFD700]/30 text-white text-xl transition-all focus:outline-none focus:border-[#FFD700] focus:bg-white/15 focus:shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              />
            </div>

            <div className="bg-[#FFD700]/10 border-l-4 border-[#FFD700] p-4 mb-4">
              <div className="text-lg text-[#FFD700] font-semibold">
                Fixed Rate: 0.3954 MERC = 1 Token
              </div>
              <div
                className="text-3xl text-white mt-2"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
                You will pay: {mercAmount} MERC
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm text-[#E8F4F8] mb-2 uppercase tracking-[2px] font-semibold">
                Your Purchase Limit
              </label>
              <input
                type="text"
                value={isConnected ? `${userInfo.remaining} tokens remaining (${userInfo.maxAllowed} max)` : 'Connect wallet to view'}
                readOnly
                className="w-full p-5 bg-white/5 border-2 border-[#FFD700]/30 text-white text-xl cursor-not-allowed"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              />
            </div>

            <button
              type="submit"
              disabled={!isConnected || isLoading || !saleInfo.isActive}
              className="w-full p-6 text-3xl tracking-[4px] text-white border-[3px] border-[#FFD700] cursor-pointer transition-all hover:scale-[1.02] hover:shadow-[0_15px_50px_rgba(220,20,60,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                background: 'linear-gradient(135deg, #DC143C 0%, #B01030 100%)'
              }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-3">
                  Processing...
                  <span className="inline-block w-6 h-6 border-3 border-[#FFD700]/30 border-t-[#FFD700] rounded-full animate-spin" />
                </span>
              ) : !isConnected ? (
                'Connect Wallet to Purchase'
              ) : (
                'Purchase Tokens'
              )}
            </button>
          </form>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-[#FFD700]/5 border border-[#FFD700]/20">
            <p className="text-sm text-[#E8F4F8] leading-relaxed">
              <strong className="text-[#FFD700]">⚠️ Important:</strong> This is a token access sale, not an investment.
              The 1980 token is designed for community governance and legacy preservation.
              MERC is used strictly as a settlement rail at a fixed rate.
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <InfoSection id="about" title="About the 1980 Token">
        <p className="mb-6">
          The 1980 "Miracle on Ice" token commemorates one of the greatest moments in sports history - when the U.S. Olympic hockey team defeated the Soviet Union in the 1980 Winter Olympics.
        </p>
        <p className="mb-6">
          This token is designed for community governance and legacy preservation, not as an investment vehicle. It enables holders to participate in decisions about preserving and extending the cultural impact of the 1980 Olympic team.
        </p>
        <p className="mb-6 text-[#FFD700] font-semibold">Key Principles:</p>
        <ul className="space-y-4">
          <li>✓ Legacy-oriented community governance token</li>
          <li>✓ Fixed supply with controlled distribution</li>
          <li>✓ Non-speculative design with narrow DAO scope</li>
          <li>✓ Primary funding through Legacy Contributions</li>
          <li>✓ MERC used strictly as a settlement rail</li>
        </ul>
      </InfoSection>

      {/* Tokenomics Section */}
      <InfoSection id="tokenomics" title="Tokenomics">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="bg-[#FFD700]/10 p-8 border-l-4 border-[#FFD700] rounded-[5px]">
            <h3 className="text-[#FFD700] text-2xl mb-4">Total Supply</h3>
            <p className="text-4xl text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>1.98 Billion</p>
            <p className="opacity-80 mt-2">Fixed supply, never changing</p>
          </div>
          <div className="bg-[#FFD700]/10 p-8 border-l-4 border-[#FFD700] rounded-[5px]">
            <h3 className="text-[#FFD700] text-2xl mb-4">Initial Access</h3>
            <p className="text-4xl text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>10%</p>
            <p className="opacity-80 mt-2">198M tokens - no vesting</p>
          </div>
          <div className="bg-[#FFD700]/10 p-8 border-l-4 border-[#FFD700] rounded-[5px]">
            <h3 className="text-[#FFD700] text-2xl mb-4">DEX Tax</h3>
            <p className="text-4xl text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>1.98%</p>
            <p className="opacity-80 mt-2">On trading only, funds DAO</p>
          </div>
        </div>

        <h3 className="text-[#FFD700] text-3xl mt-12 mb-6">Distribution Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-[#FFD700]/30">
                <th className="text-left p-4 text-[#FFD700]">Allocation</th>
                <th className="text-right p-4 text-[#FFD700]">Percentage</th>
                <th className="text-right p-4 text-[#FFD700]">Tokens</th>
                <th className="text-left p-4 text-[#FFD700]">Vesting</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#FFD700]/10">
                <td className="p-4">Initial Access Sales</td>
                <td className="text-right p-4">10%</td>
                <td className="text-right p-4">198M</td>
                <td className="p-4 opacity-70">No vesting</td>
              </tr>
              <tr className="border-b border-[#FFD700]/10">
                <td className="p-4">Future Access Sales</td>
                <td className="text-right p-4">10%</td>
                <td className="text-right p-4">198M</td>
                <td className="p-4 opacity-70">No vesting</td>
              </tr>
              <tr className="border-b border-[#FFD700]/10">
                <td className="p-4">DAO Participation</td>
                <td className="text-right p-4">15%</td>
                <td className="text-right p-4">297M</td>
                <td className="p-4 opacity-70">36-60 months</td>
              </tr>
              <tr className="border-b border-[#FFD700]/10">
                <td className="p-4">Athlete & Legacy</td>
                <td className="text-right p-4">19.8%</td>
                <td className="text-right p-4">392M</td>
                <td className="p-4 opacity-70">12mo cliff, 48mo vest</td>
              </tr>
              <tr className="border-b border-[#FFD700]/10">
                <td className="p-4">Foundation & Ops</td>
                <td className="text-right p-4">5.2%</td>
                <td className="text-right p-4">103M</td>
                <td className="p-4 opacity-70">48 months linear</td>
              </tr>
              <tr>
                <td className="p-4">Community Reserve</td>
                <td className="text-right p-4">40%</td>
                <td className="text-right p-4">792M</td>
                <td className="p-4 opacity-70">Future use</td>
              </tr>
            </tbody>
          </table>
        </div>
      </InfoSection>

      {/* DAO Governance Section */}
      <InfoSection id="dao" title="DAO Governance">
        <p className="mb-6">
          The 1980 DAO governs budgets and initiatives with intentionally narrow scope to protect the legacy and avoid speculation.
        </p>

        <h3 className="text-[#FFD700] text-2xl mt-8 mb-4">What the DAO Controls</h3>
        <ul className="space-y-4 mb-8">
          <li>✓ Budget allocation for legacy preservation initiatives</li>
          <li>✓ Community events and commemorative programs</li>
          <li>✓ Grant distribution for aligned projects</li>
          <li>✓ Educational content and historical preservation</li>
        </ul>

        <h3 className="text-[#FFD700] text-2xl mt-8 mb-4">What the DAO Does NOT Control</h3>
        <ul className="space-y-4 mb-8">
          <li>✗ Token price or market operations</li>
          <li>✗ Liquidity tactics or trading strategies</li>
          <li>✗ Athlete participation decisions</li>
          <li>✗ MERC token modifications or promotion</li>
        </ul>

        <div className="bg-[#FFD700]/10 p-8 border-l-4 border-[#FFD700] rounded-[5px] mt-8">
          <h3 className="text-[#FFD700] text-2xl mb-4">Funding Sources</h3>
          <p className="mb-4"><strong>Primary:</strong> Legacy Contributions (voluntary, non-dilutive support)</p>
          <p className="mb-4"><strong>Secondary:</strong> DEX Transaction Tax (1.98% on trading)</p>
          <p><strong>Not Used:</strong> Access sales are for distribution only, not DAO funding</p>
        </div>
      </InfoSection>

      {/* Whitepaper Section */}
      <InfoSection id="whitepaper" title="Litepaper & Documentation">
        <p className="mb-8 text-xl text-center">
          Access our comprehensive documentation to learn more about the 1980 token structure, mechanics, and safeguards.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-[#FFD700]/10 p-8 rounded-[10px] text-center">
            <h3 className="text-[#FFD700] text-2xl mb-4">📄 Full Litepaper</h3>
            <p className="mb-6 opacity-90">Complete tokenomics, sale mechanics, SBT rewards, and DAO structure</p>
            <button
              onClick={() => setShowPDF(true)}
              className="inline-block px-8 py-4 text-white border-2 border-[#FFD700] rounded-[5px] transition-all hover:scale-105 cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #DC143C 0%, #B01030 100%)' }}
            >
              View Litepaper
            </button>
          </div>

          <div className="bg-[#FFD700]/10 p-8 rounded-[10px] text-center">
            <h3 className="text-[#FFD700] text-2xl mb-4">📊 System Diagrams</h3>
            <p className="mb-6 opacity-90">Visual flow charts of sale mechanics and tax distribution</p>
            <button
              onClick={() => setShowPDF(true)}
              className="inline-block px-8 py-4 text-white border-2 border-[#FFD700] rounded-[5px] transition-all hover:scale-105 cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #DC143C 0%, #B01030 100%)' }}
            >
              View Diagrams
            </button>
          </div>

          <div className="bg-[#FFD700]/10 p-8 rounded-[10px] text-center">
            <h3 className="text-[#FFD700] text-2xl mb-4">🔗 Smart Contracts</h3>
            <p className="mb-6 opacity-90">Verified contracts on Base blockchain</p>
            <a
              href="https://basescan.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 text-white border-2 border-[#FFD700] rounded-[5px] transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #DC143C 0%, #B01030 100%)' }}
            >
              View on Basescan
            </a>
          </div>
        </div>
      </InfoSection>

      {/* Audit Section */}
      <InfoSection id="audit" title="Security & Audit">
        <p className="mb-8 text-xl text-center">
          Security and transparency are paramount. Our smart contracts undergo rigorous auditing before mainnet deployment.
        </p>

        <div className="bg-[#FFD700]/10 p-8 border-l-4 border-[#FFD700] rounded-[5px] mb-8">
          <h3 className="text-[#FFD700] text-2xl mb-4">Audit Status</h3>
          <p className="mb-4">
            <strong>Pre-Launch:</strong> All contracts will be audited by a reputable third-party security firm before mainnet deployment.
          </p>
          <p className="mb-4">
            <strong>Audit Firm:</strong> [To be announced - select from Certik, OpenZeppelin, Trail of Bits, or similar]
          </p>
          <p>
            <strong>Timeline:</strong> Audit scheduled before mainnet launch. Results will be published here.
          </p>
        </div>

        <h3 className="text-[#FFD700] text-2xl mt-8 mb-4">Security Features</h3>
        <ul className="space-y-4 mb-8">
          <li>🔒 <strong>Multi-signature wallets</strong> for all treasuries</li>
          <li>⏸️ <strong>Emergency pause</strong> functionality for critical situations</li>
          <li>✅ <strong>Time-locked operations</strong> for admin functions</li>
          <li>🔐 <strong>Role-based access control</strong> limits permissions</li>
          <li>📊 <strong>Transparent on-chain</strong> operations - all visible on Basescan</li>
          <li>🛡️ <strong>OpenZeppelin contracts</strong> - industry-standard, battle-tested code</li>
        </ul>

        <h3 className="text-[#FFD700] text-2xl mt-8 mb-4">Bug Bounty Program</h3>
        <p className="mb-4">
          After audit completion, we will launch a bug bounty program to incentivize security researchers to identify potential vulnerabilities.
        </p>
        <p className="opacity-80">
          Details and reward structure will be announced post-audit.
        </p>

        <div className="text-center mt-12">
          <p className="text-sm opacity-70">
            Audit reports and security documentation will be published here upon completion.
          </p>
        </div>
      </InfoSection>

      {/* Footer */}
      <footer className="text-center px-[5%] py-12 border-t-2 border-[#FFD700]/20 mt-20">
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <button onClick={() => setShowPDF(true)} className="text-[#FFD700] uppercase tracking-[2px] font-semibold hover:text-white hover:drop-shadow-[0_0_20px_#FFD700] transition-all bg-transparent border-0 cursor-pointer">
            Litepaper
          </button>
          <a href="#tokenomics" className="text-[#FFD700] uppercase tracking-[2px] font-semibold hover:text-white hover:drop-shadow-[0_0_20px_#FFD700] transition-all">
            Tokenomics
          </a>
          <a href="#about" className="text-[#FFD700] uppercase tracking-[2px] font-semibold hover:text-white hover:drop-shadow-[0_0_20px_#FFD700] transition-all">
            About
          </a>
          <a href="#dao" className="text-[#FFD700] uppercase tracking-[2px] font-semibold hover:text-white hover:drop-shadow-[0_0_20px_#FFD700] transition-all">
            DAO
          </a>
          <a href="#audit" className="text-[#FFD700] uppercase tracking-[2px] font-semibold hover:text-white hover:drop-shadow-[0_0_20px_#FFD700] transition-all">
            Audit
          </a>
        </div>
        <p className="text-white/50 text-sm">
          © 2026 Miracle on Ice 1980 Token. Commemorating the greatest moment in sports history.
        </p>
      </footer>

      {/* Custom Styles for Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;600;700&display=swap');

        @keyframes iceFlow {
          0% { transform: translateY(0); }
          100% { transform: translateY(140px); }
        }

        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 10px #FFD700); }
          50% { filter: drop-shadow(0 0 30px #FFD700) drop-shadow(0 0 50px #FFD700); }
        }

        @keyframes shine {
          to { background-position: 200% center; }
        }

        @keyframes scanline {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }

        @keyframes borderGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.3); }
          50% { box-shadow: 0 0 40px rgba(255, 215, 0, 0.6); }
        }

        @keyframes progressShine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @keyframes slideIn {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .animate-iceFlow {
          animation: iceFlow 60s linear infinite;
        }

        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }

        .animate-shine {
          animation: shine 3s linear infinite;
        }

        .animate-scanline::before {
          animation: scanline 4s linear infinite;
        }

        .animate-borderGlow {
          animation: borderGlow 3s ease-in-out infinite;
        }

        .animate-progressShine {
          animation: progressShine 2s linear infinite;
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease;
        }
      `}</style>

      {/* PDF Modal */}
      <PDFModal isOpen={showPDF} onClose={() => setShowPDF(false)} />
    </div>
  );
}
