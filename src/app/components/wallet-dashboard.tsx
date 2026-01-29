import { useState, useEffect } from 'react';
import { usePrivy, useWallets, useFundWallet } from '@privy-io/react-auth';
import { Wallet, Key, Copy, CheckCircle2, ExternalLink, LogOut, Shield, Clock, Twitter, AlertCircle, CreditCard, Coins, ArrowDownUp, Loader2 } from 'lucide-react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import teamPhoto from '@/assets/cf45d5f11ac0354a95fb3632c5e2369467e0dfa1.png';

// MERC Token on Base Mainnet
const MERC_CONTRACT_ADDRESS = '0x8923947EAfaf4aD68F1f0C9eb5463eC876D79058';
const MERC_DECIMALS = 18;
const WETH_ADDRESS = '0x4200000000000000000000000000000000000006'; // WETH on Base

// Aerodrome Router on Base Mainnet
const AERODROME_ROUTER = '0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43';

// Aerodrome Router ABI (minimal for swaps)
const AERODROME_ROUTER_ABI = [
  {
    "inputs": [
      {"internalType": "uint256", "name": "amountIn", "type": "uint256"},
      {"components": [
        {"internalType": "address", "name": "from", "type": "address"},
        {"internalType": "address", "name": "to", "type": "address"},
        {"internalType": "bool", "name": "stable", "type": "bool"},
        {"internalType": "address", "name": "factory", "type": "address"}
      ], "internalType": "struct IRouter.Route[]", "name": "routes", "type": "tuple[]"}
    ],
    "name": "getAmountsOut",
    "outputs": [{"internalType": "uint256[]", "name": "amounts", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "amountOutMin", "type": "uint256"},
      {"components": [
        {"internalType": "address", "name": "from", "type": "address"},
        {"internalType": "address", "name": "to", "type": "address"},
        {"internalType": "bool", "name": "stable", "type": "bool"},
        {"internalType": "address", "name": "factory", "type": "address"}
      ], "internalType": "struct IRouter.Route[]", "name": "routes", "type": "tuple[]"},
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "deadline", "type": "uint256"}
    ],
    "name": "swapExactETHForTokens",
    "outputs": [{"internalType": "uint256[]", "name": "amounts", "type": "uint256[]"}],
    "stateMutability": "payable",
    "type": "function"
  }
];

// Aerodrome Factory address
const AERODROME_FACTORY = '0x420DD381b31aEf6683db6B902084cB0FFECe40Da';

interface WalletDashboardProps {
  userEmail?: string;
  registrationDate?: string;
  status?: 'pending' | 'confirmed';
  xProfile?: string;
  xVerified?: boolean;
}

