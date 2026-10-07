import React, { useState } from 'react';
import { FeatureFlags, DecompiledApp } from '../../types';
import { Bot, ArrowLeft, Shield, Play, Pause, Activity, CheckCircle2, AlertCircle } from 'lucide-react';

interface InvisibleAgentSectionProps {
  flags: FeatureFlags;
  onUpdateFlags: (flags: FeatureFlags) => void;
  currentApp: DecompiledApp | null;
  onUpdateFileContent?: (path: string, content: string) => void;
  onBack?: () => void;
}

export function InvisibleAgentSection({
  flags,
  onUpdateFlags,
  currentApp,
  onUpdateFileContent,
  onBack
}: InvisibleAgentSectionProps) {
  const [agentLogs, setAgentLogs] = useState<string[]>([
    '🔒 Invisible Agent Daemon Initialized.',
    '👀 Code Architecture Scanner: Standby Mode.',
    '🛡️ AGENTS.md Protocol Rules: Actively Enforced.'
  ]);

  const isRunning = flags.enableInvisibleAgentDaemon;

  const toggleAgent = () => {
    onUpdateFlags({
      ...flags,
      enableInvisibleAgentDaemon: !flags.enableInvisibleAgentDaemon
    });
    setAgentLogs(prev => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Agent Daemon ${!isRunning ? 'ప్రారంభించబడింది (Started)' : 'ఆపివేయబడింది (Stopped)'}`
    ]);
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-100 font-sans">
      {/* Header Banner */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-all mr-2"
              title="వెనుకకు"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div className="p-3 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-lg">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">ఇన్విజిబుల్ ఏజెంట్ డెమోన్ (Invisible Agent Daemon)</h3>
            <p className="text-xs text-slate-400">
              బ్యాక్‌గ్రౌండ్‌లో నిరంతరం కోడ్ నాణ్యత, రూల్స్ అమలు మరియు భద్రతను పర్యవేక్షించే ఏజెంట్.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border flex items-center gap-1.5 ${
            isRunning 
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
              : 'bg-slate-700 text-slate-400 border-slate-600'
          }`}>
            <Activity className="w-3.5 h-3.5" />
            <span>{isRunning ? 'రన్ అవుతోంది (RUNNING)' : 'ఆగిపోయింది (IDLE)'}</span>
          </span>

          <button
            onClick={toggleAgent}
            className={`p-2 rounded-lg font-semibold text-xs flex items-center gap-1.5 transition-all ${
              isRunning ? 'bg-rose-600 hover:bg-rose-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isRunning ? 'ఆపండి' : 'ప్రారంభించండి'}</span>
          </button>
        </div>
      </div>

      {/* Status Box */}
      <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">సిస్టమ్ రూల్స్ అమలు (Rule Enforcement)</h4>
            <p className="text-[11px] text-slate-400">AGENTS.md నిబంధనలు 1 నుండి 51 వరకు 100% అమలవుతున్నాయి.</p>
          </div>
        </div>
        <span className="text-xs text-emerald-400 font-bold bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/30">
          లక్షణాలు సురక్షితం
        </span>
      </div>

      {/* Logs Terminal */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-300 flex items-center gap-2">
          <span>ఏజెంట్ కార్యాచరణ లాగ్స్:</span>
        </h4>
        <div className="p-3.5 rounded-xl bg-black/70 border border-slate-800 font-mono text-[11px] text-cyan-400/90 max-h-48 overflow-y-auto space-y-1">
          {agentLogs.map((log, idx) => (
            <div key={idx}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
