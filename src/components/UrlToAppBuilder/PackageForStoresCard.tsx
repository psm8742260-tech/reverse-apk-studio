import React from 'react';
import { Package, Monitor, Apple, Smartphone } from 'lucide-react';

interface PackageForStoresCardProps {
  onOpenStoreModal: () => void;
  onDownloadTest: () => void;
  hasErrors?: boolean;
}

export const PackageForStoresCard: React.FC<PackageForStoresCardProps> = ({ 
  onOpenStoreModal, 
  onDownloadTest,
  hasErrors = false
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col items-center justify-center text-center space-y-4 relative overflow-hidden">
      {/* 🛡️ అడ్మిన్ గారు! ఎర్రర్లు ఉన్నప్పుడు బటన్ మీద ఈ మాస్క్ కనిపిస్తుంది. కానీ అడ్మిన్ కాబట్టి మేము కేవలం వార్నింగ్ మాత్రమే చూపిస్తున్నాము. */}
      {hasErrors && (
        <div className="w-full bg-rose-50 border border-rose-200 text-rose-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest mb-4">
          Warning: Critical PWA errors detected. Some features may not work.
        </div>
      )}

      <div className="w-full max-w-md space-y-2 relative z-0">
        <button
          onClick={onOpenStoreModal}
          className="w-full py-4 bg-[#1e1b4b] hover:bg-black hover:scale-[1.01] active:scale-[0.99] text-white font-black rounded-full text-base shadow-lg shadow-indigo-900/20 transition-all transform flex items-center justify-center gap-3 cursor-pointer"
        >
          <Package className="w-5 h-5" />
          <span>Package For Stores</span>
        </button>

        <div className="pt-2">
          <button
            onClick={onDownloadTest}
            className="text-xs font-bold text-slate-500 hover:text-indigo-600 underline underline-offset-4 cursor-pointer transition"
          >
            Download Test Package
          </button>
        </div>
      </div>

      {/* Horizontal Divider */}
      <div className="w-full border-t border-slate-100 pt-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-slate-500">
          <span className="font-bold text-slate-800">Available stores:</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-700 font-bold">
              <Monitor className="w-3.5 h-3.5" />
              <span>Windows</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-700 font-bold">
              <Apple className="w-3.5 h-3.5" />
              <span>Apple</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-700 font-bold">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
