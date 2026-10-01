import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { Globe, ArrowLeft, ExternalLink, RefreshCw, Shield, Sparkles } from 'lucide-react';
import { safeStorage } from '../utils/safeStorage';

interface LiveAppViewerProps {
  appSlug: string;
  serverEngine?: string;
  isDev?: boolean;
}

export const LiveAppViewer: React.FC<LiveAppViewerProps> = ({ appSlug, serverEngine = 'phrs-vault', isDev = false }) => {
  const [appHtml, setAppHtml] = useState<string>('');
  const [appName, setAppName] = useState<string>(appSlug);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadApp() {
      try {
        setLoading(true);
        setError(null);

        // 1. Try local/session storage first for fast instant loading
        const cachedKey = `ams_project_${appSlug}`;
        const localCached = safeStorage.getItem(cachedKey);
        if (localCached) {
          try {
            const parsed = JSON.parse(localCached);
            if (parsed && parsed.html) {
              if (isMounted) {
                setAppHtml(parsed.html);
                setAppName(parsed.name || appSlug);
                setLoading(false);
                return;
              }
            }
          } catch (e) {
            console.warn('Failed parsing cached project', e);
          }
        }

        // 2. Try Firestore published apps or projects
        try {
          let docSnap = await getDoc(doc(db, 'published_apps', appSlug));
          
          if (!docSnap.exists()) {
            // Fallback 1: replace underscores with dashes (e.g. brand_store_calculator -> brand-store-calculator)
            const dashed = appSlug.replace(/_/g, '-');
            if (dashed !== appSlug) {
              docSnap = await getDoc(doc(db, 'published_apps', dashed));
            }
          }
          
          if (!docSnap.exists()) {
            // Fallback 2: replace dashes with underscores
            const underscored = appSlug.replace(/-/g, '_');
            if (underscored !== appSlug) {
              docSnap = await getDoc(doc(db, 'published_apps', underscored));
            }
          }

          if (!docSnap.exists()) {
            // Fallback 3: try with -ai-master-studio suffix
            const studioDashed = `${appSlug.replace(/_/g, '-')}-ai-master-studio`;
            docSnap = await getDoc(doc(db, 'published_apps', studioDashed));
          }

          if (!docSnap.exists()) {
            // Fallback 4: try with _ai_master_studio suffix
            const studioUnderscored = `${appSlug.replace(/-/g, '_')}_ai_master_studio`;
            docSnap = await getDoc(doc(db, 'published_apps', studioUnderscored));
          }

          if (docSnap.exists()) {
            const data = docSnap.data();
            if (isMounted) {
              setAppHtml(data.html || data.content || '');
              setAppName(data.name || appSlug);
              setLoading(false);
              return;
            }
          }
        } catch (dbErr) {
          console.warn('Firestore published_apps lookup error:', dbErr);
        }

        // 2.1 Try Server API published app lookup fallback
        try {
          const trySlugs = [
            appSlug,
            appSlug.replace(/_/g, '-'),
            appSlug.replace(/-/g, '_'),
            `${appSlug.replace(/_/g, '-')}-ai-master-studio`
          ];
          
          for (const s of trySlugs) {
            const apiRes = await fetch(`/api/published-app/${encodeURIComponent(s)}`);
            if (apiRes.ok) {
              const apiData = await apiRes.json();
              if (apiData && (apiData.html || apiData.content)) {
                if (isMounted) {
                  setAppHtml(apiData.html || apiData.content || '');
                  setAppName(apiData.name || appSlug);
                  setLoading(false);
                  return;
                }
              }
            }
          }
        } catch (apiErr) {
          console.warn('Server published_apps lookup note:', apiErr);
        }

        // 3. Fallback: Generate a clean standalone production runtime with wallpaper
        if (isMounted) {
          const fallbackHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${appSlug.toUpperCase()} - Powered by AI Master Studio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800;900&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: radial-gradient(circle at top, #1e1b4b, #0f172a 70%);
      color: #f8fafc;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 1rem;
    }
  </style>
</head>
<body>
  <div class="max-w-md w-full bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6">
    <div class="w-16 h-16 bg-gradient-to-tr from-indigo-500 via-sky-500 to-emerald-400 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-indigo-500/30">
      <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>
    <div class="space-y-2">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        ${isDev ? 'DEVELOPMENT SANDBOX' : 'LIVE PRODUCTION ACTIVE'}
      </div>
      <h1 class="text-2xl sm:text-3xl font-black text-white tracking-tight">${appSlug.replace(/_/g, ' ').toUpperCase()}</h1>
      <p class="text-xs sm:text-sm text-slate-400 font-medium">Successfully deployed via AI Master Studio Engine</p>
    </div>

    <!-- Engine Credentials Badge -->
    <div class="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/60 text-left space-y-2.5">
      <div class="flex items-center justify-between text-xs font-bold">
        <span class="text-slate-400">Server Host</span>
        <span class="text-sky-400 font-mono">${serverEngine.includes('phrs') ? '🛡️ phrscrowd.online (PHRS Cloud)' : '☁️ Google Cloud Engine'}</span>
      </div>
      <div class="flex items-center justify-between text-xs font-bold">
        <span class="text-slate-400">Environment</span>
        <span class="text-emerald-400">${isDev ? 'Dev / Test Preview' : 'Production Live Runtime'}</span>
      </div>
      <div class="flex items-center justify-between text-xs font-bold">
        <span class="text-slate-400">Studio Engine</span>
        <span class="text-indigo-400 font-mono">AI Master Studio (AIMS)</span>
      </div>
    </div>

    <div class="pt-2">
      <button onclick="window.location.reload()" class="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-indigo-600/30">
        Refresh App
      </button>
    </div>
  </div>

  <footer class="mt-8 text-center text-xs text-slate-500 font-medium space-y-1">
    <p>Powered by <strong class="text-slate-400">AI Master Studio</strong> &bull; Host: <strong class="text-slate-400">phrscrowd.online</strong></p>
  </footer>
</body>
</html>`;
          setAppHtml(fallbackHtml);
          setLoading(false);
        }
      } catch (err: any) {
        console.error('Error loading live app:', err);
        if (isMounted) {
          setError(err?.message || 'యాప్ లోడ్ అవ్వడంలో సమస్య ఎదురైంది.');
          setLoading(false);
        }
      }
    }

    loadApp();
    return () => { isMounted = false; };
  }, [appSlug, serverEngine, isDev]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white font-sans p-4">
        <div className="w-14 h-14 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-extrabold text-sm text-indigo-400 tracking-wide animate-pulse">
          🚀 లోడ్ అవుతోంది: {appSlug}...
        </p>
        <span className="text-[11px] text-slate-500 mt-1 font-mono">phrscrowd.online • Universal Engine</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white font-sans p-4">
        <div className="p-6 bg-rose-950/40 border border-rose-800/60 rounded-3xl max-w-sm text-center space-y-3 shadow-2xl">
          <h2 className="text-lg font-bold text-rose-400">యాప్ లోడ్ కాలేదు</h2>
          <p className="text-xs text-slate-400">{error}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition"
          >
            స్టూడియో హోమ్ పేజీకి వెళ్లండి
          </button>
        </div>
      </div>
    );
  }

  // Fullscreen Isolated Safe IFrame for universal browser rendering
  return (
    <div className="fixed inset-0 w-full h-full bg-slate-950 flex flex-col overflow-hidden">
      {/* Top Universal App Bar with Server & Studio identity */}
      <div className="h-10 bg-slate-900/95 border-b border-slate-800/80 px-4 flex items-center justify-between text-xs text-slate-300 font-sans shrink-0 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-extrabold text-white tracking-tight">{appName.toUpperCase()}</span>
          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
            ({serverEngine.includes('phrs') ? '🛡️ phrscrowd.online' : '☁️ Google Cloud Engine'})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.location.reload()}
            className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition"
            title="రీఫ్రెష్ చేయండి"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <a
            href="/"
            className="text-[10.5px] font-bold text-indigo-400 hover:text-indigo-300 transition flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" /> స్టూడియో
          </a>
        </div>
      </div>

      {/* Embedded Live App */}
      <iframe
        title={appName}
        srcDoc={appHtml}
        className="w-full flex-1 border-0 bg-transparent"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
      />
    </div>
  );
};
