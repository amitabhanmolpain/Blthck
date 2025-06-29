import React, { useEffect } from 'react';
import JobAnalyzer from '../components/JobAnalyzer';
import { useAuth } from '../contexts/AuthContext';
import { Spotlight } from '../components/ui/spotlight-new';

const AnalyzerPage: React.FC = () => {
  const { user, loading } = useAuth();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 border-2 border-purple-400/20 border-t-purple-400 rounded-full animate-spin"></div>
          <span className="text-white text-xl">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Elements - Same as Hero */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Spotlight Effect - Same as Hero */}
      <Spotlight 
        gradientFirst="radial-gradient(68.54% 68.72% at 50% 45%, hsla(270, 100%, 85%, .15) 0, hsla(270, 100%, 55%, .08) 30%, hsla(270, 100%, 45%, 0) 70%)"
        gradientSecond="radial-gradient(50% 50% at 50% 45%, hsla(270, 100%, 85%, .12) 0, hsla(270, 100%, 55%, .06) 50%, transparent 80%)"
        gradientThird="radial-gradient(50% 50% at 50% 45%, hsla(270, 100%, 85%, .08) 0, hsla(270, 100%, 45%, .04) 60%, transparent 90%)"
        translateY={-200}
        width={800}
        height={1200}
        smallWidth={300}
        duration={8}
        xOffset={50}
      />

      {/* Floating dots - Same as Hero */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-blue-400/30 rounded-full animate-bounce" />
      <div className="absolute bottom-20 left-20 w-2 h-2 bg-indigo-400/30 rounded-full animate-ping" />
      <div className="absolute bottom-40 right-10 w-4 h-4 bg-violet-400/30 rounded-full animate-pulse" />

      <div className="relative container mx-auto px-4 py-4 z-10">
        {/* Simple Welcome Message */}
        <div className="text-center mb-8">
          <p className="text-lg text-white font-medium">
            {user
              ? `Welcome back, ${user.user_metadata?.full_name || user.email?.split('@')[0]}!`
              : 'Welcome to Ghostify Analyzer'}
          </p>
        </div>

        {/* Job Analyzer Component */}
        <JobAnalyzer />
      </div>
    </div>
  );
};

export default AnalyzerPage;