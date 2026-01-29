import { useState, useEffect } from 'react';
import { usePrivy, useWallets, useFundWallet } from '@privy-io/react-auth';
import { Wallet, Key, Copy, CheckCircle2, ExternalLink, LogOut, Shield, Clock, Twitter, AlertCircle, CreditCard, Coins, ArrowDownUp, Loader2 } from 'lucide-react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import teamPhoto from '@/assets/cf45d5f11ac0354a95fb3632c5e2369467e0dfa1.png';
import mercLogo from '@/assets/merc-logo.svg';
import { encodeFunctionData, decodeFunctionResult } from 'viem';

// Token addresses on Base Mainnet
const MERC_CONTRACT_ADDRESS = '0x8923947EAfaf4aD68F1f0C9eb5463eC876D79058';
const WETH_ADDRESS = '0x4200000000000000000000000000000000000006';
const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
const MERC_DECIMALS = 18;

// Aerodrome contracts on Base Mainnet
const AERODROME_ROUTER = '0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43';
const AERODROME_FACTORY = '0x420DD381b31aEf6683db6B902084cB0FFECe40Da';

// Aerodrome Router ABI (only the functions we need)
const AERODROME_ROUTER_ABI = [
  {
    name: 'getAmountsOut',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'amountIn', type: 'uint256' },
      {
        name: 'routes',
        type: 'tuple[]',
        components: [
          { name: 'from', type: 'address' },
          { name: 'to', type: 'address' },
          { name: 'stable', type: 'bool' },
          { name: 'factory', type: 'address' }
        ]
      }
    ],
    outputs: [{ name: 'amounts', type: 'uint256[]' }]
  },
  {
    name: 'swapExactETHForTokens',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: 'amountOutMin', type: 'uint256' },
      {
        name: 'routes',
        type: 'tuple[]',
        components: [
          { name: 'from', type: 'address' },
          { name: 'to', type: 'address' },
          { name: 'stable', type: 'bool' },
          { name: 'factory', type: 'address' }
        ]
      },
      { name: 'to', type: 'address' },
      { name: 'deadline', type: 'uint256' }
    ],
    outputs: [{ name: 'amounts', type: 'uint256[]' }]
  }
] as const;

interface WalletDashboardProps {
  userEmail?: string;
  registrationDate?: string;
  status?: 'pending' | 'confirmed';
  xProfile?: string;
  xVerified?: boolean;
}

