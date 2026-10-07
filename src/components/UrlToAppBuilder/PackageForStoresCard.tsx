import React from 'react';
import { Package, Download, Store, Sparkles, AlertCircle } from 'lucide-react';

interface PackageForStoresCardProps {
  onOpenStoreModal: () => void;
  onDownloadTest: () => void;
  hasErrors?: boolean;
}

export function PackageForStoresCard({
  onOpenStoreModal,
  onDownloadTest,
  hasErrors = false
}: PackageForStoresCardProps) {
  return (
    <div className="bg-gradient-to-br from-indigo-900/90 via-slate-900 to-slate-950 text-white rounded-2xl p-5 border border-indigo-500/20 shadow-lg relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
              <Store className="w-5 h-5" />
            </span>
            <h3 className="text-base font-bold text-white tracking-tight">Package For Stores</h3>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
              Ready
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-xl">
            మీ వెబ్ అప్లికేషన్‌ను గూగుల్ ప్లే స్టోర్ లేదా ఇతర యాప్ స్టోర్‌లలో ప్రచురించడానికి అవసరమైన పూర్తి ఆండ్రాయిడ్ ప్యాకేజీని సిద్ధం చేసుకోండి.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto">
          <button
            onClick={onDownloadTest}
            type="button"
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
          >
            <Download className="w-4 h-4 text-slate-400" />
            <span>డౌన్‌లోడ్ టెస్ట్ APK</span>
          </button>

          <button
            onClick={onOpenStoreModal}
            type="button"
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/25 transition-all"
          >
            <Package className="w-4 h-4" />
            <span>స్టోర్ ప్యాకేజ్ సిద్ధం చేయండి</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </button>
        </div>
      </div>

      {hasErrors && (
        <div className="mt-3.5 pt-3 border-t border-slate-800 flex items-center gap-2 text-rose-400 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>కొన్ని ఎర్రర్లు గుర్తించబడ్డాయి. దయచేసి వాటిని సరిచేసిన తర్వాత స్టోర్ ప్యాకేజీని రూపొందించండి.</span>
        </div>
      )}
    </div>
  );
}