export function WalletDashboard({ userEmail, registrationDate, status = 'pending', xProfile: initialXProfile, xVerified: initialXVerified = false }: WalletDashboardProps) {
  const { logout, exportWallet, user, linkTwitter } = usePrivy();
  const { wallets } = useWallets();
  const { fundWallet } = useFundWallet();
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isVerifyingX, setIsVerifyingX] = useState(false);
  const [xProfile, setXProfile] = useState(initialXProfile);
  const [xVerified, setXVerified] = useState(initialXVerified);
  const [mercBalance, setMercBalance] = useState<string | null>(null);
  const [isLoadingMerc, setIsLoadingMerc] = useState(true);
  const [ethBalance, setEthBalance] = useState<string | null>(null);
  
  // Swap state
  const [swapAmount, setSwapAmount] = useState('');
  const [estimatedMerc, setEstimatedMerc] = useState<string | null>(null);
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapError, setSwapError] = useState<string | null>(null);

  const address = wallets[0]?.address;
  const embeddedWallet = wallets.find(wallet => wallet.walletClientType === 'privy');
  const displayEmail = userEmail || user?.email?.address;
  const isConfirmed = status === 'confirmed';

  // Check if user has Twitter linked in Privy
  const privyTwitter = user?.twitter;
  const privyTwitterHandle = privyTwitter?.username ? `@${privyTwitter.username}` : null;

  // Fetch ETH balance
  useEffect(() => {
    const fetchEthBalance = async () => {
      if (!address) return;
      
      try {
        const response = await fetch('https://mainnet.base.org', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_getBalance',
            params: [address, 'latest']
          })
        });
        
        const result = await response.json();
        if (result.result) {
          const balanceWei = BigInt(result.result);
          const balanceEth = Number(balanceWei) / 1e18;
          setEthBalance(balanceEth.toFixed(6));
        }
      } catch (error) {
        console.error('Error fetching ETH balance:', error);
      }
    };

    fetchEthBalance();
    const interval = setInterval(fetchEthBalance, 30000);
    return () => clearInterval(interval);
  }, [address]);

  // Fetch MERC balance
  useEffect(() => {
    const fetchMercBalance = async () => {
      if (!address) return;
      
      setIsLoadingMerc(true);
      try {
        // Use Base Mainnet RPC
        const response = await fetch('https://mainnet.base.org', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_call',
            params: [
              {
                to: MERC_CONTRACT_ADDRESS,
                data: `0x70a08231000000000000000000000000${address.slice(2)}` // balanceOf(address)
              },
              'latest'
            ]
          })
        });
        
        const result = await response.json();
        if (result.result) {
          const balanceWei = BigInt(result.result);
          const balanceFormatted = Number(balanceWei) / Math.pow(10, MERC_DECIMALS);
          setMercBalance(balanceFormatted.toLocaleString(undefined, { maximumFractionDigits: 2 }));
        } else {
          setMercBalance('0');
        }
      } catch (error) {
        console.error('Error fetching MERC balance:', error);
        setMercBalance('--');
      } finally {
        setIsLoadingMerc(false);
      }
    };

    fetchMercBalance();
    // Refresh balance every 30 seconds
    const interval = setInterval(fetchMercBalance, 30000);
    return () => clearInterval(interval);
  }, [address]);

  // Get swap quote when amount changes
  useEffect(() => {
    const getQuote = async () => {
      if (!swapAmount || parseFloat(swapAmount) <= 0) {
        setEstimatedMerc(null);
        return;
      }

      setIsLoadingQuote(true);
      setSwapError(null);
      
      try {
        const amountInWei = BigInt(Math.floor(parseFloat(swapAmount) * 1e18));
        
        // Encode getAmountsOut call
        // Route: WETH -> MERC (volatile pool)
        const route = {
          from: WETH_ADDRESS,
          to: MERC_CONTRACT_ADDRESS,
          stable: false,
          factory: AERODROME_FACTORY
        };
        
        // Encode the function call
        const functionSelector = '0xd7b0e0a5'; // getAmountsOut(uint256,(address,address,bool,address)[])
        const encodedAmount = amountInWei.toString(16).padStart(64, '0');
        const encodedRouteOffset = '0000000000000000000000000000000000000000000000000000000000000040';
        const encodedRouteLength = '0000000000000000000000000000000000000000000000000000000000000001';
        const encodedFrom = WETH_ADDRESS.slice(2).toLowerCase().padStart(64, '0');
        const encodedTo = MERC_CONTRACT_ADDRESS.slice(2).toLowerCase().padStart(64, '0');
        const encodedStable = '0000000000000000000000000000000000000000000000000000000000000000';
        const encodedFactory = AERODROME_FACTORY.slice(2).toLowerCase().padStart(64, '0');
        
        const callData = functionSelector + encodedAmount + encodedRouteOffset + encodedRouteLength + encodedFrom + encodedTo + encodedStable + encodedFactory;
        
        const response = await fetch('https://mainnet.base.org', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_call',
            params: [
              {
                to: AERODROME_ROUTER,
                data: callData
              },
              'latest'
            ]
          })
        });
        
        const result = await response.json();
        
        if (result.result && result.result !== '0x') {
          // Decode the result - it's an array of amounts
          // Skip the offset (32 bytes) and length (32 bytes), then get the second amount
          const hex = result.result.slice(2);
          // The result is: offset (32) + length (32) + amount0 (32) + amount1 (32)
          const amount1Hex = hex.slice(192, 256);
          const mercAmount = BigInt('0x' + amount1Hex);
          const mercFormatted = Number(mercAmount) / 1e18;
          setEstimatedMerc(mercFormatted.toLocaleString(undefined, { maximumFractionDigits: 2 }));
        } else {
          setEstimatedMerc(null);
          setSwapError('Unable to get quote. Pool may not exist.');
        }
      } catch (error) {
        console.error('Error getting quote:', error);
        setEstimatedMerc(null);
        setSwapError('Error fetching quote');
      } finally {
        setIsLoadingQuote(false);
      }
    };

    const debounce = setTimeout(getQuote, 500);
    return () => clearTimeout(debounce);
  }, [swapAmount]);

  // Auto-verify if user has Twitter linked in Privy but registration is not verified
  useEffect(() => {
    const autoVerifyX = async () => {
      if (privyTwitterHandle && !xVerified && address) {
        try {
          const response = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-6849dabd/verify-x`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${publicAnonKey}`,
              },
              body: JSON.stringify({
                walletAddress: address,
                verifiedXHandle: privyTwitterHandle,
              }),
            }
          );

          const result = await response.json();
          if (result.success) {
            setXProfile(privyTwitterHandle);
            setXVerified(true);
          }
        } catch (error) {
          console.error('Error auto-verifying X:', error);
        }
      }
    };

    autoVerifyX();
  }, [privyTwitterHandle, xVerified, address]);

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExportWallet = async () => {
    try {
      setIsExporting(true);
      await exportWallet();
    } catch (error) {
      console.error('Error exporting wallet:', error);
      alert('Unable to export wallet. This feature is only available for embedded wallets created through Privy.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleVerifyX = async () => {
    try {
      setIsVerifyingX(true);
      
      // Link Twitter via Privy
      await linkTwitter();
      
      // Note: The actual verification will happen via the useEffect above
      // when user.twitter becomes available after linking
      
    } catch (error) {
      console.error('Error linking Twitter:', error);
      alert('Unable to verify X account. Please try again.');
    } finally {
      setIsVerifyingX(false);
    }
  };

  const handleFundWallet = async () => {
    try {
      await fundWallet({ 
        address: address as string,
        chain: { id: 8453, name: 'Base' }
      });
    } catch (error) {
      console.error('Error opening fund wallet:', error);
    }
  };

  const handleSwap = async () => {
    if (!embeddedWallet || !swapAmount || parseFloat(swapAmount) <= 0) return;
    
    setIsSwapping(true);
    setSwapError(null);
    
    try {
      const provider = await embeddedWallet.getEthereumProvider();
      
      const amountInWei = BigInt(Math.floor(parseFloat(swapAmount) * 1e18));
      const deadline = Math.floor(Date.now() / 1000) + 1200; // 20 minutes
      
      // Calculate minimum out with 2% slippage
      const estimatedOut = estimatedMerc ? parseFloat(estimatedMerc.replace(/,/g, '')) : 0;
      const minOut = BigInt(Math.floor(estimatedOut * 0.98 * 1e18));
      
      // Encode swapExactETHForTokens call
      const functionSelector = '0x1f00ca74'; // This is wrong, let me fix
      
      // Actually, let's use a simpler approach - direct transaction
      // swapExactETHForTokens(uint256 amountOutMin, Route[] routes, address to, uint256 deadline)
      const selector = '0x304e6ade'; // swapExactETHForTokens
      
      // Encode parameters
      const minOutHex = minOut.toString(16).padStart(64, '0');
      const routesOffset = '0000000000000000000000000000000000000000000000000000000000000080';
      const toAddress = address!.slice(2).toLowerCase().padStart(64, '0');
      const deadlineHex = deadline.toString(16).padStart(64, '0');
      const routesLength = '0000000000000000000000000000000000000000000000000000000000000001';
      const fromToken = WETH_ADDRESS.slice(2).toLowerCase().padStart(64, '0');
      const toToken = MERC_CONTRACT_ADDRESS.slice(2).toLowerCase().padStart(64, '0');
      const stable = '0000000000000000000000000000000000000000000000000000000000000000';
      const factory = AERODROME_FACTORY.slice(2).toLowerCase().padStart(64, '0');
      
      const data = selector + minOutHex + routesOffset + toAddress + deadlineHex + routesLength + fromToken + toToken + stable + factory;
      
      // Send transaction
      const txHash = await provider.request({
        method: 'eth_sendTransaction',
        params: [{
          from: address,
          to: AERODROME_ROUTER,
          value: '0x' + amountInWei.toString(16),
          data: data,
          chainId: '0x2105' // Base mainnet
        }]
      });
      
      console.log('Swap transaction sent:', txHash);
      
      // Wait a bit and refresh balances
      setTimeout(() => {
        setSwapAmount('');
        setEstimatedMerc(null);
      }, 2000);
      
      alert('Swap submitted! Transaction: ' + txHash);
      
    } catch (error: any) {
      console.error('Swap error:', error);
      setSwapError(error.message || 'Swap failed. Please try again.');
    } finally {
      setIsSwapping(false);
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
        <img
          src={teamPhoto}
          alt="1980 USA Hockey Team"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Logout Button - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-gray-800/90 backdrop-blur rounded-xl px-4 py-2 text-gray-300 hover:text-white transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-20">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block mb-6">
              <div className="relative">
                <div className={`absolute inset-0 ${isConfirmed ? 'bg-green-600' : 'bg-blue-600'} blur-xl opacity-60 rounded-full`} />
                {isConfirmed ? (
                  <CheckCircle2 className="relative w-20 h-20 text-white drop-shadow-2xl" />
                ) : (
                  <Clock className="relative w-20 h-20 text-white drop-shadow-2xl" />
                )}
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 drop-shadow-lg">
              Welcome Back!
            </h1>
            <p className="text-xl text-blue-200 mb-2">
              You're on the $1980 MIRACLE Whitelist
            </p>
          </div>

          {/* Dashboard Card */}
          <div className={`bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 sm:p-10 border-4 ${isConfirmed ? 'border-green-600' : 'border-blue-600'}`}>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-1 w-16 bg-red-600 rounded" />
              <h3 className="text-2xl font-black text-gray-900 uppercase tracking-wide">
                Your Wallet
              </h3>
              <div className="h-1 w-16 bg-blue-600 rounded" />
            </div>

            {/* Wallet Info */}
            <div className="space-y-6">
              {/* Wallet Address */}
              <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-blue-600" />
                  Wallet Address
                </label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-white px-4 py-3 rounded-lg border border-gray-300 font-mono text-sm break-all">
                    {address}
                  </code>
                  <button
                    onClick={copyAddress}
                    className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex-shrink-0"
                    title="Copy address"
                  >
                    {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                <a
                  href={`https://basescan.org/address/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  View on BaseScan <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Fund Wallet */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-200">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  Fund Your Wallet
                </label>
                <p className="text-sm text-gray-600 mb-3">
                  Add ETH to your wallet using a credit card, Apple Pay, or Google Pay.
                </p>
                <button
                  onClick={handleFundWallet}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Buy ETH with Card
                </button>
              </div>

              {/* Get Ready for $1980 Sale - MERC Section with Embedded Swap */}
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 border-2 border-yellow-400">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Coins className="w-4 h-4 text-yellow-600" />
                  Get Ready for the $1980 Sale
                </label>
                <p className="text-sm text-gray-600 mb-3">
                  You will need MERC to participate in the $1980 token sale.
                </p>
                
                {/* Balances Display */}
                <div className="bg-white rounded-lg p-3 mb-3 border border-yellow-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Your ETH Balance:</span>
                    <span className="font-bold text-gray-900">{ethBalance || '--'} ETH</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Your MERC Balance:</span>
                    <span className="font-bold text-gray-900">
                      {isLoadingMerc ? (
                        <span className="text-gray-400">Loading...</span>
                      ) : (
                        <span>{mercBalance} MERC</span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Embedded Swap Widget */}
                <div className="bg-white rounded-lg p-4 border border-yellow-300">
                  <div className="flex items-center gap-2 mb-3">
                    <ArrowDownUp className="w-4 h-4 text-yellow-600" />
                    <span className="font-bold text-gray-800">Swap ETH → MERC</span>
                  </div>
                  
                  {/* Input */}
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">You pay</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={swapAmount}
                          onChange={(e) => setSwapAmount(e.target.value)}
                          placeholder="0.0"
                          step="0.001"
                          min="0"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-lg font-mono focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        <span className="font-bold text-gray-700 bg-gray-100 px-3 py-2 rounded-lg">ETH</span>
                      </div>
                      {ethBalance && (
                        <button 
                          onClick={() => setSwapAmount((parseFloat(ethBalance) * 0.95).toFixed(6))}
                          className="text-xs text-yellow-600 hover:text-yellow-700 mt-1"
                        >
                          Max: {ethBalance} ETH
                        </button>
                      )}
                    </div>
                    
                    <div className="flex justify-center">
                      <div className="bg-yellow-100 rounded-full p-1">
                        <ArrowDownUp className="w-4 h-4 text-yellow-600" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">You receive (estimated)</label>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-lg font-mono bg-gray-50 text-gray-700">
                          {isLoadingQuote ? (
                            <span className="text-gray-400">Loading...</span>
                          ) : estimatedMerc ? (
                            estimatedMerc
                          ) : (
                            <span className="text-gray-400">0.0</span>
                          )}
                        </div>
                        <span className="font-bold text-gray-700 bg-gray-100 px-3 py-2 rounded-lg">MERC</span>
                      </div>
                    </div>
                  </div>
                  
                  {swapError && (
                    <p className="text-red-500 text-xs mt-2">{swapError}</p>
                  )}
                  
                  <button
                    onClick={handleSwap}
                    disabled={isSwapping || !swapAmount || parseFloat(swapAmount) <= 0 || !estimatedMerc}
                    className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {isSwapping ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Swapping...
                      </>
                    ) : (
                      <>
                        <Coins className="w-4 h-4" />
                        Swap for MERC
                      </>
                    )}
                  </button>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Powered by Aerodrome • 2% slippage tolerance
                  </p>
                </div>
              </div>

              {/* Email */}
              {displayEmail && (
                <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email
                  </label>
                  <p className="text-gray-900">{displayEmail}</p>
                </div>
              )}

              {/* X Profile with Verification Status */}
              <div className={`rounded-xl p-4 border-2 ${xVerified ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-300'}`}>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Twitter className="w-4 h-4 text-blue-600" />
                  X (Twitter) Profile
                </label>
                <div className="flex items-center gap-2">
                  <p className="text-gray-900 font-medium">{xProfile}</p>
                  {xVerified ? (
                    <span className="inline-flex items-center gap-1 text-green-700 text-sm font-medium bg-green-100 px-2 py-1 rounded-full">
                      <CheckCircle2 className="w-4 h-4" />
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-yellow-700 text-sm font-medium bg-yellow-100 px-2 py-1 rounded-full">
                      <AlertCircle className="w-4 h-4" />
                      Unverified
                    </span>
                  )}
                </div>
                
                {/* Verify X Button - Only show if not verified */}
                {!xVerified && (
                  <div className="mt-3">
                    <button
                      onClick={handleVerifyX}
                      disabled={isVerifyingX}
                      className="w-full bg-black hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Twitter className="w-4 h-4" />
                      {isVerifyingX ? 'Verifying...' : 'Verify X Account'}
                    </button>
                    <p className="text-xs text-yellow-700 mt-2 text-center">
                      Verify your X account to increase your chances of allocation
                    </p>
                  </div>
                )}
              </div>

              {/* Registration Status - Dynamic based on status */}
              {isConfirmed ? (
                <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                  <div className="flex items-center gap-2 text-green-800">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-bold">Whitelist Confirmed</span>
                  </div>
                  {registrationDate && (
                    <p className="text-sm text-green-700 mt-1">
                      Registered on {new Date(registrationDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ) : (
                <div className="bg-gray-100 rounded-xl p-4 border-2 border-gray-300">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-5 h-5" />
                    <span className="font-bold">Whitelist Pending</span>
                  </div>
                  {registrationDate && (
                    <p className="text-sm text-gray-600 mt-1">
                      Registered on {new Date(registrationDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              )}

              {/* Export Wallet Button */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Wallet Security
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Export your private key to back up your wallet or use it with other wallet apps like MetaMask. 
                  <strong className="text-red-600"> Never share your private key with anyone!</strong>
                </p>
                <button
                  onClick={handleExportWallet}
                  disabled={isExporting}
                  className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                >
                  <Key className="w-5 h-5" />
                  {isExporting ? 'Opening Export...' : 'Export Private Key'}
                </button>
                
                {/* Share on X Button */}
                <button
                  onClick={() => {
                    const tweetText = "I just registered for the $1980 whitelist! 🏒🇺🇸 #DoYouBelieveInMiracles?";
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, "_blank");
                  }}
                  className="w-full mt-3 bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                >
                  <Twitter className="w-5 h-5" />
                  Share on X
                </button>
                <p className="text-xs text-gray-500 text-center mt-2 italic">
                  This may or may not help guarantee your miracle in securing $1980 😉
                </p>
              </div>
            </div>

            {/* Info Banner */}
            <div className="mt-8 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
              <p className="text-sm text-blue-900 text-center">
                <span className="font-bold">Stay tuned!</span> We'll notify you via email when the $1980 MIRACLE token launches.
              </p>
            </div>
          </div>

          {/* Footer Quote */}
          <div className="mt-8 text-center">
            <p className="text-white/90 text-lg sm:text-xl font-bold italic drop-shadow-lg">
              "Do you believe in miracles? YES!"
            </p>
            <p className="text-blue-200 text-sm mt-2">
              - Al Michaels, February 22, 1980
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
