import React from 'react';
import { ArrowLeft, Wand2, Lock } from 'lucide-react';

interface LiveVisualBuilderViewProps {
  onClose: () => void;
  isAdminEditEnabled?: boolean;
}

// 🏛️ అడ్మిన్ గారు! సెల్ఫ్-ఎడిటర్ యొక్క వైరింగ్ మరియు కనెక్షన్లు పూర్తిగా కట్ చేయబడి, భవిష్యత్తు కోసం బోర్డు భద్రపరచబడిందని తెలిపేలా ఈ అందమైన కవచ లేఅవుట్ సిద్ధం చేసాము.
export function LiveVisualBuilderView({ onClose, isAdminEditEnabled = true }: LiveVisualBuilderViewProps) {
  return (
    <div className="fixed inset-0 z-[200] bg-[#0c101d] flex flex-col font-sans">
      {/* Top Bar - Back Button */}
      <div className="h-14 border-b border-slate-800 bg-[#12182c]/90 backdrop-blur-xl flex items-center px-4 shrink-0 shadow-lg relative z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center transition-all border border-slate-700 text-slate-300 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Self-Editor Workspace</span>
        </div>
      </div>
      
      {/* 🏛️ వైరింగ్ డిస్‌కనెక్ట్ మరియు భవిష్యత్తు కోసం సంరక్షణ స్థితిని తెలిపే స్క్రీన్ */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#0c101d]">
        <div className="w-24 h-24 bg-rose-500/10 rounded-3xl flex items-center justify-center mb-6 border border-rose-500/20 shadow-[0_0_50px_rgba(244,63,94,0.1)] relative">
          <Wand2 className="w-10 h-10 text-rose-500" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center">
            <Lock className="w-3 h-3 text-rose-500" />
          </div>
        </div>

        <div className="px-4 py-1.5 mb-4 text-[10px] font-black tracking-widest text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-full uppercase">
          🔒 WIRING SEVERED BY ADMIN
        </div>

        <h3 className="text-xl font-black text-slate-200 mb-2 tracking-tight">
          సెల్ఫ్-ఎడిటర్ (Self-Editor) • హోльడ్ మోడ్
        </h3>
        
        <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
          ఈ ఫీచర్ యొక్క కనెక్షన్లు మరియు వైరింగ్ అంతా అడ్మిన్ గారి ఆదేశానుసారం సురక్షితంగా నిలిపివేయబడింది (Severed). భవిష్యత్తులో మన అవసరాలకు అనుగుణంగా మరేదైనా శక్తివంతమైన ఫీచర్‌ను ఇక్కడ రీప్లేస్ చేయడానికి ఈ బోర్డు సురక్షితంగా భద్రపరచబడింది.
        </p>

        <div className="mt-8 flex items-center gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-bold rounded-xl transition"
          >
            తిరిగి వెళ్ళండి (Back)
          </button>
        </div>
      </div>
    </div>
  );
}
