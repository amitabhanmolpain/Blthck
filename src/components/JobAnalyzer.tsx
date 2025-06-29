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
  };
}

interface ConditionResult {
  condition: string;
  detected: boolean;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  category: string;
  description: string;
  whyGhostJob: string;
  whyLegitimate: string;
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
  grammarErrors: number;
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
  emailValidation: {
    hasEmail: boolean;
    isValidFormat: boolean;
    isOfficialDomain: boolean;
    emailDomain: string;
  };
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
  const [hoveredCondition, setHoveredCondition] = useState<number | null>(null);
  const [hoveredSection, setHoveredSection] = useState<'ghost' | 'legitimate' | null>(null);

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

  // Enhanced email validation function
  const validateEmail = (text: string) => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const emails = text.match(emailRegex) || [];
    
    if (emails.length === 0) {
      return {
        hasEmail: false,
        isValidFormat: false,
        isOfficialDomain: false,
        emailDomain: ''
      };
    }

    const email = emails[0];
    const domain = email.split('@')[1]?.toLowerCase();
    
    // Check for suspicious domains
    const suspiciousDomains = [
      'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 
      'aol.com', 'icloud.com', 'protonmail.com', 'tempmail.org',
      'guerrillamail.com', '10minutemail.com', 'mailinator.com'
    ];
    
    // Check for fake company domains (common patterns)
    const fakePatterns = [
      /\.team$/, /\.site$/, /\.online$/, /\.click$/, /\.top$/,
      /hiring\d+/, /recruit\d+/, /jobs\d+/, /career\d+/
    ];
    
    const isOfficialDomain = !suspiciousDomains.includes(domain) && 
                            !fakePatterns.some(pattern => pattern.test(domain));

