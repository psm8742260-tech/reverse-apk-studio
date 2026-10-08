// 🎨 AI MASTER STUDIO - CENTRALIZED THEME & COLOR CONFIGURATION FILE
// 💡 తెలుగు వివరణ: ఈ ఫైల్ మన అప్లికేషన్‌లోని అన్ని బోర్డులు, ఫీచర్లు, బటన్లు మరియు UI భాగాలకు సంబంధించిన 
// రంగులు (Colors), థీమ్ సెట్టింగ్‌లు (Theme Settings) మరియు డిజైన్ కాన్ఫిగరేషన్‌లను ఒకే చోట కేంద్రీకరించి నిర్వహిస్తుంది.
// భవిష్యత్తులో మీరు ఎప్పుడైనా ఏ రంగునైనా మార్చాలనుకుంటే, ఈ ఒక్క ఫైల్‌లో మార్చడం ద్వారా మొత్తం యాప్‌లో వర్తిస్తుంది.

export const APP_THEME = {
  metadata: {
    name: "AI Master Studio Theme",
    version: "3.9.6",
    author: "ReverseAPK Studio Master Architect",
  },

  // 1. Global Backgrounds & Base Surfaces (గ్లోబల్ బ్యాక్‌గ్రౌండ్ మరియు సర్ఫేస్ రంగులు)
  surfaces: {
    primaryBackground: "#090d16", // Main dark canvas background
    secondaryBackground: "#0f172a", // Card & modal background
    tertiaryBackground: "#1e293b", // Hover & border container background
    glassOverlay: "rgba(15, 23, 42, 0.85)", // Glassmorphism backdrop
  },

  // 2. Typography & Text Colors (టెక్స్ట్ మరియు ఫాంట్ రంగులు)
  typography: {
    primaryText: "#f8fafc", // Pure white/light slate for main headers
    secondaryText: "#cbd5e1", // Subtitles and descriptions
    mutedText: "#64748b", // Muted logs and timestamps
    accentText: "#818cf8", // Highlighted terms and links
  },

  // 3. Board 1: Upload Board & File Manager (అప్‌లోడ్ బోర్డ్ & ఫైల్ మేనేజర్ రంగులు)
  uploadBoard: {
    border: "#334155",
    activeBorder: "#6366f1",
    background: "#0f172a",
    iconColor: "#818cf8",
    successBadge: "#10b981",
  },

  // 4. Board 2: White File Board & Workspace (వైట్ ఫైల్ బోర్డ్ & వర్క్‌స్పేస్ రంగులు)
  whiteFileBoard: {
    canvasBackground: "#090d16",
    cardBackground: "#1e293b",
    cardBorder: "#475569",
    activeCardGlow: "#4f46e5",
  },

  // 5. Board 3: Code Board / Monaco & Studio (కోడ్ బోర్డ్ & స్టూడియో రంగులు)
  codeBoard: {
    editorBackground: "#020617",
    lineNumberColor: "#475569",
    cursorColor: "#38bdf8",
    selectionBackground: "#1e1b4b",
  },

  // 6. Feature 1: Zip to APK Cloud Builder (జిప్ టూ ఏపికె క్లౌడ్ బిల్డర్)
  zipBuilder: {
    accentColor: "#6366f1",
    gradientStart: "#4f46e5",
    gradientEnd: "#10b981",
    terminalBackground: "#000000",
    terminalText: "#34d399",
  },

  // 7. Feature 2: Decompiler Workspace (డీకంపైలర్ వర్క్‌స్పేస్)
  decompiler: {
    primaryColor: "#0284c7",
    badgeBackground: "rgba(14, 165, 233, 0.15)",
    badgeText: "#38bdf8",
  },

  // 8. Feature 3: Self Fixer Studio (సెల్ఫ్-ఫిక్సర్ స్టూడియో)
  selfFixer: {
    primaryColor: "#f59e0b",
    borderGlow: "rgba(245, 158, 11, 0.3)",
    buttonBackground: "#d97706",
  },

  // 9. Feature 4: Visual App Studio (విజువల్ యాప్ స్టూడియో)
  visualStudio: {
    canvasGrid: "#1e293b",
    toolbarBackground: "#0f172a",
    elementBorder: "#6366f1",
  },

  // 10. Feature 5: Brahmastram AI Agents Hub (బ్రహ్మాస్త్రం 10 AI ఏజెంట్స్ హబ్)
  brahmastramAgents: {
    headerGradient: "from-indigo-950 via-slate-900 to-slate-950",
    agentCardBg: "#1e293b",
    agentBorder: "#4338ca",
    activeIndicator: "#22c55e",
  },

  // 11. Feature 6: Admin Panel & Staff Management (అడ్మిన్ ప్యానెల్ & మేనేజ్‌మెంట్)
  adminPanel: {
    sidebarBg: "#090d16",
    activeNavBg: "#312e81",
    tableHeaderBg: "#1e293b",
    dangerButtonBg: "#e11d48",
  },

  // 12. Feature 7: User Wallet & Payments (యూజర్ వాలెట్ & పేమెంట్స్)
  userWallet: {
    cardGradient: "from-emerald-900 to-slate-900",
    balanceColor: "#34d399",
    rechargeBtn: "#059669",
  },

  // 13. System Status & Badges (సిస్టమ్ స్టేటస్ మరియు బ్యాడ్జెస్)
  statusBadges: {
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },
};

export type AppThemeConfig = typeof APP_THEME;
