import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import { Settings, Database, AlertCircle, TrendingUp, Clock, FileText, DollarSign, Mail } from 'lucide-react';

const FeatureEngineering: React.FC = () => {
  const featureImportanceData = [
    { name: 'Description Length', importance: 85, category: 'Text' },
    { name: 'Posting Age', importance: 78, category: 'Temporal' },
    { name: 'Salary Transparency', importance: 72, category: 'Compensation' },
    { name: 'Contact Information', importance: 68, category: 'Contact' },
    { name: 'Company Verification', importance: 65, category: 'Company' },
    { name: 'Requirement Specificity', importance: 62, category: 'Text' },
    { name: 'Application Process', importance: 58, category: 'Process' },
    { name: 'Update Frequency', importance: 55, category: 'Temporal' }
  ];

  const anomalyPatterns = [
    { pattern: 'Too Generic', percentage: 35, color: '#EF4444' },
    { pattern: 'Unrealistic Salary', percentage: 25, color: '#F59E0B' },
    { pattern: 'Missing Details', percentage: 20, color: '#8B5CF6' },
    { pattern: 'Urgent Language', percentage: 12, color: '#06B6D4' },
    { pattern: 'No Contact Info', percentage: 8, color: '#10B981' }
  ];

  const temporalTrends = [
    { day: 'Mon', ghostJobs: 12, legitimateJobs: 45 },
    { day: 'Tue', ghostJobs: 15, legitimateJobs: 52 },
    { day: 'Wed', ghostJobs: 18, legitimateJobs: 48 },
    { day: 'Thu', ghostJobs: 22, legitimateJobs: 41 },
    { day: 'Fri', ghostJobs: 8, legitimateJobs: 58 },
    { day: 'Sat', ghostJobs: 5, legitimateJobs: 25 },
    { day: 'Sun', ghostJobs: 3, legitimateJobs: 18 }
  ];

  const featureCategories = [
    {
      title: 'Temporal Features',
      icon: Clock,
      description: 'Time-based patterns that indicate suspicious posting behavior',
      features: [
        {
          name: 'Posting Age',
          description: 'How long the job has been posted',
          importance: 'High',
          calculation: 'Days since initial posting date',
          ghostIndicator: 'Posts older than 60 days or reposted frequently'
        },
        {
          name: 'Update Frequency',
          description: 'How often the posting is modified',
          importance: 'Medium',
          calculation: 'Number of edits per week',
          ghostIndicator: 'Excessive updates (>3 per week) or never updated'
        },
        {
          name: 'Posting Time Pattern',
          description: 'When the job was posted',
          importance: 'Low',
          calculation: 'Hour of day and day of week',
          ghostIndicator: 'Posted outside business hours consistently'
        }
      ]
    },
    {
      title: 'Text Analysis Features',
      icon: FileText,
      description: 'Natural language processing of job descriptions and requirements',
      features: [
        {
          name: 'Description Length',
          description: 'Word count and character analysis',
          importance: 'High',
          calculation: 'Character count, word count, sentence complexity',
          ghostIndicator: 'Extremely short (<100 words) or overly long (>1000 words)'
        },
        {
          name: 'Keyword Density',
          description: 'Frequency of suspicious terms',
          importance: 'High',
          calculation: 'TF-IDF of red flag keywords',
          ghostIndicator: 'High frequency of "urgent", "immediate", "easy money"'
        },
        {
          name: 'Requirement Specificity',
          description: 'How detailed the requirements are',
          importance: 'Medium',
          calculation: 'Number of specific skills, years experience, qualifications',
          ghostIndicator: 'Vague requirements or unrealistic skill combinations'
        }
      ]
    },
    {
      title: 'Company Features',
      icon: Database,
      description: 'Information about the hiring company and its legitimacy',
      features: [
        {
          name: 'Company Verification',
          description: 'Legitimacy of the hiring company',
          importance: 'High',
          calculation: 'Website existence, social media presence, registration status',
          ghostIndicator: 'No website, unverified company, or recruiting agency only'
        },
        {
          name: 'Recruiter Profile',
          description: 'Information about the person posting',
          importance: 'Medium',
          calculation: 'LinkedIn profile completeness, connection count',
          ghostIndicator: 'Incomplete profile, low connections, generic photos'
        },
        {
          name: 'Company Size Mismatch',
          description: 'Job requirements vs company size',
          importance: 'Medium',
          calculation: 'Required experience vs company employee count',
          ghostIndicator: 'Small company requiring senior roles they cannot afford'
        }
      ]
    },
    {
      title: 'Compensation Features',
      icon: DollarSign,
      description: 'Salary and benefits analysis for suspicious patterns',
      features: [
        {
          name: 'Salary Transparency',
          description: 'Whether salary information is provided',
          importance: 'High',
          calculation: 'Presence and specificity of salary range',
          ghostIndicator: 'No salary mentioned or unrealistic ranges'
        },
        {
          name: 'Benefits Description',
          description: 'Detail level of benefits offered',
          importance: 'Medium',
          calculation: 'Number and specificity of benefits listed',
          ghostIndicator: 'Vague benefits or excessive promises'
        },
        {
          name: 'Compensation vs Market',
          description: 'How salary compares to market rates',
          importance: 'High',
          calculation: 'Salary percentile for role and location',
          ghostIndicator: 'Significantly above or below market rates'
        }
      ]
    }
  ];

  const COLORS = ['#EF4444', '#F59E0B', '#8B5CF6', '#06B6D4', '#10B981'];

  return (
    <div className="space-y-12">
      {/* Feature Overview */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <Settings className="h-8 w-8 mr-3 text-indigo-600" />
          Feature Engineering Overview
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Feature Importance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={featureImportanceData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="importance" fill="#6366F1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Anomaly Patterns</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={anomalyPatterns}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="percentage"
                >
                  {anomalyPatterns.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {anomalyPatterns.map((pattern, index) => (
                <div key={index} className="flex items-center text-sm">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-gray-600">{pattern.pattern} ({pattern.percentage}%)</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Temporal Patterns</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={temporalTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="ghostJobs" stroke="#EF4444" strokeWidth={3} dot={{ r: 6 }} />
                <Line type="monotone" dataKey="legitimateJobs" stroke="#10B981" strokeWidth={3} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 flex justify-center space-x-6">
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Ghost Jobs</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Legitimate Jobs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Categories */}
      <div className="space-y-8">
        {featureCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl mr-4">
                <category.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">{feature.name}</h4>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      feature.importance === 'High' ? 'bg-red-100 text-red-700' :
                      feature.importance === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {feature.importance}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{feature.description}</p>

                  <div className="space-y-3">
                    <div>
                      <h5 className="text-sm font-semibold text-gray-800 mb-1">Calculation</h5>
                      <p className="text-xs text-gray-600">{feature.calculation}</p>
                    </div>

                    <div>
                      <h5 className="text-sm font-semibold text-red-700 mb-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Ghost Job Indicator
                      </h5>
                      <p className="text-xs text-red-600">{feature.ghostIndicator}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Implementation Guide */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="h-6 w-6 mr-3 text-indigo-600" />
          Feature Engineering Best Practices
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Data Collection</h3>
            <ul className="space-y-2">
              <li className="flex items-start text-sm text-gray-600">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Scrape job postings with timestamps and metadata</span>
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Track posting history and modifications over time</span>
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Verify company information through multiple sources</span>
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Collect market salary data for comparison</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Feature Scaling</h3>
            <ul className="space-y-2">
              <li className="flex items-start text-sm text-gray-600">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Normalize numerical features (posting age, description length)</span>
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>One-hot encode categorical variables (company size, industry)</span>
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Apply TF-IDF to text features for keyword analysis</span>
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Handle missing values with domain-specific imputation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureEngineering;