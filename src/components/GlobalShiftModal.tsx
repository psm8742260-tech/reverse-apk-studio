import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Rocket, 
  Shield, 
  Save, 
  Download, 
  ChevronRight, 
  ArrowLeft,
  Box,
  Plus,
  Globe,
  Zap,
  LayoutGrid,
  QrCode,
  Sparkles,
  FileImage,
  Layers
} from 'lucide-react';

export interface ShiftItem {
  id: string;
  name: string;
  type: 'SMALI_CODE' | 'XML_LAYOUT' | '3D_ICON_ASSET' | 'LIVE_URL' | 'SOURCE_CODE' | 'IMAGE_ASSET' | 'APK_ASSET' | 'AAB_ASSET' | 'QR_CODE' | 'CODE_FIX' | 'UNIVERSAL_ASSET' | 'CODE_SNIPPET';
  content: string;
}

interface GlobalShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableItems: ShiftItem[];
  userId: string;
  onShiftToNormalStudio: (item: ShiftItem) => void;
  onShiftToReverseStudio: (item: ShiftItem) => void;
  isReduced?: boolean;
  onNavigate?: (view: string) => void;
}

const MAIN_8_NAV_FEATURES = [
  { id: 'exposing_qr', label: 'Exposing QR', icon: QrCode, bg: 'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-700 hover:bg-fuchsia-100' },
  { id: 'exposing_studio', label: 'Exposing Studio', icon: Zap, bg: 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100' },
  { id: 'universal_png', label: 'Universal PNG', icon: FileImage, bg: 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100' },
  { id: 'icons8_glass', label: 'Icon 8 Glasses', icon: Sparkles, bg: 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100' },
  { id: 'url_zip_apk', label: 'URL • ZIP ➔ APK', icon: Globe, bg: 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100' },
  { id: 'my_apps', label: 'My Apps', icon: LayoutGrid, bg: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100' },
  { id: 'new_app', label: 'New App', icon: Plus, bg: 'bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100' },
  { id: 'models', label: 'Models', icon: Box, bg: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100' },
];

export const GlobalShiftModal: React.FC<GlobalShiftModalProps> = ({
  isOpen,
  onClose,
  availableItems,
  userId,
  onShiftToNormalStudio,
  onShiftToReverseStudio,
  isReduced = false,
  onNavigate
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string>(availableItems[0]?.id || '');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const selectedItem = availableItems.find(i => i.id === selectedItemId) || availableItems[0];

  const handleSaveToVault = async () => {
    if (!selectedItem) return;
    setLoading(true);
    setStatus('Saving to Vault...');
    try {
      await axios.post('/api/shifts/vault/save', {
        userId,
        item: {
            ...selectedItem,
            id: selectedItem.id || `vault_${Date.now()}`
        }
      });
      setStatus('✅ Shift Vault లో విజవంతంగా సేవ్ చేయబడింది!');
      setTimeout(() => setStatus(null), 3000);
    } catch (e) {
      setStatus('❌ సేవింగ్ ఫెయిల్ అయింది.');
      setTimeout(() => setStatus(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleLocalDownload = () => {
    if (!selectedItem) return;
    const blob = new Blob([selectedItem.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedItem.name || 'shifted-asset'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus('📥 ఫైల్ డౌన్‌లోడ్ ప్రారంభమైంది!');
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-3"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 15 }}
          onDoubleClick={onClose}
          className="bg-white border border-slate-200 w-full max-w-sm rounded-xl shadow-xl overflow-hidden transition-all duration-300 max-h-[85vh] flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-sky-600 px-3 py-2 flex justify-between items-center text-white shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="bg-white/25 hover:bg-white/35 text-white rounded-lg p-1 transition flex items-center justify-center shadow-xs group"
                title="వెనుకకు (Back)"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <div className="flex items-center gap-1.5">
                <div className="bg-white/20 rounded-md p-1 backdrop-blur-xs">
                  <Rocket className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-white text-xs tracking-wide">TRANSFER ENGINE</h3>
                  <p className="text-white/80 text-[7px] font-bold uppercase tracking-widest leading-none">Shift Board</p>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="text-white/70 hover:text-white p-1 hover:bg-white/10 rounded-full transition">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 space-y-3 overflow-y-auto custom-scrollbar flex-1">
            {/* 1. Item Selection Picker */}
            <div className="space-y-0.5">
              <label className="text-[8px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <ChevronRight className="w-2.5 h-2.5 text-indigo-500" />
                షిఫ్ట్ చేయాల్సిన ఐటమ్ (ASSET SELECTION)
              </label>
              <div className="relative group">
                <select 
                  value={selectedItemId} 
                  onChange={(e) => setSelectedItemId(e.target.value)}
                  className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800 text-[11px] p-2 pr-7 focus:outline-none focus:border-indigo-500 transition cursor-pointer"
                >
                  {availableItems.map(item => (
                    <option key={item.id} value={item.id}>{item.name} [{item.type}]</option>
                  ))}
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-indigo-500 transition">
                  <ChevronRight className="w-3 h-3 rotate-90" />
                </div>
              </div>
            </div>

            {/* Status Indicator */}
            {status && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-lg text-center font-bold p-1.5 text-[11px] ${status.includes('✅') || status.includes('📥') ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-indigo-50 text-indigo-600 border border-indigo-200'}`}
              >
                {status}
              </motion.div>
            )}

            {/* 2. Unified Action Buttons */}
            <div className="grid grid-cols-2 gap-1.5">
              <button 
                onClick={() => { onShiftToNormalStudio(selectedItem); onClose(); }}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl p-2 transition shadow-xs group text-left"
              >
                <div className="bg-white/20 rounded-md p-1 group-hover:scale-105 transition shrink-0">
                  <Rocket className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-bold text-[7px] opacity-75 leading-tight">Workspace</p>
                  <p className="font-black text-[11px] leading-tight">Shift to AI Studio</p>
                </div>
              </button>

              <button 
                onClick={() => { onShiftToReverseStudio(selectedItem); onClose(); }}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl p-2 transition shadow-xs group text-left"
              >
                <div className="bg-white/10 rounded-md p-1 group-hover:scale-105 transition shrink-0">
                  <Shield className="text-sky-400 w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-bold text-[7px] opacity-75 leading-tight">Binary Analysis</p>
                  <p className="font-black text-[11px] leading-tight">Shift to Reverse Studio</p>
                </div>
              </button>

              <button 
                onClick={handleSaveToVault}
                disabled={loading}
                className="flex items-center gap-2 bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/60 text-slate-800 rounded-xl p-2 transition group text-left"
              >
                <div className="bg-slate-100 group-hover:bg-emerald-100 rounded-md p-1 transition shrink-0">
                  <Save className="text-slate-600 group-hover:text-emerald-600 w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-bold text-[7px] text-slate-400 leading-tight">Permanent Cloud</p>
                  <p className="font-black text-[11px] text-slate-800 group-hover:text-emerald-700 leading-tight">Save to Vault</p>
                </div>
              </button>

              <button 
                onClick={handleLocalDownload}
                className="flex items-center gap-2 bg-white border border-slate-200 hover:border-sky-500 hover:bg-sky-50/60 text-slate-800 rounded-xl p-2 transition group text-left"
              >
                <div className="bg-slate-100 group-hover:bg-sky-100 rounded-md p-1 transition shrink-0">
                  <Download className="text-slate-600 group-hover:text-sky-600 w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-bold text-[7px] text-slate-400 leading-tight">Local Storage</p>
                  <p className="font-black text-[11px] text-slate-800 group-hover:text-sky-700 leading-tight">Download File</p>
                </div>
              </button>
            </div>

            {/* 3. 8 Main Navigation Features Section */}
            <div className="pt-1.5 border-t border-slate-100 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Layers className="w-2.5 h-2.5 text-indigo-600" />
                  ముఖ్యమైన 8 ఫీచర్స్ (STUDIO NAVIGATION)
                </span>
                <span className="text-[7px] font-extrabold text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded-full border border-indigo-100">8 FEATURES</span>
              </div>

              <div className="grid grid-cols-2 gap-1">
                {MAIN_8_NAV_FEATURES.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate?.(item.id);
                      }}
                      className={`flex items-center gap-1.5 p-1.5 rounded-lg border text-[11px] font-bold transition-all transform active:scale-95 text-left ${item.bg}`}
                    >
                      <IconComponent className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate leading-tight text-[10px]">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-slate-50 border-t border-slate-100 px-3 py-2 flex justify-center shrink-0">
            <button 
              onClick={onClose}
              className="px-5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-extrabold text-[11px] rounded-lg transition"
            >
              CLOSE BOARD
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

