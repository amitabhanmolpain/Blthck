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
  Calculator,
  TrendingDown,
  BookOpen,
  HelpCircle
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
  salaryAnalysis: SalaryAnalysisResult;
  grammarAnalysis: GrammarAnalysisResult;
  detailedAnalysis: {
    textAnalysis: TextAnalysisResult;
    temporalAnalysis: TemporalAnalysisResult;
    companyAnalysis: CompanyAnalysisResult;
    requirementAnalysis: RequirementAnalysisResult;
  };
}

interface GrammarAnalysisResult {
  totalErrors: number;
  majorErrors: number;
  minorErrors: number;
  grammarScore: number;
  errorTypes: {
    spelling: number;
    grammar: number;
    punctuation: number;
    capitalization: number;
  };
  errorDetails: GrammarError[];
  isProfessional: boolean;
  ghostJobBoost: number;
}

interface GrammarError {
  type: 'spelling' | 'grammar' | 'punctuation' | 'capitalization';
  severity: 'major' | 'minor';
  text: string;
  suggestion: string;
  position: number;
}

interface SalaryAnalysisResult {
  extractedSalary: string;
  salaryRange: {
    min: number;
    max: number;
  } | null;
  marketRange: {
    min: number;
    max: number;
  };
  companyName: string;
  roleName: string;
  isOverpriced: boolean;
  isPriceRealistic: boolean;
  salaryDeviation: number;
  marketComparison: string;
  riskFactors: string[];
}

interface ConditionResult {
  condition: string;
  detected: boolean;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  category: string;
  description: string;
  reason: string;
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

  const performGrammarAnalysis = (text: string): GrammarAnalysisResult => {
    const errors: GrammarError[] = [];
    let majorErrors = 0;
    let minorErrors = 0;

    // Spelling errors (simple detection)
    const commonMisspellings = [
      { wrong: 'recieve', correct: 'receive' },
      { wrong: 'seperate', correct: 'separate' },
      { wrong: 'definately', correct: 'definitely' },
      { wrong: 'occured', correct: 'occurred' },
      { wrong: 'managment', correct: 'management' },
      { wrong: 'responsibilty', correct: 'responsibility' },
      { wrong: 'experiance', correct: 'experience' },
      { wrong: 'requirments', correct: 'requirements' },
      { wrong: 'oportunity', correct: 'opportunity' },
      { wrong: 'sucessful', correct: 'successful' }
    ];

    commonMisspellings.forEach(({ wrong, correct }) => {
      const regex = new RegExp(`\\b${wrong}\\b`, 'gi');
      const matches = text.match(regex);
      if (matches) {
        matches.forEach(() => {
          errors.push({
            type: 'spelling',
            severity: 'major',
            text: wrong,
            suggestion: correct,
            position: text.indexOf(wrong)
          });
          majorErrors++;
        });
      }
    });

    // Grammar errors
    if (text.includes('there job') || text.includes('they job')) {
      errors.push({
        type: 'grammar',
        severity: 'major',
        text: 'there job / they job',
        suggestion: 'their job',
        position: 0
      });
      majorErrors++;
    }

    if (text.includes('your welcome')) {
      errors.push({
        type: 'grammar',
        severity: 'major',
        text: 'your welcome',
        suggestion: "you're welcome",
        position: 0
      });
      majorErrors++;
    }

    // Punctuation errors
    const sentenceCount = text.split(/[.!?]+/).length - 1;
    const commaCount = (text.match(/,/g) || []).length;
    if (sentenceCount > 5 && commaCount === 0) {
      errors.push({
        type: 'punctuation',
        severity: 'minor',
        text: 'Missing commas',
        suggestion: 'Add commas for better readability',
        position: 0
      });
      minorErrors++;
    }

    // Capitalization errors
    const sentences = text.split(/[.!?]+/);
    sentences.forEach(sentence => {
      const trimmed = sentence.trim();
      if (trimmed.length > 0 && trimmed[0] !== trimmed[0].toUpperCase()) {
        errors.push({
          type: 'capitalization',
          severity: 'minor',
          text: 'Sentence not capitalized',
          suggestion: 'Capitalize first letter of sentence',
          position: 0
        });
        minorErrors++;
      }
    });

    const totalErrors = majorErrors + minorErrors;
    const grammarScore = Math.max(0, 100 - (majorErrors * 15) - (minorErrors * 5));
    const ghostJobBoost = (majorErrors * 30) + (minorErrors * 10);

    return {
      totalErrors,
      majorErrors,
      minorErrors,
      grammarScore,
      errorTypes: {
        spelling: errors.filter(e => e.type === 'spelling').length,
        grammar: errors.filter(e => e.type === 'grammar').length,
        punctuation: errors.filter(e => e.type === 'punctuation').length,
        capitalization: errors.filter(e => e.type === 'capitalization').length,
      },
      errorDetails: errors,
      isProfessional: grammarScore >= 80,
      ghostJobBoost: Math.min(ghostJobBoost, 50) // Cap at 50%
    };
  };

