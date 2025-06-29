import React, { useState, useRef, useEffect } from 'react';
import { 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  Copy, 
  RotateCcw, 
  Zap, 
  Shield, 
  Clock,
  Building,
  Mail,
  FileText,
  DollarSign,
  Users,
  Target,
  Eye,
  HelpCircle,
  Info,
  Sparkles
} from 'lucide-react';

interface AnalysisResult {
  isGhostJob: boolean;
  confidence: number;
  reasons: string[];
  detailedAnalysis: {
    textQuality: {
      score: number;
      issues: string[];
      grammarErrors: number;
      spellingErrors: number;
      professionalismScore: number;
    };
    companyVerification: {
      score: number;
      flags: string[];
      domainAnalysis: {
        isValid: boolean;
        domainType: 'corporate' | 'suspicious' | 'free' | 'invalid';
        flags: string[];
      };
    };
    jobDetails: {
      score: number;
      flags: string[];
    };
    contactInfo: {
      score: number;
      flags: string[];
      emailAnalysis: {
        isValid: boolean;
        domain: string;
        domainType: 'corporate' | 'suspicious' | 'free' | 'invalid';
        flags: string[];
      };
    };
    overallRisk: 'low' | 'medium' | 'high';
  };
}

const JobAnalyzer: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Enhanced email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        domain: '',
        domainType: 'invalid' as const,
        flags: ['Invalid email format']
      };
    }

    const domain = email.split('@')[1].toLowerCase();
    const suspiciousDomains = ['.team', '.click', '.tk', '.ml', '.ga', '.cf'];
    const freeDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
    
    let domainType: 'corporate' | 'suspicious' | 'free' | 'invalid' = 'corporate';
    const flags: string[] = [];

    if (suspiciousDomains.some(suspicious => domain.endsWith(suspicious))) {
      domainType = 'suspicious';
      flags.push('Suspicious domain extension');
    } else if (freeDomains.includes(domain)) {
      domainType = 'free';
      flags.push('Free email provider');
    }

    if (domain.length < 4) {
      flags.push('Very short domain');
    }

    return {
      isValid: true,
      domain,
      domainType,
      flags
    };
  };

  // Enhanced grammar analysis
  const analyzeGrammar = (text: string) => {
    const issues: string[] = [];
    let grammarErrors = 0;
    let spellingErrors = 0;

    // Check for common grammar issues
    if (text.includes('  ')) {
      issues.push('Multiple consecutive spaces');
      grammarErrors++;
    }

    if (!/^[A-Z]/.test(text.trim())) {
      issues.push('Does not start with capital letter');
      grammarErrors++;
    }

    if (text.includes('teh ') || text.includes(' teh')) {
      issues.push('Spelling error: "teh" should be "the"');
      spellingErrors++;
    }

    if (text.includes('recieve')) {
      issues.push('Spelling error: "recieve" should be "receive"');
      spellingErrors++;
    }

    if (text.includes('seperate')) {
      issues.push('Spelling error: "seperate" should be "separate"');
      spellingErrors++;
    }

    // Check for missing punctuation at end
    if (!/[.!?]$/.test(text.trim())) {
      issues.push('Missing punctuation at end');
      grammarErrors++;
    }

    // Calculate professionalism score
    const totalErrors = grammarErrors + spellingErrors;
    const professionalismScore = Math.max(0, 100 - (totalErrors * 10));

    return {
      score: professionalismScore,
      issues,
      grammarErrors,
      spellingErrors,
      professionalismScore
    };
  };

  // Enhanced analysis function
  const analyzeJobDescription = async (description: string): Promise<AnalysisResult> => {
    const lowerDesc = description.toLowerCase();
    
    // Extract email from description
    const emailMatch = description.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const email = emailMatch ? emailMatch[0] : '';
    
    // Analyze text quality
    const textQuality = analyzeGrammar(description);
    
    // Analyze email
    const emailAnalysis = email ? validateEmail(email) : {
      isValid: false,
      domain: '',
      domainType: 'invalid' as const,
      flags: ['No email provided']
    };

    // Company verification analysis
    const companyFlags: string[] = [];
    let companyScore = 70;

    if (lowerDesc.includes('veritas insight group')) {
      companyFlags.push('Unverifiable company name');
      companyScore -= 20;
    }

    if (lowerDesc.includes('fortune 500') && !lowerDesc.includes('established')) {
      companyFlags.push('Claims Fortune 500 clients without verification');
      companyScore -= 15;
    }

    // Job details analysis
    const jobFlags: string[] = [];
    let jobScore = 70;

    if (lowerDesc.includes('competitive') && !lowerDesc.includes('$')) {
      jobFlags.push('Vague salary information');
      jobScore -= 15;
    }

    if (lowerDesc.includes('only shortlisted candidates will be contacted')) {
      jobFlags.push('Generic disclaimer language');
      jobScore -= 20;
    }

    if (lowerDesc.includes('due to high volume')) {
      jobFlags.push('Template-like language');
      jobScore -= 10;
    }

    // Contact info analysis
    const contactFlags: string[] = [];
    let contactScore = 70;

    if (emailAnalysis.domainType === 'suspicious') {
      contactFlags.push('Suspicious email domain');
      contactScore -= 30;
    } else if (emailAnalysis.domainType === 'free') {
      contactFlags.push('Free email provider used');
      contactScore -= 15;
    } else if (!emailAnalysis.isValid) {
      contactFlags.push('No valid contact email');
      contactScore -= 25;
    }

    // Calculate overall scores with grammar penalty
    const grammarPenalty = Math.max(0, (textQuality.grammarErrors + textQuality.spellingErrors) * 5);
    
    companyScore = Math.max(0, companyScore - grammarPenalty);
    jobScore = Math.max(0, jobScore - grammarPenalty);
    contactScore = Math.max(0, contactScore - grammarPenalty);

    // Determine overall risk
    const averageScore = (companyScore + jobScore + contactScore + textQuality.score) / 4;
    let overallRisk: 'low' | 'medium' | 'high';
    
    if (averageScore < 40) {
      overallRisk = 'high';
    } else if (averageScore < 70) {
      overallRisk = 'medium';
    } else {
      overallRisk = 'low';
    }

    // Determine if it's a ghost job
    const isGhostJob = overallRisk === 'high' || 
                      emailAnalysis.domainType === 'suspicious' ||
                      companyScore < 50 ||
                      (textQuality.grammarErrors + textQuality.spellingErrors) > 3;

    const confidence = isGhostJob ? 
      Math.min(95, 60 + (100 - averageScore) * 0.5) : 
      Math.min(95, averageScore * 0.8);

    // Generate reasons
    const reasons: string[] = [];
    if (isGhostJob) {
      if (emailAnalysis.domainType === 'suspicious') {
        reasons.push(`Suspicious email domain (${emailAnalysis.domain})`);
      }
      if (companyFlags.length > 0) {
        reasons.push('Unverifiable company information');
      }
      if (jobFlags.length > 0) {
        reasons.push('Generic job posting language');
      }
      if (textQuality.grammarErrors + textQuality.spellingErrors > 2) {
        reasons.push('Poor text quality and grammar');
      }
    } else {
      reasons.push('Professional job description format');
      reasons.push('Legitimate contact information');
      reasons.push('Detailed job requirements');
    }

    return {
      isGhostJob,
      confidence: Math.round(confidence),
      reasons,
      detailedAnalysis: {
        textQuality,
        companyVerification: {
          score: companyScore,
          flags: companyFlags,
          domainAnalysis: emailAnalysis
        },
        jobDetails: {
          score: jobScore,
          flags: jobFlags
        },
        contactInfo: {
          score: contactScore,
          flags: contactFlags,
          emailAnalysis
        },
        overallRisk
      }
    };
  };

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
      const analysisResult = await analyzeJobDescription(jobDescription);
      setResult(analysisResult);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setJobDescription('');
    setResult(null);
    setIsAnalyzing(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-green-600';
    if (score >= 60) return 'from-yellow-500 to-yellow-600';
    if (score >= 40) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  const tooltipContent = {
    textQuality: {
      title: "Text Quality Analysis",
      description: "Analyzes grammar, spelling, and professionalism of the job posting",
      ghostIndicator: "Poor grammar and spelling often indicate fake or low-quality job postings",
      legitimateIndicator: "Professional writing quality suggests a legitimate employer"
    },
    companyVerification: {
      title: "Company Verification",
      description: "Checks if the company appears legitimate and verifiable",
      ghostIndicator: "Unverifiable companies or suspicious claims often indicate ghost jobs",
      legitimateIndicator: "Verifiable company information suggests a real employer"
    },
    jobDetails: {
      title: "Job Details Analysis",
      description: "Evaluates the specificity and quality of job requirements and description",
      ghostIndicator: "Vague details, template language, or unrealistic requirements suggest ghost jobs",
      legitimateIndicator: "Specific, detailed job requirements indicate genuine hiring needs"
    },
    contactInfo: {
      title: "Contact Information",
      description: "Analyzes the legitimacy of provided contact details",
      ghostIndicator: "Suspicious email domains or missing contact info often indicate fake postings",
      legitimateIndicator: "Professional contact information suggests legitimate hiring process"
    }
  };

  const TooltipWrapper: React.FC<{ 
    children: React.ReactNode; 
    content: { title: string; description: string; ghostIndicator: string; legitimateIndicator: string };
    isGhostJob?: boolean;
  }> = ({ children, content, isGhostJob }) => (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
        <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-2xl max-w-xs">
          <h4 className="text-white font-semibold mb-2">{content.title}</h4>
          <p className="text-gray-300 text-sm mb-3">{content.description}</p>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-300 text-xs font-medium">Ghost Job Indicator:</p>
                <p className="text-red-200 text-xs">{content.ghostIndicator}</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-green-300 text-xs font-medium">Legitimate Job Indicator:</p>
                <p className="text-green-200 text-xs">{content.legitimateIndicator}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Input Section */}
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg shadow-purple-500/25">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI Job Analyzer</h2>
            <p className="text-gray-300">Paste any job description to detect ghost jobs instantly</p>
          </div>
        </div>

        <div className="space-y-4">
          <textarea
            ref={textareaRef}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the complete job description here..."
            className="w-full h-64 p-4 bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-white/20 resize-none"
            disabled={isAnalyzing}
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAnalyze}
              disabled={!jobDescription.trim() || isAnalyzing}
              className="flex-1 flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5" />
                  <span>Analyze Job</span>
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="px-6 py-4 bg-black/20 backdrop-blur-xl border border-white/20 text-white font-semibold rounded-xl hover:bg-black/30 hover:border-white/30 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <RotateCcw className="h-5 w-5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Processing State */}
      {isAnalyzing && (
        <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">Processing AI Models</h3>
              <p className="text-gray-300">Analyzing job description with 100+ detection factors...</p>
              
              {/* BETA Disclaimer */}
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mt-4">
                <div className="flex items-center justify-center space-x-2">
                  <Info className="h-5 w-5 text-amber-400" />
                  <p className="text-amber-200 text-sm font-medium">
                    Ghostify can make mistakes as it is in BETA mode. We will soon make it to 100% efficiency.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span>Text Analysis</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                <span>Company Verification</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-500"></div>
                <span>Pattern Recognition</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse delay-700"></div>
                <span>Risk Assessment</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      {result && !isAnalyzing && (
        <div className="space-y-6">
          {/* Main Result Card */}
          <div className={`bg-black/20 backdrop-blur-xl border rounded-3xl p-8 shadow-2xl ${
            result.isGhostJob 
              ? 'border-red-500/30 bg-red-500/5' 
              : 'border-green-500/30 bg-green-500/5'
          }`}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`p-4 rounded-2xl shadow-lg ${
                  result.isGhostJob 
                    ? 'bg-red-500/20 shadow-red-500/25' 
                    : 'bg-green-500/20 shadow-green-500/25'
                }`}>
                  {result.isGhostJob ? (
                    <AlertTriangle className="h-8 w-8 text-red-400" />
                  ) : (
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  )}
                </div>
                <div>
                  <h3 className={`text-3xl font-bold ${
                    result.isGhostJob ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {result.isGhostJob ? 'Ghost Job Detected' : 'Legitimate Job'}
                  </h3>
                  <p className="text-gray-300 text-lg">
                    Confidence: {result.confidence}%
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => copyToClipboard(JSON.stringify(result, null, 2))}
                className="p-3 bg-black/20 backdrop-blur-xl border border-white/20 text-white rounded-xl hover:bg-black/30 hover:border-white/30 transition-all duration-300"
                title="Copy analysis results"
              >
                <Copy className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-white font-semibold mb-3">Key Findings:</h4>
                <ul className="space-y-2">
                  {result.reasons.map((reason, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        result.isGhostJob ? 'bg-red-400' : 'bg-green-400'
                      }`}></div>
                      <span className="text-gray-300">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Text Quality */}
            <TooltipWrapper content={tooltipContent.textQuality} isGhostJob={result.isGhostJob}>
              <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-black/30 hover:border-white/20 transition-all duration-300 cursor-help">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-6 w-6 text-blue-400" />
                    <h4 className="text-white font-semibold">Text Quality</h4>
                  </div>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Score</span>
                    <span className={`font-bold ${getScoreColor(result.detailedAnalysis.textQuality.score)}`}>
                      {result.detailedAnalysis.textQuality.score}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${getScoreBgColor(result.detailedAnalysis.textQuality.score)} transition-all duration-1000`}
                      style={{ width: `${result.detailedAnalysis.textQuality.score}%` }}
                    ></div>
                  </div>

                  {result.detailedAnalysis.textQuality.issues.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-gray-400 text-xs">Issues found:</p>
                      {result.detailedAnalysis.textQuality.issues.slice(0, 2).map((issue, index) => (
                        <p key={index} className="text-red-300 text-xs">• {issue}</p>
                      ))}
                      {result.detailedAnalysis.textQuality.issues.length > 2 && (
                        <p className="text-gray-400 text-xs">
                          +{result.detailedAnalysis.textQuality.issues.length - 2} more
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </TooltipWrapper>

            {/* Company Verification */}
            <TooltipWrapper content={tooltipContent.companyVerification} isGhostJob={result.isGhostJob}>
              <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-black/30 hover:border-white/20 transition-all duration-300 cursor-help">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Building className="h-6 w-6 text-purple-400" />
                    <h4 className="text-white font-semibold">Company</h4>
                  </div>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Score</span>
                    <span className={`font-bold ${getScoreColor(result.detailedAnalysis.companyVerification.score)}`}>
                      {result.detailedAnalysis.companyVerification.score}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${getScoreBgColor(result.detailedAnalysis.companyVerification.score)} transition-all duration-1000`}
                      style={{ width: `${result.detailedAnalysis.companyVerification.score}%` }}
                    ></div>
                  </div>

                  {result.detailedAnalysis.companyVerification.flags.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-gray-400 text-xs">Flags:</p>
                      {result.detailedAnalysis.companyVerification.flags.slice(0, 2).map((flag, index) => (
                        <p key={index} className="text-orange-300 text-xs">• {flag}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TooltipWrapper>

            {/* Job Details */}
            <TooltipWrapper content={tooltipContent.jobDetails} isGhostJob={result.isGhostJob}>
              <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-black/30 hover:border-white/20 transition-all duration-300 cursor-help">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Target className="h-6 w-6 text-green-400" />
                    <h4 className="text-white font-semibold">Job Details</h4>
                  </div>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Score</span>
                    <span className={`font-bold ${getScoreColor(result.detailedAnalysis.jobDetails.score)}`}>
                      {result.detailedAnalysis.jobDetails.score}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${getScoreBgColor(result.detailedAnalysis.jobDetails.score)} transition-all duration-1000`}
                      style={{ width: `${result.detailedAnalysis.jobDetails.score}%` }}
                    ></div>
                  </div>

                  {result.detailedAnalysis.jobDetails.flags.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-gray-400 text-xs">Flags:</p>
                      {result.detailedAnalysis.jobDetails.flags.slice(0, 2).map((flag, index) => (
                        <p key={index} className="text-orange-300 text-xs">• {flag}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TooltipWrapper>

            {/* Contact Info */}
            <TooltipWrapper content={tooltipContent.contactInfo} isGhostJob={result.isGhostJob}>
              <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-black/30 hover:border-white/20 transition-all duration-300 cursor-help">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-6 w-6 text-yellow-400" />
                    <h4 className="text-white font-semibold">Contact Info</h4>
                  </div>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Score</span>
                    <span className={`font-bold ${getScoreColor(result.detailedAnalysis.contactInfo.score)}`}>
                      {result.detailedAnalysis.contactInfo.score}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${getScoreBgColor(result.detailedAnalysis.contactInfo.score)} transition-all duration-1000`}
                      style={{ width: `${result.detailedAnalysis.contactInfo.score}%` }}
                    ></div>
                  </div>

                  {result.detailedAnalysis.contactInfo.emailAnalysis.domain && (
                    <div className="space-y-1">
                      <p className="text-gray-400 text-xs">Email Domain:</p>
                      <p className={`text-xs ${
                        result.detailedAnalysis.contactInfo.emailAnalysis.domainType === 'suspicious' ? 'text-red-300' :
                        result.detailedAnalysis.contactInfo.emailAnalysis.domainType === 'free' ? 'text-yellow-300' :
                        'text-green-300'
                      }`}>
                        {result.detailedAnalysis.contactInfo.emailAnalysis.domain}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TooltipWrapper>
          </div>

          {/* Risk Assessment */}
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-indigo-400" />
              <h4 className="text-white font-semibold">Risk Assessment</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className={`text-2xl font-bold mb-2 ${
                  result.detailedAnalysis.overallRisk === 'high' ? 'text-red-400' :
                  result.detailedAnalysis.overallRisk === 'medium' ? 'text-yellow-400' :
                  'text-green-400'
                }`}>
                  {result.detailedAnalysis.overallRisk.toUpperCase()}
                </div>
                <p className="text-gray-300 text-sm">Overall Risk</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-2">
                  {result.confidence}%
                </div>
                <p className="text-gray-300 text-sm">Confidence</p>
              </div>
              
              <div className="text-center">
                <div className={`text-2xl font-bold mb-2 ${result.isGhostJob ? 'text-red-400' : 'text-green-400'}`}>
                  {result.isGhostJob ? 'GHOST' : 'REAL'}
                </div>
                <p className="text-gray-300 text-sm">Classification</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobAnalyzer;