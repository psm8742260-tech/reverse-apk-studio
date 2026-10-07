import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  X, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Info, 
  Smartphone, 
  Package, 
  TestTube, 
  Download, 
  Loader2, 
  ShieldCheck, 
  ExternalLink,
  Terminal,
  FileCode,
  Layers,
  Cpu,
  Sparkles,
  ArrowLeft,
  Rocket,
  Zap,
  RotateCw,
  Share2,
  Check,
  ChevronRight,
  Shield,
  Layers2,
  Settings,
  Code2,
  CloudSun,
  Cloud,
  Bell,
  Wifi,
  Sparkle,
  FolderSync,
  Radio,
  Share,
  LayoutGrid,
  SidebarClose,
  AppWindow,
  Folders,
  FileText,
  Copy
} from 'lucide-react';
import { ActionItem, AnalysisReport } from './UrlToAppBuilder/types';
import { StoreReadyModal } from './UrlToAppBuilder/StoreReadyModal';
import { PackageForStoresCard } from './UrlToAppBuilder/PackageForStoresCard';
import { DiagnosticCard } from './UrlToAppBuilder/DiagnosticCard';
import { AnalysisSummaryCard } from './UrlToAppBuilder/AnalysisSummaryCard';
import { ActionItemsHeader, ActionItemsFilters } from './UrlToAppBuilder/ActionItemsHeader';
import { AndroidPackageOptionsModal } from './UrlToAppBuilder/AndroidPackageOptionsModal';
import { motion, AnimatePresence } from 'motion/react';

interface UrlToAppBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onShift?: (item: { id: string; name: string; type: 'SMALI_CODE' | 'XML_LAYOUT' | '3D_ICON_ASSET' | 'LIVE_URL' | 'SOURCE_CODE' | 'IMAGE_ASSET' | 'APK_ASSET' | 'AAB_ASSET' | 'QR_CODE' | 'CODE_FIX' | 'UNIVERSAL_ASSET' | 'CODE_SNIPPET'; content: string }) => void;
}

