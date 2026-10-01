import React from 'react';
import { X, Monitor, Smartphone, Apple } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StoreReadyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (platform: string) => void;
}

export const StoreReadyModal: React.FC<StoreReadyModalProps> = ({ isOpen, onClose, onGenerate }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 flex items-start justify-between border-b border-slate-100">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Awesome! Your PWA is store ready!
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-md">
                You are now ready to ship your PWA to app stores. Generate store-ready packages for the Microsoft Store, Google Play, and iOS.
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
            {/* Value Proposition */}
            <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-100">
              <ul className="space-y-3">
                {[
                  'PWAs are first class apps',
                  'Collect 100% of revenue generated via third party commerce platforms',
                  '1B+ store enabled devices'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Store Grid */}
            <div className="space-y-6">
              {/* Microsoft Store */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                      <Monitor className="w-8 h-8 text-slate-700" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900">Microsoft Store</h3>
                      <p className="text-sm font-bold text-slate-500">Windows</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onGenerate('windows')}
                    className="px-8 py-3 bg-[#1e1b4b] text-white font-black rounded-full text-sm hover:bg-black transition-colors cursor-pointer shadow-lg shadow-indigo-900/20"
                  >
                    Generate Package
                  </button>
                </div>
                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  {[
                    'PWAs can be indistinguishable from native apps on Windows',
                    'PWAs are first class apps',
                    'Collect 100% of revenue generated via third party commerce platforms',
                    '1B+ store enabled devices'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                      <div className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Google Play */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                      <Smartphone className="w-8 h-8 text-slate-700" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900">Google Play</h3>
                      <p className="text-sm font-bold text-slate-500">Android</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onGenerate('android')}
                    className="px-8 py-3 bg-[#1e1b4b] text-white font-black rounded-full text-sm hover:bg-black transition-colors cursor-pointer shadow-lg shadow-indigo-900/20"
                  >
                    Generate Package
                  </button>
                </div>
                <ul className="mt-6 space-y-2">
                  {[
                    'PWAs are first class apps',
                    'One app store listing for all devices (mobile, tablet, desktop)',
                    '2.5 billion store enabled devices'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                      <div className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* App Store */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 relative">
                      <Apple className="w-8 h-8 text-slate-700" />
                      <div className="absolute -top-2 -right-6 px-1.5 py-0.5 bg-slate-100 text-[10px] font-black text-slate-500 rounded border border-slate-200 uppercase tracking-tighter">
                        Experimental
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900">App Store</h3>
                      <p className="text-sm font-bold text-slate-500">iOS</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onGenerate('ios')}
                    className="px-8 py-3 bg-[#1e1b4b] text-white font-black rounded-full text-sm hover:bg-black transition-colors cursor-pointer shadow-lg shadow-indigo-900/20"
                  >
                    Generate Package
                  </button>
                </div>
                <ul className="mt-6 space-y-2">
                  {[
                    'Leverage same codebase across all platforms',
                    'Unified analytics and user experience',
                    'Streamlined deployment and updates'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                      <div className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
            <button 
              onClick={onClose}
              className="text-xs font-bold text-slate-500 hover:text-indigo-600 underline underline-offset-4 cursor-pointer"
            >
              Maybe later
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
