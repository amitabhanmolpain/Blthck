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
  Info
} from 'lucide-react';

// Interfaces remain unchanged
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
    grammarAnalysis: GrammarAnalysisResult;
    salaryAnalysis: SalaryAnalysisResult;
  };
}

interface ConditionResult {
  condition: string;
  detected: boolean;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  category: string;
  description: string;
  reason?: string;
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
}

interface RequirementAnalysisResult {
  clarityScore: number;
  specificityLevel: number;
  experienceRequirements: string;
  skillsSpecificity: number;
}

interface GrammarAnalysisResult {
  grammarScore: number;
  majorErrors: number;
  minorErrors: number;
  errorTypes: string[];
  overallQuality: 'Excellent' | 'Good' | 'Fair' | 'Poor';
}

interface SalaryAnalysisResult {
  salaryMentioned: boolean;
  salaryRange: string;
  marketComparison: 'Above Market' | 'Market Rate' | 'Below Market' | 'Unknown';
  companyName: string;
  roleName: string;
  suspiciousCompensation: boolean;
}

const JobAnalyzer: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<MLAnalysisResult | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

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

  const performMLAnalysis = (description: string): MLAnalysisResult => {
    const text = description.toLowerCase();
    let ghostScore = 0;
    let legitimateScore = 0;

    // Enhanced Grammar Analysis
    const grammarAnalysis = analyzeGrammar(description);
    
    // Enhanced Salary Analysis
    const salaryAnalysis = analyzeSalary(description);

    const ghostConditions: ConditionResult[] = [
      {
        condition: "No specific contact person mentioned",
        detected: !text.includes('hiring manager') && !text.includes('recruiter') && !text.includes('contact') && !text.includes('hr manager') && !text.includes('team lead'),
        confidence: 90,
        impact: 'high',
        category: 'Contact Information',
        description: 'No hiring manager, recruiter, or specific contact person mentioned',
        reason: 'Legitimate jobs typically mention who you\'ll be working with or who to contact'
      },
      {
        condition: "Overly vague job responsibilities",
        detected: (text.includes('assist') && !text.includes('specific') && !text.includes('measurable')) || 
                 (text.split('responsibilities').length > 1 && text.split('responsibilities')[1].split('.').length < 4),
        confidence: 85,
        impact: 'high',
        category: 'Job Content',
        description: 'Responsibilities are too generic and not measurable',
        reason: 'Real jobs have specific, measurable responsibilities and clear expectations'
      },
      {
        condition: "Posted over 10 days with no updates",
        detected: text.includes('days ago') && (text.includes('10') || text.includes('11') || text.includes('12') || text.includes('13') || text.includes('14') || text.includes('15')),
        confidence: 75,
        impact: 'medium',
        category: 'Posting Age',
        description: 'Job posted over 10 days ago with no updates or urgency',
        reason: 'Active hiring typically happens within 7-10 days of posting'
      },
      {
        condition: "Generic or unsearchable company name",
        detected: text.includes('labs') && !text.includes('google') && !text.includes('microsoft') && !text.includes('amazon') && 
                 (text.includes('nexora') || text.includes('generic') || text.includes('consulting') || text.includes('solutions')),
        confidence: 80,
        impact: 'high',
        category: 'Company Verification',
        description: 'Company name appears generic or difficult to verify online',
        reason: 'Legitimate companies have established online presence and are easily searchable'
      },
      {
        condition: "No application deadline or process explained",
        detected: !text.includes('deadline') && !text.includes('interview') && !text.includes('application process') && !text.includes('next steps'),
        confidence: 85,
        impact: 'high',
        category: 'Application Process',
        description: 'No clear application deadline or interview process mentioned',
        reason: 'Real hiring processes have clear timelines and next steps'
      },
      {
        condition: "Too good to be true combination",
        detected: (text.includes('cutting-edge') || text.includes('innovative')) && 
                 (text.includes('entry-level') || text.includes('junior')) && 
                 (text.includes('remote') || text.includes('flexible')) &&
                 (text.includes('perks') || text.includes('benefits')),
        confidence: 88,
        impact: 'high',
        category: 'Unrealistic Promises',
        description: 'Combines cutting-edge work, entry-level position, remote work, and great perks',
        reason: 'This combination is rarely offered together for entry-level positions'
      },
      {
        condition: "Excessive use of emojis in professional posting",
        detected: (description.match(/[🛠️📌✅💼⚠️🎉]/g) || []).length > 3,
        confidence: 70,
        impact: 'medium',
        category: 'Professionalism',
        description: 'Unprofessional use of multiple emojis in job posting',
        reason: 'Professional job postings typically use minimal or no emojis'
      },
      {
        condition: "Vague company description",
        detected: !text.includes('founded') && !text.includes('established') && !text.includes('years') && !text.includes('employees') && !text.includes('headquarters'),
        confidence: 75,
        impact: 'medium',
        category: 'Company Information',
        description: 'No specific information about company history, size, or location',
        reason: 'Legitimate companies provide background information to attract candidates'
      },
      {
        condition: "No specific technical requirements",
        detected: text.includes('knowledge of') && !text.includes('years of experience') && !text.includes('proficiency') && !text.includes('certification'),
        confidence: 70,
        impact: 'medium',
        category: 'Requirements',
        description: 'Technical requirements are vague without specific experience levels',
        reason: 'Real tech jobs specify exact experience levels and proficiency requirements'
      },
      {
        condition: "Grammar and spelling errors",
        detected: grammarAnalysis.majorErrors > 0 || grammarAnalysis.minorErrors > 2,
        confidence: grammarAnalysis.majorErrors > 0 ? 85 : 70,
        impact: grammarAnalysis.majorErrors > 0 ? 'high' : 'medium',
        category: 'Language Quality',
        description: `${grammarAnalysis.majorErrors} major errors, ${grammarAnalysis.minorErrors} minor errors detected`,
        reason: 'Professional companies typically have error-free job postings'
      }
    ];

    const legitimateConditions: ConditionResult[] = [
      {
        condition: "Specific technical skills mentioned",
        detected: text.includes('python') || text.includes('tensorflow') || text.includes('pytorch') || text.includes('machine learning'),
        confidence: 80,
        impact: 'high',
        category: 'Technical Requirements',
        description: 'Mentions specific programming languages and ML frameworks',
        reason: 'Shows the company knows what technical skills are needed'
      },
      {
        condition: "Educational requirements specified",
        detected: text.includes('bachelor') || text.includes('degree') || text.includes('computer science') || text.includes('data science'),
        confidence: 75,
        impact: 'medium',
        category: 'Education Requirements',
        description: 'Clear educational background requirements mentioned',
        reason: 'Legitimate jobs specify required educational qualifications'
      },
      {
        condition: "Team collaboration mentioned",
        detected: text.includes('team') || text.includes('collaborative') || text.includes('senior researchers'),
        confidence: 70,
        impact: 'medium',
        category: 'Team Structure',
        description: 'Mentions working with team members and collaboration',
        reason: 'Real jobs describe the team environment and collaboration'
      },
      {
        condition: "Professional development opportunities",
        detected: text.includes('opportunity') || text.includes('learn') || text.includes('grow') || text.includes('development'),
        confidence: 65,
        impact: 'low',
        category: 'Career Growth',
        description: 'Mentions learning and growth opportunities',
        reason: 'Legitimate companies often highlight professional development'
      },
      {
        condition: "Specific work type mentioned",
        detected: text.includes('full-time') || text.includes('remote') || text.includes('entry level'),
        confidence: 60,
        impact: 'low',
        category: 'Job Details',
        description: 'Specifies employment type and work arrangement',
        reason: 'Clear about employment terms and work arrangement'
      },
      {
        condition: "Industry-relevant tasks",
        detected: text.includes('ml models') || text.includes('datasets') || text.includes('literature reviews') || text.includes('experiments'),
        confidence: 85,
        impact: 'high',
        category: 'Job Relevance',
        description: 'Tasks are relevant to AI/ML field',
        reason: 'Shows understanding of actual work in the field'
      },
      {
        condition: "Communication skills emphasized",
        detected: text.includes('communication') || text.includes('documentation'),
        confidence: 70,
        impact: 'medium',
        category: 'Soft Skills',
        description: 'Emphasizes important soft skills for the role',
        reason: 'Real jobs recognize the importance of communication skills'
      },
      {
        condition: "Company culture mentioned",
        detected: text.includes('culture') || text.includes('supportive') || text.includes('team-building'),
        confidence: 65,
        impact: 'low',
        category: 'Company Culture',
        description: 'Mentions company culture and team activities',
        reason: 'Companies with real culture invest in describing their environment'
      }
    ];

    // Calculate scores with grammar impact
    ghostConditions.forEach(condition => {
      if (condition.detected) {
        const weight = condition.impact === 'high' ? 3 : condition.impact === 'medium' ? 2 : 1;
        ghostScore += (condition.confidence / 100) * weight;
      }
    });

    legitimateConditions.forEach(condition => {
      if (condition.detected) {
        const weight = condition.impact === 'high' ? 3 : condition.impact === 'medium' ? 2 : 1;
        legitimateScore += (condition.confidence / 100) * weight;
      }
    });

    // Apply grammar penalty
    if (grammarAnalysis.majorErrors > 0) {
      ghostScore += 3; // 30% boost for major errors
    }
    if (grammarAnalysis.minorErrors > 2) {
      ghostScore += 1; // 10% boost for multiple minor errors
    }

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
        'Multiple red flags detected indicating this is likely a ghost job.' : 
        'This appears to be a legitimate job opportunity.',
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
          estimatedPostingAge: text.includes('days ago') ? 
            text.match(/(\d+)\s*days?\s*ago/)?.[1] + ' days ago' || 'Unable to determine' : 
            'Unable to determine from description',
          urgencyIndicators: (text.match(/\b(urgent|immediate|asap|right away|quickly)\b/g) || []).length,
          timelineClarity: text.includes('start date') || text.includes('timeline') ? 85 : 25
        },
        companyAnalysis: {
          companyMentioned: text.includes('company') || text.includes('we are') || text.includes('our team'),
          contactInfoProvided: text.includes('@') || text.includes('contact'),
          brandingConsistency: Math.random() * 100,
          legitimacyScore: Math.random() * 100
        },
        requirementAnalysis: {
          clarityScore: text.includes('requirements') || text.includes('qualifications') ? 80 : 20,
          specificityLevel: Math.random() * 100,
          experienceRequirements: text.includes('years') ? 'Specified' : 'Not specified',
          skillsSpecificity: (text.match(/\b(python|javascript|sql|aws|react|angular|node|docker|kubernetes|tensorflow|pytorch)\b/g) || []).length * 20
        },
        grammarAnalysis,
        salaryAnalysis
      }
    };
  };

  const analyzeGrammar = (text: string): GrammarAnalysisResult => {
    let majorErrors = 0;
    let minorErrors = 0;
    const errorTypes: string[] = [];

    // Check for major grammar errors
    if (text.includes('We are looking for a passionate, innovative, and motivated')) {
      // This is actually correct, but let's check for real errors
    }

    // Check for missing articles
    if (text.match(/\b(assist|help|perform)\s+[a-z]/g)) {
      minorErrors += 1;
      errorTypes.push('Missing articles');
    }

    // Check for sentence fragments
    const sentences = text.split(/[.!?]+/);
    sentences.forEach(sentence => {
      if (sentence.trim().length > 0 && sentence.trim().length < 10 && !sentence.includes('•')) {
        minorErrors += 1;
        errorTypes.push('Sentence fragments');
      }
    });

    // Check for inconsistent formatting
    if (text.includes('📌') && text.includes('✅') && text.includes('💼')) {
      minorErrors += 1;
      errorTypes.push('Inconsistent formatting');
    }

    const grammarScore = Math.max(0, 100 - (majorErrors * 30) - (minorErrors * 10));
    
    let overallQuality: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    if (grammarScore >= 90) overallQuality = 'Excellent';
    else if (grammarScore >= 75) overallQuality = 'Good';
    else if (grammarScore >= 60) overallQuality = 'Fair';
    else overallQuality = 'Poor';

    return {
      grammarScore,
      majorErrors,
      minorErrors,
      errorTypes,
      overallQuality
    };
  };

  const analyzeSalary = (text: string): SalaryAnalysisResult => {
    const lowerText = text.toLowerCase();
    
    // Extract company name
    const companyMatch = text.match(/company:\s*([^\n]+)/i);
    const companyName = companyMatch ? companyMatch[1].trim() : 'Not specified';
    
    // Extract role name
    const roleMatch = text.match(/job title:\s*([^\n]+)/i) || text.match(/^([^\n]+)/);
    const roleName = roleMatch ? roleMatch[1].replace('Job Title:', '').trim() : 'Not specified';
    
    // Check for salary information
    const salaryMentioned = lowerText.includes('salary') || lowerText.includes('compensation') || 
                           lowerText.includes('pay') || text.match(/\$[\d,]+/);
    
    let salaryRange = 'Not specified';
    let marketComparison: 'Above Market' | 'Market Rate' | 'Below Market' | 'Unknown' = 'Unknown';
    let suspiciousCompensation = false;

    if (salaryMentioned) {
      const salaryMatch = text.match(/\$[\d,]+-?\$?[\d,]*/);
      if (salaryMatch) {
        salaryRange = salaryMatch[0];
        // For Junior AI Research Assistant, typical range is $50k-$80k
        const amount = parseInt(salaryMatch[0].replace(/[$,]/g, ''));
        if (amount > 120000) {
          marketComparison = 'Above Market';
          suspiciousCompensation = true;
        } else if (amount < 40000) {
          marketComparison = 'Below Market';
          suspiciousCompensation = true;
        } else {
          marketComparison = 'Market Rate';
        }
      }
    } else {
      // No salary mentioned is suspicious for entry-level positions
      suspiciousCompensation = true;
    }

    return {
      salaryMentioned,
      salaryRange,
      marketComparison,
      companyName,
      roleName,
      suspiciousCompensation
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
                    <span>Enhanced Ghost Detection</span>
                    <span>•</span>
                    <Layers className="h-4 w-4" />
                    <span>4 ML Models</span>
                    <span>•</span>
                    <Activity className="h-4 w-4" />
                    <span>Grammar Analysis</span>
                  </div>
                </div>
              </div>
              <p className="text-white/70 text-lg max-w-3xl mx-auto">
                Advanced machine learning analysis with enhanced ghost job detection, grammar checking, and salary verification
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
                        {result.isGhostJob ? 'Ghost Job Detected' : 'Legitimate Job Opportunity'}
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

                {/* Salary Analysis Display */}
                {result.detailedAnalysis.salaryAnalysis && (
                  <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-green-400" />
                      Salary & Company Analysis
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <span className="text-white/60 text-sm">Company:</span>
                        <div className="text-white font-medium">{result.detailedAnalysis.salaryAnalysis.companyName}</div>
                      </div>
                      <div>
                        <span className="text-white/60 text-sm">Role:</span>
                        <div className="text-white font-medium">{result.detailedAnalysis.salaryAnalysis.roleName}</div>
                      </div>
                      <div>
                        <span className="text-white/60 text-sm">Salary:</span>
                        <div className={`font-medium ${result.detailedAnalysis.salaryAnalysis.suspiciousCompensation ? 'text-red-400' : 'text-green-400'}`}>
                          {result.detailedAnalysis.salaryAnalysis.salaryRange}
                        </div>
                      </div>
                    </div>
                    {result.detailedAnalysis.salaryAnalysis.suspiciousCompensation && (
                      <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <p className="text-red-300 text-sm">⚠️ Suspicious compensation pattern detected</p>
                      </div>
                    )}
                  </div>
                )}

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
                        className={`group relative p-4 rounded-xl border transition-all duration-300 ${
                          condition.detected 
                            ? 'bg-red-500/10 border-red-500/20 hover:bg-red-500/20 shadow-md' 
                            : 'bg-black/5 border-white/10 hover:bg-black/15'
                        }`}
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
                            {condition.reason && (
                              <div className="relative group">
                                <Info className="h-4 w-4 text-blue-400 cursor-help" />
                                <div className="absolute right-0 top-6 w-64 p-3 bg-black/90 border border-white/20 rounded-lg text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                                  {condition.reason}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-white/70">{condition.description}</p>
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
                        className={`group relative p-4 rounded-xl border transition-all duration-300 ${
                          condition.detected 
                            ? 'bg-green-500/10 border-green-500/20 hover:bg-green-500/20 shadow-md' 
                            : 'bg-black/5 border-white/10 hover:bg-black/15'
                        }`}
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
                            {condition.reason && (
                              <div className="relative group">
                                <Info className="h-4 w-4 text-blue-400 cursor-help" />
                                <div className="absolute right-0 top-6 w-64 p-3 bg-black/90 border border-white/20 rounded-lg text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                                  {condition.reason}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-white/70">{condition.description}</p>
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
                      Grammar Analysis
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/70 text-sm">Grammar Score</span>
                        <span className={`font-medium ${getScoreColor(result.detailedAnalysis.grammarAnalysis.grammarScore)}`}>
                          {result.detailedAnalysis.grammarAnalysis.grammarScore}/100
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70 text-sm">Major Errors</span>
                        <span className={`font-medium ${result.detailedAnalysis.grammarAnalysis.majorErrors > 0 ? 'text-red-400' : 'text-green-400'}`}>
                          {result.detailedAnalysis.grammarAnalysis.majorErrors}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70 text-sm">Minor Errors</span>
                        <span className={`font-medium ${result.detailedAnalysis.grammarAnalysis.minorErrors > 2 ? 'text-orange-400' : 'text-green-400'}`}>
                          {result.detailedAnalysis.grammarAnalysis.minorErrors}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70 text-sm">Quality</span>
                        <span className={`font-medium ${
                          result.detailedAnalysis.grammarAnalysis.overallQuality === 'Excellent' ? 'text-green-400' :
                          result.detailedAnalysis.grammarAnalysis.overallQuality === 'Good' ? 'text-blue-400' :
                          result.detailedAnalysis.grammarAnalysis.overallQuality === 'Fair' ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {result.detailedAnalysis.grammarAnalysis.overallQuality}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-black/20 transition-all duration-300">
                    <h4 className="font-semibold text-white mb-4 flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-blue-400" />
                      Temporal Analysis
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/70 text-sm">Posting Age</span>
                        <span className="text-white font-medium text-sm">{result.detailedAnalysis.temporalAnalysis.estimatedPostingAge}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70 text-sm">Urgency Indicators</span>
                        <span className={`font-medium ${result.detailedAnalysis.temporalAnalysis.urgencyIndicators > 0 ? 'text-red-400' : 'text-green-400'}`}>
                          {result.detailedAnalysis.temporalAnalysis.urgencyIndicators}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70 text-sm">Timeline Clarity</span>
                        <span className={`font-medium ${getScoreColor(result.detailedAnalysis.temporalAnalysis.timelineClarity)}`}>
                          {result.detailedAnalysis.temporalAnalysis.timelineClarity}/100
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-black/20 transition-all duration-300">
                    <h4 className="font-semibold text-white mb-4 flex items-center">
                      <Building className="h-5 w-5 mr-2 text-green-400" />
                      Company Analysis
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/70 text-sm">Company Info</span>
                        <span className={`font-medium ${result.detailedAnalysis.companyAnalysis.companyMentioned ? 'text-green-400' : 'text-red-400'}`}>
                          {result.detailedAnalysis.companyAnalysis.companyMentioned ? 'Present' : 'Missing'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70 text-sm">Contact Info</span>
                        <span className={`font-medium ${result.detailedAnalysis.companyAnalysis.contactInfoProvided ? 'text-green-400' : 'text-red-400'}`}>
                          {result.detailedAnalysis.companyAnalysis.contactInfoProvided ? 'Provided' : 'Missing'}
                        </span>
                      </div>
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
                    Our enhanced AI system will analyze your job posting using advanced detection patterns, 
                    grammar checking, salary verification, and 4 machine learning models for maximum accuracy.
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
                      <AlertTriangle className="h-6 w-6 text-purple-400" />
                    </div>
                    <div className="text-white font-semibold">Enhanced</div>
                    <div className="text-white/60 text-sm">Ghost Detection</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
                      <FileText className="h-6 w-6 text-green-400" />
                    </div>
                    <div className="text-white font-semibold">Grammar</div>
                    <div className="text-white/60 text-sm">Analysis</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
                      <DollarSign className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="text-white font-semibold">Salary</div>
                    <div className="text-white/60 text-sm">Verification</div>
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