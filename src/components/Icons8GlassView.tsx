import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Copy, CheckCircle2, Sliders, X, Search, Code, Download, 
  Sparkles, FileCode, RefreshCw, Send, Upload
} from 'lucide-react';

export interface GlassIcon {
  id: string;
  name: string;
  category: string;
  svgContent: string;
}

interface Icons8GlassViewProps {
  isOpen: boolean;
  onClose: () => void;
  onSendToEditor?: (iconName: string, jsxCode: string) => void;
}

const CATEGORIES_25 = [
  { id: 'cat-1', name: 'True Glassmorphism', icon: '💎', gradient: 'from-blue-400 to-indigo-600' },
  { id: 'cat-2', name: 'Frosted Glass UI', icon: '🌫️', gradient: 'from-slate-400 to-slate-600' },
  { id: 'cat-3', name: 'Glossy 3D Models', icon: '🧊', gradient: 'from-cyan-400 to-blue-500' },
  { id: 'cat-4', name: 'Claymorphism', icon: '🏺', gradient: 'from-orange-400 to-rose-400' },
  { id: 'cat-5', name: 'Neumorphism (Soft UI)', icon: '⚪', gradient: 'from-gray-300 to-gray-500' },
  { id: 'cat-6', name: 'Neon Glow Outlines', icon: '🌟', gradient: 'from-fuchsia-500 to-purple-600' },
  { id: 'cat-7', name: 'Holographic 3D', icon: '🌌', gradient: 'from-indigo-400 to-pink-500' },
  { id: 'cat-8', name: 'Gradient Colors', icon: '🌈', gradient: 'from-red-400 to-yellow-500' },
  { id: 'cat-9', name: 'Pastel Soft Icons', icon: '🌸', gradient: 'from-pink-300 to-rose-400' },
  { id: 'cat-10', name: 'Duotone Designs', icon: '🌗', gradient: 'from-emerald-400 to-teal-600' },
  { id: 'cat-11', name: 'Apple iOS Style', icon: '🍏', gradient: 'from-gray-700 to-gray-900' },
  { id: 'cat-12', name: 'Google Material You', icon: '🎨', gradient: 'from-green-400 to-blue-500' },
  { id: 'cat-13', name: 'Microsoft Fluent 3D', icon: '🪟', gradient: 'from-blue-500 to-cyan-600' },
  { id: 'cat-14', name: '3D Emojis & Avatars', icon: '😎', gradient: 'from-yellow-400 to-amber-500' },
  { id: 'cat-15', name: 'Crypto & Web3', icon: '🪙', gradient: 'from-amber-500 to-orange-600' },
  { id: 'cat-16', name: 'Hand-Drawn Sketches', icon: '✏️', gradient: 'from-stone-500 to-stone-700' },
  { id: 'cat-17', name: 'Doodle Icons', icon: '🖍️', gradient: 'from-purple-400 to-indigo-500' },
  { id: 'cat-18', name: 'Pixel Art (Retro)', icon: '👾', gradient: 'from-green-500 to-emerald-700' },
  { id: 'cat-19', name: 'Comic Pop-Art', icon: '💥', gradient: 'from-red-500 to-rose-700' },
  { id: 'cat-20', name: 'Origami Paper Fold', icon: '🦢', gradient: 'from-sky-400 to-blue-500' },
  { id: 'cat-21', name: 'Ultra Minimal Line', icon: '➖', gradient: 'from-gray-800 to-black' },
  { id: 'cat-22', name: 'Solid Monochrome', icon: '⬛', gradient: 'from-zinc-600 to-zinc-800' },
  { id: 'cat-23', name: 'Isometric 3D', icon: '🕋', gradient: 'from-violet-500 to-purple-700' },
  { id: 'cat-24', name: 'Cyberpunk Sci-Fi', icon: '🤖', gradient: 'from-pink-500 to-rose-700' },
  { id: 'cat-25', name: 'Animated SVGs', icon: '🎬', gradient: 'from-teal-400 to-emerald-600' }
];

