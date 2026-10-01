import React, { useState } from 'react';
import { DecompiledApp } from '../../types';
import { downloadSourceZip } from '../../utils/apkDecompiler';
import { Download, Globe, FileCode, CheckCircle2, Copy, ExternalLink, Sparkles, ArrowLeft } from 'lucide-react';

interface Props {
  currentApp: DecompiledApp | null;
  onBack?: () => void;
}

export const PwaExportSection: React.FC<Props> = ({ currentApp, onBack }) => {
  const [pwaName, setPwaName] = useState(currentApp?.manifest.appTitle || 'Extracted PWA WebApp');
  const [pwaShortName, setPwaShortName] = useState('ExtractedApp');
  const [themeColor, setThemeColor] = useState('#0284c7');
  const [bgColor, setBgColor] = useState('#0f172a');
  const [copied, setCopied] = useState(false);

  const manifestJson = JSON.stringify(
    {
      name: pwaName,
      short_name: pwaShortName,
      start_url: 'index.html',
      display: 'standalone',
      background_color: bgColor,
      theme_color: themeColor,
      icons: [
        {
          src: 'icon-192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'icon-512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    null,
    2
  );

  const copyManifest = async () => {
    try {
      await navigator.clipboard.writeText(manifestJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('copyManifest failed:', err);
    }
  };

  const handleDownloadZip = async () => {
    if (currentApp) {
      try {
        await downloadSourceZip(currentApp);
      } catch (err) {
        console.error('Download Source ZIP error:', err);
      }
    }
  };

  const handleDownloadSource = async () => {
    if (!currentApp) return;
    try {
      await downloadSourceZip(currentApp);
    } catch (err) {
      console.error('Download Source error:', err);
    }
  };

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
          <div className="p-3 bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-lg">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            {/* 🏛️ అడ్మిన్ గారు, మీ ఆదేశం ప్రకారం ఇక్కడ "PWA & Source ZIP Export Gateway" పేరును "PWA Builder" గా మార్చాము. */}
            <h3 className="text-lg font-bold text-slate-100">PWA Builder</h3>
            <p className="text-xs text-slate-400">
              Configure Progressive Web App manifest properties, manage Blob URLs, and trigger source ZIP bundling.
            </p>
          </div>
        </div>
        {currentApp && (
          <button
            onClick={handleDownloadZip}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2 rounded-lg transition flex items-center gap-2 shadow-lg shadow-emerald-600/20"
          >
            <Download className="w-4 h-4" /> Export app_source_code.zip
          </button>
        )}
      </div>

      {currentApp ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PWA Settings Configurator */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-teal-400" />
                <h4 className="text-sm font-semibold text-slate-200">PWA Manifest Configurator</h4>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">PWA Application Title</label>
                  <input
                    type="text"
                    value={pwaName}
                    onChange={(e) => setPwaName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Short Name (Homescreen)</label>
                  <input
                    type="text"
                    value={pwaShortName}
                    onChange={(e) => setPwaShortName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Theme Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={themeColor}
                        onChange={(e) => setThemeColor(e.target.value)}
                        className="w-8 h-8 rounded bg-transparent cursor-pointer border border-slate-700"
                      />
                      <input
                        type="text"
                        value={themeColor}
                        onChange={(e) => setThemeColor(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-100 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Background Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-8 h-8 rounded bg-transparent cursor-pointer border border-slate-700"
                      />
                      <input
                        type="text"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-100 font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Generated Manifest Preview */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-slate-200">Generated manifest.json</h4>
                  <button
                    onClick={copyManifest}
                    className="text-xs text-teal-400 hover:text-teal-300 font-mono flex items-center gap-1 bg-teal-500/10 px-2.5 py-1 rounded border border-teal-500/20"
                  >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy Manifest'}
                  </button>
                </div>

                <pre className="bg-slate-950 p-3.5 rounded-lg text-xs font-mono text-teal-300 overflow-x-auto border border-slate-800 max-h-52">
                  {manifestJson}
                </pre>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700/60 text-xs text-slate-400 flex items-center justify-between">
                <span>ZIP Bundle Format: <b>Clean Source Assets (.zip)</b></span>
                <span className="text-emerald-400 font-semibold font-mono">DEX STRIPPED</span>
              </div>
            </div>
          </div>

          {/* Live Blob URL Status */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-sky-400" /> Active Client Blob Preview Stream
            </h4>

            <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg flex items-center justify-between text-xs font-mono">
              <div className="truncate mr-4 text-slate-300">
                <span className="text-sky-400">Blob URL:</span> {currentApp.previewBlobUrl || 'In-Memory Stream'}
              </div>
              {currentApp.previewBlobUrl && (
                <a
                  href={currentApp.previewBlobUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 shrink-0 bg-sky-500/10 px-3 py-1 rounded border border-sky-500/20"
                >
                  Open Tab <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 text-center">
          {/* 🏛️ అడ్మిన్ గారు, అప్లోడ్ చేయనప్పుడు కింద ఎలాంటి ఫైల్స్ లేదా కోడింగ్ కనబడకుండా ఇక్కడ కండిషన్ హార్డ్‌కోడ్ చేసాము. */}
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            No active decompiled app found. Please decompile or upload an APK on the main board first to configure and view PWA manifest code.
          </p>
        </div>
      )}
    </div>
  );
};
