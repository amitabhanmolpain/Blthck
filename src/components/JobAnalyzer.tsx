import React, { useState } from 'react';
import { 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  Copy, 
  Trash2, 
  HelpCircle,
  Mail,
  Building,
  Calendar,
  DollarSign,
  MapPin,
  Users,
  FileText,
  Target,
  Shield,
  Eye,
  Clock,
  Zap
} from 'lucide-react';

interface AnalysisResult {
  isGhostJob: boolean;
  confidence: number;
  ghostConditions: Array<{
    condition: string;
    present: boolean;
    weight: number;
    explanation: string;
  }>;
  legitimateConditions: Array<{
    condition: string;
    present: boolean;
    weight: number;
    explanation: string;
  }>;
  overallScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  summary: string;
}

const JobAnalyzer: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Email validation function
  const validateEmail = (email: string): { isValid: boolean; domain: string; type: string; flags: string[] } => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    if (!isValid) {
      return { isValid: false, domain: '', type: 'invalid', flags: ['Invalid email format'] };
    }

    const domain = email.split('@')[1].toLowerCase();
    const flags: string[] = [];
    let type = 'corporate';

    // Free email providers
    const freeProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com'];
    if (freeProviders.includes(domain)) {
      type = 'free';
      flags.push('Free email provider');
    }

    // Suspicious domains
    const suspiciousTlds = ['.team', '.click', '.xyz', '.tk', '.ml', '.ga', '.cf'];
    if (suspiciousTlds.some(tld => domain.endsWith(tld))) {
      type = 'suspicious';
      flags.push('Suspicious domain extension');
    }

    // Generic job domains
    const jobDomains = ['jobmail', 'hiringnow', 'careers', 'recruit'];
    if (jobDomains.some(keyword => domain.includes(keyword))) {
      type = 'suspicious';
      flags.push('Generic job domain');
    }

    return { isValid, domain, type, flags };
  };

  // Grammar analysis function
  const analyzeGrammar = (text: string): { errorCount: number; errors: string[]; score: number } => {
    const errors: string[] = [];
    let errorCount = 0;

    // Check for common grammar issues
    const grammarPatterns = [
      { pattern: /\b(there|their|they're)\b/gi, check: (match: string, context: string) => {
        // Simplified check - in real implementation, would need more sophisticated NLP
        return false;
      }},
      { pattern: /\s{2,}/g, error: 'Multiple spaces' },
      { pattern: /[.!?]\s*[a-z]/g, error: 'Missing capitalization after punctuation' },
      { pattern: /\b[A-Z]{2,}\b/g, error: 'Excessive capitalization' },
      { pattern: /[^\s][.!?][^\s]/g, error: 'Missing space after punctuation' },
    ];

    // Count spelling and grammar errors
    const words = text.split(/\s+/);
    const commonMisspellings = ['recieve', 'seperate', 'occured', 'definately', 'accomodate'];
    
    words.forEach(word => {
      const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
      if (commonMisspellings.includes(cleanWord)) {
        errors.push(`Misspelling: ${word}`);
        errorCount++;
      }
    });

    // Check grammar patterns
    grammarPatterns.forEach(({ pattern, error }) => {
      const matches = text.match(pattern);
      if (matches) {
        errorCount += matches.length;
        if (error) errors.push(`${error} (${matches.length} instances)`);
      }
    });

    // Calculate score (0-100, where 100 is perfect)
    const maxErrors = Math.max(words.length * 0.1, 10); // Allow up to 10% errors
    const score = Math.max(0, Math.min(100, 100 - (errorCount / maxErrors) * 100));

    return { errorCount, errors, score };
  };

  const analyzeJob = (description: string): AnalysisResult => {
    const text = description.toLowerCase();
    let ghostScore = 0;
    let legitimateScore = 0;

    // Extract emails from description
    const emailMatches = description.match(/[^\s@]+@[^\s@]+\.[^\s@]+/g) || [];
    
    // Grammar analysis
    const grammarAnalysis = analyzeGrammar(description);

    // GHOST JOB CONDITIONS (Red Flags)
    const ghostConditions = [
      {
        condition: "Generic or vague job title",
        present: /\b(developer|engineer|hiring now|join us|opportunity|position available)\b/.test(text) && 
                !/\b(senior|junior|lead|principal|specific technology)\b/.test(text),
        weight: 3,
        explanation: "Generic titles like 'Developer' or 'Engineer' without specifics often indicate template postings used to collect resumes rather than fill specific roles."
      },
      {
        condition: "Vague or missing job responsibilities",
        present: /\b(exciting projects|dynamic environment|various tasks|you'll be working on)\b/.test(text) && 
                description.split('\n').filter(line => line.trim().startsWith('-') || line.trim().startsWith('•')).length < 3,
        weight: 4,
        explanation: "Legitimate jobs list specific tasks. Vague phrases like 'exciting projects' suggest the company doesn't have actual work defined."
      },
      {
        condition: "No required qualifications or skills listed",
        present: /\b(passionate individuals|always looking|anyone|no experience)\b/.test(text) && 
                !/\b(\d+\s*years?|experience with|proficient in|knowledge of)\b/.test(text),
        weight: 4,
        explanation: "Real jobs have specific skill requirements. 'Passionate individuals' suggests they're not looking for particular expertise."
      },
      {
        condition: "No salary or compensation info",
        present: /\b(competitive|attractive|excellent)\b/.test(text) && 
                !/\b(\$|₹|€|£|\d+k|\d+,\d+|salary range|per hour|annually)\b/.test(text),
        weight: 3,
        explanation: "Legitimate employers usually provide salary ranges. 'Competitive salary' without numbers is often used to avoid commitment."
      },
      {
        condition: "No posting or expiration date",
        present: !/\b(posted|expires|deadline|apply by|closing date)\b/.test(text),
        weight: 2,
        explanation: "Real job postings have timelines. Missing dates suggest the posting may stay online indefinitely to collect resumes."
      },
      {
        condition: "Uses 'ongoing hiring' or 'always accepting' phrases",
        present: /\b(ongoing hiring|always accepting|continuous recruitment|rolling basis|open positions)\b/.test(text),
        weight: 3,
        explanation: "These phrases suggest there's no active hiring process, just resume collection for potential future use."
      },
      {
        condition: "No recruiter/contact details",
        present: emailMatches.length === 0 && !/\b(contact|recruiter|hiring manager|hr|human resources)\b/.test(text),
        weight: 2,
        explanation: "Legitimate jobs provide contact information. Missing contacts make it impossible to verify the opportunity."
      },
      {
        condition: "Suspicious or personal email domain",
        present: emailMatches.some(email => {
          const validation = validateEmail(email);
          return validation.type === 'free' || validation.type === 'suspicious';
        }),
        weight: 4,
        explanation: "Professional companies use corporate email domains. Personal emails (@gmail.com) or suspicious domains (.team, .xyz) are red flags."
      },
      {
        condition: "Posted by unknown or unverifiable company",
        present: /\b(group|solutions|consulting|services|inc|llc)\b/.test(text) && 
                !/\b(google|microsoft|amazon|apple|meta|netflix|uber|airbnb)\b/.test(text),
        weight: 3,
        explanation: "Generic company names with common suffixes often indicate fake companies. Real companies have verifiable online presence."
      },
      {
        condition: "Mentions 'only shortlisted candidates will be contacted'",
        present: /\b(only shortlisted|shortlisted candidates|due to high volume|only selected)\b/.test(text),
        weight: 2,
        explanation: "This phrase is commonly used to justify never responding to applicants, even for legitimate interest."
      },
      {
        condition: "Buzzword-heavy without substance",
        present: (text.match(/\b(dynamic|exciting|fast-paced|innovative|cutting-edge|world-class|leading|premier)\b/g) || []).length > 3 &&
                description.split(' ').length < 200,
        weight: 2,
        explanation: "Excessive buzzwords without concrete details suggest the posting is designed to sound appealing rather than describe real work."
      },
      {
        condition: "No location or only 'Remote' with no region",
        present: /\b(remote|anywhere|global|worldwide)\b/.test(text) && 
                !/\b(timezone|utc|est|pst|europe|asia|america|specific city)\b/.test(text),
        weight: 2,
        explanation: "Legitimate remote jobs specify timezones or regions. Vague location suggests they're not planning actual coordination."
      },
      {
        condition: "Poor grammar and spelling errors",
        present: grammarAnalysis.errorCount > 5 || grammarAnalysis.score < 70,
        weight: 3,
        explanation: `Professional companies proofread job postings. Found ${grammarAnalysis.errorCount} errors with quality score of ${grammarAnalysis.score.toFixed(1)}/100.`
      },
      {
        condition: "Redirects to vague application pages",
        present: /\b(form|submit|send|email|apply now)\b/.test(text) && 
                !/\b(careers\.|company\.com|official|portal)\b/.test(text),
        weight: 3,
        explanation: "Legitimate jobs direct to official company career pages. Generic forms or external sites are suspicious."
      }
    ];

    // LEGITIMATE JOB CONDITIONS (Green Flags)
    const legitimateConditions = [
      {
        condition: "Clearly defined job title",
        present: /\b(senior|junior|lead|principal|manager|director|analyst|specialist)\b/.test(text) ||
                /\b(react|python|java|node\.js|aws|kubernetes|sql)\b/.test(text),
        weight: -4,
        explanation: "Specific titles with seniority levels or technologies indicate well-defined roles with clear expectations."
      },
      {
        condition: "Detailed job responsibilities",
        present: description.split('\n').filter(line => 
          line.trim().startsWith('-') || 
          line.trim().startsWith('•') || 
          line.trim().startsWith('*')
        ).length >= 5,
        weight: -5,
        explanation: "Multiple specific responsibilities listed show the company knows exactly what work needs to be done."
      },
      {
        condition: "Specific skills/experience mentioned",
        present: /\b(\d+\+?\s*years?|experience with|proficient in|knowledge of|familiar with)\b/.test(text) &&
                /\b(react|python|java|sql|aws|docker|kubernetes|agile|scrum)\b/.test(text),
        weight: -4,
        explanation: "Specific technical skills and experience requirements indicate the company knows what expertise they need."
      },
      {
        condition: "Company is known and verified",
        present: /\b(google|microsoft|amazon|apple|meta|netflix|uber|airbnb|salesforce|oracle)\b/.test(text),
        weight: -5,
        explanation: "Well-known companies with verifiable presence are highly unlikely to post ghost jobs."
      },
      {
        condition: "Provides salary range or structure",
        present: /\b(\$\d+|\₹\d+|€\d+|£\d+|\d+k|\d+,\d+|salary range|per hour|annually|lpa)\b/.test(text),
        weight: -4,
        explanation: "Specific salary information shows the company has budgeted for the role and is serious about hiring."
      },
      {
        condition: "Recruiter or hiring manager is visible",
        present: /\b(recruiter|hiring manager|hr|contact|reach out to)\b/.test(text) &&
                emailMatches.some(email => validateEmail(email).type === 'corporate'),
        weight: -3,
        explanation: "Named contacts with corporate emails indicate transparency and accountability in the hiring process."
      },
      {
        condition: "Mentions team or department clearly",
        present: /\b(join our|team|department|engineering|marketing|sales|product|devops)\b/.test(text),
        weight: -3,
        explanation: "Specific team mentions show the role fits into an existing organizational structure."
      },
      {
        condition: "Includes benefits/perks in detail",
        present: /\b(health insurance|401k|pto|paid time off|dental|vision|stock options|equity)\b/.test(text),
        weight: -3,
        explanation: "Detailed benefits indicate the company has established HR policies and is prepared for new hires."
      },
      {
        condition: "Mentions KPIs or performance metrics",
        present: /\b(kpi|metrics|performance|goals|targets|deliverables|quarterly|monthly)\b/.test(text),
        weight: -3,
        explanation: "Performance expectations show the company has clear success criteria and management processes."
      },
      {
        condition: "Follows professional writing standards",
        present: grammarAnalysis.errorCount <= 2 && grammarAnalysis.score >= 85,
        weight: -2,
        explanation: `Professional writing quality (${grammarAnalysis.score.toFixed(1)}/100 score) indicates serious company standards.`
      },
      {
        condition: "Includes diversity and inclusion statements",
        present: /\b(equal opportunity|diversity|inclusion|eoe|disability|veteran|minorities)\b/.test(text),
        weight: -2,
        explanation: "D&I statements show the company follows professional hiring practices and legal compliance."
      },
      {
        condition: "Application leads to official company page",
        present: /\b(careers\.|company\.com|official|portal|apply at)\b/.test(text),
        weight: -3,
        explanation: "Official career page applications indicate legitimate company infrastructure and processes."
      },
      {
        condition: "Clear posting date and timeline",
        present: /\b(posted|expires|deadline|apply by|closing date|\d+\s*days?\s*ago)\b/.test(text),
        weight: -2,
        explanation: "Clear timelines show active hiring with defined processes and urgency."
      }
    ];

    // Calculate scores
    ghostConditions.forEach(condition => {
      if (condition.present) {
        ghostScore += condition.weight;
      }
    });

    legitimateConditions.forEach(condition => {
      if (condition.present) {
        legitimateScore += condition.weight; // These are negative weights
      }
    });

    const overallScore = ghostScore + legitimateScore;

    // Determine risk level and final classification
    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    let isGhostJob: boolean;
    let confidence: number;

    if (overallScore >= 8) {
      riskLevel = 'HIGH';
      isGhostJob = true;
      confidence = Math.min(95, 70 + (overallScore - 8) * 3);
    } else if (overallScore >= 3) {
      riskLevel = 'MEDIUM';
      isGhostJob = true;
      confidence = Math.min(80, 50 + (overallScore - 3) * 4);
    } else if (overallScore >= -2) {
      riskLevel = 'MEDIUM';
      isGhostJob = false;
      confidence = Math.min(70, 40 + Math.abs(overallScore) * 5);
    } else {
      riskLevel = 'LOW';
      isGhostJob = false;
      confidence = Math.min(95, 60 + Math.abs(overallScore) * 3);
    }

    // Generate summary
    const presentGhostFlags = ghostConditions.filter(c => c.present).length;
    const presentLegitFlags = legitimateConditions.filter(c => c.present).length;
    
    let summary: string;
    if (isGhostJob) {
      summary = `This posting shows ${presentGhostFlags} ghost job red flags and ${presentLegitFlags} legitimate indicators. The high number of suspicious patterns suggests this is likely a ghost job designed to collect resumes rather than fill an actual position.`;
    } else {
      summary = `This posting shows ${presentLegitFlags} legitimate job indicators and ${presentGhostFlags} potential red flags. The professional structure and specific details suggest this is likely a genuine hiring opportunity.`;
    }

    return {
      isGhostJob,
      confidence,
      ghostConditions,
      legitimateConditions,
      overallScore,
      riskLevel,
      summary
    };
  };

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = analyzeJob(jobDescription);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  const handleClear = () => {
    setJobDescription('');
    setAnalysis(null);
  };

  const handleCopy = () => {
    if (analysis) {
      const result = `Ghost Job Analysis Result:
${analysis.isGhostJob ? '❌ GHOST JOB DETECTED' : '✅ LEGITIMATE JOB'}
Confidence: ${analysis.confidence}%
Risk Level: ${analysis.riskLevel}

${analysis.summary}`;
      
      navigator.clipboard.writeText(result);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Input Section */}
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI Job Analyzer</h2>
            <p className="text-gray-300">Paste any job description to detect ghost jobs instantly</p>
          </div>
        </div>

        <div className="space-y-4">
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the complete job description here..."
            className="w-full h-64 p-4 bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-white/20 transition-all duration-300 resize-none"
          />
          
          <div className="flex flex-col sm:flex-row gap-4">
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

      {/* Results Section */}
      {analysis && (
        <div className="space-y-6">
          {/* Main Result Card */}
          <div className={`bg-black/20 backdrop-blur-xl border rounded-3xl p-8 shadow-2xl ${
            analysis.isGhostJob 
              ? 'border-red-500/30 bg-gradient-to-br from-red-900/10 to-black/20' 
              : 'border-green-500/30 bg-gradient-to-br from-green-900/10 to-black/20'
          }`}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`p-4 rounded-2xl shadow-lg ${
                  analysis.isGhostJob 
                    ? 'bg-gradient-to-r from-red-600 to-red-700' 
                    : 'bg-gradient-to-r from-green-600 to-green-700'
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
                  <div className="flex items-center space-x-4">
                    <span className="text-white text-lg">
                      Confidence: <span className="font-bold">{analysis.confidence}%</span>
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      analysis.riskLevel === 'HIGH' ? 'bg-red-500/20 text-red-300 border border-red-400/30' :
                      analysis.riskLevel === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30' :
                      'bg-green-500/20 text-green-300 border border-green-400/30'
                    }`}>
                      {analysis.riskLevel} RISK
                    </span>
                  </div>
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

            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-3">Analysis Summary</h4>
              <p className="text-gray-300 leading-relaxed">{analysis.summary}</p>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ghost Job Conditions */}
            <div className="bg-black/20 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <AlertTriangle className="h-6 w-6 text-red-400" />
                <h4 className="text-xl font-bold text-white">Ghost Job Red Flags</h4>
              </div>
              
              <div className="space-y-3">
                {analysis.ghostConditions.map((condition, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-300 ${
                      condition.present
                        ? 'bg-red-500/10 border-red-400/30 text-red-300'
                        : 'bg-black/20 border-white/10 text-gray-400'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        condition.present ? 'bg-red-400' : 'bg-gray-500'
                      }`}></div>
                      <span className="text-sm font-medium">{condition.condition}</span>
                      <div className="group relative">
                        <HelpCircle className="h-4 w-4 text-gray-400 hover:text-white cursor-help" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 w-64">
                          {condition.explanation}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold">+{condition.weight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Legitimate Job Conditions */}
            <div className="bg-black/20 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <h4 className="text-xl font-bold text-white">Legitimate Job Indicators</h4>
              </div>
              
              <div className="space-y-3">
                {analysis.legitimateConditions.map((condition, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-300 ${
                      condition.present
                        ? 'bg-green-500/10 border-green-400/30 text-green-300'
                        : 'bg-black/20 border-white/10 text-gray-400'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        condition.present ? 'bg-green-400' : 'bg-gray-500'
                      }`}></div>
                      <span className="text-sm font-medium">{condition.condition}</span>
                      <div className="group relative">
                        <HelpCircle className="h-4 w-4 text-gray-400 hover:text-white cursor-help" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 w-64">
                          {condition.explanation}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold">{condition.weight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <h4 className="text-xl font-bold text-white mb-4 flex items-center">
              <Target className="h-6 w-6 mr-3 text-purple-400" />
              Scoring Breakdown
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-black/20 backdrop-blur-sm border border-red-400/20 rounded-xl">
                <div className="text-2xl font-bold text-red-400 mb-2">
                  +{analysis.ghostConditions.filter(c => c.present).reduce((sum, c) => sum + c.weight, 0)}
                </div>
                <div className="text-sm text-gray-300">Ghost Job Score</div>
                <div className="text-xs text-gray-400 mt-1">
                  {analysis.ghostConditions.filter(c => c.present).length} red flags detected
                </div>
              </div>
              
              <div className="text-center p-4 bg-black/20 backdrop-blur-sm border border-green-400/20 rounded-xl">
                <div className="text-2xl font-bold text-green-400 mb-2">
                  {analysis.legitimateConditions.filter(c => c.present).reduce((sum, c) => sum + c.weight, 0)}
                </div>
                <div className="text-sm text-gray-300">Legitimate Score</div>
                <div className="text-xs text-gray-400 mt-1">
                  {analysis.legitimateConditions.filter(c => c.present).length} positive indicators
                </div>
              </div>
              
              <div className="text-center p-4 bg-black/20 backdrop-blur-sm border border-purple-400/20 rounded-xl">
                <div className={`text-2xl font-bold mb-2 ${
                  analysis.overallScore > 0 ? 'text-red-400' : 'text-green-400'
                }`}>
                  {analysis.overallScore > 0 ? '+' : ''}{analysis.overallScore}
                </div>
                <div className="text-sm text-gray-300">Final Score</div>
                <div className="text-xs text-gray-400 mt-1">
                  {analysis.overallScore >= 8 ? 'High Risk' : 
                   analysis.overallScore >= 3 ? 'Medium Risk' : 
                   analysis.overallScore >= -2 ? 'Low Risk' : 'Very Low Risk'}
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl">
              <h5 className="text-sm font-semibold text-white mb-2">Scoring Guide:</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-300">
                <div>Score ≥ +8: <span className="text-red-400 font-bold">High Risk Ghost Job</span></div>
                <div>Score +3 to +7: <span className="text-yellow-400 font-bold">Medium Risk</span></div>
                <div>Score -2 to +2: <span className="text-yellow-400 font-bold">Uncertain</span></div>
                <div>Score ≤ -3: <span className="text-green-400 font-bold">Likely Legitimate</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobAnalyzer;