import React, { useState } from 'react';
import { ArrowLeft, HardDrive, ShieldCheck, CheckCircle2, FileText, RefreshCw, Sparkles } from 'lucide-react';
import { FILE_VERSIONS, APP_VERSION, ENGINE_NAME, BUILD_TIMESTAMP, HYBRID_SYNC_STRATEGY } from '../../version';
import { HybridBadgeH } from '../HybridBadgeH';

interface MasterBackupSectionProps {
  onBack?: () => void;
}

export const MasterBackupSection: React.FC<MasterBackupSectionProps> = ({ onBack }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyRegistry = () => {
    try {
      navigator.clipboard.writeText(JSON.stringify(FILE_VERSIONS, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#D8D2C5]">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 bg-slate-200 hover:bg-slate-300 rounded-lg text-slate-700 transition"
              title="వెనుకకు (Back)"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <HardDrive className="w-5 h-5 text-indigo-600" />
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            Master Backup & Version Registry
            <HybridBadgeH />
          </h3>
        </div>
        <button
          onClick={handleCopyRegistry}
          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm"
        >
          {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
          <span>{copied ? 'కాపీ చేయబడింది!' : 'కాపీ రిజిస్ట్రీ'}</span>
        </button>
      </div>

      {/* Engine Overview Card */}
      <div className="p-4 rounded-2xl bg-white border border-[#D8D2C5] shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">ఇంజిన్ వెర్షన్ (Engine)</span>
          <span className="text-sm font-black text-slate-800 flex items-center gap-1.5">
            {ENGINE_NAME} • <span className="text-emerald-600 font-mono">{APP_VERSION}</span>
          </span>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">సింక్ స్ట్రాటజీ</span>
          <span className="text-xs font-mono font-bold text-indigo-600">{HYBRID_SYNC_STRATEGY}</span>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">లాస్ట్ అప్‌డేట్ టైమ్</span>
          <span className="text-xs font-mono text-slate-600">{BUILD_TIMESTAMP}</span>
        </div>
      </div>

      {/* File Registry Grid */}
      <div className="flex-1 overflow-y-auto space-y-2">
        <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          శాశ్వత ఫైల్ వెర్షన్ లాక్స్ (All App Files Set to HYBRID)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Object.entries(FILE_VERSIONS).map(([file, ver]) => (
            <div
              key={file}
              className="p-2.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-2xs hover:border-indigo-300 transition"
            >
              <span className="text-xs font-mono text-slate-700 truncate max-w-[200px]" title={file}>
                {file}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-emerald-50 text-emerald-700 border border-emerald-300 shrink-0">
                {ver}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MasterBackupSection;
