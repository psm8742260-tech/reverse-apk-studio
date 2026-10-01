/**
 * 🏛️ AI MASTER STUDIO - CENTRALIZED CONTROLS & BUTTONS CONFIGURATION
 * 
 * అడ్మిన్ గారు! మన ఏ ఐ స్టూడియో లోని ప్రతి ఒక్క ఫీచర్ బటన్, స్విచ్, టైటిల్ మరియు డిస్క్రిప్షన్‌ను 
 * ఒకే చోట సులభంగా నిర్వహించడానికి మరియు మార్చుకోవడానికి ఈ ఫైల్ సృష్టించబడింది.
 * 
 * ప్రతి కోడ్ బ్లాక్ పైన కోడింగ్ రూపంలో ఉండి, దానికి ఖచ్చితంగా కిందనే దాని తెలుగు వివరణ (Telugu Guide) 
 * మరియు ప్రతి ఇంగ్లీష్ పదానికి విడివిడిగా తెలుగు అర్థాలు (English to Telugu Dictionary Breakdown) ఇవ్వబడ్డాయి.
 */

import { FeatureFlags } from '../types';

// ==========================================
// 1. ⚙️ గ్లోబల్ ఫీచర్ స్విచ్‌ల కాన్ఫిగరేషన్ (11 Subsystems Toggles)
// ==========================================
export interface FeatureItemConfig {
  key: keyof FeatureFlags;
  title: string;
  desc: string;
  teluguGuide: string;
}

