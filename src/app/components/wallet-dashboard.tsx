import { useState } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { Wallet, Key, Copy, CheckCircle2, ExternalLink, LogOut, Shield, Clock } from 'lucide-react';
import teamPhoto from '@/assets/cf45d5f11ac0354a95fb3632c5e2369467e0dfa1.png';

interface WalletDashboardProps {
  userEmail?: string;
  registrationDate?: string;
}

export function WalletDashboard({ userEmail, registrationDate }: WalletDashboardProps) {
  const { logout, exportWallet, user } = usePrivy();
  const { wallets } = useWallets();
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const address = wallets[0]?.address;
  const displayEmail = userEmail || user?.email?.address;

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
                <div className="absolute inset-0 bg-blue-600 blur-xl opacity-60 rounded-full" />
                <Clock className="relative w-20 h-20 text-white drop-shadow-2xl" />
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
          <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 sm:p-10 border-4 border-blue-600">
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

              {/* Email */}
              {displayEmail && (
                <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email
                  </label>
                  <p className="text-gray-900">{displayEmail}</p>
                </div>
              )}

              {/* Registration Status */}
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