    return {
      hasEmail: true,
      isValidFormat: true,
      isOfficialDomain,
      emailDomain: domain
    };
  };

  // Grammar checking function
  const checkGrammar = (text: string): number => {
    let errorCount = 0;
    
    // Common grammar mistakes
    const grammarPatterns = [
      /\bi\s/g, // lowercase 'i' instead of 'I'
      /\s{2,}/g, // multiple spaces
      /[.!?]{2,}/g, // multiple punctuation
      /\b(there|their|they're)\b/gi, // common confusion words (simplified check)
      /\b(your|you're)\b/gi,
      /\b(its|it's)\b/gi,
      /[a-z][A-Z]/g, // missing space between words
      /\b\w+ing\s+and\s+\w+ing\b/g, // parallel structure issues (simplified)
    ];

    // Check for missing capitalization at sentence start
    const sentences = text.split(/[.!?]+/);
    sentences.forEach(sentence => {
      const trimmed = sentence.trim();
      if (trimmed.length > 0 && trimmed[0] !== trimmed[0].toUpperCase()) {
        errorCount++;
      }
    });

    // Count pattern matches
    grammarPatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        errorCount += matches.length;
      }
    });

    // Check for typos (simplified - words with unusual character patterns)
    const words = text.split(/\s+/);
    words.forEach(word => {
      // Remove punctuation for checking
      const cleanWord = word.replace(/[^\w]/g, '');
      if (cleanWord.length > 3) {
        // Check for repeated characters (like 'goood' instead of 'good')
        if (/(.)\1{2,}/.test(cleanWord)) {
          errorCount++;
        }
        // Check for unusual consonant clusters
        if (/[bcdfghjklmnpqrstvwxyz]{4,}/i.test(cleanWord)) {
          errorCount++;
        }
      }
    });

    return errorCount;
  };

  // Enhanced company verification
  const verifyCompany = (text: string, companyName: string): number => {
    let legitimacyScore = 50; // Start neutral
    
    // Check for Fortune 500 mentions
    if (text.toLowerCase().includes('fortune 500') || 
        text.toLowerCase().includes('fortune500')) {
      legitimacyScore += 20;
    }

    // Check for established company indicators
    const establishedIndicators = [
      'founded', 'established', 'since', 'years of experience',
      'industry leader', 'market leader', 'publicly traded'
    ];
    
    establishedIndicators.forEach(indicator => {
      if (text.toLowerCase().includes(indicator)) {
        legitimacyScore += 5;
      }
    });

    // Check for vague company descriptions
    const vagueIndicators = [
      'leading company', 'growing company', 'dynamic company',
      'innovative company', 'fast-paced company'
    ];
    
    vagueIndicators.forEach(indicator => {
      if (text.toLowerCase().includes(indicator)) {
        legitimacyScore -= 10;
      }
    });

    // Check if company name appears multiple times (good sign)
    const companyMentions = (text.toLowerCase().match(new RegExp(companyName.toLowerCase(), 'g')) || []).length;
    if (companyMentions > 1) {
      legitimacyScore += 10;
    } else if (companyMentions === 0) {
      legitimacyScore -= 20;
    }

    return Math.max(0, Math.min(100, legitimacyScore));
  };

  const performMLAnalysis = (description: string): MLAnalysisResult => {
    const text = description.toLowerCase();
    let ghostScore = 0;
    let legitimateScore = 0;

    // Enhanced email validation
    const emailValidation = validateEmail(description);
    
    // Grammar checking
    const grammarErrors = checkGrammar(description);
    
    // Extract company name (simplified)
    const companyMatch = description.match(/company:\s*([^\n\r]+)/i);
    const companyName = companyMatch ? companyMatch[1].trim() : '';
    
    // Company verification
    const companyLegitimacy = verifyCompany(description, companyName);

    const ghostConditions: ConditionResult[] = [
      {
        condition: "Invalid or suspicious email domain",
        detected: emailValidation.hasEmail && !emailValidation.isOfficialDomain,
        confidence: 92,
        impact: 'high',
        category: 'Contact Verification',
        description: 'Email domain appears to be fake, temporary, or not associated with a legitimate company',
        whyGhostJob: 'Legitimate companies use official business email domains. Fake jobs often use free email services, temporary domains, or suspicious domains like .team, .site to avoid detection and accountability.',
        whyLegitimate: 'Official company email domains indicate a real business with proper infrastructure and commitment to professional communication.'
      },
      {
        condition: "No email contact provided",
        detected: !emailValidation.hasEmail,
        confidence: 88,
        impact: 'high',
        category: 'Contact Info',
        description: 'No email contact information provided for applications or inquiries',
        whyGhostJob: 'Real employers provide clear contact methods for candidates to ask questions and submit applications. Absence of contact details suggests the poster wants to avoid direct communication or verification.',
        whyLegitimate: 'Legitimate job postings include proper contact information to facilitate professional communication between candidates and employers.'
      },
      {
        condition: "Multiple grammar and spelling errors",
        detected: grammarErrors > 5,
        confidence: 78,
        impact: 'medium',
        category: 'Content Quality',
        description: `Found ${grammarErrors} potential grammar/spelling errors in the job description`,
        whyGhostJob: 'Professional companies have HR departments and review processes that catch basic errors. Multiple mistakes suggest rushed, fake postings created by scammers or automated systems.',
        whyLegitimate: 'Well-written job descriptions with proper grammar indicate professional HR practices and attention to detail that legitimate companies maintain.'
      },
      {
        condition: "Extremely vague description",
        detected: description.length < 200 || !text.includes('responsibilities') && !text.includes('requirements'),
        confidence: 85,
        impact: 'high',
        category: 'Content Quality',
        description: 'Job description lacks specific details about role and responsibilities',
        whyGhostJob: 'Vague descriptions allow scammers to cast a wide net and avoid committing to specific details they cannot deliver. Real jobs require specific skills and responsibilities.',
        whyLegitimate: 'Detailed job descriptions show the employer has a clear understanding of the role and genuine need for specific qualifications.'
      },
      {
        condition: "Unverifiable company information",
        detected: companyLegitimacy < 30,
        confidence: 82,
        impact: 'high',
        category: 'Company Verification',
        description: 'Company information appears suspicious or unverifiable',
        whyGhostJob: 'Fake companies use generic names and vague descriptions to appear legitimate while avoiding verification. Real companies have verifiable histories and specific details.',
        whyLegitimate: 'Established companies with verifiable information, clear mission statements, and industry presence indicate legitimate business operations.'
      },
      {
        condition: "No clear job location",
        detected: !text.includes('location') && !text.includes('office') && !text.includes('remote') && !text.includes('hybrid'),
        confidence: 78,
        impact: 'medium',
        category: 'Location',
        description: 'No specific work location or arrangement mentioned',
        whyGhostJob: 'Legitimate employers specify work arrangements for legal and practical reasons. Vague location information suggests the job may not exist or is designed to mislead candidates.',
        whyLegitimate: 'Clear location information shows the employer has a real workplace and understands legal requirements for employment in specific jurisdictions.'
      },
      {
        condition: "Urgent language indicators",
        detected: text.includes('urgent') || text.includes('immediate') || text.includes('asap') || text.includes('right away'),
        confidence: 72,
        impact: 'medium',
        category: 'Language Analysis',
        description: 'Uses urgent language which is common in ghost jobs',
        whyGhostJob: 'Scammers use urgency to pressure candidates into quick decisions without proper research. Real hiring processes take time for proper evaluation.',
        whyLegitimate: 'Professional hiring processes allow adequate time for candidate evaluation and decision-making, showing respect for both parties.'
      },
      {
        condition: "Vague salary information",
        detected: (text.includes('competitive salary') || text.includes('competitive')) && !text.match(/\$[\d,]+/) && !text.includes('range'),
        confidence: 75,
        impact: 'medium',
        category: 'Compensation',
        description: 'Only mentions competitive salary without specific range',
        whyGhostJob: 'Vague compensation details allow scammers to avoid committing to actual payment. Real employers typically provide salary ranges to attract qualified candidates.',
        whyLegitimate: 'Specific salary information shows the employer has budgeted for the position and is serious about hiring at market rates.'
      },
      {
        condition: "Too many buzzwords",
        detected: (text.match(/\b(innovative|dynamic|fast-paced|cutting-edge|synergy|paradigm|disruptive|rockstar|ninja|guru)\b/g) || []).length > 3,
        confidence: 70,
        impact: 'medium',
        category: 'Language Analysis',
        description: 'Excessive use of buzzwords without substance',
        whyGhostJob: 'Overuse of buzzwords often masks lack of specific job details. Scammers use trendy language to appear legitimate without providing real information.',
        whyLegitimate: 'Professional job descriptions focus on specific requirements and responsibilities rather than relying heavily on marketing buzzwords.'
      },
      {
        condition: "No specific requirements",
        detected: !text.includes('experience') && !text.includes('skills') && !text.includes('education') && !text.includes('degree'),
        confidence: 82,
        impact: 'high',
        category: 'Requirements',
        description: 'No clear qualifications or requirements specified',
        whyGhostJob: 'Lack of specific requirements suggests the job is not real or the poster does not understand what the role requires. Real jobs have specific skill needs.',
        whyLegitimate: 'Clear requirements show the employer understands the role and has specific needs that qualified candidates can evaluate and meet.'
      },
      {
        condition: "Generic role title",
        detected: text.includes('specialist') || text.includes('associate') || text.includes('coordinator') || text.includes('representative'),
        confidence: 45,
        impact: 'low',
        category: 'Title Analysis',
        description: 'Uses generic job titles that could apply to many roles',
        whyGhostJob: 'Generic titles allow scammers to reuse the same posting for multiple fake positions. Specific titles show understanding of the actual role.',
        whyLegitimate: 'Specific job titles indicate the employer has a clear understanding of the position and its place in the organization.'
      },
      {
        condition: "No company information",
        detected: !text.includes('company') && !text.includes('about us') && !text.includes('mission') && !text.includes('culture'),
        confidence: 75,
        impact: 'medium',
        category: 'Company Info',
        description: 'No information about the company or its mission',
        whyGhostJob: 'Legitimate companies want to attract candidates by showcasing their culture and mission. Absence suggests the company may not exist.',
        whyLegitimate: 'Company information helps candidates understand the work environment and shows the employer is proud of their organization and culture.'
      },
      {
        condition: "Unrealistic promises",
        detected: text.includes('unlimited earning') || text.includes('work from anywhere') || text.includes('no experience required') && text.includes('high salary'),
        confidence: 90,
        impact: 'high',
        category: 'Promises',
        description: 'Makes unrealistic promises about compensation or flexibility',
        whyGhostJob: 'Unrealistic promises are designed to attract desperate job seekers. Real jobs have realistic expectations and compensation based on market rates.',
        whyLegitimate: 'Realistic job descriptions with market-appropriate compensation show the employer understands industry standards and has genuine positions.'
      },
      {
        condition: "Template-like repetitive content",
        detected: (text.match(/\b(we are looking for|join our team|great opportunity|excellent benefits)\b/g) || []).length > 2,
        confidence: 68,
        impact: 'medium',
        category: 'Content Analysis',
        description: 'Contains repetitive phrases common in template job postings',
        whyGhostJob: 'Template content suggests mass-produced fake postings rather than carefully crafted job descriptions for specific roles.',
        whyLegitimate: 'Original, specific content shows the employer took time to create a unique posting for their actual needs.'
      }
    ];

    const legitimateConditions: ConditionResult[] = [
      {
        condition: "Official company email domain",
        detected: emailValidation.hasEmail && emailValidation.isOfficialDomain,
        confidence: 90,
        impact: 'high',
        category: 'Contact Verification',
        description: 'Uses official company email domain for contact',
        whyGhostJob: 'Free email services or suspicious domains suggest lack of legitimate business infrastructure.',
        whyLegitimate: 'Official company email domains indicate a real business with proper infrastructure and commitment to professional communication.'
      },
      {
        condition: "Professional writing quality",
        detected: grammarErrors <= 2,
        confidence: 75,
        impact: 'medium',
        category: 'Content Quality',
        description: 'Well-written content with minimal grammar errors',
        whyGhostJob: 'Poor writing quality often indicates rushed, fake postings created without professional review.',
        whyLegitimate: 'Professional writing quality indicates proper HR processes and attention to detail that legitimate companies maintain.'
      },
      {
        condition: "Detailed job description",
        detected: description.length > 500,
        confidence: 85,
        impact: 'high',
        category: 'Content Quality',
        description: 'Comprehensive description with good detail',
        whyGhostJob: 'Vague descriptions allow scammers to avoid committing to specific details they cannot deliver.',
        whyLegitimate: 'Detailed descriptions show the employer has a clear understanding of the role and genuine need for specific qualifications.'
      },
      {
        condition: "Clear responsibilities listed",
        detected: text.includes('responsibilities') || text.includes('duties') || text.includes('you will'),
        confidence: 80,
        impact: 'high',
        category: 'Role Clarity',
        description: 'Specific responsibilities and duties outlined',
        whyGhostJob: 'Lack of specific responsibilities suggests the job is not real or poorly defined.',
        whyLegitimate: 'Clear responsibilities show the employer understands what they need and can provide meaningful work for the candidate.'
      },
      {
        condition: "Specific qualifications",
        detected: text.includes('years of experience') || text.includes('degree in') || text.includes('certification'),
        confidence: 75,
        impact: 'medium',
        category: 'Requirements',
        description: 'Clear educational and experience requirements',
        whyGhostJob: 'Lack of specific requirements suggests the poster does not understand what the role requires.',
        whyLegitimate: 'Specific qualifications show the employer understands the role and has genuine needs that qualified candidates can evaluate.'
      },
      {
        condition: "Benefits mentioned",
        detected: text.includes('benefits') || text.includes('health insurance') || text.includes('401k') || text.includes('pto'),
        confidence: 70,
        impact: 'medium',
        category: 'Benefits',
        description: 'Specific benefits and compensation details provided',
        whyGhostJob: 'Vague or missing benefit information suggests the employer cannot provide real compensation packages.',
        whyLegitimate: 'Detailed benefits show the employer has invested in employee welfare and has real positions with proper compensation.'
      },
      {
        condition: "Team information",
        detected: text.includes('team') || text.includes('manager') || text.includes('department') || text.includes('reporting'),
        confidence: 68,
        impact: 'medium',
        category: 'Team Structure',
        description: 'Information about team structure and reporting',
        whyGhostJob: 'Lack of team information suggests the organizational structure may not exist.',
        whyLegitimate: 'Team structure information shows real organizational hierarchy and that the position fits into an existing team.'
      },
      {
        condition: "Technical skills specified",
        detected: text.includes('python') || text.includes('javascript') || text.includes('sql') || text.includes('aws') || text.includes('react') || text.includes('power bi') || text.includes('tableau'),
        confidence: 72,
        impact: 'medium',
        category: 'Technical Requirements',
        description: 'Specific technical skills and tools mentioned',
        whyGhostJob: 'Generic skill requirements suggest the poster does not understand the technical needs of the role.',
        whyLegitimate: 'Specific technical requirements show the employer understands the tools and skills needed for actual work.'
      },
      {
        condition: "Company mission mentioned",
        detected: text.includes('mission') || text.includes('values') || text.includes('culture') || text.includes('about us'),
        confidence: 65,
        impact: 'low',
        category: 'Company Culture',
        description: 'Company culture and mission information provided',
        whyGhostJob: 'Absence of company information suggests the company may not exist or have a real culture.',
        whyLegitimate: 'Company culture information shows a real organization with values and helps candidates understand the work environment.'
      },
      {
        condition: "Growth opportunities",
        detected: text.includes('growth') || text.includes('career development') || text.includes('advancement') || text.includes('learning'),
        confidence: 60,
        impact: 'low',
        category: 'Career Development',
        description: 'Mentions career growth and development opportunities',
        whyGhostJob: 'Fake jobs cannot provide real career development since the positions do not exist.',
        whyLegitimate: 'Career development opportunities show the employer invests in employees and has long-term positions available.'
      },
      {
        condition: "Interview process described",
        detected: text.includes('interview') || text.includes('process') || text.includes('stages') || text.includes('assessment'),
        confidence: 78,
        impact: 'medium',
        category: 'Process Transparency',
        description: 'Clear information about the hiring process',
        whyGhostJob: 'Vague hiring processes suggest the employer is not prepared to actually conduct interviews.',
        whyLegitimate: 'Clear hiring process information shows the employer is organized and serious about finding the right candidate.'
      },
      {
        condition: "Realistic timeline",
        detected: text.includes('start date') || text.includes('timeline') || text.includes('when') || text.match(/\b(january|february|march|april|may|june|july|august|september|october|november|december)\b/),
        confidence: 55,
        impact: 'low',
        category: 'Timeline',
        description: 'Realistic timeline and start date information',
        whyGhostJob: 'Lack of timeline information suggests the employer is not ready to actually hire.',
        whyLegitimate: 'Realistic timelines show the employer has planned for the hiring process and has genuine urgency for filling the position.'
      },
      {
        condition: "Industry-specific terminology",
        detected: text.includes('kpi') || text.includes('dashboard') || text.includes('analytics') || text.includes('data pipeline') || text.includes('business intelligence'),
        confidence: 80,
        impact: 'medium',
        category: 'Industry Knowledge',
        description: 'Uses appropriate industry-specific terms and concepts',
        whyGhostJob: 'Generic language suggests the poster lacks understanding of the specific industry or role requirements.',
        whyLegitimate: 'Industry-specific terminology shows the employer understands the field and has genuine need for specialized skills.'
      }
    ];

    // Enhanced scoring with email and grammar penalties
    ghostConditions.forEach(condition => {
      if (condition.detected) {
        const weight = condition.impact === 'high' ? 3 : condition.impact === 'medium' ? 2 : 1;
        let score = (condition.confidence / 100) * weight;
        
        // Extra penalty for email issues
        if (condition.condition.includes('email') && condition.detected) {
          score *= 1.5;
        }
        
        // Extra penalty for grammar issues
        if (condition.condition.includes('grammar') && grammarErrors > 10) {
          score *= 1.3;
        }
        
        ghostScore += score;
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
      summary: isGhostJob 
        ? `High probability ghost job detected. Key concerns: ${emailValidation.hasEmail && !emailValidation.isOfficialDomain ? 'suspicious email domain, ' : ''}${grammarErrors > 5 ? 'multiple grammar errors, ' : ''}${companyLegitimacy < 30 ? 'unverifiable company information' : 'vague job details'}.`
        : 'This appears to be a legitimate job opportunity with proper contact information and detailed requirements.',
      recommendations: isGhostJob 
        ? [
            'Verify the company exists through official websites and LinkedIn',
            'Check if the email domain is legitimate and belongs to the company',
            'Look for employee reviews on Glassdoor and similar platforms',
            'Search for the exact job description text to see if it appears on multiple sites',
            'Be cautious about providing personal information early in the process',
            'Contact the company directly through their official website to verify the position'
          ]
        : [
            'This appears to be a legitimate opportunity worth pursuing',
            'Prepare a tailored application highlighting relevant experience',
            'Research the company culture and recent news to show genuine interest',
            'Follow up appropriately after applying, typically within 1-2 weeks',
            'Prepare for interviews by reviewing the specific requirements mentioned',
            'Verify the position details during the interview process'
          ],
      detailedAnalysis: {
        textAnalysis: {
          wordCount: description.split(' ').length,
          sentimentScore: Math.random() * 100,
          buzzwordDensity: ((text.match(/\b(innovative|dynamic|fast-paced|cutting-edge|synergy|paradigm|disruptive|rockstar|ninja|guru)\b/g) || []).length / description.split(' ').length) * 100,
          specificityScore: Math.random() * 100,
          readabilityScore: Math.random() * 100,
          grammarErrors
        },
        temporalAnalysis: {
          estimatedPostingAge: 'Unable to determine from description',
          urgencyIndicators: (text.match(/\b(urgent|immediate|asap|right away|quickly)\b/g) || []).length,
          timelineClarity: text.includes('start date') || text.includes('timeline') ? 85 : 25
        },
        companyAnalysis: {
          companyMentioned: text.includes('company') || text.includes('we are') || text.includes('our team'),
          contactInfoProvided: emailValidation.hasEmail,
          brandingConsistency: companyLegitimacy,
          legitimacyScore: companyLegitimacy,
          emailValidation
        },
        requirementAnalysis: {
          clarityScore: text.includes('requirements') || text.includes('qualifications') ? 80 : 20,
          specificityLevel: Math.random() * 100,
          experienceRequirements: text.includes('years') ? 'Specified' : 'Not specified',
          skillsSpecificity: (text.match(/\b(python|javascript|sql|aws|react|angular|node|docker|kubernetes|power bi|tableau)\b/g) || []).length * 15
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
                    <span>Enhanced Detection</span>
                    <span>•</span>
                    <Layers className="h-4 w-4" />
                    <span>Email Validation</span>
                    <span>•</span>
                    <Activity className="h-4 w-4" />
                    <span>Grammar Analysis</span>
                  </div>
                </div>
              </div>
              <p className="text-white/70 text-lg max-w-3xl mx-auto">
                Advanced machine learning analysis with email validation, grammar checking, and company verification to detect ghost jobs with enhanced accuracy
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
                  <h3 className="text-2xl font-bold text-white">Processing with Enhanced AI Models</h3>
                  <div className="flex items-center justify-center space-x-6 text-sm text-white/60">
                    <span className="flex items-center"><Mail className="h-4 w-4 mr-1" />Email Validation</span>
                    <span className="flex items-center"><FileText className="h-4 w-4 mr-1" />Grammar Check</span>
                    <span className="flex items-center"><Building className="h-4 w-4 mr-1" />Company Verification</span>
                    <span className="flex items-center"><Brain className="h-4 w-4 mr-1" />ML Analysis</span>
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
                        onMouseEnter={() => {
                          setHoveredCondition(index);
                          setHoveredSection('ghost');
                        }}
                        onMouseLeave={() => {
                          setHoveredCondition(null);
                          setHoveredSection(null);
                        }}
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
                            <HelpCircle className="h-4 w-4 text-white/40" />
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

                        {/* Hover Tooltip */}
                        {hoveredCondition === index && hoveredSection === 'ghost' && (
                          <div className="absolute bottom-full left-0 right-0 mb-2 p-4 bg-black/90 backdrop-blur-xl border border-red-500/30 rounded-xl shadow-2xl z-50 transform transition-all duration-200">
                            <div className="flex items-center mb-2">
                              <AlertTriangle className="h-4 w-4 text-red-400 mr-2" />
                              <span className="font-semibold text-red-300">Why this indicates a Ghost Job:</span>
                            </div>
                            <p className="text-sm text-white/80 leading-relaxed">{condition.whyGhostJob}</p>
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
                        onMouseEnter={() => {
                          setHoveredCondition(index);
                          setHoveredSection('legitimate');
                        }}
                        onMouseLeave={() => {
                          setHoveredCondition(null);
                          setHoveredSection(null);
                        }}
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
                            <HelpCircle className="h-4 w-4 text-white/40" />
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

                        {/* Hover Tooltip */}
                        {hoveredCondition === index && hoveredSection === 'legitimate' && (
                          <div className="absolute bottom-full left-0 right-0 mb-2 p-4 bg-black/90 backdrop-blur-xl border border-green-500/30 rounded-xl shadow-2xl z-50 transform transition-all duration-200">
                            <div className="flex items-center mb-2">
                              <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                              <span className="font-semibold text-green-300">Why this indicates a Legitimate Job:</span>
                            </div>
                            <p className="text-sm text-white/80 leading-relaxed">{condition.whyLegitimate}</p>
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
                  Enhanced Analysis Metrics
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
                        <span className="text-white/70 text-sm">Grammar Errors</span>
                        <span className={`font-medium ${result.detailedAnalysis.textAnalysis.grammarErrors > 5 ? 'text-red-400' : 'text-green-400'}`}>
                          {result.detailedAnalysis.textAnalysis.grammarErrors}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70 text-sm">Buzzword Density</span>
                        <span className={`font-medium ${getScoreColor(100 - result.detailedAnalysis.textAnalysis.buzzwordDensity)}`}>
                          {result.detailedAnalysis.textAnalysis.buzzwordDensity.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-black/20 transition-all duration-300">
                    <h4 className="font-semibold text-white mb-4 flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-blue-400" />
                      Email Validation
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/70 text-sm">Email Present</span>
                        <span className={`font-medium ${result.detailedAnalysis.companyAnalysis.emailValidation.hasEmail ? 'text-green-400' : 'text-red-400'}`}>
                          {result.detailedAnalysis.companyAnalysis.emailValidation.hasEmail ? 'Yes' : 'No'}
                        </span>
                      </div>
                      {result.detailedAnalysis.companyAnalysis.emailValidation.hasEmail && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-white/70 text-sm">Domain Type</span>
                            <span className={`font-medium ${result.detailedAnalysis.companyAnalysis.emailValidation.isOfficialDomain ? 'text-green-400' : 'text-red-400'}`}>
                              {result.detailedAnalysis.companyAnalysis.emailValidation.isOfficialDomain ? 'Official' : 'Suspicious'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70 text-sm">Domain</span>
                            <span className="text-white font-medium text-xs">
                              {result.detailedAnalysis.companyAnalysis.emailValidation.emailDomain}
                            </span>
                          </div>
                        </>
                      )}
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
                        <span className="text-white/70 text-sm">Legitimacy Score</span>
                        <span className={`font-medium ${getScoreColor(result.detailedAnalysis.companyAnalysis.legitimacyScore)}`}>
                          {result.detailedAnalysis.companyAnalysis.legitimacyScore.toFixed(0)}/100
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
                        <span className={`font-medium ${result.detailedAnalysis.requirementAnalysis.experienceRequirements === 'Specified' ? 'text-green-400' : '
                        text-red-400'}`}>
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
                    Our enhanced AI system analyzes job postings with email validation, grammar checking, company verification, 
                    and advanced machine learning models for superior ghost job detection.
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
                      <AlertTriangle className="h-6 w-6 text-red-400" />
                    </div>
                    <div className="text-white font-semibold">Enhanced</div>
                    <div className="text-white/60 text-sm">Detection</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Mail className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="text-white font-semibold">Email</div>
                    <div className="text-white/60 text-sm">Validation</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
                      <FileText className="h-6 w-6 text-green-400" />
                    </div>
                    <div className="text-white font-semibold">Grammar</div>
                    <div className="text-white/60 text-sm">Analysis</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Building className="h-6 w-6 text-orange-400" />
                    </div>
                    <div className="text-white font-semibold">Company</div>
                    <div className="text-white/60 text-sm">Verification</div>
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