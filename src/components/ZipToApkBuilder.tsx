import React, { useState, useRef } from 'react';
import { X, Upload, Terminal, CheckCircle2, AlertCircle, ShieldAlert, Cpu, Download, Sparkles, FolderArchive, Play, RefreshCw } from 'lucide-react';

interface ZipToApkBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onShift?: (item: any) => void;
}

export function ZipToApkBuilder({ isOpen, onClose, onShift }: ZipToApkBuilderProps) {
  const [appName, setAppName] = useState<string>('My Awesome App');
  const [packageId, setPackageId] = useState<string>('com.example.myapp');
  const [buildType, setBuildType] = useState<'APK' | 'AAB' | 'BOTH'>('APK');
  const [selectedZip, setSelectedZip] = useState<File | null>(null);
  const [isBuilding, setIsBuilding] = useState<boolean>(false);
  const [buildProgress, setBuildProgress] = useState<number>(0);
  const [buildStage, setBuildStage] = useState<string>('సిద్ధంగా ఉంది');
  const [logs, setLogs] = useState<string[]>([]);
  const [buildResult, setBuildResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedZip(file);
      setErrorMsg('');
      const cleanName = file.name.replace(/\.zip$/i, '').replace(/[^a-zA-Z0-9_-]/g, ' ');
      if (cleanName) {
        setAppName(cleanName);
      }
    }
  };

  const handleStartBuild = async () => {
    if (!selectedZip) {
      setErrorMsg('దయచేసి ముందుగా సోర్స్ జిప్ (ZIP) ఫైల్‌ను ఎంచుకోండి.');
      return;
    }

    try {
      setIsBuilding(true);
      setErrorMsg('');
      setLogs([]);
      setBuildResult(null);
      setBuildProgress(5);
      setBuildStage('ఫైల్ అప్‌లోడ్ ప్రారంభమవుతోంది...');

      const formData = new FormData();
      formData.append('zipFile', selectedZip);
      formData.append('appName', appName);
      formData.append('packageId', packageId);
      formData.append('buildType', buildType);
      formData.append('keystoreMode', 'STUDIO');

      const response = await fetch('/api/app/build-zip-to-apk', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`బిల్డ్ రిక్వెస్ట్ విఫలమైంది (${response.status})`);
      }

      if (!response.body) {
        throw new Error('రెస్పాన్స్ బాడీ అందుబాటులో లేదు.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          try {
            const data = JSON.parse(trimmed);
            if (data.log) {
              setLogs(prev => [...prev, data.log]);
            }
            if (data.progress !== undefined) {
              setBuildProgress(data.progress);
            }
            if (data.stage) {
              setBuildStage(data.stage);
            }
            if (data.result) {
              setBuildResult(data.result);
            }
            if (data.error) {
              setErrorMsg(data.log || 'బిల్డ్ సమయంలో లోపం సంభవించింది.');
            }
          } catch {
            // Raw text log fallback
            setLogs(prev => [...prev, trimmed]);
          }
        }
      }
    } catch (err: any) {
      console.error('ZIP to APK Build error:', err);
      setErrorMsg(err?.message || 'బిల్డ్ చేయడంలో సమస్య తలెత్తింది.');
    } finally {
      setIsBuilding(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 font-sans">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full max-h-[90vh] shadow-2xl flex flex-col overflow-hidden text-slate-100 animate-fade-in">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <Cpu className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">ZIP to APK / AAB Cloud Builder</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Ultra Engine
                </span>
              </div>
              <p className="text-xs text-slate-400">వెబ్ ప్రాజెక్ట్ జిప్ నుండి నేరుగా ఆండ్రాయిడ్ APK లేదా AAB బిల్డ్ చేయండి</p>
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

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* File Upload Box */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
              selectedZip 
                ? 'border-emerald-500/50 bg-emerald-950/10' 
                : 'border-slate-700 bg-slate-800/30 hover:border-indigo-500/60 hover:bg-slate-800/50'
            }`}
          >
            <input 
              ref={fileInputRef} 
              type="file" 
              accept=".zip" 
              className="hidden" 
              onChange={handleFileChange} 
            />
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <FolderArchive className="w-8 h-8" />
              </div>
              {selectedZip ? (
                <div>
                  <p className="text-sm font-bold text-emerald-400 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    {selectedZip.name}
                  </p>
                  <p className="text-xs text-slate-400">{(selectedZip.size / (1024 * 1024)).toFixed(2)} MB - ఎంచుకోబడింది</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-semibold text-slate-200">సోర్స్ కోడ్ ZIP ఫైల్‌ను ఇక్కడ అప్‌లోడ్ చేయండి</p>
                  <p className="text-xs text-slate-400 mt-0.5">క్లిక్ చేసి మీ ప్రాజెక్ట్ జిప్ ఫైల్‌ను సెలెక్ట్ చేయండి</p>
                </div>
              )}
            </div>
          </div>

          {/* Configuration Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">అప్లికేషన్ పేరు (App Name):</label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="My Awesome App"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">ప్యాకేజీ ఐడీ (Package ID):</label>
              <input
                type="text"
                value={packageId}
                onChange={(e) => setPackageId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                placeholder="com.example.myapp"
              />
            </div>
          </div>

          {/* Build Type Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">బిల్డ్ ఫార్మాట్:</label>
            <div className="grid grid-cols-3 gap-2.5">
              {(['APK', 'AAB', 'BOTH'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setBuildType(type)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    buildType === type
                      ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                      : 'border-slate-800 bg-slate-800/50 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {type === 'APK' ? 'APK (టెస్టింగ్ / ఇన్‌స్టాల్)' : type === 'AAB' ? 'AAB (ప్లే స్టోర్)' : 'రెండు (APK + AAB)'}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-rose-400 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Progress Bar & Stage */}
          {isBuilding && (
            <div className="space-y-2 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-indigo-300 flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  {buildStage}
                </span>
                <span className="text-white font-mono">{buildProgress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-300" 
                  style={{ width: `${buildProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Build Logs Terminal */}
          {logs.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  బిల్డ్ టెర్మినల్ లాగ్స్ ({logs.length})
                </span>
              </div>
              <div className="p-3 rounded-xl bg-black/70 border border-slate-800 font-mono text-[11px] text-emerald-400/90 max-h-40 overflow-y-auto space-y-1">
                {logs.map((log, idx) => (
                  <div key={idx} className="leading-relaxed">{log}</div>
                ))}
              </div>
            </div>
          )}

          {/* Download Artifact Result */}
          {buildResult && (
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  బిల్డ్ విజయవంతంగా పూర్తయింది!
                </p>
                <p className="text-xs text-slate-300 mt-0.5">{buildResult.downloadName || `${appName}.${buildType.toLowerCase()}`}</p>
              </div>

              {buildResult.downloadUrl && (
                <a
                  href={buildResult.downloadUrl}
                  download
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>డౌన్‌లోడ్ చేయండి</span>
                </a>
              )}
            </div>
          )}

          {/* Action Button */}
          <div>
            <button
              type="button"
              disabled={isBuilding || !selectedZip}
              onClick={handleStartBuild}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-emerald-600 hover:from-indigo-600 hover:to-emerald-700 text-white font-bold text-sm shadow-xl shadow-indigo-500/20 disabled:opacity-50 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isBuilding ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>బిల్డ్ రన్ అవుతోంది...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>ఆండ్రాయిడ్ యాప్ బిల్డ్ ప్రారంభించండి</span>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer with Mandatory Rule Preservation Display */}
        <div className="p-3 bg-slate-950 border-t border-slate-800/80 flex items-center justify-center gap-2 text-xs text-rose-400">
          <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
          <span className="font-semibold">ఆటోమేటిక్ టెంపరరీ క్లీనప్ డిసేబుల్ చేయబడింది (Auto Workspace Cleanup Disabled)</span>
        </div>
      </div>
    </div>
  );
}
