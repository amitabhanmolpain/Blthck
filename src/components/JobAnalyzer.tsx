import React, { useState } from 'react';
import { Search, AlertTriangle, CheckCircle, Clock, DollarSign, Building, Mail, FileText, TrendingUp, Shield, Zap, Target, Eye, Users, BarChart3, Brain, Cpu, Activity, Layers, Database, GitBranch, Sparkles, ChevronDown, ChevronUp, ExternalLink, AlertCircle, Info, Calculator, TrendingDown, BookOpen, SpellCheck as Spell, HelpCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line } from 'recharts';

// Interfaces for the ML system
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
  reason: string; // Added for detailed tooltip explanation
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

[Rest of the file content remains unchanged...]