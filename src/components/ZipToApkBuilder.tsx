import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  FileArchive, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  Loader2, 
  ShieldCheck, 
  Terminal, 
  Box, 
  ArrowLeft, 
  Rocket, 
  Key, 
  Zap,
  QrCode,
  FileCode,
  Check,
  RefreshCw,
  Wrench
} from 'lucide-react';
import JSZip from 'jszip';

interface ZipToApkBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onShift?: (item: { 
    id: string; 
    name: string; 
    type: 'SMALI_CODE' | 'XML_LAYOUT' | '3D_ICON_ASSET' | 'LIVE_URL' | 'SOURCE_CODE' | 'IMAGE_ASSET' | 'APK_ASSET' | 'AAB_ASSET' | 'QR_CODE' | 'CODE_FIX' | 'UNIVERSAL_ASSET' | 'CODE_SNIPPET'; 
    content: string 
  }) => void;
}

export const ZipToApkBuilder: React.FC<ZipToApkBuilderProps> = ({ isOpen, onClose, onShift }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileDetails, setFileDetails] = useState<{
    name: string;
    sizeMb: string;
    hasGradle: boolean;
    packageName: string;
    appName: string;
  } | null>(null);

  const [buildType, setBuildType] = useState<'APK' | 'AAB' | 'BOTH'>('APK');
  const [passcode, setPasscode] = useState('6606');
  const [passcodeVerified, setPasscodeVerified] = useState(true);

  // Additional Project & Keystore Customization Fields
  const [customProjectName, setCustomProjectName] = useState('My Awesome App');
  const [customPackageId, setCustomPackageId] = useState('com.studio.myapp');
  const [keystoreMode, setKeystoreMode] = useState<'PERMANENT_AUTO' | 'CUSTOM'>('PERMANENT_AUTO');
  const [jksFile, setJksFile] = useState<File | null>(null);
  const [keyAlias, setKeyAlias] = useState('');
  const [keyPassword, setKeyPassword] = useState('');
  const jksInputRef = useRef<HTMLInputElement>(null);

  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [buildLogs, setBuildLogs] = useState<string[]>([]);
  const [buildResult, setBuildResult] = useState<{
    apkUrl?: string;
    aabUrl?: string;
    appName: string;
    packageId: string;
    fileSizeMb: string;
    buildTimeSec: number;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleResetForNewProject = () => {
    setSelectedFile(null);
    setFileError(null);
    setFileDetails(null);
    setBuildResult(null);
    setBuildLogs([]);
    setIsBuilding(false);
    setCustomProjectName('My Awesome App');
    setCustomPackageId('com.studio.myapp');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleQuickRefix = () => {
    setFileError(null);
    if (selectedFile) {
      handleFileSelect(selectedFile);
    } else {
      alert('దయచేసి ముందుగా ఆండ్రాయిడ్ ప్రాజెక్ట్ ZIP ఫైల్‌ను అప్లోడ్ చేయండి.');
    }
  };

  if (!isOpen) return null;

  const handleFileSelect = async (file: File) => {
    setFileError(null);
    setBuildResult(null);

    // Max 100MB Guard
    if (file.size > 100 * 1024 * 1024) {
      setFileError('⚠️ ఫైల్ సైజు 100MB దాటింది! దయచేసి 100MB కంటే చిన్నదిగా ఉన్న ZIP ఫైల్‌ను అప్‌లోడ్ చేయండి.');
      setSelectedFile(null);
      setFileDetails(null);
      return;
    }

    if (!file.name.endsWith('.zip')) {
      setFileError('⚠️ దయచేసి కేవలం .ZIP ఫార్మాట్ ఆండ్రాయిడ్ ప్రాజెక్ట్ ఫైల్‌ను మాత్రమే అప్‌లోడ్ చేయండి.');
      setSelectedFile(null);
      setFileDetails(null);
      return;
    }

    setSelectedFile(file);
    const sizeMb = (file.size / (1024 * 1024)).toFixed(2);

    try {
      const zip = new JSZip();
      const loadedZip = await zip.loadAsync(file);

      let hasGradle = false;
      let hasAndroidManifest = false;
      let hasSettingsGradle = false;
      let projectType = 'Standard Android Project';
      let appName = file.name.replace(/\.zip$/i, '');
      let packageName = customPackageId || 'com.app.build';

      const filePaths = Object.keys(loadedZip.files);

      // 1. Fully automatic scan of all files, folders, and configurations
      filePaths.forEach((relativePath) => {
        if (relativePath.endsWith('build.gradle') || relativePath.endsWith('build.gradle.kts')) {
          hasGradle = true;
        }
        if (relativePath.endsWith('AndroidManifest.xml')) {
          hasAndroidManifest = true;
        }
        if (relativePath.endsWith('settings.gradle') || relativePath.endsWith('settings.gradle.kts')) {
          hasSettingsGradle = true;
        }
      });

      // 2. Identify Android project type automatically
      if (filePaths.some(p => p.includes('pubspec.yaml'))) {
        projectType = 'Flutter Android App';
      } else if (filePaths.some(p => p.includes('react-native') || p.includes('App.tsx') || p.includes('index.js'))) {
        projectType = 'React Native / Web SPA App';
      } else if (!hasGradle && filePaths.some(p => p.endsWith('.html') || p.endsWith('.js'))) {
        projectType = 'Web SPA / HTML5 Android Wrapper';
      }

      // 3 & 4. Read Manifest or existing files without overwriting
      const manifestFile = filePaths.find(p => p.endsWith('AndroidManifest.xml'));
      if (manifestFile) {
        const manifestText = await loadedZip.files[manifestFile].async('string');
        const pkgMatch = manifestText.match(/package="([^"]+)"/);
        if (pkgMatch && !customPackageId) packageName = pkgMatch[1];
        const labelMatch = manifestText.match(/android:label="([^"]+)"/);
        if (labelMatch) appName = labelMatch[1];
      }

      setFileDetails({
        name: file.name,
        sizeMb,
        hasGradle,
        packageName,
        appName
      });
      
      if (!customProjectName || customProjectName === 'My Awesome App') {
        setCustomProjectName(appName);
      }
      if (!customPackageId || customPackageId === 'com.studio.myapp') {
        setCustomPackageId(packageName);
      }

      // 5 & 6. Missing files notification & auto-assembly preparation
      const missingFiles: string[] = [];
      if (!hasGradle) missingFiles.push('build.gradle');
      if (!hasAndroidManifest) missingFiles.push('AndroidManifest.xml');
      if (!hasSettingsGradle) missingFiles.push('settings.gradle');

      if (missingFiles.length > 0) {
        setFileError(`⚡ ఆటో-స్కాన్ గమనిక: గుర్తించిన ప్రాజెక్ట్ రకం [${projectType}]. మిస్ అయిన ఫైల్స్ (${missingFiles.join(', ')}) స్వయంచాలకంగా అసెంబుల్ చేయబడుతున్నాయి (Existing files preserved).`);
      } else {
        setFileError(null);
      }
    } catch (e) {
      console.error(e);
      setFileDetails({
        name: file.name,
        sizeMb,
        hasGradle: true,
        packageName: customPackageId || 'com.app.build',
        appName: file.name.replace(/\.zip$/i, '')
      });
    }
  };

  const handleStartBuild = async () => {
    if (!selectedFile) {
      setFileError('దయచేసి అప్‌లోడ్ చేయడానికి ZIP ఫైల్‌ను ఎంచుకోండి.');
      return;
    }

    // Verify passcode
    if (!passcode || (passcode !== '6606' && passcode.trim().length < 4)) {
      setPasscodeVerified(false);
      setFileError('❌ చెల్లుబాటు అయ్యే రీఛార్జ్ పాస్‌వర్డ్ లేదా అడ్మిన్ కీ (6606) నమోదు చేయండి.');
      return;
    }

    setPasscodeVerified(true);
    setIsBuilding(true);
    setBuildProgress(5);
    setBuildLogs(['[00:00] ⚡ AI Master Cloud Build Engine Initiated...']);
    setBuildResult(null);

    const logMsg = (msg: string) => {
      setBuildLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
    };

    try {
      const formData = new FormData();
      formData.append('zipFile', selectedFile);
      if (jksFile) {
        formData.append('keystoreFile', jksFile);
      }
      formData.append('appName', customProjectName || fileDetails?.appName || '');
      formData.append('packageId', customPackageId || fileDetails?.packageName || '');
      formData.append('buildType', buildType);
      formData.append('keystoreMode', keystoreMode);
      formData.append('keystorePassword', keyPassword);
      formData.append('keyAlias', keyAlias);
      formData.append('keyPassword', keyPassword);

      const response = await fetch('/api/app/build-zip-to-apk', {
        method: 'POST',
        body: formData,
      });

      if (!response.body) {
        throw new Error('Server returned an empty or invalid stream.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const parsed = JSON.parse(line);
            setBuildProgress(parsed.progress);
            logMsg(`[${parsed.stage}] ${parsed.log}`);

            if (parsed.error) {
              setFileError(`❌ బిల్డ్ విఫలమైంది: ${parsed.log}`);
              setIsBuilding(false);
              return;
            }

            if (parsed.result) {
              setBuildResult(parsed.result);
              // 🚀 Admin requirement: 100% reached -> Trigger automatic download of Google Play ZIP package
              const downloadUrl = parsed.result.playZipUrl || parsed.result.apkUrl;
              if (downloadUrl) {
                try {
                  const autoLink = document.createElement('a');
                  autoLink.href = downloadUrl;
                  const fileName = downloadUrl.split('/').pop() || (parsed.result.appName || 'app') + '.zip';
                  autoLink.download = fileName;
                  document.body.appendChild(autoLink);
                  autoLink.click();
                  document.body.removeChild(autoLink);
                } catch (dlErr) {
                  console.warn('Auto download error:', dlErr);
                }
              }
            }
          } catch (e) {
            // Partial chunk parsing error, safe to ignore
          }
        }
      }
    } catch (err: any) {
      logMsg(`❌ Connection Error: ${err.message || 'Build Execution Failed'}`);
    } finally {
      setIsBuilding(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-300/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-900">
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-200 hover:bg-slate-300 rounded-xl transition cursor-pointer"
              title="వెనుకకు (Back)"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1 bg-amber-500/10 text-amber-600 rounded-lg text-sm border border-amber-500/20">⚡</span>
                <h2 className="text-base font-black text-slate-900 tracking-wide">
                  ZIP ➔ APK / AAB Cloud Builder
                </h2>
              </div>
              <p className="text-[11px] text-slate-600">
                ఆండ్రాయిడ్ ప్రాజెక్ట్ ZIP ని సెకన్లలో .APK / .AAB గా బిల్డ్ చేయండి
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleQuickRefix}
              className="px-2 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition flex items-center gap-1 border border-indigo-200 cursor-pointer shadow-xs"
              title="రీఫిక్స్ (Re-Fix)"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">రీఫిక్స్</span>
            </button>
            <button
              type="button"
              onClick={handleResetForNewProject}
              className="px-2 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center gap-1 border border-slate-300 cursor-pointer shadow-xs"
              title="కొత్త ప్రాజెక్ట్ రీలోడ్ (Reload New Project)"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">రీలోడ్</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition cursor-pointer"
              title="మూసివేయి (Close)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* BODY CONTENT */}
        <div className="p-6 overflow-y-auto space-y-5 custom-scrollbar flex-1 bg-slate-50/50">
          
          {/* STEP 1: FILE UPLOAD ZONE */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <span>1. Source Code ZIP Upload (గరిష్టంగా 100MB)</span>
            </label>
            
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 ${
                selectedFile 
                  ? 'border-emerald-500/50 bg-emerald-50 hover:bg-emerald-100/60' 
                  : 'border-slate-300 hover:border-indigo-500 bg-white hover:bg-slate-100'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".zip"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
              />

              {selectedFile ? (
                <div className="flex items-center gap-3 text-left w-full bg-slate-100 p-3 rounded-xl border border-slate-200">
                  <FileArchive className="w-8 h-8 text-emerald-600 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{selectedFile.name}</p>
                    <p className="text-[10px] text-slate-600 font-mono">
                      సైజు: {fileDetails?.sizeMb} MB | ప్యాకేజీ: {fileDetails?.packageName}
                    </p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                </div>
              ) : (
                <>
                  <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-600">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold text-slate-800">
                    మీ Android Source Code (.ZIP) ఫైల్‌ను ఇక్కడ క్లిక్ చేసి ఎంచుకోండి
                  </p>
                  <p className="text-[10px] text-slate-500">
                    సపోర్ట్ చేసే వర్షన్లు: Gradle 7.0+, Android SDK 24 - 34
                  </p>
                </>
              )}
            </div>

            {fileError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{fileError}</span>
              </div>
            )}
          </div>

          {/* STEP 2: PROJECT NAME & PACKAGE ID (PERMANENT LOCKING) */}
          <div className="space-y-2 pt-1 border-t border-slate-200">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <span>2. 🏷️ ప్రాజెక్ట్ పేరు / ప్యాకేజీ పేరు (పర్మనెంట్ లాకింగ్ కోసం)</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 mb-1 block">Project Name:</label>
                <input
                  type="text"
                  value={customProjectName}
                  onChange={(e) => setCustomProjectName(e.target.value)}
                  placeholder="My Awesome App"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono outline-none focus:border-indigo-500 shadow-xs"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 mb-1 block">Package ID:</label>
                <input
                  type="text"
                  value={customPackageId}
                  onChange={(e) => setCustomPackageId(e.target.value)}
                  placeholder="com.studio.myapp"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono outline-none focus:border-indigo-500 shadow-xs"
                />
              </div>
            </div>
          </div>

          {/* STEP 3: KEYSTORE SETUP */}
          <div className="space-y-2 pt-1 border-t border-slate-200">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span>3. 🔑 కీ-స్టోర్ ఎంపిక (Keystore Setup)</span>
              <span className="text-[10px] text-amber-600 font-mono font-bold">v2/v3 Signature Enabled</span>
            </label>
            <div className="space-y-2 bg-white p-3 rounded-xl border border-slate-200 text-xs shadow-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-800 hover:text-slate-950">
                <input
                  type="radio"
                  name="keystoreMode"
                  checked={keystoreMode === 'PERMANENT_AUTO'}
                  onChange={() => setKeystoreMode('PERMANENT_AUTO')}
                  className="accent-indigo-600"
                />
                <span className="font-bold">ఆటో-జెనరేట్ & పర్మనెంట్ లాక్ (Studio Default - ఫాస్ట్ బిల్డ్)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-800 hover:text-slate-950 pt-1">
                <input
                  type="radio"
                  name="keystoreMode"
                  checked={keystoreMode === 'CUSTOM'}
                  onChange={() => setKeystoreMode('CUSTOM')}
                  className="accent-indigo-600"
                />
                <span className="font-bold">కస్టమ్ కీ-స్టోర్ అప్లోడ్ (.jks ఫైల్ + పాస్వర్డ్)</span>
              </label>

              {keystoreMode === 'CUSTOM' && (
                <div className="pt-2 pl-6 space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => jksInputRef.current?.click()}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold border border-slate-300 flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5 text-amber-600" />
                      <span>{jksFile ? jksFile.name : ' .JKS File Choose'}</span>
                    </button>
                    <input
                      ref={jksInputRef}
                      type="file"
                      accept=".jks,.keystore"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setJksFile(e.target.files[0]);
                        }
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Key Alias Name"
                      value={keyAlias}
                      onChange={(e) => setKeyAlias(e.target.value)}
                      className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none focus:border-indigo-500 font-mono shadow-xs"
                    />
                    <input
                      type="password"
                      placeholder="Keystore Password"
                      value={keyPassword}
                      onChange={(e) => setKeyPassword(e.target.value)}
                      className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none focus:border-indigo-500 font-mono shadow-xs"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* STEP 4: BUILD FORMAT & RECHARGE PASSCODE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
            
            {/* BUILD FORMAT SELECTION */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-700 uppercase tracking-wider">
                4. 📦 బిల్డ్ ఫార్మాట్ (Build Format)
              </label>
              <div className="grid grid-cols-3 gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs">
                <button
                  type="button"
                  onClick={() => setBuildType('APK')}
                  className={`py-2 text-[11px] font-black rounded-lg transition ${
                    buildType === 'APK'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  APK File
                </button>
                <button
                  type="button"
                  onClick={() => setBuildType('AAB')}
                  className={`py-2 text-[11px] font-black rounded-lg transition ${
                    buildType === 'AAB'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  AAB File
                </button>
                <button
                  type="button"
                  onClick={() => setBuildType('BOTH')}
                  className={`py-2 text-[11px] font-black rounded-lg transition ${
                    buildType === 'BOTH'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Both
                </button>
              </div>
            </div>

            {/* PASSCODE / RECHARGE VALIDATION */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center justify-between">
                <span>5. రీఛార్జ్ / పాస్‌వర్డ్ కీ</span>
                <span className="text-[10px] text-emerald-600 font-bold">అడ్మిన్: 6606</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="రీఛార్జ్ పిన్ లేదా 6606 ఎంటర్ చేయండి"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono outline-none focus:border-indigo-500 pr-8 shadow-xs"
                />
                <Key className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5" />
              </div>
            </div>
          </div>

          {/* BUILD EXECUTION ACTION BUTTON */}
          {!isBuilding && !buildResult && (
            <button
              type="button"
              onClick={handleStartBuild}
              disabled={!selectedFile}
              className="w-full bg-gradient-to-r from-indigo-600 via-teal-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white font-black py-3.5 rounded-xl text-sm transition shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Rocket className="w-4 h-4" />
              <span>క్లౌడ్ కంపైలేషన్ ప్రారంభించు (Start ZIP Build)</span>
            </button>
          )}

          {/* BUILD PROGRESS & TERMINAL LOGS */}
          {isBuilding && (
            <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200 animate-in fade-in shadow-xs">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
                  <span>క్లౌడ్ బిల్డ్ ప్రాసెసింగ్... (గరిష్ట సమయం: 3 నిమిషాలు)</span>
                </span>
                <span className="font-mono text-indigo-600 font-black">{buildProgress}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-indigo-500 via-teal-500 to-emerald-500 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${buildProgress}%` }}
                />
              </div>

              {/* Terminal Output */}
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 font-mono text-[10px] text-emerald-400 space-y-1 max-h-32 overflow-y-auto custom-scrollbar shadow-inner">
                {buildLogs.map((log, idx) => (
                  <div key={idx}>{log}</div>
                ))}
              </div>
            </div>
          )}

          {/* BUILD SUCCESS RESULTS */}
          {buildResult && (
            <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl space-y-3 animate-in fade-in shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-xs font-black text-slate-900">
                    బిల్డ్ విజయవంతంగా పూర్తయింది! ({buildResult.buildTimeSec}s)
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                  {buildResult.fileSizeMb} MB
                </span>
              </div>

              <div className="text-[11px] text-slate-700 space-y-0.5 font-mono bg-white p-2.5 rounded-lg border border-emerald-200 shadow-xs">
                <p>📌 అప్లికేషన్ నేమ్: <strong className="text-slate-900">{buildResult.appName}</strong></p>
                <p>📦 ప్యాకేజీ ID: <strong className="text-slate-900">{buildResult.packageId}</strong></p>
                <p>🛡️ APK Signature: <strong className="text-emerald-700">v2+v3 Signed (Production Ready)</strong></p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {buildResult.apkUrl && (
                  <a
                    href={buildResult.apkUrl}
                    download={`${buildResult.appName}.apk`}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download .APK</span>
                  </a>
                )}

                {buildResult.aabUrl && (
                  <a
                    href={buildResult.aabUrl}
                    download={`${buildResult.appName}.aab`}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <Box className="w-4 h-4" />
                    <span>Download .AAB</span>
                  </a>
                )}

                {onShift && (
                  <button
                    type="button"
                    onClick={() => {
                      onShift({
                        id: `zip_build_${Date.now()}`,
                        name: `${buildResult.appName}_release.apk`,
                        type: 'APK_ASSET',
                        content: `APK Asset generated from ${fileDetails?.name || 'ZIP Source'}`
                      });
                      alert('ఫైల్ వర్క్‌స్పేస్ ప్రాజెక్ట్‌కి కనెక్ట్ చేయబడింది!');
                    }}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold py-2.5 px-3 rounded-xl transition border border-slate-300 cursor-pointer shadow-xs"
                  >
                    షిఫ్ట్ ప్రాజెక్ట్
                  </button>
                )}
              </div>
            </div>
          )}

        </div>

        {/* FOOTER */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 text-[10px] text-slate-600 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
            <span>ఆటోమేటిక్ టెంపరరీ క్లీనప్ డిసేబుల్ చేయబడింది (Auto Workspace Cleanup Disabled)</span>
          </span>
          <span className="font-mono text-slate-500">AI Master Studio HYBRID ENGINE</span>
        </div>

      </div>
    </div>
  );
};
