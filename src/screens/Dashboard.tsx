import { 
  Droplets, 
  Thermometer, 
  Zap, 
  Activity, 
  AlertTriangle,
  ArrowRight,
  Wifi,
  Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dashboardData, zones } from '../data/mockSensorData';
import ScoreRing from '../components/ScoreRing';
import MiniChart from '../components/MiniChart';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Dashboard</h1>
          <p className="text-xs text-gray-500">{dashboardData.farmName}</p>
        </div>
        <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-full">
          <Wifi size={12} className="text-green-600" />
          <span className="text-[10px] font-medium text-green-700">Live</span>
        </div>
      </div>

      {/* Main Score Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card p-4 flex flex-col items-center">
          <ScoreRing 
            score={dashboardData.overallSoilHealth} 
            color="#22c55e" 
            size={80}
          />
          <p className="text-xs font-semibold text-gray-700 mt-2">Soil Health</p>
          <p className="text-[10px] text-gray-400">Overall Score</p>
        </div>
        <div className="card p-4 flex flex-col items-center">
          <ScoreRing 
            score={dashboardData.overallCdRisk} 
            color={dashboardData.overallCdRisk > 50 ? '#ef4444' : '#f59e0b'} 
            size={80}
          />
          <p className="text-xs font-semibold text-gray-700 mt-2">Cd Risk</p>
          <p className="text-[10px] text-gray-400">Prediction Score</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-2">
        <QuickStat 
          icon={<Activity size={14} />} 
          label="pH" 
          value="5.1" 
          color="text-blue-600" 
          bg="bg-blue-50" 
        />
        <QuickStat 
          icon={<Zap size={14} />} 
          label="EC" 
          value="2.4" 
          unit="mS" 
          color="text-amber-600" 
          bg="bg-amber-50" 
        />
        <QuickStat 
          icon={<Droplets size={14} />} 
          label="Moist" 
          value="35" 
          unit="%" 
          color="text-cyan-600" 
          bg="bg-cyan-50" 
        />
        <QuickStat 
          icon={<Thermometer size={14} />} 
          label="Temp" 
          value="30" 
          unit="°C" 
          color="text-red-500" 
          bg="bg-red-50" 
        />
      </div>

      {/* Trend Chart */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-gray-700">Risk Trend (7 days)</h3>
          <button 
            onClick={() => navigate('/history')}
            className="text-[10px] text-green-600 font-medium flex items-center gap-0.5"
          >
            View All <ArrowRight size={10} />
          </button>
        </div>
        <MiniChart />
      </div>

      {/* Zone Summary */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-gray-700">Zone Status</h3>
          <button 
            onClick={() => navigate('/zones')}
            className="text-[10px] text-green-600 font-medium flex items-center gap-0.5"
          >
            Details <ArrowRight size={10} />
          </button>
        </div>
        <div className="space-y-2">
          {zones.map((zone) => (
            <ZoneRow key={zone.id} zone={zone} />
          ))}
        </div>
      </div>

      {/* Active Alerts Banner */}
      <button 
        onClick={() => navigate('/alerts')}
        className="w-full card p-3 flex items-center gap-3 bg-red-50 border-red-100 transition-smooth card-hover"
      >
        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
          <AlertTriangle size={16} className="text-red-600" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-xs font-semibold text-red-800">{dashboardData.activeAlerts} Active Alerts</p>
          <p className="text-[10px] text-red-600">Zone B requires immediate attention</p>
        </div>
        <ArrowRight size={14} className="text-red-400" />
      </button>

      {/* AI Shield Status */}
      <button 
        onClick={() => navigate('/analysis')}
        className="w-full card p-3 flex items-center gap-3 bg-green-50 border-green-100 transition-smooth card-hover"
      >
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <Shield size={16} className="text-green-600" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-xs font-semibold text-green-800">AI Analysis Ready</p>
          <p className="text-[10px] text-green-600">Last analyzed: {dashboardData.lastSync}</p>
        </div>
        <ArrowRight size={14} className="text-green-400" />
      </button>
    </div>
  );
}

function QuickStat({ icon, label, value, unit, color, bg }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit?: string;
  color: string;
  bg: string;
}) {
  return (
    <div className="card p-2.5 flex flex-col items-center gap-1">
      <div className={`w-6 h-6 ${bg} rounded-full flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <p className="text-sm font-bold text-gray-800">
        {value}<span className="text-[9px] font-normal text-gray-400">{unit}</span>
      </p>
      <p className="text-[9px] text-gray-400">{label}</p>
    </div>
  );
}

function ZoneRow({ zone }: { zone: typeof zones[0] }) {
  const riskColors = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-amber-100 text-amber-700',
    high: 'bg-red-100 text-red-700',
    critical: 'bg-red-200 text-red-800',
  };

  return (
    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
      <div className={`w-2 h-2 rounded-full ${
        zone.riskLevel === 'low' ? 'bg-green-500' :
        zone.riskLevel === 'medium' ? 'bg-amber-500' :
        'bg-red-500'
      }`}></div>
      <div className="flex-1">
        <p className="text-xs font-medium text-gray-800">{zone.name}</p>
        <p className="text-[10px] text-gray-400">{zone.location}</p>
      </div>
      <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${riskColors[zone.riskLevel]}`}>
        {zone.riskLevel.toUpperCase()}
      </span>
    </div>
  );
}
