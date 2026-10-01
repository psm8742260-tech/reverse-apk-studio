import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ActionItem } from './types';

interface DiagnosticCardProps {
  item: ActionItem;
  idx: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export const DiagnosticCard: React.FC<DiagnosticCardProps> = ({ item, idx, isExpanded, onToggle }) => {
  let cardBgClass = 'bg-slate-50/50 border-slate-200 hover:bg-slate-100/50 hover:border-slate-300';
  let iconElem = <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs shrink-0 shadow-3xs">🔍</div>;
  let chevronColor = 'text-slate-400';

  if (item.type === 'error') {
    cardBgClass = 'bg-rose-50/45 border-rose-100 hover:bg-rose-50 hover:border-rose-200';
    iconElem = <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-xs shrink-0 shadow-3xs">🛑</div>;
    chevronColor = 'text-rose-500';
  } else if (item.type === 'warning') {
    cardBgClass = 'bg-amber-50/45 border-amber-100 hover:bg-amber-50/70 hover:border-amber-200';
    iconElem = <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-xs shrink-0 shadow-3xs">⚠️</div>;
    chevronColor = 'text-amber-500';
  } else if (item.type === 'info') {
    cardBgClass = 'bg-sky-50/45 border-sky-100 hover:bg-sky-50/70 hover:border-sky-200';
    iconElem = <div className="w-8 h-8 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center text-xs shrink-0 shadow-3xs">ℹ️</div>;
    chevronColor = 'text-sky-500';
  } else {
    // capability / feature
    cardBgClass = 'bg-[#faf9ff] border-[#e8e3ff] hover:bg-[#f5f2ff] hover:border-[#d7ceff]';
    iconElem = <div className="w-8 h-8 rounded-full bg-[#f3efff] border border-[#e3daff] flex items-center justify-center text-xs shrink-0 shadow-3xs">⚡</div>;
    chevronColor = 'text-purple-600';
  }

  return (
    <div
      onClick={onToggle}
      className={`p-4.5 rounded-2xl border text-xs transition duration-200 cursor-pointer shadow-3xs ${cardBgClass}`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 w-full">
          {iconElem}
          <span className="font-bold text-slate-800 text-xs leading-snug">
            {item.title}
          </span>
        </div>
        <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isExpanded ? 'rotate-90' : ''} ${chevronColor}`} />
      </div>
      
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-200/60 animate-fade-in space-y-3">
          <div className="text-slate-600 leading-relaxed font-medium">
            {item.message}
          </div>
          {item.action && (
            <div className="bg-white/60 p-3 rounded-xl border border-slate-200/40 text-[11px] font-bold text-indigo-700">
              {item.action}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
