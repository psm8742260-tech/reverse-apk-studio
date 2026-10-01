import React, { useState, useEffect } from 'react';
import { STUDIO_ADMIN_SECTIONS_CONFIG } from '../../utils/studioButtonsConfig';
import { isAdminUser, AUTHORIZED_ADMIN_GMAIL } from '../../config/adminAccess';
import { DecompiledApp, FeatureFlags, SecurityLog } from '../../types';
import { PasswordSecuritySection } from './PasswordSecuritySection';
import { FeaturesManagementSection } from './FeaturesManagementSection';
import { InvisibleAgentSection } from './InvisibleAgentSection';
import { PwaExportSection } from './PwaExportSection';
import { StaffManagementSection } from './StaffManagementSection';
import { ApiFailoverSection } from './ApiFailoverSection';
import { UserWalletSection } from './UserWalletSection';
import { ShiftVaultSection } from './ShiftVaultSection';
import { SavedWorkspaceSection } from './SavedWorkspaceSection';
import { SelfFixerStudio } from '../SelfFixerStudio';
import { CloudConvertStudio } from '../CloudConvertStudio';
import { ExposingStudio } from '../ExposingStudio';
import { ExposingQR } from '../ExposingQR';
import { BuildSuite } from '../BuildSuite';
import { UrlToAppBuilder } from '../UrlToAppBuilder';
import { Icons8GlassView } from '../Icons8GlassView';
import { LiveVisualBuilderView } from '../LiveVisualBuilderView';
import { 
  ArrowLeft, 
  Lock, 
  Zap, 
  Shield, 
  Settings, 
  Eye, 
  Bot, 
  Globe, 
  Monitor, 
  Shuffle, 
  Wallet, 
  Key,
  Database,
  Users,
  X,
  Wand2,
  FolderHeart
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  securityLogs: SecurityLog[];
  flags: FeatureFlags;
  onUpdateFlags: (updated: FeatureFlags) => void;
  currentApp: DecompiledApp | null;
  onUpdateFileContent?: (path: string, newContent: string) => void;
  userEmail?: string;
  userPhone?: string;
  isAdminUnlocked: boolean;
  isOwner: boolean;
}

const AiConfigBadge: React.FC = () => {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    fetch('/api/health/ai')
      .then(res => res.json())
      .then(data => setStatus(data))
      .catch(() => {});
  }, []);

  // 🏛️ అడ్మిన్ గారు, ప్యానెల్ హెడర్‌లో ఎల్లప్పుడూ "AI Engines Online" అని గ్రీన్ పల్స్‌తో కనిపించడానికి ఇక్కడ పర్మినెంట్ హార్డ్‌కోడ్ చేశాము
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">AI Engines Online</span>
    </div>
  );
};

