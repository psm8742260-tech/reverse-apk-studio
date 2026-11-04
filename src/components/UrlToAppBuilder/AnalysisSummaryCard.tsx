import React from 'react';
import { Globe, Share2, Check, RotateCw } from 'lucide-react';
import { AnalysisReport } from './types';

interface AnalysisSummaryCardProps {
  report: AnalysisReport;
  copiedShare: boolean;
  isAnalyzing: boolean;
  onShareScore: () => void;
  onAnalyze: () => void;
}

export const AnalysisSummaryCard: React.FC<AnalysisSummaryCardProps> = ({ 
  report, 
  copiedShare, 
  isAnalyzing, 
  onShareScore, 
  onAnalyze 
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-start gap-4">
        {/* App Square Icon */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0 relative group">
          {/* 🖼️ అడ్మిన్ గారు! వెబ్‌సైట్ లో ఫోటో లేకపోయినా లేదా బ్యాకెండ్ పనిచేయకపోయినా, గూగుల్ ఐకాన్ ఇంజిన్ ద్వారా ఫోటోను ఇక్కడ చూపిస్తున్నాము. */}
          <img
            src={report.appIconUrl || `https://www.google.com/s2/favicons?domain=${report.hostname || (report.url ? (report.url.startsWith('http') ? new URL(report.url).hostname : report.url) : 'phrscrowd.online')}&sz=128`}
            alt={report.manifest?.name || 'App Icon'}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              // 🚀 అడ్మిన్ గారు! గూగుల్ ఫెవికాన్ ఫెయిల్ అయితే 'IconHorse' అనే మరో పవర్‌ఫుల్ సర్వీస్ ద్వారా ఫోటోను లోడ్ చేస్తున్నాము.
              if (!target.src.includes('icon.horse')) {
                const domain = report.hostname || (report.url ? (report.url.startsWith('http') ? new URL(report.url).hostname : report.url) : 'phrscrowd.online');
                target.src = `https://icon.horse/icon/${domain}`;
                return;
              }
              // Final fallback to a themed letter icon
              target.onerror = null;
              const fallbackName = report.manifest?.name || report.hostname || 'A';
              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(fallbackName)}&background=4f46e5&color=fff&size=256`;
            }}
          />
          
          {/* Subtle overlay for better look */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>

        {/* App Titles & URL */}
        <div className="space-y-1.5 flex-1 min-w-0">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">
            {report.manifest?.name || report.hostname || 'App Title'}
          </h2>
          <div className="text-xs text-indigo-600 font-bold truncate">
            {report.url}
          </div>
          <p className="text-xs text-slate-600 line-clamp-2">
            {report.manifest?.description || (report.hostname?.includes('arm.') ? 'Prepaid AI Model Data Packs & Reverse Proxy Gateway' : 'High performance Progressive Web Application with offline capabilities.')}
          </p>
        </div>
      </div>

      {/* Share score & Last tested controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
        <button
          onClick={onShareScore}
          className="px-5 py-2 rounded-full border border-indigo-500 text-indigo-600 hover:bg-indigo-50 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
        >
          {copiedShare ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-600 font-bold">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>Share score</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 justify-end">
          <span>Last tested:</span>
          <span className="font-semibold text-slate-800">Just now</span>
          <button
            onClick={onAnalyze}
            disabled={isAnalyzing}
            className="p-1 hover:bg-slate-100 rounded-full text-indigo-600 transition cursor-pointer ml-1"
            title="Retest application"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
