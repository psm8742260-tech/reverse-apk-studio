import React, { useState, useEffect } from 'react';
import { ArrowLeft, Zap, ShieldCheck, Cpu, RefreshCw, CheckCircle2, Sparkles, SlidersHorizontal } from 'lucide-react';

// 💡 తెలుగు వివరణ: కేంద్రీకృత ఏపీఐ ఫైల్ (aplApi.ts) నుండి అడ్మిన్ సెట్టింగ్స్ మరియు మోడల్ రిజల్యూషన్ ఫంక్షన్లను ఇంపోర్ట్ చేసాము.
import { getAdminSetting, saveAdminSetting, resolveAiModel } from '../../aplApi';

interface Props {
  onBack?: () => void;
}

export const AiLiteModeSection: React.FC<Props> = ({ onBack }) => {
  const [isLiteMode, setIsLiteMode] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [testResponse, setTestResponse] = useState<any>(null);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string>('');

  // 🏛️ 💡 తెలుగు వివరణ: aplApi ద్వారా సర్వర్ నుండి ప్రస్తుత LITE_MODE_OVERRIDE సెట్టింగ్‌ని లోడ్ చేయడం
  useEffect(() => {
    let mounted = true;
    getAdminSetting('LITE_MODE_OVERRIDE')
      .then(data => {
        if (mounted) {
          setIsLiteMode(data?.value ?? true);
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.warn('Failed to fetch admin setting:', err);
        if (mounted) setIsLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  // 💡 తెలుగు వివరణ: aplApi ద్వారా LITE_MODE_OVERRIDE సెట్టింగ్‌ని సర్వర్‌లో సేవ్ చేయడం
  const handleToggleMode = async (targetState: boolean) => {
    setIsSaving(true);
    setStatusMsg('');
    try {
      const success = await saveAdminSetting('LITE_MODE_OVERRIDE', targetState);
      if (success) {
        setIsLiteMode(targetState);
        setStatusMsg(targetState 
          ? '✅ బటన్-1 యాక్టివేట్ అయ్యింది: బ్యాక్‌గ్రౌండ్‌లో ఫ్లాష్-లైట్ మోడల్ మాత్రమే రన్ అవుతుంది!' 
          : '✅ బటన్-2 యాక్టివేట్ అయ్యింది: యూజర్ సెలెక్ట్ చేసిన మోడల్ రన్ అవుతుంది!');
      } else {
        setStatusMsg('❌ సెట్టింగ్ అప్‌డేట్ విఫలమైంది.');
      }
    } catch (err: any) {
      setStatusMsg('❌ సర్వర్ ఎర్రర్: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // 💡 తెలుగు వివరణ: aplApi ద్వారా మోడల్ రిజల్యూషన్‌ను టెస్ట్ చేయడం
  const handleTestResolveModel = async () => {
    setIsTesting(true);
    try {
      const data = await resolveAiModel('gemini-2.5-pro');
      setTestResponse(data);
    } catch (err: any) {
      setTestResponse({ error: err.message });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 font-sans animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl transition-all shadow-md active:scale-95"
              title="వెనుకకు"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-2xl">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg md:text-xl font-black text-white tracking-tight">AI Lite Mode & Token Saver</h3>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              అడ్మిన్ ప్యానెల్ స్విచ్ చెక్ • బ్యాక్‌గ్రౌండ్ టోకెన్ ఆదా కంట్రోలర్
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 self-stretch sm:self-auto justify-between sm:justify-start">
          <span className="text-xs text-slate-400 font-bold">సిస్టమ్ స్టేటస్:</span>
          {isLoading ? (
            <RefreshCw className="w-4 h-4 text-sky-400 animate-spin" />
          ) : (
            <span className={`text-xs font-black flex items-center gap-1.5 ${isLiteMode ? 'text-emerald-400' : 'text-amber-400'}`}>
              <span className={`w-2 h-2 rounded-full ${isLiteMode ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              {isLiteMode ? 'Lite Mode ON (Flash-Lite)' : 'User Model Mode'}
            </span>
          )}
        </div>
      </div>

      {statusMsg && (
        <div className="p-4 rounded-2xl bg-indigo-950/80 border border-indigo-500/40 text-indigo-200 text-xs font-bold shadow-lg animate-in fade-in">
          {statusMsg}
        </div>
      )}

      {/* Main Switch Controllers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* BUTTON-1: LITE MODE ON */}
        <div 
          onClick={() => !isSaving && handleToggleMode(true)}
          className={`cursor-pointer p-6 rounded-3xl border-2 transition-all relative overflow-hidden flex flex-col justify-between shadow-xl group ${
            isLiteMode 
              ? 'bg-gradient-to-br from-emerald-950/60 to-slate-900 border-emerald-500 shadow-emerald-500/10' 
              : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300 text-slate-800'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-2xl ${isLiteMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                <Zap className="w-6 h-6" />
              </div>
              <span className={`text-xs font-black px-3 py-1 rounded-full ${
                isLiteMode ? 'bg-emerald-500 text-slate-950' : 'bg-slate-200 text-slate-600'
              }`}>
                {isLiteMode ? 'ACTIVE NOW' : 'SELECT'}
              </span>
            </div>

            <div>
              <h4 className={`text-base font-black tracking-tight ${isLiteMode ? 'text-white' : 'text-slate-900'}`}>
                బటన్-1: ఫ్లాష్-లైట్ మోడ్ (Flash-Lite)
              </h4>
              <p className={`text-xs mt-1 leading-relaxed ${isLiteMode ? 'text-slate-300' : 'text-slate-600'}`}>
                ఈ బటన్ ON లో ఉంటే బ్యాక్‌గ్రౌండ్‌లో <span className="font-mono font-bold text-emerald-500">"gemini-3.5-flash-lite"</span> మాత్రమే రన్ అవుతుంది. 
                దీని ద్వారా AI స్టూడియో టోకెన్లు & API ఖర్చు 90% వరకు ఆదా అవుతాయి.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700/40 flex items-center justify-between">
            <span className="text-[11px] font-mono text-emerald-400 font-bold">
              ⚡ 90% TOKEN SAVER
            </span>
            <button
              disabled={isSaving}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                isLiteMode 
                  ? 'bg-emerald-500 text-slate-950 shadow-md' 
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {isLiteMode ? '🟢 ON' : 'Turn ON'}
            </button>
          </div>
        </div>

        {/* BUTTON-2: USER SELECTED MODEL */}
        <div 
          onClick={() => !isSaving && handleToggleMode(false)}
          className={`cursor-pointer p-6 rounded-3xl border-2 transition-all relative overflow-hidden flex flex-col justify-between shadow-xl group ${
            !isLiteMode 
              ? 'bg-gradient-to-br from-indigo-950/60 to-slate-900 border-indigo-500 shadow-indigo-500/10' 
              : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300 text-slate-800'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-2xl ${!isLiteMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                <Cpu className="w-6 h-6" />
              </div>
              <span className={`text-xs font-black px-3 py-1 rounded-full ${
                !isLiteMode ? 'bg-indigo-500 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {!isLiteMode ? 'ACTIVE NOW' : 'SELECT'}
              </span>
            </div>

            <div>
              <h4 className={`text-base font-black tracking-tight ${!isLiteMode ? 'text-white' : 'text-slate-900'}`}>
                బటన్-2: యూజర్ సెలెక్టెడ్ మోడల్ మోడ్
              </h4>
              <p className={`text-xs mt-1 leading-relaxed ${!isLiteMode ? 'text-slate-300' : 'text-slate-600'}`}>
                ఈ బటన్ ON లో ఉంటే యూజర్ స్వయంగా ఎంచుకున్న మోడల్ (<span className="font-mono font-bold text-sky-400">userSelectedModel</span>) ప్రకారం API కాల్ రన్ అవుతుంది.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700/40 flex items-center justify-between">
            <span className="text-[11px] font-mono text-indigo-400 font-bold">
              ⚙️ USER DEFINED
            </span>
            <button
              disabled={isSaving}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                !isLiteMode 
                  ? 'bg-indigo-500 text-white shadow-md' 
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {!isLiteMode ? '🟢 ON' : 'Turn ON'}
            </button>
          </div>
        </div>
      </div>

      {/* Live Pipeline Validator */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 md:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-sky-400" />
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              లైవ్ API రూటర్ టెస్ట్ (Live Pipeline Test)
            </h4>
          </div>
          <button
            onClick={handleTestResolveModel}
            disabled={isTesting}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            {isTesting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            రన్ టెస్ట్ (Test Router)
          </button>
        </div>

        <p className="text-xs text-slate-400">
          సర్వర్‌లోని <span className="font-mono text-sky-300">/api/ai/resolve-model</span> ఎండ్‌పాయింట్‌కు లైవ్ రిక్వెస్ట్ పంపి, ప్రస్తుతం ఏ మోడల్ అమలవుతుందో ధృవీకరిస్తుంది.
        </p>

        {testResponse && (
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs overflow-x-auto">
            <pre className="text-emerald-400">{JSON.stringify(testResponse, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
