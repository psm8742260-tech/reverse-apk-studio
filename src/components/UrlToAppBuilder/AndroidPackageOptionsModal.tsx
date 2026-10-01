import React, { useState } from 'react';
import { X, Smartphone, Info, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AndroidPackageOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appName: string;
  packageId: string;
  onDownload: (data: { appName: string; packageId: string; shortName: string; format: 'apk' | 'aab' }) => void;
}

export const AndroidPackageOptionsModal: React.FC<AndroidPackageOptionsModalProps> = ({ 
  isOpen, 
  onClose, 
  appName: initialAppName,
  packageId: initialPackageId,
  onDownload 
}) => {
  const [appName, setAppName] = useState(initialAppName);
  const [packageId, setPackageId] = useState(initialPackageId);
  const [shortName, setShortName] = useState(initialAppName.substring(0, 10));
  const [activeTab, setActiveTab] = useState<'google-play' | 'other'>('other');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                <Smartphone className="w-8 h-8 text-slate-800" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 leading-tight">
                  Google Play Store Package Options
                </h2>
                <p className="text-xs font-bold text-slate-500 mt-0.5">
                  Customize your app for the app store
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-100">
            <button 
              onClick={() => setActiveTab('google-play')}
              className={`flex-1 py-4 text-sm font-black transition-all relative ${
                activeTab === 'google-play' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Google Play
              {activeTab === 'google-play' && (
                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600" />
              )}
            </button>
            <button 
              onClick={() => setActiveTab('other')}
              className={`flex-1 py-4 text-sm font-black transition-all relative flex items-center justify-center gap-2 ${
                activeTab === 'other' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Other Android
              <Info className="w-4 h-4 opacity-60" />
              {activeTab === 'other' && (
                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600" />
              )}
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-6 overflow-y-auto">
            {/* Package ID */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-sm font-black text-slate-700">
                Package ID *
                <Info className="w-3.5 h-3.5 text-slate-400" />
              </label>
              <input 
                type="text"
                value={packageId}
                onChange={(e) => setPackageId(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all"
              />
            </div>

            {/* App Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-sm font-black text-slate-700">
                App name *
                <Info className="w-3.5 h-3.5 text-slate-400" />
              </label>
              <input 
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all"
              />
            </div>

            {/* Short Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-sm font-black text-slate-700">
                Short name *
                <Info className="w-3.5 h-3.5 text-slate-400" />
              </label>
              <input 
                type="text"
                value={shortName}
                onChange={(e) => setShortName(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-6">
            <button 
              onClick={() => onDownload({ appName, packageId, shortName, format: activeTab === 'google-play' ? 'aab' : 'apk' })}
              className="w-full py-5 bg-[#1e1b4b] hover:bg-black text-white font-black rounded-2xl text-base shadow-xl shadow-indigo-900/10 transition-all active:scale-[0.98] cursor-pointer"
            >
              Download Package
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
