import React, { useState } from 'react';
import { ArrowLeft, Globe, QrCode, Share2, Copy, CheckCircle2, Shield, Radio, Sparkles } from 'lucide-react';

interface ExposingStudioProps {
  isOpen: boolean;
  onClose: () => void;
  onShift?: (item: any) => void;
  initialTab?: string;
}

export function ExposingStudio({ isOpen, onClose, onShift, initialTab }: ExposingStudioProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTunnel, setActiveTunnel] = useState<boolean>(true);

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://aimaster.studio';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentOrigin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-100 font-sans">
      {/* Header Banner */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-all mr-2"
              title="వెనుకకు"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div className="p-3 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg">
            <Radio className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">ఎక్స్‌పోజింగ్ స్టూడియో (Exposing Studio)</h3>
            <p className="text-xs text-slate-400">
              మీ లోకల్ అప్లికేషన్‌ను పబ్లిక్ వెబ్ మరియు మొబైల్ పరికరాల్లో తక్షణమే ప్రదర్శించండి.
            </p>
          </div>
        </div>
        <div className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" />
          <span>SSL ENCRYPTED</span>
        </div>
      </div>

      {/* Public URL Box */}
      <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-400" />
            ప్రస్తుత లైవ్ షేర్ యుఆర్ఎల్:
          </span>
          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
            ఆన్‌లైన్
          </span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={currentOrigin}
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs text-slate-200 focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'కాపీ చేయబడింది' : 'కాపీ చేయి'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