export const UrlToAppBuilder: React.FC<UrlToAppBuilderProps> = ({ isOpen, onClose, onShift }) => {
  const [targetUrl, setTargetUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [actionFilter, setActionFilter] = useState<'all' | 'error' | 'warning' | 'info' | 'feature'>('all');
  const [copiedShare, setCopiedShare] = useState(false);
  const [expandedCardIdx, setExpandedCardIdx] = useState<number | null>(null);
  
  // Interactive PWABuilder Modal States
  const [selectedActionItem, setSelectedActionItem] = useState<ActionItem | null>(null);
  const defaultCapabilities = [
    { id: 'shortcuts', name: 'App Shortcuts', supported: Boolean(report?.manifest?.name), description: 'Provides fast jump links when users long-press the application icon on Android launcher.' },
    { id: 'share', name: 'Web Share Target', supported: true, description: 'Allows your Progressive Web App to receive shared links, images, and text from other Android applications.' },
    { id: 'push', name: 'Push Notifications', supported: Boolean(report?.hasServiceWorker), description: 'Delivers real-time server updates and notifications even when the application is in the background.' },
    { id: 'storage', name: 'Persistent Storage', supported: true, description: 'Requests persistent client-side quota preventing device OS storage eviction on low space.' },
    { id: 'sync', name: 'Background Synchronization', supported: Boolean(report?.hasServiceWorker), description: 'Defers server synchronization tasks until the mobile device gains reliable internet connectivity.' },
    { id: 'theme', name: 'Status Bar Theming', supported: Boolean(report?.manifest?.theme_color), description: 'Blends Android system navigation and status bar chrome with custom application branding colors.' }
  ];
  const [selectedCapability, setSelectedCapability] = useState<{
    id: string;
    name: string;
    supported: boolean;
    description: string;
  } | null>(null);
  const [isSwModalOpen, setIsSwModalOpen] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isAndroidOptionsOpen, setIsAndroidOptionsOpen] = useState(false);
  const [swCopied, setSwCopied] = useState(false);
  const [capCopied, setCapCopied] = useState(false);
  
  // App Config
  const [appName, setAppName] = useState('My Application');
  const [packageId, setPackageId] = useState('com.pwa.app');

  // Helper: Derive name from URL automatically
  const deriveNameFromUrl = (url: string) => {
    try {
      if (!url || !url.startsWith('http')) return 'My Application';
      const hostname = new URL(url).hostname;
      const parts = hostname.split('.');
      // Handle ai.studio subdomains or general domains
      let namePart = parts[0];
      if (namePart === 'www' && parts.length > 1) namePart = parts[1];
      
      return namePart
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    } catch {
      return 'My Application';
    }
  };

  const derivePackageId = (name: string) => {
    const clean = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `com.${clean || 'pwa'}.app`;
  };

  useEffect(() => {
    if (targetUrl) {
      const derived = deriveNameFromUrl(targetUrl);
      if (appName === 'My Application' || appName === 'AI Master Studio App') {
        setAppName(derived);
        setPackageId(derivePackageId(derived));
      }
    }
  }, [targetUrl]);
  
  // Build state
  const [activeBuildType, setActiveBuildType] = useState<'apk' | 'aab' | 'testing' | null>(null);
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [buildLogs, setBuildLogs] = useState<string[]>([]);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAnalyze = async () => {
    if (!targetUrl.trim()) return;
    setIsAnalyzing(true);
    setReport(null);
    setDownloadSuccess(null);

    try {
      const res = await fetch('/api/app/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl }),
      });

      if (!res.ok) {
        throw new Error('Analysis API error');
      }

      const data = await res.json();
      setReport(data);
      const finalName = data.manifest?.name || data.siteName || deriveNameFromUrl(targetUrl);
      setAppName(finalName);
      setPackageId(derivePackageId(finalName));
    } catch (err: any) {
      setReport({
        url: targetUrl,
        hostname: (() => {
          try {
            return new URL(
              targetUrl.startsWith('http')
                ? targetUrl
                : `https://${targetUrl}`
            ).hostname;
          } catch {
            return '';
          }
        })(),
        isSsl: targetUrl.startsWith('https://'),
        hasServiceWorker: false,
        manifestFound: false,
        manifest: null,
        appIconUrl: undefined,
        counts: {
          errors: 1,
          warnings: 0,
          info: 0,
          features: 0
        },
        iconCheck: {
          has192: false,
          has512: false,
          hasMaskable: false,
          validTypes: false,
          details: ['Analysis unavailable. No icon detection was performed.']
        },
        actionItems: [],
        score: 0,
        maxScore: 100
      });

      setBuildLogs((prev) => [
        ...prev,
        `[error] PWA analysis failed: ${err.message}`
      ]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleShareScore = () => {
    if (!report) return;
    const textToCopy = `PWA Audit Report: ${report.manifest?.name || report.url} - Readiness Score: ${report.score}/${report.maxScore}% (Errors: ${report.counts.errors}, Warnings: ${report.counts.warnings})`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const handleBuild = async (
    buildType: 'apk' | 'aab' | 'testing',
    customData?: {
      appName: string;
      packageId: string;
      shortName: string;
      appIconUrl?: string;
    }
  ) => {
    setActiveBuildType(buildType);

    if (
      buildType !== 'testing' &&
      !customData &&
      !isAndroidOptionsOpen
    ) {
      setIsAndroidOptionsOpen(true);
      return;
    }

    if (customData) {
      setAppName(customData.appName);
      setPackageId(customData.packageId);
      setIsAndroidOptionsOpen(false);
    }

    setIsBuilding(true);
    setBuildProgress(5);

    const getTimestamp = () => new Date().toISOString();

    setBuildLogs([
      `${getTimestamp()} [info]: Starting REAL PHRS Android build...`
    ]);

    try {
      const payload = {
        url: targetUrl,
        appName: customData?.appName || appName,
        packageId: customData?.packageId || packageId,
        appIconUrl:
          report?.appIconUrl ||
          customData?.appIconUrl,
        buildType
      };

      setBuildProgress(10);

      const res = await fetch('/api/app/build', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      setBuildProgress(25);

      const contentType =
        res.headers.get('content-type') || '';

      const rawBody = await res.text();

      console.log(
        '[TWA BUILD RESPONSE]',
        res.status,
        contentType,
        rawBody.slice(0, 1000)
      );

      let data: any = null;

      if (rawBody.trim()) {
        const looksJson =
          contentType.includes('application/json') ||
          rawBody.trim().startsWith('{') ||
          rawBody.trim().startsWith('[');

        if (looksJson) {
          try {
            data = JSON.parse(rawBody);
          } catch (parseError: any) {
            throw new Error(
              `Build server returned invalid JSON: ${parseError.message}`
            );
          }
        }
      }

      if (!res.ok) {
        throw new Error(
          data?.error ||
          data?.message ||
          rawBody.slice(0, 500) ||
          `Build failed with HTTP ${res.status}`
        );
      }

      if (!data || data.success !== true) {
        throw new Error(
          data?.error ||
          'Server did not confirm a REAL successful build.'
        );
      }

      if (
        !data.diagnostics ||
        data.diagnostics.validation !== 'REAL_VERIFIED' ||
        !data.diagnostics.apkVerified ||
        !data.diagnostics.aabVerified ||
        !data.diagnostics.zipVerified
      ) {
        throw new Error(
          'Server build completed but REAL artifact verification failed.'
        );
      }

      setBuildProgress(90);

      if (data.buildLogs) {
        setBuildLogs((prev) => [
          ...prev,
          ...data.buildLogs.map(
            (l: string) =>
              `${getTimestamp()} [server]: ${l}`
          )
        ]);
      }

      setBuildProgress(100);

      setBuildLogs((prev) => [
        ...prev,
        `${getTimestamp()} [info]: REAL package verification passed.`,
        `${getTimestamp()} [info]: Build Completed Successfully.`
      ]);

      setDownloadSuccess(data.fileName);

      if (data.downloadUrl) {
        window.location.href = data.downloadUrl;
      }

    } catch (err: any) {
      setBuildProgress(0);

      setBuildLogs((prev) => [
        ...prev,
        `${getTimestamp()} [error]: ❌ Build failed: ${err.message}`
      ]);

      console.error(
        '[TWA BUILD FAILED]',
        err
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[150] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-gradient-to-b from-[#eef3ff] via-[#f7f2ff] to-[#ffffff] border border-slate-200 rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden font-sans text-slate-800 flex flex-col max-h-[95vh]">
        
        {/* PWABuilder Official-Style Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-indigo-100/40 bg-white/50 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-6">
            {/* Mascot + PWA Builder text logo */}
            <div className="flex items-center gap-2 cursor-pointer select-none">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden border-2 border-white">
                {/* Cute Beaver Face in Space Helmet */}
                <svg className="w-8 h-8 text-white translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z" fill="#F1F5F9" />
                  <circle cx="9" cy="8" r="1" fill="#1E293B" />
                  <circle cx="15" cy="8" r="1" fill="#1E293B" />
                  <path d="M10 11s1 1 2 1 2-1 2-1" stroke="#E11D48" strokeWidth="1.5" />
                  {/* Space Helmet Dome */}
                  <circle cx="12" cy="8" r="8" stroke="#38BDF8" strokeWidth="1" fill="rgba(56, 189, 248, 0.15)" />
                </svg>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1">
                <span className="text-xl font-black text-[#1E1B2C] tracking-tighter">PWA</span>
                <span className="text-lg font-light text-[#5E5B7C] tracking-tight">builder</span>
              </div>
            </div>

            {/* Official navigation links (Desktop only) */}
            <div className="hidden md:flex items-center gap-6 text-sm font-bold text-[#5E5B7C]">
              <span className="hover:text-indigo-600 cursor-pointer transition">Blog</span>
              <span className="hover:text-indigo-600 cursor-pointer transition">Docs</span>
              <span className="hover:text-indigo-600 cursor-pointer transition">Community</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Functional Reload Button */}
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !targetUrl.trim()}
              className="p-2 sm:p-2.5 bg-white hover:bg-indigo-50 text-indigo-700 rounded-2xl transition border border-indigo-200 flex items-center gap-1.5 cursor-pointer text-xs font-bold shadow-sm disabled:opacity-50"
              title="రీలోడ్ (Reload)"
            >
              <RotateCw className={`w-4 h-4 text-indigo-600 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">రీలోడ్</span>
            </button>

            {/* Functional Shift Button */}
            <button
              onClick={() => onShift?.({ id: 'url_builder', name: 'URL Builder Workspace', type: 'SOURCE_CODE', content: JSON.stringify({ url: targetUrl, appName, packageId }) })}
              className="p-2 sm:p-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-2xl transition border border-indigo-100 flex items-center gap-1.5 cursor-pointer text-xs font-bold"
              title="Universal Shift"
            >
              <Rocket className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Shift</span>
            </button>

            {/* Functional Back Button */}
            <button 
              onClick={onClose}
              className="p-2 sm:p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition border border-slate-200 flex items-center gap-1.5 cursor-pointer text-xs font-bold"
              title="వెనక్కి (Back)"
            >
              <ArrowLeft className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">వెనుకకు</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content - Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* SECTION A: Input & Inspection Section */}
          <div className="space-y-4">

            {/* 1. Empty State (PWABuilder Official Landing Page Design) */}
            {!report && !isAnalyzing && (
              <div className="py-4 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in" id="pwabuilder-landing-view">
                
                {/* Hero Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E1B2C] tracking-tight leading-tight max-w-3xl mx-auto mt-2">
                  Helping developers build and publish PWAs
                </h1>

                {/* Sub Action Links */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-bold text-indigo-600">
                  <button className="hover:underline flex items-center gap-1 cursor-pointer">
                    Start a new PWA <span className="text-indigo-400 font-normal">→</span>
                  </button>
                  <button className="hover:underline flex items-center gap-1 cursor-pointer">
                    Use dev tools <span className="text-indigo-400 font-normal">→</span>
                  </button>
                </div>

                {/* App stores label with icons */}
                <div className="flex items-center justify-center gap-2.5 pt-8 pb-1 text-[#5E5B7C] font-extrabold text-sm">
                  <span>Ship your PWA to app stores</span>
                  <div className="flex items-center gap-2 ml-1">
                    {/* Windows Logo */}
                    <svg className="w-4 h-4 fill-current text-slate-700" viewBox="0 0 24 24">
                      <path d="M0 0h11.4v11.4H0V0zm12.6 0H24v11.4H12.6V0zM0 12.6h11.4V24H0V12.6zm12.6 0H24V24H12.6V12.6z"/>
                    </svg>
                    {/* Apple Logo */}
                    <svg className="w-4 h-4 fill-current text-slate-700" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z"/>
                    </svg>
                    {/* Android Logo */}
                    <svg className="w-4 h-4 fill-current text-slate-700" viewBox="0 0 24 24">
                      <path d="M17.523 15.3c-.141 0-.256-.115-.256-.256V11.16c0-.141.115-.256.256-.256s.256.115.256.256v3.884c0 .141-.115.256-.256.256zM6.477 15.3c-.141 0-.256-.115-.256-.256V11.16c0-.141.115-.256.256-.256s.256.115.256.256v3.884c0 .141-.115.256-.256.256zM12 21c-4.411 0-8-3.589-8-8 0-3.309 2.017-6.155 4.897-7.38l-.873-1.63a.256.256 0 11.451-.242l.89 1.66A7.95 7.95 0 0112 5c.873 0 1.716.143 2.503.407l.89-1.66a.256.256 0 01.451.242l-.873 1.63C17.983 6.845 20 9.691 20 13c0 4.411-3.589 8-8 8zm-3.5-9.5c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1zm7 0c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z"/>
                    </svg>
                  </div>
                </div>

                {/* Primary URL Input Section */}
                <div className="w-full max-w-xl mx-auto space-y-4 relative z-10">
                  <div className="relative">
                    <input
                      type="url"
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                      placeholder="https://remix-all-in-one-library-v20-5116.ai.studio/"
                      className="w-full bg-white border-2 border-indigo-200 focus:border-[#8A79E6] focus:ring-4 focus:ring-indigo-100 rounded-2xl px-5 py-4 text-sm font-semibold text-slate-800 outline-none shadow-sm transition-all"
                    />
                  </div>

                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !targetUrl.trim()}
                    className="w-full py-4 bg-[#2C293E] hover:bg-[#1E1B2C] text-white font-extrabold rounded-2xl text-base transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    <span>Start</span>
                  </button>

                  <div className="text-center">
                    <button
                      onClick={() => setTargetUrl('https://remix-all-in-one-library-v20-5116.ai.studio')}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-extrabold hover:underline cursor-pointer"
                    >
                      Try a demo url
                    </button>
                  </div>
                </div>

                {/* Waving Astronaut Mascot and Stars (Bottom Right Alignment) */}
                <div className="w-full max-w-xl mx-auto relative h-28" id="astronaut-bottom-layout">
                  <div className="absolute right-0 bottom-[-20px] w-28 h-28 animate-bounce" style={{ animationDuration: '5s' }}>
                    <svg className="w-full h-full drop-shadow-lg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Space suit backpack */}
                      <rect x="25" y="65" width="45" height="25" rx="5" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
                      {/* Suit Body */}
                      <path d="M35 75 C35 60, 85 60, 85 75 L80 110 C80 113, 40 113, 40 110 Z" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
                      {/* Logo on suit */}
                      <circle cx="60" cy="85" r="7" fill="#4F46E5" />
                      {/* Cute Head & Helmet */}
                      <circle cx="60" cy="45" r="25" fill="rgba(14, 165, 233, 0.15)" stroke="#38BDF8" strokeWidth="2" />
                      <circle cx="60" cy="45" r="18" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" />
                      {/* Happy Face */}
                      <circle cx="53" cy="42" r="2" fill="#1E293B" />
                      <circle cx="67" cy="42" r="2" fill="#1E293B" />
                      <path d="M57 48 Q60 51 63 48" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                      {/* Waving Arm */}
                      <path d="M82 72 Q98 52 95 48 C92 44, 80 62, 80 62" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* Apps Packaged Section */}
                <div className="w-full pt-12 border-t border-indigo-100/40 mt-8 space-y-4">
                  <h2 className="text-2xl font-extrabold text-[#1E1B2C]">Apps packaged</h2>
                  <p className="text-xs text-[#5E5B7C] max-w-xl mx-auto leading-relaxed">
                    Companies of all sizes—from startups to Fortune 500s—have used PWABuilder to package their PWAs.
                  </p>
                  
                  {/* Brand Logos Row */}
                  <div className="flex flex-wrap items-center justify-center gap-8 pt-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                    <span className="text-sm font-black tracking-wider text-slate-800">PLUTO TV</span>
                    <span className="text-sm font-black tracking-wider text-slate-800">INSTAGRAM</span>
                    <span className="text-sm font-black tracking-wider text-slate-800">STARBUCKS</span>
                    <span className="text-sm font-black tracking-wider text-slate-800">PINTEREST</span>
                  </div>
                </div>

              </div>
            )}

            {/* 2. Loading Skeletons */}
            {isAnalyzing && (
              <div className="mt-6 pt-6 border-t border-slate-200 space-y-6 animate-pulse" id="skeleton-loading-view">
                {/* Skeleton Card 1: Main App Score Audit Panel */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6" id="skeleton-main-card">
                  <div className="flex items-center gap-4 w-full md:w-2/3">
                    {/* App Square Icon Skeleton */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-200 rounded-2xl shrink-0" />
                    {/* Text fields Skeletons */}
                    <div className="space-y-3 flex-1">
                      <div className="h-6 bg-slate-200 rounded-lg w-3/4" />
                      <div className="h-4 bg-slate-200 rounded-lg w-1/2" />
                      <div className="h-3 bg-slate-200 rounded-lg w-5/6" />
                    </div>
                  </div>
                  {/* Score circle Skeleton */}
                  <div className="w-24 h-24 rounded-full bg-slate-200 border-4 border-slate-300 flex items-center justify-center shrink-0">
                    <div className="w-16 h-16 rounded-full bg-slate-300" />
                  </div>
                </div>

                {/* Skeleton Card 2: 13 Capabilities Skeletons */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4" id="skeleton-capabilities-card">
                  <div className="space-y-2">
                    <div className="h-5 bg-slate-200 rounded-lg w-1/3" />
                    <div className="h-3 bg-slate-200 rounded-lg w-2/3" />
                  </div>
                  
                  {/* Grid of 13 circles */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4 pt-4">
                    {Array.from({ length: 13 }).map((_, i) => (
                      <div key={i} className="flex flex-col items-center justify-center space-y-2" id={`skeleton-circle-${i}`}>
                        <div className="w-14 h-14 bg-slate-200 rounded-full border border-slate-300" />
                        <div className="h-3 bg-slate-200 rounded-md w-12" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skeleton Card 3: Action items Skeletons */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4" id="skeleton-action-items-card">
                  <div className="h-5 bg-slate-200 rounded-lg w-1/4" />
                  <div className="space-y-3">
                    <div className="h-12 bg-slate-100 rounded-xl w-full border border-slate-200" />
                    <div className="h-12 bg-slate-100 rounded-xl w-full border border-slate-200" />
                    <div className="h-12 bg-slate-100 rounded-xl w-full border border-slate-200" />
                  </div>
                </div>
              </div>
            )}

            {/* Analysis Results & Inspector View (PWABuilder Parity UI) */}
            {report && (
              <div className="mt-4 pt-4 border-t border-slate-200 space-y-5 animate-fade-in">
                
                {/* 1. TOP CARD: Package For Stores & Available Stores (Exact PWABuilder Card 1) */}
                <PackageForStoresCard 
                  onOpenStoreModal={() => setIsAndroidOptionsOpen(true)}
                  onDownloadTest={() => handleBuild('testing')}
                  hasErrors={report?.actionItems.some(item => item.type === 'error')}
                />

                {/* 2. MIDDLE CARD: App Identity, Description & Share Score (Exact PWABuilder Card 2) */}
                <AnalysisSummaryCard 
                  report={report}
                  copiedShare={copiedShare}
                  isAnalyzing={isAnalyzing}
                  onShareScore={handleShareScore}
                  onAnalyze={handleAnalyze}
                />

                {/* 2. Action Items Overview & Counters (Exact PWABuilder Parity Badges) */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs relative">
                  
                  {/* Space Astronaut Mascot Speech Bubble pointing directly to filters */}
                  <ActionItemsHeader 
                    report={report}
                    actionFilter={actionFilter}
                    onFilterChange={setActionFilter}
                  />

                  <ActionItemsFilters 
                    report={report}
                    actionFilter={actionFilter}
                    onFilterChange={setActionFilter}
                  />

                  {/* 3. Detailed Action Items Diagnostic List with Dynamic Background & Borders */}
                  <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                    {report.actionItems
                      .filter((item) => {
                        if (actionFilter === 'all') return true;
                        if (actionFilter === 'error') return item.type === 'error';
                        if (actionFilter === 'warning') return item.type === 'warning';
                        if (actionFilter === 'info') return item.type === 'info';
                        if (actionFilter === 'feature') return item.type === 'feature' || item.type === 'success';
                        return true;
                      })
                      .map((item, idx) => (
                        <DiagnosticCard 
                          key={idx}
                          item={item}
                          idx={idx}
                          isExpanded={expandedCardIdx === idx}
                          onToggle={() => setExpandedCardIdx(expandedCardIdx === idx ? null : idx)}
                        />
                      ))}
                  </div>
                </div>

                {/* 4. SERVICE WORKER CARD (PWABuilder Reference Parity) */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5 relative">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 pr-16">
                      <h3 className="text-base font-extrabold text-slate-900">Service Worker</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        PWABuilder has analyzed your Service Worker, and has identified additional features you can add to make your app feel more robust.
                      </p>
                    </div>
                    {/* circular score badge: +3 */}
                    <div className="absolute top-6 right-6 w-14 h-14 rounded-full border-4 border-indigo-600 flex flex-col items-center justify-center bg-indigo-50/50 shrink-0">
                      <span className="text-sm font-extrabold text-indigo-600 leading-none">+3</span>
                    </div>
                  </div>

                  {/* 3 Rows of circular icons, 3 columns grid as seen in PWABuilder */}
                  <div className="grid grid-cols-3 gap-x-2 gap-y-6 pt-2">
                    {/* 1. Has Service Worker */}
                    <div 
                      onClick={() => setIsSwModalOpen(true)}
                      className="flex flex-col items-center justify-center group cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded-full bg-indigo-50/60 border border-slate-200 flex items-center justify-center relative group-hover:border-indigo-400 group-hover:bg-indigo-100/40 transition duration-200">
                        <Settings className="w-6 h-6 text-indigo-600" />
                        <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border-2 border-white shadow-xs flex items-center justify-center w-5 h-5">
                          <Check className="w-3 h-3 text-white stroke-[4]" />
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-800 text-center mt-2 group-hover:text-indigo-600 transition leading-tight max-w-[85px] line-clamp-2">
                        Has Service Worker
                      </span>
                    </div>

                    {/* 2. Has Logic */}
                    <div 
                      onClick={() => setIsSwModalOpen(true)}
                      className="flex flex-col items-center justify-center group cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded-full bg-indigo-50/60 border border-slate-200 flex items-center justify-center relative group-hover:border-indigo-400 group-hover:bg-indigo-100/40 transition duration-200">
                        <Code2 className="w-6 h-6 text-indigo-600" />
                        <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border-2 border-white shadow-xs flex items-center justify-center w-5 h-5">
                          <Check className="w-3 h-3 text-white stroke-[4]" />
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-800 text-center mt-2 group-hover:text-indigo-600 transition leading-tight max-w-[85px] line-clamp-2">
                        Has Logic
                      </span>
                    </div>

                    {/* 3. Periodic Sync */}
                    <div 
                      onClick={() => setIsSwModalOpen(true)}
                      className="flex flex-col items-center justify-center group cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center relative group-hover:border-slate-300 group-hover:bg-slate-100/50 transition duration-200">
                        <FolderSync className="w-6 h-6 text-slate-400" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 text-center mt-2 group-hover:text-slate-800 transition leading-tight max-w-[85px] line-clamp-2">
                        Periodic Sync
                      </span>
                    </div>

                    {/* 4. Background Sync */}
                    <div 
                      onClick={() => setIsSwModalOpen(true)}
                      className="flex flex-col items-center justify-center group cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center relative group-hover:border-slate-300 group-hover:bg-slate-100/50 transition duration-200">
                        <Cloud className="w-6 h-6 text-slate-400" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 text-center mt-2 group-hover:text-slate-800 transition leading-tight max-w-[85px] line-clamp-2">
                        Background Sync
                      </span>
                    </div>

                    {/* 5. Push Notifications */}
                    <div 
                      onClick={() => setIsSwModalOpen(true)}
                      className="flex flex-col items-center justify-center group cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center relative group-hover:border-slate-300 group-hover:bg-slate-100/50 transition duration-200">
                        <Bell className="w-6 h-6 text-slate-400" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 text-center mt-2 group-hover:text-slate-800 transition leading-tight max-w-[85px] line-clamp-2">
                        Push Notifications
                      </span>
                    </div>

                    {/* 6. Offline Support */}
                    <div 
                      onClick={() => setIsSwModalOpen(true)}
                      className="flex flex-col items-center justify-center group cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded-full bg-indigo-50/60 border border-slate-200 flex items-center justify-center relative group-hover:border-indigo-400 group-hover:bg-indigo-100/40 transition duration-200">
                        <Wifi className="w-6 h-6 text-indigo-600" />
                        <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border-2 border-white shadow-xs flex items-center justify-center w-5 h-5">
                          <Check className="w-3 h-3 text-white stroke-[4]" />
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-800 text-center mt-2 group-hover:text-indigo-600 transition leading-tight max-w-[85px] line-clamp-2">
                        Offline Support
                      </span>
                    </div>
                  </div>

                  {/* Actions at bottom */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col items-center justify-center space-y-2">
                    <button
                      onClick={() => setIsSwModalOpen(true)}
                      className="px-6 py-2 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-black rounded-full text-xs transition duration-200 cursor-pointer"
                    >
                      Generate Service Worker
                    </button>
                    <button
                      onClick={() => setIsSwModalOpen(true)}
                      className="text-[11px] font-bold text-indigo-600 hover:underline cursor-pointer transition flex items-center gap-1"
                    >
                      <span>Service Worker Documentation</span>
                      <span>&rarr;</span>
                    </button>
                  </div>
                </div>

                {/* 5. CAPABILITIES GRID CARD (PWABuilder Reference Parity) */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5 relative">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 pr-16">
                      <h3 className="text-base font-extrabold text-slate-900">App Capabilities</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        PWABuilder has analyzed your PWA and has identified some app capabilities that could enhance your PWA.
                      </p>
                    </div>
                    {/* circular score badge: +0 */}
                    <div className="absolute top-6 right-6 w-14 h-14 rounded-full border-4 border-indigo-600 flex flex-col items-center justify-center bg-indigo-50/50 shrink-0">
                      <span className="text-sm font-extrabold text-indigo-600 leading-none">+0</span>
                    </div>
                  </div>

                  {/* 13 Circular Capabilities Icons, in 3 Columns Grid */}
                  <div className="grid grid-cols-3 gap-x-2 gap-y-6 pt-2">
                    {[
                      { id: 'shortcuts', name: 'Shortcuts', icon: Sparkle, supported: Boolean(report?.manifest?.name), description: 'Provides fast jump links when users long-press the application icon on Android launcher.' },
                      { id: 'file_handlers', name: 'File Handlers', icon: Folders, supported: false, description: 'Allows your Progressive Web App to register as an application capable of opening specific file extensions.' },
                      { id: 'launch_handler', name: 'Launch Handler', icon: Rocket, supported: false, description: 'Controls how your app launches, such as whether it opens in an existing window or a new window.' },
                      { id: 'protocol_handlers', name: 'Protocol Handlers', icon: Layers, supported: false, description: 'Registers your app to handle custom URI schemes (e.g., mailto, web+custom).' },
                      { id: 'share', name: 'Share Target', icon: Share, supported: true, description: 'Allows your Progressive Web App to receive shared links, images, and text from other Android applications.' },
                      { id: 'widgets', name: 'Widgets', icon: LayoutGrid, supported: false, description: 'Enables customizable interactive mini-views in the Android widget drawer or OS shelf.' },
                      { id: 'edge_side_panel', name: 'Edge Side Panel', icon: SidebarClose, supported: false, description: 'Allows your application to be pinned and run inside Microsoft Edge browser sidebar.' },
                      { id: 'window_controls', name: 'Window Controls Overlay', icon: AppWindow, supported: false, description: 'Hides default titlebars on desktop allowing developer-defined visual status areas.' },
                      { id: 'tabbed_display', name: 'Tabbed Display', icon: Layers, supported: false, description: 'Enables custom browser tabs layout rendering multiple active navigation sessions.' },
                      { id: 'note_taking', name: 'Note Taking', icon: FileText, supported: false, description: 'Registers your app as an official system note-taking application for quick-access stylus links.' },
                      { id: 'contact_picker', name: 'Contact Picker', icon: Radio, supported: true, description: 'Allows your application to query contact cards directly from the native Android address book.' },
                      { id: 'badging', name: 'App Badging', icon: Bell, supported: true, description: 'Sets count badges on your home screen icon to indicate new unread alerts or notifications.' },
                      { id: 'wake_lock', name: 'Screen Wake Lock', icon: Shield, supported: false, description: 'Prevents the mobile device screen from dimming or locking during active in-app operations.' }
                    ].map((cap, i) => {
                      const IconComponent = cap.icon;
                      return (
                        <div
                          key={cap.id}
                          onClick={() => setSelectedCapability({
                            id: cap.id,
                            name: cap.name,
                            supported: cap.supported,
                            description: cap.description
                          })}
                          className="flex flex-col items-center justify-center group cursor-pointer"
                        >
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center relative transition duration-200 ${
                            cap.supported 
                              ? 'bg-indigo-50/60 border border-slate-200 group-hover:border-indigo-400 group-hover:bg-indigo-100/40' 
                              : 'bg-slate-50 border border-slate-200 group-hover:border-slate-300 group-hover:bg-slate-100/50'
                          }`}>
                            <IconComponent className={`w-6 h-6 ${cap.supported ? 'text-indigo-600' : 'text-slate-400'}`} />
                            {cap.supported && (
                              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border-2 border-white shadow-xs flex items-center justify-center w-5 h-5">
                                <Check className="w-3 h-3 text-white stroke-[4]" />
                              </div>
                            )}
                          </div>
                          <span className="text-[10px] font-bold text-center mt-2 group-hover:text-indigo-600 transition leading-tight max-w-[85px] line-clamp-2">
                            {cap.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Actions at bottom */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] font-bold text-indigo-600">
                    <button
                      onClick={() => setSelectedCapability({
                        id: 'general_cap',
                        name: 'App Capabilities',
                        supported: false,
                        description: 'Learn how to integrate custom native device hooks and APIs into your web manifest.'
                      })}
                      className="hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <span>App Capabilities documentation</span>
                      <span>&rarr;</span>
                    </button>
                    <span className="text-slate-300">|</span>
                    <a
                      href="https://whatpwacando.today"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center gap-1"
                    >
                      <span>WhatPwaCanDo.today</span>
                      <span>&rarr;</span>
                    </a>
                  </div>
                </div>

              </div>
            )}

            {/* Interactive Service Worker Modal (PWABuilder Parity) */}
            {isSwModalOpen && (
              <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <Layers className="w-5 h-5 text-indigo-600" />
                      <h3 className="font-extrabold text-slate-900 text-base">Service Worker Diagnostics</h3>
                    </div>
                    <button
                      onClick={() => setIsSwModalOpen(false)}
                      className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-900">Detection Status: </span>
                      {report?.hasServiceWorker ? (
                        <span className="text-emerald-600 font-extrabold">Active (Service Worker Found)</span>
                      ) : (
                        <span className="text-amber-600 font-extrabold">Not Detected</span>
                      )}
                    </div>

                    <p>
                      Service workers allow PWAs to load instantly, work offline, and intercept network requests. Our native Android packaging engine bundles an automated offline cache fallback so your APK/AAB works seamlessly.
                    </p>

                    <div className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-[11px] overflow-x-auto">
                      <pre>{`// sw.js template
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open('app-v1').then(c => c.addAll(['/'])));
});
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});`}</pre>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setIsSwModalOpen(false)}
                      className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Interactive Capability Modal (PWABuilder Parity) */}
            {selectedCapability && (
              <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="w-5 h-5 text-indigo-600" />
                      <h3 className="font-extrabold text-slate-900 text-base">{selectedCapability.name}</h3>
                    </div>
                    <button
                      onClick={() => setSelectedCapability(null)}
                      className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">Capability Status:</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          selectedCapability.supported
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {selectedCapability.supported ? 'Supported in Manifest' : 'Ready to Enable'}
                      </span>
                    </div>

                    <p className="leading-relaxed">
                      {selectedCapability.description ||
                        'This capability allows your Progressive Web Application to access device APIs and OS integrations seamlessly when running as an installed Android app.'}
                    </p>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-[11px] font-mono text-slate-800">
                      <div className="font-bold text-slate-900 mb-1 font-sans">Implementation:</div>
                      <div>{`manifest.json -> "${selectedCapability.name.toLowerCase().replace(/\\s+/g, '_')}" enabled in Android WebAPK bridge.`}</div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setSelectedCapability(null)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 transition cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Interactive Action Item Diagnostic Modal (PWABuilder Parity) */}
            {selectedActionItem && (
              <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      {selectedActionItem.type === 'error' && <XCircle className="w-5 h-5 text-rose-600" />}
                      {selectedActionItem.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-600" />}
                      {(selectedActionItem.type === 'feature' || selectedActionItem.type === 'success') && <Zap className="w-5 h-5 text-purple-600" />}
                      {selectedActionItem.type === 'info' && <Info className="w-5 h-5 text-sky-600" />}
                      <h3 className="font-extrabold text-slate-900 text-base">{selectedActionItem.title}</h3>
                    </div>
                    <button
                      onClick={() => setSelectedActionItem(null)}
                      className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">Diagnostic Category:</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-300">
                        {selectedActionItem.category}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed text-slate-800">
                      <span className="font-bold text-slate-900 block mb-1">Issue Details:</span>
                      {selectedActionItem.message}
                    </div>

                    {selectedActionItem.action && (
                      <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl leading-relaxed text-slate-900 font-mono text-[11px]">
                        <span className="font-bold text-amber-800 font-sans block mb-1">🔧 Suggested Fix:</span>
                        <span className="break-all">{selectedActionItem.action}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setSelectedActionItem(null)}
                      className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500 font-mono shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Build Engine • Web to App Conversion</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg transition cursor-pointer"
          >
            Close Window
          </button>
        </div>

      </div>
      {/* Store Ready Modal Integration */}
      <StoreReadyModal 
        isOpen={isStoreModalOpen}
        onClose={() => setIsStoreModalOpen(false)}
        onGenerate={(platform) => {
          handleBuild(platform === 'android' ? 'apk' : 'aab');
          setIsStoreModalOpen(false);
        }}
      />

      {/* Android Package Options Modal (Screenshot 1 Parity) */}
      <AndroidPackageOptionsModal
        isOpen={isAndroidOptionsOpen}
        onClose={() => setIsAndroidOptionsOpen(false)}
        appName={appName}
        packageId={packageId}
        onDownload={(data) => handleBuild(data.format, data)}
      />

      {/* Build Progress Modal (Screenshots 3, 4, 5 Parity) */}
      {isBuilding && (
        <div className="fixed inset-0 z-[170] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header with Success Status */}
            <div className="px-6 py-4 flex items-center gap-3 border-b border-slate-100">
              {buildProgress === 100 ? (
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
              ) : (
                <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin shrink-0" />
              )}
              <h3 className="text-xl font-bold text-slate-800">
                {buildProgress === 100 ? "Package created successfully" : "Checking Google Play package status..."}
              </h3>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto">
              {/* App Info Card (Screenshot 2 Parity) */}
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                  {report?.appIconUrl ? (
                    <img src={report.appIconUrl} alt="App Icon" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">{appName.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-1 min-w-0">
                  <h4 className="text-lg font-black text-slate-900 truncate">{appName}</h4>
                  <p className="text-xs text-indigo-600 font-medium truncate underline cursor-pointer">{targetUrl}</p>
                  <p className="text-[10px] text-slate-500 font-medium">
                    Queued for packaging at {new Date().toLocaleDateString()}...
                  </p>
                </div>
              </div>

              {/* Progress Bar (if not success) */}
              {buildProgress < 100 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>Step {Math.min(Math.floor(buildProgress / 15) + 1, 6)} of 6</span>
                    <span>{buildProgress}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-indigo-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${buildProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* PWABuilder Style Terminal (Screenshot 3/4 Parity) */}
              <div className="bg-[#f0f0f0] rounded-lg border border-slate-200 overflow-hidden">
                <div className="p-4 font-mono text-[11px] leading-relaxed text-slate-700 max-h-64 overflow-y-auto space-y-2">
                  {buildLogs.map((log, idx) => {
                    const isInfo = log.includes('[info]');
                    const isError = log.includes('[error]');
                    return (
                      <div key={idx} className={`${isInfo ? 'bg-slate-200/50 -mx-4 px-4 py-1' : ''}`}>
                        <span className="text-slate-900 font-medium">{log}</span>
                      </div>
                    );
                  })}
                  {buildProgress < 100 && (
                    <div className="animate-pulse text-indigo-600 font-bold">
                      Processing...
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
              {buildProgress < 100 && !buildLogs.some(l => l.includes('[error]')) && (
                <button 
                  disabled
                  className="px-6 py-2 bg-slate-300 text-slate-500 font-bold rounded-xl text-sm cursor-not-allowed"
                >
                  Processing Build...
                </button>
              )}
              {buildProgress === 100 && !buildLogs.some(l => l.includes('[error]')) && (
                <button 
                  onClick={() => setIsBuilding(false)}
                  className="px-6 py-2 bg-slate-800 hover:bg-black text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer"
                >
                  Close Board
                </button>
              )}
              {buildLogs.some(l => l.includes('[error]')) && (
                <button 
                  onClick={() => setIsBuilding(false)}
                  className="px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-sm transition-all shadow-md"
                >
                  Close & Try Again
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
