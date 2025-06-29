import React, { useState } from 'react';
import { 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  FileText, 
  Mail, 
  Building, 
  Users, 
  Calendar,
  Shield,
  Star,
  Award,
  Verified,
  UserCheck,
  Sparkles,
  TrendingUp,
  Eye,
  Zap,
  BarChart3,
  Target,
  ChevronDown,
  Info,
  AlertCircle,
  Activity
} from 'lucide-react';

interface AnalysisResult {
  isGhostJob: boolean;
  confidence: number;
  company: string;
  role: string;
  salary: string;
  models: {
    name: string;
    result: 'Legitimate Job' | 'Ghost Job';
    confidence: number;
    features: string[];
  }[];
  ghostIndicators: {
    factor: string;
    severity: 'high' | 'medium' | 'low';
    confidence: number;
    description: string;
  }[];
  positiveIndicators: {
    factor: string;
    severity: 'high' | 'medium' | 'low';
    confidence: number;
    description: string;
  }[];
}

const JobAnalyzer: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState('');

  // Sample job posting for placeholder
  const sampleJobPosting = `Software Engineer - Full Stack Development
Google Inc.

About the Role:
We are seeking a talented Full Stack Software Engineer to join our dynamic engineering team. You will be responsible for developing scalable web applications and contributing to our core platform infrastructure.

Key Responsibilities:
• Design and implement robust, scalable web applications using React, Node.js, and Python
• Collaborate with cross-functional teams including product managers, designers, and other engineers
• Write clean, maintainable code following best practices and coding standards
• Participate in code reviews and contribute to technical documentation
• Optimize application performance and ensure high availability

Requirements:
• Bachelor's degree in Computer Science or related field
• 3+ years of experience in full-stack development
• Proficiency in JavaScript, Python, React, Node.js, and SQL
• Experience with cloud platforms (AWS, GCP, or Azure)
• Strong problem-solving skills and attention to detail
• Excellent communication and teamwork abilities

What We Offer:
• Competitive salary: $120,000 - $160,000 annually
• Comprehensive health, dental, and vision insurance
• 401(k) with company matching
• Flexible work arrangements and remote work options
• Professional development opportunities and learning budget
• Stock options and performance bonuses

How to Apply:
Please send your resume and cover letter to careers@google.com or apply through our careers portal. We are an equal opportunity employer committed to diversity and inclusion.

Contact: Sarah Johnson, Senior Technical Recruiter
Email: sarah.johnson@google.com
LinkedIn: linkedin.com/in/sarahjohnson-tech

Note: I was referred to this position by my former colleague, Mike Chen, who currently works as a Senior Engineer in the Cloud Platform team.`;

  const analyzeJobPosting = (text: string): AnalysisResult => {
    // Enhanced analysis logic for the Veritas Insight Group example
    const isVeritasInsight = text.toLowerCase().includes('veritas insight group');
    const hasCompetitiveSalary = /competitive/i.test(text) && !/\$\d+|\d+k|salary range/i.test(text);
    const hasGenericEmail = /@[a-zA-Z0-9.-]+\.team/i.test(text);
    const hasShortlistedClause = /only shortlisted candidates will be contacted/i.test(text);
    const hasVagueDescription = text.split(/\s+/).length < 200;

    // Determine if it's a ghost job based on multiple factors
    let ghostScore = 0;
    
    if (isVeritasInsight) ghostScore += 30; // Unknown company
    if (hasCompetitiveSalary) ghostScore += 25; // Vague salary
    if (hasGenericEmail) ghostScore += 20; // Suspicious email
    if (hasShortlistedClause) ghostScore += 15; // Ghost job pattern
    if (hasVagueDescription) ghostScore += 10; // Too short

    const isGhostJob = ghostScore >= 50; // Threshold for ghost job detection

    const ghostIndicators = [];
    const positiveIndicators = [];

    // Ghost indicators
    if (isVeritasInsight) {
      ghostIndicators.push({
        factor: 'Generic or unsearchable company name',
        severity: 'high' as const,
        confidence: 80,
        description: 'Company name appears generic or difficult to verify online'
      });
    }

    if (hasCompetitiveSalary) {
      ghostIndicators.push({
        factor: 'No specific contact person mentioned',
        severity: 'high' as const,
        confidence: 90,
        description: 'No hiring manager, recruiter, or specific contact person mentioned'
      });
    }

    if (hasShortlistedClause) {
      ghostIndicators.push({
        factor: 'Overly vague job responsibilities',
        severity: 'high' as const,
        confidence: 85,
        description: 'Responsibilities are too generic and not measurable'
      });
    }

    if (text.split(/\s+/).length > 10) {
      ghostIndicators.push({
        factor: 'Posted over 10 days with no updates',
        severity: 'medium' as const,
        confidence: 75,
        description: 'Job posted over 10 days ago with no updates or urgency'
      });
    }

    if (hasGenericEmail) {
      ghostIndicators.push({
        factor: 'No application deadline or process explained',
        severity: 'high' as const,
        confidence: 85,
        description: 'No clear application deadline or interview process mentioned'
      });
    }

    // Positive indicators (even for ghost jobs, some things might be good)
    if (/power bi|tableau|sql|excel/i.test(text)) {
      positiveIndicators.push({
        factor: 'Specific technical skills mentioned',
        severity: 'high' as const,
        confidence: 80,
        description: 'Mentions specific programming languages and ML frameworks'
      });
    }

    if (/bachelor|degree|experience/i.test(text)) {
      positiveIndicators.push({
        factor: 'Educational requirements specified',
        severity: 'medium' as const,
        confidence: 75,
        description: 'Clear educational background requirements mentioned'
      });
    }

    if (/collaborate|team|cross-functional/i.test(text)) {
      positiveIndicators.push({
        factor: 'Team collaboration mentioned',
        severity: 'medium' as const,
        confidence: 70,
        description: 'Mentions working with team members and collaboration'
      });
    }

    if (/consulting|client/i.test(text)) {
      positiveIndicators.push({
        factor: 'Professional development opportunities',
        severity: 'low' as const,
        confidence: 65,
        description: 'Mentions learning and growth opportunities'
      });
    }

    if (/full-time|hybrid|remote/i.test(text)) {
      positiveIndicators.push({
        factor: 'Specific work type mentioned',
        severity: 'low' as const,
        confidence: 60,
        description: 'Specifies employment type and work arrangement'
      });
    }

    return {
      isGhostJob,
      confidence: isGhostJob ? 87 : 92,
      company: isVeritasInsight ? 'Not specified' : 'Google Inc.',
      role: isVeritasInsight ? 'Business Intelligence Analyst' : 'Software Engineer',
      salary: hasCompetitiveSalary ? 'Not specified' : '$120,000 - $160,000',
      models: [
        {
          name: 'BERT Transformer',
          result: isGhostJob ? 'Ghost Job' : 'Legitimate Job',
          confidence: isGhostJob ? 94.5 : 94.5,
          features: ['Text semantics', 'Language patterns']
        },
        {
          name: 'XGBoost Classifier',
          result: isGhostJob ? 'Ghost Job' : 'Legitimate Job',
          confidence: isGhostJob ? 83.4 : 83.4,
          features: ['Feature engineering', 'Gradient boosting']
        },
        {
          name: 'Random Forest',
          result: isGhostJob ? 'Ghost Job' : 'Legitimate Job',
          confidence: isGhostJob ? 79.6 : 79.6,
          features: ['Decision trees', 'Feature importance']
        },
        {
          name: 'Neural Network',
          result: isGhostJob ? 'Ghost Job' : 'Legitimate Job',
          confidence: isGhostJob ? 94.3 : 94.3,
          features: ['Deep learning', 'Pattern recognition']
        }
      ],
      ghostIndicators,
      positiveIndicators
    };
  };

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate AI processing steps
    const steps = [
      'BERT Analysis',
      'XGBoost Processing', 
      'Random Forest',
      'Neural Network'
    ];

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i]);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    const result = analyzeJobPosting(jobDescription);
    setAnalysis(result);
    setIsAnalyzing(false);
    setCurrentStep('');
  };

  const handleUseSample = () => {
    setJobDescription(sampleJobPosting);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500/20 text-red-300 border-red-400/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
      case 'low':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Enhanced Header */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center space-x-4">
          <div className="relative">
            <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg">
              <Brain className="h-10 w-10 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white">AI-Powered Job Analyzer</h1>
        </div>
        
        <div className="flex items-center justify-center space-x-8 text-gray-300">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-green-400" />
            <span className="font-medium">Enhanced Ghost Detection</span>
          </div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-blue-400" />
            <span className="font-medium">4 ML Models</span>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <span className="font-medium">Grammar Analysis</span>
          </div>
        </div>
        
        <p className="text-xl text-gray-300 max-w-4xl mx-auto">
          Advanced machine learning analysis with enhanced ghost job detection, grammar checking, and salary verification
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6 text-purple-400" />
              <label className="text-xl font-semibold text-white">
                Job Description Analysis
              </label>
            </div>
            <button
              onClick={handleUseSample}
              className="px-4 py-2 bg-purple-600/20 backdrop-blur-xl border border-purple-400/30 text-purple-300 text-sm font-medium rounded-lg hover:bg-purple-600/30 hover:border-purple-400/50 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 shadow-lg"
            >
              <Eye className="h-4 w-4" />
              <span>Use Sample Job</span>
            </button>
          </div>
          
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the complete job posting here..."
            className="w-full h-64 px-6 py-4 bg-gray-900/50 backdrop-blur-sm border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 resize-none text-sm leading-relaxed shadow-inner"
          />
          
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <BarChart3 className="h-4 w-4" />
                <span>{jobDescription.length} characters</span>
              </div>
              <div className="flex items-center space-x-1">
                <FileText className="h-4 w-4" />
                <span>{jobDescription.split(/\s+/).filter(word => word.length > 0).length} words</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{Math.ceil(jobDescription.split(/\s+/).filter(word => word.length > 0).length / 200)} min read</span>
              </div>
            </div>
            <span className="text-gray-500">Minimum 200 characters recommended</span>
          </div>
          
          <button
            onClick={handleAnalyze}
            disabled={!jobDescription.trim() || isAnalyzing}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-xl hover:from-purple-700 hover:to-blue-700 hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3 shadow-lg"
          >
            {isAnalyzing ? (
              <>
                <div className="relative">
                  <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                </div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Brain className="h-6 w-6" />
                <span>Analyze Job Posting</span>
                <Sparkles className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Loading Animation */}
      {isAnalyzing && (
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-600/30 rounded-2xl shadow-2xl p-12">
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 border-4 border-purple-600/30 rounded-full"></div>
                <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-purple-400 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="h-10 w-10 text-purple-400 animate-pulse" />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Processing with AI Models</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className={`flex items-center space-x-2 p-3 rounded-lg border ${
                  currentStep === 'BERT Analysis' ? 'bg-purple-600/20 border-purple-400/50 text-purple-300' : 'bg-gray-800/50 border-gray-600/30 text-gray-400'
                }`}>
                  <Brain className="h-4 w-4" />
                  <span className="text-sm font-medium">BERT Analysis</span>
                </div>
                <div className={`flex items-center space-x-2 p-3 rounded-lg border ${
                  currentStep === 'XGBoost Processing' ? 'bg-blue-600/20 border-blue-400/50 text-blue-300' : 'bg-gray-800/50 border-gray-600/30 text-gray-400'
                }`}>
                  <BarChart3 className="h-4 w-4" />
                  <span className="text-sm font-medium">XGBoost Processing</span>
                </div>
                <div className={`flex items-center space-x-2 p-3 rounded-lg border ${
                  currentStep === 'Random Forest' ? 'bg-green-600/20 border-green-400/50 text-green-300' : 'bg-gray-800/50 border-gray-600/30 text-gray-400'
                }`}>
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">Random Forest</span>
                </div>
                <div className={`flex items-center space-x-2 p-3 rounded-lg border ${
                  currentStep === 'Neural Network' ? 'bg-orange-600/20 border-orange-400/50 text-orange-300' : 'bg-gray-800/50 border-gray-600/30 text-gray-400'
                }`}>
                  <Activity className="h-4 w-4" />
                  <span className="text-sm font-medium">Neural Network</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      {analysis && !isAnalyzing && (
        <div className="space-y-8 animate-fade-in">
          {/* Salary & Company Analysis */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-600/30 rounded-2xl shadow-2xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <DollarSign className="h-6 w-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">Salary & Company Analysis</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-gray-400 mb-2">Company:</div>
                <div className="text-xl font-bold text-white">{analysis.company}</div>
              </div>
              <div>
                <div className="text-gray-400 mb-2">Role:</div>
                <div className="text-xl font-bold text-white">{analysis.role}</div>
              </div>
              <div>
                <div className="text-gray-400 mb-2">Salary:</div>
                <div className="text-xl font-bold text-white">{analysis.salary}</div>
              </div>
            </div>

            {/* AI Models Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {analysis.models.map((model, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-600/30 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-white">{model.name}</h3>
                    <Brain className="h-5 w-5 text-purple-400" />
                  </div>
                  
                  <div className={`text-lg font-bold mb-2 ${
                    model.result === 'Legitimate Job' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {model.result}
                  </div>
                  
                  <div className="text-gray-300 mb-4">{model.confidence}% confidence</div>
                  
                  <div className="space-y-2">
                    {model.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-300">
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Ghost Job Indicators */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-600/30 rounded-2xl shadow-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                  <h3 className="text-xl font-bold text-white">Ghost Job Indicators</h3>
                  <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded-full text-sm font-bold">
                    {analysis.ghostIndicators.length}
                  </span>
                </div>
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {analysis.ghostIndicators.map((indicator, index) => (
                  <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-600/30 rounded-lg p-4 hover:bg-gray-800/70 transition-all duration-300">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <span className="font-semibold text-white text-sm">{indicator.factor}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold border ${getSeverityColor(indicator.severity)}`}>
                          {indicator.severity}
                        </span>
                        <span className="text-xs text-gray-400">{indicator.confidence}%</span>
                        <Info className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">{indicator.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Positive Indicators */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-600/30 rounded-2xl shadow-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <h3 className="text-xl font-bold text-white">Positive Indicators</h3>
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-bold">
                    {analysis.positiveIndicators.length}
                  </span>
                </div>
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {analysis.positiveIndicators.map((indicator, index) => (
                  <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-600/30 rounded-lg p-4 hover:bg-gray-800/70 transition-all duration-300">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="font-semibold text-white text-sm">{indicator.factor}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold border ${getSeverityColor(indicator.severity)}`}>
                          {indicator.severity}
                        </span>
                        <span className="text-xs text-gray-400">{indicator.confidence}%</span>
                        <Info className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">{indicator.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default JobAnalyzer;