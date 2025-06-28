import React from 'react';
import { 
  Clock, 
  Target, 
  Shield, 
  Brain, 
  CheckCircle, 
  TrendingUp, 
  Award, 
  Eye, 
  Lock, 
  Bell, 
  Users,
  Zap,
  AlertTriangle,
  Search,
  FileCheck,
  DollarSign,
  Building,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Benefits = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStartProtecting = () => {
    if (user) {
      navigate('/analyzer');
    } else {
      const event = new CustomEvent('openAuthModal');
      window.dispatchEvent(event);
    }
  };

  const benefits = [
    { 
      id: 1,
      icon: Clock, 
      hoverIcon: Zap,
      title: "Save Time by Avoiding Fake Jobs", 
      description: "No more wasting hours applying to roles that will never be filled.", 
      color: "emerald",
      size: "large",
    },
    { 
      id: 2,
      icon: Target, 
      hoverIcon: Search,
      title: "Apply Only to Genuine Opportunities", 
      description: "Focus your energy on real jobs with actual hiring potential.", 
      color: "blue",
      size: "medium",
    },
    { 
      id: 3,
      icon: Shield, 
      hoverIcon: Lock,
      title: "Avoid Scams and Data Harvesters", 
      description: "Stay protected from phishing job posts or those collecting your personal data.", 
      color: "purple",
      size: "medium",
    },
    { 
      id: 4,
      icon: Brain, 
      hoverIcon: TrendingUp,
      title: "Make Smarter Career Decisions", 
      description: "Ghostify helps you prioritize trustworthy companies with real hiring intent.", 
      color: "pink",
      size: "small",
    },
    { 
      id: 5,
      icon: CheckCircle, 
      hoverIcon: Award,
      title: "Gain Confidence While Job Hunting", 
      description: "Know whether a job is real or fake before applying — no more second guessing.", 
      color: "green",
      size: "large",
    },
    { 
      id: 6,
      icon: TrendingUp, 
      hoverIcon: BarChart3,
      title: "Track Company Hiring Patterns", 
      description: "See if a company frequently posts but rarely hires — a major red flag.", 
      color: "orange",
      size: "small",
    },
    { 
      id: 7,
      icon: Award, 
      hoverIcon: CheckCircle,
      title: "Boost Your Success Rate", 
      description: "By applying to legitimate jobs only, you increase your chances of getting interviews.", 
      color: "yellow",
      size: "medium",
    },
    { 
      id: 8,
      icon: Target, 
      hoverIcon: Eye,
      title: "Use It Anywhere", 
      description: "Browser Extension + Web App. Scan jobs on LinkedIn, Indeed, or any site directly.", 
      color: "violet",
      size: "small",
    },
    { 
      id: 9,
      icon: Eye, 
      hoverIcon: Brain,
      title: "Stay Informed with AI-Powered Insights", 
      description: "Understand exactly why a job might be fake — with transparent explanations.", 
      color: "cyan",
      size: "medium",
    },
    { 
      id: 10,
      icon: Lock, 
      hoverIcon: Shield,
      title: "Protect Your Resume & Personal Info", 
      description: "Don't share your data with fake employers or bots.", 
      color: "red",
      size: "medium",
    },
    { 
      id: 11,
      icon: Bell, 
      hoverIcon: AlertTriangle,
      title: "Get Alerts Before It's Too Late", 
      description: "Be notified when a job you've saved turns suspicious or gets flagged.", 
      color: "indigo",
      size: "small",
    },
    { 
      id: 12,
      icon: Users, 
      hoverIcon: Building,
      title: "Join a Safer Job-Seeking Community", 
      description: "Connect with others and share/report suspicious jobs to protect fellow job hunters.", 
      color: "teal",
      size: "large",
    }
  ];

  const getCardClasses = (size) => {
    const baseClasses = "group relative bg-black/20 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 hover:bg-black/30 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl overflow-hidden";
    
    switch (size) {
      case 'large':
        return `${baseClasses} md:col-span-2 min-h-[280px]`;
      case 'medium':
        return `${baseClasses} min-h-[240px]`;
      case 'small':
        return `${baseClasses} min-h-[200px]`;
      default:
        return `${baseClasses} min-h-[240px]`;
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      emerald: { text: 'text-emerald-400', bg: 'from-emerald-500/20', glow: 'group-hover:shadow-emerald-500/20' },
      blue: { text: 'text-blue-400', bg: 'from-blue-500/20', glow: 'group-hover:shadow-blue-500/20' },
      purple: { text: 'text-purple-400', bg: 'from-purple-500/20', glow: 'group-hover:shadow-purple-500/20' },
      pink: { text: 'text-pink-400', bg: 'from-pink-500/20', glow: 'group-hover:shadow-pink-500/20' },
      green: { text: 'text-green-400', bg: 'from-green-500/20', glow: 'group-hover:shadow-green-500/20' },
      orange: { text: 'text-orange-400', bg: 'from-orange-500/20', glow: 'group-hover:shadow-orange-500/20' },
      yellow: { text: 'text-yellow-400', bg: 'from-yellow-500/20', glow: 'group-hover:shadow-yellow-500/20' },
      cyan: { text: 'text-cyan-400', bg: 'from-cyan-500/20', glow: 'group-hover:shadow-cyan-500/20' },
      red: { text: 'text-red-400', bg: 'from-red-500/20', glow: 'group-hover:shadow-red-500/20' },
      indigo: { text: 'text-indigo-400', bg: 'from-indigo-500/20', glow: 'group-hover:shadow-indigo-500/20' },
      teal: { text: 'text-teal-400', bg: 'from-teal-500/20', glow: 'group-hover:shadow-teal-500/20' },
      violet: { text: 'text-violet-400', bg: 'from-violet-500/20', glow: 'group-hover:shadow-violet-500/20' }
    };
    return colors[color] || colors.blue;
  };

  return (
    <section id="benefits" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-black"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-8 h-8 bg-white/5 rounded-lg rotate-12 animate-float"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-white/5 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-16 w-10 h-10 bg-white/5 rounded-lg -rotate-12 animate-pulse"></div>
        <div className="absolute bottom-20 right-32 w-4 h-4 bg-white/5 rounded-full animate-ping"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-indigo-500/3 to-transparent rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-sm text-gray-300 mb-6 shadow-lg">
            <CheckCircle className="h-4 w-4 mr-2 text-emerald-400" />
            Why Choose Ghostify
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Benefits of Using
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400">
              Ghostify AI
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform your job search with AI-powered verification that saves time, protects your data, and increases your success rate.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-max">
          {benefits.map((benefit) => {
            const colorClasses = getColorClasses(benefit.color);
            return (
              <div 
                key={benefit.id} 
                className={`${getCardClasses(benefit.size)} ${colorClasses.glow}`}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${colorClasses.bg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}></div>
                
                {/* Content */}
                <div className="relative h-full flex flex-col">
                  {/* Icon with hover change */}
                  <div className="flex justify-start mb-6">
                    <div className="relative w-16 h-16 bg-black/20 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 border border-white/10">
                      <benefit.icon className={`h-8 w-8 ${colorClasses.text} transition-all duration-300 group-hover:opacity-0 group-hover:scale-0`} />
                      <benefit.hoverIcon className={`h-8 w-8 ${colorClasses.text} absolute transition-all duration-300 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100`} />
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${colorClasses.bg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg`}></div>
                    </div>
                  </div>
                  
                  {/* Text content */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 transition-all duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <button 
            onClick={handleStartProtecting}
            className="inline-flex items-center px-8 py-4 bg-black/20 backdrop-blur-xl border border-white/20 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Start Protecting Your Job Search Today
            <CheckCircle className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;