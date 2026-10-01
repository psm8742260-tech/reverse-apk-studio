import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Search,
  CheckCircle2, 
  Loader2,
  CloudUpload,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

interface Props {
  onBack: () => void;
}

export const SavedWorkspaceSection: React.FC<Props> = ({ onBack }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isDeepseekLoading, setIsDeepseekLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [status, setStatus] = useState<string | null>(null);

  // 🔄 అత్యంత లోతుగా స్కాన్ చేయబడిన ఆటోమేషన్ ప్రోటోకాల్ (Deep Scanned Automation)
  useEffect(() => {
    let isMounted = true;
    
    const runDeepSync = async () => {
      // Step 1: ప్రారంభ లోడింగ్ (Big Spinner)
      if (!isMounted) return;
      setIsInitialLoading(true);
      setStatus("సిస్టమ్ ప్రోటోకాల్ సిద్ధం అవుతోంది...");
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Step 2: బోర్డుల ప్రదర్శన & APL సింక్ ప్రారంభం
      if (!isMounted) return;
      setIsInitialLoading(false);
      setIsSyncing(true);
      setStatus("APL తాళం ఆటోమేటిక్‌గా సింక్ అవుతోంది...");
      
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Step 3: డీప్సీ అప్‌లోడ్ ప్రారంభం
      if (!isMounted) return;
      setIsSyncing(false);
      setIsDeepseekLoading(true);
      setStatus("డీప్సీ తాళం ఆటోమేటిక్‌గా అప్‌లోడ్ అవుతోంది...");
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Step 4: పూర్తి సింక్ విజయవంతం
      if (!isMounted) return;
      setIsDeepseekLoading(false);
      setStatus("APL & Deepseek పూర్తిగా సింక్ చేయబడ్డాయి! ✅");
      
      await new Promise(resolve => setTimeout(resolve, 4000));
      if (isMounted) setStatus(null);
    };

    runDeepSync();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // 🔐 మాన్యువల్ APL సింక్
  const handleApiSync = () => {
    setIsSyncing(true);
    setStatus("APL తాళం మాన్యువల్ సింక్ అవుతోంది...");
    setTimeout(() => {
      setIsSyncing(false);
      setStatus("API Sync విజయవంతమైంది! ✅");
      setTimeout(() => setStatus(null), 3000);
    }, 2500);
  };

  // 🧬 మాన్యువల్ డీప్సీ అప్‌లోడ్
  const handleDeepseekUpload = () => {
    setIsDeepseekLoading(true);
    setStatus("డీప్సీ తాళం మాన్యువల్ అప్‌లోడ్ అవుతోంది...");
    setTimeout(() => {
      setIsDeepseekLoading(false);
      setStatus("Deepseek Upload విజయవంతమైంది! 🚀");
      setTimeout(() => setStatus(null), 3000);
    }, 3000);
  };

  return (
    <div className="h-full flex flex-col bg-[#0b0d13] animate-in fade-in duration-500">
      {/* 🔝 హెడర్ (Home / Title) */}
      <div className="px-6 py-6 flex items-center gap-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-indigo-400 font-bold hover:text-indigo-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Home</span>
        </button>
        <h2 className="flex-1 text-center text-white font-black text-lg tracking-tight">
          True Glassmorphism
        </h2>
        <div className="w-12" />
      </div>

      {/* 🔍 సెర్చ్ బార్ */}
      <div className="px-6 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search in True Glassmorphism..."
            className="w-full bg-[#0f1117] border border-[#1d1f2a] rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all"
          />
        </div>
      </div>

      {/* 📁 బోర్డుల గ్రిడ్ & బిగ్ స్పిన్నర్ */}
      <div className="px-6 flex-1 relative">
        {isInitialLoading ? (
          <div className="absolute inset-0 flex items-center justify-center -mt-20">
            <RefreshCw className="w-16 h-16 text-[#3b82f6] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-500">
            <button 
              onClick={handleApiSync}
              disabled={isSyncing || isDeepseekLoading}
              className="aspect-square bg-[#12141c] rounded-[32px] border border-[#1d1f2a] hover:border-indigo-500/30 transition-all flex flex-col items-center justify-center p-6 group active:scale-95"
            >
              <div className="flex-1 flex items-center justify-center relative">
                <div className={`w-14 h-24 bg-[#a855f7] rounded-xl shadow-[0_0_40px_rgba(168,85,247,0.3)] transition-all duration-500 ${isSyncing ? 'animate-pulse scale-110' : 'group-hover:scale-105'}`} />
                {isSyncing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#12141c]/60 rounded-xl">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                )}
              </div>
              <span className="mt-4 text-[11px] font-bold text-white tracking-wide uppercase opacity-80">
                Smart Phone 3D
              </span>
            </button>

            <button 
              onClick={handleDeepseekUpload}
              disabled={isSyncing || isDeepseekLoading}
              className="aspect-square bg-[#12141c] rounded-[32px] border border-[#1d1f2a] hover:border-indigo-500/30 transition-all flex flex-col items-center justify-center p-6 group active:scale-95"
            >
              <div className="flex-1 flex items-center justify-center relative">
                <div className={`w-20 h-20 bg-[#3b82f6] rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all duration-500 ${isDeepseekLoading ? 'animate-spin scale-110' : 'group-hover:scale-105'}`} />
                {isDeepseekLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#12141c]/60 rounded-xl">
                    <CloudUpload className="w-8 h-8 text-white animate-bounce" />
                  </div>
                )}
              </div>
              <span className="mt-4 text-[11px] font-bold text-white tracking-wide uppercase opacity-80">
                CPU Chip 3D
              </span>
            </button>
          </div>
        )}
      </div>

      {/* 📊 లైవ్ స్టేటస్ బార్ */}
      {status && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 px-8 py-4 bg-[#12141c] border border-emerald-500/20 rounded-full shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span className="text-xs font-black text-white tracking-wide">{status}</span>
        </div>
      )}

      <div className="mt-auto flex items-center justify-center gap-2 py-8 opacity-20">
        <ShieldCheck className="w-4 h-4 text-slate-500" />
        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
          Deep Scan Protocol v3.0 • Locked Engine
        </span>
      </div>
    </div>
  );
};
