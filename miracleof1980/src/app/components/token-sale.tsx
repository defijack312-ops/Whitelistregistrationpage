import { useState, useEffect } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { Link } from 'react-router-dom';
import PDFModal from './pdf-modal';
import { createPublicClient, http, formatEther, parseEther } from 'viem';
import { baseSepolia } from 'viem/chains';
import { Wallet, Loader2, ArrowLeft, ShoppingCart, BarChart3, AlertCircle, CheckCircle2, Info, Coins } from 'lucide-react';
import teamPhoto from '@/assets/cf45d5f11ac0354a95fb3632c5e2369467e0dfa1.png';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-red-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 35px, white 35px, white 37px)',
        }} />
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 35px, white 35px, white 37px)',
        }} />
      </div>
      <div className="absolute inset-0 z-0">
        <img src={teamPhoto} alt="1980 USA Hockey Team" className="w-full h-full object-cover opacity-30" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-lg w-full text-center">
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-600 blur-xl opacity-60 rounded-full" />
              <h1 className="relative text-7xl sm:text-8xl font-black text-white drop-shadow-2xl tracking-tight">1980</h1>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3 drop-shadow-lg">Token Sale Coming Soon</h2>
          <p className="text-lg text-white/90 max-w-md mx-auto mb-8">
            The official $1980 Miracle on Ice token sale is not yet live. Join the whitelist to be notified when it launches.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/" className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold py-3 px-8 rounded-xl transition-all shadow-lg">
              Join Whitelist
            </Link>
            <button onClick={() => setShowPDF(true)} className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-xl transition-all border-2 border-white/30 cursor-pointer">
              Read Litepaper
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-white/90 text-lg font-bold italic drop-shadow-lg">"Do you believe in miracles?"</p>
            <p className="text-blue-200 text-sm mt-2">February 22, 1980 · Lake Placid, NY</p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/20 text-center">
            <p className="text-white/50 text-sm">© {new Date().getFullYear()} Miracle of 1980 LLC. All rights reserved.</p>
          </div>
        </div>
      </div>
      <PDFModal isOpen={showPDF} onClose={() => setShowPDF(false)} />
    </div>
  );
}

