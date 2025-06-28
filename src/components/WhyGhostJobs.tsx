import React from 'react';
import { 
  Users, 
  FileCheck, 
  DollarSign, 
  Search, 
  Building, 
  BarChart3, 
  AlertTriangle, 
  Zap, 
  Eye,
  Shield,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; // Added for navigation

// Define type for Auth context
interface AuthContextType {
  user: { user_metadata?: { full_name?: string }; email?: string } | null;
}

const WhyGhostJobs: React.FC = () => {
  const { user } = useAuth() as AuthContextType;
  const navigate = useNavigate(); // Initialize navigate hook

  const handleProtectFromGhostJobs = () => {
    if (user) {
      navigate('/analyzer'); // Navigate to /analyzer in the same tab
    } else {
      const event = new CustomEvent('openAuthModal');
      window.dispatchEvent(event);
    }
  };

  const reasons = [
    {
      icon: Users,
      title: "Talent Pipeline Building",
      description: "Companies collect resumes to build a database of potential candidates for future openings, even when no current position exists.",
      color: "text-orange-400",
      impact: "High"
    },
    {
      icon: FileCheck,
      title: "Compliance Requirements",
      description: "Organizations post jobs to meet legal requirements for equal opportunity hiring, even when they have an internal candidate in mind.",
      color: "text-amber-400",
      impact: "Medium"
    },
    {
      icon: DollarSign,
      title: "Budget Pending Approval",
      description: "HR posts jobs before final budget approval, leading to positions that may never actually get funded or approved.",
      color: "text-yellow-400",
      impact: "High"
    },
    {
      icon: Search,
      title: "Market Intelligence",
      description: "Companies research salary expectations and skill availability in the market without intending to hire immediately.",
      color: "text-orange-300",
      impact: "Medium"
    },
    {
      icon: Building,
      title: "Company Image Boost",
      description: "Startups and small companies post multiple jobs to create an impression of rapid growth and attract investors or clients.",
      color: "text-amber-300",
      impact: "Medium"
    },
    {
      icon: BarChart3,
      title: "HR Performance Metrics",
      description: "HR departments maintain job postings to show activity and justify their budget, even without genuine hiring intent.",
      color: "text-yellow-300",
      impact: "Low"
    },
    {
      icon: AlertTriangle,
      title: "Poor Maintenance",
      description: "Outdated postings remain active due to poor system management or forgotten renewals on job boards.",
      color: "text-orange-400",
      impact: "Medium"
    },
    {
      icon: Zap,
      title: "Cheap Labor Fishing",
      description: "Some postings are designed to find freelancers willing to work for below-market rates rather than hire full-time employees.",
      color: "text-amber-400",
      impact: "High"
    },
    {
      icon: Eye,
      title: "System Testing",
      description: "Companies use fake postings to test their applicant tracking systems, AI screening tools, or recruitment processes.",
      color: "text-yellow-400",
      impact: "Low"
    }
  ];

  return (
    <section id="why-ghost-jobs" className="relative overflow-hidden min-h-screen flex items-center justify-center py-20">
      {/* Dark Background - Same as Hero */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Grid Pattern - Same as Hero */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Floating Elements - Same style as Hero but different positions */}
      <div className="absolute top-20 left-16 w-2 h-2 bg-red-400/30 rounded-full animate-pulse"></div>
      <div className="absolute top-32 right-24 w-3 h-3 bg-orange-400/30 rounded-full animate-bounce"></div>
      <div className="absolute bottom-24 left-32 w-2 h-2 bg-amber-400/30 rounded-full animate-ping"></div>
      <div className="absolute bottom-32 right-16 w-4 h-4 bg-yellow-400/30 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 left-8 w-3 h-3 bg-orange-300/30 rounded-full animate-bounce"></div>
      <div className="absolute top-1/3 right-8 w-2 h-2 bg-amber-300/30 rounded-full animate-ping"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header with Hero-style animations */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-black/40 border border-white/10 rounded-full text-sm text-gray-300 backdrop-blur-xl shadow-2xl animate-fade-in mb-8">
            <AlertCircle className="h-4 w-4 mr-2 text-red-400 animate-pulse" />
            The Dark Truth Behind Job Postings
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="block text-white mb-4 animate-slide-up">Why Are</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 animate-slide-up delay-200 relative">
              Ghost Jobs Created?
              <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 via-orange-400/20 to-amber-400/20 blur-3xl animate-pulse"></div>
            </span>
          </h2>
          
          <div className="space-y-6 animate-slide-up delay-400">
            <p className="text-xl md:text-2xl text-white font-medium">
              Understanding the Deceptive Motivations
            </p>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover the dark reasons behind fake job postings and learn how to protect yourself from these time-wasting traps.
            </p>
          </div>
        </div>

        {/* Reasons Grid with Hero-style glass cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 animate-slide-up delay-600">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group relative bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-black/30 hover:border-white/20 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              
              {/* Icon with impact badge - Increased size */}
              <div className="relative mb-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-black/30 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/10 mb-2">
                    <reason.icon className={`h-8 w-8 ${reason.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                </div>
                <div className="flex justify-end">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    reason.impact === 'High' ? 'bg-red-500/20 text-red-300 border border-red-400/30' :
                    reason.impact === 'Medium' ? 'bg-orange-500/20 text-orange-300 border border-orange-400/30' :
                    'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                  } backdrop-blur-sm`}>
                    {reason.impact}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 transition-all duration-300">
                  {reason.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Section with Hero-style design */}
        <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl mb-12 animate-slide-up delay-800">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                Shocking Statistics
              </span>
            </h3>
            <p className="text-gray-300">The alarming scale of ghost jobs in today's market</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl p-4">
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 mb-2">
                43%
              </div>
              <p className="text-gray-300 text-sm">Of job postings are ghost jobs</p>
            </div>
            <div className="text-center bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl p-4">
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 mb-2">
                3.3M
              </div>
              <p className="text-gray-300 text-sm">Ghost jobs posted monthly</p>
            </div>
            <div className="text-center bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl p-4">
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400 mb-2">
                76%
              </div>
              <p className="text-gray-300 text-sm">Applied to fake positions</p>
            </div>
            <div className="text-center bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl p-4">
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-2">
                27hrs
              </div>
              <p className="text-gray-300 text-sm">Wasted time monthly</p>
            </div>
          </div>
        </div>

        {/* CTA Button with Hero-style design */}
        <div className="text-center animate-slide-up delay-1000">
          <button 
            onClick={handleProtectFromGhostJobs}
            className="group relative inline-flex items-center px-12 py-6 bg-black/20 backdrop-blur-xl border border-white/20 text-white font-bold text-lg rounded-2xl shadow-2xl hover:bg-black/30 hover:border-white/30 transform hover:scale-105 transition-all duration-300 animate-glow-red"
            aria-label="Protect yourself from ghost jobs"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            <div className="relative flex items-center">
              <Shield className="h-6 w-6 mr-3 group-hover:animate-pulse" />
              Protect Yourself from Ghost Jobs
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </button>
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
        @keyframes glow-red {
          0%, 100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.3); }
          50% { box-shadow: 0 0 40px rgba(239, 68, 68, 0.5); }
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
        .delay-800 {
          animation-delay: 0.8s;
        }
        .delay-1000 {
          animation-delay: 1.0s;
        }
        .animate-glow-red {
          animation: glow-red 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default WhyGhostJobs;