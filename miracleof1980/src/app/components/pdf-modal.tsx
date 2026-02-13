import { useEffect } from 'react';

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PDFModal({ isOpen, onClose }: PDFModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal container */}
      <div
        className="relative w-[95vw] h-[92vh] max-w-[1100px] flex flex-col rounded-lg overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0A1628 0%, #0D1B2A 100%)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-[#FFD700]/20">
          <div className="flex items-center gap-3">
            <span className="text-[#FFD700] text-lg">📄</span>
            <h2
              className="text-white text-lg font-semibold tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}
            >
              $1980 LITEPAPER
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Download button */}
            <a
              href="/1980_litepaper.pdf"
              download
              className="flex items-center gap-2 px-4 py-2 text-sm text-[#FFD700] border border-[#FFD700]/40 rounded hover:bg-[#FFD700]/10 transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              ⬇ Download
            </a>

            {/* Close button */}
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all text-xl"
            >
              ✕
            </button>
          </div>
        </div>

        {/* PDF viewer */}
        <div className="flex-1 bg-[#1a1a2e]">
          <iframe
            src="/1980_litepaper.pdf"
            className="w-full h-full border-0"
            title="$1980 Litepaper"
          />
        </div>
      </div>
    </div>
  );
}
