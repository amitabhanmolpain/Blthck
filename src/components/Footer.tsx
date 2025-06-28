import React, { useState } from 'react';
import { Shield, Github, Twitter, Mail, Heart, Linkedin, Sparkles, Zap, Target, Brain, ExternalLink, Send, CheckCircle, Bell, Star, Users, TrendingUp } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubscribed(true);
    setIsSubmitting(false);
  };

  return (
    <footer className="relative bg-black border-t border-white/10 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10"></div>
        
        {/* Floating elements with enhanced animations */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-purple-400/20 rounded-full animate-float"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-blue-400/20 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-indigo-400/20 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-4 h-4 bg-violet-400/20 rounded-full animate-bounce-slow"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Enhanced Newsletter Section */}
        <div className="bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-indigo-900/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-16 animate-fade-in-up">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-2xl shadow-lg border border-white/10 animate-pulse-glow">
                <Bell className="h-8 w-8 text-white animate-swing" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4 animate-slide-up-glow">
              Stay Ahead of Ghost Jobs
            </h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto animate-fade-in-up delay-200">
              Get exclusive insights, AI updates, and early access to new features. Join 10,000+ job seekers protecting their time.
            </p>
          </div>

          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto animate-slide-up-glow delay-300">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-4 bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-white/20 transition-all duration-300 animate-glow-focus"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center animate-pulse-border"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                      Subscribing...
                    </div>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2 animate-bounce-x" />
                      Subscribe Free
                    </>
                  )}
                </button>
              </div>
              
              {/* Trust indicators */}
              <div className="flex items-center justify-center mt-4 space-x-6 text-sm text-gray-400 animate-fade-in-up delay-400">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-green-400" />
                  10K+ subscribers
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-400" />
                  Weekly insights
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1 text-blue-400" />
                  No spam, ever
                </div>
              </div>
            </form>
          ) : (
            <div className="text-center animate-success-reveal">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center animate-scale-success">
                  <CheckCircle className="h-8 w-8 text-green-400 animate-check-mark" />
                </div>
              </div>
              <h4 className="text-2xl font-bold text-white mb-2 animate-slide-up-glow">Welcome to the Community! 🎉</h4>
              <p className="text-gray-300 animate-fade-in-up delay-100">
                You'll receive our next newsletter at <span className="text-purple-400 font-semibold">{email}</span>
              </p>
              <div className="mt-4 flex items-center justify-center animate-fade-in-up delay-200">
                <Sparkles className="h-5 w-5 text-yellow-400 mr-2 animate-sparkle" />
                <span className="text-sm text-gray-400">Check your inbox for a welcome message!</span>
              </div>
            </div>
          )}
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          
          {/* Brand Section - Enhanced */}
          <div className="lg:col-span-5 space-y-6 animate-slide-in-left">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="p-3 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg animate-pulse-border">
                  <Shield className="h-8 w-8 text-white animate-bounce-slow" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="h-2 w-2 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent animate-gradient-shift">
                  Ghostify
                </h3>
                <p className="text-gray-400 font-medium">AI Job Verification Platform</p>
              </div>
              <span className="px-3 py-1 bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-500/30 text-purple-200 text-xs font-bold rounded-full animate-pulse backdrop-blur-sm">
                BETA
              </span>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed animate-fade-in-up delay-200">
              <span className="font-semibold text-white">No More Fake Hope. Just Real Jobs.</span>
              <br />
              Protecting job seekers worldwide from ghost jobs using advanced AI analysis with 100+ detection factors. 
              Join thousands who've already saved time and found real opportunities.
            </p>

            {/* Enhanced Key Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-black/30 transition-all duration-300 animate-scale-in delay-300">
                <div className="text-2xl font-bold text-purple-400 animate-count-up">99.2%</div>
                <div className="text-xs text-gray-400">Accuracy</div>
              </div>
              <div className="text-center p-4 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-black/30 transition-all duration-300 animate-scale-in delay-400">
                <div className="text-2xl font-bold text-blue-400 animate-count-up">500K+</div>
                <div className="text-xs text-gray-400">Jobs Analyzed</div>
              </div>
              <div className="text-center p-4 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-black/30 transition-all duration-300 animate-scale-in delay-500">
                <div className="text-2xl font-bold text-indigo-400 animate-count-up">0.3s</div>
                <div className="text-xs text-gray-400">Analysis Time</div>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div className="lg:col-span-2 animate-slide-in-up delay-200">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center">
              <Target className="h-5 w-5 mr-2 text-purple-400 animate-pulse" />
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <Brain className="h-4 w-4 mr-2 text-purple-400 group-hover:scale-110 transition-transform animate-pulse-slow" />
                  AI Job Analyzer
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <Zap className="h-4 w-4 mr-2 text-blue-400 group-hover:scale-110 transition-transform animate-bounce-slow" />
                  100+ Detection Factors
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <Shield className="h-4 w-4 mr-2 text-indigo-400 group-hover:scale-110 transition-transform animate-pulse-slow" />
                  Browser Extension
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <Target className="h-4 w-4 mr-2 text-violet-400 group-hover:scale-110 transition-transform animate-bounce-slow" />
                  API Access
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2 animate-slide-in-up delay-300">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-400 animate-pulse" />
              Resources
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Ghost Job Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Detection Research</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">AI Model Details</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Success Stories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Blog & Updates</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="lg:col-span-3 animate-slide-in-right delay-400">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center">
              <Users className="h-5 w-5 mr-2 text-pink-400 animate-pulse" />
              Connect & Follow
            </h4>
            
            {/* Enhanced Social Links */}
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://www.linkedin.com/in/amitabh-anmol-pain-118308309" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-3 bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-blue-600/20 hover:border-blue-500/30 transition-all duration-300 hover:scale-110 animate-float"
              >
                <Linkedin className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
              </a>
              <a 
                href="https://github.com/amitabhanmolpain" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-3 bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-gray-600/20 hover:border-gray-500/30 transition-all duration-300 hover:scale-110 animate-float-delayed"
              >
                <Github className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="#" 
                className="group p-3 bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-blue-500/20 hover:border-blue-400/30 transition-all duration-300 hover:scale-110 animate-float"
              >
                <Twitter className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
              </a>
              <a 
                href="#" 
                className="group p-3 bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-purple-600/20 hover:border-purple-500/30 transition-all duration-300 hover:scale-110 animate-float-delayed"
              >
                <Mail className="h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
              </a>
            </div>

            {/* Community Stats */}
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-4 animate-fade-in-up delay-500">
              <h5 className="text-white font-semibold mb-3 flex items-center">
                <Star className="h-4 w-4 mr-2 text-yellow-400 animate-sparkle" />
                Community Impact
              </h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Ghost Jobs Detected</span>
                  <span className="text-red-400 font-bold animate-count-up">127,543</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Time Saved (Hours)</span>
                  <span className="text-green-400 font-bold animate-count-up">45,892</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Active Users</span>
                  <span className="text-blue-400 font-bold animate-count-up">12,847</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 animate-fade-in-up delay-600">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-6">
              <p className="text-gray-400 text-sm">
                © 2025 Ghostify. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
                <span>•</span>
                <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
                <span>•</span>
                <a href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</a>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
              {/* Built by Bolt.new Badge */}
              <a 
                href="https://bolt.new" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full text-sm font-medium text-orange-200 hover:from-orange-500/30 hover:to-red-500/30 hover:border-orange-400/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm shadow-lg hover:shadow-orange-500/25 animate-pulse-glow"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-gradient-to-r from-orange-400 to-red-400 rounded-md flex items-center justify-center animate-pulse">
                    <Zap className="h-3 w-3 text-white" />
                  </div>
                  <span>Built by</span>
                  <span className="font-bold bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text text-transparent">
                    Bolt.new
                  </span>
                  <ExternalLink className="h-3 w-3 text-orange-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>
              </a>

              <div className="flex items-center space-x-4">
                <p className="text-gray-400 text-sm flex items-center">
                  Made with <Heart className="h-4 w-4 text-red-500 mx-1 animate-heartbeat" /> for job seekers worldwide
                </p>
                <div className="h-4 w-px bg-gray-700"></div>
                <p className="text-gray-500 text-sm font-medium">
                  Created by <span className="text-purple-400 animate-gradient-shift">Amitabh Anmol Pain</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up-glow {
          from { opacity: 0; transform: translateY(30px); filter: brightness(0.5); }
          to { opacity: 1; transform: translateY(0); filter: brightness(1); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }
        @keyframes swing {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(10deg); }
          75% { transform: rotate(-10deg); }
        }
        @keyframes glow-focus {
          0%, 100% { box-shadow: 0 0 0 rgba(147, 51, 234, 0); }
          50% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.3); }
        }
        @keyframes success-reveal {
          from { opacity: 0; transform: scale(0.8) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes scale-success {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        @keyframes check-mark {
          0% { transform: scale(0) rotate(0deg); }
          50% { transform: scale(1.2) rotate(180deg); }
          100% { transform: scale(1) rotate(360deg); }
        }
        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 0.7; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse-border {
          0%, 100% { border-color: rgba(255, 255, 255, 0.1); }
          50% { border-color: rgba(147, 51, 234, 0.5); }
        }
        @keyframes count-up {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-up-glow {
          animation: slide-up-glow 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-in-left {
          animation: slide-in-left 1s ease-out;
        }
        .animate-slide-in-right {
          animation: slide-in-right 1s ease-out;
        }
        .animate-slide-in-up {
          animation: slide-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-scale-in {
          animation: scale-in 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .animate-swing {
          animation: swing 2s ease-in-out infinite;
        }
        .animate-glow-focus:focus {
          animation: glow-focus 2s ease-in-out infinite;
        }
        .animate-success-reveal {
          animation: success-reveal 0.6s ease-out;
        }
        .animate-scale-success {
          animation: scale-success 0.8s ease-out;
        }
        .animate-check-mark {
          animation: check-mark 0.8s ease-out;
        }
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
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
        .animate-bounce-x {
          animation: bounce-x 1s ease-in-out infinite;
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease-in-out infinite;
        }
        .animate-pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
        }
        .animate-count-up {
          animation: count-up 0.8s ease-out;
        }
        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
      `}</style>
    </footer>
  );
};

export default Footer;