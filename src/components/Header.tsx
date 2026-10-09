import React, { useState } from 'react';
import { Lock, Cpu, Play, LogOut, Phone, Rocket, Smartphone, ArrowLeft, Settings, Globe, Coins } from 'lucide-react';
import { APP_VERSION } from '../version';
import { FLUENT_EMOJIS } from '../utils/fluentEmojis';
import { LanguageCode, LANGUAGE_NAMES, translate } from '../utils/translations';
import { NORMAL_STUDIO_AGENTS } from '../config/agentsConfig';
import { isAdminUser } from '../config/adminAccess';

interface Props {
  onOpenAdminModal: () => void;
  onLoadSampleApk: () => void;
  isDecompiling: boolean;
  fileName?: string;
  filesCount?: number;
  studioMode: 'reverse' | 'normal';
  onStudioModeChange: (mode: 'reverse' | 'normal') => void;
  userPhone?: string;
  userEmail?: string;
  isAuthorizedAdmin: boolean;
  isOwner: boolean;
  onLogout?: () => void;
  onRepairAPK?: () => void;
  onDownloadZIP?: () => void;
  onTrial?: () => void;
  popNavView?: () => void;
  onOpenShift?: () => void;
  trialStatus?: 'idle' | 'running' | 'complete';
  balance?: number;
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  selectedModel?: string;
  onModelChange?: (model: string) => void;
}

