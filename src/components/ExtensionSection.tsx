import React, { useState } from 'react';
import { Chrome, Download, Zap, Shield, Eye, CheckCircle, Send, Sparkles, Code, Layers, Activity } from 'lucide-react';
import { CardSpotlight } from './CardSpotlight';

const ExtensionSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setIsSubmitted(true);
      setIsAnimating(false);
    }, 1000);
  };

  const features = [
    {
      icon: Eye,
      title: "Real-time Analysis",
      description: "Analyze job postings instantly while browsing LinkedIn, Indeed, or any job board",
      color: "text-blue-400"
    },
    {
      icon: Shield,
      title: "100% Privacy Protected",
      description: "All analysis happens locally - your data never leaves your browser",
      color: "text-green-400"
    },
    {
      icon: Zap,
      title: "One-Click Detection",
      description: "Simply click the extension icon to get instant ghost job analysis",
      color: "text-yellow-400"
    },
    {
      icon: CheckCircle,
      title: "Smart Notifications",
      description: "Get alerts when suspicious patterns are detected in job postings",
      color: "text-purple-400"
    }
  ];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Dark Theme Background matching Hero and Benefits */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Tech/Browser themed floating elements */}
        <div className="absolute top-20 left-12 w-8 h-8 bg-white/5 rounded-lg animate-float"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-white/5 rounded-full animate-bounce-slow"></div>
        <div className="absolute bottom-32 left-16 w-10 h-10 bg-white/5 rounded-lg rotate-12 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-32 w-4 h-4 bg-white/5 rounded-full animate-ping-slow"></div>
        
        {/* Circuit board pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        {/* Browser window mockups with animation */}
        <div className="absolute top-10 right-10 w-32 h-20 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm animate-float"></div>
        <div className="absolute bottom-10 left-10 w-24 h-16 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm animate-float-delayed"></div>
        
        {/* Radial Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-indigo-500/3 to-transparent rounded-full"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-sm text-gray-300 mb-6 shadow-lg animate-fade-in-down">
            <Chrome className="h-4 w-4 mr-2 text-blue-400 animate-spin-slow" />
            Coming Soon
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slide-up-glow">
            Browser Extension
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 animate-gradient-shift">
              In Development
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 animate-fade-in-up delay-300">
            Our browser extension is currently in development with cutting-edge technology. 
            Analyze ghost jobs directly on any job board with one click.
          </p>
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-full text-green-300 font-semibold backdrop-blur-xl animate-pulse-glow">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            Stay Tuned - Launching Soon!
          </div>
        </div>

        {/* Extension Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="animate-slide-in-left">
            <CardSpotlight className="h-96 w-full">
              <div className="relative z-20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-black/20 backdrop-blur-xl rounded-xl flex items-center justify-center mr-4 shadow-lg border border-white/10 animate-pulse-border">
                    <Chrome className="h-6 w-6 text-white animate-bounce-slow" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Ghostify Extension</h3>
                    <p className="text-gray-400 text-sm">Chrome • Firefox • Edge</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-300 animate-slide-in-right delay-100">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-3 animate-pulse" />
                    <span className="text-sm">Instant job analysis on any website</span>
                  </div>
                  <div className="flex items-center text-gray-300 animate-slide-in-right delay-200">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-3 animate-pulse" />
                    <span className="text-sm">Works with LinkedIn, Indeed, Glassdoor</span>
                  </div>
                  <div className="flex items-center text-gray-300 animate-slide-in-right delay-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-3 animate-pulse" />
                    <span className="text-sm">Privacy-first local processing</span>
                  </div>
                  <div className="flex items-center text-gray-300 animate-slide-in-right delay-400">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-3 animate-pulse" />
                    <span className="text-sm">Real-time ghost job alerts</span>
                  </div>
                </div>

                {/* Enhanced Progress Section */}
                <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-4 animate-fade-in-up delay-500">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium text-sm flex items-center">
                      <Code className="h-4 w-4 mr-2 text-blue-400" />
                      Development Progress
                    </span>
                    <span className="text-orange-400 font-bold text-sm animate-pulse">40%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3 mb-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-3 rounded-full transition-all duration-2000 animate-progress-fill" style={{ width: '40%' }}></div>
                  </div>
                  
                  {/* Development Stages */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-green-300">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Core AI Integration
                      </span>
                      <span className="text-green-400">✓ Complete</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-orange-300">
                        <Activity className="h-3 w-3 mr-1 animate-pulse" />
                        Browser API Development
                      </span>
                      <span className="text-orange-400">⚡ In Progress</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-gray-400">
                        <Layers className="h-3 w-3 mr-1" />
                        UI/UX Design
                      </span>
                      <span className="text-gray-400">⏳ Pending</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardSpotlight>
          </div>

          <div className="space-y-8 animate-slide-in-right">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 animate-slide-up-glow">Extension Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <CardSpotlight key={index} className="h-auto animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="relative z-20 text-center">
                      {/* Centered Icon with Beautiful Colors */}
                      <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-black/20 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-lg border border-white/10 animate-float">
                          <feature.icon className={`h-8 w-8 ${feature.color} animate-pulse-slow`} />
                        </div>
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </CardSpotlight>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Browser Support */}
        <div className="text-center mb-16 animate-fade-in-up delay-600">
          <h3 className="text-2xl font-bold text-white mb-8">Supported Browsers</h3>
          <div className="flex justify-center items-center space-x-12">
            <div className="text-center animate-scale-in delay-100">
              <div className="w-16 h-16 bg-black/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg border border-white/10 hover:scale-110 transition-transform duration-300 animate-float">
                <Chrome className="h-8 w-8 text-white" />
              </div>
              <p className="text-gray-300 font-medium">Chrome</p>
            </div>
            <div className="text-center animate-scale-in delay-200">
              <div className="w-16 h-16 bg-black/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg border border-white/10 hover:scale-110 transition-transform duration-300 animate-float-delayed">
                <Chrome className="h-8 w-8 text-white" />
              </div>
              <p className="text-gray-300 font-medium">Brave</p>
            </div>
            <div className="text-center animate-scale-in delay-300">
              <div className="w-16 h-16 bg-black/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg border border-white/10 hover:scale-110 transition-transform duration-300 animate-float">
                <Chrome className="h-8 w-8 text-white" />
              </div>
              <p className="text-gray-300 font-medium">Edge</p>
            </div>
          </div>
        </div>

        {/* Enhanced Notification Signup with Animation */}
        <div className="text-center animate-scale-in delay-700">
          <CardSpotlight className="max-w-2xl mx-auto">
            <div className="relative z-20 text-center">
              <h3 className="text-2xl font-bold text-white mb-4 animate-slide-up-glow">Get Notified When It Launches</h3>
              <p className="text-gray-300 mb-6 animate-fade-in-up delay-100">Be the first to know when our browser extension is ready for download.</p>
              
              {!isSubmitted ? (
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto animate-slide-up-glow delay-200">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-white/20 transition-all duration-300 animate-glow-focus"
                    required
                  />
                  <button 
                    type="submit"
                    disabled={isAnimating}
                    className="px-6 py-3 bg-black/20 backdrop-blur-xl border border-white/20 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center animate-pulse-border"
                  >
                    {isAnimating ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2 animate-bounce-x" />
                        Notify Me
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="animate-success-reveal">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center animate-scale-success">
                      <CheckCircle className="h-8 w-8 text-green-400 animate-check-mark" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 animate-slide-up-glow">You're All Set! 🎉</h4>
                  <p className="text-gray-300 animate-fade-in-up delay-100">
                    We'll notify you at <span className="text-purple-400 font-semibold">{email}</span> when the extension launches.
                  </p>
                  <div className="mt-4 flex items-center justify-center animate-fade-in-up delay-200">
                    <Sparkles className="h-5 w-5 text-yellow-400 mr-2 animate-sparkle" />
                    <span className="text-sm text-gray-400">Thank you for your interest!</span>
                  </div>
                </div>
              )}
            </div>
          </CardSpotlight>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up-glow {
          from { opacity: 0; transform: translateY(30px); filter: brightness(0.5); }
          to { opacity: 1; transform: translateY(0); filter: brightness(1); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes progress-fill {
          from { width: 0%; }
          to { width: 40%; }
        }
        @keyframes pulse-border {
          0%, 100% { border-color: rgba(255, 255, 255, 0.1); }
          50% { border-color: rgba(147, 51, 234, 0.5); }
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
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }
        .animate-slide-up-glow {
          animation: slide-up-glow 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-in-left {
          animation: slide-in-left 1s ease-out;
        }
        .animate-slide-in-right {
          animation: slide-in-right 1s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-progress-fill {
          animation: progress-fill 2s ease-out;
        }
        .animate-pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
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
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .animate-bounce-x {
          animation: bounce-x 1s ease-in-out infinite;
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-1000 { animation-delay: 1s; }
      `}</style>
    </section>
  );
};

export default ExtensionSection;