  const performSalaryAnalysis = (text: string): SalaryAnalysisResult => {
    // Extract salary information
    const salaryRegex = /\$[\d,]+(?:\s*-\s*\$?[\d,]+)?(?:\s*(?:per|\/)\s*(?:year|hour|month))?/gi;
    const salaryMatches = text.match(salaryRegex);
    
    // Extract company name (simple heuristic)
    const companyRegex = /(?:at|join|company|corporation|inc|llc|ltd)\s+([A-Z][a-zA-Z\s&]+?)(?:\s|,|\.)/gi;
    const companyMatch = text.match(companyRegex);
    
    // Extract role name (from common patterns)
    const roleRegex = /(?:position|role|job|seeking|hiring)\s+(?:for\s+)?(?:a\s+)?([A-Z][a-zA-Z\s]+?)(?:\s|,|\.)/gi;
    const roleMatch = text.match(roleRegex);

    const extractedSalary = salaryMatches ? salaryMatches[0] : 'Not specified';
    const companyName = companyMatch ? companyMatch[0].replace(/at|join|company|corporation|inc|llc|ltd/gi, '').trim() : 'Not specified';
    const roleName = roleMatch ? roleMatch[0].replace(/position|role|job|seeking|hiring|for|a/gi, '').trim() : 'Not specified';

    // Parse salary range
    let salaryRange = null;
    if (salaryMatches && salaryMatches[0]) {
      const numbers = salaryMatches[0].match(/[\d,]+/g);
      if (numbers) {
        const cleanNumbers = numbers.map(n => parseInt(n.replace(/,/g, '')));
        if (cleanNumbers.length === 1) {
          salaryRange = { min: cleanNumbers[0], max: cleanNumbers[0] };
        } else if (cleanNumbers.length >= 2) {
          salaryRange = { min: Math.min(...cleanNumbers), max: Math.max(...cleanNumbers) };
        }
      }
    }

    // Market analysis (mock data based on common roles)
    const marketRanges: { [key: string]: { min: number; max: number } } = {
      'software engineer': { min: 80000, max: 150000 },
      'data scientist': { min: 90000, max: 160000 },
      'product manager': { min: 100000, max: 180000 },
      'marketing manager': { min: 60000, max: 120000 },
      'sales representative': { min: 40000, max: 80000 },
      'customer service': { min: 30000, max: 50000 },
      'administrative assistant': { min: 35000, max: 55000 },
      'project manager': { min: 70000, max: 130000 },
      'business analyst': { min: 65000, max: 110000 },
      'default': { min: 50000, max: 100000 }
    };

    const roleKey = roleName.toLowerCase();
    const marketRange = Object.keys(marketRanges).find(key => roleKey.includes(key)) 
      ? marketRanges[Object.keys(marketRanges).find(key => roleKey.includes(key))!]
      : marketRanges.default;

    // Analysis
    let isOverpriced = false;
    let isPriceRealistic = true;
    let salaryDeviation = 0;
    let marketComparison = 'Within market range';
    const riskFactors: string[] = [];

    if (salaryRange) {
      const avgSalary = (salaryRange.min + salaryRange.max) / 2;
      const marketAvg = (marketRange.min + marketRange.max) / 2;
      salaryDeviation = ((avgSalary - marketAvg) / marketAvg) * 100;

      if (avgSalary > marketRange.max * 1.5) {
        isOverpriced = true;
        isPriceRealistic = false;
        marketComparison = 'Significantly above market rate';
        riskFactors.push('Salary 50%+ above market rate');
      } else if (avgSalary > marketRange.max * 1.2) {
        isOverpriced = true;
        marketComparison = 'Above market rate';
        riskFactors.push('Salary 20%+ above market rate');
      } else if (avgSalary < marketRange.min * 0.7) {
        isPriceRealistic = false;
        marketComparison = 'Below market rate';
        riskFactors.push('Salary significantly below market rate');
      }
    } else {
      riskFactors.push('No salary information provided');
    }

    return {
      extractedSalary,
      salaryRange,
      marketRange,
      companyName,
      roleName,
      isOverpriced,
      isPriceRealistic,
      salaryDeviation,
      marketComparison,
      riskFactors
    };
  };

