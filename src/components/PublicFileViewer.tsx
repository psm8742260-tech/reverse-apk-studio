import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { 
  Download, Globe, ArrowLeft, Image as ImageIcon, 
  Video, Mic, FileText, Play, Volume2, CheckCircle2, Copy 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SharedFile {
  name: string;
  type: string;
  data: string;
}

interface ShareData {
  name: string;
  type: string;
  data?: string;
  files?: SharedFile[];
  createdAt?: string;
}

export const PublicFileViewer: React.FC<{ shareId: string }> = ({ shareId }) => {
  const [fileData, setFileData] = useState<ShareData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedFileIdx, setSelectedFileIdx] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    async function fetchFile() {
      try {
        // 1. Try fetching from Firestore
        const docRef = doc(db, 'public_shares', shareId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFileData(docSnap.data() as ShareData);
          setLoading(false);
          return;
        }

        // 2. Try session storage
        const cached = sessionStorage.getItem(`share_${shareId}`);
        if (cached) {
          setFileData(JSON.parse(cached));
          setLoading(false);
          return;
        }

        setError(true);
      } catch (err) {
        console.error('Error fetching share file:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchFile();
  }, [shareId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-bold text-cyan-400 font-sans">ఫైల్ లోడ్ అవుతోంది (Loading File)...</p>
      </div>
    );
  }

  if (error || !fileData) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 text-center font-sans">
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl max-w-sm">
          <h3 className="text-rose-400 font-bold text-lg mb-2">లింక్ అందుబాటులో లేదు</h3>
          <p className="text-slate-400 text-xs mb-4">ఈ ఫైల్ గడువు ముగిసి ఉండవచ్చు లేదా తొలగించించబడి ఉండవచ్చు.</p>
          <a href="/" className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl inline-block">
            హోమ్ పేజీకి వెళ్లండి
          </a>
        </div>
      </div>
    );
  }

  // Normalize files into a uniform array
  const filesList: SharedFile[] = fileData.files && fileData.files.length > 0
    ? fileData.files
    : [{ name: fileData.name, type: fileData.type, data: fileData.data || '' }];

  const currentFile = filesList[selectedFileIdx] || filesList[0];

  const getNormalizedType = (file: SharedFile): 'image' | 'video' | 'audio' | 'unknown' => {
    const lowType = (file.type || '').toLowerCase();
    const lowData = (file.data || '').toLowerCase();
    if (lowType.startsWith('image/') || lowType === 'image' || lowData.startsWith('data:image/')) return 'image';
    if (lowType.startsWith('video/') || lowType === 'video' || lowData.startsWith('data:video/')) return 'video';
    if (lowType.startsWith('audio/') || lowType === 'audio' || lowData.startsWith('data:audio/')) return 'audio';
    return 'unknown';
  };

  const fileType = getNormalizedType(currentFile);

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="px-4 py-3 bg-slate-900/90 backdrop-blur border-b border-slate-800 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <a href="/" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 transition">
            <ArrowLeft className="w-4 h-4" />
          </a>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="font-bold text-sm text-slate-200 truncate max-w-[150px] sm:max-w-xs">
              {fileData.name || 'Shared Media'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={copyShareLink}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition border border-slate-700 cursor-pointer"
          >
            {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share Link'}</span>
          </button>
          
          <a
            href={currentFile.data}
            download={currentFile.name}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs transition shadow-lg shadow-cyan-500/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>డౌన్‌లోడ్</span>
          </a>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Preview Panel */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 bg-slate-950 overflow-y-auto">
          <div className="max-w-4xl w-full flex flex-col items-center justify-center space-y-4">
            
            {/* Real Interactive Media Renderers */}
            <div className="w-full flex items-center justify-center min-h-[40vh] bg-slate-900/40 rounded-3xl border border-slate-800 p-4 relative shadow-2xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedFileIdx}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="w-full flex items-center justify-center"
                >
                  {fileType === 'image' && (
                    <img 
                      src={currentFile.data} 
                      alt={currentFile.name} 
                      className="max-w-full max-h-[60vh] object-contain rounded-2xl shadow-2xl border border-slate-800 bg-slate-950/50" 
                    />
                  )}

                  {fileType === 'video' && (
                    <video 
                      src={currentFile.data} 
                      controls 
                      autoPlay
                      className="max-w-full max-h-[60vh] rounded-2xl shadow-2xl border border-slate-800 bg-slate-950" 
                    />
                  )}

                  {fileType === 'audio' && (
                    <div className="p-8 bg-slate-900/90 rounded-3xl border border-slate-800 text-center max-w-md w-full shadow-2xl space-y-6">
                      <div className="w-20 h-20 bg-cyan-500/10 text-cyan-400 rounded-full flex items-center justify-center mx-auto border border-cyan-500/20 animate-pulse">
                        <Volume2 className="w-10 h-10" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-bold text-lg text-slate-200 line-clamp-2">{currentFile.name}</h3>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Interactive Audio Player</p>
                      </div>
                      <audio src={currentFile.data} controls className="w-full" />
                    </div>
                  )}

                  {fileType === 'unknown' && (
                    <div className="p-8 bg-slate-900 rounded-3xl border border-slate-800 text-center max-w-md w-full shadow-2xl space-y-4">
                      <div className="w-16 h-16 bg-cyan-500/10 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto border border-cyan-500/20">
                        <FileText className="w-8 h-8" />
                      </div>
                      <h3 className="font-bold text-lg text-slate-200 line-clamp-2">{currentFile.name}</h3>
                      <p className="text-xs text-slate-400 font-mono">{currentFile.type || 'Binary File'}</p>
                      <a
                        href={currentFile.data}
                        download={currentFile.name}
                        className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 transition"
                      >
                        <Download className="w-4 h-4" />
                        <span>డౌన్‌లోడ్</span>
                      </a>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Current File Meta Details */}
            <div className="w-full max-w-xl text-center space-y-1">
              <h2 className="text-sm font-bold text-slate-300 truncate px-4">{currentFile.name}</h2>
              <p className="text-[10px] text-slate-500 font-medium">
                File {selectedFileIdx + 1} of {filesList.length} • Type: {currentFile.type || fileType}
              </p>
            </div>

          </div>
        </main>

        {/* Multi-file Gallery / Sidebar (Visible if multiple files are present) */}
        {filesList.length > 1 && (
          <aside className="w-full md:w-80 bg-slate-900/50 backdrop-blur border-t md:border-t-0 md:border-l border-slate-800 flex flex-col max-h-[40vh] md:max-h-none">
            <div className="p-4 border-b border-slate-800 bg-slate-900/80 sticky top-0 z-10">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Shared Collection ({filesList.length})
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {filesList.map((file, idx) => {
                const isSelected = idx === selectedFileIdx;
                const type = getNormalizedType(file);
                
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedFileIdx(idx)}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all border text-left cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-lg'
                        : 'bg-slate-900/30 border-slate-800 text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-500'
                    }`}>
                      {type === 'image' && <ImageIcon className="w-5 h-5" />}
                      {type === 'video' && <Video className="w-5 h-5" />}
                      {type === 'audio' && <Mic className="w-5 h-5" />}
                      {type === 'unknown' && <FileText className="w-5 h-5" />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold truncate ${isSelected ? 'text-cyan-400' : 'text-slate-200'}`}>
                        {file.name}
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono capitalize">
                        {type} File
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
