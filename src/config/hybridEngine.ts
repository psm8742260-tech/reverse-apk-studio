/**
 * ⚡ AI MASTER STUDIO - DEDICATED HYBRID LIVE ENGINE (హైబ్రిడ్ లైవ్ ఇంజిన్)
 * 
 * అడ్మిన్ గారు! మనం ఏ కోడ్ మార్పు లేదా కొత్త ఫీచర్ తయారు చేసినా, 
 * యూజర్ లేదా మీరు పేజీని ఒక్కసారి రీలోడ్ (Refresh) చేసిన మరుక్షణమే 
 * పాత క్యాష్‌ను తరిమేసి, సరికొత్త కోడ్‌ను లైవ్‌గా లోడ్ చేసే ప్రత్యేకమైన హైబ్రిడ్ ఇంజిన్ ఇది.
 */

import { APP_VERSION, SW_CACHE_NAME, MAIN_CACHE_KEY } from '../version';

export interface HybridEngineConfig {
  mode: string;
  isHybridActive: boolean;
  isFullAppHybridCore: boolean;
  networkFirstPolicy: boolean;
  appVersion: string;
  swCacheName: string;
  mainCacheKey: string;
  networkTimeoutMs: number;
  activeModules: Record<string, boolean>;
}

export const HYBRID_ENGINE: HybridEngineConfig = {
  mode: 'UNIVERSAL_FULL_APP_HYBRID_CORE',
  isHybridActive: true,
  isFullAppHybridCore: true,
  networkFirstPolicy: true,
  appVersion: APP_VERSION,
  swCacheName: SW_CACHE_NAME,
  mainCacheKey: MAIN_CACHE_KEY,
  networkTimeoutMs: 1500, // 1.5 seconds network-first timeout with cache fallback
  activeModules: {
    decompilerWorkspace: true,
    normalAppStudio: true,
    reverseEngineeringStudio: true,
    visualBuilder: true,
    zipToApkBuilder: true,
    urlToAppBuilder: true,
    adminMasterPanel: true,
    aiLiteModeTokenSaver: true,
    pwaAutoUpdateEngine: true,
    cloudSyncService: true,
    codeEditorCore: true,
    fileManagerBoard: true,
    uploadEngine: true,
    selfFixerAiEngine: true,
    phrsCloudTerminal: true,
    androidPackagerEngine: true,
    apkUnpackerEngine: true,
    mobilePreviewEngine: true,
    deepseekFixEngine: true,
    geminiEngine: true,
  }
};

/**
 * 🛰️ isHybridEngineOperational
 * అడ్మిన్ గారి ఆలోచన: ఇంజిన్ రియల్-టైమ్‌లో లైవ్‌లో ఉంటేనే 5 కలర్స్ కనిపించాలి!
 * ఇంజిన్ పనిచేయకపోతే (Offline / Inactive / Down) false రిటర్న్ చేస్తుంది.
 */
export function isHybridEngineOperational(): boolean {
  try {
    if (!HYBRID_ENGINE.isHybridActive) return false;
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      if (navigator.onLine === false) return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * 🚀 runHybridLiveCheck
 * పేజీ లోడ్ లేదా రీలోడ్ అయిన ప్రతిసారీ స్వయంచాలకంగా అమలవుతుంది.
 * వెర్షన్ మారినట్లు గుర్తిస్తే తక్షణమే పాత బ్రౌజర్ క్యాష్‌లను క్లియర్ చేసి కొత్త ఫైల్స్ లోడ్ చేస్తుంది.
 */
export function runHybridLiveCheck(): void {
  try {
    if (typeof window === 'undefined') return;

    const storedVer = localStorage.getItem(HYBRID_ENGINE.mainCacheKey);

    // వెర్షన్ మారినట్లు గుర్తిస్తే పాత క్యాష్ మొత్తం క్లీన్ చేసి ఫ్రెష్ అప్‌డేట్ ఇస్తుంది
    if (storedVer && storedVer !== HYBRID_ENGINE.appVersion) {
      console.log(`⚡ [Hybrid Engine] Version upgrade detected: ${storedVer} -> ${HYBRID_ENGINE.appVersion}`);
      
      if ('caches' in window) {
        caches.keys().then((names) => {
          return Promise.all(
            names.map((name) => {
              if (name !== HYBRID_ENGINE.swCacheName) {
                console.log(`🧹 [Hybrid Engine] Evicting stale cache: ${name}`);
                return caches.delete(name);
              }
            })
          );
        }).catch(() => {});
      }

      // సర్వీస్ వర్కర్‌కు తక్షణ skipWaiting మెసేజ్ పంపిస్తుంది
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
      }
    }

    // తాజా వెర్షన్‌ను స్టోరేజ్‌లో భద్రపరుస్తుంది
    localStorage.setItem(HYBRID_ENGINE.mainCacheKey, HYBRID_ENGINE.appVersion);
  } catch (err: any) {
    console.warn('⚠️ [Hybrid Engine Check Note]:', err?.message || err);
  }
}
