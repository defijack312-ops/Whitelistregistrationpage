import { useState, useEffect, useCallback } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { Link } from 'react-router-dom';
import PDFModal from './pdf-modal';
import {
  createPublicClient,
  http,
  formatEther,
  parseEther,
  parseUnits,
  formatUnits,
  encodeFunctionData,
  getAddress,
} from 'viem';
import { base } from 'viem/chains';
import { Wallet, ArrowLeft, Trophy, Star, Shield, Users, Loader2, ChevronDown, ChevronUp } from 'lucide-react';

// ============ CONFIG ============
const CONFIG = {
  SBT_ADDRESS: '0x5646220e6602083b135e650B8620edC05F2E47A0' as `0x${string}`,
  // Base Mainnet USDC (6 decimals)
  USDC_ADDRESS: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as `0x${string}`,
  CHAIN_ID: 8453,
  RPC_URL: 'https://mainnet.base.org',
};

// Tier thresholds in USDC
const TIERS = [
  { id: 1, name: 'Supporter', threshold: 0, maxLabel: '$500', color: '#3B82F6', icon: Shield, description: 'Contribute up to $500 to earn a Supporter badge', badge: '🔵' },
  { id: 2, name: 'Team Player', threshold: 1000, maxLabel: '$10K', color: '#CD7F32', icon: Users, description: 'Contribute $1,000+ to earn Team Player status', badge: '🟤' },
  { id: 3, name: 'All-Star', threshold: 10000, maxLabel: '$25K', color: '#C0C0C0', icon: Star, description: 'Contribute $10,000+ to reach All-Star tier', badge: '⚪' },
  { id: 4, name: 'Legend', threshold: 25000, maxLabel: '∞', color: '#FFD700', icon: Trophy, description: 'Contribute $25,000+ to achieve Legend status', badge: '🟡' },
];

// ============ ABIs ============
const SBT_ABI = [
  {
    name: 'contributeToken',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'token', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'message', type: 'string' },
    ],
    outputs: [],
  },
  {
    name: 'contributeETH',
    type: 'function',
    stateMutability: 'payable',
    inputs: [{ name: 'message', type: 'string' }],
    outputs: [],
  },
  {
    name: 'getUserStats',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'user', type: 'address' }],
    outputs: [
      { name: 'totalContributedByUser', type: 'uint256' },
      { name: 'sbtCount', type: 'uint256' },
      { name: 'activeSBTId', type: 'uint256' },
      { name: 'legendCount', type: 'uint256' },
    ],
  },
  {
    name: 'getSBTInfo',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [
      { name: 'owner', type: 'address' },
      { name: 'contributionValue', type: 'uint256' },
      { name: 'tier', type: 'uint8' },
      { name: 'tierName', type: 'string' },
      { name: 'mintedAt', type: 'uint256' },
      { name: 'isLegend', type: 'bool' },
    ],
  },
  {
    name: 'getUserSBTs',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'user', type: 'address' }],
    outputs: [{ name: '', type: 'uint256[]' }],
  },
  {
    name: 'totalContributed',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'totalSBTsMinted',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'acceptedTokens',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'token', type: 'address' }],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    name: 'acceptNativeETH',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'bool' }],
  },
] as const;

