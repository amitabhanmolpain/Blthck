import React from 'react';
import { Shield } from 'lucide-react';
import JobAnalyzer from '../components/JobAnalyzer';
import { useAuth } from '../contexts/AuthContext';

const AnalyzerPage: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg shadow-purple-500/25">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Ghostify Analyzer</h1>
          </div>

          <p className="text-gray-300">
            {user
              ? `Welcome back, ${user.user_metadata?.full_name || user.email?.split('@')[0]}!`
              : 'You can use the analyzer even without signing in.'}
          </p>
        </div>

        <JobAnalyzer />
      </div>
    </div>
  );
};

export default AnalyzerPage;
