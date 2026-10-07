import React, { useState } from 'react';
import { X, Archive, ArrowRight, Code, FileText, CheckCircle2, Sparkles, Trash2 } from 'lucide-react';

interface SavedShiftsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
  onApplyToActiveFile?: (content: any) => void;
}

export function SavedShiftsDrawer({
  isOpen,
  onClose,
  userId,
  onApplyToActiveFile
}: SavedShiftsDrawerProps) {
  const [shifts, setShifts] = useState([
    {
      id: 'shift-1',
      title: 'ఆప్టిమైజ్డ్ బటన్ కాంపోనెంట్',
      type: 'Component',
      timestamp: 'ఈరోజు, 12:10 PM',
      snippet: '<button className="px-4 py-2 bg-indigo-600 rounded-lg text-white font-bold">Submit</button>'
    },
    {
      id: 'shift-2',
      title: 'ఫైర్‌బేస్ ఆథ్ హుక్ లాజిక్',
      type: 'Hook',
      timestamp: 'నిన్న, 6:45 PM',
      snippet: 'const { user, login, logout } = useFirebase();'
    }
  ]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-slate-950/70 backdrop-blur-xs flex justify-end font-sans">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col text-slate-100 shadow-2xl animate-fade-in">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl">
              <Archive className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-sm text-white">సేవ్ చేసిన షిఫ్ట్‌లు (Saved Shifts)</h3>
              <p className="text-[11px] text-slate-400">Vault లో భద్రపరచిన కోడ్ ముక్కలు</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            aria-label="మూసివేయి"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer List */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {shifts.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2 hover:border-slate-600 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{item.title}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                    {item.type}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">{item.timestamp}</span>
              </div>

              <div className="p-2 rounded-lg bg-black/60 font-mono text-[11px] text-emerald-400 overflow-x-auto">
                <code>{item.snippet}</code>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    if (onApplyToActiveFile) {
                      onApplyToActiveFile(item.snippet);
                    }
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>కోడ్‌కి అప్లై చేయి</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
