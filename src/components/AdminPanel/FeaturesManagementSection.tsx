import React from 'react';
import { FeatureFlags } from '../../types';
import { ToggleLeft, ToggleRight, Sliders, Shield, ArrowLeft, Check, Sparkles } from 'lucide-react';

interface FeaturesManagementSectionProps {
  flags: FeatureFlags;
  onUpdateFlags: (flags: FeatureFlags) => void;
  onBack?: () => void;
}

export function FeaturesManagementSection({
  flags,
  onUpdateFlags,
  onBack
}: FeaturesManagementSectionProps) {
  const toggleFlag = (key: keyof FeatureFlags) => {
    onUpdateFlags({
      ...flags,
      [key]: !flags[key]
    });
  };

  const featureItems: { key: keyof FeatureFlags; label: string; desc: string; category: string }[] = [
    { key: 'enableLivePreview', label: 'లైవ్ ప్రివ్యూ ఇంజిన్ (Live Web Preview)', desc: 'డీకంపైల్ లేదా బిల్డ్ చేసిన యాప్ బ్రౌజర్‌లో లైవ్‌గా రన్ చేయడానికి ప్రివ్యూ ఫ్రేమ్', category: 'Core' },
    { key: 'enableCodeEditor', label: 'కోడ్ ఎడిటర్ (In-Studio Code Editor)', desc: 'ఫైల్స్‌ని నేరుగా స్టూడియోలో సవరించడానికి ఎడిటర్ ప్యానెల్', category: 'Core' },
    { key: 'enableAIAssistant', label: 'బ్రహ్మాస్త్రం ఏఐ అసిస్టెంట్ (AI Assistant)', desc: 'కోడ్ జనరేషన్, ఆటో-రిపేర్ మరియు ఆర్కిటెక్చర్ అనాలిసిస్ ఏఐ సపోర్ట్', category: 'AI' },
    { key: 'enableSelfFixer', label: 'సెల్ఫ్-ఫిక్సర్ స్టూడియో (Self Fixer)', desc: 'సింటాక్స్ ఎర్రర్లు మరియు డిపెండెన్సీ సమస్యలను ఆటోమేటిక్‌గా సరిదిద్దే టూల్', category: 'Fixer' },
    { key: 'enableVisualBuilder', label: 'విజువల్ బిల్డర్ వీక్షణ (Visual Builder)', desc: 'డ్రాగ్ & డ్రాప్ కాంపోనెంట్స్ మరియు లైవ్ విజువల్ ఎడిటింగ్ సదుపాయం', category: 'UI' },
    { key: 'enableZipExporter', label: 'జిప్ ఎగుమతి (ZIP Exporter)', desc: 'మార్పులు చేసిన పూర్తి ప్రాజెక్ట్‌ను క్లీన్ ZIP ఫైల్‌గా డౌన్‌లోడ్ చేసుకునే సదుపాయం', category: 'Export' },
    { key: 'enableCorsProxy', label: 'కార్స్ ప్రాక్సీ సర్వీస్ (CORS Proxy)', desc: 'ఎక్స్‌టర్నల్ ఏపీఐ కాల్స్ మరియు చిత్రాల లోడింగ్ కోసం లోకల్ ప్రాక్సీ రూట్', category: 'Network' },
    { key: 'enableUnpacker', label: 'APK అన్‌ప్యాకర్ ఇంజిన్ (APK Unpacker)', desc: 'ఆండ్రాయిడ్ APK బైనరీలను మరియు అసెట్స్‌ను అన్‌జిప్ చేసే ప్రాసెసర్', category: 'Core' },
    { key: 'enableDemoApks', label: 'డెమో శాంపిల్ APKలు (Demo APKs)', desc: 'స్టూడియోని టెస్ట్ చేయడానికి సిద్ధంగా ఉన్న శాంపిల్ ప్రాజెక్ట్‌లు', category: 'Demo' },
    { key: 'enableInvisibleAgentDaemon', label: 'ఇన్విజిబుల్ ఏజెంట్ డెమోన్ (Invisible Agent)', desc: 'బ్యాక్‌గ్రౌండ్‌లో నిరంతరం కోడ్ నాణ్యతను పరిశీలించే స్వతంత్ర ఏజెంట్', category: 'Agent' },
    { key: 'enableAgentRegulations', label: 'ఏజెంట్ రెగ్యులేషన్స్ (Rules Enforcement)', desc: 'AGENTS.md నిబంధనలను కఠినంగా అమలు చేసే భద్రతా లేయర్', category: 'Security' },
    { key: 'enableAdminDemoControllers', label: 'అడ్మిన్ డెమో కంట్రోలర్స్', desc: 'అడ్మిన్ ప్యానెల్‌లోని టెస్ట్ కంట్రోలర్‌లను యాక్టివేట్ చేసే స్విచ్', category: 'Admin' }
  ];

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
          <div className="p-3 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-lg">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">ఫీచర్స్ & మోడ్యూల్స్ నిర్వహణ (Feature Management)</h3>
            <p className="text-xs text-slate-400">
              స్టూడియోలోని ఫీచర్లు, టూల్స్ మరియు భద్రతా స్విచ్‌లను మీ అవసరానికి అనుగుణంగా ఆన్/ఆఫ్ చేయండి.
            </p>
          </div>
        </div>
        <div className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" />
          <span>REAL-TIME TOGGLE</span>
        </div>
      </div>

      {/* Grid of Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {featureItems.map((item) => {
          const isEnabled = !!flags[item.key];
          return (
            <div
              key={item.key}
              onClick={() => toggleFlag(item.key)}
              className={`p-4 rounded-xl border cursor-pointer select-none transition-all flex items-start justify-between gap-3 ${
                isEnabled
                  ? 'bg-slate-800/70 border-indigo-500/40 hover:border-indigo-500/70'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 opacity-60'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{item.label}</span>
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-700/60 text-slate-300">
                    {item.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>
              </div>

              <div className="shrink-0 mt-0.5">
                {isEnabled ? (
                  <ToggleRight className="w-6 h-6 text-indigo-400" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-slate-600" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
