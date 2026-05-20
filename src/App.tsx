import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SplashScreen from './screens/SplashScreen';
import Dashboard from './screens/Dashboard';
import ZoneMonitoring from './screens/ZoneMonitoring';
import AIAnalysisScreen from './screens/AIAnalysisScreen';
import RecommendationScreen from './screens/RecommendationScreen';
import AlertsScreen from './screens/AlertsScreen';
import HistoricalDataScreen from './screens/HistoricalDataScreen';
import BottomNav from './components/BottomNav';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <MobileFrame>
        <SplashScreen />
      </MobileFrame>
    );
  }

  return (
    <Router>
      <MobileFrame>
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto pb-20">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/zones" element={<ZoneMonitoring />} />
              <Route path="/analysis" element={<AIAnalysisScreen />} />
              <Route path="/recommendations" element={<RecommendationScreen />} />
              <Route path="/alerts" element={<AlertsScreen />} />
              <Route path="/history" element={<HistoricalDataScreen />} />
            </Routes>
          </div>
          <BottomNav />
        </div>
      </MobileFrame>
    </Router>
  );
}

// Mobile phone frame wrapper for desktop preview
function MobileFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="relative w-[390px] h-[844px] bg-white rounded-[3rem] shadow-2xl overflow-hidden border-[8px] border-gray-800">
        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 z-50 h-11 bg-white/80 backdrop-blur-md flex items-center justify-between px-8">
          <span className="text-xs font-semibold">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2.5 border border-gray-800 rounded-sm relative">
              <div className="absolute inset-0.5 bg-gray-800 rounded-sm" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-gray-800 rounded-b-2xl z-50"></div>
        {/* Content */}
        <div className="h-full pt-11 overflow-hidden">
          {children}
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-800 rounded-full z-50"></div>
      </div>
    </div>
  );
}

export default App;
