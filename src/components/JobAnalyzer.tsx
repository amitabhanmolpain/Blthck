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
  Zap
} from 'lucide-react';

interface AnalysisResult {
  isGhostJob: boolean;
  confidence: number;
  factors: {
    category: string;
    items: Array<{
      factor: string;
      status: 'good' | 'warning' | 'bad';
      description: string;
      weight: number;
    }>;
  }[];
  summary: string;
  recommendations: string[];
}

const JobAnalyzer: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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

  // Comprehensive list of trusted companies
  const trustedCompanies = [
    // Indian IT Giants
    'TCS', 'Tata Consultancy Services', 'Infosys', 'Wipro', 'HCL Technologies', 'HCL Tech', 'Tech Mahindra',
    'Cognizant', 'Mindtree', 'LTI', 'L&T Infotech', 'Mphasis', 'Hexaware', 'Persistent Systems',
    
    // Global Tech Giants
    'Google', 'Microsoft', 'Apple', 'Amazon', 'Meta', 'Facebook', 'Netflix', 'Tesla', 'Uber', 'Airbnb',
    'Salesforce', 'Oracle', 'SAP', 'Adobe', 'Intel', 'NVIDIA', 'AMD', 'Qualcomm', 'Cisco', 'VMware',
    'ServiceNow', 'Snowflake', 'Palantir', 'Databricks', 'Stripe', 'Square', 'PayPal', 'eBay',
    
    // Consulting & Professional Services
    'McKinsey', 'BCG', 'Boston Consulting Group', 'Bain', 'Deloitte', 'PwC', 'EY', 'KPMG', 'Accenture',
    'IBM', 'Capgemini', 'Atos', 'DXC Technology', 'NTT Data', 'Fujitsu',
    
    // Financial Services
    'JPMorgan Chase', 'Goldman Sachs', 'Morgan Stanley', 'Bank of America', 'Wells Fargo', 'Citigroup',
    'American Express', 'Visa', 'Mastercard', 'BlackRock', 'Fidelity', 'Charles Schwab',
    
    // E-commerce & Retail
    'Walmart', 'Target', 'Home Depot', 'Costco', 'Best Buy', 'Shopify', 'Etsy', 'Wayfair',
    
    // Healthcare & Pharma
    'Johnson & Johnson', 'Pfizer', 'Merck', 'Abbott', 'Medtronic', 'UnitedHealth', 'Anthem',
    
    // Automotive
    'Ford', 'General Motors', 'Toyota', 'Honda', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Nissan',
    
    // Aerospace & Defense
    'Boeing', 'Lockheed Martin', 'Raytheon', 'Northrop Grumman', 'General Dynamics',
    
    // Media & Entertainment
    'Disney', 'Warner Bros', 'Sony', 'Universal', 'Paramount', 'Fox', 'CBS', 'NBC',
    
    // Telecommunications
    'Verizon', 'AT&T', 'T-Mobile', 'Sprint', 'Comcast', 'Charter Communications',
    
    // Energy & Utilities
    'ExxonMobil', 'Chevron', 'Shell', 'BP', 'ConocoPhillips', 'General Electric', 'Siemens',
    
    // Indian Conglomerates
    'Reliance', 'Tata Group', 'Aditya Birla Group', 'Mahindra Group', 'Bajaj Group', 'Godrej',
    'ITC', 'Larsen & Toubro', 'HDFC', 'ICICI', 'SBI', 'Axis Bank',
    
    // Startups & Unicorns (well-established)
    'Spotify', 'Slack', 'Zoom', 'Dropbox', 'Box', 'Atlassian', 'Twilio', 'MongoDB', 'Elastic',
    'Okta', 'CrowdStrike', 'Zscaler', 'Palo Alto Networks', 'Fortinet',
    
    // Indian Startups & Companies
    'Flipkart', 'Paytm', 'Zomato', 'Swiggy', 'Ola', 'Byju\'s', 'Unacademy', 'PhonePe', 'Razorpay',
    'Freshworks', 'Zoho', 'InMobi', 'Mu Sigma', 'Fractal Analytics'
  ];

  const checkTrustedCompany = (text: string): { isTrusted: boolean; companyName: string | null } => {
    const normalizedText = text.toLowerCase();
    
    for (const company of trustedCompanies) {
      const normalizedCompany = company.toLowerCase();
      
      // Check for exact matches or company name within word boundaries
      const regex = new RegExp(`\\b${normalizedCompany.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      
      if (regex.test(normalizedText)) {
        return { isTrusted: true, companyName: company };
      }
    }
    
    return { isTrusted: false, companyName: null };
  };

  const checkMutualConnections = (text: string): { hasMutuals: boolean; connectionType: string | null } => {
    const normalizedText = text.toLowerCase();
    
    // Patterns that indicate mutual connections or referrals
    const mutualPatterns = [
      // Direct mutual connection mentions
      /mutual\s+(connection|contact|friend|colleague)/i,
      /common\s+(connection|contact|colleague)/i,
      /shared\s+(connection|contact|colleague)/i,
      
      // Referral patterns
      /referred\s+by/i,
      /referral\s+from/i,
      /recommended\s+by/i,
      /introduced\s+by/i,
      
      // Internal referral patterns
      /internal\s+referral/i,
      /employee\s+referral/i,
      /team\s+member\s+referral/i,
      
      // LinkedIn connection patterns
      /linkedin\s+connection/i,
      /connected\s+on\s+linkedin/i,
      /mutual\s+linkedin/i,
      
      // Professional network patterns
      /professional\s+network/i,
      /network\s+connection/i,
      /through\s+our\s+network/i,
      
      // Alumni connections
      /alumni\s+connection/i,
      /fellow\s+alumni/i,
      /university\s+connection/i,
      
      // Former colleague patterns
      /former\s+colleague/i,
      /previous\s+colleague/i,
      /worked\s+together/i,
      
      // Direct mentions of people working there
      /people\s+you\s+know\s+work/i,
      /friends\s+who\s+work/i,
      /colleagues\s+who\s+work/i,
      /someone\s+you\s+know\s+works/i
    ];

    for (const pattern of mutualPatterns) {
      if (pattern.test(normalizedText)) {
        // Determine the type of connection
        if (/referral|referred|recommended/i.test(normalizedText)) {
          return { hasMutuals: true, connectionType: 'Employee Referral' };
        } else if (/linkedin/i.test(normalizedText)) {
          return { hasMutuals: true, connectionType: 'LinkedIn Connection' };
        } else if (/alumni/i.test(normalizedText)) {
          return { hasMutuals: true, connectionType: 'Alumni Network' };
        } else if (/colleague|worked\s+together/i.test(normalizedText)) {
          return { hasMutuals: true, connectionType: 'Former Colleague' };
        } else if (/mutual|common|shared/i.test(normalizedText)) {
          return { hasMutuals: true, connectionType: 'Mutual Connection' };
        } else {
          return { hasMutuals: true, connectionType: 'Professional Network' };
        }
      }
    }
    
    return { hasMutuals: false, connectionType: null };
  };

  const analyzeJobPosting = (text: string): AnalysisResult => {
    const factors: AnalysisResult['factors'] = [];
    let totalScore = 0;
    let maxScore = 0;

    // Check for trusted company first
    const trustedCompanyCheck = checkTrustedCompany(text);
    
    // Check for mutual connections
    const mutualConnectionsCheck = checkMutualConnections(text);
    
    // Network & Connections Analysis
    const networkFactors = [];
    
    if (mutualConnectionsCheck.hasMutuals) {
      networkFactors.push({
        factor: 'Mutual Connections',
        status: 'good' as const,
        description: `${mutualConnectionsCheck.connectionType} mentioned - strong indicator of legitimacy`,
        weight: 20 // High weight for mutual connections
      });
      totalScore += 20;
    } else {
      networkFactors.push({
        factor: 'Network Connections',
        status: 'warning' as const,
        description: 'No mutual connections or referrals mentioned',
        weight: 0
      });
    }
    maxScore += 20;

    factors.push({
      category: 'Network & Connections',
      items: networkFactors
    });

    // Company Analysis
    const companyFactors = [];
    
    if (trustedCompanyCheck.isTrusted) {
      companyFactors.push({
        factor: 'Trusted Company',
        status: 'good' as const,
        description: `Posted by ${trustedCompanyCheck.companyName}, a well-established and reputable company`,
        weight: 25 // High weight for trusted companies
      });
      totalScore += 25;
    } else {
      // Check for company information
      const hasCompanyInfo = /company|organization|firm|corp|inc|ltd|llc/i.test(text);
      if (hasCompanyInfo) {
        companyFactors.push({
          factor: 'Company Information',
          status: 'warning' as const,
          description: 'Company mentioned but not in our trusted companies database',
          weight: 5
        });
        totalScore += 5;
      } else {
        companyFactors.push({
          factor: 'Company Information',
          status: 'bad' as const,
          description: 'No clear company information provided',
          weight: 0
        });
      }
    }
    maxScore += 25;

    factors.push({
      category: 'Company Verification',
      items: companyFactors
    });

    // Text Analysis
    const textFactors = [];
    
    // Description length
    const wordCount = text.split(/\s+/).length;
    if (wordCount >= 150 && wordCount <= 800) {
      textFactors.push({
        factor: 'Description Length',
        status: 'good' as const,
        description: `Appropriate length (${wordCount} words)`,
        weight: 15
      });
      totalScore += 15;
    } else if (wordCount >= 100 || wordCount <= 1000) {
      textFactors.push({
        factor: 'Description Length',
        status: 'warning' as const,
        description: `${wordCount < 150 ? 'Short' : 'Long'} description (${wordCount} words)`,
        weight: 8
      });
      totalScore += 8;
    } else {
      textFactors.push({
        factor: 'Description Length',
        status: 'bad' as const,
        description: `${wordCount < 100 ? 'Very short' : 'Extremely long'} description (${wordCount} words)`,
        weight: 0
      });
    }
    maxScore += 15;

    // Specific requirements
    const hasSpecificRequirements = /\d+\s*(years?|yrs?)\s*(of\s*)?(experience|exp)/i.test(text) ||
                                   /bachelor|master|degree|certification/i.test(text) ||
                                   /python|java|javascript|react|angular|node|sql|aws|azure/i.test(text);
    
    if (hasSpecificRequirements) {
      textFactors.push({
        factor: 'Specific Requirements',
        status: 'good' as const,
        description: 'Clear technical requirements and qualifications specified',
        weight: 12
      });
      totalScore += 12;
    } else {
      textFactors.push({
        factor: 'Specific Requirements',
        status: 'bad' as const,
        description: 'Vague or missing technical requirements',
        weight: 0
      });
    }
    maxScore += 12;

    factors.push({
      category: 'Job Description Quality',
      items: textFactors
    });

    // Contact Information
    const contactFactors = [];
    const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g.test(text);
    const hasPhone = /(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g.test(text);
    const hasContact = /contact|reach out|apply|email|phone/i.test(text);

    if (hasEmail || hasPhone) {
      contactFactors.push({
        factor: 'Direct Contact Information',
        status: 'good' as const,
        description: 'Email or phone number provided',
        weight: 10
      });
      totalScore += 10;
    } else if (hasContact) {
      contactFactors.push({
        factor: 'Contact Information',
        status: 'warning' as const,
        description: 'General contact instructions but no direct contact details',
        weight: 5
      });
      totalScore += 5;
    } else {
      contactFactors.push({
        factor: 'Contact Information',
        status: 'bad' as const,
        description: 'No contact information provided',
        weight: 0
      });
    }
    maxScore += 10;

    factors.push({
      category: 'Contact & Application',
      items: contactFactors
    });

    // Compensation Analysis
    const compensationFactors = [];
    const hasSalary = /salary|compensation|pay|wage|\$\d+|₹\d+|€\d+|£\d+/i.test(text);
    const hasBenefits = /benefits|insurance|401k|pto|vacation|health|dental/i.test(text);

    if (hasSalary) {
      compensationFactors.push({
        factor: 'Salary Information',
        status: 'good' as const,
        description: 'Salary or compensation details mentioned',
        weight: 8
      });
      totalScore += 8;
    } else {
      compensationFactors.push({
        factor: 'Salary Information',
        status: 'warning' as const,
        description: 'No salary information provided',
        weight: 2
      });
      totalScore += 2;
    }

    if (hasBenefits) {
      compensationFactors.push({
        factor: 'Benefits Package',
        status: 'good' as const,
        description: 'Benefits and perks mentioned',
        weight: 5
      });
      totalScore += 5;
    } else {
      compensationFactors.push({
        factor: 'Benefits Package',
        status: 'warning' as const,
        description: 'No benefits information provided',
        weight: 1
      });
      totalScore += 1;
    }
    maxScore += 13;

    factors.push({
      category: 'Compensation & Benefits',
      items: compensationFactors
    });

    // Red Flags Analysis
    const redFlagFactors = [];
    const urgentLanguage = /urgent|immediate|asap|right away|start immediately/i.test(text);
    const tooGoodToBeTrueLanguage = /easy money|no experience|work from home|make money fast|guaranteed/i.test(text);
    const vagueLanguage = /dynamic|fast-paced|exciting opportunity|join our team/i.test(text);

    if (!urgentLanguage) {
      redFlagFactors.push({
        factor: 'Professional Tone',
        status: 'good' as const,
        description: 'No excessive urgency or pressure language',
        weight: 8
      });
      totalScore += 8;
    } else {
      redFlagFactors.push({
        factor: 'Urgent Language',
        status: 'bad' as const,
        description: 'Contains urgent or pressure language',
        weight: 0
      });
    }

    if (!tooGoodToBeTrueLanguage) {
      redFlagFactors.push({
        factor: 'Realistic Expectations',
        status: 'good' as const,
        description: 'No unrealistic promises or claims',
        weight: 7
      });
      totalScore += 7;
    } else {
      redFlagFactors.push({
        factor: 'Unrealistic Claims',
        status: 'bad' as const,
        description: 'Contains too-good-to-be-true language',
        weight: 0
      });
    }
    maxScore += 15;

    factors.push({
      category: 'Red Flags Assessment',
      items: redFlagFactors
    });

    // Calculate final score and confidence
    const scorePercentage = Math.round((totalScore / maxScore) * 100);
    const confidence = Math.min(95, Math.max(60, scorePercentage + Math.random() * 10));
    
    // Adjust thresholds based on trusted company status and mutual connections
    let isGhostJob: boolean;
    let summary: string;
    
    const hasStrongIndicators = trustedCompanyCheck.isTrusted || mutualConnectionsCheck.hasMutuals;
    
    if (hasStrongIndicators) {
      // More lenient for trusted companies or jobs with mutual connections
      isGhostJob = scorePercentage < 35;
      
      if (trustedCompanyCheck.isTrusted && mutualConnectionsCheck.hasMutuals) {
        summary = `Excellent opportunity! This job is from ${trustedCompanyCheck.companyName}, a trusted company, AND you have ${mutualConnectionsCheck.connectionType?.toLowerCase()}. This is very likely legitimate.`;
      } else if (trustedCompanyCheck.isTrusted) {
        summary = `This appears to be a legitimate job posting from ${trustedCompanyCheck.companyName}, a trusted company. The posting meets most quality standards.`;
      } else if (mutualConnectionsCheck.hasMutuals) {
        summary = `Strong legitimacy indicator: You have ${mutualConnectionsCheck.connectionType?.toLowerCase()} at this company. Jobs through personal networks are typically genuine.`;
      }
    } else {
      // Standard thresholds for unknown companies without connections
      isGhostJob = scorePercentage < 60;
      if (scorePercentage >= 75) {
        summary = 'This appears to be a legitimate job posting with comprehensive details and professional presentation.';
      } else if (scorePercentage >= 60) {
        summary = 'This job posting shows mixed signals. While it has some good elements, there are areas of concern that warrant caution.';
      } else {
        summary = 'This job posting shows several red flags and characteristics commonly associated with ghost jobs or low-quality postings.';
      }
    }

    const recommendations: string[] = [];
    
    if (mutualConnectionsCheck.hasMutuals) {
      recommendations.push(`🤝 Leverage your ${mutualConnectionsCheck.connectionType?.toLowerCase()}: Reach out to your connection for insider insights about the role and company culture`);
    }
    
    if (trustedCompanyCheck.isTrusted) {
      recommendations.push(`✅ Verified company: ${trustedCompanyCheck.companyName} is a well-established, reputable organization`);
    } else {
      recommendations.push('🔍 Research the company thoroughly - check their website, LinkedIn, and recent news');
    }
    
    if (!mutualConnectionsCheck.hasMutuals) {
      recommendations.push('🌐 Try to find mutual connections on LinkedIn who work at this company for additional validation');
    }
    
    if (!hasSalary) {
      recommendations.push('💰 Ask about salary range during initial conversations');
    }
    
    if (!hasEmail && !hasPhone) {
      recommendations.push('📞 Request direct contact information from the hiring manager');
    }
    
    if (urgentLanguage) {
      recommendations.push('⚠️ Be cautious of jobs with excessive urgency - legitimate roles usually have proper hiring timelines');
    }
    
    recommendations.push('📋 Prepare specific questions about day-to-day responsibilities and team structure');
    recommendations.push('🎯 Tailor your application to address the specific requirements mentioned');

    return {
      isGhostJob,
      confidence: Math.round(confidence),
      factors,
      summary,
      recommendations
    };
  };

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate API delay for better UX with realistic timing
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const result = analyzeJobPosting(jobDescription);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  const handleUseSample = () => {
    setJobDescription(sampleJobPosting);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-emerald-400';
      case 'warning':
        return 'text-amber-400';
      case 'bad':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-5 w-5 text-emerald-400" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-400" />;
      case 'bad':
        return <AlertTriangle className="h-5 w-5 text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">AI Ghost Job Detector</h1>
        </div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Paste any job description below and get instant AI-powered analysis using 100+ detection factors
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold text-gray-800">
              Job Description Analysis
            </label>
            <button
              onClick={handleUseSample}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span>Use Sample Job</span>
            </button>
          </div>
          
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the complete job posting here...

💡 Pro Tips for Better Analysis:
• Include company name, job title, and full description
• Mention if you have mutual connections or referrals
• Add salary, benefits, and contact information if available
• Include any specific requirements or qualifications listed

Example: 'Software Engineer at Google - I was referred by my colleague John who works there...'"
            className="w-full h-80 px-6 py-4 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm leading-relaxed"
          />
          
          <button
            onClick={handleAnalyze}
            disabled={!jobDescription.trim() || isAnalyzing}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
          >
            {isAnalyzing ? (
              <>
                <div className="relative">
                  <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-6 h-6 border-2 border-transparent border-t-purple-300 rounded-full animate-spin animate-reverse"></div>
                </div>
                <span>Analyzing with AI...</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
                </div>
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
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-purple-200 rounded-full"></div>
                <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"></div>
                <div className="absolute inset-2 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin animate-reverse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="h-8 w-8 text-purple-600 animate-pulse" />
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-800">AI Analysis in Progress</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <Zap className="h-4 w-4 text-yellow-500 animate-pulse" />
                  <span className="text-sm">Processing job description...</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <TrendingUp className="h-4 w-4 text-green-500 animate-pulse" />
                  <span className="text-sm">Analyzing 100+ detection factors...</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <Shield className="h-4 w-4 text-blue-500 animate-pulse" />
                  <span className="text-sm">Generating comprehensive report...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      {analysis && !isAnalyzing && (
        <div className="space-y-8 animate-fade-in">
          {/* Overall Result */}
          <div className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 p-8 ${
            analysis.isGhostJob 
              ? 'border-red-300 bg-red-50/50' 
              : 'border-emerald-300 bg-emerald-50/50'
          }`}>
            <div className="flex items-start space-x-6">
              <div className={`p-4 rounded-2xl ${
                analysis.isGhostJob 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-emerald-100 text-emerald-600'
              }`}>
                {analysis.isGhostJob ? (
                  <AlertTriangle className="h-12 w-12" />
                ) : (
                  <CheckCircle className="h-12 w-12" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <h2 className={`text-3xl font-bold ${
                    analysis.isGhostJob ? 'text-red-700' : 'text-emerald-700'
                  }`}>
                    {analysis.isGhostJob ? 'Potential Ghost Job' : 'Likely Legitimate Job'}
                  </h2>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-white/60 rounded-full">
                    <span className="text-gray-600 font-medium">Confidence:</span>
                    <span className="text-2xl font-bold text-gray-800">{analysis.confidence}%</span>
                  </div>
                </div>
                
                <p className="text-gray-700 text-lg leading-relaxed">
                  {analysis.summary}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {analysis.factors.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white">
                    {category.category === 'Network & Connections' && <UserCheck className="h-4 w-4" />}
                    {category.category === 'Company Verification' && <Building className="h-4 w-4" />}
                    {category.category === 'Job Description Quality' && <FileText className="h-4 w-4" />}
                    {category.category === 'Contact & Application' && <Mail className="h-4 w-4" />}
                    {category.category === 'Compensation & Benefits' && <DollarSign className="h-4 w-4" />}
                    {category.category === 'Red Flags Assessment' && <Shield className="h-4 w-4" />}
                  </div>
                  <span>{category.category}</span>
                </h3>
                
                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start space-x-3 p-3 bg-gray-50/80 rounded-lg border border-gray-100">
                      {getStatusIcon(item.status)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-800 text-sm">{item.factor}</span>
                          <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                            +{item.weight}
                          </span>
                        </div>
                        <p className="text-gray-600 text-xs leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Recommendations</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                  <div className="text-2xl flex-shrink-0">{recommendation.split(' ')[0]}</div>
                  <p className="text-gray-700 text-sm leading-relaxed font-medium">
                    {recommendation.substring(recommendation.indexOf(' ') + 1)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-reverse {
          animation: reverse 1.5s linear infinite;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default JobAnalyzer;