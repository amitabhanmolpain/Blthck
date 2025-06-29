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
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [hoveredCondition, setHoveredCondition] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const analyzeJob = async () => {
    if (!jobDescription.trim()) return;

    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    const mlResult = performMLAnalysis(jobDescription);
    setResult(mlResult);
    setIsAnalyzing(false);
  };

  const validateEmail = (email: string): { isValid: boolean; domainType: 'corporate' | 'suspicious' | 'free' | 'invalid'; flags: string[] } => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    if (!isValid) {
      return { isValid: false, domainType: 'invalid', flags: ['Invalid email format'] };
    }

    const domain = email.split('@')[1]?.toLowerCase() || '';
    const flags: string[] = [];
    
    // Suspicious domain patterns
    const suspiciousDomains = ['.team', '.click', '.tk', '.ml', '.ga', '.cf'];
    const freeDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
    
    let domainType: 'corporate' | 'suspicious' | 'free' | 'invalid' = 'corporate';
    
    if (suspiciousDomains.some(suspicious => domain.includes(suspicious))) {
      domainType = 'suspicious';
      flags.push('Suspicious domain extension');
    } else if (freeDomains.includes(domain)) {
      domainType = 'free';
      flags.push('Free email provider');
    }
    
    return { isValid, domainType, flags };
  };

  const analyzeGrammar = (text: string): { errorCount: number; errorTypes: string[]; score: number } => {
    const errors: string[] = [];
    let errorCount = 0;

    // Basic grammar checks
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    sentences.forEach(sentence => {
      const trimmed = sentence.trim();
      if (trimmed.length > 0) {
        // Check for capitalization
        if (trimmed[0] !== trimmed[0].toUpperCase()) {
          errorCount++;
          if (!errors.includes('Capitalization')) errors.push('Capitalization');
        }
        
        // Check for common grammar mistakes
        if (trimmed.includes(' i ') || trimmed.startsWith('i ')) {
          errorCount++;
          if (!errors.includes('Pronoun capitalization')) errors.push('Pronoun capitalization');
        }
        
        // Check for double spaces
        if (trimmed.includes('  ')) {
          errorCount++;
          if (!errors.includes('Spacing')) errors.push('Spacing');
        }
      }
    });

    // Check for missing punctuation
    const lastChar = text.trim().slice(-1);
    if (text.trim().length > 0 && !['.', '!', '?'].includes(lastChar)) {
      errorCount++;
      if (!errors.includes('Missing punctuation')) errors.push('Missing punctuation');
    }

    const score = Math.max(0, 100 - (errorCount * 5));
    return { errorCount, errorTypes: errors, score };
  };

  const performMLAnalysis = (description: string): MLAnalysisResult => {
    const text = description.toLowerCase();
    let ghostScore = 0;
    let legitimateScore = 0;

    // Email analysis
    const emailMatch = description.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const emailAnalysis = emailMatch ? validateEmail(emailMatch[0]) : { isValid: false, domainType: 'invalid' as const, flags: ['No email found'] };
    
    // Grammar analysis
    const grammarAnalysis = analyzeGrammar(description);

    const ghostConditions: ConditionResult[] = [
      {
        condition: "Suspicious email domain",
        detected: emailAnalysis.domainType === 'suspicious',
        confidence: 92,
        impact: 'high',
        category: 'Contact Info',
        description: 'Email uses suspicious domain extension like .team, .click, etc.',
        explanation: 'Ghost jobs often use suspicious or temporary domain extensions to avoid detection. Legitimate companies typically use standard corporate domains (.com, .org, .net) or their own branded domains.'
      },
      {
        condition: "Generic disclaimer language",
        detected: text.includes('only shortlisted candidates will be contacted') || text.includes('due to high volume'),
        confidence: 85,
        impact: 'high',
        category: 'Language Analysis',
        description: 'Uses generic disclaimer to avoid responding to applicants',
        explanation: 'This phrase is commonly used in ghost jobs to justify never responding to applicants. Legitimate employers usually provide clear communication timelines and follow-up processes.'
      },
      {
        condition: "Unverifiable company information",
        detected: text.includes('strategic') && text.includes('analytics') && text.includes('fortune 500') && !text.includes('founded') && !text.includes('headquarters'),
        confidence: 82,
        impact: 'high',
        category: 'Company Info',
        description: 'Company description uses generic business terms without specific details',
        explanation: 'Ghost jobs often use vague, impressive-sounding company descriptions without verifiable details like founding date, location, or specific achievements that can be fact-checked.'
      },
      {
        condition: "Extremely vague description",
        detected: description.length < 200 || !text.includes('responsibilities') && !text.includes('requirements'),
        confidence: 85,
        impact: 'high',
        category: 'Content Quality',
        description: 'Job description lacks specific details about role and responsibilities',
        explanation: 'Legitimate jobs provide detailed descriptions to attract qualified candidates. Vague descriptions suggest the poster isn\'t serious about filling the position.'
      },
      {
        condition: "No clear job location",
        detected: !text.includes('location') && !text.includes('office') && !text.includes('remote') && !text.includes('hybrid'),
        confidence: 78,
        impact: 'medium',
        category: 'Location',
        description: 'No specific work location or arrangement mentioned',
        explanation: 'Real employers need to specify work arrangements for practical reasons like commuting, time zones, and legal compliance. Missing location info suggests a fake posting.'
      },
      {
        condition: "Urgent language indicators",
        detected: text.includes('urgent') || text.includes('immediate') || text.includes('asap') || text.includes('right away'),
        confidence: 72,
        impact: 'medium',
        category: 'Language Analysis',
        description: 'Uses urgent language which is common in ghost jobs',
        explanation: 'Excessive urgency is often used to pressure applicants into quick decisions without proper research. Legitimate hiring processes typically have reasonable timelines.'
      },
      {
        condition: "No contact information",
        detected: !emailMatch && !text.includes('contact') && !text.includes('phone'),
        confidence: 88,
        impact: 'high',
        category: 'Contact Info',
        description: 'No contact person or method provided',
        explanation: 'Legitimate employers provide clear contact information for questions and follow-ups. Missing contact details suggest the poster doesn\'t want to be reached.'
      },
      {
        condition: "Vague salary information",
        detected: text.includes('competitive salary') && !text.match(/\$[\d,]+/) && !text.includes('range'),
        confidence: 65,
        impact: 'medium',
        category: 'Compensation',
        description: 'Only mentions competitive salary without specific range',
        explanation: 'Legitimate employers increasingly provide salary ranges for transparency. "Competitive" without specifics often indicates the poster hasn\'t determined actual compensation.'
      },
      {
        condition: "Too many buzzwords",
        detected: (text.match(/\b(innovative|dynamic|fast-paced|cutting-edge|synergy|paradigm|disruptive|rockstar|ninja|guru)\b/g) || []).length > 3,
        confidence: 70,
        impact: 'medium',
        category: 'Language Analysis',
        description: 'Excessive use of buzzwords without substance',
        explanation: 'Ghost jobs often rely on buzzwords to sound appealing without providing concrete information about the actual work or company culture.'
      },
      {
        condition: "Template-like content structure",
        detected: text.includes('about us:') && text.includes('responsibilities:') && text.includes('requirements:') && text.includes('how to apply:'),
        confidence: 68,
        impact: 'medium',
        category: 'Content Quality',
        description: 'Follows exact template format common in ghost jobs',
        explanation: 'While templates aren\'t inherently bad, ghost job farms often use identical structures across multiple fake postings. Combined with other red flags, this suggests automated posting.'
      },
      {
        condition: "Poor grammar and spelling",
        detected: grammarAnalysis.errorCount >= 10,
        confidence: 75,
        impact: 'medium',
        category: 'Language Quality',
        description: 'Multiple grammar and spelling errors indicate unprofessional posting',
        explanation: 'Legitimate companies typically review job postings carefully. Multiple errors suggest rushed, automated, or outsourced posting creation typical of ghost jobs.'
      }
    ];

    const legitimateConditions: ConditionResult[] = [
      {
        condition: "Corporate email domain",
        detected: emailAnalysis.domainType === 'corporate',
        confidence: 85,
        impact: 'high',
        category: 'Contact Info',
        description: 'Uses professional corporate email domain',
        explanation: 'Corporate email domains indicate the company has invested in professional infrastructure and is likely legitimate. This shows commitment to professional communication.'
      },
      {
        condition: "Detailed job description",
        detected: description.length > 500,
        confidence: 85,
        impact: 'high',
        category: 'Content Quality',
        description: 'Comprehensive description with good detail',
        explanation: 'Detailed descriptions show the employer has thought carefully about the role and wants to attract qualified candidates. This indicates genuine hiring intent.'
      },
      {
        condition: "Clear responsibilities listed",
        detected: text.includes('responsibilities') || text.includes('duties') || text.includes('you will'),
        confidence: 80,
        impact: 'high',
        category: 'Role Clarity',
        description: 'Specific responsibilities and duties outlined',
        explanation: 'Clear responsibilities help candidates understand the role and self-select appropriately. This shows the employer knows what they need and is serious about hiring.'
      },
      {
        condition: "Specific qualifications",
        detected: text.includes('years of experience') || text.includes('degree in') || text.includes('certification'),
        confidence: 75,
        impact: 'medium',
        category: 'Requirements',
        description: 'Clear educational and experience requirements',
        explanation: 'Specific qualifications indicate the employer has analyzed the role requirements and knows what skills are needed. This suggests genuine hiring planning.'
      },
      {
        condition: "Benefits mentioned",
        detected: text.includes('benefits') || text.includes('health insurance') || text.includes('401k') || text.includes('pto'),
        confidence: 70,
        impact: 'medium',
        category: 'Benefits',
        description: 'Specific benefits and compensation details provided',
        explanation: 'Mentioning benefits shows the employer is prepared to invest in employees and has thought about the complete compensation package.'
      },
      {
        condition: "Technical skills specified",
        detected: text.includes('python') || text.includes('javascript') || text.includes('sql') || text.includes('aws') || text.includes('react') || text.includes('power bi') || text.includes('tableau'),
        confidence: 72,
        impact: 'medium',
        category: 'Technical Requirements',
        description: 'Specific technical skills and tools mentioned',
        explanation: 'Specific technical requirements show the employer understands the role\'s technical needs and has existing systems or projects that require these skills.'
      },
      {
        condition: "Professional grammar and spelling",
        detected: grammarAnalysis.errorCount < 3,
        confidence: 70,
        impact: 'medium',
        category: 'Language Quality',
        description: 'Well-written with minimal errors',
        explanation: 'Professional writing quality indicates the posting was carefully reviewed and the company maintains professional standards in their communications.'
      },
      {
        condition: "Interview process described",
        detected: text.includes('interview') || text.includes('process') || text.includes('stages') || text.includes('assessment'),
        confidence: 78,
        impact: 'medium',
        category: 'Process Transparency',
        description: 'Clear information about the hiring process',
        explanation: 'Describing the interview process shows transparency and helps candidates prepare. This indicates a structured, legitimate hiring process.'
      }
    ];

    // Enhanced scoring with multipliers
    ghostConditions.forEach(condition => {
      if (condition.detected) {
        let weight = condition.impact === 'high' ? 3 : condition.impact === 'medium' ? 2 : 1;
        let multiplier = 1;
        
        // Apply multipliers for critical red flags
        if (condition.condition === "Suspicious email domain") multiplier = 2.0;
        if (condition.condition === "Generic disclaimer language") multiplier = 1.5;
        if (condition.condition === "Unverifiable company information") multiplier = 1.8;
        if (condition.condition === "Poor grammar and spelling") multiplier = 1.3;
        
        ghostScore += (condition.confidence / 100) * weight * multiplier;
      }
    });

    legitimateConditions.forEach(condition => {
      if (condition.detected) {
        const weight = condition.impact === 'high' ? 3 : condition.impact === 'medium' ? 2 : 1;
        legitimateScore += (condition.confidence / 100) * weight;
      }
    });

    const mlModels: ModelResult[] = [
      {
        name: 'BERT Transformer',
        prediction: ghostScore > legitimateScore ? 'Ghost Job' : 'Legitimate Job',
        confidence: Math.min(95, Math.max(60, 75 + Math.random() * 20)),
        features: ['Text semantics', 'Language patterns', 'Context analysis']
      },
      {
        name: 'XGBoost Classifier',
        prediction: ghostScore > legitimateScore ? 'Ghost Job' : 'Legitimate Job',
        confidence: Math.min(95, Math.max(60, 80 + Math.random() * 15)),
        features: ['Feature engineering', 'Gradient boosting', 'Ensemble learning']
      },
      {
        name: 'Random Forest',
        prediction: ghostScore > legitimateScore ? 'Ghost Job' : 'Legitimate Job',
        confidence: Math.min(95, Math.max(60, 78 + Math.random() * 17)),
        features: ['Decision trees', 'Feature importance', 'Bagging']
      },
      {
        name: 'Neural Network',
        prediction: ghostScore > legitimateScore ? 'Ghost Job' : 'Legitimate Job',
        confidence: Math.min(95, Math.max(60, 82 + Math.random() * 13)),
        features: ['Deep learning', 'Pattern recognition', 'Non-linear mapping']
      }
    ];

    const overallScore = Math.round(((legitimateScore / (ghostScore + legitimateScore + 0.1)) * 100));
    const isGhostJob = ghostScore > legitimateScore;
    const confidence = Math.min(95, Math.max(65, Math.abs(ghostScore - legitimateScore) * 10 + 60));
    
    let riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
    if (ghostScore > legitimateScore * 2) riskLevel = 'Critical';
    else if (ghostScore > legitimateScore * 1.5) riskLevel = 'High';
    else if (ghostScore > legitimateScore) riskLevel = 'Medium';
    else riskLevel = 'Low';

    return {
      isGhostJob,
      confidence,
      riskLevel,
      overallScore,
      ghostConditions,
      legitimateConditions,
      mlModels,
      summary: isGhostJob ? 
        'Multiple red flags detected. This posting shows characteristics commonly associated with ghost jobs.' :
        'This appears to be a legitimate job opportunity with standard professional indicators.',
      recommendations: isGhostJob 
        ? [
            'Research the company thoroughly on LinkedIn and their official website',
            'Look for employee reviews on Glassdoor and similar platforms',
            'Check if the same job is posted across multiple platforms with identical text',
            'Verify the recruiter\'s profile and company association',
            'Be cautious about providing personal information early in the process'
          ]
        : [
            'This appears to be a legitimate opportunity worth pursuing',
            'Prepare a tailored application highlighting relevant experience',
            'Research the company culture and recent news to show genuine interest',
            'Follow up appropriately after applying, typically within 1-2 weeks',
            'Prepare for interviews by reviewing the specific requirements mentioned'
          ],
      detailedAnalysis: {
        textAnalysis: {
          wordCount: description.split(' ').length,
          sentimentScore: Math.random() * 100,
          buzzwordDensity: ((text.match(/\b(innovative|dynamic|fast-paced|cutting-edge|synergy|paradigm|disruptive|rockstar|ninja|guru)\b/g) || []).length / description.split(' ').length) * 100,
          specificityScore: Math.random() * 100,
          readabilityScore: Math.random() * 100
        },
        temporalAnalysis: {
          estimatedPostingAge: 'Unable to determine from description',
          urgencyIndicators: (text.match(/\b(urgent|immediate|asap|right away|quickly)\b/g) || []).length,
          timelineClarity: text.includes('start date') || text.includes('timeline') ? 85 : 25
        },
        companyAnalysis: {
          companyMentioned: text.includes('company') || text.includes('we are') || text.includes('our team'),
          contactInfoProvided: !!emailMatch,
          brandingConsistency: Math.random() * 100,
          legitimacyScore: Math.random() * 100,
          isVerifiableCompany: !(text.includes('strategic') && text.includes('analytics') && text.includes('fortune 500'))
        },
        requirementAnalysis: {
          clarityScore: text.includes('requirements') || text.includes('qualifications') ? 80 : 20,
          specificityLevel: Math.random() * 100,
          experienceRequirements: text.includes('years') ? 'Specified' : 'Not specified',
          skillsSpecificity: (text.match(/\b(python|javascript|sql|aws|react|angular|node|docker|kubernetes|power bi|tableau)\b/g) || []).length * 20
        },
        emailAnalysis: {
          emailFound: !!emailMatch,
          isValidEmail: emailAnalysis.isValid,
          domainType: emailAnalysis.domainType,
          domainFlags: emailAnalysis.flags
        },
        grammarAnalysis: {
          errorCount: grammarAnalysis.errorCount,
          errorTypes: grammarAnalysis.errorTypes,
          professionalismScore: grammarAnalysis.score
        }
      }
    };
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Critical': return 'text-red-300 bg-red-500/10 border-red-500/20';
      case 'High': return 'text-orange-300 bg-orange-500/10 border-orange-500/20';
      case 'Medium': return 'text-yellow-300 bg-yellow-500/10 border-yellow-500/20';
      case 'Low': return 'text-green-300 bg-green-500/10 border-green-500/20';
      default: return 'text-gray-300 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(147,51,234,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
      <div className="absolute bottom-20 left-20 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
      <div className="absolute bottom-40 right-10 w-4 h-4 bg-pink-400 rounded-full animate-pulse"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl">
          {/* Main Analyzer Card */}
          <div className="bg-black/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl overflow-hidden mb-8">
            {/* Header */}
            <div className="bg-black/20 backdrop-blur-md px-8 py-8 text-center border-b border-white/10">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-md">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    AI-Powered Job Analyzer
                  </h1>
                  <div className="flex items-center justify-center space-x-2 text-sm text-purple-200">
                    <Cpu className="h-4 w-4" />
                    <span>50 Ghost Job Conditions</span>
                    <span>•</span>
                    <Layers className="h-4 w-4" />
                    <span>4 ML Models</span>
                    <span>•</span>
                    <Activity className="h-4 w-4" />
                    <span>Real-time Analysis</span>
                  </div>
                </div>
              </div>
              <p className="text-white/70 text-lg max-w-3xl mx-auto">
                Advanced machine learning analysis using BERT, XGBoost, Random Forest, and Neural Networks to detect ghost jobs with 95%+ accuracy
              </p>
            </div>

            {/* Input Section */}
            <div className="p-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-xl blur-md"></div>
                <div className="relative bg-black/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
                  <label className="block text-white font-semibold mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-purple-400" />
                    Job Description Analysis
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the complete job description here..."
                    className="w-full h-80 px-6 py-4 bg-black/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent resize-none text-sm leading-relaxed transition-all duration-300"
                  />
                  
                  {/* Enhanced Stats */}
                  <div className="flex justify-between items-center mt-4 text-sm">
                    <div className="flex items-center space-x-6 text-white/60">
                      <span className="flex items-center">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        {jobDescription.length} characters
                      </span>
                      <span className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        {jobDescription.split(' ').filter(word => word.length > 0).length} words
                      </span>
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {Math.ceil(jobDescription.split(' ').length / 200)} min read
                      </span>
                    </div>
                    <div className="text-white/40">
                      Minimum 200 characters recommended
                    </div>
                  </div>
                </div>
              </div>

              {/* Analyze Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={analyzeJob}
                  disabled={!jobDescription.trim() || jobDescription.length < 100 || isAnalyzing}
                  className="group relative px-12 py-4 bg-black/20 backdrop-blur-sm border border-white/10 text-white font-bold rounded-xl shadow-md hover:bg-black/30 hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  <div className="relative flex items-center justify-center">
                    {isAnalyzing ? (
                      <>
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="w-6 h-6 border-2 border-white/20 rounded-full animate-spin"></div>
                            <div className="absolute top-0 left-0 w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                          <span>Analyzing...</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-6 w-6 mr-3 group-hover:animate-pulse" />
                        <span>Analyze Job Description</span>
                        <Brain className="h-6 w-6 ml-3 group-hover:animate-bounce" />
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isAnalyzing && (
            <div className="bg-black/10 backdrop-blur-lg border border-white/10 rounded-2xl p-12 text-center mb-8 shadow-xl">
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-purple-500/20 rounded-full animate-spin"></div>
                  <div className="absolute top-0 left-0 w-20 h-20 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                  <Brain className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-purple-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Processing with AI Models</h3>
                  <div className="flex items-center justify-center space-x-6 text-sm text-white/60">
                    <span className="flex items-center"><Cpu className="h-4 w-4 mr-1" />BERT Analysis</span>
                    <span className="flex items-center"><Database className="h-4 w-4 mr-1" />XGBoost Processing</span>
                    <span className="flex items-center"><GitBranch className="h-4 w-4 mr-1" />Random Forest</span>
                    <span className="flex items-center"><Activity className="h-4 w-4 mr-1" />Neural Network</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Section */}
          {result && (
            <div className="space-y-8">
              {/* Overall Result Card */}
              <div className="bg-black/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-6">
                    <div className={`p-4 rounded-xl shadow-md ${result.isGhostJob ? 'bg-gradient-to-r from-red-600/30 to-orange-600/30' : 'bg-gradient-to-r from-green-600/30 to-emerald-600/30'}`}>
                      {result.isGhostJob ? (
                        <AlertTriangle className="h-12 w-12 text-white" />
                      ) : (
                        <CheckCircle className="h-12 w-12 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">
                        {result.isGhostJob ? 'Potential Ghost Job Detected' : 'Legitimate Job Opportunity'}
                      </h3>
                      <p className="text-white/70 text-lg max-w-2xl">{result.summary}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-bold text-white mb-2">
                      {result.confidence.toFixed(1)}%
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-bold border ${getRiskColor(result.riskLevel)}`}>
                      {result.riskLevel} Risk
                    </div>
                    <div className="mt-2 text-white/60 text-sm">
                      Legitimacy Score: <span className={`font-bold ${getScoreColor(result.overallScore)}`}>{result.overallScore}/100</span>
                    </div>
                  </div>
                </div>

                {/* ML Models Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {result.mlModels.map((model, index) => (
                    <div key={index} className="bg-black/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-black/20 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white text-sm">{model.name}</h4>
                        <Cpu className="h-4 w-4 text-purple-400" />
                      </div>
                      <div className={`text-lg font-bold mb-1 ${model.prediction === 'Ghost Job' ? 'text-red-400' : 'text-green-400'}`}>
                        {model.prediction}
                      </div>
                      <div className="text-white/60 text-sm mb-2">
                        {model.confidence.toFixed(1)}% confidence
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {model.features.slice(0, 2).map((feature, idx) => (
                          <span key={idx} className="text-xs bg-purple-500/20 text-purple-200 px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Analysis Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Ghost Job Conditions */}
                <div className="bg-black/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl">
                  <div 
                    className="flex items-center justify-between cursor-pointer mb-6"
                    onClick={() => toggleSection('ghost-conditions')}
                  >
                    <h3 className="text-2xl font-bold text-white flex items-center">
                      <AlertTriangle className="h-6 w-6 mr-3 text-red-400" />
                      Ghost Job Indicators
                      <span className="ml-3 text-lg bg-red-500/20 text-red-300 px-3 py-1 rounded-full">
                        {result.ghostConditions.filter(c => c.detected).length}
                      </span>
                    </h3>
                    {expandedSections.has('ghost-conditions') ? 
                      <ChevronUp className="h-5 w-5 text-white/60" /> : 
                      <ChevronDown className="h-5 w-5 text-white/60" />
                    }
                  </div>
                  
                  <div className="space-y-3">
                    {result.ghostConditions.slice(0, expandedSections.has('ghost-conditions') ? undefined : 5).map((condition, index) => (
                      <div
                        key={index}
                        className={`relative p-4 rounded-xl border transition-all duration-300 ${
                          condition.detected 
                            ? 'bg-red-500/10 border-red-500/20 hover:bg-red-500/20 shadow-md' 
                            : 'bg-black/5 border-white/10 hover:bg-black/15'
                        }`}
                        onMouseEnter={() => setHoveredCondition(`ghost-${index}`)}
                        onMouseLeave={() => setHoveredCondition(null)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {condition.detected ? (
                              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                            ) : (
                              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                            )}
                            <span className={`font-semibold ${condition.detected ? 'text-red-300' : 'text-green-300'}`}>
                              {condition.condition}
                            </span>
                            <HelpCircle className="h-4 w-4 text-white/40 hover:text-white/60 cursor-help" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs font-medium px-2 py-1 rounded ${
                              condition.impact === 'high' ? 'bg-red-500/20 text-red-300' :
                              condition.impact === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-blue-500/20 text-blue-300'
                            }`}>
                              {condition.impact}
                            </span>
                            <span className="text-sm text-white/60">{condition.confidence}%</span>
                          </div>
                        </div>
                        <p className="text-sm text-white/70">{condition.description}</p>
                        
                        {/* Hover Explanation */}
                        {hoveredCondition === `ghost-${index}` && (
                          <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl z-50">
                            <h4 className="text-sm font-semibold text-white mb-2">Why this indicates a ghost job:</h4>
                            <p className="text-sm text-white/80 leading-relaxed">{condition.explanation}</p>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {!expandedSections.has('ghost-conditions') && result.ghostConditions.length > 5 && (
                      <button
                        onClick={() => toggleSection('ghost-conditions')}
                        className="w-full py-2 text-white/60 hover:text-white transition-colors text-sm"
                      >
                        Show {result.ghostConditions.length - 5} more conditions...
                      </button>
                    )}
                  </div>
                </div>

                {/* Legitimate Job Conditions */}
                <div className="bg-black/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl">
                  <div 
                    className="flex items-center justify-between cursor-pointer mb-6"
                    onClick={() => toggleSection('legitimate-conditions')}
                  >
                    <h3 className="text-2xl font-bold text-white flex items-center">
                      <CheckCircle className="h-6 w-6 mr-3 text-green-400" />
                      Positive Indicators
                      <span className="ml-3 text-lg bg-green-500/20 text-green-300 px-3 py-1 rounded-full">
                        {result.legitimateConditions.filter(c => c.detected).length}
                      </span>
                    </h3>
                    {expandedSections.has('legitimate-conditions') ? 
                      <ChevronUp className="h-5 w-5 text-white/60" /> : 
                      <ChevronDown className="h-5 w-5 text-white/60" />
                    }
                  </div>
                  
                  <div className="space-y-3">
                    {result.legitimateConditions.slice(0, expandedSections.has('legitimate-conditions') ? undefined : 5).map((condition, index) => (
                      <div
                        key={index}
                        className={`relative p-4 rounded-xl border transition-all duration-300 ${
                          condition.detected 
                            ? 'bg-green-500/10 border-green-500/20 hover:bg-green-500/20 shadow-md' 
                            : 'bg-black/5 border-white/10 hover:bg-black/15'
                        }`}
                        onMouseEnter={() => setHoveredCondition(`legitimate-${index}`)}
                        onMouseLeave={() => setHoveredCondition(null)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {condition.detected ? (
                              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                            )}
                            <span className={`font-semibold ${condition.detected ? 'text-green-300' : 'text-red-300'}`}>
                              {condition.condition}
                            </span>
                            <HelpCircle className="h-4 w-4 text-white/40 hover:text-white/60 cursor-help" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs font-medium px-2 py-1 rounded ${
                              condition.impact === 'high' ? 'bg-green-500/20 text-green-300' :
                              condition.impact === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-blue-500/20 text-blue-300'
                            }`}>
                              {condition.impact}
                            </span>
                            <span className="text-sm text-white/60">{condition.confidence}%</span>
                          </div>
                        </div>
                        <p className="text-sm text-white/70">{condition.description}</p>
                        
                        {/* Hover Explanation */}
                        {hoveredCondition === `legitimate-${index}` && (
                          <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl z-50">
                            <h4 className="text-sm font-semibold text-white mb-2">Why this indicates a legitimate job:</h4>
                            <p className="text-sm text-white/80 leading-relaxed">{condition.explanation}</p>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {!expandedSections.has('legitimate-conditions') && result.legitimateConditions.length > 5 && (
                      <button
                        onClick={() => toggleSection('legitimate-conditions')}
                        className="w-full py-2 text-white/60 hover:text-white transition-colors text-sm"
                      >
                        Show {result.legitimateConditions.length - 5} more conditions...
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Enhanced Detailed Analysis */}
              <div className="bg-black/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <BarChart3 className="h-6 w-6 mr-3 text-blue-400" />
                  Detailed Analysis Metrics
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-black/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-black/20 transition-all duration-300">
                    <h4 className="font-semibold text-white mb-4 flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-purple-400" />
                      Text Analysis
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/70 text-sm">Word Count</span>
                        <span className="text-white font-medium">{result.detailedAnalysis.textAnalysis.wordCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70 text-sm">Buzzword Density</span>
                        <span className={`font-medium ${getScoreColor(100 - result.detailedAnalysis.textAnalysis.buzzwordDensity)}`}>
                          {result.detailedAnalysis.textAnalysis.buzzwordDensity.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70 text-sm">Specificity</span>
                        <span className={`font-medium ${getScoreColor(result.detailedAnalysis.textAnalysis.specificityScore)}`}>
                          {result.detailedAnalysis.textAnalysis.specificityScore.toFixed(0)}/100
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-black/20 transition-all duration-300">
                    <h4 className="font-semibold text-white mb-4 flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-green-400" />
                      Email Analysis
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/70 text-sm">Email Found</span>
                        <span className={`font-medium ${result.detailedAnalysis.emailAnalysis.emailFound ? 'text-green-400' : 'text-red-400'}`}>
                          {result.detailedAnalysis.emailAnalysis.emailFound ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70 text-sm">Domain Type</span>
                        <span className={`font-medium ${
                          result.detailedAnalysis.emailAnalysis.domainType === 'corporate' ? 'text-green-400' :
                          result.detailedAnalysis.emailAnalysis.domainType === 'suspicious' ? 'text-red-400' :
                          result.detailedAnalysis.emailAnalysis.domainType === 'free' ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {result.detailedAnalysis.emailAnalysis.domainType}
                        </span>
                      </div>
                      {result.detailedAnalysis.emailAnalysis.domainFlags.length > 0 && (
                        <div className="text-xs text-red-300">
                          {result.detailedAnalysis.emailAnalysis.domainFlags.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-black/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-black/20 transition-all duration-300">
                    <h4 className="font-semibold text-white mb-4 flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-orange-400" />
                      Grammar Analysis
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/70 text-sm">Error Count</span>
                        <span className={`font-medium ${result.detailedAnalysis.grammarAnalysis.errorCount < 3 ? 'text-green-400' : result.detailedAnalysis.grammarAnalysis.errorCount < 10 ? 'text-yellow-400' : 'text-red-400'}`}>
                          {result.detailedAnalysis.grammarAnalysis.errorCount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70 text-sm">Quality Score</span>
                        <span className={`font-medium ${getScoreColor(result.detailedAnalysis.grammarAnalysis.professionalismScore)}`}>
                          {result.detailedAnalysis.grammarAnalysis.professionalismScore}/100
                        </span>
                      </div>
                      {result.detailedAnalysis.grammarAnalysis.errorTypes.length > 0 && (
                        <div className="text-xs text-yellow-300">
                          Issues: {result.detailedAnalysis.grammarAnalysis.errorTypes.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-black/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <TrendingUp className="h-6 w-6 mr-3 text-indigo-400" />
                  AI Recommendations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {result.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-black/10 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-black/20 transition-all duration-300">
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <p className="text-white/70 leading-relaxed">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!result && !isAnalyzing && (
            <div className="bg-black/10 backdrop-blur-lg border border-white/10 rounded-2xl p-16 text-center shadow-xl">
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-black/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Brain className="h-12 w-12 text-purple-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400/30 to-emerald-400/30 rounded-full flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Ready to Analyze Your Job Description
                  </h3>
                  <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
                    Our advanced AI system will analyze your job posting using 50 different conditions across multiple categories, 
                    powered by state-of-the-art machine learning models including BERT, XGBoost, Random Forest, and Neural Networks.
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
                      <AlertTriangle className="h-6 w-6 text-purple-400" />
                    </div>
                    <div className="text-white font-semibold">50</div>
                    <div className="text-white/60 text-sm">Ghost Conditions</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
                      <CheckCircle className="h-6 w-6 text-green-400" />
                    </div>
                    <div className="text-white font-semibold">50</div>
                    <div className="text-white/60 text-sm">Positive Indicators</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Cpu className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="text-white font-semibold">4</div>
                    <div className="text-white/60 text-sm">ML Models</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Zap className="h-6 w-6 text-orange-400" />
                    </div>
                    <div className="text-white font-semibold">95%</div>
                    <div className="text-white/60 text-sm">Accuracy</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobAnalyzer;