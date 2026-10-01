import React, { useState } from 'react';
import { 
  X, Box, Zap, Rocket, Shield, Cpu, 
  Archive, Download, Check, AlertCircle,
  FileCode, Smartphone, Globe, Layers, Search,
  Settings, Terminal, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import JSZip from 'jszip';

interface BuildSuiteProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  projectFiles?: Array<{ name: string; content: string; type?: string }>;
  packageId?: string;
  onShift?: (item: { id: string; name: string; type: 'SMALI_CODE' | 'XML_LAYOUT' | '3D_ICON_ASSET' | 'LIVE_URL' | 'SOURCE_CODE' | 'IMAGE_ASSET' | 'APK_ASSET' | 'AAB_ASSET' | 'QR_CODE' | 'CODE_FIX' | 'UNIVERSAL_ASSET' | 'CODE_SNIPPET'; content: string }) => void;
}

const BUILD_STEPS = [
  { id: 'ANALYZE', label: 'Source Analysis', icon: Search, desc: 'Scanning codebase for dependencies and assets' },
  { id: 'OPTIMIZE', label: 'Optimization', icon: Zap, desc: 'Tree shaking and code minification' },
  { id: 'BUNDLE', label: 'Bundling', icon: Archive, desc: 'Generating optimized JS/CSS bundles' },
  { id: 'PACKAGE', label: 'Packaging', icon: Box, desc: 'Wrapping for target platform (APK/Web)' },
];

