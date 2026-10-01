import React, { useState, useRef } from 'react';
import { 
  X, Image as ImageIcon, Video, Music, Archive, 
  Smartphone, FileText, Code as CodeIcon,
  Check, Copy, Globe, Download, RefreshCw, ArrowLeft,
  Loader2, Rocket, ExternalLink, Link2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { createShortUrl } from '../utils/urlShortener';

interface ExposingStudioProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: string;
  onShift?: (item: { id: string; name: string; type: 'SMALI_CODE' | 'XML_LAYOUT' | '3D_ICON_ASSET' | 'LIVE_URL' | 'SOURCE_CODE' | 'IMAGE_ASSET' | 'APK_ASSET' | 'AAB_ASSET' | 'QR_CODE' | 'CODE_FIX' | 'UNIVERSAL_ASSET' | 'CODE_SNIPPET'; content: string }) => void;
}

const EXPOSING_TABS = [
  { id: 'IMAGE', label: 'Image to URL', icon: ImageIcon, color: 'text-rose-500', bg: 'bg-rose-50', accept: 'image/*' },
  { id: 'VIDEO', label: 'Video to URL', icon: Video, color: 'text-indigo-500', bg: 'bg-indigo-50', accept: 'video/*' },
  { id: 'AUDIO', label: 'Audio to URL', icon: Music, color: 'text-emerald-500', bg: 'bg-emerald-50', accept: 'audio/*' },
  { id: 'ZIP', label: 'Zip to URL', icon: Archive, color: 'text-amber-500', bg: 'bg-amber-50', accept: '.zip,.rar,.7z' },
  { id: 'APP', label: 'App to URL', icon: Smartphone, color: 'text-sky-500', bg: 'bg-sky-50', accept: '.apk,.aab,.ipa' },
  { id: 'PDF', label: 'PDF to URL', icon: FileText, color: 'text-orange-500', bg: 'bg-orange-50', accept: '.pdf' },
  { id: 'CODE', label: 'Code to URL', icon: CodeIcon, color: 'text-slate-500', bg: 'bg-slate-50', accept: '.js,.ts,.tsx,.html,.css,.json,.py,.java,.cpp' },
];