export const STUDIO_FEATURES_CONFIG: FeatureItemConfig[] = [
  {
    key: 'enableUnpacker',
    title: 'APK / ZIP Unpacker Engine',
    desc: 'Client-side JSZip archive unpacker for extracting internal assets.',
    teluguGuide: 'ఈ బటన్ క్లయింట్-సైడ్ లో APK లేదా ZIP ఫైళ్లను అన్‌ప్యాక్ చేసి వాటి ఫైళ్లను బయటకు తీయడానికి పనిచేస్తుంది.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'key' లైన్ వివరణ (దీనికి ఎట్ల ఉండాలి?):
  //     - 'key' అనే ఇంగ్లీష్ పదానికి అర్థం: "సిస్టమ్ ఐడెంటిఫైయర్/తాళం కీ".
  //     - 'enableUnpacker' అనేది ఫైల్ అన్‌ప్యాకర్ ని ఆన్ చేసే టోగుల్ కీ పేరు.
  //     - రూల్ (ఎట్ల ఉండాలి?): దీనిని మార్చకూడదు, ఇది కోడ్‌లో సిస్టమ్ లింక్ చేయబడి ఉంటుంది.
  // 
  // 2️⃣ 'title' లైన్ వివరణ (దీనికి ఎట్ల ఉండాలి?):
  //     - 'title' అనే ఇంగ్లీష్ పదానికి అర్థం: "బటన్ పేరు/హెడింగ్".
  //     - 'APK / ZIP Unpacker Engine' అంటే "APK మరియు ZIP అన్‌ప్యాక్ చేసే ఇంజన్".
  //     - రూల్ (ఎట్ల ఉండాలి?): ఈ పేరును మీరు అడ్మిన్ ప్యానెల్ లో ఎలా కనిపించాలో అలా మార్చుకోవచ్చు.
  // 
  // 3️⃣ 'desc' లైన్ వివరణ (దీనికి ఎట్ల ఉండాలి?):
  //     - 'desc' (Description) అంటే "చిన్న వివరణ టెక్స్ట్".
  //     - 'Client-side JSZip archive unpacker...' అంటే "బ్రౌజర్ లోపలే ఫైల్స్ అన్‌ప్యాక్ చేసే టూల్".
  //     - రూల్ (ఎట్ల ఉండాలి?): బటన్ కింద కనిపించే ఈ వివరణను మీకు నచ్చిన విధంగా మార్చుకోవచ్చు.

  {
    key: 'enableLivePreview',
    title: 'Live Responsive Web Previewer',
    desc: 'Automatic index.html Blob URL generator and device iframe viewport.',
    teluguGuide: 'ఈ బటన్ అప్‌లోడ్ చేసిన వెబ్ ఫైల్స్ యొక్క లైవ్ ప్రివ్యూను మొబైల్ లేదా సిస్టమ్ స్క్రీన్‌లా చూపించడానికి పనిచేస్తుంది.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'key': 'enableLivePreview' అనేది లైవ్ ప్రివ్యూ స్విచ్ కీ.
  // 2️⃣ 'title': 'Live Responsive Web Previewer' అంటే "లైవ్ రెస్పాన్సివ్ ప్రివ్యూ స్క్రీన్".
  // 3️⃣ 'desc': 'Automatic index.html Blob...' అంటే "హెచ్‌టిఎమ్‌ఎల్ ఫైల్‌ను వర్చువల్ క్లౌడ్ లింక్‌గా మార్చే సిస్టమ్".

  {
    key: 'enableCodeEditor',
    title: 'Code Editor & Inspector',
    desc: 'Syntax viewer and editor for HTML, JS, CSS, JSON, and XML files.',
    teluguGuide: 'ఈ బటన్ అన్‌ప్యాక్ చేసిన కోడ్ ఫైళ్లను డైరెక్ట్‌గా ఎడిట్ మరియు కలర్ సింటాక్స్ తో వీక్షించడానికి పనిచేస్తుంది.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'key': 'enableCodeEditor' అనేది కోడ్ ఎడిటర్ టోగుల్ కీ.
  // 2️⃣ 'title': 'Code Editor & Inspector' అంటే "కోడ్ ఎడిటర్ బోర్డు మరియు ఇన్‌స్పెక్టర్".
  // 3️⃣ 'desc': 'Syntax viewer and editor...' అంటే "హెచ్‌టిఎమ్‌ఎల్, జావాస్క్రిప్ట్ ఫైళ్లను సవరించే కలర్ ఎడిటర్".

  {
    key: 'enableAIAssistant',
    title: 'Brahmastram AI Gateway',
    desc: 'Pre-configured Gemini 3.6 Flash background operations & studio.',
    teluguGuide: 'ఈ బటన్ బ్యాక్‌గ్రౌండ్ ఆపరేషన్స్ మరియు ఏఐ ఆధారిత పనుల కోసం జెమిని (Gemini) గేట్‌വേను ఆన్ చేస్తుంది.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'key': 'enableAIAssistant' అనేది బ్రహ్మాస్త్రం ఏఐ గేట్‌వే కీ.
  // 2️⃣ 'title': 'Brahmastram AI Gateway' అంటే "బ్రహ్మాస్త్రం ఏఐ గేట్‌వే".
  // 3️⃣ 'desc': 'Pre-configured Gemini 3.6 Flash...' అంటే "బ్యాక్‌గ్రౌండ్ ఏఐ కార్యకలాపాల కోసం జెమిని కనెక్షన్".

  {
    key: 'enableZipExporter',
    title: 'One-Click Source ZIP Exporter',
    desc: 'Re-bundle extracted web assets into app_source_code.zip.',
    teluguGuide: 'ఈ బటన్ సవరించిన అన్ని ఫైళ్లను తిరిగి ఒక్క క్లిక్‌తో ZIP ఫైల్‌గా ప్యాక్ చేసి డౌన్‌లోడ్ చేయడానికి సహాయపడుతుంది.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'key': 'enableZipExporter' అనేది జిప్ ఎగుమతి స్విచ్ కీ.
  // 2️⃣ 'title': 'One-Click Source ZIP Exporter' అంటే "ఒక్క క్లిక్‌తో సోర్స్ జిప్ డౌన్‌లోడ్ టూల్".

  {
    key: 'enableCorsProxy',
    title: 'CORS Developer Proxy',
    desc: 'Backend proxy for downloading remote APK/ZIP download URLs.',
    teluguGuide: 'ఈ బటన్ ఇతర సర్వర్ల నుండి వచ్చే ఫైళ్లను లేదా APK లింక్‌లను ఎటువంటి బగ్స్ లేకుండా నేరుగా డౌన్‌లోడ్ చేయడానికి సహాయపడుతుంది.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'key': 'enableCorsProxy' అనేది CORS ప్రాక్సీ స్విచ్ కీ.
  // 2️⃣ 'title': 'CORS Developer Proxy' అంటే "CORS డెవలపర్ ప్రాక్సీ కనెక్షన్".

  {
    key: 'enableDemoApks',
    title: 'Built-in Demo APK Templates',
    desc: 'Instant 1-click sample Web APK generator for quick testing.',
    teluguGuide: 'ఈ బటన్ ఒక్క క్లిక్‌తో శాంపిల్ వెబ్ APK టెంప్లేట్లను క్రియేట్ చేసి టెస్టింగ్ చేసుకోవడానికి పనిచేస్తుంది.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'key': 'enableDemoApks' అనేది డెమో టెంప్లేట్స్ స్విచ్ కీ.
  // 2️⃣ 'title': 'Built-in Demo APK Templates' అంటే "డెమో టెంప్లేట్స్ మరియు గేమింగ్ APKలు".

  {
    key: 'darkModeDefault',
    title: 'Studio Dark Mode Default',
    desc: 'Enforce high-contrast dark developer theme layout across Studio.',
    teluguGuide: 'ఈ బటన్ మన స్టూడియో మొత్తాన్ని డార్క్ మోడ్ థీమ్‌లోకి డీఫాల్ట్‌గా ఉంచడానికి పనిచేస్తుంది.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'key': 'darkModeDefault' అనేది డార్క్ మోడ్ డీఫాల్ట్ స్విచ్ కీ.
  // 2️⃣ 'title': 'Studio Dark Mode Default' అంటే "స్టూడియో డార్క్ మోడ్".

  {
    key: 'enableSelfFixer',
    title: 'Self-Fixer AI Engine',
    desc: 'AI-powered automated code repair and manual editor for real-time fixes.',
    teluguGuide: 'ఈ బటన్ కోడింగ్ లో తప్పులను స్వయంచాలకంగా ఏఐ ద్వారా వెతికి సరిచేయడానికి (Auto Repair) పనిచేస్తుంది.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'key': 'enableSelfFixer' అనేది సెల్ఫ్-ఫిక్సర్ ఏఐ స్విచ్ కీ.
  // 2️⃣ 'title': 'Self-Fixer AI Engine' అంటే "సెల్ఫ్-ఫిక్సర్ ఏఐ ఇంజన్".

  {
    key: 'enableVisualBuilder',
    title: 'సెల్ఫ్-ఎడిటర్ (Self-Editor)',
    desc: 'Live Visual Builder for UI editing and direct source code synchronization.',
    teluguGuide: 'ఈ బటన్ వెబ్ యాప్స్ డిజైన్‌లను విజువల్గా క్లిక్ & డ్రాగ్ పద్ధతిలో సవరించి కోడ్ అప్‌డేట్ చేయడానికి పనిచేస్తుంది.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'key': 'enableVisualBuilder' అనేది విజువల్ బిల్డర్ (సెల్ఫ్-ఎడిటర్) స్విచ్ కీ.
  // 2️⃣ 'title': 'సెల్ఫ్-ఎడిటర్ (Self-Editor)' అంటే "సెల్ఫ్-ఎడిటర్ విజువల్ బిల్డర్".

  {
    key: 'enableAgentRegulations',
    // 🏛️ అడ్మిన్ గారి ఆదేశం ప్రకారం "Agent Strict Regulations" పేరును ఇంగ్లీషులో "Agent Rule System Rule" గా మార్చాము.
    title: 'Agent Rule System Rule',
    desc: 'Enforce strict AI agent rules, bilingual documentation, and a 50-second cooldown.',
    teluguGuide: 'ఈ బటన్ మన డెవలపర్ ఏజెంట్లకు 50 సెకన్ల కూల్‌డౌన్ మరియు తెలుగు వివరణ నిబంధనలను కఠినంగా అమలు చేస్తుంది.'
  },
  {
    key: 'enableAdminDemoControllers',
    title: 'Admin Master Control Mode',
    desc: "Toggles visibility of the 'Admin On/Off All' and 'Demo Code' buttons in Normal Studio.",
    teluguGuide: 'ఈ బటన్ ఆన్ చేస్తేనే నార్మల్ స్టూడియో లోపల "Admin On/Off" మరియు "Demo Code" బటన్లు కనిపిస్తాయి, ఆఫ్ చేస్తే అవి పూర్తిగా కనబడకుండా పోతాయి.'
  },
  {
    key: 'enableInvisibleAgentDaemon',
    title: 'Invisible Agent & Telemetry Daemon',
    desc: 'Background daemon for real-time filesystem static auditing and console auto-healing.',
    teluguGuide: 'ఈ బటన్ బ్యాక్‌గ్రౌండ్ లో ఫైల్స్ లో మరియు కన్సోల్స్ లో లోపాలను ఆటోమేటిక్‌గా వెతికి వాటిని సరిచేసే ఇన్విజిబుల్ ఏజెంట్‌ను ఆన్ చేస్తుంది.'
  }
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'key': 'enableAgentRegulations' అనేది ఏజెంట్ రూల్స్ ఫోర్స్ చేసే కీ.
  // 2️⃣ 'title': 'Agent Strict Regulations' అంటే "ఏజెంట్ కఠినమైన రూల్స్ నియంత్రణ".
];

// ==========================================
// 2. 🛡️ అడ్మిన్ ప్యానెల్ ప్రధాన మెనూ బటన్ల కాన్ఫిగరేషన్ (Admin Menu Tiles)
// ==========================================
export interface AdminSectionConfig {
  id: string;
  label: string;
  teluguGuide: string;
}

export const STUDIO_ADMIN_SECTIONS_CONFIG: Record<string, AdminSectionConfig> = {
  security: {
    id: 'security',
    label: 'Security',
    teluguGuide: 'సెక్యూరిటీ బోర్డు: అడ్మిన్ పాస్‌వర్డ్ మరియు లాగ్స్ భద్రతా నియమాలను మార్చుకోవడానికి.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id' లైన్ వివరణ: 'security' అనేది సెక్యూరిటీ బోర్డు యొక్క ఐడెంటిఫైయర్.
  // 2️⃣ 'label' లైన్ వివరణ: 'Security' అంటే బటన్ పైన రాసి ఉండే అక్షరాలు. 
  //     - రూల్: దీనిని మీకు నచ్చిన విధంగా 'సెక్యూరిటీ భద్రత' అని మార్చుకోవచ్చు.

  features: {
    id: 'features',
    label: 'Features',
    teluguGuide: 'ఫీచర్స్ బోర్డు: 11 గ్లోబల్ సబ్-సిస్టమ్ స్విచ్‌లను మేనేజ్ చేయడానికి.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'features' అనేది ఫీచర్ల బోర్డు ఐడీ.
  // 2️⃣ 'label': 'Features' అంటే బటన్ పైన కనిపించే అక్షరాలు (మార్చుకోవచ్చు).

  invisible: {
    id: 'invisible',
    label: 'Agents',
    teluguGuide: 'ఇన్విజిబుల్ ఏజెంట్ల బోర్డు: సిస్టమ్ లోపల పనిచేసే అదృశ్య బ్యాక్‌గ్రౌండ్ అసిస్టెంట్స్ కంట్రోల్.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'invisible' అనేది బ్యాక్‌గ్రౌండ్ ఏజెంట్ల బోర్డు ఐడీ.
  // 2️⃣ 'label': 'Agents' అంటే బటన్ పైన కనిపించే అక్షరాలు.

  agents: {
    id: 'agents',
    label: '10-Agents',
    teluguGuide: '10-ఏజెంట్ల బోర్డు: బ్రహ్మాస్త్రం ఏఐ గేట్‌వే లోపలి ప్రత్యేక ఏజెంట్ అసిస్టెంట్లను సెలెక్ట్ చేయడానికి.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'agents' అనేది 10 ప్రత్యేక ఏజెంట్ల బోర్డు ఐడీ.
  // 2️⃣ 'label': '10-Agents' అంటే బటన్ పైన కనిపించే అక్షరాలు.

  export: {
    id: 'export',
    label: 'PWA Builder',
    teluguGuide: 'పీడబ్ల్యూఏ బిల్డర్: అప్లికేషన్ యొక్క మెనిఫెస్ట్, ఐకాన్స్ మరియు వర్కర్ ఎగుమతులను నిర్వహించడానికి.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'export' అనేది PWA బిల్డర్ బోర్డు ఐడీ.
  // 2️⃣ 'label': 'PWA Builder' అంటే బటన్ పైన కనిపించే అక్షరాలు.

  selffixer: {
    id: 'selffixer',
    label: 'Self Fixer Studio',
    teluguGuide: 'Self Fixer Studio బోర్డు: వెబ్ ఫైళ్ల లోపాలను వెతికి ఆటోమేటిక్ ఫిక్స్ చేయడానికి.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'selffixer' అనేది ఏఐ రిపేర్ బోర్డు ఐడీ.
  // 2️⃣ 'label': 'Self Fixer Studio' అంటే బటన్ పైన కనిపించే అక్షరాలు (మార్చుకోవచ్చు).

  visualbuilder: {
    id: 'visualbuilder',
    label: 'Visual Editor',
    teluguGuide: 'సెల్ఫ్-ఎడిటర్ విజువల్ బిల్డర్ బోర్డు: లైవ్ విజువల్ డ్రాగ్ అండ్ డ్రాప్ డిజైనర్.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'visualbuilder' అనేది విజువల్ ఎడిటర్ బోర్డు ఐడీ.
  // 2️⃣ 'label': 'Visual Editor' అంటే బటన్ పైన కనిపించే అక్షరాలు.

  saved_workspace: {
    id: 'saved_workspace',
    label: 'Storage Bridge',
    teluguGuide: 'మొబైల్ స్టోరేజ్ ఇంటర్నెట్ వంతెన బోర్డు: బ్యాకప్ కనెక్షన్లను మేనేజ్ చేయడానికి.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'saved_workspace' అనేది సేవ్డ్ వర్క్‌స్పేస్ బోర్డు ఐడీ.
  // 2️⃣ 'label': 'Workspace' అంటే బటన్ పైన కనిపించే అక్షరాలు.

  studio: {
    id: 'studio',
    label: 'Exposing Studio',
    teluguGuide: 'ఎక్స్‌పోజింగ్ స్టూడియో బోర్డు: లైవ్ క్లయింట్ ప్రివ్యూ మరియు బ్రాడ్‌కాస్టింగ్ కంట్రోల్.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'studio' అనేది ఎక్స్‌పోజింగ్ బోర్డు ఐడీ.
  // 2️⃣ 'label': 'Exposing Studio' అంటే బటన్ పైన కనిపించే అక్షరాలు.

  failover: {
    id: 'failover',
    label: '5-API Vault',
    teluguGuide: '5-ఏపీఐ వాల్ట్: ఏఐ కీలు క్రాష్ కాకుండా రక్షించే ప్రత్యామ్నాయ కీ మేనేజ్‌మెంట్.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'failover' అనేది ఏఐ ఏపీఐ వాల్ట్ బోర్డు ఐడీ.
  // 2️⃣ 'label': '5-API Vault' అంటే బటన్ పైన కనిపించే అక్షరాలు.

  vault: {
    id: 'vault',
    label: 'Vault',
    teluguGuide: 'షిఫ్ట్ వాల్ట్ రికవరీ బోర్డు: పాత డీకంపేల్డ్ ఫైళ్ల డేటాను సురక్షితంగా రికవర్ చేయడానికి.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'vault' అనేది వాల్ట్ రికవరీ బోర్డు ఐడీ.
  // 2️⃣ 'label': 'Vault' అంటే బటన్ పైన కనిపించే అక్షరాలు.

  staff: {
    id: 'staff',
    label: 'Staff',
    teluguGuide: 'సిబ్బంది బోర్డు: మేనేజర్లు మరియు సూపర్‌వైజర్ల స్లాట్లు మరియు యాక్సెస్‌లను మేనేజ్ చేయడానికి.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'staff' అనేది స్టాఫ్ బోర్డు ఐడీ.
  // 2️⃣ 'label': 'Staff' అంటే బటన్ పైన కనిపించే అక్షరాలు.

  wallets: {
    id: 'wallets',
    label: 'Wallets',
    teluguGuide: 'వాలెట్ బోర్డు: క్లయింట్ వాలెట్ క్రెడిట్స్ మరియు క్యాష్ లాగ్స్ మేనేజ్‌మెంట్.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'wallets' అనేది వాలెట్ బోర్డు ఐడీ.
  // 2️⃣ 'label': 'Wallets' అంటే బటన్ పైన కనిపించే అక్షరాలు.

  converter: {
    id: 'converter',
    label: 'PNG JPG CONVERTER',
    teluguGuide: 'ఇమేజ్ కన్వర్టర్ బోర్డు: ఎరుపు రంగు బాక్స్ లోపల తెల్లటి అక్షరాలతో ఉన్న PNG JPG కన్వర్టర్ టూల్.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'converter' అనేది ఇమేజ్ కన్వర్టర్ బోర్డు ఐడీ.
  // 2️⃣ 'label': 'PNG JPG CONVERTER' అంటే బటన్ పైన కనిపించే అక్షరాలు.

  qr: {
    id: 'qr',
    label: 'QR Generator',
    teluguGuide: 'క్యూఆర్ జెనరేటర్ బోర్డు: కస్టమ్ క్యూఆర్ కోడ్‌లు మరియు స్కానర్ లింక్‌లను రూపొందించడానికి.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'qr' అనేది క్యూఆర్ జనరేటర్ బోర్డు ఐడీ.
  // 2️⃣ 'label': 'QR Generator' అంటే బటన్ పైన కనిపించే అక్షరాలు.

  build: {
    id: 'build',
    label: 'Build Suite',
    teluguGuide: 'బిల్డ్ సూట్: కోడింగ్ పూర్తి అయిన తర్వాత ఫైనల్ ప్రాజెక్ట్‌ను వెబ్ బిల్డ్ చేయడానికి.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'build' అనేది బిల్డ్ సూట్ బోర్డు ఐడీ.
  // 2️⃣ 'label': 'Build Suite' అంటే బటన్ పైన కనిపించే అక్షరాలు.

  'url-builder': {
    id: 'url-builder',
    label: 'URL to App',
    teluguGuide: 'యుఆర్ఎల్ బిల్డర్: ఏ వెబ్‌సైట్ లింక్ అయినా నేరుగా అప్లికేషన్ టెంప్లేట్‌గా మార్చడానికి.'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'url-builder' అనేది యుఆర్‌ఎల్ బిల్డర్ బోర్డు ఐడీ.
  // 2️⃣ 'label': 'URL to App' అంటే బటన్ పైన కనిపించే అక్షరాలు.

  icons8_glass: {
    id: 'icons8_glass',
    label: 'Icons8 Glass',
    teluguGuide: 'ఐకాన్స్8 గ్లాస్ బోర్డు: డిజైనింగ్ కోసం అందమైన గ్లాస్ ఐకాన్స్ లైబ్రరీని పొందడానికి.'
  }
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'icons8_glass' అనేది గ్లాస్ ఐకాన్స్ బోర్డు ఐడీ.
  // 2️⃣ 'label': 'Icons8 Glass' అంటే బటన్ పైన కనిపించే అక్షరాలు.
};

// ==========================================
// 3. 📂 రివర్స్ ఇంజనీరింగ్ అన్‌ప్యాకర్ బటన్స్ (Decompiler Workspace Buttons)
// ==========================================
export const REVERSE_ENGINEERING_BUTTONS = {
  upload_apk: {
    id: 'upload-apk-btn',
    label: '.APK అప్‌లోడ్',
    className: 'flex-1 min-w-[110px] px-2.5 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-[11px] rounded-xl shadow-xs transition flex items-center justify-center gap-1.5',
    icon: 'Upload'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id' లైన్ వివరణ: 'upload-apk-btn' అనేది ఏపికె అప్‌లోడ్ బటన్ ఐడీ.
  // 2️⃣ 'label' లైన్ వివరణ: '.APK అప్‌లోడ్' అనేది బటన్ పైన మనకు తెలుగులో కనిపించే అక్షరాలు.
  //     - రూల్ (ఎట్ల ఉండాలి?): దీనిని మీకు నచ్చిన అక్షరాలతో సవరించుకోవచ్చు.
  // 3️⃣ 'className' లైన్ వివరణ: బటన్ డిజైన్, రంగు (Indigo), బోర్డర్ మరియు మొబైల్ స్టైల్స్ నిర్ణయించే Tailwind CSS స్టైలింగ్ క్లాసెస్.
  // 4️⃣ 'icon' లైన్ వివరణ: 'Upload' అనేది పక్కన కనిపించే ఐకాన్ పేరు.

  upload_zip: {
    id: 'upload-zip-btn',
    label: '.ZIP ఫైల్ అప్‌లోడ్',
    className: 'flex-1 min-w-[110px] px-2.5 py-2 bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-bold text-[11px] rounded-xl shadow-xs transition flex items-center justify-center gap-1.5',
    icon: 'Upload'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'upload-zip-btn' అనేది జిప్ అప్‌లోడ్ బటన్ ఐడీ.
  // 2️⃣ 'label': '.ZIP ఫైల్ అప్‌లోడ్' అనేది బటన్ పై కనిపించే అక్షరాలు.
  // 3️⃣ 'className': రంగు (Sky Blue) మరియు సైజులను నియంత్రించే స్టైల్స్.

  upload_aab: {
    id: 'upload-aab-btn',
    label: '.AAB ఫైల్ అప్‌లోడ్',
    className: 'flex-1 min-w-[110px] px-2.5 py-2 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-[11px] rounded-xl shadow-xs transition flex items-center justify-center gap-1.5',
    icon: 'Upload'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'upload-aab-btn' అనేది ఏఏబీ అప్‌లోడ్ బటన్ ఐడీ.
  // 2️⃣ 'label': '.AAB ఫైల్ అప్‌లోడ్' అనేది బటన్ పై కనిపించే అక్షరాలు (మార్చుకోవచ్చు).

  normal_upload: {
    id: 'normal-upload-btn',
    label: 'సాధారణ అప్‌లోడ్',
    className: 'flex-1 min-w-[110px] px-2.5 py-2 bg-slate-800 hover:bg-slate-900 active:scale-95 text-white font-bold text-[11px] rounded-xl shadow-xs transition flex items-center justify-center gap-1.5',
    icon: 'Upload'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'normal-upload-btn' అనేది సాధారణ అప్‌లోడ్ బటన్ ఐడీ.
  // 2️⃣ 'label': 'సాధారణ అప్‌లోడ్' అనేది బటన్ పై కనిపించే అక్షరాలు.

  url_fetch: {
    id: 'url-fetch-btn',
    label: 'Fetch',
    className: 'bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-semibold text-[10px] px-2 py-1 rounded-md transition shrink-0',
    icon: 'Globe'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'url-fetch-btn' అనేది వెబ్ లింక్ నుండి ఫైల్ డౌన్‌లోడ్ చేసే బటన్ ఐడీ.
  // 2️⃣ 'label': 'Fetch' అనేది బటన్ పై కనిపించే పేరు.

  clear_workspace: {
    id: 'clear-workspace-btn',
    label: 'Clear All Files',
    className: 'bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-lg',
    icon: 'Trash2'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'clear-workspace-btn' అనేది అన్‌ప్యాకర్ లోపలి అన్ని ఫైళ్లను డిలీట్ చేసే బటన్ ఐడీ.
  // 2️⃣ 'label': 'Clear All Files' అనేది బటన్ పై కనిపించే అక్షరాలు (మార్చుకోవచ్చు).

  download_source: {
    id: 'download-source-btn',
    label: 'Download Code ZIP (వన్-క్లిక్ డౌన్‌లోడ్)',
    className: 'bg-emerald-600 hover:bg-emerald-700 text-white font-black py-2.5 px-5 rounded-xl',
    icon: 'Download'
  }
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'download-source-btn' అనేది సోర్స్ ఫైల్స్ డౌన్‌లోడ్ బటన్ ఐడీ.
  // 2️⃣ 'label': 'Download Code ZIP (వన్-క్లిక్ డౌన్‌లోడ్)' అనేది బటన్ పై కనిపించే పెద్ద అక్షరాల పేరు (మార్చుకోవచ్చు).
};

// ==========================================
// 4. 📱 నార్మల్ స్టూడియో ప్రివ్యూ బటన్స్ (Normal App Studio / Live Preview Buttons)
// ==========================================
export const NORMAL_STUDIO_BUTTONS = {
  view_code: {
    id: 'view-code-tab-btn',
    label: 'కోడ్ (Code)',
    className: 'px-2 py-1 rounded-md transition flex items-center gap-1 whitespace-nowrap shrink-0',
    icon: 'Code'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id' లైన్ వివరణ: 'view-code-tab-btn' అనేది కోడ్ ఎడిటర్ ట్యాబ్ బటన్ ఐడీ.
  // 2️⃣ 'label' లైన్ వివరణ: 'కోడ్ (Code)' అనేది బటన్ పై కనిపించే అక్షరాలు (సవరించుకోవచ్చు).
  // 3️⃣ 'icon': 'Code' అనేది బ్రాకెట్స్ ఐకాన్ సూచిస్తుంది.

  view_preview: {
    id: 'view-preview-tab-btn',
    label: 'లైవ్ ప్రివ్యూ (Live App)',
    className: 'px-2 py-1 rounded-md transition flex items-center gap-1 whitespace-nowrap shrink-0',
    icon: 'Eye'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'view-preview-tab-btn' అనేది లైవ్ ప్రివ్యూ ట్యాబ్ బటన్ ఐడీ.
  // 2️⃣ 'label': 'లైవ్ ప్రివ్యూ (Live App)' అనేది బటన్ పై కనిపించే అక్షరాలు (మార్చుకోవచ్చు).

  copy_live_link: {
    id: 'copy-live-link-btn',
    label: 'Copy Live Link (లింక్ కాపీ)',
    className: 'bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold px-2 py-1 rounded border border-slate-200 transition',
    icon: 'Copy'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'copy-live-link-btn' అనేది లింక్ కాపీ బటన్ ఐడీ.
  // 2️⃣ 'label': 'Copy Live Link (లింక్ కాపీ)' అనేది బటన్ పై కనిపించే పేరు (మార్చుకోవచ్చు).

  reload_preview: {
    id: 'reload-preview-btn',
    label: 'Reload Preview (రీలోడ్)',
    className: 'p-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 rounded transition',
    icon: 'RefreshCw'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'reload-preview-btn' అనేది ప్రివ్యూ రిఫ్రెష్ బటన్ ఐడీ.
  // 2️⃣ 'label': 'Reload Preview (రీలోడ్)' అనేది బటన్ పై కనిపించే అక్షరాలు (మార్చుకోవచ్చు).

  device_mobile: {
    id: 'device-mobile-btn',
    label: 'Mobile View',
    className: 'p-1.5 rounded transition',
    icon: 'Smartphone'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'device-mobile-btn' అనేది మొబైల్ వ్యూ స్విచ్ బటన్ ఐడీ.
  // 2️⃣ 'label': 'Mobile View' అనేది బటన్ పై కనిపించే అక్షరాలు (మార్చుకోవచ్చు).

  device_responsive: {
    id: 'device-responsive-btn',
    label: 'Responsive View',
    className: 'p-1.5 rounded transition',
    icon: 'Maximize'
  }
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'device-responsive-btn' అనేది రెస్పాన్సివ్ వ్యూ స్విచ్ బటన్ ఐడీ.
  // 2️⃣ 'label': 'Responsive View' అనేది బటన్ పై కనిపించే అక్షరాలు (మార్చుకోవచ్చు).
};

// ==========================================
// 5. ⚡ సెల్ఫ్ రిపేర్ స్టూడియో బటన్స్ (Self-Fixer Studio / Code Inspector Buttons)
// ==========================================
export const SELF_FIXER_BUTTONS = {
  load_code: {
    id: 'load-code-btn',
    label: '💻 కోడ్ లోడ్',
    className: 'flex items-center justify-center space-x-1 px-2 md:px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-[10px] md:text-xs font-black transition-all shadow-2xs active:scale-95 cursor-pointer',
    icon: 'Code2'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id' లైన్ వివరణ: 'load-code-btn' అనేది కోడ్ లోడ్ చేసే బటన్ ఐడీ.
  // 2️⃣ 'label' లైన్ వివరణ: '💻 కోడ్ లోడ్' అనేది ఎడిటర్ స్క్రీన్ పై కనిపించే టెక్స్ట్.
  //     - రూల్ (ఎట్ల ఉండాలి?): మీకు నచ్చిన విధంగా 'ఫైల్ రీడ్ చేయి' అని మార్చుకోవచ్చు.

  clear_board: {
    id: 'clear-board-btn',
    label: '🧹 క్లియర్',
    className: 'flex items-center justify-center space-x-1 px-2 md:px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-[10px] md:text-xs font-black transition-all shadow-2xs active:scale-95 cursor-pointer',
    icon: 'Trash2'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'clear-board-btn' అనేది ఎడిటర్ స్క్రీన్ క్లియర్ చేసే బటన్ ఐడీ.
  // 2️⃣ 'label': '🧹 క్లియర్' అనేది బటన్ పై కనిపించే టెక్స్ట్ (మార్చుకోవచ్చు).

  save_backup: {
    id: 'save-backup-btn',
    label: '💾 సేవ్',
    className: 'flex items-center justify-center space-x-1 px-2 md:px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-[10px] md:text-xs font-black transition-all shadow-2xs active:scale-95 cursor-pointer',
    icon: 'Save'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'save-backup-btn' అనేది కోడ్ సేవ్ బటన్ ఐడీ.
  // 2️⃣ 'label': '💾 సేవ్' అనేది బటన్ పై కనిపించే అక్షరాలు (మార్చుకోవచ్చు).

  restore_snapshot: {
    id: 'restore-snapshot-btn',
    label: 'రీస్టోర్',
    className: 'flex items-center justify-center space-x-1 px-2 md:px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-[10px] md:text-xs font-black transition-all shadow-2xs active:scale-95 cursor-pointer',
    icon: 'RotateCcw'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'restore-snapshot-btn' అనేది పాత కోడ్ రీస్టోర్ బటన్ ఐడీ.
  // 2️⃣ 'label': 'రీస్టోర్' అనేది బటన్ పై కనిపించే అక్షరాలు (మార్చుకోవచ్చు).

  apply_live: {
    id: 'apply-live-btn',
    label: '🚀 అప్లై',
    className: 'flex items-center justify-center space-x-1 px-2.5 md:px-4 py-1.5 bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-[10px] md:text-xs font-black shadow-md shadow-emerald-200 transition-all active:scale-90 cursor-pointer',
    icon: 'Rocket'
  }
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'apply-live-btn' అనేది సరిచేసిన కోడ్‌ను సిస్టమ్‌కు అప్లై చేసే బటన్ ఐడీ.
  // 2️⃣ 'label': '🚀 అప్లై' అనేది బటన్ పై కనిపించే అక్షరాల పేరు (మార్చుకోవచ్చు).
};

// ==========================================
// 6. 🤖 బ్రహ్మాస్త్రం ఏఐ స్టూడియో బటన్స్ (Brahmastram AI Studio / Chat & Agent Buttons)
// ==========================================
export const AI_MASTER_STUDIO_BUTTONS = {
  send_message: {
    id: 'send-msg-btn',
    label: 'Send Command',
    className: 'p-2 md:p-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl shadow-md transition-all flex items-center justify-center shrink-0 cursor-pointer',
    icon: 'Send'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id' లైన్ వివరణ: 'send-msg-btn' అనేది ఏఐ మెసేజ్ సెండ్ బటన్ ఐడీ.
  // 2️⃣ 'label' లైన్ వివరణ: 'Send Command' అనేది బటన్ పై ఉండే టెక్స్ట్.
  //     - రూల్ (ఎట్ల ఉండాలి?): మీకు నచ్చిన విధంగా 'ఆదేశం పంపు' అని సవరించుకోవచ్చు.

  new_session: {
    id: 'new-session-btn',
    label: 'New Session',
    className: 'w-full flex items-center justify-center gap-2 p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl shadow-md transition cursor-pointer',
    icon: 'Plus'
  },
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'new-session-btn' అనేది కొత్త చాట్ సెషన్ బటన్ ఐడీ.
  // 2️⃣ 'label': 'New Session' అనేది బటన్ పై ఉండే అక్షరాలు (మార్చుకోవచ్చు).

  clear_history: {
    id: 'clear-history-btn',
    label: 'Clear Chat History',
    className: 'p-1.5 text-slate-400 hover:text-slate-600 transition',
    teluguGuide: 'ఈ బటన్ క్లిక్ చేస్తే పాత చాట్ హిస్టరీ రికార్డులు అన్నీ మాయం అయిపోతాయి.'
  }
  // 🏛️ తెలుగు వివరణ & డిక్షనరీ గైడ్:
  // 
  // 1️⃣ 'id': 'clear-history-btn' అనేది చాట్ హిస్టరీ క్లియర్ బటన్ ఐడీ.
  // 2️⃣ 'label': 'Clear Chat History' అనేది బటన్ పై ఉండే అక్షరాలు (మార్చుకోవచ్చు).
};