// Define the routes for 2-hop swap: WETH -> USDC -> MERC
const SWAP_ROUTES = [
  {
    from: WETH_ADDRESS as `0x${string}`,
    to: USDC_ADDRESS as `0x${string}`,
    stable: false,
    factory: AERODROME_FACTORY as `0x${string}`
  },
  {
    from: USDC_ADDRESS as `0x${string}`,
    to: MERC_CONTRACT_ADDRESS as `0x${string}`,
    stable: false,
    factory: AERODROME_FACTORY as `0x${string}`
  }
] as const;

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
          body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_getBalance', params: [address, 'latest'] })
        });
        const result = await response.json();
        if (result.result) {
          const balanceWei = BigInt(result.result);
          setEthBalance((Number(balanceWei) / 1e18).toFixed(6));
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
        const response = await fetch('https://mainnet.base.org', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0', id: 1, method: 'eth_call',
            params: [{ to: MERC_CONTRACT_ADDRESS, data: `0x70a08231000000000000000000000000${address.slice(2)}` }, 'latest']
          })
        });
        const result = await response.json();
        if (result.result) {
          const balanceWei = BigInt(result.result);
          setMercBalance((Number(balanceWei) / 1e18).toLocaleString(undefined, { maximumFractionDigits: 2 }));
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
    const interval = setInterval(fetchMercBalance, 30000);
    return () => clearInterval(interval);
  }, [address]);

  // Get 2-hop swap quote (ETH -> USDC -> MERC)
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
        
        // Use viem to properly encode the getAmountsOut call with struct array
        const data = encodeFunctionData({
          abi: AERODROME_ROUTER_ABI,
          functionName: 'getAmountsOut',
          args: [amountInWei, SWAP_ROUTES]
        });
        
        const response = await fetch('https://mainnet.base.org', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_call', params: [{ to: AERODROME_ROUTER, data }, 'latest'] })
        });
        
        const result = await response.json();
        console.log('Quote RPC result:', result);
        
        if (result.result && result.result !== '0x' && result.result.length > 2) {
          // Decode the result using viem
          const decoded = decodeFunctionResult({
            abi: AERODROME_ROUTER_ABI,
            functionName: 'getAmountsOut',
            data: result.result
          });
          
          console.log('Decoded amounts:', decoded);
          
          // viem returns the array directly or wrapped - handle both cases
          const amounts = Array.isArray(decoded) ? decoded : (decoded as any).amounts || decoded;
          const amountsArray = Array.isArray(amounts[0]) ? amounts[0] : amounts;
          
          console.log('Amounts array:', amountsArray);
          
          // amounts = [inputAmount, afterHop1(USDC), afterHop2(MERC)]
          const mercAmount = amountsArray[amountsArray.length - 1] as bigint;
          const mercFormatted = Number(mercAmount) / 1e18;
          
          console.log('MERC amount:', mercAmount, 'formatted:', mercFormatted);
          
          if (mercFormatted > 0) {
            setEstimatedMerc(mercFormatted.toLocaleString(undefined, { maximumFractionDigits: 2 }));
          } else {
            setSwapError('No liquidity available');
          }
        } else {
          console.log('Quote failed - result:', result);
          setSwapError('Unable to get quote');
        }
      } catch (error) {
        console.error('Quote error:', error);
        setSwapError('Error fetching quote');
      } finally {
        setIsLoadingQuote(false);
      }
    };
    const debounce = setTimeout(getQuote, 500);
    return () => clearTimeout(debounce);
  }, [swapAmount]);

  // Auto-verify X
  useEffect(() => {
    const autoVerifyX = async () => {
      if (privyTwitterHandle && !xVerified && address) {
        try {
          const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-6849dabd/verify-x`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${publicAnonKey}` },
            body: JSON.stringify({ walletAddress: address, verifiedXHandle: privyTwitterHandle })
          });
          const result = await response.json();
          if (result.success) { setXProfile(privyTwitterHandle); setXVerified(true); }
        } catch (error) { console.error('Error auto-verifying X:', error); }
      }
    };
    autoVerifyX();
  }, [privyTwitterHandle, xVerified, address]);

  const copyAddress = async () => {
    if (address) { await navigator.clipboard.writeText(address); setCopied(true); setTimeout(() => setCopied(false), 2000); }
  };

  const handleExportWallet = async () => {
    try { setIsExporting(true); await exportWallet(); }
    catch (error) { console.error('Error exporting wallet:', error); alert('Unable to export wallet.'); }
    finally { setIsExporting(false); }
  };

  const handleVerifyX = async () => {
    try { setIsVerifyingX(true); await linkTwitter(); }
    catch (error) { console.error('Error linking Twitter:', error); alert('Unable to verify X account.'); }
    finally { setIsVerifyingX(false); }
  };

  const handleFundWallet = async () => {
    try { await fundWallet({ address: address as string, chain: { id: 8453, name: 'Base' } }); }
    catch (error) { console.error('Error opening fund wallet:', error); }
  };

  const handleSwap = async () => {
    if (!embeddedWallet || !swapAmount || parseFloat(swapAmount) <= 0 || !estimatedMerc || !address) return;
    setIsSwapping(true);
    setSwapError(null);
    
    try {
      const provider = await embeddedWallet.getEthereumProvider();
      const amountInWei = BigInt(Math.floor(parseFloat(swapAmount) * 1e18));
      const deadline = BigInt(Math.floor(Date.now() / 1000) + 1200);
      const estimatedOut = parseFloat(estimatedMerc.replace(/,/g, ''));
      const minOut = BigInt(Math.floor(estimatedOut * 0.96 * 1e18)); // 4% slippage
      
      // Use viem to properly encode the swapExactETHForTokens call
      const data = encodeFunctionData({
        abi: AERODROME_ROUTER_ABI,
        functionName: 'swapExactETHForTokens',
        args: [minOut, SWAP_ROUTES, address as `0x${string}`, deadline]
      });
      
      const txHash = await provider.request({
        method: 'eth_sendTransaction',
        params: [{ from: address, to: AERODROME_ROUTER, value: '0x' + amountInWei.toString(16), data, chainId: '0x2105' }]
      });
      
      console.log('Swap tx:', txHash);
      setTimeout(() => { setSwapAmount(''); setEstimatedMerc(null); }, 2000);
      alert(`Swap submitted!\n\nTx: ${txHash}\n\nhttps://basescan.org/tx/${txHash}`);
    } catch (error: any) {
      console.error('Swap error:', error);
      setSwapError(error.message || 'Swap failed');
    } finally {
      setIsSwapping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-red-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 35px, white 35px, white 37px)' }} />
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 35px, white 35px, white 37px)' }} />
      </div>
      <div className="absolute inset-0 z-0">
        <img src={teamPhoto} alt="1980 USA Hockey Team" className="w-full h-full object-cover opacity-30" />
      </div>
      <div className="absolute top-6 right-6 z-20">
        <button onClick={logout} className="flex items-center gap-2 bg-gray-800/90 backdrop-blur rounded-xl px-4 py-2 text-gray-300 hover:text-white transition-colors">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-20">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="inline-block mb-6">
              <div className="relative">
                <div className={`absolute inset-0 ${isConfirmed ? 'bg-green-600' : 'bg-blue-600'} blur-xl opacity-60 rounded-full`} />
                {isConfirmed ? <CheckCircle2 className="relative w-20 h-20 text-white drop-shadow-2xl" /> : <Clock className="relative w-20 h-20 text-white drop-shadow-2xl" />}
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 drop-shadow-lg">Welcome Back!</h1>
            <p className="text-xl text-blue-200 mb-2">You're on the $1980 MIRACLE Whitelist</p>
          </div>

          <div className={`bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 sm:p-10 border-4 ${isConfirmed ? 'border-green-600' : 'border-blue-600'}`}>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-1 w-16 bg-red-600 rounded" />
              <h3 className="text-2xl font-black text-gray-900 uppercase tracking-wide">Your Wallet</h3>
              <div className="h-1 w-16 bg-blue-600 rounded" />
            </div>

            <div className="space-y-6">
              {/* Wallet Address */}
              <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-blue-600" /> Wallet Address
                </label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-white px-4 py-3 rounded-lg border border-gray-300 font-mono text-sm break-all">{address}</code>
                  <button onClick={copyAddress} className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex-shrink-0">
                    {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                <a href={`https://basescan.org/address/${address}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 text-sm text-blue-600 hover:text-blue-800">
                  View on BaseScan <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Fund Wallet */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-200">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-600" /> Fund Your Wallet
                </label>
                <p className="text-sm text-gray-600 mb-3">Add ETH to your wallet using a credit card, Apple Pay, or Google Pay.</p>
                <button onClick={handleFundWallet} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <CreditCard className="w-4 h-4" /> Buy ETH with Card
                </button>
              </div>

              {/* MERC Swap Section */}
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 border-2 border-yellow-400">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Coins className="w-4 h-4 text-yellow-600" /> Get Ready for the $1980 Sale
                </label>
                <p className="text-sm text-gray-600 mb-3">You will need MERC to participate in the $1980 token sale.</p>
                
                <div className="bg-white rounded-lg p-3 mb-3 border border-yellow-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Your ETH Balance:</span>
                    <span className="font-bold text-gray-900">{ethBalance || '--'} ETH</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Your MERC Balance:</span>
                    <span className="font-bold text-gray-900">{isLoadingMerc ? 'Loading...' : `${mercBalance} MERC`}</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-yellow-300">
                  <div className="flex items-center gap-2 mb-3">
                    <ArrowDownUp className="w-4 h-4 text-yellow-600" />
                    <span className="font-bold text-gray-800">Swap ETH → MERC</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">You pay</label>
                      <div className="flex items-center gap-2">
                        <input type="number" value={swapAmount} onChange={(e) => setSwapAmount(e.target.value)} placeholder="0.0" step="0.001" min="0" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-lg font-mono focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                        <span className="font-bold text-gray-700 bg-gray-100 px-3 py-2 rounded-lg">ETH</span>
                      </div>
                      {ethBalance && <button onClick={() => setSwapAmount((parseFloat(ethBalance) * 0.95).toFixed(6))} className="text-xs text-yellow-600 hover:text-yellow-700 mt-1">Max: {ethBalance} ETH</button>}
                    </div>
                    
                    <div className="flex justify-center"><div className="bg-yellow-100 rounded-full p-1"><ArrowDownUp className="w-4 h-4 text-yellow-600" /></div></div>
                    
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">You receive (estimated)</label>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-lg font-mono bg-gray-50 text-gray-700">
                          {isLoadingQuote ? 'Loading...' : estimatedMerc || '0.0'}
                        </div>
                        <span className="font-bold text-gray-700 bg-gray-100 px-3 py-2 rounded-lg">MERC</span>
                      </div>
                    </div>
                  </div>
                  
                  {swapError && <p className="text-red-500 text-xs mt-2">{swapError}</p>}
                  
                  <button onClick={handleSwap} disabled={isSwapping || !swapAmount || parseFloat(swapAmount) <= 0 || !estimatedMerc} className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                    {isSwapping ? <><Loader2 className="w-4 h-4 animate-spin" /> Swapping...</> : <><Coins className="w-4 h-4" /> Swap for MERC</>}
                  </button>
                  <p className="text-xs text-gray-500 mt-2 text-center">Powered by Aerodrome • ETH → USDC → MERC • 4% slippage</p>
                </div>

                {/* MERC Info Panel */}
                <div className="mt-4 bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <img src={mercLogo} alt="Liquid Mercury" className="h-8" />
                    <a
                      href="https://liquidmercury.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded-lg text-sm transition-colors flex items-center gap-1"
                    >
                      Visit Website <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <p className="text-xs text-gray-400 mb-1">MERC Contract Address (Base)</p>
                    <div className="flex items-center gap-2">
                      <code className="text-xs text-cyan-300 font-mono break-all">{MERC_CONTRACT_ADDRESS}</code>
                      <a
                        href={`https://basescan.org/token/${MERC_CONTRACT_ADDRESS}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 flex-shrink-0"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              {displayEmail && (
                <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                  <p className="text-gray-900">{displayEmail}</p>
                </div>
              )}

              {/* X Profile */}
              <div className={`rounded-xl p-4 border-2 ${xVerified ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-300'}`}>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Twitter className="w-4 h-4 text-blue-600" /> X (Twitter) Profile
                </label>
                <div className="flex items-center gap-2">
                  <p className="text-gray-900 font-medium">{xProfile}</p>
                  {xVerified ? (
                    <span className="inline-flex items-center gap-1 text-green-700 text-sm font-medium bg-green-100 px-2 py-1 rounded-full"><CheckCircle2 className="w-4 h-4" /> Verified</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-yellow-700 text-sm font-medium bg-yellow-100 px-2 py-1 rounded-full"><AlertCircle className="w-4 h-4" /> Unverified</span>
                  )}
                </div>
                {!xVerified && (
                  <div className="mt-3">
                    <button onClick={handleVerifyX} disabled={isVerifyingX} className="w-full bg-black hover:bg-gray-800 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <Twitter className="w-4 h-4" /> {isVerifyingX ? 'Verifying...' : 'Verify X Account'}
                    </button>
                    <p className="text-xs text-yellow-700 mt-2 text-center">Verify your X account to increase your chances of allocation</p>
                  </div>
                )}
              </div>

              {/* Status */}
              {isConfirmed ? (
                <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                  <div className="flex items-center gap-2 text-green-800"><CheckCircle2 className="w-5 h-5" /><span className="font-bold">Whitelist Confirmed</span></div>
                  {registrationDate && <p className="text-sm text-green-700 mt-1">Registered on {new Date(registrationDate).toLocaleDateString()}</p>}
                </div>
              ) : (
                <div className="bg-gray-100 rounded-xl p-4 border-2 border-gray-300">
                  <div className="flex items-center gap-2 text-gray-700"><Clock className="w-5 h-5" /><span className="font-bold">Whitelist Pending</span></div>
                  {registrationDate && <p className="text-sm text-gray-600 mt-1">Registered on {new Date(registrationDate).toLocaleDateString()}</p>}
                </div>
              )}

              {/* Security */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"><Shield className="w-5 h-5 text-blue-600" /> Wallet Security</h4>
                <p className="text-sm text-gray-600 mb-4">Export your private key to back up your wallet.<strong className="text-red-600"> Never share your private key!</strong></p>
                <button onClick={handleExportWallet} disabled={isExporting} className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 disabled:opacity-50 text-black font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg">
                  <Key className="w-5 h-5" /> {isExporting ? 'Opening Export...' : 'Export Private Key'}
                </button>
                <button onClick={() => { window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent("I just registered for the $1980 whitelist! 🏒🇺🇸 #DoYouBelieveInMiracles?")}`, "_blank"); }} className="w-full mt-3 bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg">
                  <Twitter className="w-5 h-5" /> Share on X
                </button>
                <p className="text-xs text-gray-500 text-center mt-2 italic">This may or may not help guarantee your miracle in securing $1980 😉</p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
              <p className="text-sm text-blue-900 text-center"><span className="font-bold">Stay tuned!</span> We'll notify you via email when the $1980 MIRACLE token launches.</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-white/90 text-lg sm:text-xl font-bold italic drop-shadow-lg">"Do you believe in miracles? YES!"</p>
            <p className="text-blue-200 text-sm mt-2">- Al Michaels, February 22, 1980</p>
          </div>
        </div>
      </div>
    </div>
  );
}
