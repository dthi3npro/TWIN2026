import { XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
  { day: 'Mon', risk: 32, health: 75 },
  { day: 'Tue', risk: 35, health: 72 },
  { day: 'Wed', risk: 38, health: 70 },
  { day: 'Thu', risk: 42, health: 66 },
  { day: 'Fri', risk: 45, health: 63 },
  { day: 'Sat', risk: 41, health: 65 },
  { day: 'Sun', risk: 44, health: 63 },
];

export default function MiniChart() {
  return (
    <div className="h-[100px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
          <defs>
            <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 9, fill: '#9ca3af' }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 9, fill: '#9ca3af' }}
            domain={[0, 100]}
          />
          <Area
            type="monotone"
            dataKey="health"
            stroke="#22c55e"
            strokeWidth={2}
            fill="url(#healthGradient)"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="risk"
            stroke="#ef4444"
            strokeWidth={2}
            fill="url(#riskGradient)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center gap-4 mt-1">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-[9px] text-gray-400">Soil Health</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <span className="text-[9px] text-gray-400">Cd Risk</span>
        </div>
      </div>
    </div>
  );
}