export const ExposingStudio: React.FC<ExposingStudioProps> = ({ isOpen, onClose, initialTab = 'IMAGE', onShift }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [fileRawData, setFileRawData] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Store refs to the 7 hidden file inputs
  const fileInputsRef = useRef<{ [key: string]: HTMLInputElement | null }>({});

  if (!isOpen) return null;

  const handleShiftAsset = () => {
    if (!generatedUrl || !selectedFile) return;
    onShift?.({
      id: `exposing_${Date.now()}`,
      name: `Exposing: ${selectedFile.name}`,
      type: 'LIVE_URL',
      content: generatedUrl
    });
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (fileInputsRef.current[tabId]) {
      fileInputsRef.current[tabId]!.value = ''; // Reset input so same file triggers onChange
      fileInputsRef.current[tabId]!.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, tabId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setActiveTab(tabId);
      setIsUploading(true);
      
      const reader = new FileReader();
      reader.onload = async (event) => {
        let dataUri = event.target?.result as string;
        
        // Fix binary headers to force proper download if URL is opened
        if (['ZIP', 'APP', 'CODE'].includes(tabId) && dataUri.startsWith('data:;base64,')) {
           dataUri = dataUri.replace('data:;base64,', 'data:application/octet-stream;base64,');
        } else if (tabId === 'PDF' && dataUri.startsWith('data:;base64,')) {
           dataUri = dataUri.replace('data:;base64,', 'data:application/pdf;base64,');
        }
        
        setSelectedFile(file);
        setFileRawData(dataUri);

        // Generate Ultra-Short Clean URL
        try {
          const shortUrl = await createShortUrl(file, dataUri);
          setGeneratedUrl(shortUrl);
        } catch {
          setGeneratedUrl(dataUri);
        } finally {
          setIsUploading(false);
        }
      };
      reader.onerror = () => {
        console.error("File reading failed");
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenInBrowser = () => {
    if (!generatedUrl) return;
    window.open(generatedUrl, '_blank');
  };

  const handleDownload = () => {
    const downloadUri = fileRawData || generatedUrl;
    if (!downloadUri || !selectedFile) return;
    const a = document.createElement('a');
    a.href = downloadUri;
    a.download = selectedFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setGeneratedUrl(null);
    setFileRawData(null);
    setCopied(false);
  };

  const triggerRefix = () => {
    if (fileInputsRef.current[activeTab]) {
      fileInputsRef.current[activeTab]!.value = '';
      fileInputsRef.current[activeTab]!.click();
    }
  };

  const activeTabConfig = EXPOSING_TABS.find(t => t.id === activeTab) || EXPOSING_TABS[0];
  const ActiveIcon = activeTabConfig.icon;

  return (
    <div className="fixed inset-0 z-[150] flex flex-col items-center justify-end md:justify-center p-0 md:p-6 animate-in fade-in duration-200">
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      
      <div 
        className="relative w-full max-w-lg bg-white rounded-t-[1.5rem] md:rounded-[1.75rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] md:max-h-[620px] animate-in slide-in-from-bottom-8 md:zoom-in-95 duration-300"
      >
        {/* Hidden inputs are mounted outside AnimatePresence so they're always accessible */}
        <div className="hidden">
          {EXPOSING_TABS.map((tab) => (
            <input
              key={tab.id}
              type="file"
              accept={tab.accept}
              ref={(el) => { fileInputsRef.current[tab.id] = el; }}
              onChange={(e) => handleFileChange(e, tab.id)}
            />
          ))}
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          <AnimatePresence mode="wait">
            {!selectedFile ? (
              <motion.div
                key="menu-view"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={onClose}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition border border-slate-200 flex items-center gap-1 shrink-0 cursor-pointer text-[11px]"
                      title="వెనక్కి (Back)"
                    >
                      <ArrowLeft className="w-4 h-4 text-slate-700" />
                      <span className="font-bold hidden sm:inline">Back</span>
                    </button>
                    <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-200 shrink-0">
                      <Globe className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900 tracking-tight leading-none mb-0.5">Exposing Studio</h2>
                      <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-wider">Direct File to URL Generator</span>
                    </div>
                  </div>
                  <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full transition" title="Close">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {isUploading ? (
                  <div className="flex-1 flex flex-col items-center justify-center py-12 space-y-3">
                    <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                    <p className="font-bold text-slate-600 text-xs">Generating URL for {activeTabConfig.label.split(' ')[0]}...</p>
                  </div>
                ) : (
                  <div className="flex-1 space-y-2">
                    <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl mb-2">
                      <p className="text-xs text-indigo-900 font-semibold leading-relaxed">
                        ఏదైనా ఫోటో, వీడియో లేదా ఫైల్ సెలెక్ట్ చేయండి. తక్షణమే ఏ బ్రౌజర్‌లోనైనా ఓపెన్ అయ్యే లైవ్ URL జనరేట్ అవుతుంది.
                      </p>
                    </div>
                    {EXPOSING_TABS.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => handleTabClick(tab.id)}
                          className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition active:scale-[0.98] border border-slate-100 shadow-sm group"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-lg ${tab.bg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                              <Icon className={`w-5 h-5 ${tab.color}`} />
                            </div>
                            <div className="text-left">
                              <span className="font-bold text-slate-800 text-sm block">{tab.label}</span>
                              <span className="text-[11px] text-slate-400 font-medium">Direct Live URL</span>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">Upload</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="pt-3 mt-auto">
                  <button
                    onClick={onClose}
                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl transition text-xs"
                  >
                    క్లోజ్ చేయండి (Close)
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="result-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col h-full space-y-4"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleReset}
                      className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition flex items-center gap-1 font-bold text-xs"
                      title="Back to Upload"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 leading-tight">Live Generated URL</h4>
                      <p className="text-slate-400 text-[11px]">ఏ బ్రౌజర్‌లోనైనా ఓపెన్ చేసుకోగల డైరెక్ట్ లింక్</p>
                    </div>
                  </div>
                  <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full transition">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary URL Section - Prominent & Visible */}
                <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 shadow-xl border border-slate-800 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-black text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Globe className="w-4 h-4" />
                      Live URL (డైరెక్ట్ లింక్)
                    </span>
                    <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded-full font-bold">
                      Ready to Use
                    </span>
                  </div>

                  {/* URL Text Input */}
                  <div className="mb-3">
                    <input
                      type="text"
                      readOnly
                      value={generatedUrl || ''}
                      onClick={(e) => (e.target as HTMLInputElement).select()}
                      className="w-full bg-slate-800/90 border border-slate-700 p-3 rounded-xl text-xs text-cyan-200 font-mono focus:outline-none focus:border-cyan-400 select-all"
                    />
                  </div>

                  {/* Primary Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => generatedUrl && handleCopy(generatedUrl)}
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all font-bold text-xs shadow-md ${
                        copied 
                          ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                          : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20 font-black'
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>✓ కాపీ అయ్యింది (Copied)</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>URL కాపీ చేయండి</span>
                        </>
                      )}
                    </button>

                    <button 
                      onClick={handleOpenInBrowser}
                      className="flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all font-bold text-xs shadow-md shadow-indigo-600/20"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>బ్రౌజర్‌లో ఓపెన్ చేయండి</span>
                    </button>
                  </div>
                </div>

                {/* File Details Card */}
                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200">
                  <div className="flex items-center gap-3">
                    {activeTab === 'IMAGE' && (fileRawData || generatedUrl) ? (
                      <img 
                        src={fileRawData || generatedUrl || ''} 
                        alt="Preview" 
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0 bg-white"
                      />
                    ) : (
                      <div className={`w-12 h-12 rounded-xl ${activeTabConfig.bg} flex items-center justify-center shrink-0 border border-slate-200`}>
                        <ActiveIcon className={`w-6 h-6 ${activeTabConfig.color}`} />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-slate-900 font-bold truncate text-xs sm:text-sm" title={selectedFile.name}>
                        {selectedFile.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold">
                          {formatFileSize(selectedFile.size)}
                        </span>
                        <span className="text-slate-500 text-[11px] truncate">
                          {selectedFile.type || 'File'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200">
                    <button 
                      onClick={triggerRefix}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition text-xs font-bold shadow-sm"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                      <span>వేరే ఫైల్ మార్చండి</span>
                    </button>

                    <button 
                      onClick={handleDownload}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition text-xs font-bold shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>డౌన్‌లోడ్ ఫైల్</span>
                    </button>
                  </div>
                </div>

                {onShift && (
                  <button 
                    onClick={handleShiftAsset}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition font-bold text-xs"
                  >
                    <Rocket className="w-3.5 h-3.5 text-indigo-600" />
                    <span>స్టూడియో వర్క్‌స్పేస్‌కు పంపండి (Shift)</span>
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