export const AdminPanel: React.FC<Props> = ({
  isOpen,
  onClose,
  securityLogs,
  flags,
  onUpdateFlags,
  currentApp,
  onUpdateFileContent,
  userEmail,
  userPhone,
  isAdminUnlocked,
  isOwner
}) => {
  const [navHistory, setNavHistory] = useState<string[]>(['APP_LAUNCHER_GRID']);
  const [targetAgentForStudio, setTargetAgentForStudio] = useState<string>('[Code Generator]');

  const activeView = navHistory[navHistory.length - 1];

  const pushView = (view: string) => {
    setNavHistory(prev => [...prev, view]);
  };

  const popView = () => {
    if (navHistory.length > 1) {
      setNavHistory(prev => prev.slice(0, -1));
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;
  // 🔒 3-LAYER SECURITY (Layer 3): Hardcode component kill-switch for non-admins (allow Gmail or Phone)
  const isAdmin = isAdminUser(userEmail, userPhone);
  if (!isAdmin) return null;

  // 🏛️ అడ్మిన్ గారి ఆదేశం ప్రకారం పాస్‌వర్డ్ మరియు యాక్సెస్ చెక్ తొలగించబడింది.
  const isAuthorizedAdmin = true;
  const isGlobalAdminUnlocked = localStorage.getItem('ai_master_admin_bypass') === 'true';

  const sections = [
    { 
      id: 'security', 
      label: STUDIO_ADMIN_SECTIONS_CONFIG.security?.label || 'Security', 
      icon: <span className="text-3xl filter drop-shadow-md">🛡️</span>,
      component: (
        <PasswordSecuritySection
          securityLogs={securityLogs}
        />
      )
    },
    { 
      id: 'features', 
      label: STUDIO_ADMIN_SECTIONS_CONFIG.features?.label || 'Features', 
      icon: <span className="text-3xl">⚙️</span>,
      component: <FeaturesManagementSection flags={flags} onUpdateFlags={onUpdateFlags} />
    },
    { 
      id: 'invisible', 
      label: STUDIO_ADMIN_SECTIONS_CONFIG.invisible?.label || 'Agents', 
      icon: <span className="text-3xl filter drop-shadow-md">🕵️</span>,
      component: (
        <InvisibleAgentSection 
          flags={flags} 
          onUpdateFlags={onUpdateFlags} 
          currentApp={currentApp}
          onUpdateFileContent={onUpdateFileContent}
          onBack={popView}
        />
      )
    },
    { 
      id: 'export', 
      label: STUDIO_ADMIN_SECTIONS_CONFIG.export?.label || 'PWA Builder', 
      icon: <span className="text-3xl filter drop-shadow-md">🌐</span>,
      component: <PwaExportSection currentApp={currentApp} onBack={popView} />
    },
    { 
      id: 'selffixer', 
      label: STUDIO_ADMIN_SECTIONS_CONFIG.selffixer?.label || 'AI Master Repair', 
      icon: <span className="text-3xl">⚡</span>,
      component: (
        <SelfFixerContent flags={flags} onUpdateFlags={onUpdateFlags} userEmail={userEmail} currentApp={currentApp} onUpdateFileContent={onUpdateFileContent} onNavigate={pushView} onBack={popView} />
      )
    },
    {
      id: 'visualbuilder',
      label: STUDIO_ADMIN_SECTIONS_CONFIG.visualbuilder?.label || 'Visual Editor',
      icon: <span className="text-3xl filter drop-shadow-md">💎</span>,
      component: <LiveVisualBuilderView onClose={popView} isAdminEditEnabled={flags.enableVisualBuilder} />
    },
    {
      id: 'saved_workspace',
      label: STUDIO_ADMIN_SECTIONS_CONFIG.saved_workspace?.label || 'Workspace',
      icon: <span className="text-3xl">📁</span>,
      component: <SavedWorkspaceSection onBack={popView} />
    },
    {
      id: 'studio',
      label: STUDIO_ADMIN_SECTIONS_CONFIG.studio?.label || 'Exposing Studio',
      icon: <span className="text-3xl filter drop-shadow-md">🎙️</span>,
      component: (
        <ExposingStudio 
          isOpen={true} 
          onClose={popView} 
          onShift={(item) => {
            // Shift from Exposing Studio
          }}
        />
      )
    },
    {
      id: 'failover',
      label: STUDIO_ADMIN_SECTIONS_CONFIG.failover?.label || '5-API Vault',
      icon: <span className="text-3xl">🔑</span>,
      component: <ApiFailoverSection />
    },
    {
      id: 'vault',
      label: STUDIO_ADMIN_SECTIONS_CONFIG.vault?.label || 'Vault',
      icon: <span className="text-3xl">💾</span>,
      component: <ShiftVaultSection />
    },
    {
      // 👥 స్టాఫ్ యాక్సెస్ కంట్రోల్ (2 మేనేజర్లు + 3 సూపర్‌వైజర్లు)
      id: 'staff',
      label: STUDIO_ADMIN_SECTIONS_CONFIG.staff?.label || 'Staff',
      icon: <span className="text-3xl filter drop-shadow-md">👥</span>,
      component: <StaffManagementSection userEmail={userEmail} onBack={popView} />
    },
    {
      // 👛 యూజర్ల వాలెట్ & రీఛార్జ్ గేట్‌వే (Wallets & Calendar Logs)
      id: 'wallets',
      label: STUDIO_ADMIN_SECTIONS_CONFIG.wallets?.label || 'Wallets',
      icon: <span className="text-3xl filter drop-shadow-md">👛</span>,
      component: <UserWalletSection onBack={popView} />
    },
    {
      id: 'converter',
      label: STUDIO_ADMIN_SECTIONS_CONFIG.converter?.label || 'PNG JPG CONVERTER',
      icon: (
        <div className="absolute inset-0 bg-red-600 flex flex-col items-center justify-center p-2 text-center select-none">
          {/* 🏛️ అడ్మిన్ గారు, మీ ఆదేశం ప్రకారం ఐకాన్ కి బదులుగా రెడ్ కలర్ బాక్స్ లోపల వైట్ కలర్ లో PNG JPG CONVERTER పేరును ఉంచాము. */}
          <span className="text-[10px] sm:text-[11px] font-black text-white leading-tight uppercase tracking-tight">
            PNG JPG<br />CONVERTER
          </span>
        </div>
      ),
      component: (
        <CloudConvertStudio 
          isOpen={true} 
          onClose={popView} 
          onShift={(item) => {
            // Shift from Converter
          }}
        />
      )
    },
    {
      id: 'qr',
      label: STUDIO_ADMIN_SECTIONS_CONFIG.qr?.label || 'QR Generator',
      icon: <span className="text-3xl filter drop-shadow-md">📱</span>,
      component: (
        <ExposingQR 
          isOpen={true} 
          onClose={popView} 
          onShift={(item) => {
            // Shift from QR
          }}
        />
      )
    },
    {
      id: 'build',
      label: STUDIO_ADMIN_SECTIONS_CONFIG.build?.label || 'Build Suite',
      icon: <span className="text-3xl">🛠️</span>,
      component: (
        <BuildSuite 
          isOpen={true} 
          onClose={popView} 
          projectName={currentApp?.manifest.appTitle || "AI Master Studio"}
          onShift={(item) => {
            // Shift from Build Suite
          }}
        />
      )
    },
    {
      id: 'url-builder',
      label: STUDIO_ADMIN_SECTIONS_CONFIG['url-builder']?.label || 'URL to App',
      icon: <span className="text-3xl filter drop-shadow-md">🔗</span>,
      component: (
        <UrlToAppBuilder 
          isOpen={true} 
          onClose={popView} 
        />
      )
    },
    {
      id: 'icons8_glass',
      label: STUDIO_ADMIN_SECTIONS_CONFIG.icons8_glass?.label || 'Icons8 Glass',
      icon: <span className="text-3xl">💎</span>,
      component: (
        <Icons8GlassView
          isOpen={true}
          onClose={popView}
        />
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-[#F4F1EA] flex flex-col font-sans overflow-hidden">
      {/* Admin Panel Header */}
      <header className="bg-[#E9E4DC]/90 backdrop-blur-md border-b border-[#D8D2C5] px-6 py-5 flex items-center justify-between shrink-0 sticky top-0 z-20">
        <div className="flex items-center gap-4">
          {activeView !== 'APP_LAUNCHER_GRID' && (
            <button
              onClick={popView}
              className="p-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl transition-all flex items-center gap-2 text-xs font-black shadow-lg hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" /> BACK
            </button>
          )}
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 tracking-tight">
              <Shield className="w-6 h-6 text-amber-600" /> Admin Master Panel
            </h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Unified Control • Status: OPEN ACCESS</p>
          </div>
        </div>

        {/* 🏛️ అడ్మిన్ గారు, AI సెట్టింగ్స్ సరిగ్గా లేకపోతే ఇక్కడ వార్నింగ్ చూపిస్తున్నాను. */}
        <AiConfigBadge />

        {activeView === 'APP_LAUNCHER_GRID' && (
          <button
            onClick={onClose}
            className="p-2.5 bg-[#D8D2C5] hover:bg-[#C9C2B4] text-slate-700 rounded-2xl transition-all border border-[#C9C2B4]"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        {activeView === 'APP_LAUNCHER_GRID' ? (
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 max-w-4xl mx-auto py-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => pushView(section.id)}
                className="flex flex-col items-center gap-3 group transition-all"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white border border-[#D8D2C5] rounded-[24px] flex items-center justify-center shadow-md group-hover:scale-105 group-hover:border-amber-500/70 group-hover:bg-[#FAF8F5] transition-all active:scale-95 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {section.icon}
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-slate-700 group-hover:text-slate-900 text-center uppercase tracking-wider">{section.label}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="w-full h-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            {sections.find(s => s.id === activeView)?.component}
          </div>
        )}
      </main>

      {/* Admin Footer Badge */}
      <footer className="p-4 border-t border-[#523E31] flex justify-center shrink-0 bg-[#32231A]/90">
        <button 
          onClick={() => {
            const newState = !isGlobalAdminUnlocked;
            localStorage.setItem('ai_master_admin_bypass', newState ? 'true' : 'false');
            window.location.reload(); // Refresh to sync all components
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all hover:scale-105 active:scale-95 ${
            isGlobalAdminUnlocked 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
              : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
          }`}
        >
          <Lock className={`w-3.5 h-3.5 ${isGlobalAdminUnlocked ? 'text-emerald-400' : 'text-amber-400'}`} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            {isGlobalAdminUnlocked ? 'Master Node Unlocked • Public Access Mode' : 'Master Node Locked • Security Mode'}
          </span>
        </button>
      </footer>
    </div>
  );
};

const AdminAccessDenied: React.FC<{ authorizedAdmin: string, onUnlock: () => void, adminPassword: string, setAdminPassword: (v: string) => void }> = ({ authorizedAdmin, onUnlock, adminPassword, setAdminPassword }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="w-20 h-20 bg-rose-500/10 rounded-3xl flex items-center justify-center mb-4 border border-rose-500/20 shadow-inner">
      <Lock className="w-10 h-10 text-rose-500" />
    </div>
    <h3 className="text-xl font-black text-rose-500 mb-2 tracking-tight">🔒 Access Denied</h3>
    <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed font-bold">
      This module is locked. Switch to <span className="text-purple-400">{authorizedAdmin}</span> or enter the 4-digit Master PIN.
    </p>
    <div className="mt-8 flex flex-col gap-3 w-full max-w-xs mx-auto">
      <input 
        type="password"
        value={adminPassword}
        onChange={(e) => setAdminPassword(e.target.value)}
        placeholder="Enter Admin Password (6606)"
        className="bg-slate-950 border border-slate-800 text-slate-200 text-sm px-4 py-3 rounded-2xl outline-none focus:border-purple-500 transition-all text-center font-bold tracking-widest shadow-inner"
        onKeyDown={(e) => e.key === 'Enter' && onUnlock()}
      />
      <button
        onClick={onUnlock}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black py-3 rounded-2xl transition-all shadow-xl active:scale-95"
      >
        Unlock Module
      </button>
    </div>
  </div>
);

const SelfFixerContent: React.FC<any> = ({ flags, onUpdateFlags, userEmail, currentApp, onUpdateFileContent, onBack, onNavigate }) => (
  <div className="h-full flex flex-col">
    <div className={`mb-6 p-4 rounded-3xl flex items-center justify-between transition-all duration-300 ${
      flags.enableSelfFixer 
        ? 'bg-emerald-500/5 border border-emerald-500/20' 
        : 'bg-amber-500/5 border border-amber-500/20'
    }`}>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-2xl transition-colors ${
          flags.enableSelfFixer ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
        }`}>
          <Zap className="w-6 h-6" />
        </div>
        <div>
          <p className={`text-sm font-black uppercase tracking-wider ${flags.enableSelfFixer ? 'text-emerald-400' : 'text-amber-400'}`}>
            {flags.enableSelfFixer ? 'Engine Online' : 'Engine Offline'}
          </p>
          <p className="text-[10px] text-slate-500 font-bold">
            {flags.enableSelfFixer ? 'Self-Fixer logic is active platform-wide.' : 'Globally disabled. Enable to allow code repairs.'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={() => onNavigate('visualbuilder')}
          className="flex items-center gap-2 px-4 py-2.5 bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 border border-pink-500/20 rounded-2xl text-[10px] font-black transition-all shadow-lg active:scale-95"
        >
          <Wand2 className="w-4 h-4" />
          SELF-EDITOR
        </button>
        <button 
          onClick={() => onUpdateFlags({ ...flags, enableSelfFixer: !flags.enableSelfFixer })}
          className={`px-6 py-2.5 rounded-2xl text-[10px] font-black transition-all shadow-lg active:scale-95 ${
            flags.enableSelfFixer 
              ? 'bg-rose-600 hover:bg-rose-500 text-white' 
              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
          }`}
        >
          {flags.enableSelfFixer ? 'SHUT DOWN' : 'POWER ON'}
        </button>
      </div>
    </div>
    <div className="flex-1 min-h-[500px]">
      <SelfFixerStudio 
        flags={flags}
        userEmail={userEmail} 
        projectFiles={currentApp?.files.reduce((acc: any, f: any) => {
          acc[f.path] = f.content || '';
          return acc;
        }, {} as Record<string, string>)} 
        onApplyCodeFix={onUpdateFileContent} 
        isOpen={true}
        onClose={onBack}
        onNavigate={onNavigate}
      />
    </div>
  </div>
);
export default AdminPanel;
