import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  Bell,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { alerts } from '../data/mockSensorData';
import type { Alert } from '../data/mockSensorData';
import { useState } from 'react';

export default function AlertsScreen() {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  
  const filteredAlerts = filter === 'unread' 
    ? alerts.filter(a => !a.isRead) 
    : alerts;

  const unreadCount = alerts.filter(a => !a.isRead).length;

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Alerts</h1>
          <p className="text-xs text-gray-500">{unreadCount} unread notifications</p>
        </div>
        <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center relative">
          <Bell size={18} className="text-red-600" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-[8px] text-white font-bold">{unreadCount}</span>
            </span>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <FilterTab 
          label="All" 
          count={alerts.length} 
          isActive={filter === 'all'} 
          onClick={() => setFilter('all')} 
        />
        <FilterTab 
          label="Unread" 
          count={unreadCount} 
          isActive={filter === 'unread'} 
          onClick={() => setFilter('unread')} 
        />
      </div>

      {/* Alert Cards */}
      <div className="space-y-2">
        {filteredAlerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>

      {/* Empty State */}
      {filteredAlerts.length === 0 && (
        <div className="text-center py-8">
          <CheckCircle2 size={32} className="text-green-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No unread alerts</p>
          <p className="text-[10px] text-gray-400">All systems operating normally</p>
        </div>
      )}

      {/* Info Banner */}
      <div className="card p-3 bg-blue-50 border-blue-100">
        <div className="flex items-start gap-2">
          <Info size={12} className="text-blue-500 mt-0.5 flex-shrink-0" />
          <p className="text-[10px] text-blue-700 leading-relaxed">
            Alerts are generated automatically by the AI engine when sensor data indicates 
            potential risks. Critical alerts trigger push notifications.
          </p>
        </div>
      </div>
    </div>
  );
}

function AlertCard({ alert }: { alert: Alert }) {
  const typeConfig = {
    danger: {
      icon: <AlertTriangle size={16} />,
      bg: 'bg-red-50',
      border: 'border-red-200',
      iconColor: 'text-red-600',
      dot: 'bg-red-500',
    },
    warning: {
      icon: <AlertCircle size={16} />,
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      iconColor: 'text-amber-600',
      dot: 'bg-amber-500',
    },
    info: {
      icon: <Info size={16} />,
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      iconColor: 'text-blue-600',
      dot: 'bg-blue-500',
    },
  };

  const config = typeConfig[alert.type];

  return (
    <div className={`card p-3 ${config.bg} border ${config.border} ${!alert.isRead ? 'ring-1 ring-offset-1' : 'opacity-80'} ${
      alert.type === 'danger' ? 'ring-red-200' : alert.type === 'warning' ? 'ring-amber-200' : 'ring-blue-200'
    } transition-smooth`}>
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${config.bg} ${config.iconColor} flex-shrink-0`}>
          {config.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="text-[11px] font-bold text-gray-800">{alert.title}</h4>
            {!alert.isRead && (
              <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></div>
            )}
          </div>
          <p className="text-[10px] text-gray-600 leading-relaxed mb-1.5">{alert.message}</p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></div>
              <span className="text-[9px] text-gray-500 font-medium">{alert.zoneName}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={8} className="text-gray-400" />
              <span className="text-[9px] text-gray-400">{alert.timestamp}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterTab({ label, count, isActive, onClick }: {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-[10px] font-semibold transition-all ${
        isActive
          ? 'bg-green-600 text-white shadow-sm'
          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
      }`}
    >
      {label} ({count})
    </button>
  );
}
