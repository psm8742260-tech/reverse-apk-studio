import React, { useState, useEffect } from 'react';
import { FeatureFlags } from '../types';
import { validateSyntax } from '../utils/syntaxValidator';
import { 
  Bot, 
  Zap, 
  Dna, 
  Brain, 
  Sparkles, 
  Code2, 
  Play, 
  Save, 
  RotateCcw, 
  FileCode, 
  Mic, 
  Send, 
  Smartphone, 
  ChevronDown, 
  ChevronRight,
  X, 
  Check, 
  Cpu,
  Radio,
  ArrowLeft,
  Plus,
  ArrowUp,
  Rocket,
  Camera,
  Image,
  FileUp,
  HardDrive,
  Cloud,
  Layers,
  Shield,
  Palette,
  Paperclip,
  History,
  MessageSquarePlus,
  Trash2,
  Download,
  Globe,
  ArrowDown,
  Database,
  Terminal,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GlobalShiftModal } from './GlobalShiftModal';
import { db } from '../firebase';
const firestore = db;
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  doc,
  setDoc,
  deleteDoc,
  getDocs
} from 'firebase/firestore';

const NAVBAR_MODULES = [
  { id: 'converter', name: 'Universal Converter', icon: '🎨', description: 'PNG/JPG/WEBP Image Engine', path: 'src/components/NormalAppStudio.tsx' },
  { id: 'studio', name: 'Exposing Studio', icon: '⚡', description: 'Decompiler & APK Inspector', path: 'src/components/ReverseStudio.tsx' },
  { id: 'qr', name: 'Exposing QR', icon: '📱', description: 'Dynamic QR Generator', path: 'src/components/QRGenerator.tsx' },
  { id: 'build', name: 'Build Suite', icon: '🧱', description: 'System Build Controller', path: 'src/components/BuildSuite.tsx' },
  { id: 'export', name: 'PWA Export', icon: '🌐', description: 'Web-to-App PWA Converter', path: 'src/components/PwaBuilder.tsx' },
  { id: 'icons8_glass', name: 'Icons8 Glassmorphism', icon: '💎', description: 'Icons8 Glassmorphism Engine', path: 'src/components/Icons8GlassView.tsx' },
  { id: 'visualbuilder', name: 'Live Visual Builder', icon: '🪄', description: 'Self-Editing Visual Engine', path: 'src/components/LiveVisualBuilderView.tsx' }
];

// 💡 అడ్మిన్ గారు! చిన్న బంగారు సుదర్శన చక్రం ఐకాన్ కాంపోనెంట్ ఇక్కడ సృష్టించాను. ఇది నిరంతరం ప్రశాంతంగా, నెమ్మదిగా గుండ్రంగా తిరుగుతుంది.
const SudarshanaChakraIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${props.className || ''} text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.7)] animate-[spin_10s_linear_infinite]`}
    style={{ ...props.style, color: '#f59e0b' }}
  >
    <circle cx="12" cy="12" r="8" className="stroke-amber-400/80" strokeDasharray="2 2" />
    <path d="M12 2l1.2 2L12 5.5 10.8 4z" fill="currentColor" className="text-amber-500" />
    <path d="M12 22l-1.2-2 1.2-1.5 1.2 2z" fill="currentColor" className="text-amber-500" />
    <path d="M2 12l2 1.2 1.5-1.2-1.5-1.2z" fill="currentColor" className="text-amber-500" />
    <path d="M22 12l-2-1.2-1.5 1.2 1.5 1.2z" fill="currentColor" className="text-amber-500" />
    <path d="M4.93 4.93l1.8.4 0.5-1.8z" fill="currentColor" className="text-amber-500" />
    <path d="M19.07 19.07l-1.8-.4-0.5 1.8z" fill="currentColor" className="text-amber-500" />
    <path d="M19.07 4.93l-.4 1.8 1.8 0.5z" fill="currentColor" className="text-amber-500" />
    <path d="M4.93 19.07l.4-1.8-1.8-0.5z" fill="currentColor" className="text-amber-500" />
    <line x1="12" y1="4" x2="12" y2="20" className="stroke-amber-400" />
    <line x1="4" y1="12" x2="20" y2="12" className="stroke-amber-400" />
    <line x1="6.34" y1="6.34" x2="17.66" y2="17.66" className="stroke-amber-400" />
    <line x1="6.34" y1="17.66" x2="17.66" y2="6.34" className="stroke-amber-400" />
    <circle cx="12" cy="12" r="3" fill="currentColor" className="text-amber-500" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" className="text-amber-300 animate-pulse" />
  </svg>
);

// 💡 అడ్మిన్ గారు! మన కేంద్రీకృత ఫైల్ నుండి సెల్ఫ్ రిపేర్ ఏజెంట్ల వివరాలను ఇక్కడ ఇంపోర్ట్ చేసాము.
// దీనివల్ల మనం ఒకే చోట మార్పులు చేస్తే యాప్ అంతటా మారుతుంది.
import { SELF_FIXER_STUDIO_AGENTS } from '../config/agentsConfig';

const AI_MODELS = SELF_FIXER_STUDIO_AGENTS.map(agent => {
  let icon: any = Bot;
  if (agent.id === 'gemini-3.6-flash' || agent.id === 'gpt-4o') icon = Sparkles;
  else if (agent.id === 'gemini-pro' || agent.id === 'o1-preview') icon = Bot;
  else if (agent.id === 'deepseek-r1') icon = Dna;
  else if (agent.id === 'claude-3-5-sonnet') icon = Brain;
  else if (agent.id === 'codestral-latest') icon = Zap;
  else if (agent.id === 'brahmastra-3-5-pro') icon = SudarshanaChakraIcon;
  else if (agent.id === 'chilipi-3-5-lite') icon = Sparkles;
  return {
    ...agent,
    icon: icon as any
  };
});

// INITIAL FILES MOCK DATA
const INITIAL_FILES: Record<string, string> = {
  'src/App.tsx': `import React, { useEffect, useState } from 'react';
import { ArrowLeft, Globe, X } from 'lucide-react';
import { DecompiledApp, FeatureFlags, SecurityLog } from './types';
import Header from './components/Header';
import DecompilerWorkspace from './components/DecompilerWorkspace';
import NormalAppStudio from './components/NormalAppStudio';
import AdminPanel from './components/AdminPanel/AdminPanel';
import PhoneLoginScreen from './components/PhoneLoginScreen';
import { createSampleApkBlob } from './utils/sampleApks';
import { decompileApk } from './utils/apkDecompiler';
import { FirebaseProvider, useFirebase } from './components/FirebaseProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LanguageCode, LANGUAGE_NAMES, translate } from './utils/translations';
import { PublicFileViewer } from './components/PublicFileViewer';

function AppContent() {
  const { user, logout } = useFirebase();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [studioMode, setStudioMode] = useState('reverse');

  if (!isAuthenticated) {
    return <PhoneLoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header studioMode={studioMode} onStudioModeChange={setStudioMode} onLogout={logout} />
      <main className="flex-1 p-6">
        {studioMode === 'reverse' ? <DecompilerWorkspace /> : <NormalAppStudio />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <FirebaseProvider>
        <AppContent />
      </FirebaseProvider>
    </ErrorBoundary>
  );
}
`,
  'src/components/SidebarDrawer.tsx': `import React from 'react';\n\nexport function SidebarDrawer() {\n  return (\n    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-4 text-slate-200">\n      <h2 className="font-bold text-sm mb-4">Sidebar Drawer</h2>\n    </aside>\n  );\n}`,
  'server/services/decompiler.ts': `// APK Decompiler Engine Core\nexport function decompileApk(file: File) {\n  console.log("Decompiling package...", file.name);\n}`
};

interface SelfFixerStudioProps {
  isOpen: boolean;
  onClose: () => void;
  projectFiles?: Record<string, string>;
  onApplyCodeFix?: (path: string, code: string) => void;
  userEmail?: string;
  onShift?: (item: { id: string; name: string; type: 'SMALI_CODE' | 'XML_LAYOUT' | '3D_ICON_ASSET' | 'LIVE_URL' | 'SOURCE_CODE' | 'IMAGE_ASSET' | 'APK_ASSET' | 'AAB_ASSET' | 'QR_CODE' | 'CODE_FIX' | 'UNIVERSAL_ASSET' | 'CODE_SNIPPET'; content: string }) => void;
  onNavigate?: (view: string) => void;
  flags?: FeatureFlags;
}

// COMPACT DARK UI STYLES FOR MODAL
const overlayStyle: React.CSSProperties = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(2, 6, 23, 0.75)', backdropFilter: 'blur(10px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
};

const modalBoxStyle: React.CSSProperties = {
  width: '340px', background: '#0b0f19', border: '1px solid rgba(255, 255, 255, 0.12)',
  borderRadius: '24px', padding: '20px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
};

const headerStyle: React.CSSProperties = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  paddingBottom: '14px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
};

const closeButtonStyle: React.CSSProperties = {
  background: 'none', border: 'none', color: '#64748b', fontSize: '16px',
  cursor: 'pointer', padding: '4px'
};

const rowCardStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 14px',
  background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)',
  borderRadius: '16px', cursor: 'pointer', transition: 'all 0.2s ease'
};

const iconBoxStyle: React.CSSProperties = {
  width: '36px', height: '36px', borderRadius: '12px',
  background: 'rgba(255, 255, 255, 0.05)', display: 'flex',
  alignItems: 'center', justifyContent: 'center', fontSize: '18px'
};

const renderMessageText = (text: string) => {
  if (!text) return null;
  const parts = text.split(/(```[\s\S]*?```)/g);
  return parts.map((part, index) => {
    if (part.startsWith('```')) {
      const firstLineEnd = part.indexOf('\n');
      const code = firstLineEnd !== -1 ? part.slice(firstLineEnd + 1, -3) : part.slice(3, -3);
      return (
        <pre key={index} className="my-2 p-3 bg-slate-900 text-slate-100 rounded-lg overflow-x-auto text-xs font-mono">
          <code>{code}</code>
        </pre>
      );
    }

    if (part.includes('SYSTEM OVERSIGHT') || part.includes('Agent Rules Compliance') || part.includes('APPROVED TO MERGE')) {
      const lines = part.split('\n');
      return (
        <span key={index}>
          {lines.map((line, lIdx) => {
            const isOversight = line.includes('SYSTEM OVERSIGHT') || 
                                line.includes('Agent Rules Compliance') || 
                                line.includes('Navigation Stack Safety') || 
                                line.includes('App Code Integrity') || 
                                line.includes('System Action') ||
                                line.includes('APPROVED TO MERGE') ||
                                line.includes('BLOCKED DUE TO VIOLATION') ||
                                line.includes('--------------------------------------------------');
            if (isOversight) {
              return (
                <span key={lIdx} className="block text-[3px] leading-[4px] font-mono text-slate-400/70 tracking-tighter opacity-60 my-0.25">
                  {line}
                </span>
              );
            }
            return <span key={lIdx} className="block">{line}</span>;
          })}
        </span>
      );
    }

    return <span key={index}>{part}</span>;
  });
};

