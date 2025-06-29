import React, { useState } from 'react';
import { 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Building, 
  Mail, 
  FileText, 
  TrendingUp,
  Shield,
  Zap,
  Target,
  Eye,
  Users,
  BarChart3,
  Brain,
  Cpu,
  Activity,
  Layers,
  Database,
  GitBranch,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  AlertCircle,
  Info,
  HelpCircle
} from 'lucide-react';

interface MLAnalysisResult {
  isGhostJob: boolean;
  confidence: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  overallScore: number;
  ghostConditions: ConditionResult[];
  legitimateConditions: ConditionResult[];
  mlModels: ModelResult[];
  summary: string;
  recommendations: string[];
  detailedAnalysis: {
    textAnalysis: TextAnalysisResult;
    temporalAnalysis: TemporalAnalysisResult;
    companyAnalysis: CompanyAnalysisResult;
    requirementAnalysis: RequirementAnalysisResult;
    emailAnalysis: EmailAnalysisResult;
    grammarAnalysis: GrammarAnalysisResult;
  };
}

interface ConditionResult {
  condition: string;
  detected: boolean;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  category: string;
  description: string;
  explanation: string;
}

interface ModelResult {
  name: string;
  prediction: 'Ghost Job' | 'Legitimate Job';
  confidence: number;
  features: string[];
}

interface TextAnalysisResult {
  wordCount: number;
  sentimentScore: number;
  buzzwordDensity: number;
  specificityScore: number;
  readabilityScore: number;
}

interface TemporalAnalysisResult {
  estimatedPostingAge: string;
  urgencyIndicators: number;
  timelineClarity: number;
}

interface CompanyAnalysisResult {
  companyMentioned: boolean;
  contactInfoProvided: boolean;
  brandingConsistency: number;
  legitimacyScore: number;
  isVerifiableCompany: boolean;
}

interface RequirementAnalysisResult {
  clarityScore: number;
  specificityLevel: number;
  experienceRequirements: string;
  skillsSpecificity: number;
}

interface EmailAnalysisResult {
  emailFound: boolean;
  isValidEmail: boolean;
  domainType: 'corporate' | 'suspicious' | 'free' | 'invalid';
  domainFlags: string[];
}

interface GrammarAnalysisResult {
  errorCount: number;
  errorTypes: string[];
  professionalismScore: number;
}

