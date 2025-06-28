import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Brain, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Spotlight } from './ui/spotlight-new';

const Hero: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showArrow, setShowArrow] = useState(false);

  // Show arrow animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowArrow(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // ✅ Trigger navigation after login if redirect flag is set
  useEffect(() => {
    const redirect = sessionStorage.getItem('redirectAfterLogin');
    if (user && redirect === 'analyzer') {
      sessionStorage.removeItem('redirectAfterLogin');
      navigate('/analyzer'); // ✅ will open in the same tab
    }
  }, [user, navigate]);

  const handleStartAnalyzing = () => {
    if (user) {
      navigate('/analyzer');
    } else {
      sessionStorage.setItem('redirectAfterLogin', 'analyzer'); // mark intent to go
      const event = new CustomEvent('openAuthModal');
      window.dispatchEvent(event);
    }
  };

  return (
    <section id="home" className="relative overflow-hidden min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

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

      {/* Floating dots */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-blue-400/30 rounded-full animate-bounce" />
      <div className="absolute bottom-20 left-20 w-2 h-2 bg-indigo-400/30 rounded-full animate-ping" />
      <div className="absolute bottom-40 right-10 w-4 h-4 bg-violet-400/30 rounded-full animate-pulse" />

      {/* Announcement Badge - Centered between AI-Powered and Job Verification */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-20">
        <div className="inline-flex items-center px-6 py-3 bg-black/40 border border-white/10 rounded-full text-sm text-gray-300 backdrop-blur-xl shadow-2xl animate-fade-in">
          <Sparkles className="h-4 w-4 mr-2 text-purple-400 animate-pulse" />
          Introducing Ghostify AI - Now Live
          <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 pt-20">
        <div className="space-y-12">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="block text-white mb-6 animate-slide-up">AI-Powered</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 animate-slide-up delay-200 relative">
                Job Verification
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-violet-400/20 to-indigo-400/20 blur-3xl animate-pulse" />
              </span>
            </h1>

            <div className="space-y-6 animate-slide-up delay-400">
              <p className="text-2xl md:text-3xl text-white font-semibold">
                No More Fake Hope. Just Real Jobs.
              </p>
              <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Detect ghost jobs instantly with advanced AI analysis using 100+ detection factors. 
                Paste any job description and get comprehensive verification in seconds.
              </p>
            </div>
          </div>

          <div className="pt-8 animate-slide-up delay-600 relative">
            <button 
              onClick={handleStartAnalyzing}
              className="group relative inline-flex items-center px-12 py-6 bg-black/20 backdrop-blur-xl border border-white/20 text-white font-bold text-lg rounded-2xl shadow-2xl hover:bg-black/30 hover:border-white/30 transform hover:scale-105 transition-all duration-300 animate-glow"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-violet-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <div className="relative flex items-center">
                <Brain className="h-6 w-6 mr-3 group-hover:animate-pulse" />
                Start Analyzing for Free
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>

            {/* Animated "Click Here" Arrow */}
            {showArrow && (
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 animate-bounce-in">
                <div className="flex flex-col items-center space-y-2">
                  <ChevronDown className="h-6 w-6 text-purple-400 animate-bounce" />
                  <span className="text-sm text-purple-300 font-medium animate-pulse">
                    Click Here
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.3); }
          50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.5); }
        }
        @keyframes bounce-in {
          0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
          50% { opacity: 0.5; transform: translateX(-50%) translateY(-10px); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-600 {
          animation-delay: 0.6s;
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        .animate-bounce-in {
          animation: bounce-in 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;