// Main Token Sale Component
export function TokenSale() {
  const saleEnabled = import.meta.env.VITE_SALE_ENABLED === 'true';
  if (!saleEnabled) return <ComingSoonPage />;

  const { login, logout, authenticated, ready } = usePrivy();
  const { wallets } = useWallets();
  const [showPDF, setShowPDF] = useState(false);
  const [tokenAmount, setTokenAmount] = useState('');
  const [mercAmount, setMercAmount] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [saleInfo, setSaleInfo] = useState({
    tokensSold: '0',
    tokensRemaining: '0',
    progress: 0,
    isActive: true,
  });
  const [userInfo, setUserInfo] = useState({
    purchased: '0',
    remaining: '0',
    maxAllowed: '0',
  });
  const [mercBalance, setMercBalance] = useState<string | null>(null);

  // Prefer external wallets (MetaMask) over embedded
  const externalWallet = wallets.find(w => w.walletClientType !== 'privy');
  const activeWallet = externalWallet || wallets[0];
  const address = activeWallet?.address as `0x${string}` | undefined;
  const isConnected = authenticated && wallets.length > 0 && !!address;

  const showAlert = (message: string, type: 'success' | 'error' | 'info') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };

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
        const tokensRemaining = Number(formatEther(result[5]));
        const progress = tokensAvailable > 0 ? (tokensSold / tokensAvailable) * 100 : 0;
        setSaleInfo({
          tokensSold: tokensSold.toLocaleString('en-US', { maximumFractionDigits: 0 }),
          tokensRemaining: tokensRemaining.toLocaleString('en-US', { maximumFractionDigits: 0 }),
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
          address: CONFIG.SALE_ADDRESS, abi: SALE_ABI, functionName: 'getActiveWindow',
        });
        const userResult = await publicClient.readContract({
          address: CONFIG.SALE_ADDRESS, abi: SALE_ABI, functionName: 'getUserPurchaseInfo',
          args: [address, windowResult[0]],
        });
        setUserInfo({
          purchased: Number(formatEther(userResult[0])).toLocaleString('en-US', { maximumFractionDigits: 0 }),
          remaining: Number(formatEther(userResult[1])).toLocaleString('en-US', { maximumFractionDigits: 0 }),
          maxAllowed: Number(formatEther(userResult[2])).toLocaleString('en-US', { maximumFractionDigits: 0 }),
        });
      } catch (error) {
        console.error('Error loading user info:', error);
      }
    }
    if (isConnected) loadUserInfo();
  }, [address, isConnected]);

  // Load MERC balance
  useEffect(() => {
    async function loadMercBalance() {
      if (!address) return;
      try {
        const balance = await publicClient.readContract({
          address: CONFIG.MERC_ADDRESS, abi: MERC_ABI, functionName: 'balanceOf', args: [address],
        });
        setMercBalance(Number(formatEther(balance)).toLocaleString('en-US', { maximumFractionDigits: 2 }));
      } catch (error) {
        console.error('Error loading MERC balance:', error);
      }
    }
    if (isConnected) loadMercBalance();
  }, [address, isConnected]);

  // Update MERC conversion
  useEffect(() => {
    const amount = parseFloat(tokenAmount) || 0;
    setMercAmount((amount * CONFIG.MERC_RATE).toFixed(4));
  }, [tokenAmount]);

  // Handle purchase
  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !address) { showAlert('Please connect your wallet first', 'error'); return; }
    const amount = parseFloat(tokenAmount);
    if (!amount || amount <= 0) { showAlert('Please enter a valid token amount', 'error'); return; }
    setIsLoading(true);
    try {
      const provider = await activeWallet!.getEthersProvider();
      const signer = provider.getSigner();
      const tokenAmountWei = parseEther(tokenAmount);

      // Calculate MERC amount needed
      const mercAmountWei = await publicClient.readContract({
        address: CONFIG.SALE_ADDRESS, abi: SALE_ABI, functionName: 'calculateMERCAmount', args: [tokenAmountWei],
      });

      // Check MERC balance
      const balance = await publicClient.readContract({
        address: CONFIG.MERC_ADDRESS, abi: MERC_ABI, functionName: 'balanceOf', args: [address],
      });
      if (balance < mercAmountWei) throw new Error('Insufficient MERC balance');

      // Check allowance and approve if needed
      const allowance = await publicClient.readContract({
        address: CONFIG.MERC_ADDRESS, abi: MERC_ABI, functionName: 'allowance', args: [address, CONFIG.SALE_ADDRESS],
      });
      if (allowance < mercAmountWei) {
        showAlert('Approving MERC spending...', 'info');
        const mercContract = new (await import('ethers')).Contract(
          CONFIG.MERC_ADDRESS, ['function approve(address spender, uint256 amount) returns (bool)'], signer,
        );
        const approveTx = await mercContract.approve(CONFIG.SALE_ADDRESS, mercAmountWei);
        await approveTx.wait();
      }

      // Buy tokens
      showAlert('Purchasing tokens...', 'info');
      const saleContract = new (await import('ethers')).Contract(
        CONFIG.SALE_ADDRESS, ['function buyTokens(uint256 tokenAmount)'], signer,
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-red-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 35px, white 35px, white 37px)',
        }} />
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 35px, white 35px, white 37px)',
        }} />
      </div>

      {/* Hero Image */}
      <div className="absolute inset-0 z-0">
        <img src={teamPhoto} alt="1980 USA Hockey Team" className="w-full h-full object-cover opacity-30" />
      </div>

      {/* Wallet Connect - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        {!ready ? (
          <div className="bg-gray-800/90 backdrop-blur rounded-xl px-6 py-3 text-gray-300 font-medium flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Initializing...
          </div>
        ) : !authenticated ? (
          <button onClick={login} className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-2 shadow-lg">
            <Wallet className="w-5 h-5" /> Connect Wallet
          </button>
        ) : (
          <div className="flex items-center gap-3 bg-gray-800/90 backdrop-blur rounded-xl px-6 py-3">
            <Wallet className="w-5 h-5 text-yellow-500" />
            <span className="text-white font-mono text-sm">
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Loading...'}
            </span>
            <button onClick={() => logout()} className="text-gray-400 hover:text-white text-sm ml-2 transition-colors">
              Disconnect
            </button>
          </div>
        )}
      </div>

      {/* Back to Whitelist - Top Left */}
      <div className="absolute top-6 left-6 z-20">
        <Link to="/" className="flex items-center gap-2 bg-gray-800/90 backdrop-blur rounded-xl px-4 py-3 text-gray-300 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Whitelist
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-24">
        <div className="max-w-2xl w-full">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-red-600 blur-xl opacity-60 rounded-full" />
                <h1 className="relative text-7xl sm:text-8xl font-black text-white drop-shadow-2xl tracking-tight">1980</h1>
              </div>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-3 drop-shadow-lg">Token Access Sale</h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              {saleInfo.isActive ? (
                <span className="bg-green-500/20 text-green-300 border border-green-500/40 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> Sale Live
                </span>
              ) : (
                <span className="bg-red-500/20 text-red-300 border border-red-500/40 px-4 py-1.5 rounded-full text-sm font-bold">
                  Sale Ended
                </span>
              )}
            </div>
          </div>

          {/* Sale Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center border border-white/20">
              <p className="text-2xl font-black text-white">1.98B</p>
              <p className="text-xs text-blue-200 mt-1">Total Supply</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center border border-white/20">
              <p className="text-2xl font-black text-white">{saleInfo.tokensSold}</p>
              <p className="text-xs text-blue-200 mt-1">Tokens Sold</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center border border-white/20">
              <p className="text-2xl font-black text-yellow-400">0.3954</p>
              <p className="text-xs text-blue-200 mt-1">MERC per Token</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center border border-white/20">
              <p className="text-2xl font-black text-white">1.98%</p>
              <p className="text-xs text-blue-200 mt-1">DEX Tax</p>
            </div>
          </div>

          {/* Sale Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 sm:p-8 space-y-6">

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between mb-2 text-sm text-gray-600">
                  <span>Sale Progress</span>
                  <span className="font-bold text-gray-900">{saleInfo.progress.toFixed(1)}%</span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(saleInfo.progress, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>{saleInfo.tokensSold} sold</span>
                  <span>{saleInfo.tokensRemaining} remaining</span>
                </div>
              </div>

              {/* Alert */}
              {alert && (
                <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
                  alert.type === 'success' ? 'bg-green-50 text-green-800 border-2 border-green-200' :
                  alert.type === 'error' ? 'bg-red-50 text-red-800 border-2 border-red-200' :
                  'bg-blue-50 text-blue-800 border-2 border-blue-200'
                }`}>
                  {alert.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> :
                   alert.type === 'error' ? <AlertCircle className="w-5 h-5 shrink-0" /> :
                   <Loader2 className="w-5 h-5 shrink-0 animate-spin" />}
                  {alert.message}
                </div>
              )}

              {/* Your Balance */}
              {isConnected && (
                <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200">
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Coins className="w-4 h-4 text-yellow-600" /> Your MERC Balance
                  </label>
                  <p className="text-2xl font-black text-gray-900">{mercBalance !== null ? `${mercBalance} MERC` : 'Loading...'}</p>
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                    <span>Purchased: {userInfo.purchased} tokens</span>
                    <span>Limit: {userInfo.maxAllowed} max</span>
                  </div>
                </div>
              )}

              {/* Purchase Form */}
              <form onSubmit={handlePurchase} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Amount of $1980 Tokens
                  </label>
                  <input
                    type="number"
                    value={tokenAmount}
                    onChange={(e) => setTokenAmount(e.target.value)}
                    placeholder="Enter token amount (e.g. 1000)"
                    min="1"
                    step="1"
                    className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 text-lg font-medium focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                  />
                </div>

                {/* Cost Display */}
                <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Fixed Rate</span>
                    <span className="text-sm font-bold text-gray-900">0.3954 MERC = 1 Token</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-700">You will pay</span>
                    <span className="text-2xl font-black text-gray-900">{mercAmount} MERC</span>
                  </div>
                </div>

                {/* Purchase Limit */}
                {isConnected && (
                  <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                    <div className="flex items-center gap-2 text-sm text-blue-800">
                      <Info className="w-4 h-4" />
                      <span><strong>{userInfo.remaining}</strong> tokens remaining in your purchase limit</span>
                    </div>
                  </div>
                )}

                {/* Purchase Button */}
                <button
                  type="submit"
                  disabled={!isConnected || isLoading || !saleInfo.isActive}
                  className="w-full bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 disabled:from-gray-400 disabled:to-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg text-lg"
                >
                  {isLoading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                  ) : !isConnected ? (
                    <><Wallet className="w-5 h-5" /> Connect Wallet to Purchase</>
                  ) : (
                    <><ShoppingCart className="w-5 h-5" /> Purchase Tokens</>
                  )}
                </button>
              </form>

              {/* Disclaimer */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-xs text-gray-500 leading-relaxed">
                  <strong className="text-gray-700">Important:</strong> This is a token access sale, not an investment.
                  The $1980 token is designed for community governance and legacy preservation.
                  MERC is used strictly as a settlement rail at a fixed rate.
                </p>
              </div>

            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-6 space-y-3">
            <button
              onClick={() => setShowPDF(true)}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl transition-all border-2 border-white/30 flex items-center justify-center gap-2"
            >
              📄 Read the Litepaper
            </button>
            <Link
              to="/contribute"
              className="w-full py-3 rounded-xl border-2 border-yellow-400/50 text-yellow-300 font-bold text-sm hover:bg-yellow-500/10 transition-all flex items-center justify-center gap-2"
            >
              🏒 Legacy Contributions
            </Link>
            <Link
              to="/"
              className="w-full py-3 rounded-xl border-2 border-white/20 text-white/70 font-bold text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              Whitelist Registration
            </Link>
          </div>

          {/* Footer Quote */}
          <div className="mt-8 text-center">
            <p className="text-white/90 text-lg sm:text-xl font-bold italic drop-shadow-lg">"Do you believe in miracles?"</p>
            <p className="text-blue-200 text-sm mt-2">February 22, 1980 · Lake Placid, NY</p>
          </div>

          {/* Company Footer */}
          <div className="mt-6 pt-4 border-t border-white/20 text-center">
            <p className="text-white/50 text-sm">© {new Date().getFullYear()} Miracle of 1980 LLC. All rights reserved.</p>
          </div>

        </div>
      </div>

      {/* PDF Modal */}
      <PDFModal isOpen={showPDF} onClose={() => setShowPDF(false)} />
    </div>
  );
}
