import { useState, useEffect, useRef } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useForm } from 'react-hook-form';
import { Twitter, Mail, Wallet, CheckCircle2, Loader2 } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { PasscodeGate } from '@/app/components/passcode-gate';
import { PrivyDiagnostic } from '@/app/components/privy-diagnostic';
import { WalletDashboard } from '@/app/components/wallet-dashboard';
import { WHITELIST_CONFIG, validatePasscode, markCodeAsUsed } from '@/app/components/whitelist-config';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import teamPhoto from '@/assets/cf45d5f11ac0354a95fb3632c5e2369467e0dfa1.png';

interface FormData {
  walletAddress: string;
  xProfile: string;
  email: string;
  inviteCode?: string;
}

interface RegistrationStatus {
  status?: 'pending' | 'confirmed';
  isRegistered: boolean;
  registrationDate?: string;
  email?: string;
}

const STORAGE_KEY = 'miracle_whitelist_access';

export function WhitelistPage() {
  // Privy hooks
  const { login, logout, authenticated, ready, user, createWallet } = usePrivy();
  const { wallets } = useWallets();

  // Registration status
  const [registrationStatus, setRegistrationStatus] = useState<RegistrationStatus | null>(null);
  const [checkingRegistration, setCheckingRegistration] = useState(false);

  // Show diagnostic if Privy doesn't load within 15 seconds (extended timeout for production)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!ready) {
        console.error('Privy failed to load - showing diagnostic');
        setLoadingTimeout(true);
        setShowDiagnostic(true);
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [ready]);

  // Manual clear session function (for troubleshooting)
  const clearSessionData = () => {
    try {
      const privyKeys = Object.keys(localStorage).filter(key => 
        key.toLowerCase().includes('privy')
      );
      privyKeys.forEach(key => localStorage.removeItem(key));
      
      const sessionPrivyKeys = Object.keys(sessionStorage).filter(key => 
        key.toLowerCase().includes('privy')
      );
      sessionPrivyKeys.forEach(key => sessionStorage.removeItem(key));
      
      window.location.reload();
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  };
  
  // Derived wallet state
  const address = wallets[0]?.address;
  const isConnected = authenticated && wallets.length > 0 && !!address;
  
  // Check if we're waiting for wallet to be created (authenticated but no address yet)
  const isWaitingForWallet = authenticated && !address;
  
  // State to track how long we've been waiting
  const [waitingDuration, setWaitingDuration] = useState(0);
  const [skipWalletCreation, setSkipWalletCreation] = useState(false);
  const walletCreationAttemptedRef = useRef(false);
  const [isRetrying, setIsRetrying] = useState(false);
  
  // Track waiting duration
  useEffect(() => {
    if (isWaitingForWallet && !skipWalletCreation) {
      const interval = setInterval(() => {
        setWaitingDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setWaitingDuration(0);
    }
  }, [isWaitingForWallet, skipWalletCreation]);

  const [submitted, setSubmitted] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [usedCode, setUsedCode] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    defaultValues: {
      walletAddress: '',
      xProfile: '',
      email: '',
    }
  });

  // Initialize access state from localStorage
  useEffect(() => {
    if (!WHITELIST_CONFIG.gateEnabled) {
      setHasAccess(true);
      setIsInitialized(true);
      return;
    }
    
    if (WHITELIST_CONFIG.rememberPasscode) {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && validatePasscode(stored)) {
        setHasAccess(true);
        setUsedCode(stored);
      }
    }
    setIsInitialized(true);
  }, []);

  // Check if user is already registered when they connect
  useEffect(() => {
    const checkRegistration = async () => {
      if (!isConnected || !address) return;
      
      setCheckingRegistration(true);
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-6849dabd/check-registration`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify({ walletAddress: address }),
          }
        );

        const result = await response.json();
        
        if (result.isRegistered) {
          setRegistrationStatus({
            isRegistered: true,
            registrationDate: result.registrationDate,
            status: result.status || 'pending',
            email: result.email,
          });
        } else {
          setRegistrationStatus({ isRegistered: false });
        }
      } catch (error) {
        console.error('Error checking registration:', error);
        // If check fails, assume not registered and let them try to register
        setRegistrationStatus({ isRegistered: false });
      } finally {
        setCheckingRegistration(false);
      }
    };

    checkRegistration();
  }, [isConnected, address]);

  // Auto-fill wallet address when connected
  useEffect(() => {
    if (hasAccess && isConnected && address) {
      setValue('walletAddress', address, { shouldValidate: false });
    }
  }, [hasAccess, isConnected, address, setValue]);

  // Auto-fill email from Privy user (email/social login)
  useEffect(() => {
    if (user?.email?.address) {
      setValue('email', user.email.address, { shouldValidate: false });
    }
  }, [user, setValue]);

  // Auto-create wallet for users without one
  useEffect(() => {
    const autoCreateWallet = async () => {
      // If user is authenticated, ready, and has no wallet
      if (authenticated && ready && wallets.length === 0 && !skipWalletCreation && !walletCreationAttemptedRef.current) {
        console.log('No wallet found. Checking if createWallet is available...');
        
        // Mark that we've attempted creation to prevent duplicates
        walletCreationAttemptedRef.current = true;
        
        // Check if createWallet method exists
        if (!createWallet) {
          console.warn('createWallet method not available in this Privy version');
          console.log('Embedded wallets should auto-create. If stuck, please check Privy dashboard settings.');
          // After 10 seconds, auto-skip if still no wallet
          setTimeout(() => {
            if (wallets.length === 0) {
              console.log('No wallet created after 10s, enabling manual entry');
              setSkipWalletCreation(true);
            }
          }, 10000);
          return;
        }
        
        console.log('Attempting to create embedded wallet...');
        try {
          await createWallet();
          console.log('Wallet creation initiated');
        } catch (error) {
          console.error('Error creating wallet:', error);
          // Auto-skip if wallet creation fails
          setTimeout(() => setSkipWalletCreation(true), 2000);
        }
      }
    };

    autoCreateWallet();
  }, [authenticated, ready, wallets.length, skipWalletCreation, createWallet]);

  // Debug logging for wallet status
  useEffect(() => {
    if (authenticated) {
      console.log('Privy Wallet Status:', {
        authenticated,
        ready,
        walletsCount: wallets.length,
        walletAddresses: wallets.map(w => w.address),
        hasAddress: !!address,
        userEmail: user?.email?.address,
        loginMethod: user?.linkedAccounts?.[0]?.type,
        hasCreateWallet: !!createWallet,
        creationAttempted: walletCreationAttemptedRef.current,
        skipWalletCreation,
        registrationStatus,
      });
    }
  }, [authenticated, ready, wallets.length, address, user, createWallet, skipWalletCreation, registrationStatus]);

  const handlePasscodeSuccess = (code: string) => {
    setHasAccess(true);
    setUsedCode(code);
    markCodeAsUsed(code);
    
    if (WHITELIST_CONFIG.rememberPasscode) {
      localStorage.setItem(STORAGE_KEY, code);
    }
  };

  const onSubmit = async (data: FormData) => {

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-6849dabd/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            ...data,
            inviteCode: usedCode,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        // Update registration status
        setRegistrationStatus({
          isRegistered: true,
          registrationDate: new Date().toISOString(),
          email: data.email,
          status: 'pending',
        });
      } else {
        console.error('Registration error:', result.error);
        alert(result.error || 'Failed to register. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting registration:', error);
      alert('Failed to register. Please try again.');
    }
  };

  // Show diagnostic if Privy failed to load
  if (showDiagnostic) {
    return <PrivyDiagnostic />;
  }

  // Wait for initialization before rendering
  if (!isInitialized) {
    return null;
  }

  // Show passcode gate if enabled and user doesn't have access
  if (WHITELIST_CONFIG.gateEnabled && !hasAccess) {
    return <PasscodeGate onSuccess={handlePasscodeSuccess} validateCode={validatePasscode} />;
  }

  // Show wallet dashboard if user is already registered
  if (isConnected && registrationStatus?.isRegistered) {
    return (
      <WalletDashboard 
        userEmail={registrationStatus.email} 
        registrationDate={registrationStatus.registrationDate}
        status={registrationStatus.status}
      />
    );
  }

  // Show loading while checking registration
  if (isConnected && checkingRegistration) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-red-900 p-4">
        <div className="max-w-md w-full bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 text-center">
          <Loader2 className="w-16 h-16 mx-auto mb-6 text-blue-600 animate-spin" />
          <h2 className="text-2xl mb-4 text-gray-900">Checking Registration...</h2>
          <p className="text-gray-600">
            Please wait while we verify your whitelist status.
          </p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-red-900 p-4">
        <div className="max-w-md w-full bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 text-center">
          <CheckCircle2 className="w-20 h-20 mx-auto mb-6 text-green-600" />
          <h2 className="text-3xl mb-4 text-gray-900">You're On The List! 🏒</h2>
          <p className="text-gray-600 mb-6">
            Thanks for registering for the $1980 MIRACLE. We'll contact you via email with further details.
          </p>
          <p className="text-sm text-gray-500 italic mb-6">
            "Do you believe in miracles? YES!" - Al Michaels
          </p>
          <button
            onClick={() => {
              const tweetText = "I just registered for the $1980 whitelist! 🏒🇺🇸 #DoYouBelieveInMiracles?";
              window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, "_blank");
            }}
            className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 mb-3"
          >
            <Twitter className="w-5 h-5" />
            Share on X
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Go to Wallet Dashboard
          </button>
        </div>
      </div>
    );
  }

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

      {/* Privy Connect Button - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        {!ready ? (
          // Loading state while Privy initializes
          <div className="bg-gray-800/90 backdrop-blur rounded-xl px-6 py-3 text-gray-300 font-medium flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Initializing Privy...
          </div>
        ) : !authenticated ? (
          // Not authenticated - show login button
          <button
            onClick={login}
            className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg"
          >
            <Wallet className="w-5 h-5" />
            Connect Wallet or Sign In
          </button>
        ) : isWaitingForWallet && !skipWalletCreation ? (
          // Waiting for wallet to be created (social login users)
          <div className="bg-gray-800/90 backdrop-blur rounded-xl px-6 py-3 max-w-md">
            <div className="flex items-center gap-3 mb-2">
              <Loader2 className="w-5 h-5 text-yellow-500 animate-spin" />
              <div className="flex-1">
                <div className="text-white font-medium text-sm">Creating your wallet...</div>
                <div className="text-gray-400 text-xs">
                  {waitingDuration > 10 ? 'Still working on it...' : 'This may take a moment'}
                </div>
              </div>
              <button
                onClick={() => {
                  walletCreationAttemptedRef.current = false;
                  setSkipWalletCreation(false);
                  logout();
                }}
                className="text-gray-400 hover:text-white text-sm transition-colors whitespace-nowrap"
              >
                Disconnect
              </button>
            </div>
            {waitingDuration > 3 && (
              <div className="flex gap-2 mt-3 pt-3 border-t border-gray-600">
                <button
                  onClick={async () => {
                    if (isRetrying) return; // Prevent spam clicking
                    
                    if (createWallet) {
                      try {
                        setIsRetrying(true);
                        console.log('Manually triggering wallet creation...');
                        walletCreationAttemptedRef.current = false; // Reset flag for manual retry
                        await createWallet();
                        // Keep disabled for 2 seconds to prevent rapid re-clicks
                        setTimeout(() => setIsRetrying(false), 2000);
                      } catch (error) {
                        console.error('Manual wallet creation failed:', error);
                        setIsRetrying(false);
                        setSkipWalletCreation(true);
                      }
                    } else {
                      setSkipWalletCreation(true);
                    }
                  }}
                  disabled={isRetrying}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isRetrying && <Loader2 className="w-3 h-3 animate-spin" />}
                  {isRetrying ? 'Creating...' : (createWallet ? 'Retry Creation' : 'Continue')}
                </button>
                <button
                  onClick={() => setSkipWalletCreation(true)}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-black text-xs font-bold py-2 px-3 rounded-lg transition-colors"
                >
                  Skip - Enter Manually
                </button>
              </div>
            )}
          </div>
        ) : (
          // Authenticated with wallet - show wallet info and disconnect
          <div className="flex items-center gap-3 bg-gray-800/90 backdrop-blur rounded-xl px-6 py-3">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-yellow-500" />
              <span className="text-white font-mono text-sm">
                {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Loading...
                  </span>
                )}
              </span>
            </div>
            {user?.email?.address && (
              <span className="text-gray-400 text-sm hidden sm:inline">
                ({user.email.address})
              </span>
            )}
            <button
              onClick={() => {
                walletCreationAttemptedRef.current = false;
                setSkipWalletCreation(false);
                logout();
              }}
              className="text-gray-400 hover:text-white text-sm ml-2 transition-colors"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-20">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-red-600 blur-xl opacity-60 rounded-full" />
                <h1 className="relative text-7xl sm:text-8xl font-black text-white drop-shadow-2xl tracking-tight">
                  1980
                </h1>
              </div>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-3 drop-shadow-lg">
              $1980 MIRACLE
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-blue-200 mb-2">
              Community Whitelist
            </p>
            <p className="text-lg text-white/90 max-w-xl mx-auto">
              Join the exclusive MIRACLE whitelist
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 sm:p-10 border-4 border-blue-600">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-1 w-16 bg-red-600 rounded" />
              <h3 className="text-2xl font-black text-gray-900 uppercase tracking-wide">
                Whitelist Registration
              </h3>
              <div className="h-1 w-16 bg-blue-600 rounded" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Info banner for social login users without wallet */}
              {authenticated && !address && !skipWalletCreation && (
                <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Loader2 className="w-5 h-5 text-yellow-600 animate-spin mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-bold text-yellow-900 text-sm mb-1">Wallet Setup in Progress</h4>
                      <p className="text-yellow-800 text-xs mb-2">
                        We're creating your Base wallet automatically. This usually takes a few seconds.
                      </p>
                      <p className="text-yellow-700 text-xs">
                        💡 <strong>Tip:</strong> You can click "Skip - Enter Manually" in the top-right corner to proceed immediately and enter your wallet address manually.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Wallet Address */}
              <div>
                <label htmlFor="walletAddress" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-blue-600" />
                  Wallet Address
                </label>
                <input
                  id="walletAddress"
                  type="text"
                  {...register('walletAddress', {
                    required: 'Wallet address is required',
                    pattern: {
                      value: /^0x[a-fA-F0-9]{40}$/,
                      message: 'Please enter a valid Ethereum address'
                    }
                  })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all font-mono text-sm"
                  placeholder="0x..."
                />
                {errors.walletAddress && (
                  <p className="mt-2 text-sm text-red-600">{errors.walletAddress.message}</p>
                )}
                {!isConnected && (
                  <p className="mt-2 text-xs text-gray-500">
                    Connect your Base wallet above to auto-fill
                  </p>
                )}
              </div>

              {/* X Profile */}
              <div>
                <label htmlFor="xProfile" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Twitter className="w-4 h-4 text-blue-600" />
                  X (Twitter) Profile
                </label>
                <input
                  id="xProfile"
                  type="text"
                  {...register('xProfile', {
                    required: 'X profile is required',
                    pattern: {
                      value: /^@?[\w]+$/,
                      message: 'Please enter a valid X username (e.g., @username)'
                    }
                  })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="@yourusername"
                />
                {errors.xProfile && (
                  <p className="mt-2 text-sm text-red-600">{errors.xProfile.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Please enter a valid email address'
                    }
                  })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                )}
                <p className="mt-2 text-xs text-gray-500">
                  Stay up to date with MIRACLE announcements
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 via-white to-blue-600 text-gray-900 font-black text-xl py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-wide border-2 border-gray-900"
              >
                Join The Whitelist
              </button>
            </form>

            {/* Info Banner */}
            <div className="mt-8 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
              <p className="text-sm text-blue-900 text-center">
                <span className="font-bold">NFT Community Perks:</span> Connect your wallet to verify your NFT holdings for potential whitelist allocations
              </p>
            </div>
          </div>

          {/* Footer Quote */}
          <div className="mt-8 text-center">
            <p className="text-white/90 text-lg sm:text-xl font-bold italic drop-shadow-lg">
              "Do you believe in miracles?"
            </p>
            <p className="text-blue-200 text-sm mt-2">
              February 22, 1980 • Lake Placid, NY
            </p>
          </div>


        </div>
      </div>
    </div>
  );
}
