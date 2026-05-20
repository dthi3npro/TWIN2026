import { 
  MapPin, 
  Droplets, 
  Thermometer, 
  Zap, 
  Activity,
  AlertTriangle,
  CheckCircle2,
  TreePine
} from 'lucide-react';
import { zones } from '../data/mockSensorData';
import ScoreRing from '../components/ScoreRing';

export default function ZoneMonitoring() {
  return (
    <div className="px-4 py-4 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-lg font-bold text-gray-900">Zone Monitoring</h1>
        <p className="text-xs text-gray-500">Real-time sensor data by zone</p>
      </div>

      {/* Zone Cards */}
      <div className="space-y-3">
        {zones.map((zone) => (
          <ZoneCard key={zone.id} zone={zone} />
        ))}
      </div>

      {/* Legend */}
      <div className="card p-3">
        <p className="text-[10px] font-semibold text-gray-500 mb-2">RISK LEVELS</p>
        <div className="grid grid-cols-4 gap-2">
          <LegendItem color="bg-green-500" label="Low" />
          <LegendItem color="bg-amber-500" label="Medium" />
          <LegendItem color="bg-red-500" label="High" />
          <LegendItem color="bg-red-700" label="Critical" />
        </div>
      </div>

      {/* Sensor Info */}
      <div className="card p-3 bg-gray-50">
        <p className="text-[10px] text-gray-500 text-center">
          Data from ESP32 IoT nodes • Updated every 30 seconds
        </p>
      </div>
    </div>
  );
}

function ZoneCard({ zone }: { zone: typeof zones[0] }) {
  const statusColors = {
    low: { border: 'border-l-green-500', bg: 'bg-green-50', badge: 'bg-green-100 text-green-700' },
    medium: { border: 'border-l-amber-500', bg: 'bg-amber-50', badge: 'bg-amber-100 text-amber-700' },
    high: { border: 'border-l-red-500', bg: 'bg-red-50', badge: 'bg-red-100 text-red-700' },
    critical: { border: 'border-l-red-700', bg: 'bg-red-100', badge: 'bg-red-200 text-red-800' },
  };

  const colors = statusColors[zone.riskLevel];

  return (
    <div className={`card p-4 border-l-4 ${colors.border} transition-smooth card-hover`}>
      {/* Zone Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center`}>
            <MapPin size={14} className={zone.riskLevel === 'low' ? 'text-green-600' : zone.riskLevel === 'medium' ? 'text-amber-600' : 'text-red-600'} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">{zone.name}</h3>
            <p className="text-[10px] text-gray-400">{zone.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {zone.riskLevel === 'high' || zone.riskLevel === 'critical' ? (
            <AlertTriangle size={12} className="text-red-500" />
          ) : (
            <CheckCircle2 size={12} className="text-green-500" />
          )}
          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${colors.badge}`}>
            {zone.riskLevel.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Scores */}
      <div className="flex items-center gap-4 mb-3">
        <div className="flex-1 flex items-center gap-2">
          <ScoreRing score={zone.soilHealthScore} color="#22c55e" size={44} strokeWidth={4} />
          <div>
            <p className="text-[9px] text-gray-400">Soil Health</p>
            <p className="text-xs font-bold text-gray-700">{zone.soilHealthScore}/100</p>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-2">
          <ScoreRing score={zone.cdRiskScore} color={zone.cdRiskScore > 50 ? '#ef4444' : '#f59e0b'} size={44} strokeWidth={4} />
          <div>
            <p className="text-[9px] text-gray-400">Cd Risk</p>
            <p className="text-xs font-bold text-gray-700">{zone.cdRiskScore}/100</p>
          </div>
        </div>
      </div>

      {/* Sensor Readings */}
      <div className="grid grid-cols-4 gap-2 pt-2 border-t border-gray-100">
        <SensorValue icon={<Activity size={10} />} label="pH" value={zone.currentReadings.pH.toFixed(1)} color="text-blue-600" />
        <SensorValue icon={<Zap size={10} />} label="EC" value={zone.currentReadings.ec.toFixed(1)} unit="mS" color="text-amber-600" />
        <SensorValue icon={<Droplets size={10} />} label="Moist" value={zone.currentReadings.moisture.toString()} unit="%" color="text-cyan-600" />
        <SensorValue icon={<Thermometer size={10} />} label="Temp" value={zone.currentReadings.temperature.toFixed(1)} unit="°C" color="text-red-500" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
        <div className="flex items-center gap-1 text-[9px] text-gray-400">
          <TreePine size={9} />
          <span>{zone.treeCount} trees • {zone.areaHectares} ha</span>
        </div>
        <span className="text-[9px] text-gray-400">Updated {zone.lastUpdated}</span>
      </div>
    </div>
  );
}

function SensorValue({ icon, label, value, unit, color }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit?: string;
  color: string;
}) {
  return (
    <div className="text-center">
      <div className={`flex items-center justify-center ${color} mb-0.5`}>{icon}</div>
      <p className="text-xs font-bold text-gray-800">{value}<span className="text-[8px] font-normal text-gray-400">{unit}</span></p>
      <p className="text-[8px] text-gray-400">{label}</p>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-2 h-2 rounded-full ${color}`}></div>
      <span className="text-[9px] text-gray-500">{label}</span>
    </div>
  );
}
