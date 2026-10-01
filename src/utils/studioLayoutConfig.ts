/**
 * 🏛️ AI MASTER STUDIO - CENTRALIZED BOARDS & LAYOUT CONFIGURATION
 * 
 * అడ్మిన్ గారు! మన ఏ ఐ మాస్టర్ స్టూడియో లోని ప్రతి ఒక్క చిన్న మరియు పెద్ద బోర్డు యొక్క సైజు, 
 * ఐకాన్ మరియు దాని లోపల ఉండాల్సిన అక్షరాలను ఒకే చోట నిర్వహించడానికి ఈ ఫైల్ సృష్టించబడింది.
 * 
 * ప్రతి బోర్డు కాన్ఫిగరేషన్ పైన కోడింగ్ రూపంలో ఉండి, దానికి ఖచ్చితంగా కిందనే దాని తెలుగు వివరణ (Telugu Guide) 
 * మరియు ప్రతి ఇంగ్లీష్ పదానికి విడివిడిగా తెలుగు అర్థాలు (English to Telugu Dictionary Breakdown) ఇవ్వబడ్డాయి.
 */

export interface BoardConfig {
  id: string;
  size: 'small' | 'medium' | 'large' | 'full';
  gridSpan: string; // Tailwind గ్రిడ్ కాలమ్ సైజును నియంత్రించడానికి (e.g., col-span-1, col-span-3)
  icon: string; // బోర్డు పైన కనిపించే ఐకాన్
  title: string; // బోర్డు యొక్క ప్రధాన అక్షరాలు
  description: string; // బోర్డు కింద ఉండే వివరణ అక్షరాలు
}

