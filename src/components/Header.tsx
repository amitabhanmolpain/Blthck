import React, { useState, useEffect, useRef } from 'react';
import { Shield, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroSectionHeight = window.innerHeight * 0.8;

      if (currentScrollY > heroSectionHeight && currentScrollY > lastScrollY) {
        setIsCompact(true);
      } else if (currentScrollY <= 50) {
        setIsCompact(false);
      }

      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [lastScrollY]);

  const handleGetStarted = () => {
    if (user) {
      window.open('/analyzer', '_blank');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 ease-in-out ${isCompact ? 'w-auto' : 'w-full max-w-5xl'}`}>
        <div className={`bg-black/20 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl shadow-black/20 relative ${isCompact ? 'px-6 py-3' : 'px-8 py-4'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800/10 via-slate-800/10 to-gray-800/10 rounded-full"></div>

          <div className="relative flex justify-between items-center">
            {/* Logo */}
            <div className={`flex items-center space-x-3 transition-all duration-700 ease-in-out ${isCompact ? 'opacity-0 -translate-x-8 pointer-events-none w-0 overflow-hidden' : 'opacity-100 translate-x-0 pointer-events-auto'}`}>
              <div className="p-2 bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl shadow-lg shadow-gray-500/25 backdrop-blur-sm border border-white/10">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center space-x-2">
                <div>
                  <h1 className="text-xl font-bold text-white">Ghostify</h1>
                  <p className="text-sm text-gray-300">AI Job Verification</p>
                </div>
                <span className="px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                  BETA
                </span>
              </div>
            </div>

            {/* Navigation - Hidden on mobile, shown in dropdown */}
            <nav className="hidden md:flex items-center space-x-8 transition-all duration-700 ease-in-out">
              <button onClick={() => scrollToSection('home')} className="text-gray-200 hover:text-white font-medium transition-colors duration-300 text-sm hover:bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm">
                Home
              </button>
              <button onClick={() => scrollToSection('benefits')} className="text-gray-200 hover:text-white font-medium transition-colors duration-300 text-sm hover:bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm">
                Benefits
              </button>
              <button onClick={() => scrollToSection('why-ghost-jobs')} className="text-gray-200 hover:text-white font-medium transition-colors duration-300 text-sm hover:bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm">
                Why Ghost Jobs
              </button>
            </nav>

            {/* User Menu / Login and Mobile Menu Toggle */}
            <div className="flex items-center space-x-4 transition-all duration-700 ease-in-out">
              {user ? (
                <div className="relative z-50" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(prev => !prev)}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-full hover:bg-white/20 hover:shadow-lg transition-all duration-300"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden md:block text-sm">
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-xl py-2 z-50">
                      <button
                        onClick={() => window.open('/analyzer', '_blank')}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 text-sm"
                      >
                        Open Analyzer
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 text-sm flex items-center"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleGetStarted}
                  className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white font-medium rounded-full hover:bg-white/30 transition-all duration-300 text-sm shadow-lg border border-white/20 hidden md:block"
                >
                  Login
                </button>
              )}

              {/* Mobile Menu Toggle - Always visible on small screens */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors backdrop-blur-sm"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-2 w-full">
              <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-xl py-4 px-6">
                <nav className="flex flex-col space-y-4">
                  <button onClick={() => scrollToSection('home')} className="text-gray-200 hover:text-white font-medium transition-colors duration-300 text-sm hover:bg-white/10 px-4 py-2 text-left rounded-lg backdrop-blur-sm">
                    Home
                  </button>
                  <button onClick={() => scrollToSection('benefits')} className="text-gray-200 hover:text-white font-medium transition-colors duration-300 text-sm hover:bg-white/10 px-4 py-2 text-left rounded-lg backdrop-blur-sm">
                    Benefits
                  </button>
                  <button onClick={() => scrollToSection('why-ghost-jobs')} className="text-gray-200 hover:text-white font-medium transition-colors duration-300 text-sm hover:bg-white/10 px-4 py-2 text-left rounded-lg backdrop-blur-sm">
                    Why Ghost Jobs
                  </button>
                  {!user && (
                    <button onClick={handleGetStarted} className="mt-4 px-6 py-2 bg-white/20 backdrop-blur-sm text-white font-medium rounded-full hover:bg-white/30 transition-all duration-300 text-sm border border-white/20">
                      Login
                    </button>
                  )}
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Header;