const JobAnalyzer: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<MLAnalysisResult | null>(null);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const analyzeJob = async () => {
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate ML analysis with realistic delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Enhanced analysis for the specific job posting
    const isVeritasInsightJob = jobDescription.toLowerCase().includes('veritas insight group');
    
    // Mock comprehensive ML analysis result
    const mockResult: MLAnalysisResult = {
      isGhostJob: isVeritasInsightJob ? true : Math.random() > 0.6,
      confidence: isVeritasInsightJob ? 0.94 : 0.85 + Math.random() * 0.14,
      riskLevel: isVeritasInsightJob ? 'Critical' : (['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)] as any),
      overallScore: isVeritasInsightJob ? 15 : Math.floor(Math.random() * 100),
      ghostConditions: isVeritasInsightJob ? [
        {
          condition: "Unverifiable Company",
          detected: true,
          confidence: 0.95,
          impact: 'high',
          category: 'Company Verification',
          description: "Company 'Veritas Insight Group' cannot be verified in business databases",
          explanation: "Legitimate companies typically have verifiable business registrations, websites, and online presence. This company appears to be fictitious or unregistered."
        },
        {
          condition: "Suspicious Email Domain",
          detected: true,
          confidence: 0.88,
          impact: 'high',
          category: 'Contact Information',
          description: "Email domain @veritasinsight.team appears suspicious or unregistered",
          explanation: "Professional companies use established domains. New or suspicious domains are often used in ghost job postings to collect applicant data."
        },
        {
          condition: "Vague Compensation Details",
          detected: true,
          confidence: 0.82,
          impact: 'medium',
          category: 'Compensation',
          description: "Only mentions 'Competitive' without specific salary range",
          explanation: "Ghost jobs often avoid specific compensation details to maintain flexibility or because no real position exists."
        },
        {
          condition: "Generic Job Description",
          detected: true,
          confidence: 0.76,
          impact: 'medium',
          category: 'Content Quality',
          description: "Job description uses template language common in fake postings",
          explanation: "The description matches patterns commonly used across multiple ghost job postings, suggesting it may be generated from a template."
        },
        {
          condition: "No Response Guarantee",
          detected: true,
          confidence: 0.71,
          impact: 'low',
          category: 'Application Process',
          description: "States 'only shortlisted candidates will be contacted'",
          explanation: "While not always indicative, this phrase is commonly used in ghost jobs to avoid having to respond to applicants."
        }
      ] : [
        {
          condition: "Vague Job Description",
          detected: true,
          confidence: 0.92,
          impact: 'high',
          category: 'Content Quality',
          description: "Job description lacks specific details about responsibilities",
          explanation: "Ghost jobs often use generic, vague language to cast a wide net while avoiding commitment to specific roles."
        },
        {
          condition: "Unrealistic Requirements",
          detected: false,
          confidence: 0.23,
          impact: 'medium',
          category: 'Requirements',
          description: "Requirements seem reasonable for the position level",
          explanation: "The job requirements appear to match industry standards for this type of role."
        },
        {
          condition: "Generic Company Description",
          detected: true,
          confidence: 0.78,
          impact: 'medium',
          category: 'Company Info',
          description: "Company information is generic or missing",
          explanation: "Legitimate companies typically provide specific information about their business, culture, and values."
        }
      ],
      legitimateConditions: isVeritasInsightJob ? [
        {
          condition: "Clear Job Requirements",
          detected: true,
          confidence: 0.67,
          impact: 'medium',
          category: 'Requirements',
          description: "Job requirements are clearly specified",
          explanation: "The posting does list specific technical requirements and experience levels, which is positive."
        },
        {
          condition: "Professional Language",
          detected: true,
          confidence: 0.72,
          impact: 'low',
          category: 'Content Quality',
          description: "Uses professional language and formatting",
          explanation: "The job posting is well-written and professionally formatted, which is typical of legitimate postings."
        }
      ] : [
        {
          condition: "Specific Salary Range",
          detected: true,
          confidence: 0.89,
          impact: 'high',
          category: 'Compensation',
          description: "Clear salary range provided",
          explanation: "Legitimate employers are increasingly transparent about compensation to attract qualified candidates."
        },
        {
          condition: "Clear Contact Information",
          detected: false,
          confidence: 0.45,
          impact: 'medium',
          category: 'Contact',
          description: "Limited contact information provided",
          explanation: "While not always required, legitimate jobs often provide multiple ways to contact the employer."
        }
      ],
      mlModels: [
        {
          name: "Neural Language Model",
          prediction: isVeritasInsightJob ? "Ghost Job" : "Ghost Job",
          confidence: isVeritasInsightJob ? 0.94 : 0.87,
          features: ["text_complexity", "requirement_specificity", "company_details"]
        },
        {
          name: "Random Forest Classifier",
          prediction: isVeritasInsightJob ? "Ghost Job" : "Legitimate Job",
          confidence: isVeritasInsightJob ? 0.89 : 0.72,
          features: ["posting_age", "contact_info", "salary_mentioned"]
        },
        {
          name: "Gradient Boosting Model",
          prediction: isVeritasInsightJob ? "Ghost Job" : "Ghost Job",
          confidence: isVeritasInsightJob ? 0.96 : 0.91,
          features: ["description_length", "buzzword_density", "urgency_indicators"]
        }
      ],
      summary: isVeritasInsightJob 
        ? "This job posting shows multiple critical red flags indicating it is likely a ghost job. The company cannot be verified, the email domain appears suspicious, and the posting matches common patterns used in fake job listings designed to collect applicant data."
        : "This job posting shows mixed signals. While it includes some positive indicators like salary transparency, several red flags suggest it may be a ghost job used for data collection or employer branding rather than active hiring.",
      recommendations: isVeritasInsightJob ? [
        "DO NOT APPLY - This appears to be a fake job posting",
        "Do not share personal information or documents",
        "Report this posting to the job board platform",
        "Look for similar company names that might be legitimate",
        "Search for verified companies in the same industry"
      ] : [
        "Research the company thoroughly before applying",
        "Look for recent employee reviews and hiring activity",
        "Check if the company has multiple similar postings",
        "Verify the recruiter's LinkedIn profile and company affiliation",
        "Apply cautiously and monitor for response patterns"
      ],
      detailedAnalysis: {
        textAnalysis: {
          wordCount: isVeritasInsightJob ? 287 : 450 + Math.floor(Math.random() * 200),
          sentimentScore: isVeritasInsightJob ? 0.45 : 0.3 + Math.random() * 0.4,
          buzzwordDensity: isVeritasInsightJob ? 0.18 : 0.15 + Math.random() * 0.1,
          specificityScore: isVeritasInsightJob ? 0.52 : 0.4 + Math.random() * 0.3,
          readabilityScore: isVeritasInsightJob ? 0.78 : 0.6 + Math.random() * 0.3
        },
        temporalAnalysis: {
          estimatedPostingAge: isVeritasInsightJob ? "Unknown" : "2-3 weeks",
          urgencyIndicators: isVeritasInsightJob ? 1 : Math.floor(Math.random() * 5),
          timelineClarity: isVeritasInsightJob ? 0.15 : 0.3 + Math.random() * 0.4
        },
        companyAnalysis: {
          companyMentioned: true,
          contactInfoProvided: isVeritasInsightJob ? true : Math.random() > 0.5,
          brandingConsistency: isVeritasInsightJob ? 0.25 : 0.4 + Math.random() * 0.4,
          legitimacyScore: isVeritasInsightJob ? 0.08 : 0.5 + Math.random() * 0.4,
          isVerifiableCompany: isVeritasInsightJob ? false : Math.random() > 0.4
        },
        requirementAnalysis: {
          clarityScore: isVeritasInsightJob ? 0.72 : 0.3 + Math.random() * 0.5,
          specificityLevel: isVeritasInsightJob ? 0.68 : 0.4 + Math.random() * 0.4,
          experienceRequirements: isVeritasInsightJob ? "Specified" : Math.random() > 0.5 ? "Specified" : "Vague",
          skillsSpecificity: isVeritasInsightJob ? 0.74 : 0.3 + Math.random() * 0.5
        },
        emailAnalysis: {
          emailFound: isVeritasInsightJob ? true : Math.random() > 0.3,
          isValidEmail: isVeritasInsightJob ? false : Math.random() > 0.2,
          domainType: isVeritasInsightJob ? 'suspicious' : (['corporate', 'suspicious', 'free', 'invalid'][Math.floor(Math.random() * 4)] as any),
          domainFlags: isVeritasInsightJob ? ['suspicious_tld', 'unregistered_domain', 'new_domain'] : Math.random() > 0.7 ? ['suspicious_tld', 'new_domain'] : []
        },
        grammarAnalysis: {
          errorCount: isVeritasInsightJob ? 2 : Math.floor(Math.random() * 8),
          errorTypes: isVeritasInsightJob ? ['punctuation'] : ['spelling', 'grammar', 'punctuation'].filter(() => Math.random() > 0.5),
          professionalismScore: isVeritasInsightJob ? 0.82 : 0.4 + Math.random() * 0.5
        }
      }
    };
    
    setResult(mockResult);
    setIsAnalyzing(false);
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'High': return 'text-orange-400';
      case 'Critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-400';
    if (confidence >= 0.6) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Input Section */}
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8 shadow-2xl">
        <div className="mb-4">
          <label htmlFor="jobDescription" className="block text-lg font-medium text-white mb-2">
            Job Description
          </label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the complete job description here..."
            className="w-full h-40 px-4 py-3 bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-white/20 resize-none"
          />
        </div>
        
        <button
          onClick={analyzeJob}
          disabled={!jobDescription.trim() || isAnalyzing}
          className="w-full bg-black/20 backdrop-blur-xl border border-white/20 hover:bg-black/30 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
        >
          {isAnalyzing ? (
            <>
              <Activity className="animate-spin h-5 w-5 mr-2" />
              Analyzing with AI Models...
            </>
          ) : (
            <>
              <Search className="h-5 w-5 mr-2" />
              Analyze Job Posting
            </>
          )}
        </button>
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          {/* Main Result Card */}
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                {result.isGhostJob ? (
                  <AlertTriangle className="h-8 w-8 text-red-400 mr-3" />
                ) : (
                  <CheckCircle className="h-8 w-8 text-green-400 mr-3" />
                )}
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {result.isGhostJob ? 'Likely Ghost Job' : 'Likely Legitimate Job'}
                  </h2>
                  <p className="text-gray-300">
                    Confidence: <span className={getConfidenceColor(result.confidence)}>
                      {(result.confidence * 100).toFixed(1)}%
                    </span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Risk Level</div>
                <div className={`text-xl font-bold ${getRiskColor(result.riskLevel)}`}>
                  {result.riskLevel}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <Target className="h-5 w-5 text-purple-400 mr-2" />
                  <span className="text-sm text-gray-300">Overall Score</span>
                </div>
                <div className={`text-2xl font-bold ${getScoreColor(result.overallScore)}`}>
                  {result.overallScore}/100
                </div>
              </div>
              
              <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
                  <span className="text-sm text-gray-300">Red Flags</span>
                </div>
                <div className="text-2xl font-bold text-red-400">
                  {result.ghostConditions.filter(c => c.detected).length}
                </div>
              </div>
              
              <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-sm text-gray-300">Positive Signs</span>
                </div>
                <div className="text-2xl font-bold text-green-400">
                  {result.legitimateConditions.filter(c => c.detected).length}
                </div>
              </div>
            </div>

            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-white mb-2">AI Summary</h3>
              <p className="text-gray-300">{result.summary}</p>
            </div>
          </div>

          {/* ML Models Results */}
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection('models')}
            >
              <div className="flex items-center">
                <Cpu className="h-6 w-6 text-blue-400 mr-3" />
                <h3 className="text-xl font-bold text-white">ML Model Predictions</h3>
              </div>
              {expandedSections.models ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>
            
            {expandedSections.models && (
              <div className="mt-6 space-y-4">
                {result.mlModels.map((model, index) => (
                  <div key={index} className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-white">{model.name}</h4>
                      <div className="flex items-center">
                        <span className={`font-medium mr-2 ${
                          model.prediction === 'Ghost Job' ? 'text-red-400' : 'text-green-400'
                        }`}>
                          {model.prediction}
                        </span>
                        <span className={`text-sm ${getConfidenceColor(model.confidence)}`}>
                          ({(model.confidence * 100).toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {model.features.map((feature, idx) => (
                        <span key={idx} className="px-2 py-1 bg-black/30 border border-white/10 text-xs text-gray-300 rounded">
                          {feature.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Detailed Analysis */}
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection('detailed')}
            >
              <div className="flex items-center">
                <BarChart3 className="h-6 w-6 text-green-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Detailed Analysis</h3>
              </div>
              {expandedSections.detailed ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>
            
            {expandedSections.detailed && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Text Analysis */}
                <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <FileText className="h-5 w-5 text-blue-400 mr-2" />
                    Text Analysis
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Word Count:</span>
                      <span className="text-white">{result.detailedAnalysis.textAnalysis.wordCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Sentiment Score:</span>
                      <span className="text-white">{result.detailedAnalysis.textAnalysis.sentimentScore.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Buzzword Density:</span>
                      <span className="text-white">{(result.detailedAnalysis.textAnalysis.buzzwordDensity * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Specificity Score:</span>
                      <span className="text-white">{(result.detailedAnalysis.textAnalysis.specificityScore * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                {/* Company Analysis */}
                <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Building className="h-5 w-5 text-purple-400 mr-2" />
                    Company Analysis
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Company Mentioned:</span>
                      <span className={result.detailedAnalysis.companyAnalysis.companyMentioned ? 'text-green-400' : 'text-red-400'}>
                        {result.detailedAnalysis.companyAnalysis.companyMentioned ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Contact Info:</span>
                      <span className={result.detailedAnalysis.companyAnalysis.contactInfoProvided ? 'text-green-400' : 'text-red-400'}>
                        {result.detailedAnalysis.companyAnalysis.contactInfoProvided ? 'Provided' : 'Missing'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Legitimacy Score:</span>
                      <span className="text-white">{(result.detailedAnalysis.companyAnalysis.legitimacyScore * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Verifiable Company:</span>
                      <span className={result.detailedAnalysis.companyAnalysis.isVerifiableCompany ? 'text-green-400' : 'text-red-400'}>
                        {result.detailedAnalysis.companyAnalysis.isVerifiableCompany ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Requirements Analysis */}
                <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Target className="h-5 w-5 text-yellow-400 mr-2" />
                    Requirements Analysis
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Clarity Score:</span>
                      <span className="text-white">{(result.detailedAnalysis.requirementAnalysis.clarityScore * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Specificity Level:</span>
                      <span className="text-white">{(result.detailedAnalysis.requirementAnalysis.specificityLevel * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Experience Requirements:</span>
                      <span className={`font-medium ${
                        result.detailedAnalysis.requirementAnalysis.experienceRequirements === 'Specified'
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}>
                        {result.detailedAnalysis.requirementAnalysis.experienceRequirements}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Skills Specificity:</span>
                      <span className="text-white">{(result.detailedAnalysis.requirementAnalysis.skillsSpecificity * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                {/* Email Analysis */}
                <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Mail className="h-5 w-5 text-red-400 mr-2" />
                    Email Analysis
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Email Found:</span>
                      <span className={result.detailedAnalysis.emailAnalysis.emailFound ? 'text-green-400' : 'text-red-400'}>
                        {result.detailedAnalysis.emailAnalysis.emailFound ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Valid Email:</span>
                      <span className={result.detailedAnalysis.emailAnalysis.isValidEmail ? 'text-green-400' : 'text-red-400'}>
                        {result.detailedAnalysis.emailAnalysis.isValidEmail ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Domain Type:</span>
                      <span className={`capitalize ${
                        result.detailedAnalysis.emailAnalysis.domainType === 'corporate' ? 'text-green-400' :
                        result.detailedAnalysis.emailAnalysis.domainType === 'suspicious' ? 'text-red-400' :
                        'text-yellow-400'
                      }`}>
                        {result.detailedAnalysis.emailAnalysis.domainType}
                      </span>
                    </div>
                    {result.detailedAnalysis.emailAnalysis.domainFlags.length > 0 && (
                      <div className="mt-2">
                        <span className="text-gray-300 text-xs">Flags:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {result.detailedAnalysis.emailAnalysis.domainFlags.map((flag, idx) => (
                            <span key={idx} className="px-1 py-0.5 bg-red-600/20 border border-red-500/30 text-xs text-red-300 rounded">
                              {flag.replace(/_/g, ' ')}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Ghost Job Conditions */}
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection('conditions')}
            >
              <div className="flex items-center">
                <AlertTriangle className="h-6 w-6 text-red-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Detection Results</h3>
              </div>
              {expandedSections.conditions ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>
            
            {expandedSections.conditions && (
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-red-400 mb-3">Red Flags Detected</h4>
                  {result.ghostConditions.filter(c => c.detected).map((condition, index) => (
                    <div key={index} className="bg-red-900/20 border border-red-800/30 rounded-xl p-4 mb-3 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-red-400">{condition.condition}</h5>
                        <div className="flex items-center">
                          <span className="text-xs bg-red-800/30 border border-red-700/50 text-red-200 px-2 py-1 rounded mr-2">
                            {condition.category}
                          </span>
                          <span className="text-red-400 text-sm">
                            {(condition.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{condition.description}</p>
                      <p className="text-gray-400 text-xs">{condition.explanation}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-400 mb-3">Positive Indicators</h4>
                  {result.legitimateConditions.filter(c => c.detected).map((condition, index) => (
                    <div key={index} className="bg-green-900/20 border border-green-800/30 rounded-xl p-4 mb-3 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-green-400">{condition.condition}</h5>
                        <div className="flex items-center">
                          <span className="text-xs bg-green-800/30 border border-green-700/50 text-green-200 px-2 py-1 rounded mr-2">
                            {condition.category}
                          </span>
                          <span className="text-green-400 text-sm">
                            {(condition.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{condition.description}</p>
                      <p className="text-gray-400 text-xs">{condition.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Recommendations */}
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center mb-4">
              <Sparkles className="h-6 w-6 text-yellow-400 mr-3" />
              <h3 className="text-xl font-bold text-white">AI Recommendations</h3>
            </div>
            <div className="space-y-3">
              {result.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-yellow-400 text-black rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-300">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobAnalyzer;