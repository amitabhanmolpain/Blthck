import React from 'react';
import { Shield, Github, Twitter, Mail, Heart, Linkedin, Sparkles, Zap, Target, Brain, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-black border-t border-white/10 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10"></div>
        
        {/* Floating elements */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-purple-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-blue-400/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-indigo-400/20 rounded-full animate-ping"></div>
        <div className="absolute bottom-10 right-10 w-4 h-4 bg-violet-400/20 rounded-full animate-pulse"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          
          {/* Brand Section - Enhanced */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="p-3 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Sparkles className="h-2 w-2 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Ghostify
                </h3>
                <p className="text-gray-400 font-medium">AI Job Verification Platform</p>
              </div>
              <span className="px-3 py-1 bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-500/30 text-purple-200 text-xs font-bold rounded-full animate-pulse backdrop-blur-sm">
                BETA
              </span>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              <span className="font-semibold text-white">No More Fake Hope. Just Real Jobs.</span>
              <br />
              Protecting job seekers worldwide from ghost jobs using advanced AI analysis with 100+ detection factors. 
              Join thousands who've already saved time and found real opportunities.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="text-2xl font-bold text-purple-400">99.2%</div>
                <div className="text-xs text-gray-400">Accuracy</div>
              </div>
              <div className="text-center p-4 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="text-2xl font-bold text-blue-400">500K+</div>
                <div className="text-xs text-gray-400">Jobs Analyzed</div>
              </div>
              <div className="text-center p-4 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="text-2xl font-bold text-indigo-400">0.3s</div>
                <div className="text-xs text-gray-400">Analysis Time</div>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center">
              <Target className="h-5 w-5 mr-2 text-purple-400" />
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <Brain className="h-4 w-4 mr-2 text-purple-400 group-hover:scale-110 transition-transform" />
                  AI Job Analyzer
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <Zap className="h-4 w-4 mr-2 text-blue-400 group-hover:scale-110 transition-transform" />
                  100+ Detection Factors
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <Shield className="h-4 w-4 mr-2 text-indigo-400 group-hover:scale-110 transition-transform" />
                  Browser Extension
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <Target className="h-4 w-4 mr-2 text-violet-400 group-hover:scale-110 transition-transform" />
                  API Access
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold text-white mb-6">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Ghost Job Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Detection Research</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">AI Model Details</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Success Stories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Blog & Updates</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-bold text-white mb-6">Connect & Follow</h4>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://www.linkedin.com/in/amitabh-anmol-pain-118308309" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-3 bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-blue-600/20 hover:border-blue-500/30 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
              </a>
              <a 
                href="https://github.com/amitabhanmolpain" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-3 bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-gray-600/20 hover:border-gray-500/30 transition-all duration-300 hover:scale-110"
              >
                <Github className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="#" 
                className="group p-3 bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-blue-500/20 hover:border-blue-400/30 transition-all duration-300 hover:scale-110"
              >
                <Twitter className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
              </a>
              <a 
                href="#" 
                className="group p-3 bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-purple-600/20 hover:border-purple-500/30 transition-all duration-300 hover:scale-110"
              >
                <Mail className="h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
              </a>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <h5 className="text-white font-semibold mb-3">Stay Updated</h5>
              <p className="text-gray-400 text-sm mb-4">Get the latest ghost job insights and AI updates.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm"
                />
                <button className="px-4 py-2 bg-black/20 backdrop-blur-xl border border-white/20 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 text-sm">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
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
                className="group inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full text-sm font-medium text-orange-200 hover:from-orange-500/30 hover:to-red-500/30 hover:border-orange-400/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm shadow-lg hover:shadow-orange-500/25"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-gradient-to-r from-orange-400 to-red-400 rounded-md flex items-center justify-center">
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
                  Made with <Heart className="h-4 w-4 text-red-500 mx-1 animate-pulse" /> for job seekers worldwide
                </p>
                <div className="h-4 w-px bg-gray-700"></div>
                <p className="text-gray-500 text-sm font-medium">
                  Created by <span className="text-purple-400">Amitabh Anmol Pain</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;