import React from 'react';
import { Package, Download, Store, Sparkles, AlertCircle } from 'lucide-react';

interface PackageForStoresCardProps {
  onOpenStoreModal: () => void;
  onDownloadTest: () => void;
  hasErrors?: boolean;
}

export function PackageForStoresCard({
  onOpenStoreModal,
  onDownloadTest,
  hasErrors = false
}: PackageForStoresCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
      {/* 📱 తెలుగు వివరణ: PWABuilder తరహాలోనే ఒకవేళ URL లో లోపాలు లేదా మిస్సింగ్ ఐకాన్లు/మేనిఫెస్ట్ ఉంటే యూజర్‌కు స్పష్టమైన ఎర్రర్ ఇక్కడ కనిపిస్తుంది. */}
      {hasErrors ? (
        <div className="w-full bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3 text-left shadow-xs">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-black text-rose-900">
              PWA ఎర్రర్ గుర్తించబడింది (PWA Requirements Missing)
            </h4>
            <p className="text-xs text-rose-700 leading-relaxed font-medium">
              ఈ URL లో PWA కి సంబంధించిన అంశాలు (Manifest, Icons, లేదా HTTPS) లోపించాయి. అయినప్పటికీ మీరు టెస్ట్ ప్యాకేజ్ డౌన్‌లోడ్ చేసుకోవచ్చు లేదా కింది యాక్షన్ ఐటమ్స్‌ను పరిశీలించవచ్చు.
            </p>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col items-center text-center space-y-4">
        {/* 🏛️ అడ్మిన్ గారి ఆదేశం: రియల్ ఇంటరాక్టివ్ బటన్ - క్లిక్ చేయగానే ప్యాకేజ్ మోడల్ ఓపెన్ అవుతుంది */}
        <button
          onClick={onOpenStoreModal}
          className="bg-[#2C293E] hover:bg-black active:scale-95 text-white px-8 py-3 rounded-full text-lg font-black tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer"
        >
          Package For Stores
        </button>
        
        <button
          onClick={onDownloadTest}
          className="text-[#6D4AFF] font-bold hover:underline cursor-pointer text-sm"
        >
          Download Test Package
        </button>
      </div>
      
      <div className="border-t border-slate-100 pt-6 flex items-center justify-center gap-4 text-slate-700">
        <span className="text-sm font-black">Available stores:</span>
        {/* Windows / Apple / Android Icons (Clickable to open package options) */}
        <div className="flex gap-4">
           {/* Windows icon */}
           <button onClick={onOpenStoreModal} title="Windows Store Package" className="hover:text-indigo-600 transition-colors cursor-pointer">
             <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z"/></svg>
           </button>
           {/* Apple icon */}
           <button onClick={onOpenStoreModal} title="Apple App Store Package" className="hover:text-indigo-600 transition-colors cursor-pointer">
             <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.96 1.4-2.07 2.72-3.72 2.72-1.63 0-2.3-1.02-3.72-1.02-1.4 0-2.18 1.02-3.75 1.02-1.67 0-2.9-1.43-3.75-2.72C.92 17.58 0 13.57 0 10.15c0-3.32 2.05-5.07 4.1-5.07 1.43 0 2.6.97 3.75 0 1.15-1.02 2.6-1.02 3.72 0 1.15.97 2.32 0 3.75 0 2.05 0 4.1 1.75 4.1 5.07 0 3.42-.92 7.42-2.37 10.13zM11 6.55c.38-1.42 1.9-2.5 3.52-2.5.07 0 .15 0 .23 0-1.42 1.6-3.3 2.5-3.52 2.5z"/></svg>
           </button>
           {/* Android icon */}
           <button onClick={onOpenStoreModal} title="Google Play Store Package" className="hover:text-emerald-600 transition-colors cursor-pointer">
             <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 18c0 .55.45 1 1 1h1c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v10zm4 0c0 .55.45 1 1 1h1c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1h-1c-.55 0-1 .45-1 1v10zm4 0c0 .55.45 1 1 1h1c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1h-1c-.55 0-1 .45-1 1v10zm4 0c0 .55.45 1 1 1h1c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1h-1c-.55 0-1 .45-1 1v10z"/></svg>
           </button>
        </div>
      </div>
    </div>
  );
}
