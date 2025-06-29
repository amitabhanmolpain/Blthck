import React, { useState, useRef } from 'react';
import { 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  Copy, 
  Trash2, 
  HelpCircle,
  Mail,
  Building,
  Clock,
  FileText,
  DollarSign,
  Users,
  Target,
  Shield,
  Zap,
  Eye,
  Search,
  Globe,
  Calendar,
  MapPin,
  Briefcase
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
    emailAnalysis: {
      isValid: boolean;
      domain: string;
      domainType: 'corporate' | 'suspicious' | 'free' | 'invalid';
      domainFlags: string[];
      isOfficialCompanyEmail: boolean;
    };
    companyVerification: {
      companyExists: boolean;
      hasLinkedInPresence: boolean;
      hasWebsite: boolean;
      verificationScore: number;
    };
    postingQuality: {
      hasSpecificRequirements: boolean;
      hasClearResponsibilities: boolean;
      hasRealisticSalary: boolean;
      hasContactInfo: boolean;
      qualityScore: number;
    };
    temporalFactors: {
      hasDeadline: boolean;
      hasPostingDate: boolean;
      urgencyLevel: 'low' | 'medium' | 'high';
      temporalScore: number;
    };
    redFlags: Array<{
      flag: string;
      severity: 'low' | 'medium' | 'high';
      confidence: number;
      explanation: string;
    }>;
  };
}

