import React, { useEffect, useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';

import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import WhyGhostJobs from './components/WhyGhostJobs';
import ExtensionSection from './components/ExtensionSection';
import Featured from './components/Featured';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

const App: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenAuthModal = () => setIsAuthModalOpen(true);

    // ✅ Attach once on mount
    window.addEventListener('openAuthModal', handleOpenAuthModal);
    return () => {
      window.removeEventListener('openAuthModal', handleOpenAuthModal);
    };
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-black">
        <Header />
        <Hero />
        <Benefits />
        <WhyGhostJobs />
        <ExtensionSection />
        <Featured />
        <Footer />
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      </div>
    </AuthProvider>
  );
};

export default App;
