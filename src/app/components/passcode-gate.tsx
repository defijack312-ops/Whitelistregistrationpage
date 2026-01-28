import { useState } from 'react';
import { Key, Lock, AlertCircle } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import celebrationPhoto from 'figma:asset/22d38cdb81634df90e212ab30714ca33af80c11d.png';

interface PasscodeGateProps {
  onSuccess: (code: string) => void;
  validateCode: (code: string) => boolean;
}

export function PasscodeGate({ onSuccess, validateCode }: PasscodeGateProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsChecking(true);

    // Simulate a small delay for effect
    setTimeout(() => {
      if (validateCode(code)) {
        onSuccess(code);
      } else {
        setError('Invalid invite code. Please check and try again.');
        setCode('');
      }
      setIsChecking(false);
    }, 500);
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
          src={celebrationPhoto}
          alt="1980 USA Olympic Team Celebration"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-red-600 blur-xl opacity-60 rounded-full" />
                <Lock className="relative w-20 h-20 text-white drop-shadow-2xl mx-auto" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-3 drop-shadow-lg">
              EXCLUSIVE ACCESS
            </h1>
            <p className="text-xl text-blue-200 mb-2">
              $1980 MIRACLE
            </p>
            <p className="text-white/80">
              Enter your invite code to continue
            </p>
          </div>

          {/* Passcode Form */}
          <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 border-4 border-blue-600">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="inviteCode" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Key className="w-4 h-4 text-blue-600" />
                  Invite Code
                </label>
                <input
                  id="inviteCode"
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setError('');
                  }}
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all font-mono text-lg uppercase tracking-wider text-center"
                  placeholder="ENTER-CODE-HERE"
                  autoFocus
                  disabled={isChecking}
                />
                {error && (
                  <div className="mt-3 p-3 bg-red-50 border-2 border-red-200 rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={!code.trim() || isChecking}
                className="w-full bg-gradient-to-r from-red-600 via-white to-blue-600 text-gray-900 font-black text-xl py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-wide border-2 border-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isChecking ? 'Verifying...' : 'Access Whitelist'}
              </button>
            </form>

            {/* Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
              <p className="text-xs text-blue-900 text-center">
                Don't have an invite code? Contact us on X or join our Discord community
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-white/70 text-sm">
              MIRACLE launching soon • Limited spots available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