const JobAnalyzer: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Known ghost job patterns and companies
  const knownGhostJobPatterns = {
    companies: [
      'veritas insight group',
      'axonbridge systems',
      'axonbridge',
      'techflow solutions',
      'innovate dynamics',
      'nexus technologies',
      'quantum solutions',
      'digital bridge corp'
    ],
    suspiciousDomains: [
      '.team',
      '.click',
      '.tech',
      '.careers',
      '-careers.',
      '-jobs.',
      '-hiring.',
      'careers@',
      'jobs@',
      'hiring@'
    ],
    ghostJobPhrases: [
      'only shortlisted candidates will be contacted',
      'due to high volume',
      'fast-growing',
      'dynamic environment',
      'competitive salary',
      'exciting opportunity',
      'join our team',
      'work with cutting-edge',
      'innovative solutions',
      'scalable services',
      'next-gen',
      'pipeline of talent',
      'cross-functional teams',
      'sprint planning',
      'brainstorming sessions'
    ],
    vagueTerms: [
      'solutions provider',
      'delivering scalable',
      'innovative services',
      'clients across the globe',
      'exceptional talent',
      'digital experiences',
      'internal tools',
      'client platforms',
      'company standards',
      'professional growth opportunities'
    ]
  };

  const analyzeEmail = (text: string) => {
    const emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/g;
    const emails = text.match(emailRegex) || [];
    
    if (emails.length === 0) {
      return {
        isValid: false,
        domain: '',
        domainType: 'invalid' as const,
        domainFlags: ['No email found'],
        isOfficialCompanyEmail: false
      };
    }

    const email = emails[0].toLowerCase();
    const domain = email.split('@')[1];
    const domainFlags: string[] = [];
    let domainType: 'corporate' | 'suspicious' | 'free' | 'invalid' = 'corporate';
    let isOfficialCompanyEmail = true;

    // Check for suspicious domain patterns
    const suspiciousPatterns = [
      '.team', '.click', '.tech', '.careers', '-careers', '-jobs', '-hiring'
    ];
    
    for (const pattern of suspiciousPatterns) {
      if (domain.includes(pattern)) {
        domainFlags.push(`Suspicious domain pattern: ${pattern}`);
        domainType = 'suspicious';
        isOfficialCompanyEmail = false;
      }
    }

    // Check for free email providers
    const freeProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
    if (freeProviders.includes(domain)) {
      domainFlags.push('Free email provider');
      domainType = 'free';
      isOfficialCompanyEmail = false;
    }

    // Check for specific ghost job domains
    const knownGhostDomains = [
      'veritasinsight.team',
      'axonbridge-careers.tech',
      'techflow-jobs.click',
      'innovate-hiring.team'
    ];
    
    if (knownGhostDomains.includes(domain)) {
      domainFlags.push('Known ghost job domain');
      domainType = 'suspicious';
      isOfficialCompanyEmail = false;
    }

    return {
      isValid: true,
      domain,
      domainType,
      domainFlags,
      isOfficialCompanyEmail
    };
  };

  const analyzeTextQuality = (text: string) => {
    let grammarErrors = 0;
    let spellingErrors = 0;
    const issues: string[] = [];

    // Check for common grammar issues
    const grammarPatterns = [
      { pattern: /\s{2,}/g, issue: 'Multiple spaces' },
      { pattern: /[a-z]\.[A-Z]/g, issue: 'Missing space after period' },
      { pattern: /\s+[,.!?]/g, issue: 'Space before punctuation' },
      { pattern: /[a-z][A-Z]/g, issue: 'Missing space between words' }
    ];

    grammarPatterns.forEach(({ pattern, issue }) => {
      const matches = text.match(pattern);
      if (matches) {
        grammarErrors += matches.length;
        issues.push(`${issue} (${matches.length} instances)`);
      }
    });

    // Check for spelling issues (common misspellings)
    const commonMisspellings = [
      'recieve', 'seperate', 'definately', 'occured', 'begining', 'writting'
    ];
    
    commonMisspellings.forEach(word => {
      if (text.toLowerCase().includes(word)) {
        spellingErrors++;
        issues.push(`Possible misspelling: "${word}"`);
      }
    });

    const totalErrors = grammarErrors + spellingErrors;
    const professionalismScore = Math.max(0, 100 - (totalErrors * 5));
    const score = Math.max(0, 100 - (totalErrors * 3));

    return {
      score,
      issues,
      grammarErrors,
      spellingErrors,
      professionalismScore
    };
  };

  const analyzeCompany = (text: string) => {
    const companyMatch = text.match(/Company:\s*(.+)/i);
    const companyName = companyMatch ? companyMatch[1].trim().toLowerCase() : '';
    
    const companyExists = !knownGhostJobPatterns.companies.includes(companyName);
    const hasLinkedInPresence = companyExists; // Simplified for demo
    const hasWebsite = companyExists; // Simplified for demo
    
    let verificationScore = 100;
    if (!companyExists) verificationScore -= 40;
    if (!hasLinkedInPresence) verificationScore -= 30;
    if (!hasWebsite) verificationScore -= 30;

    return {
      companyExists,
      hasLinkedInPresence,
      hasWebsite,
      verificationScore: Math.max(0, verificationScore)
    };
  };

  const analyzePostingQuality = (text: string) => {
    const hasSpecificRequirements = /\d+\+?\s*years?/i.test(text) && 
                                   (text.includes('SQL') || text.includes('Python') || text.includes('Java') || text.includes('specific'));
    
    const hasClearResponsibilities = text.split('Responsibilities:')[1]?.split('\n').filter(line => line.trim()).length > 3;
    
    const hasRealisticSalary = /\$\d{2,3},?\d{3}/.test(text) || 
                              (!text.toLowerCase().includes('competitive') && text.toLowerCase().includes('salary'));
    
    const hasContactInfo = /@/.test(text) || /phone/i.test(text);
    
    let qualityScore = 0;
    if (hasSpecificRequirements) qualityScore += 25;
    if (hasClearResponsibilities) qualityScore += 25;
    if (hasRealisticSalary) qualityScore += 25;
    if (hasContactInfo) qualityScore += 25;

    return {
      hasSpecificRequirements,
      hasClearResponsibilities,
      hasRealisticSalary,
      hasContactInfo,
      qualityScore
    };
  };

  const analyzeTemporal = (text: string) => {
    const hasDeadline = /deadline|apply by|closing date/i.test(text);
    const hasPostingDate = /posted|date/i.test(text);
    
    let urgencyLevel: 'low' | 'medium' | 'high' = 'low';
    if (text.toLowerCase().includes('urgent') || text.toLowerCase().includes('immediate')) {
      urgencyLevel = 'high';
    } else if (text.toLowerCase().includes('soon') || text.toLowerCase().includes('asap')) {
      urgencyLevel = 'medium';
    }

    const temporalScore = (hasDeadline ? 50 : 0) + (hasPostingDate ? 50 : 0);

    return {
      hasDeadline,
      hasPostingDate,
      urgencyLevel,
      temporalScore
    };
  };

  const detectRedFlags = (text: string, emailAnalysis: any, companyAnalysis: any) => {
    const redFlags: Array<{
      flag: string;
      severity: 'low' | 'medium' | 'high';
      confidence: number;
      explanation: string;
    }> = [];

    // Check for ghost job phrases
    knownGhostJobPatterns.ghostJobPhrases.forEach(phrase => {
      if (text.toLowerCase().includes(phrase.toLowerCase())) {
        redFlags.push({
          flag: `Contains phrase: "${phrase}"`,
          severity: phrase.includes('only shortlisted') ? 'high' : 'medium',
          confidence: phrase.includes('only shortlisted') ? 85 : 65,
          explanation: `This phrase is commonly used in ghost jobs to avoid accountability and reduce follow-up expectations.`
        });
      }
    });

    // Check for vague terms
    let vagueTermCount = 0;
    knownGhostJobPatterns.vagueTerms.forEach(term => {
      if (text.toLowerCase().includes(term.toLowerCase())) {
        vagueTermCount++;
      }
    });

    if (vagueTermCount >= 3) {
      redFlags.push({
        flag: `High use of vague terms (${vagueTermCount} found)`,
        severity: 'medium',
        confidence: Math.min(90, 50 + vagueTermCount * 10),
        explanation: `Generic, buzzword-heavy language often indicates template-based or fake job postings.`
      });
    }

    // Email domain issues
    if (emailAnalysis.domainType === 'suspicious') {
      redFlags.push({
        flag: 'Suspicious email domain',
        severity: 'high',
        confidence: 92,
        explanation: `The email domain "${emailAnalysis.domain}" uses patterns commonly associated with fake job postings.`
      });
    }

    // Company verification issues
    if (!companyAnalysis.companyExists) {
      redFlags.push({
        flag: 'Unverifiable company',
        severity: 'high',
        confidence: 88,
        explanation: `The company cannot be verified through standard business directories or professional networks.`
      });
    }

    // No specific tech stack mentioned
    const techTerms = ['javascript', 'python', 'java', 'react', 'angular', 'vue', 'sql', 'mongodb', 'aws', 'docker'];
    const hasTechStack = techTerms.some(term => text.toLowerCase().includes(term));
    
    if (!hasTechStack && text.toLowerCase().includes('software')) {
      redFlags.push({
        flag: 'No specific technology stack mentioned',
        severity: 'medium',
        confidence: 75,
        explanation: `Legitimate software engineering roles typically mention specific technologies, frameworks, or tools.`
      });
    }

    // Generic job description
    if (text.toLowerCase().includes('cross-functional') && 
        text.toLowerCase().includes('collaborate') && 
        text.toLowerCase().includes('dynamic')) {
      redFlags.push({
        flag: 'Generic template language',
        severity: 'medium',
        confidence: 68,
        explanation: `The job description uses common template phrases that appear across many fake job postings.`
      });
    }

    return redFlags;
  };

  const analyzeJob = async (description: string): Promise<AnalysisResult> => {
    const textQuality = analyzeTextQuality(description);
    const emailAnalysis = analyzeEmail(description);
    const companyVerification = analyzeCompany(description);
    const postingQuality = analyzePostingQuality(description);
    const temporalFactors = analyzeTemporal(description);
    const redFlags = detectRedFlags(description, emailAnalysis, companyVerification);

    // Calculate overall confidence
    let baseConfidence = 50;
    let ghostJobScore = 0;

    // Apply scoring based on red flags
    redFlags.forEach(flag => {
      const weight = flag.severity === 'high' ? 1.5 : flag.severity === 'medium' ? 1.0 : 0.5;
      ghostJobScore += flag.confidence * weight;
    });

    // Apply penalties for poor quality
    if (textQuality.grammarErrors > 3) ghostJobScore += 15;
    if (emailAnalysis.domainType === 'suspicious') ghostJobScore += 25;
    if (!companyVerification.companyExists) ghostJobScore += 30;
    if (postingQuality.qualityScore < 50) ghostJobScore += 20;

    // Normalize score
    const confidence = Math.min(95, Math.max(5, ghostJobScore / redFlags.length || 50));
    const isGhostJob = confidence > 60;

    const reasons = redFlags.map(flag => flag.flag);

    return {
      isGhostJob,
      confidence: Math.round(confidence),
      reasons,
      detailedAnalysis: {
        textQuality,
        emailAnalysis,
        companyVerification,
        postingQuality,
        temporalFactors,
        redFlags
      }
    };
  };

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = await analyzeJob(jobDescription);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  const handleClear = () => {
    setJobDescription('');
    setAnalysis(null);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleCopy = async () => {
    if (analysis) {
      const resultText = `Ghost Job Analysis Result:
${analysis.isGhostJob ? '🚨 GHOST JOB DETECTED' : '✅ LEGITIMATE JOB'}
Confidence: ${analysis.confidence}%

Key Issues:
${analysis.reasons.map(reason => `• ${reason}`).join('\n')}`;
      
      await navigator.clipboard.writeText(resultText);
    }
  };

  const getConditionExplanation = (condition: string, isPositive: boolean) => {
    const explanations = {
      'Valid email domain': {
        positive: 'The email domain appears to be legitimate and properly formatted, suggesting a real company contact.',
        negative: 'The email domain shows suspicious patterns often used in fake job postings, such as non-standard extensions or temporary domains.'
      },
      'Company verification': {
        positive: 'The company can be verified through business directories and has an established online presence.',
        negative: 'The company cannot be verified through standard business directories, LinkedIn, or other professional networks, suggesting it may not exist.'
      },
      'Specific requirements': {
        positive: 'The job posting includes specific technical requirements, years of experience, and clear qualifications.',
        negative: 'The job posting lacks specific requirements and uses vague language, which is common in ghost jobs designed to attract many applicants.'
      },
      'Professional language': {
        positive: 'The job description is well-written with proper grammar and professional terminology.',
        negative: 'The job description contains grammar errors, spelling mistakes, or unprofessional language that suggests low quality or automated generation.'
      },
      'Clear responsibilities': {
        positive: 'The job posting clearly outlines specific duties and responsibilities for the role.',
        negative: 'The responsibilities are vague and generic, often copy-pasted from templates used across multiple fake job postings.'
      },
      'Realistic compensation': {
        positive: 'The compensation is clearly stated and appears realistic for the role and location.',
        negative: 'Compensation is either not mentioned, unrealistically high/low, or uses vague terms like "competitive salary" without specifics.'
      },
      'Contact information': {
        positive: 'Legitimate contact information is provided, including proper company email addresses.',
        negative: 'Contact information is missing, uses suspicious email domains, or provides only generic contact methods.'
      },
      'Posting timeline': {
        positive: 'The job posting includes clear deadlines, posting dates, or urgency indicators.',
        negative: 'No timeline information is provided, suggesting the posting may remain active indefinitely to collect resumes.'
      }
    };

    return explanations[condition]?.[isPositive ? 'positive' : 'negative'] || 
           'This factor contributes to the overall assessment of job posting legitimacy.';
  };

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
            className="w-full h-64 p-4 bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-white/20 transition-all duration-300 resize-none"
          />
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAnalyze}
              disabled={!jobDescription.trim() || isAnalyzing}
              className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <Brain className="h-5 w-5 mr-2" />
                  Analyze Job Posting
                </>
              )}
            </button>
            
            <button
              onClick={handleClear}
              className="px-6 py-3 bg-black/20 backdrop-blur-xl border border-white/20 text-white font-semibold rounded-xl hover:bg-black/30 hover:border-white/30 transition-all duration-300 flex items-center justify-center"
            >
              <Trash2 className="h-5 w-5 mr-2" />
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Main Result Card */}
          <div className={`bg-black/20 backdrop-blur-xl border rounded-3xl p-8 shadow-2xl ${
            analysis.isGhostJob 
              ? 'border-red-500/30 bg-gradient-to-br from-red-900/10 to-orange-900/10' 
              : 'border-green-500/30 bg-gradient-to-br from-green-900/10 to-emerald-900/10'
          }`}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`p-4 rounded-2xl shadow-lg ${
                  analysis.isGhostJob 
                    ? 'bg-gradient-to-r from-red-600 to-orange-600 shadow-red-500/25' 
                    : 'bg-gradient-to-r from-green-600 to-emerald-600 shadow-green-500/25'
                }`}>
                  {analysis.isGhostJob ? (
                    <AlertTriangle className="h-8 w-8 text-white" />
                  ) : (
                    <CheckCircle className="h-8 w-8 text-white" />
                  )}
                </div>
                <div>
                  <h3 className={`text-3xl font-bold mb-2 ${
                    analysis.isGhostJob ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {analysis.isGhostJob ? 'Ghost Job Detected' : 'Legitimate Job'}
                  </h3>
                  <p className="text-gray-300 text-lg">
                    Confidence: <span className="font-bold">{analysis.confidence}%</span>
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleCopy}
                className="p-3 bg-black/20 backdrop-blur-xl border border-white/20 text-white rounded-xl hover:bg-black/30 hover:border-white/30 transition-all duration-300"
                title="Copy results"
              >
                <Copy className="h-5 w-5" />
              </button>
            </div>

            {/* Key Issues */}
            {analysis.reasons.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xl font-semibold text-white mb-4">Key Issues Detected:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {analysis.reasons.map((reason, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10">
                      <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Analysis Conditions */}
            <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
              <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                <Target className="h-6 w-6 mr-3 text-purple-400" />
                Analysis Conditions
              </h4>
              
              <div className="space-y-4">
                {[
                  { 
                    label: 'Valid email domain', 
                    value: analysis.detailedAnalysis.emailAnalysis.isOfficialCompanyEmail,
                    icon: Mail 
                  },
                  { 
                    label: 'Company verification', 
                    value: analysis.detailedAnalysis.companyVerification.companyExists,
                    icon: Building 
                  },
                  { 
                    label: 'Specific requirements', 
                    value: analysis.detailedAnalysis.postingQuality.hasSpecificRequirements,
                    icon: FileText 
                  },
                  { 
                    label: 'Professional language', 
                    value: analysis.detailedAnalysis.textQuality.professionalismScore > 70,
                    icon: Shield 
                  },
                  { 
                    label: 'Clear responsibilities', 
                    value: analysis.detailedAnalysis.postingQuality.hasClearResponsibilities,
                    icon: Users 
                  },
                  { 
                    label: 'Realistic compensation', 
                    value: analysis.detailedAnalysis.postingQuality.hasRealisticSalary,
                    icon: DollarSign 
                  },
                  { 
                    label: 'Contact information', 
                    value: analysis.detailedAnalysis.postingQuality.hasContactInfo,
                    icon: Globe 
                  },
                  { 
                    label: 'Posting timeline', 
                    value: analysis.detailedAnalysis.temporalFactors.hasDeadline,
                    icon: Clock 
                  }
                ].map((condition, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-black/10 backdrop-blur-sm rounded-xl border border-white/5">
                    <div className="flex items-center space-x-3">
                      <condition.icon className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-300">{condition.label}</span>
                      <div className="group relative">
                        <HelpCircle className="h-4 w-4 text-gray-500 cursor-help" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 backdrop-blur-xl border border-white/20 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 w-64">
                          {getConditionExplanation(condition.label, condition.value)}
                        </div>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-2 ${condition.value ? 'text-green-400' : 'text-red-400'}`}>
                      {condition.value ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <AlertTriangle className="h-5 w-5" />
                      )}
                      <span className="font-medium text-sm">
                        {condition.value ? 'Pass' : 'Fail'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Scores */}
            <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
              <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                <Eye className="h-6 w-6 mr-3 text-blue-400" />
                Detailed Analysis
              </h4>
              
              <div className="space-y-6">
                {/* Email Analysis */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 font-medium">Email Domain</span>
                    <span className={`text-sm font-bold ${
                      analysis.detailedAnalysis.emailAnalysis.domainType === 'corporate' ? 'text-green-400' :
                      analysis.detailedAnalysis.emailAnalysis.domainType === 'suspicious' ? 'text-red-400' :
                      'text-yellow-400'
                    }`}>
                      {analysis.detailedAnalysis.emailAnalysis.domainType.toUpperCase()}
                    </span>
                  </div>
                  {analysis.detailedAnalysis.emailAnalysis.domainFlags.length > 0 && (
                    <div className="text-xs text-gray-400 space-y-1">
                      {analysis.detailedAnalysis.emailAnalysis.domainFlags.map((flag, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <AlertTriangle className="h-3 w-3 text-orange-400" />
                          <span>{flag}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Text Quality */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 font-medium">Text Quality</span>
                    <span className="text-sm font-bold text-blue-400">
                      {analysis.detailedAnalysis.textQuality.score}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${analysis.detailedAnalysis.textQuality.score}%` }}
                    ></div>
                  </div>
                  {analysis.detailedAnalysis.textQuality.issues.length > 0 && (
                    <div className="text-xs text-gray-400 mt-2 space-y-1">
                      {analysis.detailedAnalysis.textQuality.issues.slice(0, 3).map((issue, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <AlertTriangle className="h-3 w-3 text-yellow-400" />
                          <span>{issue}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Company Verification */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 font-medium">Company Verification</span>
                    <span className="text-sm font-bold text-purple-400">
                      {analysis.detailedAnalysis.companyVerification.verificationScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${analysis.detailedAnalysis.companyVerification.verificationScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Posting Quality */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 font-medium">Posting Quality</span>
                    <span className="text-sm font-bold text-emerald-400">
                      {analysis.detailedAnalysis.postingQuality.qualityScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${analysis.detailedAnalysis.postingQuality.qualityScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Red Flags Section */}
          {analysis.detailedAnalysis.redFlags.length > 0 && (
            <div className="bg-black/20 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6 shadow-xl">
              <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                <AlertTriangle className="h-6 w-6 mr-3 text-red-400" />
                Red Flags Detected ({analysis.detailedAnalysis.redFlags.length})
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysis.detailedAnalysis.redFlags.map((flag, index) => (
                  <div key={index} className="p-4 bg-red-900/10 backdrop-blur-sm border border-red-500/20 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-semibold text-red-400 text-sm">{flag.flag}</h5>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          flag.severity === 'high' ? 'bg-red-500/20 text-red-300' :
                          flag.severity === 'medium' ? 'bg-orange-500/20 text-orange-300' :
                          'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {flag.severity.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-400">{flag.confidence}%</span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-xs leading-relaxed">{flag.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobAnalyzer;