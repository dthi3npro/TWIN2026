import { Leaf, Cpu } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-green-600 via-green-700 to-emerald-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute top-40 right-5 w-20 h-20 border border-white rounded-full"></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute bottom-60 right-16 w-16 h-16 border border-white rounded-full"></div>
      </div>
      
      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 border border-white/10 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 border border-white/15 rounded-full animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
      </div>

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-24 h-24 bg-white/15 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6 border border-white/20 shadow-2xl">
          <div className="relative">
            <Leaf className="text-white" size={40} strokeWidth={1.5} />
            <Cpu className="text-green-200 absolute -bottom-1 -right-1" size={18} strokeWidth={2} />
          </div>
        </div>
        
        {/* App name */}
        <h1 className="text-white text-2xl font-bold tracking-tight mb-1">
          CadmiGuard
        </h1>
        <p className="text-green-200 text-sm font-medium mb-8">
          AIoT Soil Intelligence
        </p>
        
        {/* Slogan */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/10">
          <p className="text-white/90 text-xs text-center font-medium leading-relaxed">
            🌱 Protecting Durian Farms with AI
          </p>
        </div>
        
        {/* Loading */}
        <div className="mt-12 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        <p className="text-green-200/60 text-[10px] mt-3 font-medium">
          Connecting to sensors...
        </p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-center">
        <p className="text-white/40 text-[10px]">
          Samsung Solve for Tomorrow 2026
        </p>
        <p className="text-white/30 text-[9px] mt-1">
          TWIN Team • AIoT Cadmium Risk Prediction
        </p>
      </div>
    </div>
  );
}
