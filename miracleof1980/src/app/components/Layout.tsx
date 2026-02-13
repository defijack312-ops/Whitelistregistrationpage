import { Navbar } from './Navbar';
import teamPhoto from '@/assets/cf45d5f11ac0354a95fb3632c5e2369467e0dfa1.png';

interface LayoutProps {
  children: React.ReactNode;
  showBackground?: boolean;
}

export function Layout({ children, showBackground = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-red-900 relative overflow-hidden">
      {showBackground && (
        <>
          {/* Ice Grid Pattern */}
          <div className="fixed inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 35px, white 35px, white 37px)',
            }} />
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 35px, white 35px, white 37px)',
            }} />
          </div>

          {/* Hero Image */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <img src={teamPhoto} alt="1980 USA Hockey Team" className="w-full h-full object-cover opacity-20" />
          </div>
        </>
      )}

      {/* Navbar */}
      <Navbar />

      {/* Page Content - padded for fixed navbar */}
      <div className="relative z-10 pt-16">
        {children}
      </div>
    </div>
  );
}