const ERC20_ABI = [
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

const publicClient = createPublicClient({
  chain: base,
  transport: http(CONFIG.RPC_URL),
});

// ============ COMPONENT ============
export function LegacyContribute() {
  const { login, authenticated, ready } = usePrivy();
  const { wallets } = useWallets();

  // State
  const [paymentMethod, setPaymentMethod] = useState<'USDC' | 'ETH'>('USDC');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isContributing, setIsContributing] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPDF, setShowPDF] = useState(false);

  // User data
  const [userStats, setUserStats] = useState<{
    totalContributed: bigint;
    sbtCount: bigint;
    activeSBTId: bigint;
    legendCount: bigint;
  } | null>(null);
  const [activeSBTInfo, setActiveSBTInfo] = useState<{
    contributionValue: bigint;
    tier: number;
    tierName: string;
    isLegend: boolean;
  } | null>(null);
  const [usdcBalance, setUsdcBalance] = useState<bigint>(0n);
  const [ethBalance, setEthBalance] = useState<bigint>(0n);

  // Global stats
  const [globalContributed, setGlobalContributed] = useState<bigint>(0n);
  const [globalSBTs, setGlobalSBTs] = useState<bigint>(0n);

  // ETH price - live from CoinGecko
  const [ethPrice, setEthPrice] = useState<number>(1900);

  const walletAddress = wallets?.[0]?.address;

  // ============ DATA FETCHING ============
  const fetchUserData = useCallback(async () => {
    if (!walletAddress) return;
    try {
      const addr = getAddress(walletAddress);

      const [stats, usdcBal, ethBal] = await Promise.all([
        publicClient.readContract({
          address: CONFIG.SBT_ADDRESS,
          abi: SBT_ABI,
          functionName: 'getUserStats',
          args: [addr],
        }),
        publicClient.readContract({
          address: CONFIG.USDC_ADDRESS,
          abi: ERC20_ABI,
          functionName: 'balanceOf',
          args: [addr],
        }),
        publicClient.getBalance({ address: addr }),
      ]);

      setUserStats({
        totalContributed: stats[0],
        sbtCount: stats[1],
        activeSBTId: stats[2],
        legendCount: stats[3],
      });
      setUsdcBalance(usdcBal);
      setEthBalance(ethBal);

      // Fetch active SBT info if exists
      if (stats[2] > 0n) {
        const sbtInfo = await publicClient.readContract({
          address: CONFIG.SBT_ADDRESS,
          abi: SBT_ABI,
          functionName: 'getSBTInfo',
          args: [stats[2]],
        });
        setActiveSBTInfo({
          contributionValue: sbtInfo[1],
          tier: sbtInfo[2],
          tierName: sbtInfo[3],
          isLegend: sbtInfo[5],
        });
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  }, [walletAddress]);

  const fetchGlobalStats = useCallback(async () => {
    try {
      const [total, minted] = await Promise.all([
        publicClient.readContract({
          address: CONFIG.SBT_ADDRESS,
          abi: SBT_ABI,
          functionName: 'totalContributed',
        }),
        publicClient.readContract({
          address: CONFIG.SBT_ADDRESS,
          abi: SBT_ABI,
          functionName: 'totalSBTsMinted',
        }),
      ]);
      setGlobalContributed(total);
      setGlobalSBTs(minted);
    } catch (err) {
      console.error('Error fetching global stats:', err);
    }
  }, []);

  useEffect(() => {
    fetchGlobalStats();
  }, [fetchGlobalStats]);

  // Fetch live ETH price from CoinGecko
  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await res.json();
        if (data?.ethereum?.usd) {
          setEthPrice(data.ethereum.usd);
        }
      } catch (err) {
        console.warn('Failed to fetch ETH price, using default:', ethPrice);
      }
    };
    fetchEthPrice();
    // Refresh every 60 seconds
    const interval = setInterval(fetchEthPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (authenticated && walletAddress) {
      fetchUserData();
    }
  }, [authenticated, walletAddress, fetchUserData]);

  // ============ CONTRIBUTION LOGIC ============
  const handleContribute = async () => {
    if (!walletAddress || !amount) return;
    setError('');
    setSuccess('');
    setTxHash('');

    const wallet = wallets[0];
    if (!wallet) return;

    try {
      const provider = await wallet.getEthereumProvider();

      if (paymentMethod === 'USDC') {
        // USDC flow: approve then contribute
        const usdcAmount = parseUnits(amount, 6); // USDC has 6 decimals

        // Check allowance
        setIsApproving(true);
        const currentAllowance = await publicClient.readContract({
          address: CONFIG.USDC_ADDRESS,
          abi: ERC20_ABI,
          functionName: 'allowance',
          args: [getAddress(walletAddress), CONFIG.SBT_ADDRESS],
        });

        if (currentAllowance < usdcAmount) {
          // Approve
          const approveData = encodeFunctionData({
            abi: ERC20_ABI,
            functionName: 'approve',
            args: [CONFIG.SBT_ADDRESS, usdcAmount],
          });

          const approveTx = await provider.request({
            method: 'eth_sendTransaction',
            params: [{
              from: walletAddress,
              to: CONFIG.USDC_ADDRESS,
              data: approveData,
            }],
          });

          // Wait for approval
          await publicClient.waitForTransactionReceipt({ hash: approveTx as `0x${string}` });
        }
        setIsApproving(false);

        // Contribute
        setIsContributing(true);
        const contributeData = encodeFunctionData({
          abi: SBT_ABI,
          functionName: 'contributeToken',
          args: [CONFIG.USDC_ADDRESS, usdcAmount, message || 'Legacy contribution via miracleof1980.com'],
        });

        const tx = await provider.request({
          method: 'eth_sendTransaction',
          params: [{
            from: walletAddress,
            to: CONFIG.SBT_ADDRESS,
            data: contributeData,
          }],
        });

        setTxHash(tx as string);
        await publicClient.waitForTransactionReceipt({ hash: tx as `0x${string}` });

      } else {
        // ETH flow
        setIsContributing(true);
        const ethAmount = parseEther(amount);

        const contributeData = encodeFunctionData({
          abi: SBT_ABI,
          functionName: 'contributeETH',
          args: [message || 'Legacy contribution via miracleof1980.com'],
        });

        const tx = await provider.request({
          method: 'eth_sendTransaction',
          params: [{
            from: walletAddress,
            to: CONFIG.SBT_ADDRESS,
            data: contributeData,
            value: `0x${ethAmount.toString(16)}`,
          }],
        });

        setTxHash(tx as string);
        await publicClient.waitForTransactionReceipt({ hash: tx as `0x${string}` });
      }

      setSuccess('Contribution successful! Your Legacy SBT has been updated.');
      setAmount('');
      setMessage('');
      fetchUserData();
      fetchGlobalStats();

    } catch (err: any) {
      console.error('Contribution error:', err);
      setError(err?.message?.includes('User rejected') ? 'Transaction cancelled' : 'Contribution failed. Please try again.');
    } finally {
      setIsContributing(false);
      setIsApproving(false);
    }
  };

  // ============ HELPERS ============
  const getCurrentTier = () => {
    if (!userStats) return null;
    const contributed = Number(formatEther(userStats.totalContributed));
    return TIERS.slice().reverse().find(t => contributed >= t.threshold) || TIERS[0];
  };

  const getNextTier = () => {
    const current = getCurrentTier();
    if (!current) return TIERS[0];
    const idx = TIERS.findIndex(t => t.id === current.id);
    return idx < TIERS.length - 1 ? TIERS[idx + 1] : null;
  };

  const getProgress = () => {
    if (!userStats) return 0;
    const contributed = Number(formatEther(userStats.totalContributed));
    const next = getNextTier();
    const current = getCurrentTier();
    if (!next || !current) return 100;
    const range = next.threshold - current.threshold;
    const progress = contributed - current.threshold;
    return Math.min(100, (progress / range) * 100);
  };

  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(val);
  };

  // ============ RENDER ============
  if (!ready) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-red-800 to-blue-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-red-800 to-blue-900">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Whitelist
          </Link>
          {authenticated ? (
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Wallet className="w-4 h-4 text-green-400" />
              <span className="text-white text-xs font-mono">
                {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : ''}
              </span>
            </div>
          ) : null}
        </div>

        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-black text-white drop-shadow-lg mb-3">
            🏒 Legacy Contributions
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Earn your permanent place in the 1980 Miracle community. Contribute to receive a
            non-transferable Soulbound Token (SBT) that proves your legacy status forever.
          </p>
        </div>

        {/* Global Stats Bar */}
        <div className="flex justify-center gap-8 mb-10">
          <div className="text-center">
            <p className="text-2xl font-black text-white">{formatUSD(Number(formatEther(globalContributed)))}</p>
            <p className="text-blue-200 text-xs uppercase tracking-wider">Total Contributed</p>
          </div>
          <div className="w-px bg-white/20" />
          <div className="text-center">
            <p className="text-2xl font-black text-white">{globalSBTs.toString()}</p>
            <p className="text-blue-200 text-xs uppercase tracking-wider">SBTs Minted</p>
          </div>
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {TIERS.map((tier) => {
            const isCurrentTier = getCurrentTier()?.id === tier.id;
            const Icon = tier.icon;
            return (
              <div
                key={tier.id}
                className={`relative rounded-2xl p-4 text-center transition-all ${
                  isCurrentTier
                    ? 'bg-white/20 border-2 ring-2 ring-white/30'
                    : 'bg-white/5 border border-white/10'
                }`}
                style={{ borderColor: isCurrentTier ? tier.color : undefined }}
              >
                {isCurrentTier && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-white text-gray-900 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                    Your Tier
                  </div>
                )}
                <Icon className="w-8 h-8 mx-auto mb-2" style={{ color: tier.color }} />
                <p className="text-white font-bold text-sm">{tier.name}</p>
                <p className="text-white/60 text-xs mt-1">
                  {tier.threshold === 0 ? 'Up to $500' : `$${tier.threshold.toLocaleString()}+`}
                </p>
              </div>
            );
          })}
        </div>

        {/* Main Content Area */}
        {!authenticated ? (
          /* Not Connected */
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <Wallet className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-gray-900 mb-2">Connect to Contribute</h2>
            <p className="text-gray-600 mb-6">Connect your wallet to make a legacy contribution and receive your SBT badge.</p>
            <button
              onClick={login}
              className="bg-gradient-to-r from-red-600 via-white to-blue-600 text-gray-900 font-black text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-wide border-2 border-gray-900"
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          /* Connected - Contribution Form */
          <div className="space-y-6">

            {/* User Progress Card */}
            {userStats && userStats.sbtCount > 0n && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-white font-bold text-lg mb-4">Your Legacy Status</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{ backgroundColor: getCurrentTier()?.color + '33' }}>
                    {getCurrentTier()?.badge}
                  </div>
                  <div>
                    <p className="text-white font-black text-xl">{getCurrentTier()?.name}</p>
                    <p className="text-white/60 text-sm">
                      Total contributed: {formatUSD(Number(formatEther(userStats.totalContributed)))}
                    </p>
                    <p className="text-white/40 text-xs">
                      {userStats.sbtCount.toString()} SBT{userStats.sbtCount > 1n ? 's' : ''} •{' '}
                      {userStats.legendCount.toString()} Legend{userStats.legendCount > 1n ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Progress bar to next tier */}
                {getNextTier() && (
                  <div>
                    <div className="flex justify-between text-xs text-white/60 mb-1">
                      <span>{getCurrentTier()?.name}</span>
                      <span>{getNextTier()?.name} ({formatUSD(getNextTier()!.threshold)})</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${getProgress()}%`,
                          backgroundColor: getNextTier()?.color,
                        }}
                      />
                    </div>
                  </div>
                )}
                {!getNextTier() && (
                  <p className="text-yellow-400 font-bold text-sm">🏆 Maximum tier achieved!</p>
                )}
              </div>
            )}

            {/* Contribution Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Make a Contribution</h2>

              {/* Payment Method Toggle */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setPaymentMethod('USDC')}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                    paymentMethod === 'USDC'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  💵 USDC
                </button>
                <button
                  onClick={() => setPaymentMethod('ETH')}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                    paymentMethod === 'ETH'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  ⟠ ETH
                </button>
              </div>

              {/* Balance Display */}
              <div className="text-right text-sm text-gray-500 mb-2">
                Balance:{' '}
                {paymentMethod === 'USDC'
                  ? `${Number(formatUnits(usdcBalance, 6)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDC`
                  : `${Number(formatEther(ethBalance)).toFixed(4)} ETH`}
              </div>

              {/* Amount Input */}
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Contribution Amount ({paymentMethod})
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={paymentMethod === 'USDC' ? '1000' : '0.5'}
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg font-bold pr-20"
                    min="0"
                    step={paymentMethod === 'USDC' ? '1' : '0.001'}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                    {paymentMethod}
                  </span>
                </div>
                {paymentMethod === 'ETH' && amount && (
                  <p className="text-xs text-gray-500 mt-1">
                    ≈ ${(parseFloat(amount) * ethPrice).toLocaleString(undefined, { maximumFractionDigits: 0 })} USD (ETH @ ${ethPrice.toLocaleString()})
                  </p>
                )}
              </div>

              {/* Quick Amount Buttons */}
              <div className="flex gap-2 mb-4">
                {(paymentMethod === 'USDC'
                  ? ['100', '500', '1000', '5000']
                  : ['0.1', '0.25', '0.5', '1']
                ).map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className="flex-1 py-2 text-sm font-bold rounded-lg bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 transition-all"
                  >
                    {paymentMethod === 'USDC' ? `$${val}` : `${val} ETH`}
                  </button>
                ))}
              </div>

              {/* Optional Message */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Do you believe in miracles?"
                  maxLength={140}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                />
              </div>

              {/* Error / Success Messages */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm font-medium">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 p-3 bg-green-50 border-2 border-green-200 rounded-xl text-green-700 text-sm font-medium">
                  {success}
                  {txHash && (
                    <a
                      href={`https://basescan.org/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-1 text-blue-600 underline text-xs"
                    >
                      View transaction →
                    </a>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleContribute}
                disabled={!amount || isContributing || isApproving || parseFloat(amount) <= 0}
                className="w-full bg-gradient-to-r from-red-600 via-white to-blue-600 text-gray-900 font-black text-xl py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-wide border-2 border-gray-900 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
              >
                {isApproving
                  ? '⏳ Approving USDC...'
                  : isContributing
                  ? '⏳ Contributing...'
                  : `Contribute ${amount || '0'} ${paymentMethod}`}
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                Contributions are sent to the project treasury. You'll receive a non-transferable SBT badge.
              </p>
            </div>

            {/* How It Works */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-bold text-lg mb-4">How It Works</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center text-white font-bold text-sm shrink-0">1</div>
                  <div>
                    <p className="text-white font-bold text-sm">Contribute USDC or ETH</p>
                    <p className="text-white/60 text-xs">Your contribution goes to the project treasury to support development.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center text-white font-bold text-sm shrink-0">2</div>
                  <div>
                    <p className="text-white font-bold text-sm">Receive Your SBT Badge</p>
                    <p className="text-white/60 text-xs">A non-transferable Soulbound Token is minted to your wallet proving your legacy status.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center text-white font-bold text-sm shrink-0">3</div>
                  <div>
                    <p className="text-white font-bold text-sm">Level Up Over Time</p>
                    <p className="text-white/60 text-xs">Add more contributions to upgrade your tier. Supporter → Team Player → All-Star → Legend.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-600/30 flex items-center justify-center text-white font-bold text-sm shrink-0">★</div>
                  <div>
                    <p className="text-white font-bold text-sm">Overflow Minting</p>
                    <p className="text-white/60 text-xs">Hit Legend? Extra contributions automatically mint new SBTs. Collect multiple badges!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Quote */}
        <div className="mt-10 text-center">
          <p className="text-white/90 text-lg sm:text-xl font-bold italic drop-shadow-lg">
            "Do you believe in miracles?"
          </p>
          <p className="text-blue-200 text-sm mt-2">
            February 22, 1980 • Lake Placid, NY
          </p>
        </div>

        {/* Company Footer */}
        <div className="mt-6 pt-4 border-t border-white/20 text-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Miracle of 1980 LLC. All rights reserved.
          </p>
        </div>

      </div>

      {/* PDF Modal */}
      <PDFModal isOpen={showPDF} onClose={() => setShowPDF(false)} />
    </div>
  );
}