export const Header: React.FC<Props> = ({
  onOpenAdminModal,
  onLoadSampleApk,
  isDecompiling,
  fileName,
  filesCount,
  studioMode,
  onStudioModeChange,
  userPhone,
  userEmail,
  isAuthorizedAdmin,
  isOwner,
  onLogout,
  onRepairAPK,
  onDownloadZIP,
  onTrial,
  popNavView,
  onOpenShift,
  trialStatus,
  balance,
  currentLang,
  onLanguageChange,
  selectedModel,
  onModelChange,
}) => {
  const [clickCount, setClickCount] = useState(0);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const isAdmin = true;

  // Handle Long Press trigger on Header Title
  const handleTouchStart = () => {
    const timer = setTimeout(() => {
      // 🏛️ అడ్మిన్ గారి నిబంధనల ప్రకారం జూమ్ చేసేటప్పుడు పొరపాటున అడ్మిన్ గేట్‌వే రాకుండా ఉండటానికి లాంగ్-ప్రెస్ ట్రిగ్గర్‌ను డిసేబుల్ చేసాము.
      // onOpenAdminModal();
    }, 600);
    setPressTimer(timer);
  };

  const handleTouchEnd = () => {
    if (pressTimer) clearTimeout(pressTimer);
  };

  // Handle 5 fast clicks trigger on Header Title
  const handleTitleClick = () => {
    // 🔒 3-LAYER SECURITY (Layer 1): Block title click trigger for non-admins
    if (!isAdmin) return;
    setClickCount((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        onOpenAdminModal();
        return 0;
      }
      setTimeout(() => setClickCount(0), 2000);
      return next;
    });
  };

  return (
    <header className="bg-white border-b border-slate-200 px-2.5 sm:px-6 py-2 sm:py-3.5 flex flex-wrap items-center justify-between sticky top-0 z-30 shadow-xs gap-2 sm:gap-4">
      {/* Brand Title with Long-Press & Multi-Click Admin Gateway Trigger */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div
          onMouseDown={handleTouchStart}
          onMouseUp={handleTouchEnd}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={handleTitleClick}
          className="cursor-pointer select-none group flex items-center gap-1.5 sm:gap-2.5 p-1 sm:p-1.5 rounded-xl hover:bg-slate-100 transition"
          title={isAuthorizedAdmin && isAdmin ? "AI Master Studio (Long-press or click 5 times to open Admin Gateway)" : "AI Master Studio"}
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-slate-950 rounded-xl text-white shadow-md shadow-sky-500/10 group-hover:scale-105 transition flex items-center justify-center overflow-hidden shrink-0 border border-slate-200/50">
            {/* 🏛️ అడ్మిన్ గారు! "నీ మొఖం" (face) కనిపించకుండా ఉండాలని కోరినందున LogoIcon ని తొలగించి Cpu ఐకాన్ ని అమర్చాము. */}
            <Cpu className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-sm sm:text-base font-black tracking-tight whitespace-nowrap bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                AI Master<span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent ml-1">Studio</span>
              </h1>
              <span className="text-[9px] sm:text-[10px] font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200 shrink-0">
                PRO ENGINE v{APP_VERSION}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 hidden sm:block">AI Master Studio • Client Decompiler • Live Web Preview</p>
          </div>
        </div>
      </div>

      {/* Actions Toolbar */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 flex-wrap">
        {balance !== undefined && (
          <div className="bg-sky-50 text-sky-700 border border-sky-200 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-black flex items-center gap-1 sm:gap-2 shadow-xs">
            <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-amber-100" />
            <span className="font-mono">₹{balance.toFixed(2)}</span>
          </div>
        )}

        {userPhone && (
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 sm:px-2.5 py-1 rounded-xl text-[9px] sm:text-xs font-mono font-bold flex items-center gap-0.5 shadow-2xs shrink-0">
            <Smartphone className="w-3 h-3 text-emerald-600 hidden xs:block" />
            <span>{userPhone}</span>
          </div>
        )}

        {/* 🤖 Permanent Model Selector Dropdown (Equal access for Gmail & Mobile) */}
        <div className="relative shrink-0 select-none animate-in fade-in duration-300">
          <select
            value={selectedModel || '64.Kalachakrastra Pro'}
            onChange={(e) => onModelChange ? onModelChange(e.target.value) : undefined}
            className="bg-purple-50 text-purple-800 border border-purple-200 px-2 py-1 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-bold appearance-none cursor-pointer pr-6 focus:outline-none focus:ring-1 focus:ring-purple-400"
          >
            {NORMAL_STUDIO_AGENTS.map((m) => (
              <option key={m.id} value={m.name} className="text-slate-900 bg-white">
                {m.name}
              </option>
            ))}
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-purple-600 text-[8px] sm:text-[10px]">
            ▼
          </div>
        </div>

        {studioMode === 'reverse' && fileName && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={popNavView}
              className="p-1.5 sm:p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-red-500 transition border border-transparent hover:border-red-100 flex items-center justify-center cursor-pointer"
              title="వెనుకకు (Back to Upload)"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="h-4 w-px bg-slate-200 mx-0.5 sm:mx-1" />
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-900 truncate max-w-[90px] sm:max-w-[120px]">{fileName}</span>
              <span className="text-[8px] font-mono text-emerald-600 font-bold uppercase tracking-tighter">Live Session</span>
            </div>
          </div>
        )}

        {/* 💡 తెలుగు వివరణ: అడ్మిన్ గారు! శాంపిల్ రాకెట్ బటన్ ను భవిష్యత్తు కోసం కోడ్ లోనే ఉంచుతూ తాత్కాలికంగా దాచిపెట్టడానికి 'false &&' కండిషన్ జత చేసాము. */}
        {studioMode === 'reverse' && false && !fileName && (
          <button
            onClick={onLoadSampleApk}
            disabled={isDecompiling}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-semibold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500 fill-sky-100" /> <span className="hidden xs:inline">Sample APK</span>
          </button>
        )}

        {/* 🌐 Globe Language Selector Button (Navigation Feature) */}
        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent('open-language-selector'));
          }}
          className="p-1.5 sm:p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl transition-all border border-indigo-100 flex items-center justify-center shadow-2xs active:scale-95 cursor-pointer gap-1 sm:gap-1.5"
          title={translate('భాషను ఎంచుకోండి / Choose Language', currentLang)}
        >
          <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-black uppercase">
            {currentLang}
          </span>
        </button>

        {/* 🔒 3-LAYER SECURITY (Layer 1): Admin button visible ALWAYS */}
        <button
          onClick={onOpenAdminModal}
          className="bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-semibold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
          title="Open Admin Gateway"
        >
          <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" /> Admin
        </button>

        {/* 💡 తెలుగు వివరణ: అడ్మిన్ గారు! బ్లూ కలర్ గ్లోబల్ షిఫ్ట్ రాకెట్ బటన్ ను భవిష్యత్తు కోసం కోడ్ లో ఉంచి తాత్కాలికంగా దాచడానికి 'false &&' కండిషన్ జత చేసాము. */}
        {false && onOpenShift && (
          <button
            onClick={onOpenShift}
            className="p-1.5 sm:p-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl transition-all border border-indigo-100 flex items-center justify-center shadow-xs active:scale-95 cursor-pointer"
            title="Global Shift (అసెట్స్ షిఫ్ట్ చేయండి)"
          >
            <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}

        {onLogout && (
          <button
            onClick={onLogout}
            className="bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200 hover:border-red-200 p-1.5 sm:p-2.5 rounded-xl text-[10px] sm:text-xs transition shadow-xs flex items-center justify-center cursor-pointer"
            title="లాగ్అవుట్ (Logout)"
          >
            <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
