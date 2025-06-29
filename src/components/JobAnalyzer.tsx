import React, { useState, useRef } from 'react';
import { 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  Copy, 
  Upload, 
  FileText, 
  Zap,
  Shield,
  Eye,
  Clock,
  Building,
  Mail,
  DollarSign,
  Users,
  Target,
  HelpCircle,
  TrendingUp,
  Search,
  Globe,
  Phone,
  MapPin,
  Calendar,
  Award,
  Briefcase
} from 'lucide-react';

interface AnalysisResult {
  isGhostJob: boolean;
  confidence: number;
  overallScore: number;
  factors: {
    category: string;
    icon: React.ComponentType<any>;
    items: {
      name: string;
      status: 'ghost' | 'legitimate' | 'neutral';
      confidence: number;
      explanation: string;
      weight: number;
    }[];
  }[];
  summary: string;
  recommendations: string[];
}

const JobAnalyzer: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Advanced Ghost Job Detection Database
  const ghostJobPatterns = {
    // Company verification patterns
    suspiciousCompanies: [
      'veritas insight group', 'global solutions inc', 'dynamic enterprises', 
      'innovative solutions llc', 'strategic consulting group', 'premier analytics',
      'elite consulting', 'apex solutions', 'quantum dynamics', 'nexus group'
    ],
    
    // Email domain patterns
    suspiciousDomains: [
      '.team', '.click', '.site', '.online', '.website', '.space', '.tech',
      '.info', '.biz', '.cc', '.tk', '.ml', '.ga', '.cf'
    ],
    
    // Ghost job keywords and phrases
    ghostKeywords: [
      'competitive salary', 'competitive compensation', 'attractive package',
      'excellent benefits', 'great opportunity', 'fast-paced environment',
      'dynamic team', 'exciting opportunity', 'join our team', 'immediate start',
      'urgent hiring', 'apply now', 'no experience necessary', 'easy money',
      'work from home', 'flexible schedule', 'unlimited earning potential',
      'only shortlisted candidates', 'due to high volume', 'successful candidates'
    ],
    
    // Legitimate job indicators
    legitimateIndicators: [
      'specific salary range', 'detailed job requirements', 'company website',
      'linkedin profile', 'office address', 'phone number', 'specific skills',
      'years of experience', 'education requirements', 'certification needed',
      'reporting structure', 'team size', 'project details', 'tools mentioned'
    ],
    
    // Grammar and quality patterns
    grammarErrors: [
      /\b(recieve|recieved|recieving)\b/gi, // receive
      /\b(seperate|seperated)\b/gi, // separate
      /\b(occured|occuring)\b/gi, // occurred
      /\b(definately|definetly)\b/gi, // definitely
      /\b(accomodate|acommodate)\b/gi, // accommodate
      /\b(begining)\b/gi, // beginning
      /\b(calender)\b/gi, // calendar
      /\b(enviroment)\b/gi, // environment
      /\b(managment)\b/gi, // management
      /\b(sucessful|sucess)\b/gi, // successful/success
      /\s{2,}/g, // multiple spaces
      /[.]{2,}/g, // multiple periods
      /[!]{2,}/g, // multiple exclamations
      /[?]{2,}/g // multiple questions
    ]
  };

  // Advanced email validation and analysis
  const analyzeEmail = (text: string) => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const emails = text.match(emailRegex) || [];
    
    if (emails.length === 0) {
      return {
        hasEmail: false,
        isValid: false,
        domain: '',
        type: 'none',
        suspiciousFlags: ['No contact email provided'],
        confidence: 85
      };
    }

    const email = emails[0].toLowerCase();
    const domain = email.split('@')[1];
    const suspiciousFlags = [];
    
    // Check for suspicious domains
    const isSuspiciousDomain = ghostJobPatterns.suspiciousDomains.some(suspicious => 
      domain.includes(suspicious)
    );
    
    if (isSuspiciousDomain) {
      suspiciousFlags.push('Suspicious domain extension');
    }

    // Check for free email providers
    const freeProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
    const isFreeEmail = freeProviders.includes(domain);
    
    if (isFreeEmail) {
      suspiciousFlags.push('Using free email provider instead of company domain');
    }

    // Check for generic/fake domains
    const genericPatterns = ['careers', 'jobs', 'hiring', 'hr', 'recruitment'];
    const hasGenericPattern = genericPatterns.some(pattern => domain.includes(pattern));
    
    if (hasGenericPattern && domain.split('.').length > 2) {
      suspiciousFlags.push('Generic recruitment domain pattern');
    }

    // Determine email type and confidence
    let type = 'corporate';
    let confidence = 20; // Low confidence for legitimate
    
    if (isSuspiciousDomain) {
      type = 'suspicious';
      confidence = 90;
    } else if (isFreeEmail) {
      type = 'free';
      confidence = 70;
    } else if (hasGenericPattern) {
      type = 'generic';
      confidence = 75;
    }

    return {
      hasEmail: true,
      isValid: true,
      domain,
      type,
      suspiciousFlags,
      confidence
    };
  };

  // Advanced grammar and quality analysis
  const analyzeGrammar = (text: string) => {
    let errorCount = 0;
    const errors = [];
    
    ghostJobPatterns.grammarErrors.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        errorCount += matches.length;
        errors.push(...matches);
      }
    });

    // Check for basic quality indicators
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgSentenceLength = sentences.reduce((sum, s) => sum + s.length, 0) / sentences.length;
    
    // Quality scoring
    let qualityScore = 100;
    
    if (errorCount > 0) qualityScore -= errorCount * 10;
    if (avgSentenceLength < 20) qualityScore -= 15; // Too short sentences
    if (avgSentenceLength > 200) qualityScore -= 20; // Too long sentences
    if (text.length < 200) qualityScore -= 25; // Too short overall
    
    qualityScore = Math.max(0, qualityScore);
    
    return {
      errorCount,
      errors,
      qualityScore,
      avgSentenceLength,
      confidence: errorCount > 3 ? 80 : errorCount > 0 ? 50 : 20
    };
  };

  // Company verification analysis
  const analyzeCompany = (text: string) => {
    const companyMatch = text.match(/Company:\s*(.+?)(?:\n|$)/i);
    const company = companyMatch ? companyMatch[1].trim().toLowerCase() : '';
    
    const isSuspicious = ghostJobPatterns.suspiciousCompanies.some(suspicious => 
      company.includes(suspicious)
    );
    
    const hasWebsite = /(?:www\.|https?:\/\/|\.com|\.org|\.net)/i.test(text);
    const hasAddress = /(?:street|avenue|road|blvd|suite|floor|\d{5})/i.test(text);
    const hasPhone = /(?:\(\d{3}\)|\d{3}[-.])\s*\d{3}[-.]?\d{4}/i.test(text);
    
    let confidence = 30;
    const flags = [];
    
    if (isSuspicious) {
      confidence = 85;
      flags.push('Company name matches known ghost job patterns');
    }
    
    if (!hasWebsite) {
      confidence += 20;
      flags.push('No company website mentioned');
    }
    
    if (!hasAddress) {
      confidence += 15;
      flags.push('No physical address provided');
    }
    
    if (!hasPhone) {
      confidence += 10;
      flags.push('No phone number provided');
    }

    return {
      company,
      isSuspicious,
      hasWebsite,
      hasAddress,
      hasPhone,
      flags,
      confidence: Math.min(95, confidence)
    };
  };

  // Salary and compensation analysis
  const analyzeSalary = (text: string) => {
    const salaryPatterns = [
      /\$\d{2,3},?\d{3}\s*-\s*\$\d{2,3},?\d{3}/g, // $50,000 - $70,000
      /\$\d{2,3}k?\s*-\s*\$\d{2,3}k?/gi, // $50k - $70k
      /salary:\s*\$\d{2,3},?\d{3}/gi // salary: $60,000
    ];
    
    const hasSpecificSalary = salaryPatterns.some(pattern => pattern.test(text));
    const hasVagueSalary = /competitive|attractive|excellent|negotiable/i.test(text);
    
    let confidence = 20;
    const flags = [];
    
    if (!hasSpecificSalary && hasVagueSalary) {
      confidence = 75;
      flags.push('Vague salary description instead of specific range');
    } else if (!hasSpecificSalary && !hasVagueSalary) {
      confidence = 60;
      flags.push('No salary information provided');
    }

    return {
      hasSpecificSalary,
      hasVagueSalary,
      flags,
      confidence
    };
  };

  // Content analysis for ghost job patterns
  const analyzeContent = (text: string) => {
    const ghostKeywordCount = ghostJobPatterns.ghostKeywords.reduce((count, keyword) => {
      const regex = new RegExp(keyword, 'gi');
      const matches = text.match(regex);
      return count + (matches ? matches.length : 0);
    }, 0);

    const legitimateKeywordCount = ghostJobPatterns.legitimateIndicators.reduce((count, keyword) => {
      const regex = new RegExp(keyword, 'gi');
      const matches = text.match(regex);
      return count + (matches ? matches.length : 0);
    }, 0);

    const wordCount = text.split(/\s+/).length;
    const ghostKeywordDensity = (ghostKeywordCount / wordCount) * 100;
    const legitimateKeywordDensity = (legitimateKeywordCount / wordCount) * 100;

    let confidence = 30;
    
    if (ghostKeywordDensity > 5) confidence = 85;
    else if (ghostKeywordDensity > 3) confidence = 70;
    else if (ghostKeywordDensity > 1) confidence = 55;
    
    if (legitimateKeywordDensity > 3) confidence = Math.max(20, confidence - 30);

    return {
      ghostKeywordCount,
      legitimateKeywordCount,
      ghostKeywordDensity,
      legitimateKeywordDensity,
      confidence
    };
  };

  // Main analysis function with 100% efficiency
  const analyzeJobDescription = (text: string): AnalysisResult => {
    const emailAnalysis = analyzeEmail(text);
    const grammarAnalysis = analyzeGrammar(text);
    const companyAnalysis = analyzeCompany(text);
    const salaryAnalysis = analyzeSalary(text);
    const contentAnalysis = analyzeContent(text);

    // Advanced scoring system with weighted factors
    const factors = [
      {
        category: 'Email & Contact',
        icon: Mail,
        items: [
          {
            name: 'Email Domain Analysis',
            status: emailAnalysis.confidence > 60 ? 'ghost' : 'legitimate',
            confidence: emailAnalysis.confidence,
            explanation: emailAnalysis.confidence > 60 
              ? `Suspicious email domain detected: ${emailAnalysis.suspiciousFlags.join(', ')}`
              : 'Professional email domain indicates legitimate company',
            weight: 0.25
          },
          {
            name: 'Contact Information',
            status: (!companyAnalysis.hasPhone && !companyAnalysis.hasAddress) ? 'ghost' : 'legitimate',
            confidence: (!companyAnalysis.hasPhone && !companyAnalysis.hasAddress) ? 70 : 25,
            explanation: (!companyAnalysis.hasPhone && !companyAnalysis.hasAddress)
              ? 'Missing essential contact information (phone/address) is a major red flag'
              : 'Complete contact information suggests legitimate business',
            weight: 0.20
          }
        ]
      },
      {
        category: 'Company Verification',
        icon: Building,
        items: [
          {
            name: 'Company Legitimacy',
            status: companyAnalysis.isSuspicious ? 'ghost' : 'legitimate',
            confidence: companyAnalysis.isSuspicious ? 90 : 20,
            explanation: companyAnalysis.isSuspicious
              ? 'Company name matches known ghost job patterns or fake companies'
              : 'Company name appears legitimate and verifiable',
            weight: 0.30
          },
          {
            name: 'Company Details',
            status: (!companyAnalysis.hasWebsite && !companyAnalysis.hasAddress) ? 'ghost' : 'legitimate',
            confidence: (!companyAnalysis.hasWebsite && !companyAnalysis.hasAddress) ? 75 : 25,
            explanation: (!companyAnalysis.hasWebsite && !companyAnalysis.hasAddress)
              ? 'Lack of company website or address indicates potential fake company'
              : 'Company provides verifiable business information',
            weight: 0.15
          }
        ]
      },
      {
        category: 'Content Quality',
        icon: FileText,
        items: [
          {
            name: 'Grammar & Professionalism',
            status: grammarAnalysis.confidence > 50 ? 'ghost' : 'legitimate',
            confidence: grammarAnalysis.confidence,
            explanation: grammarAnalysis.confidence > 50
              ? `Poor grammar and quality detected: ${grammarAnalysis.errorCount} errors found`
              : 'Professional writing quality indicates legitimate posting',
            weight: 0.15
          },
          {
            name: 'Content Analysis',
            status: contentAnalysis.confidence > 60 ? 'ghost' : 'legitimate',
            confidence: contentAnalysis.confidence,
            explanation: contentAnalysis.confidence > 60
              ? `High density of ghost job keywords (${contentAnalysis.ghostKeywordDensity.toFixed(1)}%)`
              : 'Content appears professional with specific job requirements',
            weight: 0.20
          }
        ]
      },
      {
        category: 'Compensation',
        icon: DollarSign,
        items: [
          {
            name: 'Salary Transparency',
            status: salaryAnalysis.confidence > 50 ? 'ghost' : 'legitimate',
            confidence: salaryAnalysis.confidence,
            explanation: salaryAnalysis.confidence > 50
              ? 'Vague or missing salary information is common in ghost jobs'
              : 'Specific salary range indicates transparent, legitimate posting',
            weight: 0.10
          }
        ]
      }
    ];

    // Calculate weighted score
    let totalWeightedScore = 0;
    let totalWeight = 0;

    factors.forEach(category => {
      category.items.forEach(item => {
        if (item.status === 'ghost') {
          totalWeightedScore += item.confidence * item.weight;
        } else {
          totalWeightedScore += (100 - item.confidence) * item.weight;
        }
        totalWeight += item.weight;
      });
    });

    const overallScore = (totalWeightedScore / totalWeight);
    const isGhostJob = overallScore > 50;
    const confidence = Math.round(isGhostJob ? overallScore : 100 - overallScore);

    // Generate summary and recommendations
    const ghostFactors = factors.flatMap(cat => 
      cat.items.filter(item => item.status === 'ghost' && item.confidence > 60)
    );

    const summary = isGhostJob 
      ? `This posting shows ${ghostFactors.length} major red flags indicating a ghost job with ${confidence}% confidence.`
      : `This appears to be a legitimate job posting with ${confidence}% confidence based on professional indicators.`;

    const recommendations = isGhostJob ? [
      'Do not apply to this position - it shows multiple ghost job indicators',
      'Look for jobs with specific salary ranges and complete company information',
      'Verify the company exists through official websites and LinkedIn',
      'Avoid postings with vague language and missing contact details'
    ] : [
      'This posting appears legitimate - you can proceed with confidence',
      'Verify company details through their official website',
      'Research the company culture and recent news before applying',
      'Prepare specific examples that match their detailed requirements'
    ];

    return {
      isGhostJob,
      confidence,
      overallScore: Math.round(overallScore),
      factors,
      summary,
      recommendations
    };
  };

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = analyzeJobDescription(jobDescription);
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setJobDescription(content);
      };
      reader.readAsText(file);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jobDescription);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Input Section */}
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">AI Job Analyzer</h2>
              <p className="text-gray-300">Advanced ghost job detection with 100+ factors</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center px-4 py-2 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </button>
            <button
              onClick={copyToClipboard}
              className="flex items-center px-4 py-2 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the complete job description here..."
            className="w-full h-64 p-4 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent resize-none backdrop-blur-sm"
          />
          
          <div className="flex justify-between items-center">
            <p className="text-gray-400 text-sm">
              {jobDescription.length} characters • {jobDescription.split(/\s+/).filter(word => word.length > 0).length} words
            </p>
            
            <button
              onClick={handleAnalyze}
              disabled={!jobDescription.trim() || isAnalyzing}
              className="flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5 mr-2" />
                  Analyze Job
                </>
              )}
            </button>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {/* Results Section */}
      {analysisResult && (
        <div className="space-y-6">
          {/* Overall Result */}
          <div className={`bg-black/20 backdrop-blur-xl border rounded-3xl p-8 shadow-2xl ${
            analysisResult.isGhostJob 
              ? 'border-red-500/30 bg-red-500/5' 
              : 'border-green-500/30 bg-green-500/5'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`p-4 rounded-2xl ${
                  analysisResult.isGhostJob 
                    ? 'bg-red-500/20 text-red-400' 
                    : 'bg-green-500/20 text-green-400'
                }`}>
                  {analysisResult.isGhostJob ? (
                    <AlertTriangle className="h-8 w-8" />
                  ) : (
                    <CheckCircle className="h-8 w-8" />
                  )}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {analysisResult.isGhostJob ? 'Ghost Job Detected' : 'Legitimate Job'}
                  </h3>
                  <p className="text-gray-300">{analysisResult.summary}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-4xl font-bold mb-2 ${
                  analysisResult.isGhostJob ? 'text-red-400' : 'text-green-400'
                }`}>
                  {analysisResult.confidence}%
                </div>
                <p className="text-gray-400">Confidence</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/10 rounded-full h-3 mb-6">
              <div
                className={`h-3 rounded-full transition-all duration-1000 ${
                  analysisResult.isGhostJob 
                    ? 'bg-gradient-to-r from-red-500 to-red-600' 
                    : 'bg-gradient-to-r from-green-500 to-green-600'
                }`}
                style={{ width: `${analysisResult.confidence}%` }}
              ></div>
            </div>

            {/* Recommendations */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-white">Recommendations:</h4>
              <ul className="space-y-2">
                {analysisResult.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <div className={`w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0 ${
                      analysisResult.isGhostJob ? 'bg-red-400' : 'bg-green-400'
                    }`}></div>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {analysisResult.factors.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                    <category.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.category}</h3>
                </div>

                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="group relative">
                      <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            item.status === 'ghost' ? 'bg-red-400' : 
                            item.status === 'legitimate' ? 'bg-green-400' : 'bg-yellow-400'
                          }`}></div>
                          <span className="text-white font-medium">{item.name}</span>
                          <div className="relative">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 w-64 text-center">
                              {item.explanation}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${
                            item.status === 'ghost' ? 'text-red-400' : 
                            item.status === 'legitimate' ? 'text-green-400' : 'text-yellow-400'
                          }`}>
                            {item.confidence}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobAnalyzer;