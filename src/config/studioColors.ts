/**
 * 🏛️ AI MASTER STUDIO - UNIVERSAL STUDIO COLORS & COLOR CODING CONFIGURATION
 * 
 * 💡 తెలుగు వివరణ:
 * అడ్మిన్ గారు! మన అప్లికేషన్‌లోని ప్రతి ఒక్క ఫీచర్, సబ్-ఫీచర్, బోర్డు మరియు బటన్‌కు సంబంధించిన 
 * సంపూర్ణ కలర్ కోడింగ్ (Backgrounds, Borders, Text, Accents, Gradients) అన్నీ ఈ ఒక్కే ఒక్క 
 * 'studioColors.ts' ఫైల్‌లో మాత్రమే కేంద్రీకృతమై ఉన్నాయి. 
 * ఎక్కడా కలర్స్ విడిగా లేవు. దీని నుండి వచ్చే సింగిల్ కనెక్షన్ బ్రిడ్జి ద్వారా మెయిన్ కనెక్షన్ సిస్టమ్‌కి లింక్ చేయబడింది.
 */

export interface StudioFeatureColorMapping {
  featureId: string;       // ఫీచర్ ఐడీ (Feature ID)
  featureName: string;     // ఫీచర్ పేరు (Feature Name)
  teluguName: string;      // 💡 తెలుగు పేరు (Telugu Name)
  category: string;        // కేటగిరీ (Category / Board Type)
  colors: {
    background: string;    // బ్యాక్‌గ్రౌండ్ కలర్ కోడ్ (Background Color)
    surface: string;       // సర్ఫేస్ / కార్డ్ కలర్ (Card Surface Color)
    border: string;        // బోర్డర్ కలర్ కోడ్ (Border Color)
    textPrimary: string;   // ప్రైమరీ టెక్స్ట్ కలర్ (Primary Text Color)
    textMuted: string;     // మ్యూటెడ్ టెక్స్ట్ కలర్ (Muted Text Color)
    accent: string;        // యాసెంట్ / హైలైట్ కలర్ (Accent Color)
    gradient: string;      // గ్రేడియంట్ స్టైల్ (Gradient Style)
  };
  buttons: Array<{
    buttonId: string;      // బటన్ ఐడీ (Button ID)
    buttonName: string;    // బటన్ పేరు (Button Name)
    teluguButtonName: string; // 💡 తెలుగు బటన్ పేరు (Telugu Button Name)
    action: string;        // యాక్షన్ టైప్ (Action Type)
    serverRoute: string;   // సర్వర్ రౌట్ లేదా కనెక్షన్ (Server Route / Endpoint)
    bgNormal: string;      // బటన్ నార్మల్ కలర్ (Button Normal BG)
    bgHover: string;       // బటన్ హోవర్ కలర్ (Button Hover BG)
    textColor: string;     // బటన్ టెక్స్ట్ కలర్ (Button Text Color)
  }>;
}

export const STUDIO_COLORS_CONFIG: StudioFeatureColorMapping[] = [
  {
    featureId: 'upload-board',
    featureName: 'Upload Board & ZIP Ingestion',
    teluguName: 'అప్‌లోడ్ బోర్డ్ మరియు జిప్ ఇన్‌జెక్షన్',
    category: 'Core Panel 1',
    colors: {
      background: '#070a12',
      surface: '#090d16',
      border: 'rgba(255, 255, 255, 0.1)',
      textPrimary: '#f8fafc',
      textMuted: '#94a3b8',
      accent: '#3b82f6',
      gradient: 'from-blue-600 to-indigo-600'
    },
    buttons: [
      {
        buttonId: 'upload-zip-btn',
        buttonName: 'Upload ZIP / APK File',
        teluguButtonName: 'జిప్ లేదా ఏపికె ఫైల్ అప్‌లోడ్ బటన్',
        action: 'handleFileUpload',
        serverRoute: '/api/app/build-zip-to-apk',
        bgNormal: '#3b82f6',
        bgHover: '#2563eb',
        textColor: '#ffffff'
      },
      {
        buttonId: 'url-analyze-btn',
        buttonName: 'Analyze Web URL / PWA',
        teluguButtonName: 'వెబ్ యుఆర్ఎల్ లేదా పిడబ్ల్యూఏ విశ్లేషణ బటన్',
        action: 'handleAnalyze',
        serverRoute: '/api/app/analyze',
        bgNormal: '#8b5cf6',
        bgHover: '#7c3aed',
        textColor: '#ffffff'
      }
    ]
  },
  {
    featureId: 'file-manager-board',
    featureName: 'File Manager & White Board',
    teluguName: 'ఫైల్ మేనేజర్ మరియు వైట్ ఫైల్ బోర్డ్',
    category: 'Core Panel 2',
    colors: {
      background: '#070a12',
      surface: '#0a0f1d',
      border: 'rgba(255, 255, 255, 0.15)',
      textPrimary: '#e2e8f0',
      textMuted: '#94a3b8',
      accent: '#10b981',
      gradient: 'from-emerald-500 to-teal-600'
    },
    buttons: [
      {
        buttonId: 'save-file-btn',
        buttonName: 'Save File to Disk',
        teluguButtonName: 'డిస్క్‌లో ఫైల్ సేవ్ చేసే బటన్',
        action: 'handleSaveFile',
        serverRoute: '/api/fs/write',
        bgNormal: '#10b981',
        bgHover: '#059669',
        textColor: '#ffffff'
      },
      {
        buttonId: 'syntax-check-btn',
        buttonName: 'Syntax Validator Check',
        teluguButtonName: 'సింటాక్స్ చెకింగ్ బటన్',
        action: 'validateSyntax',
        serverRoute: 'Client-side Syntax Validation',
        bgNormal: '#6366f1',
        bgHover: '#4f46e5',
        textColor: '#ffffff'
      }
    ]
  },
  {
    featureId: 'code-editor-board',
    featureName: 'Code Editor & AI Agent Board',
    teluguName: 'కోడ్ ఎడిటర్ మరియు ఏఐ ఏజెంట్ బోర్డ్',
    category: 'Core Panel 3',
    colors: {
      background: '#04060b',
      surface: '#080c16',
      border: 'rgba(236, 72, 153, 0.3)',
      textPrimary: '#ffffff',
      textMuted: '#cbd5e1',
      accent: '#ec4899',
      gradient: 'from-pink-500 to-rose-600'
    },
    buttons: [
      {
        buttonId: 'send-prompt-btn',
        buttonName: 'Send AI Prompt / Generate Code',
        teluguButtonName: 'ఏఐ ప్రాంప్ట్ పంపే బటన్ / కోడ్ జనరేషన్',
        action: 'handleSendMessage',
        serverRoute: '/api/ai/generate',
        bgNormal: '#ec4899',
        bgHover: '#db2777',
        textColor: '#ffffff'
      },
      {
        buttonId: 'apply-fix-btn',
        buttonName: 'Apply Code Fix / Live Write',
        teluguButtonName: 'కోడ్ ఫిక్స్ అప్లై చేసే బటన్',
        action: 'handleApplyCodeFix',
        serverRoute: '/api/fs/write',
        bgNormal: '#f59e0b',
        bgHover: '#d97706',
        textColor: '#ffffff'
      }
    ]
  },
  {
    featureId: 'admin-master-panel',
    featureName: 'Admin Master Panel & Invisible Scanner',
    teluguName: 'అడ్మిన్ మాస్టర్ ప్యానెల్ మరియు లైవ్ టెర్మినల్',
    category: 'Admin Studio',
    colors: {
      background: '#070a12',
      surface: '#090d16',
      border: 'rgba(245, 158, 11, 0.4)',
      textPrimary: '#fef3c7',
      textMuted: '#d1d5db',
      accent: '#f59e0b',
      gradient: 'from-amber-500 to-yellow-600'
    },
    buttons: [
      {
        buttonId: 'phrs-terminal-btn',
        buttonName: 'PHRS Crowd Terminal Bridge',
        teluguButtonName: 'PHRS క్రౌడ్ సర్వర్ టెర్మినల్ బ్రిడ్జి బటన్',
        action: 'executePhrsTerminalCommand',
        serverRoute: '/api/phrs/terminal',
        bgNormal: '#f59e0b',
        bgHover: '#d97706',
        textColor: '#000000'
      },
      {
        buttonId: 'ai-health-btn',
        buttonName: 'Check AI & Server Health',
        teluguButtonName: 'AI మరియు సర్వర్ హెల్త్ చెక్ బటన్',
        action: 'checkAiHealth',
        serverRoute: '/api/health/ai',
        bgNormal: '#10b981',
        bgHover: '#059669',
        textColor: '#ffffff'
      }
    ]
  },
  {
    featureId: 'decompiler-workspace',
    featureName: 'Decompiler Workspace & Vault',
    teluguName: 'డీకంపైలర్ వర్క్‌స్పేస్ మరియు వాల్ట్',
    category: 'Decompiler Studio',
    colors: {
      background: '#070a12',
      surface: '#0b101d',
      border: 'rgba(59, 130, 246, 0.3)',
      textPrimary: '#f1f5f9',
      textMuted: '#94a3b8',
      accent: '#3b82f6',
      gradient: 'from-blue-500 to-cyan-600'
    },
    buttons: [
      {
        buttonId: 'decompile-apk-btn',
        buttonName: 'Decompile APK / DEX',
        teluguButtonName: 'APK / DEX డీకంపైల్ బటన్',
        action: 'decompileApk',
        serverRoute: '/api/vault/save',
        bgNormal: '#3b82f6',
        bgHover: '#2563eb',
        textColor: '#ffffff'
      }
    ]
  },
  {
    featureId: 'cloud-convert-studio',
    featureName: 'Cloud Convert Studio',
    teluguName: 'క్లౌడ్ కన్వర్ట్ స్టూడియో',
    category: 'Converter Studio',
    colors: {
      background: '#070a12',
      surface: '#0a0f1d',
      border: 'rgba(168, 85, 247, 0.3)',
      textPrimary: '#f3e8ff',
      textMuted: '#a855f7',
      accent: '#a855f7',
      gradient: 'from-purple-500 to-indigo-600'
    },
    buttons: [
      {
        buttonId: 'apply-manifest-btn',
        buttonName: 'Apply to manifest.json',
        teluguButtonName: 'మేనిఫెస్ట్ ఐకాన్ అప్లై బటన్',
        action: 'handleApplyToManifest',
        serverRoute: '/api/update-manifest-icon',
        bgNormal: '#a855f7',
        bgHover: '#9333ea',
        textColor: '#ffffff'
      }
    ]
  },
  {
    featureId: 'exposing-qr',
    featureName: 'Exposing QR & Share Hub',
    teluguName: 'ఎక్స్‌పోజింగ్ క్యూఆర్ మరియు షేర్ హబ్',
    category: 'Sharing Studio',
    colors: {
      background: '#070a12',
      surface: '#090d16',
      border: 'rgba(239, 68, 68, 0.3)',
      textPrimary: '#fee2e2',
      textMuted: '#f87171',
      accent: '#ef4444',
      gradient: 'from-red-500 to-rose-600'
    },
    buttons: [
      {
        buttonId: 'generate-qr-btn',
        buttonName: 'Generate Short Share URL',
        teluguButtonName: 'షార్ట్ షేర్ యుఆర్ఎల్ క్రియేట్ బటన్',
        action: 'createShortUrl',
        serverRoute: '/api/exposing/share',
        bgNormal: '#ef4444',
        bgHover: '#dc2626',
        textColor: '#ffffff'
      }
    ]
  },
  {
    featureId: 'icons8-glass-view',
    featureName: 'Icons8 Glass View & Market',
    teluguName: 'ఐకాన్స్ ఎయిట్ గ్లాస్ వ్యూ మరియు మార్కెట్',
    category: 'Design Studio',
    colors: {
      background: '#070a12',
      surface: '#0b111f',
      border: 'rgba(14, 165, 233, 0.3)',
      textPrimary: '#e0f2fe',
      textMuted: '#38bdf8',
      accent: '#0ea5e9',
      gradient: 'from-sky-400 to-blue-600'
    },
    buttons: [
      {
        buttonId: 'upload-icon-market-btn',
        buttonName: 'Upload Custom Glass Icon',
        teluguButtonName: 'కస్టమ్ గ్లాస్ ఐకాన్ అప్‌లోడ్ బటన్',
        action: 'uploadMarketIcon',
        serverRoute: '/api/market/upload-icon',
        bgNormal: '#0ea5e9',
        bgHover: '#0284c7',
        textColor: '#ffffff'
      }
    ]
  }
];

/**
 * 🔗 1. మెయిన్ కనెక్షన్ ఫైల్‌కు సింగిల్ కలర్ బ్రిడ్జి కనెక్షన్ (Single Colors Connection Bridge)
 * 💡 తెలుగు వివరణ:
 * ఈ కలర్స్ ఫైల్ నుండి కేవలం ఒకే ఒక సింగిల్ కనెక్షన్ ద్వారా మెయిన్ కనెక్షన్ ఫైల్ (studioConnections.ts) కి డేటా వెళ్తుంది.
 */
export function getStudioColorsConnectionBridge() {
  return STUDIO_COLORS_CONFIG.map(feature => ({
    featureId: feature.featureId,
    featureName: feature.featureName,
    teluguName: feature.teluguName,
    themeAccentColor: feature.colors.accent,
    connectionEndpoints: feature.buttons.map(b => b.serverRoute)
  }));
}

export default STUDIO_COLORS_CONFIG;
