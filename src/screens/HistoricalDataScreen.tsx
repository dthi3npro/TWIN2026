import { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  CartesianGrid
} from 'recharts';
import { Calendar, TrendingUp, TrendingDown, Minus } from 'lucide-react';

// Generate 30 days of historical data
const generateData = () => {
  const data = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const deteriorating = i < 10;
    data.push({
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      pH: +(5.5 + Math.sin(i * 0.3) * 0.6 + (deteriorating ? -0.4 : 0) + Math.random() * 0.15).toFixed(2),
      ec: +(1.8 + Math.cos(i * 0.2) * 0.5 + (deteriorating ? 0.6 : 0) + Math.random() * 0.2).toFixed(2),
      moisture: Math.round(38 + Math.sin(i * 0.4) * 10 + (deteriorating ? -5 : 0) + Math.random() * 3),
      temperature: +(28.5 + Math.sin(i * 0.15) * 2.5 + Math.random() * 1.5).toFixed(1),
      cdRisk: Math.round(25 + (29 - i) * 0.6 + (deteriorating ? 12 : 0) + Math.random() * 5),
      soilHealth: Math.round(80 - (29 - i) * 0.5 - (deteriorating ? 10 : 0) + Math.random() * 3),
    });
  }
  return data;
};

const historicalData = generateData();

type MetricKey = 'pH' | 'ec' | 'moisture' | 'temperature' | 'cdRisk' | 'soilHealth';

const metrics: { key: MetricKey; label: string; color: string; unit: string }[] = [
  { key: 'cdRisk', label: 'Cd Risk', color: '#ef4444', unit: '/100' },
  { key: 'soilHealth', label: 'Soil Health', color: '#22c55e', unit: '/100' },
  { key: 'pH', label: 'Soil pH', color: '#6366f1', unit: '' },
  { key: 'ec', label: 'EC (Salinity)', color: '#f59e0b', unit: ' mS/cm' },
  { key: 'moisture', label: 'Moisture', color: '#06b6d4', unit: '%' },
  { key: 'temperature', label: 'Temperature', color: '#ef4444', unit: '°C' },
];

export default function HistoricalDataScreen() {
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>('cdRisk');
  const [timeRange, setTimeRange] = useState<'7d' | '14d' | '30d'>('30d');

  const currentMetric = metrics.find(m => m.key === selectedMetric)!;
  
  const filteredData = timeRange === '7d' 
    ? historicalData.slice(-7) 
    : timeRange === '14d' 
    ? historicalData.slice(-14) 
    : historicalData;

  // Calculate trend
  const lastValue = filteredData[filteredData.length - 1][selectedMetric] as number;
  const firstValue = filteredData[0][selectedMetric] as number;
  const trend = lastValue - firstValue;
  const trendPercent = ((trend / firstValue) * 100).toFixed(1);

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Historical Data</h1>
          <p className="text-xs text-gray-500">Sensor trends & patterns</p>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
          <Calendar size={12} className="text-gray-400 ml-1.5" />
          {(['7d', '14d', '30d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-2 py-1 rounded-md text-[9px] font-semibold transition-all ${
                timeRange === range
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-400'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Selector */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {metrics.map((metric) => (
          <button
            key={metric.key}
            onClick={() => setSelectedMetric(metric.key)}
            className={`px-3 py-1.5 rounded-full text-[9px] font-semibold whitespace-nowrap transition-all ${
              selectedMetric === metric.key
                ? 'text-white shadow-sm'
                : 'bg-gray-100 text-gray-500'
            }`}
            style={selectedMetric === metric.key ? { backgroundColor: metric.color } : {}}
          >
            {metric.label}
          </button>
        ))}
      </div>

      {/* Main Chart */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-xs font-bold text-gray-800">{currentMetric.label}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-lg font-bold" style={{ color: currentMetric.color }}>
                {lastValue}{currentMetric.unit}
              </span>
              <TrendBadge trend={trend} percent={trendPercent} isRisk={selectedMetric === 'cdRisk' || selectedMetric === 'ec'} />
            </div>
          </div>
        </div>

        <div className="h-[160px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <defs>
                <linearGradient id={`gradient-${selectedMetric}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={currentMetric.color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={currentMetric.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 8, fill: '#9ca3af' }}
                interval={timeRange === '7d' ? 0 : timeRange === '14d' ? 1 : 4}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 8, fill: '#9ca3af' }}
              />
              <Area
                type="monotone"
                dataKey={selectedMetric}
                stroke={currentMetric.color}
                strokeWidth={2}
                fill={`url(#gradient-${selectedMetric})`}
                dot={false}
                activeDot={{ r: 3, fill: currentMetric.color }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-2">
        <StatCard 
          label="Average" 
          value={(filteredData.reduce((sum, d) => sum + (d[selectedMetric] as number), 0) / filteredData.length).toFixed(1)}
          unit={currentMetric.unit}
        />
        <StatCard 
          label="Maximum" 
          value={Math.max(...filteredData.map(d => d[selectedMetric] as number)).toFixed(1)}
          unit={currentMetric.unit}
        />
        <StatCard 
          label="Minimum" 
          value={Math.min(...filteredData.map(d => d[selectedMetric] as number)).toFixed(1)}
          unit={currentMetric.unit}
        />
      </div>

      {/* Multi-metric Overview */}
      <div className="card p-4">
        <h3 className="text-xs font-bold text-gray-700 mb-3">All Metrics (30 days)</h3>
        <div className="h-[120px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData.slice(-14)} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 7, fill: '#9ca3af' }}
                interval={2}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 7, fill: '#9ca3af' }} />
              <Line type="monotone" dataKey="cdRisk" stroke="#ef4444" strokeWidth={1.5} dot={false} />
              <Line type="monotone" dataKey="soilHealth" stroke="#22c55e" strokeWidth={1.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-4 mt-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-red-500 rounded"></div>
            <span className="text-[8px] text-gray-400">Cd Risk</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-green-500 rounded"></div>
            <span className="text-[8px] text-gray-400">Soil Health</span>
          </div>
        </div>
      </div>

      {/* AI Insight */}
      <div className="card p-3 bg-amber-50 border-amber-200">
        <p className="text-[10px] text-amber-800 font-medium">
          📊 Trend Analysis: Cd Risk has increased by {Math.abs(+trendPercent)}% over the selected period. 
          Correlated with declining pH and rising salinity levels.
        </p>
      </div>
    </div>
  );
}

function TrendBadge({ trend, percent, isRisk }: { trend: number; percent: string; isRisk: boolean }) {
  const isUp = trend > 0;
  const isNeutral = Math.abs(trend) < 0.5;
  
  // For risk metrics, up is bad. For health metrics, up is good.
  const isNegative = isRisk ? isUp : !isUp;
  
  if (isNeutral) {
    return (
      <span className="flex items-center gap-0.5 text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full font-medium">
        <Minus size={8} /> Stable
      </span>
    );
  }

  return (
    <span className={`flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
      isNegative ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
    }`}>
      {isUp ? <TrendingUp size={8} /> : <TrendingDown size={8} />}
      {Math.abs(+percent)}%
    </span>
  );
}

function StatCard({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="card p-2.5 text-center">
      <p className="text-[9px] text-gray-400 mb-0.5">{label}</p>
      <p className="text-sm font-bold text-gray-800">{value}<span className="text-[8px] font-normal text-gray-400">{unit}</span></p>
    </div>
  );
}