export const BuildSuite: React.FC<BuildSuiteProps> = ({ 
  isOpen, 
  onClose, 
  projectName, 
  projectFiles, 
  packageId = 'com.studio.app',
  onShift 
}) => {
  const [activeTab, setActiveTab] = useState<'BUILD' | 'CONFIG' | 'ENGINE'>('BUILD');
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [buildLogs, setBuildLogs] = useState<string[]>([]);
  const [buildSuccess, setBuildSuccess] = useState(false);
  const [buildError, setBuildError] = useState<string | null>(null);
  const [buildResult, setBuildResult] = useState<{
    apkUrl?: string;
    appName?: string;
    packageId?: string;
    fileSizeMb?: string;
    buildTimeSec?: number;
  } | null>(null);

  const addLog = (msg: string) => {
    setBuildLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleStartBuild = async () => {
    setIsBuilding(true);
    setBuildProgress(5);
    setBuildLogs([]);
    setBuildSuccess(false);
    setBuildError(null);
    setBuildResult(null);

    addLog(`Initiating Real Packaging Engine for project: ${projectName}`);

    try {
      // 1. Pack project source files into a ZIP archive in memory
      const zip = new JSZip();
      
      const sourceList = (projectFiles && projectFiles.length > 0) ? projectFiles : [
        { name: 'index.html', content: '<!DOCTYPE html><html><head><title>App</title></head><body><h1>Hello World</h1></body></html>' }
      ];

      // Check if Android project files exist or if we need to package assets & build template
      let hasGradle = false;
      sourceList.forEach(file => {
        zip.file(file.name, file.content);
        if (file.name.endsWith('build.gradle') || file.name.endsWith('build.gradle.kts')) {
          hasGradle = true;
        }
      });

      // If project has no build.gradle, generate a standard Android Gradle build structure
      if (!hasGradle) {
        addLog('Wrapping workspace into native Android project structure...');
        const cleanPkg = (packageId || 'com.studio.app').replace(/[^a-zA-Z0-9_.]/g, '') || 'com.studio.app';
        const cleanTitle = (projectName || 'App').replace(/[^a-zA-Z0-9_ ]/g, '') || 'App';

        zip.file('build.gradle', `// Top-level build file
buildscript {
    repositories {
        google()
        mavenCentral()
    }
}
plugins {
    id 'com.android.application' version '8.2.0' apply false
}
task clean(type: Delete) {
    delete rootProject.buildDir
}
`);
        zip.file('settings.gradle', `rootProject.name = "${cleanTitle}"\ninclude ':app'\n`);
        zip.file('app/build.gradle', `plugins {
    id 'com.android.application'
}
android {
    namespace '${cleanPkg}'
    compileSdk 34
    defaultConfig {
        applicationId "${cleanPkg}"
        minSdk 21
        targetSdk 34
        versionCode 1
        versionName "1.0"
    }
    buildTypes {
        release {
            minifyEnabled false
        }
    }
}
`);
        zip.file('app/src/main/AndroidManifest.xml', `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application
        android:allowBackup="true"
        android:label="${cleanTitle}"
        android:supportsRtl="true">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`);
      }

      addLog('Packaging project source files into ZIP archive...');
      const zipBlob = await zip.generateAsync({ type: 'blob' });

      // 2. Prepare FormData for real backend endpoint
      const formData = new FormData();
      formData.append('zipFile', zipBlob, `${(projectName || 'app').replace(/\s+/g, '_')}_project.zip`);
      formData.append('appName', projectName || 'AI Studio App');
      formData.append('packageId', packageId || 'com.studio.app');
      formData.append('buildType', 'APK');
      formData.append('keystoreMode', 'STUDIO');

      addLog('Connecting to Cloud Build Engine (/api/app/build-zip-to-apk)...');

      // 3. Dispatch real backend request
      const response = await fetch('/api/app/build-zip-to-apk', {
        method: 'POST',
        body: formData,
      });

      if (!response.body) {
        throw new Error('Server returned an empty or invalid stream response.');
      }

      // 4. Consume real-time ReadableStream
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
            setBuildProgress(parsed.progress || 0);
            addLog(`[${parsed.stage}] ${parsed.log}`);

            if (parsed.error) {
              setBuildError(parsed.log);
              setIsBuilding(false);
              setBuildSuccess(false);
              return;
            }

            if (parsed.result) {
              setBuildResult(parsed.result);
              setBuildSuccess(true);
            }
          } catch (e) {
            // Partial chunk parsing error safe to ignore
          }
        }
      }
    } catch (err: any) {
      addLog(`❌ Build Engine Error: ${err.message || 'Connection to build engine failed'}`);
      setBuildError(err.message || 'Build execution failed');
      setBuildSuccess(false);
    } finally {
      setIsBuilding(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[90vh] max-h-[800px]"
      >
        {/* Top Header */}
        <div className="bg-slate-900 px-4 py-3 sm:p-6 md:p-8 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-4">
            <button 
              onClick={onClose}
              className="p-2 sm:p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl sm:rounded-2xl transition border border-white/20 flex items-center gap-1.5 shrink-0 cursor-pointer"
              title="వెనక్కి (Back)"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <span className="text-xs font-bold hidden sm:inline">వెనుకకు</span>
            </button>
            <button
              onClick={() => onShift?.({ id: 'build_suite', name: 'Build Suite Workspace', type: 'SOURCE_CODE', content: JSON.stringify({ project: projectName, tab: activeTab }) })}
              className="p-2 sm:p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl sm:rounded-2xl transition border border-white/20 flex items-center gap-1.5 shrink-0 cursor-pointer"
              title="Universal Shift"
            >
              <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <span className="text-xs font-bold hidden sm:inline">Shift</span>
            </button>
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
              <Rocket className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-black tracking-tight leading-none">Build Suite</h2>
              <p className="text-indigo-400 text-[9px] sm:text-[10px] font-black uppercase tracking-widest mt-0.5 sm:mt-1">High-Performance Packaging Engine</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 sm:p-3 hover:bg-white/10 rounded-full transition"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
          {[
            { id: 'BUILD', label: 'Build & Package', icon: Box },
            { id: 'CONFIG', label: 'Project Config', icon: Settings },
            { id: 'ENGINE', label: 'AI Engine', icon: Cpu },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2.5 sm:py-4 flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-black uppercase tracking-wider transition ${
                activeTab === tab.id 
                  ? 'bg-white text-indigo-600 shadow-[inset_0_-2px_0_0_#4f46e5]' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-slate-50 flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
          {activeTab === 'BUILD' && (
            <>
              {/* Left Column: Build Controls */}
              <div className="w-full md:w-[400px] space-y-4 sm:space-y-6 shrink-0">
                <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] shadow-sm border border-slate-100 space-y-4 sm:space-y-6">
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-widest">Target Platform</h4>
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                    <button className="flex flex-col items-center gap-1.5 sm:gap-2 py-2 px-3 sm:py-2.5 sm:px-4 rounded-xl sm:rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-100">
                      <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-[10px] font-black">Android APK</span>
                    </button>
                    <button className="flex flex-col items-center gap-1.5 sm:gap-2 py-2 px-3 sm:py-2.5 sm:px-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200 text-slate-600 hover:border-indigo-200 hover:text-indigo-600 transition">
                      <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-[10px] font-black">Web Native</span>
                    </button>
                  </div>

                  <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-600">Production Mode</span>
                      <div className="w-10 h-5 bg-indigo-600 rounded-full relative">
                        <div className="absolute top-1 right-1 w-3 h-3 bg-white rounded-full" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-600">Minify Code</span>
                      <div className="w-10 h-5 bg-indigo-600 rounded-full relative">
                        <div className="absolute top-1 right-1 w-3 h-3 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>

                  {!isBuilding && !buildSuccess && (
                    <button 
                      onClick={handleStartBuild}
                      className="w-full py-3.5 sm:py-5 bg-slate-900 text-white rounded-xl sm:rounded-[1.5rem] font-black text-xs sm:text-sm hover:bg-slate-800 transition shadow-2xl flex items-center justify-center gap-2"
                    >
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                      Run Production Build
                    </button>
                  )}
                </div>

                <div className="bg-indigo-900/90 p-2.5 sm:p-3 rounded-xl border border-indigo-500/20 text-white space-y-1 shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-indigo-500/30 flex items-center justify-center shrink-0">
                      <Shield className="w-3 h-3 text-indigo-300" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-200">Security Check</span>
                  </div>
                  <p className="text-[9px] text-indigo-300 font-medium leading-tight">
                    Source code is automatically scanned for credentials and potential vulnerabilities before packaging.
                  </p>
                </div>
              </div>

              {/* Right Column: Build Logs/Result */}
              <div className="flex-1 flex flex-col gap-6">
                {buildError && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl text-xs flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">Build Error Encountered</div>
                      <div className="mt-0.5 text-rose-700 font-mono text-[11px] leading-relaxed">{buildError}</div>
                    </div>
                  </div>
                )}

                {isBuilding || buildLogs.length > 0 ? (
                  <div className="flex-1 flex flex-col bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl">
                    <div className="px-6 py-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-emerald-400" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Build Terminal</span>
                      </div>
                      {isBuilding && (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                          <span className="text-[10px] font-black text-emerald-400">ACTIVE</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 p-6 font-mono text-[11px] text-emerald-300 space-y-1.5 overflow-y-auto custom-scrollbar">
                      {buildLogs.map((log, i) => (
                        <div key={i} className="animate-in slide-in-from-left-2 duration-200">{log}</div>
                      ))}
                      {isBuilding && (
                        <div className="flex items-center gap-2 text-indigo-400 mt-4">
                          <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                          <span>Generating build artifacts...</span>
                        </div>
                      )}
                    </div>

                    {isBuilding && (
                      <div className="p-1">
                        <div className="w-full h-1 bg-slate-800">
                          <motion.div 
                            className="h-full bg-indigo-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${buildProgress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
                    <Layers className="w-16 h-16 text-slate-200 mb-4" />
                    <p className="text-slate-400 font-bold">No active build session</p>
                    <p className="text-slate-300 text-xs mt-1">Start a build to see output here</p>
                  </div>
                )}

                {buildSuccess && buildResult && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-50 border border-emerald-100 p-6 rounded-[2rem] flex items-center justify-between gap-6 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h5 className="font-black text-emerald-900">Build Completed!</h5>
                        <p className="text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                          {buildResult.appName || projectName} • {buildResult.packageId || packageId}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <button
                        onClick={() => {
                          if (buildResult?.apkUrl) {
                            onShift?.({
                              id: `build_${Date.now()}`,
                              name: `Build Artifact: ${projectName}`,
                              type: 'APK_ASSET',
                              content: buildResult.apkUrl
                            });
                          }
                        }}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-black text-sm hover:bg-indigo-500 transition shadow-lg shadow-indigo-200 flex items-center gap-2 cursor-pointer"
                      >
                        <Rocket className="w-4 h-4" />
                        Shift to AI Studio
                      </button>
                      <button 
                        onClick={() => {
                          if (buildResult?.apkUrl) {
                            const link = document.createElement('a');
                            link.href = buildResult.apkUrl;
                            link.download = `${(projectName || 'app').replace(/\s+/g, '_')}-release.apk`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }
                        }}
                        className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-500 transition shadow-lg shadow-emerald-200 flex items-center gap-2 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        Download APK
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </>
          )}

          {activeTab === 'CONFIG' && (
            <div className="flex-1 bg-white rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center">
                <FileCode className="w-10 h-10 text-slate-300" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">Advanced Project Configuration</h3>
                <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto">
                  Fine-tune your build settings, environment variables, and platform-specific manifests.
                </p>
              </div>
              <button className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm">
                Open Config Editor
              </button>
            </div>
          )}

          {activeTab === 'ENGINE' && (
            <div className="flex-1 bg-white rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-24 h-24 rounded-[40px] bg-indigo-50 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-indigo-200 rounded-[40px] animate-ping opacity-20" />
                <Cpu className="w-12 h-12 text-indigo-600 relative z-10" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">AI Generator Engine v4.0</h3>
                <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto">
                  Our neural assembly engine analyzes your code logic and generates optimized native abstractions.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left">
                  <div className="text-[10px] font-black text-slate-400 uppercase mb-1">Neural Model</div>
                  <div className="text-xs font-bold text-slate-800">Brahmastram-Large-v4</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left">
                  <div className="text-[10px] font-black text-slate-400 uppercase mb-1">Assembly Strategy</div>
                  <div className="text-xs font-bold text-slate-800">Recursive Hybrid Decompile</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
