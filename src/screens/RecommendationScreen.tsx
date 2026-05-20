import { 
  Clock, 
  DollarSign, 
  TrendingUp,
  Leaf,
  Droplets,
  Beaker,
  Radio,
  ChevronRight
} from 'lucide-react';
import { recommendations } from '../data/mockSensorData';
import type { Recommendation } from '../data/mockSensorData';
import { useState } from 'react';

export default function RecommendationScreen() {
  const [selectedRec, setSelectedRec] = useState<string | null>(null);

  const priorityGroups = {
    immediate: recommendations.filter(r => r.priority === 'immediate'),
    'short-term': recommendations.filter(r => r.priority === 'short-term'),
    'long-term': recommendations.filter(r => r.priority === 'long-term'),
  };

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-lg font-bold text-gray-900">Recommendations</h1>
        <p className="text-xs text-gray-500">AI-powered actionable suggestions</p>
      </div>

      {/* Priority Summary */}
      <div className="grid grid-cols-3 gap-2">
        <PriorityStat count={priorityGroups.immediate.length} label="Immediate" color="bg-red-500" />
        <PriorityStat count={priorityGroups['short-term'].length} label="Short-term" color="bg-amber-500" />
        <PriorityStat count={priorityGroups['long-term'].length} label="Long-term" color="bg-blue-500" />
      </div>

      {/* Immediate Actions */}
      {priorityGroups.immediate.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <h2 className="text-xs font-bold text-gray-700 uppercase">Immediate Actions</h2>
          </div>
          <div className="space-y-2">
            {priorityGroups.immediate.map((rec) => (
              <RecommendationCard 
                key={rec.id} 
                rec={rec} 
                isExpanded={selectedRec === rec.id}
                onToggle={() => setSelectedRec(selectedRec === rec.id ? null : rec.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Short-term Actions */}
      {priorityGroups['short-term'].length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <h2 className="text-xs font-bold text-gray-700 uppercase">Short-term Actions</h2>
          </div>
          <div className="space-y-2">
            {priorityGroups['short-term'].map((rec) => (
              <RecommendationCard 
                key={rec.id} 
                rec={rec}
                isExpanded={selectedRec === rec.id}
                onToggle={() => setSelectedRec(selectedRec === rec.id ? null : rec.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Long-term Actions */}
      {priorityGroups['long-term'].length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <h2 className="text-xs font-bold text-gray-700 uppercase">Long-term Actions</h2>
          </div>
          <div className="space-y-2">
            {priorityGroups['long-term'].map((rec) => (
              <RecommendationCard 
                key={rec.id} 
                rec={rec}
                isExpanded={selectedRec === rec.id}
                onToggle={() => setSelectedRec(selectedRec === rec.id ? null : rec.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="card p-3 bg-gray-50">
        <p className="text-[9px] text-gray-400 text-center leading-relaxed">
          AI recommendations are based on sensor data analysis and agricultural best practices. 
          Always consult with local agricultural experts before implementation.
        </p>
      </div>
    </div>
  );
}

function RecommendationCard({ rec, isExpanded, onToggle }: { 
  rec: Recommendation; 
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const categoryIcons = {
    soil: <Leaf size={14} className="text-green-600" />,
    water: <Droplets size={14} className="text-blue-600" />,
    fertilizer: <Beaker size={14} className="text-purple-600" />,
    monitoring: <Radio size={14} className="text-cyan-600" />,
  };

  const priorityColors = {
    immediate: 'border-l-red-500',
    'short-term': 'border-l-amber-500',
    'long-term': 'border-l-blue-500',
  };

  return (
    <div 
      className={`card border-l-4 ${priorityColors[rec.priority]} transition-smooth overflow-hidden cursor-pointer active:scale-[0.99]`}
      onClick={onToggle}
    >
      <div className="p-3">
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            {categoryIcons[rec.category]}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-[11px] font-bold text-gray-800">{rec.title}</h4>
            <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-2">{rec.description}</p>
          </div>
          <ChevronRight 
            size={14} 
            className={`text-gray-300 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
          />
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="px-3 pb-3 pt-0 border-t border-gray-50">
          <div className="grid grid-cols-3 gap-2 mt-2">
            <DetailChip icon={<DollarSign size={9} />} label="Cost" value={rec.estimatedCost} />
            <DetailChip icon={<TrendingUp size={9} />} label="Impact" value={rec.expectedImprovement} />
            <DetailChip icon={<Clock size={9} />} label="Time" value={rec.timeframe} />
          </div>
        </div>
      )}
    </div>
  );
}

function PriorityStat({ count, label, color }: { count: number; label: string; color: string }) {
  return (
    <div className="card p-2.5 text-center">
      <div className={`w-5 h-5 ${color} rounded-full flex items-center justify-center mx-auto mb-1`}>
        <span className="text-[9px] text-white font-bold">{count}</span>
      </div>
      <p className="text-[9px] text-gray-500">{label}</p>
    </div>
  );
}

function DetailChip({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-2">
      <div className="flex items-center gap-0.5 text-gray-400 mb-0.5">
        {icon}
        <span className="text-[8px]">{label}</span>
      </div>
      <p className="text-[9px] font-medium text-gray-700 leading-tight">{value}</p>
    </div>
  );
}
