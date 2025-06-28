import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Brain, Zap, Target, TrendingUp } from 'lucide-react';

const ModelComparison: React.FC = () => {
  const performanceData = [
    { name: 'Logistic Regression', accuracy: 85, precision: 82, recall: 88, f1Score: 85, speed: 95 },
    { name: 'Random Forest', accuracy: 92, precision: 90, recall: 94, f1Score: 92, speed: 80 },
    { name: 'XGBoost', accuracy: 95, precision: 94, recall: 96, f1Score: 95, speed: 70 },
    { name: 'BERT', accuracy: 97, precision: 96, recall: 98, f1Score: 97, speed: 45 },
    { name: 'DistilBERT', accuracy: 94, precision: 93, recall: 95, f1Score: 94, speed: 65 },
    { name: 'OpenAI Embeddings', accuracy: 96, precision: 95, recall: 97, f1Score: 96, speed: 60 }
  ];

  const radarData = [
    { metric: 'Accuracy', 'Random Forest': 92, 'XGBoost': 95, 'BERT': 97 },
    { metric: 'Speed', 'Random Forest': 80, 'XGBoost': 70, 'BERT': 45 },
    { metric: 'Interpretability', 'Random Forest': 85, 'XGBoost': 70, 'BERT': 30 },
    { metric: 'Robustness', 'Random Forest': 88, 'XGBoost': 92, 'BERT': 95 },
    { metric: 'Generalization', 'Random Forest': 82, 'XGBoost': 88, 'BERT': 94 },
    { metric: 'Resource Efficiency', 'Random Forest': 90, 'XGBoost': 85, 'BERT': 40 }
  ];

  const modelCategories = [
    {
      title: 'Baseline ML Models',
      description: 'Traditional machine learning approaches for structured data',
      models: [
        {
          name: 'Logistic Regression',
          description: 'Simple and interpretable binary classification',
          accuracy: 85,
          speed: 95,
          useCase: 'Quick baseline, high interpretability needs',
          pros: ['Fast inference', 'Highly interpretable', 'Low resource usage'],
          cons: ['Limited feature complexity', 'Linear decision boundary']
        },
        {
          name: 'Random Forest',
          description: 'Ensemble method with mixed feature types',
          accuracy: 92,
          speed: 80,
          useCase: 'Balanced accuracy and explainability',
          pros: ['Handles mixed data types', 'Feature importance', 'Robust to outliers'],
          cons: ['Can overfit', 'Less interpretable than linear models']
        },
        {
          name: 'XGBoost',
          description: 'High-performance gradient boosting',
          accuracy: 95,
          speed: 70,
          useCase: 'Maximum accuracy on tabular data',
          pros: ['Excellent performance', 'Built-in regularization', 'Handles missing values'],
          cons: ['Requires hyperparameter tuning', 'Can be complex']
        }
      ]
    },
    {
      title: 'NLP Models',
      description: 'Advanced text analysis for job description content',
      models: [
        {
          name: 'BERT',
          description: 'Transformer-based semantic understanding',
          accuracy: 97,
          speed: 45,
          useCase: 'Deep text analysis, highest accuracy',
          pros: ['State-of-the-art accuracy', 'Contextual understanding', 'Transfer learning'],
          cons: ['High computational cost', 'Slower inference', 'Less interpretable']
        },
        {
          name: 'DistilBERT',
          description: 'Lightweight version of BERT',
          accuracy: 94,
          speed: 65,
          useCase: 'Production deployment balance',
          pros: ['Faster than BERT', 'Good accuracy', 'Smaller model size'],
          cons: ['Slightly lower accuracy', 'Still computationally intensive']
        },
        {
          name: 'OpenAI Embeddings',
          description: 'Pre-trained embeddings with classifier',
          accuracy: 96,
          speed: 60,
          useCase: 'Easy integration, good performance',
          pros: ['Easy to implement', 'High quality embeddings', 'Regular updates'],
          cons: ['API dependency', 'Cost per request', 'Less customizable']
        }
      ]
    }
  ];

  return (
    <div className="space-y-12">
      {/* Performance Overview */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <TrendingUp className="h-8 w-8 mr-3 text-indigo-600" />
          Model Performance Overview
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Accuracy Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="accuracy" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Multi-Metric Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar name="Random Forest" dataKey="Random Forest" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
                <Radar name="XGBoost" dataKey="XGBoost" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.1} />
                <Radar name="BERT" dataKey="BERT" stroke="#6366F1" fill="#6366F1" fillOpacity={0.1} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Model Categories */}
      {modelCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h2>
            <p className="text-gray-600">{category.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.models.map((model, modelIndex) => (
              <div key={modelIndex} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h3>
                    <p className="text-gray-600 text-sm">{model.description}</p>
                  </div>
                  <Brain className="h-6 w-6 text-indigo-600 flex-shrink-0" />
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Accuracy</span>
                    <span className="text-lg font-bold text-indigo-600">{model.accuracy}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${model.accuracy}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Speed</span>
                    <span className="text-lg font-bold text-emerald-600">{model.speed}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${model.speed}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Best Use Case</h4>
                    <p className="text-sm text-gray-600">{model.useCase}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-emerald-700 mb-2">Advantages</h4>
                    <ul className="space-y-1">
                      {model.pros.map((pro, proIndex) => (
                        <li key={proIndex} className="text-xs text-emerald-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></div>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-amber-700 mb-2">Considerations</h4>
                    <ul className="space-y-1">
                      {model.cons.map((con, conIndex) => (
                        <li key={conIndex} className="text-xs text-amber-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></div>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Recommended Workflow */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Target className="h-6 w-6 mr-3 text-indigo-600" />
          Recommended Implementation Workflow
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-indigo-600 font-bold">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Feature Engineering</h3>
            <p className="text-sm text-gray-600">Extract posting age, description length, salary transparency, and contact information</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-purple-600 font-bold">2</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Text Embedding</h3>
            <p className="text-sm text-gray-600">Use BERT or OpenAI embeddings to convert job descriptions into vectors</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-emerald-600 font-bold">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Train Classifier</h3>
            <p className="text-sm text-gray-600">Combine features and embeddings in XGBoost or Random Forest</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-amber-600 font-bold">4</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Deploy & Monitor</h3>
            <p className="text-sm text-gray-600">Use FastAPI backend with continuous model monitoring and updates</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelComparison;