import React from 'react';
import { 
  ChevronDown, 
  Settings, 
  FileCode, 
  History, 
  Plus, 
  LayoutGrid, 
  ImageIcon, 
  LayoutDashboard, 
  Zap, 
  BookOpen, 
  ArrowUpRight, 
  Bell, 
  Search, 
  Key,
  Box,
  ChevronRight,
  Cloud,
  QrCode,
  ArrowLeft,
  Globe,
  Rocket
} from 'lucide-react';
import { ActiveModal, StudioTab, FeatureFlags } from '../types';
import { isAdminUser } from '../config/adminAccess';
import { useFirebase } from './FirebaseProvider';
import { safeStorage } from '../utils/safeStorage';

interface SidebarDrawerProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  setActiveModal: (modal: ActiveModal) => void;
  handleOpenPublishModal: () => void;
  setActiveTab: (tab: StudioTab) => void;
  handleCreateNewProject: () => void;
  setIsImageToUrlOpen: (open: boolean) => void;
  setIsExposingQRBoardOpen: (open: boolean) => void;
  setActiveExposingTab: (tab: string) => void;
  setIsUrlAppBuilderOpen?: (open: boolean) => void;
  setIsZipBuilderOpen?: (open: boolean) => void;
  setIsCloudConvertOpen?: (open: boolean) => void;
  setIsIcons8GlassOpen?: (open: boolean) => void;
  userEmail?: string;
  pushNavView: (viewId: string) => void;
  goBackNav: () => void;
  flags?: FeatureFlags;
  isAdminUnlocked?: boolean;
  onOpenShift?: () => void;
  onOpenVault?: () => void;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  setActiveModal,
  handleOpenPublishModal,
  setActiveTab,
  handleCreateNewProject,
  setIsImageToUrlOpen,
  setIsExposingQRBoardOpen,
  setActiveExposingTab,
  setIsUrlAppBuilderOpen,
  setIsZipBuilderOpen,
  setIsCloudConvertOpen,
  setIsIcons8GlassOpen,
  userEmail,
  pushNavView,
  goBackNav,
  flags,
  isAdminUnlocked,
  onOpenShift,
  onOpenVault
}) => {
  const { user, login, logout, projects } = useFirebase();

  const userPhone = safeStorage.getItem('user_phone');
  const isAuthorizedAdmin = isAdminUser(userEmail, userPhone, isAdminUnlocked);

  const handleSelfFixerClick = () => {
    if (!flags?.enableSelfFixer) {
      alert('Self-Fixer Engine is currently disabled by Admin in the Control Panel.');
      return;
    }
    pushNavView('self_fixer');
    setActiveModal('self_fixer' as any);
    setIsSidebarOpen(false);
  };

  if (!isSidebarOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex animate-fade-in" onClick={goBackNav}>
      <div className="w-72 bg-white h-full flex flex-col justify-between p-4 shadow-2xl font-sans text-slate-800 animate-slide-in-left select-none" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto space-y-5 pr-1 custom-scrollbar">
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={goBackNav}
                className="p-1.5 hover:bg-slate-100 rounded-full text-slate-700 transition cursor-pointer"
                title="వెనక్కి (Back)"
              >
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
              <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-600 transition">
                <h2 className="text-lg font-semibold tracking-tight text-slate-900">AI Master Studio</h2>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </div>
            </div>
            <button
              onClick={() => {
                pushNavView('settings');
                setActiveModal('settings');
                setIsSidebarOpen(false);
              }}
              className="p-1.5 hover:bg-slate-100 rounded-full text-slate-600 transition"
              title="సెట్టింగ్స్ (Settings)"
            >
              {/* 💡 తెలుగు వివరణ: అడ్మిన్ గారు! డ్రాయర్ హెడర్ లోని సెట్టింగ్స్ ఐకాన్ ను ఇన్విజిబుల్ గా మార్చడానికి 'Settings' ను కేవలం 4 అక్షరాల 'span' గా మార్చాము. */}
              <span className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Sections */}
          <div className="space-y-5 text-xs font-medium">
            {/* EXPLORE SECTION */}
            <div className="space-y-1">
              <div className="text-[10px] font-black text-slate-400 tracking-wider px-2 uppercase mb-2">EXPLORE</div>
              <button
                onClick={() => {
                  pushNavView('chat');
                  setActiveTab('chat');
                  setIsSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition text-sm font-medium"
              >
                <FileCode className="w-5 h-5 text-slate-400" />
                <span>Playground</span>
              </button>
              
              {/* Cloud Storage Button */}
              <button
                onClick={() => {
                  if (!user) {
                    login();
                  } else {
                    pushNavView('projects');
                    setActiveModal('projects');
                  }
                  setIsSidebarOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition text-sm font-medium"
              >
                <div className="flex items-center gap-3">
                  <Cloud className={`w-5 h-5 ${user ? 'text-emerald-500' : 'text-slate-400'}`} />
                  <span>{user ? `Cloud Projects (${projects.length})` : 'Connect Cloud'}</span>
                </div>
                {!user && <ArrowUpRight className="w-3.5 h-3.5 text-slate-300" />}
              </button>

              <button
                onClick={() => {
                  pushNavView('chat');
                  setActiveTab('chat');
                  setIsSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition text-sm font-medium"
              >
                <History className="w-5 h-5 text-slate-400" />
                <span>History</span>
              </button>
            </div>
            
            {/* 🚀 UNIVERSAL ASSETS SECTION (Modular Shifting Active) */}
            <div className="space-y-1">
              <div className="text-[10px] font-black text-slate-400 tracking-wider px-2 uppercase mb-2">UNIVERSAL ASSETS</div>
              <button
                onClick={() => {
                  onOpenVault?.();
                  setIsSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition text-sm font-medium"
              >
                <History className="w-5 h-5 text-slate-400" />
                <span>Saved Shifts Vault</span>
              </button>
            </div>

            {/* BUILD SECTION */}
            <div className="space-y-1">
              <div className="text-[10px] font-black text-slate-400 tracking-wider px-2 uppercase mb-2">BUILD</div>
              <button
                onClick={() => {
                  pushNavView('models');
                  setActiveModal('models');
                  setIsSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition text-sm font-medium"
              >
                <Box className="w-5 h-5 text-slate-400" />
                <span>Models</span>
              </button>
              <button
                onClick={() => {
                  pushNavView('new_app');
                  handleCreateNewProject();
                  setIsSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-3.5 rounded-2xl bg-slate-100 text-slate-900 hover:bg-slate-200 transition text-sm font-black mb-1"
              >
                <Plus className="w-5 h-5" />
                <span>New app</span>
              </button>
              <button
                onClick={() => {
                  pushNavView('url_app_builder');
                  if (setIsUrlAppBuilderOpen) {
                    setIsUrlAppBuilderOpen(true);
                  }
                  setActiveModal('url_app_builder');
                  setIsSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-800 bg-sky-50/80 hover:bg-sky-100 transition text-sm font-bold border border-sky-100/80"
              >
                <Globe className="w-5 h-5 text-sky-600" />
                <span>URL to App Builder</span>
              </button>

              {/* NEW FEATURE ADDITION #1: ZIP to APK/AAB Builder */}
              <button
                onClick={() => {
                  pushNavView('zip_apk_builder');
                  if (setIsZipBuilderOpen) {
                    setIsZipBuilderOpen(true);
                  }
                  setIsSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-amber-900 bg-amber-50 hover:bg-amber-100 transition text-sm font-bold border border-amber-200/80 shadow-xs"
              >
                <Zap className="w-5 h-5 text-amber-600 fill-amber-400" />
                <span>⚡ ZIP ➔ APK / AAB Builder</span>
              </button>
              <button
                onClick={() => {
                  pushNavView('my_apps');
                  setActiveModal('projects');
                  setIsSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition text-sm font-medium"
              >
                <LayoutGrid className="w-5 h-5 text-slate-400" />
                <span>My apps</span>
              </button>
              <button
                onClick={() => {
                  pushNavView('gallery');
                  setActiveModal('projects');
                  setIsSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition text-sm font-medium"
              >
                <ImageIcon className="w-5 h-5 text-slate-400" />
                <span>Gallery</span>
              </button>
            </div>

            {/* MANAGE SECTION */}
            <div className="space-y-1">
              <div className="text-[10px] font-black text-slate-400 tracking-wider px-2 uppercase mb-2">MANAGE</div>
              <button
                onClick={() => {
                  handleOpenPublishModal();
                  setIsSidebarOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition text-sm font-medium"
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-5 h-5 text-slate-400" />
                  <span>Dashboard</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </button>
              <button
                onClick={() => {
                  pushNavView('build_suite');
                  setActiveModal('build');
                  setIsSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition text-sm font-medium"
              >
                <Box className="w-5 h-5 text-indigo-500" />
                <span>Build Suite</span>
              </button>


              {isAuthorizedAdmin && flags?.enableSelfFixer && (
                <button
                  onClick={handleSelfFixerClick}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-amber-500" />
                    <span>AI Master Studio</span>
                  </div>
                </button>
              )}

              {/* Universal Converter & Link Generator - Prominently Displayed */}
              <button
                onClick={() => {
                  pushNavView('universal_converter');
                  if (setIsCloudConvertOpen) {
                    setIsCloudConvertOpen(true);
                  }
                  setIsSidebarOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-800 bg-rose-50/70 hover:bg-rose-100/80 transition text-sm font-bold border border-rose-100/80"
              >
                <div className="flex items-center gap-2.5 text-left min-w-0">
                  <Zap className="w-5 h-5 text-rose-500 shrink-0" />
                  <span className="truncate">Universal Converter</span>
                </div>
                <span className="bg-rose-500/10 text-rose-600 text-[10px] px-2 py-0.5 rounded font-black shrink-0 ml-1 border border-rose-500/20">
                  PNG•JPG•WEBP
                </span>
              </button>

              <button
                onClick={() => {
                  pushNavView('exposing_studio');
                  setIsImageToUrlOpen(true);
                  setActiveExposingTab('IMAGE');
                  setIsSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition text-sm font-medium"
              >
                <Zap className="w-5 h-5 text-indigo-500" />
                <span>Exposing Studio</span>
              </button>
              <button
                onClick={() => {
                  pushNavView('exposing_qr');
                  setIsExposingQRBoardOpen(true);
                  setIsSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition text-sm font-medium"
              >
                <QrCode className="w-5 h-5 text-fuchsia-500" />
                <span>Exposing QR</span>
              </button>
              
              <button
                onClick={() => {
                  pushNavView('icons8_glass');
                  if (setIsIcons8GlassOpen) {
                    setIsIcons8GlassOpen(true);
                  }
                  setIsSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition text-sm font-medium"
              >
                <span className="w-5 h-5 flex items-center justify-center text-lg">💎</span>
                <span>Icons8 Glassmorphism</span>
              </button>

              <button
                onClick={() => {
                  pushNavView('documentation');
                  setActiveModal('settings');
                  setIsSidebarOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition text-sm font-medium"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-slate-400" />
                  <span>Documentation</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Drawer Bottom Footer (Matching User Screenshot) */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between gap-1 px-1">
            <button 
              onClick={() => {
                pushNavView('bell');
                alert('Notifications: AI Master Studio Engine is running smoothly.');
                setIsSidebarOpen(false);
              }}
              className="p-3 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 text-slate-600 transition shadow-sm cursor-pointer"
              title="నోటిఫికేషన్లు (Notifications)"
            >
              <Bell className="w-5 h-5" />
            </button>
            <button 
              onClick={() => {
                pushNavView('gear');
                setActiveModal('settings');
                setIsSidebarOpen(false);
              }}
              className="p-3 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 text-slate-600 transition shadow-sm cursor-pointer"
              title="సెట్టింగ్స్ (Settings)"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button 
              onClick={() => {
                pushNavView('search');
                setActiveModal('projects');
                setIsSidebarOpen(false);
              }}
              className="p-3 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 text-slate-600 transition shadow-sm cursor-pointer"
              title="వెతుకు (Search Projects)"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => {
                pushNavView('key');
                setActiveModal('secrets');
                setIsSidebarOpen(false);
              }}
              className="p-3 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 text-slate-600 transition shadow-sm"
            >
              <Key className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Card (Exact Screenshot) */}
          <div onClick={() => { pushNavView('user_profile'); setIsSidebarOpen(false); }} className="p-3 bg-white border border-slate-100 rounded-2xl flex items-center justify-between gap-3 shadow-sm hover:border-slate-200 transition cursor-pointer">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 p-0.5 shrink-0 overflow-hidden flex items-center justify-center text-white font-black text-sm border-2 border-white shadow-sm">
                {(user?.email || userEmail || 'A')[0].toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-slate-900 truncate">{user?.email || userEmail}</div>
              </div>
            </div>
            {user ? (
              <button 
                onClick={(e) => { e.stopPropagation(); logout(); }}
                className="px-2 py-1 bg-rose-50 rounded-md text-[10px] font-black text-rose-500 tracking-tighter shrink-0 border border-rose-100 hover:bg-rose-100 transition"
              >
                LOGOUT
              </button>
            ) : (
              <div className="px-2 py-1 bg-slate-50 rounded-md text-[10px] font-black text-slate-500 tracking-tighter shrink-0 border border-slate-100">GUEST</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