// ==========================================
// 1. 🛡️ ప్రధాన మాస్టర్ బోర్డుల కాన్ఫిగరేషన్ (Core Main Dashboards)
// ==========================================
export const STUDIO_BOARDS_CONFIG: Record<string, BoardConfig> = {
  decompiler_board: {
    id: 'decompiler-workspace-board',
    size: 'medium',
    gridSpan: 'col-span-1 lg:col-span-4',
    icon: '📂',
    title: 'Decompiler & Unpacker Board',
    description: 'Reverse engineer APK, ZIP, or AAB files and unpack source assets.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id' లైన్ వివరణ (దీనికి ఎట్ల ఉండాలి?):
  //     - 'id' అనే ఇంగ్లీష్ పదానికి అర్థం: "ఐడెంటిటీ/గుర్తింపు పేరు".
  //     - 'decompiler-workspace-board' అనేది సిస్టమ్ కోసం వాడే ఐడీ.
  //     - రూల్ (ఎట్ల ఉండాలి?): దీనిని మీరు అస్సలు మార్చకూడదు, మారిస్తే బటన్స్ సరిగ్గా పని చేయవు.
  // 
  // 2️⃣ 'size' లైన్ వివరణ (దీనికి ఎట్ల ఉండాలి?):
  //     - 'size' అనే ఇంగ్లీష్ పదానికి అర్థం: "పరిమాణము/సైజు".
  //     - 'medium' అనే పదానికి అర్థం: "మధ్యస్థ సైజు".
  //     - రూల్ (ఎట్ల ఉండాలి?): ఇక్కడ మీకు బోర్డు సైజు మార్చాలనిపిస్తే 'small', 'medium', 'large' లేదా 'full' అని మార్చుకోవచ్చు.
  // 
  // 3️⃣ 'gridSpan' లైన్ వివరణ (దీనికి ఎట్ల ఉండాలి?):
  //     - 'gridSpan' అనే ఇంగ్లీష్ పదానికి అర్థం: "స్క్రీన్ వెడల్పు కొలత".
  //     - రూల్ (ఎట్ల ఉండాలి?): డిజైన్ పాడవకుండా ఉండటానికి దీనిని మార్చకపోవడం చాలా మంచిది.
  // 
  // 4️⃣ 'icon' లైన్ వివరణ (దీనికి ఎట్ల ఉండాలి?):
  //     - 'icon' అనే ఇంగ్లీష్ పదానికి అర్థం: "చిన్న బొమ్మ/గుర్తు".
  //     - '📂' అనేది ఫోల్డర్ ఎమోజీ.
  //     - రూల్ (ఎట్ల ఉండాలి?): ఈ ఎమోజీ స్థానంలో మీకు నచ్చిన ఏదైనా కీబోర్డ్ ఎమోజీని మార్చుకోవచ్చు.
  // 
  // 5️⃣ 'title' లైన్ వివరణ (దీనికి ఎట్ల ఉండాలి?):
  //     - 'title' అనే ఇంగ్లీష్ పదానికి అర్థం: "మెయిన్ హెడింగ్/శీర్షిక".
  //     - 'Decompiler & Unpacker Board' అంటే "డీకంపైలర్ మరియు అన్‌ప్యాకర్ బోర్డు".
  //     - రూల్ (ఎట్ల ఉండాలి?): ఈ కొటేషన్ల (' ') మధ్యలో ఉన్న టెక్స్ట్‌ను మీకు నచ్చిన విధంగా మార్చుకోవచ్చు.
  // 
  // 6️⃣ 'description' లైన్ వివరణ (దీనికి ఎట్ల ఉండాలి?):
  //     - 'description' అనే ఇంగ్లీష్ పదానికి అర్థం: "చిన్న వివరణ టెక్స్ట్".
  //     - 'Reverse engineer APK, ZIP, or AAB...' అంటే "ఏపికె లేదా జిప్ ఫైళ్లను అన్‌ప్యాక్ చేయడానికి" అని అర్థం.
  //     - రూల్ (ఎట్ల ఉండాలి?): ఈ కొటేషన్ల మధ్యలో ఉన్న టెక్స్ట్‌ను మీకు నచ్చిన ఏ వివరణగానైనా మార్చుకోవచ్చు.

  code_editor_board: {
    id: 'code-editor-inspector-board',
    size: 'large',
    gridSpan: 'col-span-1 lg:col-span-8',
    icon: '💻',
    title: 'Code Editor & Inspector Suite',
    description: 'Directly modify HTML, CSS, Javascript, and config XML source codes.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id' లైన్ వివరణ: 'code-editor-inspector-board' అనేది కోడ్ ఎడిటర్ బోర్డు ఐడీ పేరు (మార్చకండి).
  // 2️⃣ 'size' లైన్ వివరణ: 'large' అంటే "పెద్ద పరిమాణం" (స్క్రీన్ మధ్యలో పెద్దగా కనిపించడానికి).
  // 3️⃣ 'icon' లైన్ వివరణ: '💻' అనేది కంప్యూటర్ ఐకాన్.
  // 4️⃣ 'title' లైన్ వివరణ: 'Code Editor & Inspector Suite' అంటే "కోడ్ ఎడిటర్ మరియు ఇన్‌స్పెక్టర్ డ్యాష్‌బోర్డు". మీకు నచ్చిన హెడింగ్ ఇక్కడ మార్చుకోవచ్చు.
  // 5️⃣ 'description' లైన్ వివరణ: 'Directly modify HTML, CSS...' అంటే "నేరుగా హెచ్‌టిఎమ్‌ఎల్ మరియు సిఎస్ఎస్ ఫైళ్లను సవరించుకోవడానికి".

  live_preview_board: {
    id: 'live-app-simulator-board',
    size: 'large',
    gridSpan: 'col-span-1 lg:col-span-6',
    icon: '📱',
    title: 'Live Responsive Device Simulator',
    description: 'Real-time responsive viewport for testing web assets on various screens.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id' లైన్ వివరణ: 'live-app-simulator-board' అనేది ప్రివ్యూ బోర్డు యొక్క ఐడీ (మార్చకండి).
  // 2️⃣ 'size' లైన్ వివరణ: 'large' అంటే "పెద్ద సైజు".
  // 3️⃣ 'icon' లైన్ వివరణ: '📱' అనేది మొబైల్ ఐకాన్.
  // 4️⃣ 'title' లైన్ వివరణ: 'Live Responsive Device Simulator' అంటే "లైవ్ రెస్పాన్సివ్ మొబైల్ సిమ్యులేటర్".
  // 5️⃣ 'description' లైన్ వివరణ: 'Real-time responsive viewport...' అంటే "వివిధ ఫోన్ స్క్రీన్ లలో లైవ్‌గా వెబ్‌సైట్‌ను టెస్టింగ్ చేయడానికి".

  ai_assistant_board: {
    id: 'brahmastram-ai-chat-board',
    size: 'medium',
    gridSpan: 'col-span-1 lg:col-span-6',
    icon: '🤖',
    title: 'Brahmastram AI Assistant Board',
    description: 'Generate source codes, repair Javascript, and improve layouts with Gemini.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id' లైన్ వివరణ: 'brahmastram-ai-chat-board' అనేది బ్రహ్మాస్త్రం ఏఐ చాట్ బోర్డు ఐడీ (మార్చకండి).
  // 2️⃣ 'icon' లైన్ వివరణ: '🤖' అనేది రోబోట్ ఐకాన్.
  // 3️⃣ 'title' లైన్ వివరణ: 'Brahmastram AI Assistant Board' అంటే "బ్రహ్మాస్త్రం ఏఐ అసిస్టెంట్ బోర్డు".
  // 4️⃣ 'description' లైన్ వివరణ: 'Generate source codes, repair...' అంటే "కొత్త కోడ్ తయారు చేయడానికి మరియు జావాస్క్రిప్ట్ లోపాలను ఏఐ ద్వారా సరిచేయడానికి".

  self_fixer_board: {
    id: 'self-fixer-master-repair-board',
    size: 'large',
    gridSpan: 'col-span-1 lg:col-span-12',
    icon: '⚡',
    title: 'AI Master Code Repair & Diagnostics',
    description: 'Automatic syntax analysis, white-screen crash prevention, and direct source fixing.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id' లైన్ వివరణ: 'self-fixer-master-repair-board' అనేది సెల్ఫ్-ఫిక్సర్ రిపేర్ బోర్డు ఐడీ.
  // 2️⃣ 'gridSpan' లైన్ వివరణ: 'col-span-12' అంటే స్క్రీన్ మొత్తాన్ని ఆక్రమించే పూర్తి వెడల్పు.
  // 3️⃣ 'icon' లైన్ వివరణ: '⚡' అనేది కరెంట్ షాక్/స్పీడ్ ఐకాన్.
  // 4️⃣ 'title' లైన్ వివరణ: 'AI Master Code Repair & Diagnostics' అంటే "ఏఐ మాస్టర్ కోడ్ రిపేర్ మరియు డయాగ్నోస్టిక్స్ బోర్డు".
  // 5️⃣ 'description' లైన్ వివరణ: 'Automatic syntax analysis...' అంటే "స్వయంచాలకంగా లోపాలను వెతికి వైట్ స్క్రీన్ రాకుండా రక్షించే సిస్టమ్".

  visual_builder_board: {
    id: 'visual-drag-drop-editor-board',
    size: 'full',
    gridSpan: 'col-span-1 lg:col-span-12',
    icon: '💎',
    title: 'Live Visual Drag-and-Drop Editor Workspace',
    description: 'Drag, edit, and style UI elements visually with live synchronization with source code.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id' లైన్ వివరణ: 'visual-drag-drop-editor-board' అనేది విజువల్ ఎడిటర్ బోర్డు ఐడీ.
  // 2️⃣ 'icon' లైన్ వివరణ: '💎' అనేది డైమండ్ ఐకాన్.
  // 3️⃣ 'title' లైన్ వివరణ: 'Live Visual Drag-and-Drop Editor Workspace' అంటే "లైవ్ విజువల్ డ్రాగ్ అండ్ డ్రాప్ ఎడిటర్ బోర్డు".

  pwa_builder_board: {
    id: 'pwa-manifest-builder-board',
    size: 'small',
    gridSpan: 'col-span-1 lg:col-span-3',
    icon: '🌐',
    title: 'PWA Web Builder & Manifest Configurator',
    description: 'Export clean progressive web apps with custom icons, theme colors, and worker files.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id' లైన్ వివరణ: 'pwa-manifest-builder-board' అనేది పీడబ్ల్యూఏ బిల్డర్ ఐడీ.
  // 2️⃣ 'icon' లైన్ వివరణ: '🌐' అనేది గ్లోబ్/వెబ్ ఐకాన్.
  // 3️⃣ 'title' లైన్ వివరణ: 'PWA Web Builder & Manifest Configurator' అంటే "పీడబ్ల్యూఏ వెబ్ బిల్డర్ మరియు మెనిఫెస్ట్ బోర్డు".

  staff_management_board: {
    id: 'staff-access-control-board',
    size: 'medium',
    gridSpan: 'col-span-1 lg:col-span-6',
    icon: '👥',
    title: 'Staff Access Slots & Supervisory Panel',
    description: 'Control managers, supervisors, and administrative operational permissions.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id' లైన్ వివరణ: 'staff-access-control-board' అనేది స్టాఫ్ ప్యానెల్ ఐడీ.
  // 2️⃣ 'icon' లైన్ వివరణ: '👥' అనేది గ్రూప్ మనుషుల ఐకాన్.
  // 3️⃣ 'title' లైన్ వివరణ: 'Staff Access Slots & Supervisory Panel' అంటే "సిబ్బంది యాక్సెస్ పర్మిషన్లు మరియు సూపర్వైజర్ ప్యానెల్".

  user_wallet_board: {
    id: 'user-credits-recharge-board',
    size: 'medium',
    gridSpan: 'col-span-1 lg:col-span-6',
    icon: '👛',
    title: 'Client Wallet Credits & Billing Logs',
    description: 'Track client recharge values, usage histories, and secure wallet deductions.'
  }
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id' లైన్ వివరణ: 'user-credits-recharge-board' అనేది రీఛార్జ్ వాలెట్ బోర్డు ఐడీ.
  // 2️⃣ 'icon' లైన్ వివరణ: '👛' అనేది పర్స్/వాలెట్ ఐకాన్.
  // 3️⃣ 'title' లైన్ వివరణ: 'Client Wallet Credits & Billing Logs' అంటే "క్లయింట్ వాలెట్ క్రెడిట్స్ మరియు బిల్లింగ్ బోర్డు".
};

// ==========================================
// 2. 📂 రివర్స్ ఇంజనీరింగ్ సబ్-బోర్డులు (Reverse Engineering Sub-Panels)
// ==========================================
export const RE_STUDIO_BOARDS_CONFIG: Record<string, BoardConfig> = {
  file_tree_board: {
    id: 're-file-tree-sidebar-board',
    size: 'small',
    gridSpan: 'col-span-1 lg:col-span-3',
    icon: '🌳',
    title: 'Project Files Structure',
    description: 'Visual recursive tree structure of extracted APK or ZIP directories.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id' లైన్ వివరణ: 're-file-tree-sidebar-board' అనేది ప్రాజెక్ట్ ఫైల్ ట్రీ ఫోల్డర్ల బోర్డు ఐడీ.
  // 2️⃣ 'icon' లైన్ వివరణ: '🌳' అనేది చెట్టు ఎమోజీ (ట్రీ స్ట్రక్చర్‌ను సూచిస్తుంది).
  // 3️⃣ 'title' లైన్ వివరణ: 'Project Files Structure' అంటే "ప్రాజెక్ట్ ఫైళ్ల నిర్మాణం".
  // 4️⃣ 'description' లైన్ వివరణ: 'Visual recursive tree structure...' అంటే "ఎక్స్‌ట్రాక్ట్ అయిన ఫైళ్లను ఫోల్డర్ల రూపంలో చూపించే బోర్డు".

  drag_drop_board: {
    id: 're-upload-dropzone-board',
    size: 'small',
    gridSpan: 'col-span-1 lg:col-span-12',
    icon: '📥',
    title: 'Drag & Drop Workspace Dropzone',
    description: 'Direct interactive file upload drag area with client-side ZIP/APK reader.'
  }
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id' లైన్ వివరణ: 're-upload-dropzone-board' అనేది ఫైల్ లాగి అప్‌లోడ్ చేసే జోన్ ఐడీ.
  // 2️⃣ 'icon' లైన్ వివరణ: '📥' అనేది ఇన్ బాక్స్ డౌన్‌లోడ్ ఎమోజీ.
  // 3️⃣ 'title' లైన్ వివరణ: 'Drag & Drop Workspace Dropzone' అంటే "ఫైల్స్ లాగి అప్‌లోడ్ చేసే వర్క్‌స్పేస్ జోన్".
};

// ==========================================
// 3. 📱 నార్మల్ స్టూడియో సబ్-బోర్డులు (Normal Studio Viewports & Controls)
// ==========================================
export const NORMAL_STUDIO_BOARDS_CONFIG: Record<string, BoardConfig> = {
  simulator_iframe_board: {
    id: 'normal-simulator-iframe-container-board',
    size: 'large',
    gridSpan: 'col-span-1 lg:col-span-8',
    icon: '📺',
    title: 'Iframe Web Simulator Viewport',
    description: 'Real-time isolated sandbox viewport that executes index.html blob URLs securely.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id' లైన్ వివరణ: 'normal-simulator-iframe-container-board' అనేది ఐఫ్రేమ్ లోడ్ అయ్యే బోర్డు ఐడీ.
  // 2️⃣ 'icon' లైన్ వివరణ: '📺' అనేది టీవీ/స్క్రీన్ ఎమోజీ.
  // 3️⃣ 'title' లైన్ వివరణ: 'Iframe Web Simulator Viewport' అంటే "మొబైల్ ఐఫ్రేమ్ వెబ్ సిమ్యులేటర్ స్క్రీన్".
  // 4️⃣ 'description' లైన్ వివరణ: 'Real-time isolated sandbox viewport...' అంటే "మనం రాసిన కోడింగ్‌ను బ్రౌజర్ లో రన్ చేసి లైవ్‌గా చూపించే సురక్షితమైన భాగం".

  preview_toolbar_board: {
    id: 'normal-preview-control-toolbar-board',
    size: 'small',
    gridSpan: 'col-span-1 lg:col-span-12',
    icon: '🛠️',
    title: 'Simulator Utility Control Toolbar',
    description: 'Interactive controller for copying link, toggling devices, and refreshing viewport.'
  }
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id' లైన్ వివరణ: 'normal-preview-control-toolbar-board' అనేది ప్రివ్యూ పైభాగంలో ఉండే టూల్‌బార్ బోర్డు ఐడీ.
  // 2️⃣ 'icon' లైన్ వివరణ: '🛠️' అనేది హామర్ మరియు స్పానర్ టూల్స్ ఎమోజీ.
  // 3️⃣ 'title' లైన్ వివరణ: 'Simulator Utility Control Toolbar' అంటే "సిమ్యులేటర్ కంట్రోల్ టూల్‌బార్ బోర్డు".
};

// ==========================================
// 4. ⚡ రిపేర్ స్టూడియో సబ్-బోర్డులు (Self-Fixer Diagnostics & Controls)
// ==========================================
export const SELF_REPAIR_BOARDS_CONFIG: Record<string, BoardConfig> = {
  snapshots_board: {
    id: 'self-fixer-history-snapshots-board',
    size: 'small',
    gridSpan: 'col-span-1 lg:col-span-4',
    icon: '💾',
    title: 'Backup Snapshots Recovery Board',
    description: 'Historical backups stored in client-side localStorage to revert crashes.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id' లైన్ వివరణ: 'self-fixer-history-snapshots-board' అనేది బ్యాకప్ రికవరీ బోర్డు ఐడీ.
  // 2️⃣ 'icon' లైన్ వివరణ: '💾' అనేది ఫ్లాపీ డిస్క్/సేవ్ ఎమోజీ.
  // 3️⃣ 'title' లైన్ వివరణ: 'Backup Snapshots Recovery Board' అంటే "పాత రికార్డుల బ్యాకప్ రికవరీ బోర్డు".
  // 4️⃣ 'description' లైన్ వివరణ: 'Historical backups stored...' అంటే "మనం కోడ్ మార్చినప్పుడు పాత సేఫ్ కోడ్ బ్యాకప్‌లను భద్రపరిచి, తిరిగి రికవర్ చేసే సిస్టమ్".

  diff_viewer_board: {
    id: 'self-fixer-code-diff-viewer-board',
    size: 'large',
    gridSpan: 'col-span-1 lg:col-span-8',
    icon: '📊',
    title: 'Side-by-Side Code Diff Inspector',
    description: 'Interactive visual comparison of original code versus the AI corrected code structure.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id' లైన్ వివరణ: 'self-fixer-code-diff-viewer-board' అనేది డిఫ్ వ్యూయర్ ఐడీ.
  // 2️⃣ 'icon' లైన్ వివరణ: '📊' అనేది గ్రాఫ్/కంపారిజన్ ఎమోజీ.
  // 3️⃣ 'title' లైన్ వివరణ: 'Side-by-Side Code Diff Inspector' అంటే "పాత మరియు కొత్త కోడ్‌ను పక్కపక్కన సరిపోల్చే డిఫ్-ఇన్‌స్పెక్టర్ బోర్డు".

  syntax_alert_board: {
    id: 'self-fixer-safety-syntax-alert-board',
    size: 'small',
    gridSpan: 'col-span-1 lg:col-span-12',
    icon: '🚨',
    title: 'White-Screen Safety Watchdog Board',
    description: 'Live code syntax evaluation and safe-fail interceptor before applying changes.'
  }
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id' లైన్ వివరణ: 'self-fixer-safety-syntax-alert-board' అనేది అలర్ట్ సిగ్నల్ బోర్డు ఐడీ.
  // 2️⃣ 'icon' లైన్ వివరణ: '🚨' అనేది పోలీస్ సైరన్ ఎమోజీ.
  // 3️⃣ 'title' లైన్ వివరణ: 'White-Screen Safety Watchdog Board' అంటే "వైట్ స్క్రీన్ క్రాష్ ప్రివెన్షన్ ప్రొటెక్టర్ బోర్డు".
};

// ==========================================
// 5. 🔗 నావిగేషన్ బోర్డులు (Navigation & Layout Stack)
// ==========================================
export const NAVIGATION_BOARDS_CONFIG: Record<string, BoardConfig> = {
  header_navigation_board: {
    id: 'navigation-top-header-board',
    size: 'small',
    gridSpan: 'col-span-1 lg:col-span-12',
    icon: '👑',
    title: 'Master Header Navigation Bar',
    description: 'Top-level brand identification, route stack tabs, and primary action controls.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id' లైన్ వివరణ: 'navigation-top-header-board' అనేది టాప్ హెడర్ బోర్డు ఐడీ.
  // 2️⃣ 'icon' లైన్ వివరణ: '👑' అనేది కింగ్ క్రౌన్ ఎమోజీ (ముఖ్యమైన టాప్ బార్ ను సూచిస్తుంది).
  // 3️⃣ 'title' లైన్ వివరణ: 'Master Header Navigation Bar' అంటే "ప్రధాన హెడర్ నావిగేషన్ బార్ బోర్డు".
  // 4️⃣ 'description' లైన్ వివరణ: 'Top-level brand identification...' అంటే "ప్రాజెక్ట్ లోగో, పేజీలు మారే లింక్స్, మరియు ముఖ్యమైన బటన్స్ ఉండే స్థలం".

  sidebar_drawer_board: {
    id: 'navigation-sidebar-drawer-panel-board',
    size: 'medium',
    gridSpan: 'col-span-1 lg:col-span-3',
    icon: '🎛️',
    title: 'Sliding Sidebar Operations Controller',
    description: 'Floating context-sensitive panel containing file uploads and backup lists.'
  }
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id' లైన్ వివరణ: 'navigation-sidebar-drawer-panel-board' అనేది సైడ్ మెనూ డ్రాయర్ బోర్డు ఐడీ.
  // 2️⃣ 'icon' లైన్ వివరణ: '🎛️' అనేది కంట్రోల్ నాబ్స్ ఎమోజీ.
  // 3️⃣ 'title' urban: 'Sliding Sidebar Operations Controller' అంటే "ఎడమ వైపు నుండి జారి వచ్చే ఆపరేషన్స్ స్లైడర్ బోర్డు".
};
