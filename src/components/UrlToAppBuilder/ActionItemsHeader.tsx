import React from 'react';
import { AnalysisReport } from './types';

interface ActionItemsHeaderProps {
  report: AnalysisReport;
  actionFilter: 'all' | 'error' | 'warning' | 'info' | 'feature';
  onFilterChange: (filter: 'all' | 'error' | 'warning' | 'info' | 'feature') => void;
}

export const ActionItemsHeader: React.FC<ActionItemsHeaderProps> = ({ 
  report, 
  actionFilter, 
  onFilterChange 
}) => {
  return (
    <div className="relative flex justify-center sm:justify-end -mt-2 mb-6">
      <div className="relative bg-white border border-indigo-100/80 shadow-md rounded-2xl p-3 flex items-center gap-3 z-10 max-w-[260px] sm:max-w-xs animate-bounce" style={{ animationDuration: '6s' }}>
        {/* Astronaut Mascot SVG */}
        <div className="w-12 h-12 shrink-0 bg-indigo-50/50 rounded-xl flex items-center justify-center border border-indigo-100/60 shadow-3xs overflow-visible relative">
          <svg className="w-11 h-11" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 46C22 40 42 40 42 46V54H22V46Z" fill="#e2e8f0" stroke="#4f46e5" strokeWidth="2" />
            <rect x="29" y="44" width="6" height="10" fill="#4f46e5" rx="1" />
            <circle cx="32" cy="28" r="18" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2.5"/>
            <circle cx="32" cy="28" r="15" fill="#c7d2fe" />
            <circle cx="32" cy="29" r="10" fill="#fdba74"/>
            <ellipse cx="32" cy="32" r="5" rx="6" fill="#fed7aa" />
            <polygon points="30,30 34,30 32,32" fill="#1e1b4b" />
            <circle cx="28" cy="26" r="1.5" fill="#1e1b4b"/>
            <circle cx="36" cy="26" r="1.5" fill="#1e1b4b"/>
            <circle cx="25" cy="29" r="1" fill="#f43f5e" opacity="0.6" />
            <circle cx="39" cy="29" r="1" fill="#f43f5e" opacity="0.6" />
            <path d="M31 34.5C31.5 35 32.5 35 33 34.5" stroke="#1e1b4b" strokeWidth="1" strokeLinecap="round"/>
            <path d="M16 22L12 18" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="12" cy="18" r="3" fill="#fb923c" stroke="#4f46e5" strokeWidth="1.5" />
            <path d="M48 22L52 18" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="52" cy="18" r="3" fill="#fb923c" stroke="#4f46e5" strokeWidth="1.5" />
            <path d="M22 18C26 15 34 15 38 17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            <path d="M14 44C10 42 7 38 8 36C9 34 12 36 15 40" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" fill="#ffffff"/>
            <path d="M48 43C52 41 57 33 59 34C61 35 56 42 52 45" stroke="#4f46e5" strokeWidth="2.2" strokeLinecap="round" fill="#ffffff" />
          </svg>
        </div>
        <div className="text-slate-700 text-[11px] font-black leading-tight">
          Filter through notifications<br/>as and when you need!
        </div>
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-16 w-3 h-3 bg-white border-r border-b border-indigo-100/80 rotate-45"></div>
      </div>
    </div>
  );
};

export const ActionItemsFilters: React.FC<ActionItemsHeaderProps> = ({ 
  report, 
  actionFilter, 
  onFilterChange 
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 pt-1">
      <div className="space-y-0.5">
        <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
          <span>Action Items</span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-50 text-indigo-600 border border-indigo-100/80 shadow-3xs">
            {report.score} / {report.maxScore} pts
          </span>
        </h3>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => onFilterChange('all')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition duration-200 cursor-pointer ${
            actionFilter === 'all'
              ? 'bg-[#4f46e5] text-white border-[#4f46e5] shadow-xs'
              : 'bg-slate-100/85 hover:bg-slate-200/80 text-slate-800 border-transparent'
          }`}
        >
          All ({report.actionItems.length})
        </button>

        <button
          onClick={() => onFilterChange('error')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition duration-200 border cursor-pointer ${
            actionFilter === 'error'
              ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
              : 'bg-slate-100/85 hover:bg-slate-200/80 text-slate-800 border-transparent'
          }`}
        >
          <span className="text-xs">🛑</span>
          <span>{report.counts.errors}</span>
        </button>

        <button
          onClick={() => onFilterChange('warning')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition duration-200 border cursor-pointer ${
            actionFilter === 'warning'
              ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
              : 'bg-slate-100/85 hover:bg-slate-200/80 text-slate-800 border-transparent'
          }`}
        >
          <span className="text-xs">⚠️</span>
          <span>{report.counts.warnings}</span>
        </button>

        <button
          onClick={() => onFilterChange('info')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition duration-200 border cursor-pointer ${
            actionFilter === 'info'
              ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
              : 'bg-slate-100/85 hover:bg-slate-200/80 text-slate-800 border-transparent'
          }`}
        >
          <span className="text-xs">ℹ️</span>
          <span>{report.counts.info}</span>
        </button>

        <button
          onClick={() => onFilterChange('feature')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition duration-200 border cursor-pointer ${
            actionFilter === 'feature'
              ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
              : 'bg-slate-100/85 hover:bg-slate-200/80 text-slate-800 border-transparent'
          }`}
        >
          <span className="text-xs">⚡</span>
          <span>{report.counts.features}</span>
        </button>
      </div>
    </div>
  );
};
