import { 
  Brain, 
  AlertTriangle, 
  TrendingUp, 
  Lightbulb,
  ArrowRight,
  Shield,
  Zap,
  Droplets,
  Thermometer
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { aiAnalysis } from '../data/mockSensorData';

export default function AIAnalysisScreen() {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-lg font-bold text-gray-900">AI Analysis</h1>
        <p className="text-xs text-gray-500">Root cause analysis & risk assessment</p>
      </div>

      {/* AI Status Card */}
      <div className="card p-4 bg-gradient-to-br from-emerald-50 to-green-50 border-green-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <Brain size={20} className="text-green-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-800">AI Engine Active</h3>
            <p className="text-[10px] text-gray-500">Last analyzed: {aiAnalysis.lastAnalyzed}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-[9px] text-gray-400 uppercase font-semibold">Overall Risk</p>
            <p className={`text-sm font-bold ${
              aiAnalysis.overallRisk === 'low' ? 'text-green-600' :
              aiAnalysis.overallRisk === 'medium' ? 'text-amber-600' :
              'text-red-600'
            }`}>{aiAnalysis.overallRisk.toUpperCase()}</p>
          </div>
          <div className="flex-1">
            <p className="text-[9px] text-gray-400 uppercase font-semibold">Confidence</p>
            <p className="text-sm font-bold text-gray-800">{aiAnalysis.confidence}%</p>
          </div>
          <div className="flex-1">
            <p className="text-[9px] text-gray-400 uppercase font-semibold">Factors</p>
            <p className="text-sm font-bold text-gray-800">{aiAnalysis.rootCauses.length}</p>
          </div>
        </div>
      </div>

      {/* Root Cause Analysis */}
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={14} className="text-amber-600" />
          <h3 className="text-xs font-bold text-gray-800">Root Cause Analysis</h3>
        </div>
        <div className="space-y-3">
          {aiAnalysis.rootCauses.map((cause, index) => (
            <RootCauseCard key={index} cause={cause} index={index} />
          ))}
        </div>
      </div>

      {/* AI Reasoning */}
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={14} className="text-amber-500" />
          <h3 className="text-xs font-bold text-gray-800">AI Reasoning</h3>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-[11px] text-gray-700 leading-relaxed">
            {aiAnalysis.reasoning}
          </p>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <Shield size={10} className="text-green-500" />
          <p className="text-[9px] text-gray-400">
            Explainable AI • Evidence-based prediction
          </p>
        </div>
      </div>

      {/* Key Insight */}
      <div className="card p-4 bg-amber-50 border-amber-200">
        <div className="flex items-start gap-2">
          <AlertTriangle size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-[11px] font-semibold text-amber-800 mb-1">Key Insight</p>
            <p className="text-[10px] text-amber-700 leading-relaxed">
              High salinity (EC: 3.2 mS/cm) combined with low pH (4.3) creates a synergistic effect 
              that increases Cadmium mobility by 3.2x. This is the primary risk driver in Zone B.
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick={() => navigate('/recommendations')}
        className="w-full bg-green-600 text-white rounded-2xl py-3.5 flex items-center justify-center gap-2 font-semibold text-sm shadow-lg shadow-green-200 active:scale-[0.98] transition-transform"
      >
        View Recommendations
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

function RootCauseCard({ cause, index }: { cause: typeof aiAnalysis.rootCauses[0]; index: number }) {
  const icons = [
    <Zap size={12} className="text-amber-600" />,
    <Droplets size={12} className="text-blue-600" />,
    <Droplets size={12} className="text-cyan-600" />,
    <Thermometer size={12} className="text-red-500" />,
  ];

  const impactColors = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-amber-100 text-amber-700',
    high: 'bg-red-100 text-red-700',
  };

  return (
    <div className="border border-gray-100 rounded-xl p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-50 rounded-lg flex items-center justify-center">
            {icons[index]}
          </div>
          <h4 className="text-[11px] font-semibold text-gray-800">{cause.factor}</h4>
        </div>
        <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${impactColors[cause.impact]}`}>
          {cause.impact.toUpperCase()}
        </span>
      </div>
      <p className="text-[10px] text-gray-600 leading-relaxed mb-2">{cause.description}</p>
      {/* Contribution bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-400 to-red-500 rounded-full transition-all duration-500"
            style={{ width: `${cause.contribution}%` }}
          ></div>
        </div>
        <span className="text-[9px] font-semibold text-gray-500">{cause.contribution}%</span>
      </div>
    </div>
  );
}
