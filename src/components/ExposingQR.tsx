import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  QrCode, Image as ImageIcon, Video, Mic, 
  Clock, Download, Copy, Trash2, X, 
  CheckCircle2, AlertCircle, Loader2,
  Infinity, Calendar, ShieldCheck, ArrowLeft, Rocket
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface ExposingQRProps {
  isOpen: boolean;
  onClose: () => void;
  onShift?: (item: { id: string; name: string; type: 'SMALI_CODE' | 'XML_LAYOUT' | '3D_ICON_ASSET' | 'LIVE_URL' | 'SOURCE_CODE' | 'IMAGE_ASSET' | 'APK_ASSET' | 'AAB_ASSET' | 'QR_CODE' | 'CODE_FIX' | 'UNIVERSAL_ASSET' | 'CODE_SNIPPET'; content: string }) => void;
}

interface UploadedFile {
  name: string;
  type: 'image' | 'video' | 'audio';
  url: string;
}

export const ExposingQR: React.FC<ExposingQRProps> = ({ isOpen, onClose, onShift }) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [expiryDays, setExpiryDays] = useState<number | 'permanent'>('permanent');
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrValue, setQrValue] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentAccept, setCurrentAccept] = useState('image/*,video/*,audio/*');

  // Timer logic for countdown
  useEffect(() => {
    if (qrValue && expiryDays !== 'permanent') {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + (expiryDays as number));
      
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = expiryDate.getTime() - now;

        if (distance < 0) {
          clearInterval(interval);
          setTimeLeft('EXPIRED');
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [qrValue, expiryDays]);

  const handleUploadClick = (type: 'image' | 'video' | 'audio') => {
    let accept = '';
    if (type === 'image') accept = 'image/*';
    if (type === 'video') accept = 'video/*';
    if (type === 'audio') accept = 'audio/*';
    
    setCurrentAccept(accept);
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 100);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const type = file.type.split('/')[0] as 'image' | 'video' | 'audio';
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUri = event.target?.result as string;
      const newFile: UploadedFile = {
        name: file.name,
        type: type,
        url: dataUri
      };
      setFiles(prev => [...prev, newFile]);
      setQrValue(null); // Reset QR if new files added
    };
    reader.readAsDataURL(file);
  };

  const generateQR = async () => {
    if (files.length === 0) return;
    setIsGenerating(true);
    
    try {
      const shortId = Math.random().toString(36).substring(2, 8);
      const payload = {
        id: shortId,
        name: files.length === 1 ? files[0].name : `${files.length} Shared Media Files`,
        type: files.length === 1 ? files[0].type : 'multiple_files',
        data: files.length === 1 ? files[0].url : '',
        files: files.map(f => ({ name: f.name, type: f.type, data: f.url })),
        createdAt: new Date().toISOString()
      };
      
      try {
        await fetch('/api/exposing/share', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (srvErr) {
        console.warn('Error saving to server, using fallback session storage:', srvErr);
        sessionStorage.setItem(`share_${shortId}`, JSON.stringify(payload));
      }

      const shareUrl = `${window.location.origin}/?v=${shortId}`;
      setQrValue(shareUrl);
    } catch (err) {
      console.error('QR generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!qrValue) return;
    navigator.clipboard.writeText(qrValue);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadQR = () => {
    const svg = document.getElementById('qr-svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'Exposing_QR.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-white rounded-[24px] overflow-hidden shadow-2xl flex flex-col max-h-[70vh]"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition border border-slate-200 flex items-center gap-1 shrink-0 cursor-pointer text-[11px]"
              title="వెనక్కి (Back)"
            >
              <ArrowLeft className="w-4 h-4 text-slate-700" />
              <span className="font-bold hidden sm:inline">వెనుకకు</span>
            </button>
            <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-100">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 tracking-tight">Exposing QR</h2>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Digital Storage Board</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 transition-all active:scale-90"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* STEP 2: Media Buttons */}
          <section className="space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-4 bg-indigo-600 rounded-full" />
              1. Media Selection
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <button 
                onClick={() => handleUploadClick('image')}
                className="flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-dashed border-slate-100 hover:border-indigo-600 hover:bg-indigo-50/30 transition-all group gap-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-black text-slate-700 uppercase">Photo</span>
              </button>

              <button 
                onClick={() => handleUploadClick('video')}
                className="flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-dashed border-slate-100 hover:border-amber-600 hover:bg-amber-50/30 transition-all group gap-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Video className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-black text-slate-700 uppercase">Video</span>
              </button>

              <button 
                onClick={() => handleUploadClick('audio')}
                className="flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-dashed border-slate-100 hover:border-emerald-600 hover:bg-emerald-50/30 transition-all group gap-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mic className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-black text-slate-700 uppercase">Audio</span>
              </button>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {files.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-[10px] font-bold text-slate-600 border border-slate-200">
                    {file.type === 'image' && <ImageIcon className="w-3 h-3" />}
                    {file.type === 'video' && <Video className="w-3 h-3" />}
                    {file.type === 'audio' && <Mic className="w-3 h-3" />}
                    <span className="truncate max-w-[100px]">{file.name}</span>
                    <button onClick={() => setFiles(prev => prev.filter((_, i) => i !== idx))}>
                      <X className="w-3 h-3 text-slate-400 hover:text-rose-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* STEP 3: Expiry Timer */}
          <section className="space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-4 bg-indigo-600 rounded-full" />
              2. Storage Duration
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Permanent', val: 'permanent', icon: Infinity },
                { label: '1 Day', val: 1, icon: Clock },
                { label: '2 Days', val: 2, icon: Clock },
                { label: '3 Days', val: 3, icon: Clock },
                { label: '5 Days', val: 5, icon: Clock },
              ].map((pill) => (
                <button
                  key={pill.label}
                  onClick={() => setExpiryDays(pill.val as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black transition-all border-2 ${
                    expiryDays === pill.val 
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100' 
                      : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-100 hover:bg-slate-50'
                  }`}
                >
                  <pill.icon className={`w-4 h-4 ${expiryDays === pill.val ? 'text-white' : 'text-slate-400'}`} />
                  {pill.label}
                </button>
              ))}
            </div>
          </section>

          {/* Action Button */}
          {!qrValue && (
            <button
              onClick={generateQR}
              disabled={files.length === 0 || isGenerating}
              className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black text-sm shadow-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Storage Board...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 text-indigo-400" />
                  Generate Exposing QR
                </>
              )}
            </button>
          )}

          {/* STEP 4: QR Display Area */}
          <AnimatePresence>
            {qrValue && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-indigo-50/50 rounded-[40px] border-2 border-indigo-100 p-10 flex flex-col items-center text-center space-y-6"
              >
                <div className="bg-white p-6 rounded-[32px] shadow-2xl shadow-indigo-200/50 relative group">
                  <QRCodeSVG 
                    id="qr-svg"
                    value={qrValue} 
                    size={180}
                    level="H"
                    includeMargin={true}
                    className="rounded-xl"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity rounded-[32px]">
                    <ShieldCheck className="w-12 h-12 text-indigo-600" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 justify-center">
                    {expiryDays === 'permanent' ? (
                      <div className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                        <Infinity className="w-3 h-3" />
                        Permanent Access
                      </div>
                    ) : (
                      <div className="px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        Expires in: {timeLeft}
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] font-bold text-slate-400 max-w-[280px]">
                    This QR code provides direct access to the digital storage board containing your selected media.
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full">
                  <button 
                    onClick={downloadQR}
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-700 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                  >
                    <Download className="w-4 h-4 text-indigo-600" />
                    Download QR
                  </button>
                  <button 
                    onClick={copyToClipboard}
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-700 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                  >
                    {isCopied ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-indigo-600" />
                    )}
                    {isCopied ? 'Copied' : 'Copy Link'}
                  </button>
                </div>

                <button 
                  onClick={() => setQrValue(null)}
                  className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-colors"
                >
                  Reset & Start Over
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hidden File Input */}
        <input 
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={currentAccept}
          className="hidden"
        />
      </motion.div>
    </div>
  );
};
