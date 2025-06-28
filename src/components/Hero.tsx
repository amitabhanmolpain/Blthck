import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Brain, Zap, Shield, Target } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Spotlight } from './ui/spotlight-new';

const Hero: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for interactive lighting
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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

      {/* Enhanced Interactive Light Effect */}
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.15) 0%, rgba(79, 70, 229, 0.1) 25%, rgba(59, 130, 246, 0.05) 50%, transparent 70%)`
        }}
      />

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

      {/* Animated floating elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400/30 rounded-full animate-float" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-blue-400/30 rounded-full animate-float-delayed" />
      <div className="absolute bottom-20 left-20 w-2 h-2 bg-indigo-400/30 rounded-full animate-pulse-slow" />
      <div className="absolute bottom-40 right-10 w-4 h-4 bg-violet-400/30 rounded-full animate-bounce-slow" />
      <div className="absolute top-1/2 left-8 w-3 h-3 bg-pink-400/30 rounded-full animate-float" />
      <div className="absolute top-1/3 right-8 w-2 h-2 bg-cyan-400/30 rounded-full animate-float-delayed" />

      {/* Announcement Badge */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-20">
        <div className="inline-flex items-center px-6 py-3 bg-black/40 border border-white/10 rounded-full text-sm text-gray-300 backdrop-blur-xl shadow-2xl animate-fade-in-down hover:scale-105 transition-transform duration-300">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
          <Sparkles className="h-4 w-4 mr-2 text-purple-400 animate-spin-slow" />
          Introducing Ghostify AI - Now Live
          <ArrowRight className="ml-2 h-4 w-4 animate-bounce-x" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 pt-20">
        <div className="space-y-12">
          <div className="space-y-8">
            {/* Main Heading with Realistic Lighting */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight relative">
              <span className="block text-white mb-6 animate-slide-up-glow relative">
                <span className="relative z-10">AI-Powered</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent blur-sm animate-shimmer"></div>
              </span>
              <span className="block relative animate-slide-up-glow delay-200">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 relative z-10 animate-gradient-shift">
                  Job Verification
                </span>
                {/* Realistic light reflection */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 via-violet-400/30 to-indigo-400/30 blur-2xl animate-pulse-glow"></div>
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-sm animate-light-sweep"></div>
              </span>
            </h1>

            {/* Enhanced Tagline */}
            <div className="space-y-6 animate-slide-up-glow delay-400">
              <p className="text-2xl md:text-3xl text-white font-semibold relative">
                <span className="relative z-10">No More Fake Hope. Just Real Jobs.</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent blur-sm animate-text-glow"></div>
              </p>
              <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed animate-fade-in-up">
                Detect ghost jobs instantly with advanced AI analysis using 100+ detection factors. 
                Paste any job description and get comprehensive verification in seconds.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 animate-slide-up-glow delay-500">
              <div className="flex items-center px-4 py-2 bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-full text-purple-200 text-sm animate-float">
                <Brain className="h-4 w-4 mr-2 animate-pulse" />
                AI-Powered Analysis
              </div>
              <div className="flex items-center px-4 py-2 bg-black/20 backdrop-blur-sm border border-blue-500/30 rounded-full text-blue-200 text-sm animate-float-delayed">
                <Zap className="h-4 w-4 mr-2 animate-bounce" />
                Instant Results
              </div>
              <div className="flex items-center px-4 py-2 bg-black/20 backdrop-blur-sm border border-green-500/30 rounded-full text-green-200 text-sm animate-float">
                <Shield className="h-4 w-4 mr-2 animate-pulse" />
                95%+ Accuracy
              </div>
            </div>
          </div>

          {/* Enhanced CTA Button */}
          <div className="pt-8 animate-slide-up-glow delay-600">
            <button 
              onClick={handleStartAnalyzing}
              className="group relative inline-flex items-center px-12 py-6 bg-black/20 backdrop-blur-xl border border-white/20 text-white font-bold text-lg rounded-2xl shadow-2xl hover:bg-black/30 hover:border-white/30 transform hover:scale-105 transition-all duration-300 animate-glow-pulse"
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-violet-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-violet-500/10 to-indigo-500/10 rounded-2xl animate-pulse-border"></div>
              
              <div className="relative flex items-center">
                <Brain className="h-6 w-6 mr-3 group-hover:animate-spin transition-transform duration-300" />
                <span className="relative">
                  Start Analyzing for Free
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                </span>
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 animate-fade-in-up delay-700">
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400 text-sm">
              <div className="flex items-center">
                <Target className="h-4 w-4 mr-2 text-green-400" />
                500K+ Jobs Analyzed
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-blue-400" />
                99.2% Accuracy Rate
              </div>
              <div className="flex items-center">
                <Zap className="h-4 w-4 mr-2 text-purple-400" />
                0.3s Analysis Time
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-30px) translateX(-50%); }
          to { opacity: 1; transform: translateY(0) translateX(-50%); }
        }
        @keyframes slide-up-glow {
          from { opacity: 0; transform: translateY(40px); filter: brightness(0.5); }
          to { opacity: 1; transform: translateY(0); filter: brightness(1); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        @keyframes light-sweep {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes text-glow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.3), 0 0 40px rgba(147, 51, 234, 0.1); }
          50% { box-shadow: 0 0 30px rgba(147, 51, 234, 0.5), 0 0 60px rgba(147, 51, 234, 0.2); }
        }
        @keyframes pulse-border {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.2); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }

        .animate-fade-in-down {
          animation: fade-in-down 1s ease-out;
        }
        .animate-slide-up-glow {
          animation: slide-up-glow 1s ease-out forwards;
          opacity: 0;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        .animate-light-sweep {
          animation: light-sweep 4s ease-in-out infinite;
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .animate-text-glow {
          animation: text-glow 2s ease-in-out infinite;
        }
        .animate-glow-pulse {
          animation: glow-pulse 3s ease-in-out infinite;
        }
        .animate-pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .animate-bounce-x {
          animation: bounce-x 1s ease-in-out infinite;
        }

        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
      `}</style>
    </section>
  );
};

export default Hero;