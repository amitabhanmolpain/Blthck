import React, { useEffect } from 'react';
import { Shield, Sparkles, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import JobAnalyzer from '../components/JobAnalyzer';
import { useAuth } from '../contexts/AuthContext';
import { Spotlight } from '../components/ui/spotlight-new';

const AnalyzerPage: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

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

      <div className="relative container mx-auto px-4 py-8 z-10">
        {/* Header Section - Hero Style */}
        <div className="text-center mb-12 pt-8">
          {/* Back to Home Button */}
          <div className="flex justify-start mb-8">
            <button
              onClick={() => navigate('/')}
              className="group inline-flex items-center px-6 py-3 bg-black/20 backdrop-blur-xl border border-white/10 rounded-full text-gray-300 hover:text-white hover:bg-black/30 hover:border-white/20 transition-all duration-300 shadow-lg"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </button>
          </div>

          {/* Main Header */}
          <div className="inline-flex items-center px-6 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-sm text-gray-300 mb-8 shadow-lg">
            <Sparkles className="h-4 w-4 mr-2 text-purple-400 animate-pulse" />
            Advanced AI Analysis Platform
          </div>

          <div className="flex items-center justify-center space-x-6 mb-8">
            <div className="relative">
              <div className="p-4 bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
                <Shield className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 mb-2">
                Ghostify Analyzer
              </h1>
              <p className="text-xl text-gray-300 font-medium">
                AI-Powered Ghost Job Detection
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-lg text-white font-medium">
              {user
                ? `Welcome back, ${user.user_metadata?.full_name || user.email?.split('@')[0]}!`
                : 'Analyze any job posting instantly with our advanced AI'}
            </p>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Paste any job description below and get comprehensive verification using 100+ detection factors. 
              Our AI analyzes everything from company legitimacy to red flags in seconds.
            </p>
          </div>
        </div>

        {/* Job Analyzer Component */}
        <JobAnalyzer />
      </div>
    </div>
  );
};

export default AnalyzerPage;