import React, { useState, useRef } from 'react';
import { X, Upload, Terminal, CheckCircle2, AlertCircle, ShieldAlert, Cpu, Download, Sparkles, FolderArchive, Play, RefreshCw } from 'lucide-react';
import { HybridBadgeH } from './HybridBadgeH';

interface ZipToApkBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onShift?: (item: any) => void;
}

export function ZipToApkBuilder({ isOpen, onClose, onShift }: ZipToApkBuilderProps) {
  const [appName, setAppName] = useState<string>('My Awesome App');
  const [packageId, setPackageId] = useState<string>('com.example.myapp');
  const [buildType] = useState<'APK' | 'AAB' | 'BOTH'>('BOTH');
  const [selectedZip, setSelectedZip] = useState<File | null>(null);
  const [isBuilding, setIsBuilding] = useState<boolean>(false);
  const [buildProgress, setBuildProgress] = useState<number>(0);
  const [buildStage, setBuildStage] = useState<string>('సిద్ధంగా ఉంది');
  const [logs, setLogs] = useState<string[]>([]);
  const [buildResult, setBuildResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedZip(file);
      setErrorMsg('');
      setUploadError('');
      setUploadProgress(1);
      setIsUploading(true);

      const cleanName = file.name.replace(/\.zip$/i, '').replace(/[^a-zA-Z0-9_-]/g, ' ');
      if (cleanName) {
        setAppName(cleanName);
      }

      // 1 నుండి 100% వరకు వరుసగా ఫీల్ అవుతూ కనపడే లైవ్ ప్రోగ్రెస్ బార్
      let p = 1;
      const timer = setInterval(() => {
        p += Math.floor(Math.random() * 4) + 2;
        if (p >= 100) {
          p = 100;
          setUploadProgress(100);
          setIsUploading(false);
          clearInterval(timer);

          // 100% పూర్తయిన తర్వాత జిప్ ఫైల్ చెక్ & ఎర్రర్ డిటెక్షన్
          if (!file.name.toLowerCase().endsWith('.zip')) {
            const err = 'ఎర్రర్: ఎంచుకున్న ఫైల్ సరైన .ZIP ఫార్మాట్ కాదు. దయచేసి సరైన .zip ఫైల్‌ను మాత్రమే అప్‌లోడ్ చేయండి.';
            setErrorMsg(err);
            setUploadError(err);
          } else if (file.size === 0) {
            const err = 'ఎర్రర్: ఎంచుకున్న జిప్ ఫైల్ ఖాళీగా (0 Bytes) ఉంది. దయచేసి సరైన ప్రాజెక్ట్ జిప్ ఫైల్‌ను అప్‌లోడ్ చేయండి.';
            setErrorMsg(err);
            setUploadError(err);
          } else if (file.size > 250 * 1024 * 1024) {
            const err = 'ఎర్రర్: జిప్ ఫైల్ సైజ్ 250MB కి మించి ఉంది. దయచేసి తక్కువ సైజ్ ఉన్న ఫైల్‌ను అప్‌లోడ్ చేయండి.';
            setErrorMsg(err);
            setUploadError(err);
          }
        } else {
          setUploadProgress(p);
        }
      }, 30);
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
    <div className="fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 font-sans">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] shadow-2xl flex flex-col overflow-hidden text-slate-800 border border-slate-200">
        {/* Header - 50% Compact Height */}
        <div className="py-2 px-3 sm:px-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2 min-w-0">
            <span className="p-1.5 bg-indigo-500/15 text-indigo-500 rounded-lg border border-indigo-500/25 shrink-0">
              <Cpu className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">ZIP to APK / AAB Cloud Builder</h3>
                <HybridBadgeH />
              </div>
              <p className="text-[10px] text-slate-500 leading-tight truncate max-w-[220px] sm:max-w-md mt-0.5">వెబ్ ప్రాజెక్ట్ జిప్ నుండి నేరుగా ఆండ్రాయిడ్ APK లేదా AAB బిల్డ్ చేయండి</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            {/* శాశ్వత రీలోడ్ బటన్ - కాంపాక్ట్ వైబ్రంట్ బటన్ */}
            <button
              type="button"
              onClick={() => {
                setSelectedZip(null);
                setUploadProgress(0);
                setUploadError('');
                if (fileInputRef.current) fileInputRef.current.value = '';
                setBuildResult(null);
                setErrorMsg('');
                setLogs([]);
              }}
              className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm border border-emerald-400/40 transition-all active:scale-95 cursor-pointer shrink-0"
              title="ఫైల్స్ తొలగించి రీలోడ్ చేయండి"
            >
              <RefreshCw className="w-3 h-3 text-white" />
              <span>రీలోడ్</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all cursor-pointer shrink-0"
              aria-label="మూసివేయి"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 custom-scrollbar">
          {/* File Upload Box */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all relative ${
              selectedZip 
                ? 'border-emerald-500/60 bg-emerald-50/70 shadow-sm' 
                : 'border-slate-300 bg-slate-50/80 hover:border-indigo-400 hover:bg-slate-100/70'
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
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                <FolderArchive className="w-8 h-8" />
              </div>
              {selectedZip ? (
                <div className="flex flex-col items-center gap-1.5 w-full max-w-md mx-auto">
                  <p className="text-sm font-bold text-emerald-600 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {selectedZip.name}
                  </p>
                  <p className="text-xs text-slate-500">{(selectedZip.size / (1024 * 1024)).toFixed(2)} MB - ఎంచుకోబడింది</p>

                  {/* 1 నుండి 100 వరకు లైవ్ అప్‌లోడ్ ప్రోగ్రెస్ బార్ */}
                  <div className="w-full space-y-1 mt-1">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-600 flex items-center gap-1">
                        {uploadProgress < 100 ? (
                          <>
                            <RefreshCw className="w-3 h-3 animate-spin text-indigo-500" />
                            <span>అప్‌లోడ్ అవుతోంది...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">అప్‌లోడ్ విజయవంతం</span>
                          </>
                        )}
                      </span>
                      <span className={`font-mono text-xs font-black ${uploadProgress < 100 ? 'text-indigo-600' : 'text-emerald-600'}`}>
                        {uploadProgress}%
                      </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden border border-slate-300 shadow-inner">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-teal-500 to-emerald-500 transition-all duration-100 shadow-sm"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* 100% పూర్తయిన తర్వాత ఏదైనా ఎర్రర్ ఉంటే వెంటనే ఇక్కడ డిస్‌ప్లే */}
                  {uploadError && (
                    <div className="mt-2 w-full p-2.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-700 text-xs font-semibold flex items-start gap-2 shadow-sm text-left">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-rose-800">జిప్ ఫైల్ లోపం (ZIP Error):</p>
                        <p className="mt-0.5 text-[11px]">{uploadError}</p>
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <div>
                  <p className="text-sm font-semibold text-slate-700">సోర్స్ కోడ్ ZIP ఫైల్‌ను ఇక్కడ అప్‌లోడ్ చేయండి</p>
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

              {(buildResult.downloadUrl || buildResult.playZipUrl || buildResult.apkUrl) && (
                <a
                  href={buildResult.downloadUrl || buildResult.playZipUrl || buildResult.apkUrl}
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

        {/* Footer with subtle background indicator */}
        <div className="px-4 py-2 flex items-center justify-center text-[10px] text-slate-400 opacity-60">
          <span>Auto Workspace Cleanup Disabled</span>
        </div>
      </div>
    </div>
  );
}
