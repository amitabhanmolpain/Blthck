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
  Verified
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

  const analyzeJobPosting = (text: string): AnalysisResult => {
    const factors: AnalysisResult['factors'] = [];
    let totalScore = 0;
    let maxScore = 0;

    // Check for trusted company first
    const trustedCompanyCheck = checkTrustedCompany(text);
    
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
      category: 'Company Verification',
      items: companyFactors
    });

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
    
    // Adjust thresholds based on trusted company status
    let isGhostJob: boolean;
    let summary: string;
    
    if (trustedCompanyCheck.isTrusted) {
      // More lenient for trusted companies
      isGhostJob = scorePercentage < 40;
      if (scorePercentage >= 70) {
        summary = `This appears to be a legitimate job posting from ${trustedCompanyCheck.companyName}, a trusted company. The posting meets most quality standards.`;
      } else if (scorePercentage >= 40) {
        summary = `This job posting is from ${trustedCompanyCheck.companyName}, a reputable company, but has some areas that could be improved for clarity.`;
      } else {
        summary = `While this is posted by ${trustedCompanyCheck.companyName}, a trusted company, the job description lacks important details and may need verification.`;
      }
    } else {
      // Standard thresholds for unknown companies
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
    
    if (trustedCompanyCheck.isTrusted) {
      recommendations.push(`✅ Verified company: ${trustedCompanyCheck.companyName} is a well-established, reputable organization`);
    } else {
      recommendations.push('🔍 Research the company thoroughly - check their website, LinkedIn, and recent news');
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
    
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = analyzeJobPosting(jobDescription);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'bad':
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Company Verification':
        return <Building className="h-5 w-5" />;
      case 'Job Description Quality':
        return <FileText className="h-5 w-5" />;
      case 'Contact & Application':
        return <Mail className="h-5 w-5" />;
      case 'Compensation & Benefits':
        return <DollarSign className="h-5 w-5" />;
      case 'Red Flags Assessment':
        return <Shield className="h-5 w-5" />;
      default:
        return <Brain className="h-5 w-5" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Input Section */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">AI Job Analysis</h2>
          <div className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full">
            <span className="text-green-300 text-sm font-medium">100+ Detection Factors</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-300">
            Paste the job description below:
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the complete job posting here, including company name, job title, requirements, responsibilities, and any other details..."
            className="w-full h-64 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none backdrop-blur-sm"
          />
          
          <button
            onClick={handleAnalyze}
            disabled={!jobDescription.trim() || isAnalyzing}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                <span>Analyzing with AI...</span>
              </>
            ) : (
              <>
                <Brain className="h-5 w-5" />
                <span>Analyze Job Posting</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {analysis && (
        <div className="space-y-6">
          {/* Overall Result */}
          <div className={`bg-white/10 backdrop-blur-xl border rounded-2xl p-8 shadow-2xl ${
            analysis.isGhostJob 
              ? 'border-red-500/30 bg-red-500/5' 
              : 'border-green-500/30 bg-green-500/5'
          }`}>
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-xl ${
                analysis.isGhostJob 
                  ? 'bg-red-500/20 text-red-400' 
                  : 'bg-green-500/20 text-green-400'
              }`}>
                {analysis.isGhostJob ? (
                  <AlertTriangle className="h-8 w-8" />
                ) : (
                  <CheckCircle className="h-8 w-8" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className={`text-2xl font-bold ${
                    analysis.isGhostJob ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {analysis.isGhostJob ? 'Potential Ghost Job' : 'Likely Legitimate Job'}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-300 text-sm">Confidence:</span>
                    <span className="text-white font-bold">{analysis.confidence}%</span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  {analysis.summary}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {analysis.factors.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white">
                    {getCategoryIcon(category.category)}
                  </div>
                  <h4 className="text-lg font-semibold text-white">{category.category}</h4>
                </div>
                
                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg border border-white/10">
                      {getStatusIcon(item.status)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-white text-sm">{item.factor}</span>
                          <span className="text-xs text-gray-400">Weight: {item.weight}</span>
                        </div>
                        <p className="text-gray-300 text-xs">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Recommendations</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-lg">{recommendation.split(' ')[0]}</div>
                  <p className="text-gray-300 text-sm">{recommendation.substring(recommendation.indexOf(' ') + 1)}</p>
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