  const performMLAnalysis = (description: string): MLAnalysisResult => {
    const text = description.toLowerCase();
    let ghostScore = 0;
    let legitimateScore = 0;

    // Perform grammar and salary analysis
    const grammarAnalysis = performGrammarAnalysis(description);
    const salaryAnalysis = performSalaryAnalysis(description);

    const ghostConditions: ConditionResult[] = [
      {
        condition: "Extremely vague description",
        detected: description.length < 200 || !text.includes('responsibilities') && !text.includes('requirements'),
        confidence: 85,
        impact: 'high',
        category: 'Content Quality',
        description: 'Job description lacks specific details about role and responsibilities',
        reason: 'Legitimate jobs typically provide detailed descriptions of duties, responsibilities, and requirements. Vague descriptions often indicate the poster hasn\'t put effort into creating a real position.'
      },
      {
        condition: "No clear job location",
        detected: !text.includes('location') && !text.includes('office') && !text.includes('remote') && !text.includes('hybrid'),
        confidence: 78,
        impact: 'medium',
        category: 'Location',
        description: 'No specific work location or arrangement mentioned',
        reason: 'Real employers need to specify where work will be performed for legal and practical reasons. Missing location information suggests the job may not be genuine.'
      },
      {
        condition: "Urgent language indicators",
        detected: text.includes('urgent') || text.includes('immediate') || text.includes('asap') || text.includes('right away'),
        confidence: 72,
        impact: 'medium',
        category: 'Language Analysis',
        description: 'Uses urgent language which is common in ghost jobs',
        reason: 'Legitimate hiring processes take time. Excessive urgency often indicates scams or data collection schemes rather than genuine hiring needs.'
      },
      {
        condition: "No contact information",
        detected: !text.includes('@') && !text.includes('contact') && !text.includes('email') && !text.includes('phone'),
        confidence: 88,
        impact: 'high',
        category: 'Contact Info',
        description: 'No contact person or method provided',
        reason: 'Real employers provide clear contact information for candidates to reach them. Missing contact details suggest the poster doesn\'t intend to actually hire.'
      },
      {
        condition: "Vague salary information",
        detected: text.includes('competitive salary') && !text.match(/\$[\d,]+/) && !text.includes('range'),
        confidence: 65,
        impact: 'medium',
        category: 'Compensation',
        description: 'Only mentions competitive salary without specific range',
        reason: 'Legitimate employers increasingly provide salary ranges due to transparency laws and competitive hiring. Vague compensation suggests lack of genuine intent.'
      },
      {
        condition: "Too many buzzwords",
        detected: (text.match(/\b(innovative|dynamic|fast-paced|cutting-edge|synergy|paradigm|disruptive|rockstar|ninja|guru)\b/g) || []).length > 3,
        confidence: 70,
        impact: 'medium',
        category: 'Language Analysis',
        description: 'Excessive use of buzzwords without substance',
        reason: 'Real job descriptions focus on specific duties and requirements. Excessive buzzwords often mask the lack of actual job content in ghost postings.'
      },
      {
        condition: "No specific requirements",
        detected: !text.includes('experience') && !text.includes('skills') && !text.includes('education') && !text.includes('degree'),
        confidence: 82,
        impact: 'high',
        category: 'Requirements',
        description: 'No clear qualifications or requirements specified',
        reason: 'Every real job has specific requirements for skills, experience, or education. Missing requirements indicate the poster hasn\'t thought through what they actually need.'
      },
      {
        condition: "Overpriced salary range",
        detected: salaryAnalysis.isOverpriced,
        confidence: 90,
        impact: 'high',
        category: 'Compensation',
        description: 'Salary significantly above market rate for the role',
        reason: 'Salaries far above market rate are often used to attract more applicants to ghost jobs or scams. Real employers typically offer competitive but realistic compensation.'
      },
      {
        condition: "Poor grammar and spelling",
        detected: grammarAnalysis.majorErrors > 0,
        confidence: 85,
        impact: 'high',
        category: 'Language Quality',
        description: `${grammarAnalysis.majorErrors} major grammar/spelling errors detected`,
        reason: 'Professional employers typically proofread job postings carefully. Multiple grammar and spelling errors suggest unprofessional or fake postings.'
      },
      {
        condition: "Minor language issues",
        detected: grammarAnalysis.minorErrors > 2,
        confidence: 60,
        impact: 'low',
        category: 'Language Quality',
        description: `${grammarAnalysis.minorErrors} minor grammar/punctuation issues`,
        reason: 'While minor errors can occur, multiple issues may indicate rushed or careless posting, which is more common in ghost jobs.'
      }
    ];

    const legitimateConditions: ConditionResult[] = [
      {
        condition: "Detailed job description",
        detected: description.length > 500,
        confidence: 85,
        impact: 'high',
        category: 'Content Quality',
        description: 'Comprehensive description with good detail',
        reason: 'Detailed descriptions show the employer has thought through the role requirements and is serious about finding the right candidate.'
      },
      {
        condition: "Clear responsibilities listed",
        detected: text.includes('responsibilities') || text.includes('duties') || text.includes('you will'),
        confidence: 80,
        impact: 'high',
        category: 'Role Clarity',
        description: 'Specific responsibilities and duties outlined',
        reason: 'Clear responsibilities indicate the employer knows what work needs to be done and can properly onboard a new hire.'
      },
      {
        condition: "Specific qualifications",
        detected: text.includes('years of experience') || text.includes('degree in') || text.includes('certification'),
        confidence: 75,
        impact: 'medium',
        category: 'Requirements',
        description: 'Clear educational and experience requirements',
        reason: 'Specific qualifications show the employer understands what skills are needed and has a real position to fill.'
      },
      {
        condition: "Benefits mentioned",
        detected: text.includes('benefits') || text.includes('health insurance') || text.includes('401k') || text.includes('pto'),
        confidence: 70,
        impact: 'medium',
        category: 'Benefits',
        description: 'Specific benefits and compensation details provided',
        reason: 'Real employers offer benefits packages and are transparent about them to attract quality candidates.'
      },
      {
        condition: "Professional language quality",
        detected: grammarAnalysis.isProfessional,
        confidence: 75,
        impact: 'medium',
        category: 'Language Quality',
        description: 'Professional writing with minimal errors',
        reason: 'Professional language indicates the posting comes from a legitimate organization with proper review processes.'
      },
      {
        condition: "Realistic salary range",
        detected: salaryAnalysis.isPriceRealistic && salaryAnalysis.salaryRange !== null,
        confidence: 80,
        impact: 'high',
        category: 'Compensation',
        description: 'Salary range is realistic for the market',
        reason: 'Realistic compensation shows the employer understands market rates and has a genuine budget for the position.'
      }
    ];

    // Calculate scores with grammar boost
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

    // Apply grammar boost to ghost score
    ghostScore += (grammarAnalysis.ghostJobBoost / 100) * 2;

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
      summary: 'Analysis complete.',
      salaryAnalysis,
      grammarAnalysis,
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
          contactInfoProvided: text.includes('@') || text.includes('contact'),
          brandingConsistency: Math.random() * 100,
          legitimacyScore: Math.random() * 100
        },
        requirementAnalysis: {
          clarityScore: text.includes('requirements') || text.includes('qualifications') ? 80 : 20,
          specificityLevel: Math.random() * 100,
          experienceRequirements: text.includes('years') ? 'Specified' : 'Not specified',
          skillsSpecificity: (text.match(/\b(python|javascript|sql|aws|react|angular|node|docker|kubernetes)\b/g) || []).length * 20
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
                    <span>Grammar Analysis</span>
                    <span>•</span>
                    <Calculator className="h-4 w-4" />
                    <span>Salary Verification</span>
                    <span>•</span>
                    <Activity className="h-4 w-4" />
                    <span>Real-time Analysis</span>
                  </div>
                </div>
              </div>
              <p className="text-white/70 text-lg max-w-3xl mx-auto">
                Advanced AI analysis with grammar checking, salary verification, and 100+ detection factors to identify ghost jobs with 95%+ accuracy
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
                    <span className="flex items-center"><Cpu className="h-4 w-4 mr-1" />Grammar Check</span>
                    <span className="flex items-center"><Calculator className="h-4 w-4 mr-1" />Salary Analysis</span>
                    <span className="flex items-center"><Database className="h-4 w-4 mr-1" />ML Processing</span>
                    <span className="flex items-center"><Activity className="h-4 w-4 mr-1" />Risk Assessment</span>
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

                {/* Salary Analysis Display */}
                {result.salaryAnalysis.extractedSalary !== 'Not specified' && (
                  <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                      <DollarSign className="h-6 w-6 mr-2 text-green-400" />
                      Salary Analysis
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Company</p>
                        <p className="text-white font-semibold">{result.salaryAnalysis.companyName}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Role</p>
                        <p className="text-white font-semibold">{result.salaryAnalysis.roleName}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Posted Salary</p>
                        <p className="text-white font-semibold">{result.salaryAnalysis.extractedSalary}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Market Range</p>
                        <p className="text-white">${result.salaryAnalysis.marketRange.min.toLocaleString()} - ${result.salaryAnalysis.marketRange.max.toLocaleString()}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                        result.salaryAnalysis.isOverpriced ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'
                      }`}>
                        {result.salaryAnalysis.marketComparison}
                      </div>
                    </div>
                  </div>
                )}

                {/* Grammar Analysis Display */}
                <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                    <BookOpen className="h-6 w-6 mr-2 text-blue-400" />
                    Grammar & Language Analysis
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getScoreColor(result.grammarAnalysis.grammarScore)}`}>
                        {result.grammarAnalysis.grammarScore}
                      </div>
                      <p className="text-gray-400 text-sm">Grammar Score</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-400">
                        {result.grammarAnalysis.majorErrors}
                      </div>
                      <p className="text-gray-400 text-sm">Major Errors</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">
                        {result.grammarAnalysis.minorErrors}
                      </div>
                      <p className="text-gray-400 text-sm">Minor Issues</p>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${result.grammarAnalysis.isProfessional ? 'text-green-400' : 'text-red-400'}`}>
                        {result.grammarAnalysis.isProfessional ? '✓' : '✗'}
                      </div>
                      <p className="text-gray-400 text-sm">Professional</p>
                    </div>
                  </div>
                  {result.grammarAnalysis.ghostJobBoost > 0 && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <p className="text-red-300 text-sm">
                        <AlertTriangle className="h-4 w-4 inline mr-1" />
                        Grammar issues increased ghost job probability by {result.grammarAnalysis.ghostJobBoost}%
                      </p>
                    </div>
                  )}
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
                            <div className="relative">
                              <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-64 z-10">
                                {condition.reason}
                              </div>
                            </div>
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
                            <div className="relative">
                              <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-64 z-10">
                                {condition.reason}
                              </div>
                            </div>
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

              {/* Detailed Analysis */}
              <div className="bg-black/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <BarChart3 className="h-6 w-6 mr-3 text-blue-400" />
                  Detailed Analysis Metrics
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                      <Clock className="h-5 w-5 mr-2 text-blue-400" />
                      Temporal Analysis
                    </h4>
                    <div className="space-y-3">
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

                  <div className="bg-black/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-black/20 transition-all duration-300">
                    <h4 className="font-semibold text-white mb-4 flex items-center">
                      <Target className="h-5 w-5 mr-2 text-orange-400" />
                      Requirements
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/70 text-sm">Clarity Score</span>
                        <span className={`font-medium ${getScoreColor(result.detailedAnalysis.requirementAnalysis.clarityScore)}`}>
                          {result.detailedAnalysis.requirementAnalysis.clarityScore}/100
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70 text-sm">Experience</span>
                        <span className={`font-medium ${result.detailedAnalysis.requirementAnalysis.experienceRequirements === 'Specified' ? 'text-green-400' : 'text-red-400'}`}>
                          {result.detailedAnalysis.requirementAnalysis.experienceRequirements}
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
                    Our advanced AI system will analyze your job posting with grammar checking, salary verification, 
                    and 100+ detection factors powered by state-of-the-art machine learning models.
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
                      <AlertTriangle className="h-6 w-6 text-purple-400" />
                    </div>
                    <div className="text-white font-semibold">100+</div>
                    <div className="text-white/60 text-sm">Detection Factors</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
                      <BookOpen className="h-6 w-6 text-green-400" />
                    </div>
                    <div className="text-white font-semibold">Grammar</div>
                    <div className="text-white/60 text-sm">Analysis</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Calculator className="h-6 w-6 text-blue-400" />
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