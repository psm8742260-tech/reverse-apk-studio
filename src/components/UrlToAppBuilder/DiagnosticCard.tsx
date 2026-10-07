import React from 'react';
import { AlertCircle, AlertTriangle, Info, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { ActionItem } from './types';

interface DiagnosticCardProps {
  item: ActionItem;
  idx: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export function DiagnosticCard({ item, idx, isExpanded, onToggle }: DiagnosticCardProps) {
  const isError = item.type === 'error';
  const isWarning = item.type === 'warning';
  const isFeature = item.type === 'feature';

  const borderColor = isError
    ? 'border-rose-200 bg-rose-50/40'
    : isWarning
    ? 'border-amber-200 bg-amber-50/40'
    : isFeature
    ? 'border-emerald-200 bg-emerald-50/40'
    : 'border-slate-200 bg-slate-50/40';

  const icon = isError ? (
    <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
  ) : isWarning ? (
    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
  ) : isFeature ? (
    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
  ) : (
    <Info className="w-5 h-5 text-blue-500 shrink-0" />
  );

  return (
    <div className={`border rounded-xl p-3.5 transition-all ${borderColor}`}>
      <div 
        onClick={onToggle}
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center gap-2.5">
          {icon}
          <div>
            <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
            <p className="text-[11px] text-slate-500">{item.description}</p>
          </div>
        </div>
        <button 
          type="button"
          className="text-slate-400 hover:text-slate-600 p-1"
          aria-label="వివరాలు చూడండి"
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isExpanded && item.message && (
        <div className="mt-2.5 pt-2 border-t border-slate-200/60 text-[11px] text-slate-600">
          <p>{item.message}</p>
          {item.action && (
            <div className="mt-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded">
                సూచన: {item.action}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
