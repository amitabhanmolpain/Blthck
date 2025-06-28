import React, { useState, useEffect, useRef } from 'react';
import { Chrome, Download, Zap, Shield, Eye, CheckCircle, Send, Sparkles, Code, Layers, Activity } from 'lucide-react';
import { CardSpotlight } from './CardSpotlight';

// Browser Icons Component
const BraveIcon = () => (
  <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16l-1.085 6.825c-.085.53-.455.96-.98 1.14l-3.45 1.18c-.18.06-.375.06-.555 0l-3.45-1.18c-.525-.18-.895-.61-.98-1.14L5.983 8.16c-.06-.375.09-.75.39-.96.3-.21.69-.21.99 0L12 10.32l4.637-3.12c.3-.21.69-.21.99 0 .3.21.45.585.39.96z"/>
  </svg>
);

const EdgeIcon = () => (
  <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.86 7.86c-.15-4.5-3.8-7.86-8.36-7.86C8.1 0 3.9 2.4 2.26 6.06c-.82 1.84-1.26 3.9-1.26 6.04 0 6.63 5.37 12 12 12 3.94 0 7.44-1.9 9.64-4.84.44-.58.82-1.2 1.14-1.86.16-.33.3-.67.42-1.02.24-.7.42-1.44.52-2.2.05-.38.08-.77.08-1.16 0-.02 0-.04 0-.06-.02-1.7-.32-3.34-.94-4.86zm-8.36 13.64c-5.52 0-10-4.48-10-10s4.48-10 10-10c4.42 0 8.14 2.88 9.44 6.86-1.3-2.98-4.26-5.06-7.74-5.06-4.64 0-8.4 3.76-8.4 8.4s3.76 8.4 8.4 8.4c2.32 0 4.42-.94 5.94-2.46-1.52 1.52-3.62 2.46-5.94 2.46z"/>
  </svg>
);

const ExtensionSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer to trigger animation when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Animate progress bar from 0 to 40% when section becomes visible
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 40) {
              clearInterval(interval);
              return 40;
            }
            return prev + 1;
          });
        }, 50);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

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
    <section ref={sectionRef} className="relative py-20 lg:py-32 overflow-hidden">
      {/* Dark Theme Background matching Hero and Benefits */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Tech/Browser themed floating elements */}
        <div className="absolute top-20 left-12 w-8 h-8 bg-white/5 rounded-lg animate-pulse"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-white/5 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-16 w-10 h-10 bg-white/5 rounded-lg rotate-12 animate-pulse"></div>
        <div className="absolute bottom-20 right-32 w-4 h-4 bg-white/5 rounded-full animate-ping"></div>
        
        {/* Circuit board pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        {/* Browser window mockups */}
        <div className="absolute top-10 right-10 w-32 h-20 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm"></div>
        <div className="absolute bottom-10 left-10 w-24 h-16 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm"></div>
        
        {/* Radial Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-indigo-500/3 to-transparent rounded-full"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-sm text-gray-300 mb-6 shadow-lg">
            <Chrome className="h-4 w-4 mr-2 text-blue-400" />
            Coming Soon
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Browser Extension
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400">
              In Development
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Our browser extension is currently in development with cutting-edge technology. 
            Analyze ghost jobs directly on any job board with one click.
          </p>
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-full text-green-300 font-semibold backdrop-blur-xl">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            Stay Tuned - Launching Soon!
          </div>
        </div>

        {/* Extension Preview - Properly Aligned */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Left Column - Extension Preview */}
          <div className="flex flex-col h-full">
            <CardSpotlight className="flex-1 min-h-[500px] flex flex-col">
              <div className="relative z-20 flex flex-col h-full">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-black/20 backdrop-blur-xl rounded-xl flex items-center justify-center mr-4 shadow-lg border border-white/10">
                    <Chrome className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Ghostify Extension</h3>
                    <p className="text-gray-400 text-sm">Chrome • Firefox • Edge</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6 flex-1">
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-3" />
                    <span className="text-sm">Instant job analysis on any website</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-3" />
                    <span className="text-sm">Works with LinkedIn, Indeed, Glassdoor</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-3" />
                    <span className="text-sm">Privacy-first local processing</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-3" />
                    <span className="text-sm">Real-time ghost job alerts</span>
                  </div>
                </div>

                {/* Development Progress Card - Properly Positioned */}
                <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg p-4 shadow-lg mt-auto">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-medium text-sm flex items-center">
                      <Code className="h-4 w-4 mr-2 text-blue-400" />
                      Development Progress
                    </span>
                    <span className="text-orange-400 font-bold text-sm">{progress}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3 mb-4 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-amber-500 h-3 rounded-full transition-all duration-100 ease-out" 
                      style={{ width: `${progress}%` }}
                    ></div>
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

          {/* Right Column - Features */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Extension Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <CardSpotlight key={index} className="h-auto">
                    <div className="relative z-20 text-center">
                      {/* Centered Icon with Beautiful Colors */}
                      <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-black/20 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-lg border border-white/10">
                          <feature.icon className={`h-8 w-8 ${feature.color}`} />
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
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-white mb-8">Supported Browsers</h3>
          <div className="flex justify-center items-center space-x-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-black/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg border border-white/10">
                <Chrome className="h-8 w-8 text-white" />
              </div>
              <p className="text-gray-300 font-medium">Chrome</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg border border-white/10">
                <BraveIcon />
              </div>
              <p className="text-gray-300 font-medium">Brave</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg border border-white/10">
                <EdgeIcon />
              </div>
              <p className="text-gray-300 font-medium">Edge</p>
            </div>
          </div>
        </div>

        {/* Enhanced Notification Signup with Animation */}
        <div className="text-center">
          <CardSpotlight className="max-w-2xl mx-auto">
            <div className="relative z-20 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Get Notified When It Launches</h3>
              <p className="text-gray-300 mb-6">Be the first to know when our browser extension is ready for download.</p>
              
              {!isSubmitted ? (
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-white/20 transition-all duration-300"
                    required
                  />
                  <button 
                    type="submit"
                    disabled={isAnimating}
                    className="px-6 py-3 bg-black/20 backdrop-blur-xl border border-white/20 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isAnimating ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Notify Me
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="animate-fade-in">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-green-400" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">You're All Set! 🎉</h4>
                  <p className="text-gray-300">
                    We'll notify you at <span className="text-purple-400 font-semibold">{email}</span> when the extension launches.
                  </p>
                  <div className="mt-4 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-yellow-400 mr-2 animate-pulse" />
                    <span className="text-sm text-gray-400">Thank you for your interest!</span>
                  </div>
                </div>
              )}
            </div>
          </CardSpotlight>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </section>
  );
};

export default ExtensionSection;