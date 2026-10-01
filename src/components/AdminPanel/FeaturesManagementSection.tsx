import React from 'react';
import { FeatureFlags } from '../../types';
import { Settings2, Cpu, Eye, Code, Bot, Download, Globe, PlayCircle, Moon, Zap, ArrowLeft, Wand2, Lock } from 'lucide-react';
import { STUDIO_FEATURES_CONFIG } from '../../utils/studioButtonsConfig';

interface Props {
  flags: FeatureFlags;
  onUpdateFlags: (updated: FeatureFlags) => void;
  onBack?: () => void;
}

export const FeaturesManagementSection: React.FC<Props> = ({ flags, onUpdateFlags, onBack }) => {
  const toggleFlag = (key: keyof FeatureFlags) => {
    onUpdateFlags({ ...flags, [key]: !flags[key] });
  };

  // 🏛️ అడ్మిన్ గారు, మీ నిబంధనల ప్రకారం ఇక్కడ ఉన్న పెద్ద పెట్టెలు (Boxes) తొలగించి కేవలం నేకెడ్ మైక్రో ఐకాన్స్ (Micro Icons) మాత్రమే వచ్చేలా చేసాము.
  const iconsMap: Record<keyof FeatureFlags, React.ReactNode> = {
    enableUnpacker: <Cpu className="w-5 h-5 text-sky-400" />,
    enableLivePreview: <Eye className="w-5 h-5 text-indigo-400" />,
    enableCodeEditor: <Code className="w-5 h-5 text-emerald-400" />,
    enableAIAssistant: <Bot className="w-5 h-5 text-purple-400" />,
    enableZipExporter: <Download className="w-5 h-5 text-amber-400" />,
    enableCorsProxy: <Globe className="w-5 h-5 text-teal-400" />,
    enableDemoApks: <PlayCircle className="w-5 h-5 text-pink-400" />,
    darkModeDefault: <Moon className="w-5 h-5 text-yellow-400" />,
    enableSelfFixer: <Zap className="w-5 h-5 text-amber-500" />,
    enableVisualBuilder: <Wand2 className="w-5 h-5 text-pink-400" />,
    enableAgentRegulations: <Lock className="w-5 h-5 text-emerald-400" />,
    enableAdminDemoControllers: <Settings2 className="w-5 h-5 text-rose-400" />,
    enableInvisibleAgentDaemon: <Eye className="w-5 h-5 text-indigo-400" />,
  };

  const featureItems = STUDIO_FEATURES_CONFIG.map(item => ({
    ...item,
    icon: iconsMap[item.key]
  }));

  return (
    <div 
      onDoubleClick={(e) => {
        e.stopPropagation();
        onBack?.();
      }}
      className="space-y-6"
    >
      {/* Banner */}
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
          {/* 🏛️ అడ్మిన్ గారు! ఇక్కడ పెట్టె తొలగించబడి సాధారణ మైక్రో ఐకాన్ మాత్రమే అమర్చబడింది. */}
          <div className="p-3 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-lg">
            <Settings2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Features Management Section</h3>
            <p className="text-xs text-slate-400">
              Master control switches to dynamically toggle core subsystems, preview engines, and tools.
            </p>
          </div>
        </div>
        <div className="px-3 py-1 text-xs font-mono font-semibold rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
          11 SUBSYSTEMS
        </div>
      </div>

      {/* Feature Toggles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featureItems.map((item) => (
          <div
            key={item.key}
            className="bg-slate-800/50 border border-slate-700 py-1.5 px-4 rounded-xl flex items-center justify-between hover:border-slate-600 transition"
          >
            <div className="flex items-center gap-3">
              {/* 🏛️ అడ్మిన్ గారు! మీ గ్లోబల్ డిజైన్ ప్రకారం ఇక్కడ ఉన్న ఐకాన్ చుట్టూ ఉండే బాక్స్ మరియు బోర్డర్‌ను పూర్తిగా తొలగించి, సాదా మైక్రో ఐకాన్‌ను మాత్రమే ప్రదర్శిస్తున్నాము. */}
              <div className="p-1.5 bg-slate-900 rounded-lg border border-slate-800 shrink-0">{item.icon}</div>
              <div>
                <h4 className="text-sm font-bold text-slate-200">{item.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-3">
              <input
                type="checkbox"
                checked={flags[item.key]}
                onChange={() => toggleFlag(item.key)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