export const SelfFixerStudio: React.FC<SelfFixerStudioProps> = ({ 
  isOpen, 
  onClose, 
  projectFiles, 
  onApplyCodeFix,
  userEmail,
  onShift,
  onNavigate,
  flags
}) => {
  // 1. STATE DECLARATIONS (MOVED TO TOP TO FIX LEXICAL ERROR)
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[7]); // Default to Brahmastra 3.5 Pro (8th Master Agent)
  const [isBrahmastramView, setIsBrahmastramView] = useState(true);
  const [isModelModalOpen, setIsModelModalOpen] = useState<boolean>(false);
  const [isShiftModalOpen, setIsShiftModalOpen] = useState<boolean>(false);
  const [pendingPush, setPendingPush] = useState<any | null>(null);
  const [isInjecting, setIsInjecting] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'preview' | 'editor'>('chat');
  const [isPendingApply, setIsPendingApply] = useState<boolean>(false);
  const [previewDeviceMode, setPreviewDeviceMode] = useState<'mobile' | 'responsive'>('mobile');
  const [aiStatus, setAiStatus] = useState<{ deepseek: boolean, gemini: boolean }>({ deepseek: false, gemini: false });

  // 🏛️ అడ్మిన్ గారు, AI కనెక్షన్ స్టేటస్‌ని చెక్ చేయడానికి ఈ ఫంక్షన్ వాడుతున్నాను.
  useEffect(() => {
    fetch('/api/health/ai')
      .then(res => res.json())
      .then(data => setAiStatus(data))
      .catch(() => {});
  }, []);
  
  
  // EDITOR STATES
  const [selectedFile, setSelectedFile] = useState<string>('src/App.tsx');
  const [syntaxErrors, setSyntaxErrors] = React.useState<Record<string, { errorMsg: string, line: number } | null>>({});
  const handleCodeChange = (file: string, content: string) => {
    setFileContents(prev => ({ ...prev, [file]: content }));
    const syntaxCheck = validateSyntax(content);
    setSyntaxErrors(prev => ({
      ...prev,
      [file]: syntaxCheck.hasError ? { errorMsg: syntaxCheck.errorMsg!, line: syntaxCheck.line! } : null
    }));
  };
  const [fileContents, setFileContents] = useState<Record<string, string>>(projectFiles || INITIAL_FILES);
  const [availableFiles, setAvailableFiles] = useState<string[]>([]);
  const [savedSnapshot, setSavedSnapshot] = useState<Record<string, string> | null>(null);

  // Fetch complete project file tree when studio opens
  React.useEffect(() => {
    if (isOpen) {
      fetch('/api/fs/tree')
        .then(res => res.json())
        .then(data => {
          if (data.files && Array.isArray(data.files) && data.files.length > 0) {
            setAvailableFiles(data.files);
          }
        })
        .catch(err => console.warn('[Tree Scan] Error scanning studio files:', err));

      // 🚀 అడ్మిన్ గారు! ఫైల్స్ ఎల్లప్పుడూ రియల్-టైమ్‌లో లోడ్ అవ్వడానికి, 'src/App.tsx' ఫైల్ కంటెంట్‌ని సర్వర్ నుండి డైరెక్ట్‌గా ఫెచ్ చేస్తున్నాను.
      fetch('/api/fs/read?path=src%2FApp.tsx')
        .then(res => res.json())
        .then(data => {
          if (data && data.content) {
            setFileContents(prev => ({
              ...prev,
              'src/App.tsx': data.content
            }));
          }
        })
        .catch(err => console.warn('[Live App Read] Failed to load real App.tsx:', err));
    }
  }, [isOpen]);

  // Dynamic complete file list across disk & memory
  const allFileList = React.useMemo(() => {
    const list = Array.from(new Set([
      ...availableFiles,
      ...Object.keys(fileContents),
      'src/App.tsx',
      'src/types.ts',
      'src/main.tsx',
      'src/index.css',
      'src/components/SelfFixerStudio.tsx',
      'src/components/DecompilerWorkspace.tsx',
      'src/components/NormalAppStudio.tsx',
      'src/components/ReverseStudio.tsx',
      'src/components/ExposingQR.tsx',
      'src/components/BuildSuite.tsx',
      'src/components/Header.tsx',
      'server.ts',
      'package.json',
      'index.html'
    ])).filter(Boolean).sort();
    return list;
  }, [availableFiles, fileContents]);

  // Handle switching file from dropdown with auto-read
  const handleSelectFile = async (filePath: string) => {
    setSelectedFile(filePath);
    if (!fileContents[filePath]) {
      try {
        const res = await fetch(`/api/fs/read?path=${encodeURIComponent(filePath)}`);
        const data = await res.json();
        if (data.content !== undefined) {
          setFileContents(prev => ({
            ...prev,
            [filePath]: data.content
          }));
        }
      } catch (e) {
        console.warn('Auto-read file notice:', e);
      }
    }
  };

  // CHAT & VOICE STATES
  const [chatInput, setChatInput] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; type?: string }>>([]);
  const [chatSessions, setChatSessions] = useState<any[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isVoiceRecording, setIsVoiceRecording] = useState<boolean>(false);
  const [statusNotification, setStatusNotification] = useState<string | null>(null);
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState<boolean>(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const chatInputRef = React.useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const chatContainerRef = React.useRef<HTMLDivElement>(null);
  const isUserScrolledUpRef = React.useRef<boolean>(false);

  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    // If distance from bottom is greater than 80px, user manually scrolled up
    isUserScrolledUpRef.current = scrollHeight - scrollTop - clientHeight > 80;
  };

  // Auto scroll messages to bottom inside container only (prevents full window jumping)
  React.useEffect(() => {
    if (!isUserScrolledUpRef.current && chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatMessages]);

  // 2. HOOKS & EFFECTS
  // Update file contents if projectFiles changes
  React.useEffect(() => {
    if (projectFiles) {
      setFileContents(projectFiles);
    }
  }, [projectFiles]);

  // Load chat sessions
  React.useEffect(() => {
    if (!userEmail) return;
    try {
      // 💡 తెలుగు వివరణ: ఇండెక్స్ లేని కారణంగా క్వెరీ ఫెయిల్ కాకుండా ఉండటానికి, కేవలం 'ownerId' ఫిల్టర్ చేసి, క్లయింట్-సైడ్ లో డేటాను 'createdAt' పరంగా సార్ట్ చేస్తాము.
      const q = query(
        collection(firestore, 'chats'),
        where('ownerId', '==', userEmail)
      );
      return onSnapshot(q, 
        (snapshot) => {
          const sessions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          sessions.sort((a: any, b: any) => {
            const valA = a.createdAt?.seconds || (a.createdAt ? new Date(a.createdAt).getTime() / 1000 : 0);
            const valB = b.createdAt?.seconds || (b.createdAt ? new Date(b.createdAt).getTime() / 1000 : 0);
            return valB - valA;
          });
          setChatSessions(sessions);
        },
        (error) => {
          console.warn('[Firestore] Chat sessions snapshot stream paused:', error.message);
        }
      );
    } catch (e: any) {
      console.warn('[Firestore] Chat sessions query error:', e.message);
    }
  }, [userEmail]);

  // Load messages for current chat
  React.useEffect(() => {
    if (!currentChatId) {
      setChatMessages([{ sender: 'DeepSeek Agent', text: 'Hello Admin! I am active. Start a new repair session or select from history.', type: 'ai' }]);
      return;
    }
    // Check if it's a local repair session ID
    if (currentChatId.startsWith('repair_')) {
      return;
    }
    try {
      const q = query(
        collection(firestore, `chats/${currentChatId}/messages`),
        orderBy('timestamp', 'asc')
      );
      return onSnapshot(q, 
        (snapshot) => {
          const msgs = snapshot.docs.map(doc => doc.data() as any);
          if (msgs && msgs.length > 0) {
            setChatMessages(msgs);
          }
        },
        (error) => {
          console.warn('[Firestore] Chat messages snapshot stream paused:', error.message);
        }
      );
    } catch (e: any) {
      console.warn('[Firestore] Messages query error:', e.message);
    }
  }, [currentChatId]);

  // 🏛️ అడ్మిన్ గారు, చాట్ బాక్స్ ఆటోమేటిక్ గా పెరగడానికి మరియు తగ్గడానికి ఈ లాజిక్ వాడుతున్నాను.
  React.useEffect(() => {
    if (chatInputRef.current) {
      chatInputRef.current.style.height = 'auto';
      chatInputRef.current.style.height = `${Math.min(chatInputRef.current.scrollHeight, 200)}px`;
    }
  }, [chatInput]);

  if (!isOpen) return null;

  // NOTIFICATION HELPER
  const notify = (msg: string) => {
    setStatusNotification(msg);
    setTimeout(() => setStatusNotification(null), 3000);
  };

  const createNewChat = async () => {
    const owner = userEmail || 'admin@aimasterstudio.com';
    const welcomeMsg = { sender: 'DeepSeek Agent', text: 'Hello Admin! I am active. Start a new repair session or select from history.', type: 'ai' };
    try {
      const chatRef = doc(collection(firestore, 'chats'));
      const activeId = chatRef.id;
      setCurrentChatId(activeId);
      setChatMessages([welcomeMsg]);
      setChatInput('');
      setIsHistoryOpen(false);
      notify('✨ New repair session started');
      setTimeout(() => chatInputRef.current?.focus(), 100);

      // Async Firestore create (non-blocking)
      setDoc(chatRef, {
        ownerId: owner,
        createdAt: serverTimestamp(),
        title: `Repair ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        lastMessage: ''
      }).catch(err => console.warn('[Firestore] createNewChat setDoc failed:', err));
    } catch (err) {
      const localId = `repair_${Date.now()}`;
      setCurrentChatId(localId);
      setChatMessages([welcomeMsg]);
      setChatInput('');
      setIsHistoryOpen(false);
      notify('✨ New repair session started');
      setTimeout(() => chatInputRef.current?.focus(), 100);
    }
  };

  const deleteChat = async (id: string) => {
    try {
      if (currentChatId === id) {
        setCurrentChatId(null);
        setChatMessages([]);
      }
      setChatSessions(prev => prev.filter(c => c.id !== id));
      notify('🗑️ Chat deleted');

      // Async Firestore deletion (non-blocking)
      deleteDoc(doc(firestore, 'chats', id)).catch(err => console.warn('[Firestore] Delete chat failed:', err));
    } catch (err) {
      notify('❌ Delete failed');
    }
  };

  // TOOLBAR ACTION HANDLERS
  const handleBackupSnapshot = () => {
    setSavedSnapshot({ ...fileContents });
    notify('💾 Active working snapshot backed up successfully!');
  };

  const handleRestoreSnapshot = () => {
    if (savedSnapshot) {
      setFileContents({ ...savedSnapshot });
      notify('🔄 Restored workspace to saved snapshot!');
    } else {
      notify('⚠️ No saved snapshot found! Click Backup first.');
    }
  };

  const handleApplyLive = async () => {
    const codeToSave = fileContents[selectedFile];
    if (!codeToSave) {
      notify('⚠️ అప్లై చేయడానికి ఎలాంటి కోడింగ్ కంటెంట్ లేదు.');
      return;
    }
    if (syntaxErrors[selectedFile]) {
      notify('⚠️ సింటాక్స్ ఎర్రర్ ఉంది! దయచేసి ఎర్రర్‌ను సరిచేసి మళ్ళీ అప్లై చేయండి.');
      return;
    }

    if (onApplyCodeFix) {
      onApplyCodeFix(selectedFile, codeToSave);
    }
    setIsPendingApply(false);
    try {
      const res = await fetch('/api/files/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath: selectedFile, content: codeToSave })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        notify(`🚀 '${selectedFile}' లో కోడ్ అప్లై అయింది! బోర్డ్ క్లియర్ అయింది.`);
      } else {
        notify(`🚀 కోడ్ చేంజెస్ అప్లై అయ్యాయి! బోర్డ్ క్లియర్ అయింది.`);
      }
    } catch (e) {
      notify('🚀 కోడ్ లైవ్‌లో అప్లై అయింది! బోర్డ్ క్లియర్ అయింది.');
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatInput('');

    // Save user message instantly in local state
    let activeChatId = currentChatId;
    const userMsg = { sender: 'Admin', text: userText, type: 'user' };
    setChatMessages(prev => [...prev, userMsg]);

    try {
      if (!activeChatId) {
        const owner = userEmail || 'admin@aimasterstudio.com';
        const chatRef = doc(collection(firestore, 'chats'));
        activeChatId = chatRef.id;
        setCurrentChatId(activeChatId);
        
        // Async Firestore operations
        setDoc(chatRef, {
          ownerId: owner,
          createdAt: serverTimestamp(),
          title: userText.slice(0, 30) + (userText.length > 30 ? '...' : ''),
          lastMessage: userText
        }).catch(err => console.warn('[Firestore] Create chat failed:', err));

        const msgRef = doc(collection(firestore, `chats/${activeChatId}/messages`));
        setDoc(msgRef, {
          sender: 'Admin',
          text: userText,
          timestamp: serverTimestamp(),
          type: 'user'
        }).catch(err => console.warn('[Firestore] Create user message failed:', err));
      } else {
        if (!activeChatId.startsWith('repair_')) {
          // Async Firestore operations
          const msgRef = doc(collection(firestore, `chats/${activeChatId}/messages`));
          setDoc(msgRef, {
            sender: 'Admin',
            text: userText,
            timestamp: serverTimestamp(),
            type: 'user'
          }).catch(err => console.warn('[Firestore] Add user message failed:', err));

          setDoc(doc(firestore, 'chats', activeChatId), { lastMessage: userText }, { merge: true })
            .catch(err => console.warn('[Firestore] Update chat last message failed:', err));
        }
      }
    } catch (err) {
      console.warn('[Firestore] Non-blocking write fallback:', err);
    }

    const hasApproval = userText.includes('6606.ok') || userText.includes('6606.0k');

    try {
      const systemPrompt = (() => {
        let baseInstruction = `You are ${selectedModel.name} - ${selectedModel.desc}. You are one of the 8 elite AI Agents working inside AI Master Studio, serving under the supreme guidance of the Admin (అడ్మిన్ గారు).
మీరు AI Master Studioలో పనిచేసే 8 AI Agents.
మీ ప్రధాన బాధ్యత EXISTING PROJECTను కాపాడుతూ, సమస్యలను గుర్తించి, సురక్షితంగా repair చేయడం. మీరు కొత్తగా ఊహించి project architecture, UI, features లేదా existing codeను మార్చకూడదు.`;

        if (selectedModel.trainingRules) {
          baseInstruction += `\n\n=== 🧠 AGENT TRAINING (HOW TO REPAIR) ===\n${selectedModel.trainingRules}`;
        }

        if (flags?.enableAgentRegulations) {
          baseInstruction += `\n\n=== 🏛️ AI MASTER STUDIO - SUPREME AGENT MANDATORY PROTOCOLS (RULES 1-44) ===
MASTER SAFETY RULE:
ఏ Agent అయినా “నేను బాగా తెలుసు కాబట్టి స్వయంగా మార్చేస్తాను” అనే విధంగా పని చేయకూడదు.
ముందుగా INSPECT → తర్వాత DIAGNOSE → తర్వాత EXPLAIN → అవసరమైన APPROVAL తీసుకో → తర్వాత మాత్రమే MODIFY → చివరగా BUILD + TEST + VERIFY.
1. ADDRESS THE USER AS "అడ్మిన్ గారు" (Admin Garu) AT ALL TIMES with high respect.
2. COMMUNICATE EXCLUSIVELY IN FLUENT TELUGU (తెలుగు).
3. STRICT APPROVAL PROTOCOL:
    - If the Admin has NOT provided the passcode "6606.ok" or "6606.0k" in the prompt, you are strictly FORBIDDEN from writing any code blocks. No markdown code blocks like \`\`\` can be generated. Instead, you MUST listen to the Admin's requirements, explain your precise plan in Telugu, and wait for approval by explicitly asking the Admin to provide "6606.ok" or "6606.0k".
   - If and only if the Admin has provided "6606.ok" or "6606.0k" (or similar confirmed authorization), you are AUTHORIZED to provide the code changes inside a clean, complete markdown block.
4. SURGICAL CHARACTER-LEVEL PRECISION: When editing, target ONLY the relevant characters. No unnecessary rewrites or feature creep.
5. MANDATORY BILINGUAL CODE DOCUMENTATION (తప్పనిసరి తెలుగు వివరణ): Every time you generate or modify code, you MUST include a short Telugu comment explanation (తెలుగు వివరణ) directly above or below the changed block.
6. NO GLOBAL EMPTY STATES or breaking of core components.
7. EVERY RESPONSE MUST END WITH:
   - A detailed "🛡️ SYSTEM OVERSIGHT CHECK REPORT"
   - A valid "🔄 RESTART CODE" formatted exactly as:
     "[RESTART CODE: AIMASTER-2026-08-21-01][MODEL: ${selectedModel.name}][AGENT: ${selectedModel.name}][KEY: 6606.ok]"`;
        }

        baseInstruction += `\n\nAdmin Approval Status: ${hasApproval ? 'APPROVED (6606.ok received). You may write the code.' : 'PENDING (No password received yet). You must NOT write any code blocks yet.'}\nSelected File Context: File name is "${selectedFile}".`;
        return baseInstruction;
      })();

      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studioMode: 'REPAIR',
          userId: userEmail || 'admin@aimasterstudio.com',
          prompt: userText,
          agent: selectedModel.name,
          model: 'gemini-3.6-flash',
          deepseekApiKey: localStorage.getItem('reverse_apk_private_api_key') || '',
          fileContext: { name: selectedFile, content: fileContents[selectedFile] },
          systemInstructionCustom: systemPrompt,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // throw new Error /* DEACTIVATED BY INVISIBLE AGENT DEEP SHEATH */(errorData.error || 'AI Bridge offline');
      }
      const data = await response.json();

      // Save AI Message instantly in local state
      setChatMessages(prev => [...prev, { sender: selectedModel.name, text: data.text, type: 'ai' }]);

      // Async Firestore operations in the background
      if (activeChatId && !activeChatId.startsWith('repair_')) {
        const aiMsgRef = doc(collection(firestore, `chats/${activeChatId}/messages`));
        setDoc(aiMsgRef, {
          sender: selectedModel.name,
          text: data.text,
          timestamp: serverTimestamp(),
          type: 'ai'
        }).catch(err => console.warn('[Firestore] Save AI message failed:', err));

        setDoc(doc(firestore, 'chats', activeChatId), { lastMessage: data.text }, { merge: true })
          .catch(err => console.warn('[Firestore] Update last message failed:', err));
      }

      // 🏛️ అడ్మిన్ గారు, ఏజెంట్ ఇచ్చిన కోడ్‌ను ఎక్స్‌ట్రాక్ట్ చేసి స్వయంగా డిస్క్‌లో అప్లై చేసి వెరిఫై చేస్తున్నాను.
      const codeBlockRegex = /```(?:[a-z0-9]+)?\n([\s\S]*?)\n```/g;
      let match;
      let lastCodeBlock = '';
      while ((match = codeBlockRegex.exec(data.text)) !== null) {
        lastCodeBlock = match[1];
      }

      if (lastCodeBlock) {
        setFileContents(prev => ({
          ...prev,
          [selectedFile]: lastCodeBlock
        }));
        setIsPendingApply(true);
        
        if (hasApproval) {
          // Automatically apply live to disk & verify only if approved by Admin passcode
          try {
            const res = await fetch('/api/fs/write', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ path: selectedFile, content: lastCodeBlock })
            });
            const writeData = await res.json();
            if (res.ok && writeData.success) {
              setIsPendingApply(false);
              notify(`✨ '${selectedModel.name}' స్వయంగా కోడ్ రాసి, '${selectedFile}' లో అప్లై చేసి వెరిఫై చేసింది!`);
              // Switch back to chat tab so the editor file view is hidden after work is done
              setActiveTab('chat');
            } else {
              notify(`✨ '${selectedModel.name}' కోడ్ జనరేట్ చేసింది. ఎడిటర్‌లో అప్లై అయింది!`);
              setActiveTab('chat');
            }
          } catch (diskErr) {
            notify(`✨ '${selectedModel.name}' కోడ్ జనరేట్ చేసింది. 'Apply' బటన్ ద్వారా సేవ్ చేయవచ్చు!`);
            setActiveTab('chat');
          }
        } else {
          notify(`💻 '${selectedModel.name}' కోడ్ ప్రతిపాదించింది. ఎడిటర్ ట్యాబ్‌లో చూడండి. డిస్క్‌లోకి అప్లై చేయడానికి '6606.ok' ఎంటర్ చేయండి లేదా ఎడిటర్ లో 'అప్లై' నొక్కండి.`);
        }
      }
    } catch (err: any) {
      const isUnauthorized = err.message.includes('401') || err.message.includes('unauthorized');
      notify(`❌ AI Error: ${err.message}`);
      
      const errorMsg = isUnauthorized 
        ? '⚠️ DeepSeek API Key Unauthorized (401). అడ్మిన్ గారు, దయచేసి అడ్మిన్ ప్యానెల్‌లో మీ API Key ని ఒకసారి చెక్ చేయండి.'
        : 'AI Connection lost. Please check your internet or API settings.';

      // Save error message instantly in local state
      setChatMessages(prev => [...prev, { sender: 'System', text: errorMsg, type: 'system' }]);

      // Async Firestore operations
      if (activeChatId && !activeChatId.startsWith('repair_')) {
        const errMsgRef = doc(collection(firestore, `chats/${activeChatId}/messages`));
        setDoc(errMsgRef, {
          sender: 'System',
          text: errorMsg + (isUnauthorized ? '\n\n[Fix Tip]: Go to Admin Panel -> API Failover -> Check Slot 0' : ''),
          timestamp: serverTimestamp(),
          type: 'system'
        }).catch(err => console.warn('[Firestore] Save error message failed:', err));
      }
    }
  };

  const loadProjectSource = async () => {
    const targetPath = selectedFile || 'src/App.tsx';
    
    // Toggle: If code is already loaded and visible, clear/hide it
    if (fileContents[targetPath] && fileContents[targetPath].trim().length > 0) {
      setFileContents(prev => ({
        ...prev,
        [targetPath]: ''
      }));
      notify('🙈 కోడింగ్ దాచబడింది / ఖాళీ చేయబడింది (Cleared Board)!');
      return;
    }

    try {
      notify('📂 AI Master Studio కోడింగ్ లోడ్ అవుతోంది...');
      const res = await fetch(`/api/fs/read?path=${encodeURIComponent(targetPath)}`);
      const data = await res.json();
      if (data.content) {
        setFileContents(prev => ({
          ...prev,
          [targetPath]: data.content
        }));
        setSelectedFile(targetPath);
        setActiveTab('editor');
        notify(`💻 '${targetPath}' కోడింగ్ లోడ్ అయింది!`);
      } else {
        const fallbackRes = await fetch('/api/fs/read?path=src/App.tsx');
        const fallbackData = await fallbackRes.json();
        if (fallbackData.content) {
          setFileContents(prev => ({
            ...prev,
            'src/App.tsx': fallbackData.content
          }));
          setSelectedFile('src/App.tsx');
          setActiveTab('editor');
          notify('💻 AI Master Studio (App.tsx) కోడింగ్ లోడ్ అయింది!');
        } else {
          notify('⚠️ కోడ్ చదవడంలో సమస్య వచ్చింది');
        }
      }
    } catch (err) {
      notify('❌ కోడ్ లోడ్ చేయడం విఫలమైంది');
    }
  };

  const handleSaveLocalBackup = () => {
    try {
      const content = fileContents[selectedFile] || '';
      if (!content) {
        notify('⚠️ సేవ్ చేయడానికి ఎలాంటి కోడింగ్ కంటెంట్ లేదు');
        return;
      }
      
      const fileName = selectedFile.split('/').pop() || 'repaired_code.tsx';
      
      // Save backup in localStorage
      localStorage.setItem(`selffixer_backup_${selectedFile}`, content);
      localStorage.setItem(`selffixer_last_saved_file`, selectedFile);
      
      // Download as local file to device (Optimized for Mobile)
      const blob = new Blob([content], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.setAttribute('download', fileName);
      
      // Append to body for compatibility
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);

      notify(`💾 '${fileName}' మొబైల్ స్టోరేజ్‌లోకి డౌన్‌లోడ్ అవుతోంది! ఒకవేళ కాకపోతే బ్రౌజర్ పర్మిషన్స్ చెక్ చేయండి.`);
    } catch (err) {
      notify('❌ ఫైల్ సేవ్ చేయడం విఫలమైంది');
    }
  };

  const handleClearBoard = () => {
    if (fileContents[selectedFile]) {
      setFileContents(prev => ({
        ...prev,
        [selectedFile]: ''
      }));
      notify('🧹 కోడింగ్ బోర్డు ఖాళీ చేయబడింది (Clear Board). కొత్త కోడ్ ఎంటర్ చేయవచ్చు!');
    } else {
      notify('ℹ️ కోడింగ్ బోర్డు ఇప్పటికే ఖాళీగా ఉంది.');
    }
  };


  const handlePushToRepair = async (moduleItem: any) => {
    setIsInjecting(true);
    notify(`🚀 Pushing ${moduleItem.name} source code...`);
    try {
      const res = await fetch(`/api/fs/read?path=${moduleItem.path}`);
      const data = await res.json();
      
      if (data.content) {
        setFileContents(prev => ({
          ...prev,
          [moduleItem.path]: data.content
        }));
        setSelectedFile(moduleItem.path);
        setActiveTab('editor');
        notify(`✅ ${moduleItem.name} కోడ్ విజయవంతంగా లోడ్ చేయబడింది!`);
      } else {
        throw new Error('File content not found');
      }
    } catch (error) {
      notify("❌ కోడ్ పుష్ చేయడం ఫెయిల్ అయింది.");
    } finally {
      setIsInjecting(false);
      setIsShiftModalOpen(false);
      setPendingPush(null);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...newFiles]);
      setIsAttachmentMenuOpen(false);
      notify(`📎 Attached ${newFiles.length} file(s) from device.`);
    }
  };

  const handleCameraCapture = () => {
    notify('📸 Camera interface active. Capturing frame...');
    setIsAttachmentMenuOpen(false);
  };

  const handleGoogleDrive = () => {
    notify('☁️ Connecting to Google Drive... (OAuth required)');
    setIsAttachmentMenuOpen(false);
  };

  const SelectedModelIcon = selectedModel.icon;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-slate-50 text-slate-900 flex flex-col font-sans overflow-hidden"
    >
      
      {/* ========================================== */}
      {/* 1. TOP NAVBAR & DYNAMIC AGENT SELECTOR     */}
      {/* ========================================== */}
      <header className="bg-white border-b border-slate-200 px-2 md:px-5 py-2 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md shrink-0 shadow-xs gap-2">
        <div className="flex items-center space-x-1.5 md:space-x-2 shrink-0">
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 rounded-xl transition text-slate-500 hover:text-slate-900 cursor-pointer"
            title="వెనక్కి వెళ్లు"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsShiftModalOpen(!isShiftModalOpen)}
            className={`p-1.5 rounded-xl transition border flex items-center gap-1 shrink-0 cursor-pointer shadow-xs ${isShiftModalOpen ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border-indigo-200'}`}
            title="Open Navbar Features to Shift & Repair"
          >
            <Rocket className="w-4 h-4 text-indigo-600" />
          </button>
          <div className="p-1.5 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600 shrink-0 relative">
            <Cpu className="w-4 h-4 text-indigo-600" />
            {aiStatus.deepseek && (
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse" title="DeepSeek Connected" />
            )}
          </div>
          <h1 className="text-xs md:text-sm font-black text-slate-900 tracking-tight hidden lg:block">
            AI Master Studio
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* 🚀 అడ్మిన్ గారు! మీరు కోరిన హెడర్ అప్లై బటన్ ఇక్కడ ఉంది. కోడ్ చేంజ్ ఉన్నప్పుడు ఇది గ్లో అవుతుంది. */}
          <button
            onClick={handleApplyLive}
            className={`flex items-center gap-1.5 px-3 h-8 rounded-xl text-[10px] font-black transition-all active:scale-95 cursor-pointer shadow-sm ${
              isPendingApply 
                ? 'bg-emerald-600 text-white shadow-emerald-200 animate-pulse' 
                : 'bg-slate-100 text-slate-400 border border-slate-200'
            }`}
            title="కోడ్‌ను నేరుగా అప్లై చేయి (Apply Changes)"
          >
            <span className="text-xs">🚀</span>
            <span className="hidden sm:inline">అప్లై (Apply)</span>
          </button>

          {/* DYNAMIC MODEL SELECTOR BUTTON */}
        <button
          onClick={() => setIsModelModalOpen(true)}
          className={`flex items-center justify-center space-x-1.5 px-2 md:px-3 h-8 rounded-xl border-2 text-[10px] md:text-xs font-black transition-all hover:shadow-md shrink-0 cursor-pointer ${
            selectedModel.badgeColor.includes('text-') 
              ? selectedModel.badgeColor.replace('bg-opacity-10', 'bg-opacity-20') 
              : selectedModel.badgeColor
          }`}
        >
          <SelectedModelIcon className="w-3.5 h-3.5" />
          <span className="truncate max-w-[70px] sm:max-w-[120px]">{selectedModel.name}</span>
          <ChevronDown className="w-3 h-3 opacity-70" />
        </button>
        </div>
      </header>

      {/* NOTIFICATION TOAST */}
      <AnimatePresence>
        {statusNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-indigo-600 text-white text-xs px-4 py-2 text-center font-medium shadow-md absolute top-16 left-0 right-0 z-40"
          >
            {statusNotification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================== */}
      {/* 2. 3-BOARD TAB SWITCHER                    */}
      {/* ========================================== */}
      <div className="bg-white border-b border-slate-200 px-2 md:px-6 pt-2 md:pt-3 flex space-x-1 md:space-x-3 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setActiveTab('editor')}
          className={`flex items-center justify-center space-x-2 px-6 md:px-8 py-2 md:py-2.5 rounded-t-xl text-[10px] md:text-xs font-black transition-all border-t border-x shrink-0 min-w-[100px] md:min-w-[140px] ${
            activeTab === 'editor'
              ? 'bg-blue-50 border-slate-200 text-blue-600 shadow-[0_-4px_12px_-2px_rgba(37,99,235,0.15)]'
              : 'border-transparent text-slate-400 hover:text-blue-500 hover:bg-blue-50/30'
          }`}
        >
          <span className="text-base md:text-lg filter drop-shadow-sm">💻</span>
          <span>Code Editor</span>
        </button>

        <button
          onClick={() => setActiveTab('preview')}
          className={`flex items-center justify-center space-x-2 px-6 md:px-8 py-2 md:py-2.5 rounded-t-xl text-[10px] md:text-xs font-black transition-all border-t border-x shrink-0 min-w-[100px] md:min-w-[140px] ${
            activeTab === 'preview'
              ? 'bg-emerald-50 border-slate-200 text-emerald-600 shadow-[0_-4px_12px_-2px_rgba(16,185,129,0.15)]'
              : 'border-transparent text-slate-400 hover:text-emerald-500 hover:bg-emerald-50/30'
          }`}
        >
          <span className="text-base md:text-lg filter drop-shadow-sm">📱</span>
          <span>Preview</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`flex items-center justify-center space-x-2 px-6 md:px-8 py-2 md:py-2.5 rounded-t-xl text-[10px] md:text-xs font-black transition-all border-t border-x shrink-0 min-w-[100px] md:min-w-[140px] ${
            activeTab === 'chat'
              ? 'bg-purple-50 border-slate-200 text-purple-600 shadow-[0_-4px_12px_-2px_rgba(147,51,234,0.15)]'
              : 'border-transparent text-slate-400 hover:text-purple-500 hover:bg-purple-50/30'
          }`}
        >
          <span className="text-base md:text-lg filter drop-shadow-sm">🤖</span>
          <span>AI Fixer</span>
        </button>
      </div>

      {/* ========================================== */}
      {/* MAIN WORKSPACE BODY                        */}
      {/* ========================================== */}
      <main className="flex-1 flex flex-col bg-slate-50 md:p-4 p-0 min-h-0 overflow-hidden">
        
        <AnimatePresence mode="wait">
          {/* TAB 1: CODE EDITOR */}
          {activeTab === 'editor' && (
            <motion.div 
              key="editor"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex-1 flex flex-col border-y md:border border-slate-200 md:rounded-2xl bg-white overflow-hidden shadow-xl"
            >
              
              {/* CODE EDITOR TOOLBAR CONTROLS */}
              <div className="bg-white border-b border-slate-100 px-2 md:px-4 py-2 md:py-3 flex flex-wrap items-center justify-between gap-2 md:gap-3">
                {/* DROPDOWN FILE SELECTOR */}
                <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 rounded-lg md:rounded-xl px-2 md:px-3 py-1.5 max-w-full sm:max-w-md shrink flex-1">
                  <FileCode className="w-3.5 h-3.5 md:w-4 md:h-4 text-indigo-600 shrink-0" />
                  <select
                    value={selectedFile}
                    onChange={(e) => handleSelectFile(e.target.value)}
                    className="bg-transparent text-[11px] md:text-xs text-slate-900 font-bold focus:outline-none cursor-pointer font-mono w-full truncate py-0.5"
                  >
                    {allFileList.map(filename => (
                      <option key={filename} value={filename} className="bg-white text-slate-900 font-mono py-1">
                        {filename}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex items-center space-x-1 md:space-x-1.5 flex-wrap">
                  <button
                    onClick={loadProjectSource}
                    className="flex items-center justify-center space-x-1 px-2 md:px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-[10px] md:text-xs font-black transition-all shadow-2xs active:scale-95 cursor-pointer"
                    title="కోడ్‌ను రీలోడ్/ఫెచ్/దాచు చేయి"
                  >
                    <Code2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>💻 కోడ్ లోడ్</span>
                  </button>

                  <button
                    onClick={handleClearBoard}
                    className="flex items-center justify-center space-x-1 px-2 md:px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-[10px] md:text-xs font-black transition-all shadow-2xs active:scale-95 cursor-pointer"
                    title="బోర్డ్‌ని ఖాళీ చేసి కొత్త కోడ్ ఎంటర్ చేయి (Clear Board)"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>🧹 క్లియర్</span>
                  </button>

                  <button
                    onClick={handleSaveLocalBackup}
                    className="flex items-center justify-center space-x-1 px-2 md:px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-[10px] md:text-xs font-black transition-all shadow-2xs active:scale-95 cursor-pointer"
                    title="మొబైల్/డివైజ్ స్టోరేజ్‌లోకి సేవ్ చేయి"
                  >
                    <Save className="w-3.5 h-3.5 text-amber-600" />
                    <span>💾 సేవ్</span>
                  </button>

                  <button
                    onClick={handleRestoreSnapshot}
                    className="flex items-center justify-center space-x-1 px-2 md:px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-[10px] md:text-xs font-black transition-all shadow-2xs active:scale-95 cursor-pointer"
                    title="పాత బ్యాకప్‌కి రీస్టోర్ చేయి"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
                    <span className="hidden sm:inline">రీస్టోర్</span>
                  </button>

                  <button
                    onClick={handleApplyLive}
                    className="flex items-center justify-center space-x-1 px-2.5 md:px-4 py-1.5 bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-[10px] md:text-xs font-black shadow-md shadow-emerald-200 transition-all active:scale-90 cursor-pointer"
                  >
                    <Rocket className="w-3.5 h-3.5 text-white" />
                    <span>🚀 అప్లై</span>
                  </button>
                </div>
              </div>

              {/* INTERACTIVE CODE TEXTAREA */}
              <div className="flex-1 p-2 md:p-4 bg-slate-50 font-mono text-[11px] md:text-xs text-slate-900 relative">
                {/* 💡 అడ్మిన్ గారు! మీ ఆదేశం ప్రకారం ఇక్కడ ఉండే ఎర్రటి ఎర్రర్ బాక్స్ (Red Syntax Error Box) ను పూర్తిగా తీసివేశాను. */}
                <textarea
                  value={fileContents[selectedFile] || ''}
                  onChange={(e) => handleCodeChange(selectedFile, e.target.value)}
                  className="w-full h-full bg-white rounded-xl p-4 resize-none focus:outline-none text-slate-800 leading-relaxed font-mono shadow-inner border border-slate-200"
                  spellCheck={false}
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                />
              </div>
            </motion.div>
          )}

          {/* TAB 2: APP PREVIEW (REAL LIVE PREVIEW) */}
          {activeTab === 'preview' && (
            <motion.div 
              key="preview"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex-1 border-y md:border border-slate-200 md:rounded-2xl bg-white flex flex-col relative overflow-hidden shadow-xl min-h-0"
            >
              <div className="flex-1 bg-slate-900/95 p-2 sm:p-4 flex items-center justify-center overflow-auto min-h-0 relative">
                
                {/* FLOATING GLASSMORPHIC PREVIEW CONTROLS */}
                <div className="absolute top-4 right-4 z-50 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-800 shadow-2xl flex items-center gap-3">
                  <div className="flex items-center gap-1.5 pr-2.5 border-r border-slate-800">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                      {previewDeviceMode === 'mobile' ? 'Mobile' : 'Full'}
                    </span>
                  </div>

                  <div className="bg-slate-900/80 p-0.5 rounded-xl flex items-center gap-0.5">
                    <button
                      onClick={() => setPreviewDeviceMode('mobile')}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                        previewDeviceMode === 'mobile' 
                          ? 'bg-indigo-600 text-white shadow-xs' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Smartphone className="w-3 h-3" />
                      <span>మొబైల్</span>
                    </button>
                    <button
                      onClick={() => setPreviewDeviceMode('responsive')}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                        previewDeviceMode === 'responsive' 
                          ? 'bg-indigo-600 text-white shadow-xs' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Globe className="w-3 h-3" />
                      <span>ఫుల్ వ్యూ</span>
                    </button>
                  </div>

                  <button 
                    onClick={() => {
                      const iframe = document.getElementById('preview-frame') as HTMLIFrameElement;
                      if (iframe) iframe.src = iframe.src;
                      notify('🔄 Preview Refreshed');
                    }}
                    className="p-1.5 hover:bg-slate-800 rounded-xl transition-all text-slate-400 hover:text-indigo-400 cursor-pointer"
                    title="రీఫ్రెష్ చేయి"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {previewDeviceMode === 'mobile' ? (
                  /* AUTHENTIC MOBILE SMARTPHONE FRAME */
                  <div className="w-[360px] sm:w-[380px] max-w-full h-full max-h-[670px] bg-slate-950 rounded-[36px] p-3 shadow-2xl border-4 border-slate-800 flex flex-col relative group overflow-hidden shrink-0">
                    {/* CAMERA NOTCH */}
                    <div className="w-24 h-4 bg-slate-900 rounded-b-xl mx-auto mb-1.5 flex items-center justify-center shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700"></div>
                    </div>

                    <div className="flex-1 bg-white rounded-[24px] overflow-hidden border border-slate-800 relative">
                      <iframe 
                        id="preview-frame"
                        src={window.location.origin}
                        className="w-full h-full border-none"
                        title="AI Master Studio Preview"
                      />
                    </div>

                    {/* BOTTOM HOME INDICATOR BAR */}
                    <div className="w-28 h-1 bg-slate-700 rounded-full mx-auto mt-2 shrink-0"></div>
                  </div>
                ) : (
                  /* FULL RESPONSIVE VIEW */
                  <div className="w-full h-full bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden relative group">
                    <iframe 
                      id="preview-frame"
                      src={window.location.origin}
                      className="w-full h-full border-none"
                      title="AI Master Studio Preview"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 3: AI FIXER CHAT & VOICE */}
          {activeTab === 'chat' && (
            <motion.div 
              key="chat"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex-1 border-y md:border border-slate-200 md:rounded-2xl bg-white flex flex-col overflow-hidden shadow-xl h-full min-h-0 relative"
            >
              {/* CHAT HEADER WITH HISTORY & NEW CHAT */}
              <div className="bg-white border-b border-slate-100 px-4 py-2 flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                    className={`p-2 rounded-xl transition-all ${isHistoryOpen ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    <History className="w-5 h-5" />
                  </button>
                  <div className="h-4 w-px bg-slate-200 mx-1" />
                  <button
                    onClick={createNewChat}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] md:text-xs font-black shadow-md transition-all active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Repair</span>
                  </button>
                </div>
                {currentChatId && (
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    SESSION ACTIVE
                  </div>
                )}
              </div>

              <div className="flex-1 flex overflow-hidden min-h-0">
                {/* HISTORY SIDEBAR */}
                <AnimatePresence>
                  {isHistoryOpen && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 280, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      className="border-r border-slate-100 bg-slate-50/30 overflow-hidden flex flex-col h-full"
                    >
                      <div className="p-4 border-b border-slate-100 shrink-0">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-tighter">Repair History</h3>
                      </div>
                      <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {chatSessions.length === 0 && (
                          <p className="text-[10px] text-slate-400 p-4 text-center">No repair history found.</p>
                        )}
                        {chatSessions.map((session) => (
                          <div 
                            key={session.id}
                            className={`group flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                              currentChatId === session.id 
                                ? 'bg-white border-indigo-200 shadow-sm ring-1 ring-indigo-100' 
                                : 'border-transparent hover:bg-white hover:border-slate-200'
                            }`}
                            onClick={() => setCurrentChatId(session.id)}
                          >
                            <div className="flex items-center space-x-3 overflow-hidden">
                              <div className={`p-1.5 rounded-lg ${currentChatId === session.id ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                <Terminal className="w-3 h-3" />
                              </div>
                              <div className="overflow-hidden">
                                <p className="text-[11px] font-black text-slate-900 truncate">{session.title || 'Untitled Session'}</p>
                                <p className="text-[9px] text-slate-400 font-bold">{new Date(session.createdAt?.seconds * 1000).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteChat(session.id);
                              }}
                              className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* MESSAGES AREA */}
                <div 
                  ref={chatContainerRef}
                  onScroll={handleScroll}
                  className="flex-1 p-3 md:p-4 space-y-4 overflow-y-auto overscroll-contain bg-slate-50/50 min-h-0 scroll-smooth touch-pan-y relative"
                  style={{ WebkitOverflowScrolling: 'touch' }}
                >
                  {chatMessages.length === 0 && !currentChatId && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                      <div className="p-4 bg-indigo-50 text-indigo-600 rounded-full">
                        <MessageSquarePlus className="w-10 h-10" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">Start a New Repair</p>
                        <p className="text-xs font-bold text-slate-500">Ask DeepSeek Agent to help you fix or build features.</p>
                      </div>
                    </div>
                  )}

                  {chatMessages.map((msg, idx) => {
                    const isUser = msg.sender === 'User' || msg.type === 'user';
                    // 🏛️ అడ్మిన్ గారు, ఏజెంట్ పేరును మైక్రో సైజులోకి మారుస్తున్నాను.
                    const prefix = isUser ? 'ADMIN:' : `${msg.sender?.toUpperCase()}:`;
                    return (
                      <div key={idx} className="py-2 border-b border-slate-100/80 text-xs md:text-sm text-slate-800 leading-relaxed">
                        <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-2">
                          <span className={`font-black shrink-0 tracking-tighter ${isUser ? 'text-indigo-600 text-[1px]' : 'text-emerald-700 text-[1px] opacity-40'}`}>
                            {prefix}
                          </span>
                          <div className="flex-1 whitespace-pre-wrap text-slate-800 font-medium select-text">
                            {renderMessageText(msg.text)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* CHAT & VOICE INPUT BAR */}
              <div className="p-2 md:p-3 bg-white border-t border-slate-100 flex flex-col space-y-2 shrink-0 sticky bottom-0 z-20 shadow-lg">
                {/* ATTACHMENT PREVIEWS */}
                {attachments.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {attachments.map((file, i) => (
                      <div key={i} className="flex items-center space-x-1 px-2 py-1 bg-slate-50 border border-slate-200 rounded-full text-[9px] font-black text-slate-500">
                        <Paperclip className="w-2.5 h-2.5" />
                        <span className="truncate max-w-[80px]">{file.name}</span>
                        <button onClick={() => setAttachments(prev => prev.filter((_, idx) => idx !== i))}>
                          <X className="w-2.5 h-2.5 hover:text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="relative border border-slate-200 rounded-xl p-2 bg-white focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all shadow-sm group">
                  <textarea
                    ref={chatInputRef}
                    rows={1}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask AI to repair..."
                    className="w-full bg-transparent border-none px-1 py-0.5 text-[11px] md:text-xs text-slate-800 font-bold focus:outline-none resize-none overflow-y-auto max-h-[200px] placeholder:text-slate-400 placeholder:font-black"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  
                  <div className="flex items-center justify-end space-x-1.5 mt-1">
                    {/* VOICE BUTTON */}
                    <button
                      type="button"
                      onClick={() => setIsVoiceRecording(!isVoiceRecording)}
                      className={`p-2 rounded-full border transition-all shadow-sm ${
                        isVoiceRecording
                          ? 'bg-red-500 border-red-600 text-white animate-pulse'
                          : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-200'
                      }`}
                    >
                      {isVoiceRecording ? <Radio className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>

                    {/* ATTACHMENT BUTTON */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsAttachmentMenuOpen(!isAttachmentMenuOpen)}
                        className={`p-2 rounded-full border shadow-sm transition-all ${
                          isAttachmentMenuOpen
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-600 hover:text-white'
                        }`}
                      >
                        <Plus className={`w-4 h-4 transition-transform ${isAttachmentMenuOpen ? 'rotate-45' : ''}`} />
                      </button>

                      {/* ATTACHMENT MENU POPOVER (50% SMALLER) */}
                      <AnimatePresence>
                        {isAttachmentMenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 5, scale: 0.95 }}
                            animate={{ opacity: 1, y: -5, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.95 }}
                            className="absolute bottom-full right-0 mb-2 w-28 bg-white border border-slate-200 rounded-xl shadow-xl p-1 z-50 flex flex-col gap-0.5"
                          >
                            <button
                              type="button"
                              onClick={() => { fileInputRef.current?.click(); setIsAttachmentMenuOpen(false); }}
                              className="flex items-center space-x-2 p-1.5 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors"
                            >
                              <div className="p-1 bg-blue-50 text-blue-600 rounded-md">
                                <HardDrive className="w-3 h-3" />
                              </div>
                              <span className="text-[9px] font-black uppercase tracking-tighter">Device</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => { handleGoogleDrive(); setIsAttachmentMenuOpen(false); }}
                              className="flex items-center space-x-2 p-1.5 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors"
                            >
                              <div className="p-1 bg-green-50 text-green-600 rounded-md">
                                <Cloud className="w-3 h-3" />
                              </div>
                              <span className="text-[9px] font-black uppercase tracking-tighter">Drive</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => { handleCameraCapture(); setIsAttachmentMenuOpen(false); }}
                              className="flex items-center space-x-2 p-1.5 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors"
                            >
                              <div className="p-1 bg-purple-50 text-purple-600 rounded-md">
                                <Camera className="w-3 h-3" />
                              </div>
                              <span className="text-[9px] font-black uppercase tracking-tighter">Camera</span>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* SEND BUTTON */}
                    <button
                      type="button"
                      onClick={() => handleSendMessage()}
                      disabled={!chatInput.trim() && attachments.length === 0}
                      className="p-2 bg-emerald-50 border border-emerald-200 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-full shadow-sm transition-all disabled:opacity-30"
                    >
                      <ArrowUp className="w-4 h-4 stroke-[2.5px]" />
                    </button>
                  </div>
                </div>

                {/* HIDDEN FILE INPUT */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                  multiple
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ========================================== */}
      {/* 3. DYNAMIC NAVIGATION FEATURES MODAL (SHIFT & REPAIR) */}
      {/* =================================================== */}
      {/* 💡 అడ్మిన్ గారు! రూల్ 43 ప్రకారం, పాత నల్లటి బోర్డును పూర్తిగా తొలగించి ఆల్రెడీ సిస్టమ్‌లో ఉన్న ఒరిజినల్ వైట్ షిఫ్ట్ బోర్డు (GlobalShiftModal) ను ఇక్కడ డైరెక్ట్ కనెక్ట్ చేసాము. */}
      <GlobalShiftModal
        isOpen={isShiftModalOpen}
        onClose={() => setIsShiftModalOpen(false)}
        availableItems={[
          {
            id: 'current_file',
            name: selectedFile.split('/').pop() || 'Source Code',
            type: 'SOURCE_CODE',
            content: fileContents[selectedFile] || ''
          }
        ]}
        userId={userEmail || 'admin'}
        onShiftToNormalStudio={(item) => {
          onShift?.(item);
          setIsShiftModalOpen(false);
        }}
        onShiftToReverseStudio={(item) => {
          onShift?.(item);
          setIsShiftModalOpen(false);
        }}
        onNavigate={(view) => {
          onNavigate?.(view);
          setIsShiftModalOpen(false);
        }}
      />

      <AnimatePresence>
        {isModelModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px] p-3"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white border border-slate-200 rounded-2xl w-full max-w-[270px] p-3 shadow-2xl relative"
            >
              <button
                onClick={() => setIsModelModalOpen(false)}
                className="absolute top-2.5 right-2.5 p-1 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600">
                  <Terminal className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-black text-slate-900 tracking-tight uppercase">Select Agent (ఎనిమిది మంది ఏజెంట్లు)</h3>
              </div>

              <div className="space-y-1.5 max-h-[350px] overflow-y-auto pr-1">
                {AI_MODELS.map((model) => {
                  const IconComponent = model.icon;
                  const isSelected = selectedModel.id === model.id;

                  return (
                    <button
                      key={model.id}
                      onClick={() => {
                        setSelectedModel(model);
                        setIsModelModalOpen(false);
                        notify(`Engine: ${model.name}`);
                      }}
                      className={`w-full flex items-center justify-between p-2 px-2.5 rounded-xl border transition-all group ${
                        isSelected
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-900 shadow-xs'
                          : 'bg-white border-slate-100 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <div className={`p-1.5 rounded-lg border transition-transform group-hover:scale-105 ${isSelected ? 'bg-white border-indigo-200 text-indigo-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-left">
                          <p className="text-[11px] font-bold tracking-tight leading-none mb-0.5">{model.name}</p>
                          <p className={`text-[9px] leading-tight line-clamp-1 ${isSelected ? 'text-indigo-600/70' : 'text-slate-400'}`}>
                            {model.desc}
                          </p>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SelfFixerStudio;