export function Icons8GlassView({ isOpen, onClose, onSendToEditor }: Icons8GlassViewProps) {
  // Mobile OS Navigation State
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Folder Search & Icons
  const [searchQuery, setSearchQuery] = useState('');
  const [icons, setIcons] = useState<GlassIcon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Bottom Sheet State
  const [selectedIcon, setSelectedIcon] = useState<GlassIcon | null>(null);

  // 🏛️ అడ్మిన్ గారు, అప్‌లోడ్ ఫీచర్ మరియు రిఫ్రెష్ ట్రిగ్గర్ కోసం కొత్త స్టేట్స్ జోడించాం
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadName, setUploadName] = useState('');
  const [uploadSvg, setUploadSvg] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Glass engine parameters
  const [blur, setBlur] = useState(16);
  const [transparency, setTransparency] = useState(20);
  const [borderRadius, setBorderRadius] = useState(24);
  const [outlineOpacity, setOutlineOpacity] = useState(25);

  const [copiedType, setCopiedType] = useState<string | null>(null);

  // 🏛️ అడ్మిన్ గారు, మెయిన్ స్క్రీన్‌పై కేటగిరీ ఐకాన్లు అవే రంగులతో చూపించడానికి సర్వర్ నుండి కేటగిరీలు లోడ్ చేస్తున్నాం
  const [categories, setCategories] = useState<any[]>(CATEGORIES_25);

  useEffect(() => {
    if (!isOpen) return;
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/market/categories');
        if (res.ok) {
          const data = await res.json();
          if (data.categories && data.categories.length > 0) {
            setCategories(data.categories);
          }
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, [isOpen]);

  // Fetch Icons dynamically when folder opens
  useEffect(() => {
    if (!isOpen || !activeCategory) return;

    const fetchIcons = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append('category', activeCategory);
        if (searchQuery) queryParams.append('search', searchQuery);

        const res = await fetch(`/api/market/glass-icons?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          // Fallback to fetch default icons if the new category is not yet in the DB so user can test the UI
          if (data.icons && data.icons.length > 0) {
            setIcons(data.icons);
          } else {
             const fallback = await fetch(`/api/market/glass-icons`);
             const fData = await fallback.json();
             setIcons(fData.icons || []);
          }
        }
      } catch (err) {
        console.error('Failed to fetch market glass icons:', err);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchIcons, 300);
    return () => clearTimeout(debounceTimer);
  }, [isOpen, activeCategory, searchQuery, refetchTrigger]);

  // Reset states when closing
  useEffect(() => {
    if (!isOpen) {
      setActiveCategory(null);
      setSelectedIcon(null);
      setSearchQuery('');
      setIsUploadOpen(false);
      setUploadName('');
      setUploadSvg('');
      setUploadError('');
    }
  }, [isOpen]);

  const triggerCopyToast = (type: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleCopySVG = (icon: GlassIcon) => {
    triggerCopyToast('SVG Code', icon.svgContent);
  };

  const getReactJSXCode = (icon: GlassIcon) => {
    const componentName = icon.name.replace(/[^a-zA-Z0-9]/g, '');
    return `import React from 'react';\n\n/**\n * ${activeCategory || 'Glass'} Icon: ${icon.name}\n */\nexport const ${componentName}Icon = () => (\n  <div style={{\n    backdropFilter: 'blur(${blur}px)',\n    WebkitBackdropFilter: 'blur(${blur}px)',\n    background: 'rgba(255, 255, 255, ${transparency / 100})',\n    borderRadius: '${borderRadius}px',\n    border: '1px solid rgba(255, 255, 255, ${outlineOpacity / 100})',\n    display: 'flex', alignItems: 'center', justifyContent: 'center',\n    width: '120px', height: '120px'\n  }}>\n    ${icon.svgContent.replace(/stroke-width/g, 'strokeWidth').replace(/stroke-linecap/g, 'strokeLinecap').replace(/stroke-linejoin/g, 'strokeLinejoin').replace(/fill-opacity/g, 'fillOpacity').replace(/stop-color/g, 'stopColor').replace(/gradientUnits/g, 'gradientUnits')}\n  </div>\n);`;
  };

  const handleCopyReactJSX = (icon: GlassIcon) => {
    const jsxCode = getReactJSXCode(icon);
    triggerCopyToast('React JSX', jsxCode);
  };

  const handleSendToEditorFunc = (icon: GlassIcon) => {
    if (onSendToEditor) {
      const jsxCode = getReactJSXCode(icon);
      onSendToEditor(icon.name, jsxCode);
    }
  };

  const handleCopyHTMLCSS = (icon: GlassIcon) => {
    const code = `<style>\n  .glass-icon-container {\n    width: 120px;\n    height: 120px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    backdrop-filter: blur(${blur}px);\n    -webkit-backdrop-filter: blur(${blur}px);\n    background: rgba(255, 255, 255, ${transparency / 100});\n    border-radius: ${borderRadius}px;\n    border: 1px solid rgba(255, 255, 255, ${outlineOpacity / 100});\n  }\n</style>\n\n<div class="glass-icon-container">\n  ${icon.svgContent}\n</div>`;
    triggerCopyToast('HTML + CSS', code);
  };

  const handleDownloadSVG = (icon: GlassIcon) => {
    const blob = new Blob([icon.svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${icon.id}-${activeCategory?.replace(/\s+/g, '-').toLowerCase() || 'icon'}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    triggerCopyToast('Downloaded SVG', 'SVG file saved!');
  };

  // 🏛️ అడ్మిన్ గారు, ఆయుధాన్ని (ఐకాన్) నేరుగా సర్వర్‌కి అప్‌లోడ్ చేయడానికి ఈ ఫంక్షన్ సహాయపడుతుంది.
  const handleUploadIcon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadName.trim() || !uploadSvg.trim() || !activeCategory) {
      setUploadError('దయచేసి అన్ని వివరాలు (ఐకాన్ పేరు & SVG కోడ్) నమోదు చేయండి.');
      return;
    }

    setIsUploading(true);
    setUploadError('');

    try {
      const res = await fetch('/api/market/upload-icon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: uploadName.trim(),
          category: activeCategory,
          svgContent: uploadSvg.trim(),
        }),
      });

      if (res.ok) {
        setRefetchTrigger(prev => prev + 1);
        setUploadName('');
        setUploadSvg('');
        setIsUploadOpen(false);
        triggerCopyToast('Asset Uploaded', 'ఐకాన్ సర్వర్‌లోకి విజయవంతంగా అప్‌లోడ్ చేయబడింది!');
      } else {
        const errData = await res.json();
        setUploadError(errData.error || 'అప్‌లోడ్ విఫలమైంది.');
      }
    } catch (err: any) {
      setUploadError('సర్వర్ నెట్‌వర్క్ ఎర్రర్: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[150] flex flex-col bg-[#070a12] text-slate-100 font-sans overflow-hidden"
        >
          {/* HEADER BAR */}
          <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 shrink-0 bg-[#090d16]/80 backdrop-blur-md z-50">
            {activeCategory ? (
              <button 
                onClick={() => {
                  setActiveCategory(null);
                  setSelectedIcon(null);
                  setSearchQuery('');
                }} 
                className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors font-bold text-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Home</span>
              </button>
            ) : (
              <button 
                onClick={onClose} 
                className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors font-bold text-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Studio</span>
              </button>
            )}

            <div className="text-white font-black text-sm tracking-tight truncate max-w-[60%] text-center">
              {activeCategory ? activeCategory : "Design Market"}
            </div>

            {!activeCategory ? (
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white bg-white/5 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={() => setIsUploadOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md active:scale-95 whitespace-nowrap shrink-0"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload</span>
              </button>
            )}
          </div>

          {/* MAIN SCROLLABLE CONTENT */}
          <div className="flex-1 w-full overflow-y-auto relative pb-20">
            
            <AnimatePresence mode="wait">
              {!activeCategory ? (
                /* ---------------------------------------------------- */
                /* STEP 1: MOBILE APP GRID (HOME SCREEN)                */
                /* ---------------------------------------------------- */
                <motion.div 
                  key="home-grid"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="p-5"
                >
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-y-6 gap-x-3 max-w-4xl mx-auto">
                    {categories.map((cat) => (
                      <div 
                        key={cat.id} 
                        onClick={() => setActiveCategory(cat.name)}
                        className="flex flex-col items-center gap-2 cursor-pointer group active:scale-95 transition-transform"
                      >
                        {/* APP ICON BOX */}
                        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-[24px] bg-gradient-to-br ${cat.gradient} p-[1px] shadow-lg shadow-black/50 group-hover:shadow-indigo-500/20`}>
                          <div className="w-full h-full bg-[#0a0f1c]/90 backdrop-blur-md rounded-[15px] sm:rounded-[23px] flex items-center justify-center shadow-inner group-hover:bg-[#0a0f1c]/70 transition-colors p-2.5">
                            {cat.svgContent ? (
                              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full drop-shadow-md" dangerouslySetInnerHTML={{ __html: cat.svgContent }} />
                            ) : (
                              <span className="text-2xl sm:text-3xl">{cat.icon}</span>
                            )}
                          </div>
                        </div>
                        {/* APP TITLE */}
                        <span className="text-[10px] sm:text-[11px] font-semibold text-center leading-tight px-1 text-white/90 line-clamp-2 w-full">
                          {cat.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                /* ---------------------------------------------------- */
                /* STEP 2: FOLDER VIEW (SPECIFIC CATEGORY)              */
                /* ---------------------------------------------------- */
                <motion.div 
                  key="folder-view"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.25 }}
                  className="p-4 md:p-6"
                >
                  <div className="relative mb-6 max-w-xl mx-auto">
                    <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-white/40" />
                    <input
                      type="text"
                      placeholder={`Search in ${activeCategory}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-indigo-500 transition-all font-medium placeholder:text-white/30 shadow-inner"
                    />
                  </div>

                  {/* 🏛️ అడ్మిన్ గారు, గ్రిడ్‌ను మొబైల్‌లో 4 కాలమ్స్‌తో మరింత ముద్దుగా 25% కుదించి, కేటగిరీ సఫిక్స్‌ను క్లీన్ చేశాం */}
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2 max-w-6xl mx-auto">
                    {isLoading && (
                      <div className="col-span-full py-20 flex items-center justify-center">
                        <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
                      </div>
                    )}
                    
                    {!isLoading && icons.length === 0 && (
                      <div className="col-span-full flex flex-col items-center justify-center py-20 text-white/40">
                        <Sparkles className="w-10 h-10 mb-2 opacity-30" />
                        <p className="text-sm font-bold">No designs found.</p>
                      </div>
                    )}

                    {!isLoading && icons.map((icon) => (
                      <div
                        key={icon.id}
                        onClick={() => setSelectedIcon(icon)}
                        className="group flex flex-col items-center p-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all cursor-pointer active:scale-95 shadow-md hover:shadow-indigo-500/10 w-full"
                        title={icon.name}
                      >
                        <div className="w-7 h-7 mb-1 flex items-center justify-center transition-transform group-hover:scale-110 [&>svg]:w-full [&>svg]:h-full drop-shadow-md" dangerouslySetInnerHTML={{ __html: icon.svgContent }} />
                        <span className="text-[9px] text-white/80 font-bold text-center truncate w-full" title={icon.name.replace(/\s*\([^)]*\)/g, '')}>
                          {icon.name.replace(/\s*\([^)]*\)/g, '')}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* ---------------------------------------------------- */}
          {/* STEP 3: BOTTOM SHEET (LIVE GLASS CANVAS & CONTROLS)  */}
          {/* ---------------------------------------------------- */}
          <AnimatePresence>
            {selectedIcon && (
              <>
                {/* BACKDROP */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedIcon(null)}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[160]"
                />
                
                {/* BOTTOM SHEET CONTENT */}
                <motion.div 
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="absolute bottom-0 left-0 w-full bg-[#0b0f19] border-t border-white/10 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-[170] flex flex-col max-h-[90vh]"
                >
                  {/* DRAG HANDLE */}
                  <div 
                    className="w-full flex justify-center py-4 cursor-pointer"
                    onClick={() => setSelectedIcon(null)}
                  >
                    <div className="w-12 h-1.5 bg-white/20 rounded-full" />
                  </div>

                  <div className="overflow-y-auto px-5 pb-8 scrollbar-none flex flex-col items-center w-full">
                    
                    <h3 className="text-white font-black text-sm mb-4 tracking-wide w-full text-center">
                      {selectedIcon.name}
                    </h3>

                    {/* LIVE GLASS PREVIEW CARD */}
                    <div
                      className="flex flex-col items-center justify-center w-full aspect-square max-w-[240px] p-6 mb-6 transition-all duration-300 shadow-2xl relative overflow-hidden shrink-0"
                      style={{
                        backdropFilter: `blur(${blur}px)`,
                        WebkitBackdropFilter: `blur(${blur}px)`,
                        background: `rgba(255, 255, 255, ${transparency / 100})`,
                        borderRadius: `${borderRadius}px`,
                        border: `1px solid rgba(255, 255, 255, ${outlineOpacity / 100})`
                      }}
                    >
                      <div className="absolute inset-0 pointer-events-none opacity-30">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/30 to-transparent" />
                      </div>
                      <div className="w-20 h-20 z-10 transition-transform duration-300 hover:scale-110 [&>svg]:w-full [&>svg]:h-full drop-shadow-xl" dangerouslySetInnerHTML={{ __html: selectedIcon.svgContent }} />
                    </div>

                    {/* ACTION BUTTONS GRID */}
                    <div className="grid grid-cols-2 gap-3 w-full max-w-md mb-2">
                      <button onClick={() => handleCopySVG(selectedIcon)} className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-3 px-3 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20">
                        <Copy className="w-4 h-4" /> Copy SVG
                      </button>
                      <button onClick={() => handleCopyReactJSX(selectedIcon)} className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold py-3 px-3 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20">
                        <FileCode className="w-4 h-4" /> Copy React JSX
                      </button>
                      <button onClick={() => handleCopyHTMLCSS(selectedIcon)} className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-3 px-3 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20">
                        <Code className="w-4 h-4" /> Copy CSS Style
                      </button>
                      <button onClick={() => handleDownloadSVG(selectedIcon)} className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-3 px-3 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20">
                        <Download className="w-4 h-4" /> Download SVG
                      </button>
                    </div>

                    {/* SEND TO EDITOR BUTTON */}
                    {onSendToEditor && (
                      <button onClick={() => handleSendToEditorFunc(selectedIcon)} className="w-full max-w-md mb-6 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-sm font-black py-3.5 px-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-pink-600/25">
                        <Send className="w-4 h-4" /> Send to Studio Code Editor
                      </button>
                    )}

                    {/* GLASS SLIDERS */}
                    <div className="w-full max-w-md space-y-4 bg-white/5 p-5 rounded-2xl border border-white/10 mb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Sliders className="w-4 h-4 text-indigo-400" />
                        <h4 className="text-[11px] text-white/70 font-bold uppercase tracking-wider">Engine Controls</h4>
                      </div>
                      {[
                        { label: 'Blur', val: blur, set: setBlur, min: 0, max: 40, unit: 'px' },
                        { label: 'Transparency', val: transparency, set: setTransparency, min: 0, max: 100, unit: '%' },
                        { label: 'Border Radius', val: borderRadius, set: setBorderRadius, min: 0, max: 50, unit: 'px' },
                        { label: 'Outline Opacity', val: outlineOpacity, set: setOutlineOpacity, min: 0, max: 100, unit: '%' }
                      ].map((s) => (
                        <div key={s.label} className="space-y-1.5">
                          <div className="flex justify-between text-[10px] font-bold text-white/50">
                            <span>{s.label}</span>
                            <span className="text-indigo-400">{s.val}{s.unit}</span>
                          </div>
                          <input 
                            type="range" 
                            min={s.min} 
                            max={s.max} 
                            value={s.val} 
                            onChange={(e) => s.set(Number(e.target.value))}
                            className="w-full accent-indigo-500 h-1.5 rounded-lg bg-white/10 appearance-none cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>

                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* 🏛️ అడ్మిన్ గారు, సర్వర్‌కి నేరుగా ఐకాన్‌ని అప్‌లోడ్ చేయడానికి అందమైన పాపప్ విండో */}
          <AnimatePresence>
            {isUploadOpen && (
              <>
                {/* MODAL BACKDROP */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsUploadOpen(false)}
                  className="fixed inset-0 bg-black/80 backdrop-blur-md z-[210]"
                />
                
                {/* MODAL CONTAINER */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="fixed inset-x-4 top-[10%] bottom-[10%] sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[480px] sm:h-auto bg-[#0b0f19] border border-white/10 rounded-3xl p-6 shadow-2xl z-[220] flex flex-col justify-between overflow-hidden"
                >
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10 shrink-0">
                    <div className="flex items-center gap-2">
                      <Upload className="w-5 h-5 text-indigo-400" />
                      <h3 className="text-white font-black text-sm tracking-wide">Upload Custom SVG Asset</h3>
                    </div>
                    <button
                      onClick={() => setIsUploadOpen(false)}
                      className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white bg-white/5 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleUploadIcon} className="flex-1 overflow-y-auto space-y-4 pr-1 pb-4">
                    <p className="text-[10px] text-white/60 font-medium leading-relaxed">
                      🏛️ అడ్మిన్ గారు, మీకు కావలసిన ఐకాన్ పేరు మరియు ముడి SVG కోడ్‌ను ఇక్కడ సమర్పించండి. ఇది నేరుగా <span className="text-indigo-400 font-bold">"{activeCategory}"</span> కేటగిరీ లోపలికి అప్‌లోడ్ చేయబడుతుంది.
                    </p>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-white/50">Icon / Asset Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Laser Gun, Golden Sword"
                        value={uploadName}
                        onChange={(e) => setUploadName(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-indigo-500 transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-white/50">SVG Content (XML Code)</label>
                      <textarea
                        required
                        rows={8}
                        placeholder="Paste raw <svg>...</svg> code here"
                        value={uploadSvg}
                        onChange={(e) => setUploadSvg(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-mono text-[10px] outline-none focus:border-indigo-500 transition-all placeholder:text-white/20 resize-none h-44"
                      />
                    </div>

                    {uploadError && (
                      <p className="text-[11px] text-rose-400 font-bold leading-relaxed">{uploadError}</p>
                    )}
                  </form>

                  <div className="pt-4 border-t border-white/10 flex gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsUploadOpen(false)}
                      className="flex-1 py-3 rounded-2xl border border-white/10 text-white/80 hover:text-white text-xs font-bold transition-all active:scale-95"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUploadIcon}
                      disabled={isUploading}
                      className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black transition-all active:scale-95 shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
                    >
                      {isUploading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Upload Asset</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* COPY TOAST NOTIFICATION */}
          <AnimatePresence>
            {copiedType && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9, x: '-50%' }}
                animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                exit={{ opacity: 0, y: 50, scale: 0.9, x: '-50%' }}
                className="fixed bottom-24 left-1/2 z-[200] bg-emerald-500 text-slate-950 px-5 py-3 rounded-xl font-black text-xs shadow-2xl flex items-center gap-2 border border-emerald-300 whitespace-nowrap"
              >
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
                <span>{copiedType} Copied!</span>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
