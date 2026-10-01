// 💡 అడ్మిన్ గారు! మన ఏఐ మాస్టర్ స్టూడియో లోపలి ప్రతి బోర్డు, ప్రతి బటన్ మరియు ప్రతి ఫీచర్ కి సంబంధించిన కనెక్షన్లు
// ఎక్కడి నుండి వస్తున్నాయి (Source) మరియు ఎక్కడికి పోతున్నాయి (Destination) అని స్పష్టంగా తెలుసుకునేందుకు వీలుగా
// ఈ కేంద్రీకృత "టెలిఫోన్ ఆఫీస్ ఎక్స్ఛేంజ్ వైరింగ్ ఫైల్" మరింత వివరంగా అప్‌గ్రేడ్ చేయబడింది.
// పైన ఇంగ్లీషు కీస్ మరియు దాని కింద చాలా స్పష్టమైన తెలుగు వివరణలు కామెంట్ రూపంలో ఇవ్వబడ్డాయి.

export interface StudioConnection {
  id: string;              // కనెక్షన్ ఐడీ
  controlName: string;     // బటన్ లేదా కంట్రోల్ పేరు
  triggerAction: string;   // కోడింగ్ లోపల పిలిచే ఫంక్షన్/యాక్షన్
  serverRoute: string;     // అనుసంధానమైన సర్వర్ ఏపీఐ రూట్ లేదా ఫైర్‌బేస్ కలెక్షన్
  source: string;          // ఎక్కడి నుండి ప్రారంభం అవుతుంది (Source)
  destination: string;     // ఎక్కడికి కనెక్ట్ అవుతుంది (Destination)
  purpose: string;         // ఉపయోగం (ఇంగ్లీషులో)
  teluguDesc: string;      // 💡 తెలుగు వివరణ (అడ్మిన్ గారి కోసం ఉపయోగపడే వివరణాత్మక గైడ్)
  teluguSource: string;    // 💡 తెలుగులో కనెక్షన్ ప్రారంభ స్థానం (Source)
  teluguDest: string;      // 💡 తెలుగులో కనెక్షన్ గమ్య స్థానం (Destination)
}

// ==========================================
// 📞 1. NORMAL APP STUDIO CONNECTIONS (నార్మల్ యాప్ స్టూడియో వైరింగ్)
// ==========================================
export const NORMAL_STUDIO_CONNECTIONS: StudioConnection[] = [
  {
    id: 'ai-chat-generation',
    controlName: 'Send Chat / Generate Code Button',
    triggerAction: 'handleSendPrompt',
    serverRoute: '/api/ai/generate',
    source: 'Browser UI ChatInput (NormalAppStudio.tsx)',
    destination: 'Node.js Backend Server API & Gemini/Claude Models',
    purpose: 'Sends the user chat message and prompt context to the selected AI Agent to generate responses or code streams.',
    teluguDesc: 'యూజర్ చాట్ బాక్స్‌లో టైప్ చేసి ఎంటర్ కొట్టినప్పుడు... ఎంచుకున్న ఏఐ ఏజెంట్ (జెమిని/క్లాడ్) కు కనెక్ట్ అయి, లైవ్ గా సమాచారాన్ని (అక్షరం అక్షరం) ప్రవహింపజేసే అతి ముఖ్యమైన కనెక్షన్.',
    teluguSource: 'బ్రౌజర్ చాట్ బాక్స్ ఇన్‌పుట్ (యూజర్ స్క్రీన్)',
    teluguDest: 'బ్యాక్-ఎండ్ సర్వర్ API మరియు గూగుల్/ఆంత్రోపిక్ క్లౌడ్ ఏఐ ఏజెంట్లు'
  },
  {
    id: 'build-android-apk',
    controlName: 'Build Android APK Button',
    triggerAction: 'handleBuildAPK',
    serverRoute: '/api/build-apk',
    source: 'Top Header "Build APK" Button (NormalAppStudio.tsx)',
    destination: 'Backend Server Android SDK & Gradle Compiler Engine',
    purpose: 'Invokes the backend Android SDK, Java, and Gradle compilation flow to build a working APK for mobile installation.',
    teluguDesc: 'మనం తయారు చేసిన కోడింగ్‌ను నిజమైన ఆండ్రాయిడ్ మొబైల్ ఫోన్‌లో ఇన్‌స్టాల్ చేసుకునేలా... బ్యాక్-ఎండ్ సర్వర్ లో గూగుల్ గ్రేడిల్ సిస్టమ్ ద్వారా ఏపికె (APK) బిల్డ్ చేసే కనెక్షన్.',
    teluguSource: 'పైన ఉండే హెడ్డర్ "Build APK" బటన్',
    teluguDest: 'సర్వర్ లోపల ఉన్న గూగుల్ ఆండ్రాయిడ్ ఎస్డీకే (Android SDK) మరియు గ్రేడిల్ కంపైలర్'
  },
  {
    id: 'download-zip-source',
    controlName: 'ZIP Source Code Button',
    triggerAction: 'handleDownloadZip',
    serverRoute: '/api/zip-source',
    source: 'Top Header "Download ZIP" Button (NormalAppStudio.tsx)',
    destination: 'Backend Node.js Zip Archiver Utility',
    purpose: 'Bundles all current project source files and directories into a single ZIP archive and streams it to the user browser.',
    teluguDesc: 'యాప్ లో ఉన్న ఫైల్స్ మరియు ఫోల్డర్లన్నింటినీ సర్వర్ లోపల ఒకే ఒక్క జీఐపీ (ZIP) ఫైల్ లాగా ప్యాక్ చేసి, కంప్యూటర్ లోకి డౌన్‌లోడ్ చేసే కనెక్షన్.',
    teluguSource: 'పైన ఉండే హెడ్డర్ "Download ZIP" బటన్',
    teluguDest: 'సర్వర్ లోని ఫైల్ ప్యాకింగ్ ఇంజన్ (Zip Archiver)'
  },
  {
    id: 'firestore-project-save',
    controlName: 'Save Project Progress Button',
    triggerAction: 'saveProject',
    serverRoute: 'Firebase Firestore: /projects collection',
    source: 'Auto-save effect & Manual Save Button',
    destination: 'Firebase Google Cloud Firestore NoSQL Database',
    purpose: 'Saves the current workspace files, layout settings, and active model selection to the cloud database for persistent storage.',
    teluguDesc: 'అడ్మిన్ గారు తయారు చేసిన ప్రాజెక్టుల వివరాలను క్లౌడ్ డేటాబేస్ (ఫైర్ బేస్ ఫైర్ స్టోర్) లో భద్రంగా దాచిపెట్టే శాశ్వత జ్ఞాపకశక్తి కనెక్షన్.',
    teluguSource: 'ఆటోమేటిక్ సేవ్ టైమర్ లేదా మ్యాన్యువల్ సేవ్ బటన్',
    teluguDest: 'గూగుల్ క్లౌడ్ లో రన్ అయ్యే ఫైర్‌బేస్ ఫైర్‌స్టోర్ (Firebase Firestore) డేటాబేస్'
  },
  {
    id: 'admin-bypass-toggle',
    controlName: 'Admin On / Off Toggle Buttons',
    triggerAction: 'toggleAdminMode / handleAdminBypass',
    serverRoute: 'Local React State / Session Lock Bypass',
    source: 'Floating Admin Control Panel (NormalAppStudio.tsx)',
    destination: 'App-wide Client-side Context Session Memory',
    purpose: 'Instantly locks or unlocks paid AI models and premium features across all studios bypassing key checks.',
    teluguDesc: 'అడ్మిన్ గారు క్లిక్ చేసిన వెంటనే... ప్రైవేట్ ఏపీఐ కీ అవసరం లేకుండా, పెయిడ్ ఏఐ ఏజెంట్లన్నింటినీ ఒకే సెకనులో లాక్ లేదా అన్‌లాక్ చేసే స్పెషల్ వైరింగ్ కనెక్షన్.',
    teluguSource: 'ఫ్లోటింగ్ అడ్మిన్ కంట్రోల్ ప్యానెల్ (సెక్యూరిటీ స్విచ్‌లు)',
    teluguDest: 'బ్రౌజర్ మెమరీ లోని రియాక్ట్ స్టేట్ (React State) మరియు సెషన్ కంట్రోలర్'
  }
];

// ==========================================
// 🔧 2. SELF REPAIR STUDIO CONNECTIONS (సెల్ఫ్ రిపేర్ స్టూడియో వైరింగ్)
// ==========================================
export const SELF_FIXER_STUDIO_CONNECTIONS: StudioConnection[] = [
  {
    id: 'ai-auto-repair',
    controlName: 'Fix Code / Repair Button',
    triggerAction: 'handleFixCode',
    serverRoute: '/api/ai/generate (with error system prompt)',
    source: 'SelfFixerStudio.tsx "Fix Code" Panel click',
    destination: 'Gemini / DeepSeek API Specialized Coding Patch Agents',
    purpose: 'Sends compilation error logs and code contents to specialized repair agents to generate automated patches.',
    teluguDesc: 'కోడ్‌లో ఏదైనా క్రాష్ లేదా వైట్ స్క్రీన్ వచ్చినప్పుడు... ఎర్రర్ లాగ్‌లను ఆటోమేటిక్‌గా రీ-స్కాన్ చేసి, కోడ్ పగిలిపోకుండా తిరిగి అతికించే (ప్యాచ్ వేసే) ఏఐ రిపేర్ కనెక్షన్.',
    teluguSource: 'సెల్ఫ్ రిపేర్ బోర్డ్ లోని "Fix Code" బటన్',
    teluguDest: 'ప్రత్యేక ఎర్రర్-డీబగ్గింగ్ ఏఐ మోడల్స్ (Specialized AI Repair System)'
  },
  {
    id: 'ts-linter-check',
    controlName: 'Run Compiler / Diagnostic System',
    triggerAction: 'runDiagnosticBuild',
    serverRoute: 'Local TypeScript Linter Engine (tsc)',
    source: 'Compiler Panel "Run Diagnostics" click (SelfFixerStudio.tsx)',
    destination: 'Backend Server Execution Shell Terminal',
    purpose: 'Triggers local TypeScript validation to detect structural, bracket, and import errors before compiling the app.',
    teluguDesc: 'కోడ్ రాసిన వెంటనే... అందులో బ్రాకెట్లు {}, కామాలు లేదా ఇంపోర్ట్‌లు తప్పు పడ్డాయేమో లైవ్‌గా చెక్ చేసి ఎర్రర్స్ చూపే కంపైలర్ డయాగ్నస్టిక్ రన్ కనెక్షన్.',
    teluguSource: 'రిపేర్ బోర్డ్ లో ఉండే కంపైలర్ "Run Diagnostics" బటన్',
    teluguDest: 'సర్వర్ లో బ్యాక్‌గ్రౌండ్‌లో రన్ అయ్యే టైప్‌స్క్రిప్ట్ కంపైలర్ చెకర్ (tsc Linter)'
  }
];

// ==========================================
// 🎙️ 3. REVERSE ENGINEERING CONNECTIONS (రివర్స్ ఇంజనీరింగ్ వైరింగ్)
// ==========================================
export const REVERSE_STUDIO_CONNECTIONS: StudioConnection[] = [
  {
    id: 'apk-decompile-flow',
    controlName: 'Upload APK / Decompile Button',
    triggerAction: 'handleDecompile',
    serverRoute: '/api/decompile',
    source: 'DecompilerWorkspace.tsx APK Upload Form',
    destination: 'Backend Server File System & Java Apktool Utility',
    purpose: 'Uploads any binary APK, runs Apktool on backend to decompress, extract XML, and translate dex into human-readable Smali files.',
    teluguDesc: 'మనం అప్‌లోడ్ చేసిన ఏదైనా ఆండ్రాయిడ్ యాప్ (APK) ని... బ్యాక్-ఎండ్ సర్వర్ ద్వారా ముక్కలు ముక్కలుగా విడదీసి (డీకంపైల్ చేసి), లోపలి స్మాలి (Smali) మరియు ఎక్స్ఎమ్ఎల్ (XML) కోడ్‌ను బయటకు తీసే కనెక్షన్.',
    teluguSource: 'డీకంపైలర్ వర్క్‌స్పేస్ లోని APK ఫైల్ అప్‌లోడ్ బాక్స్',
    teluguDest: 'సర్వర్ లోపల జావా కమాండ్ ద్వారా రన్ అయ్యే ఏపికెటూల్ (Apktool Engine)'
  },
  {
    id: 'voice-speech-agent',
    controlName: 'Voice Assistant / Audio Chimes Toggle',
    triggerAction: 'VoiceAgentInstance',
    serverRoute: 'Web Audio API / AI Master Studio Speech synthesis',
    source: 'Workspace Speech Mic Control (DecompilerWorkspace.tsx)',
    destination: 'Browser Audio Driver Speakers (Voice Synth Engine)',
    purpose: 'Activates the specialized decompiler speech chimes to guide the user during decompilation logs analysis.',
    teluguDesc: 'రివర్స్ ఇంజనీరింగ్ చేస్తున్నప్పుడు... లోపాలను వాయిస్ ఆదేశాల ద్వారా విశ్లేషిస్తూ, స్పీచ్ మరియు ఆడియో శబ్దాల ద్వారా గైడ్ చేసే స్వయంప్రతిపత్తి (Autonomous) గల వాయిస్ ఏజెంట్ కనెక్షన్.',
    teluguSource: 'వర్క్‌స్పేస్ లోని వాయిస్ స్పీకర్ ఐకాన్/మైక్ కంట్రోల్',
    teluguDest: 'బ్రౌజర్ యొక్క వెబ్ ఆడియో డ్రైవర్ (Web Audio API) మరియు స్పీకర్లు'
  }
];

// ==========================================
// 🎛️ 4. EXPOSING SERVICE CONNECTIONS (ప్రాజెక్ట్ వెలుపలి ఎక్స్‌పోజింగ్ వైరింగ్)
// ==========================================
export const EXPOSING_SERVICE_CONNECTIONS: StudioConnection[] = [
  {
    id: 'expose-local-url',
    controlName: 'Expose Localhost Port to WAN',
    triggerAction: 'startExposingFlow',
    serverRoute: '/api/expose-port',
    source: 'ExposingStudio.tsx "Start Tunnel" click',
    destination: 'Cloud WAN Secure Tunnel Server Registry',
    purpose: 'Exposes local build server port safely to wide area network using secure tunnels for live remote testing.',
    teluguDesc: 'మన లోకల్ కంప్యూటర్‌లో నడుస్తున్న అప్లికే션을... ప్రపంచంలో ఎక్కడి నుండైనా లైవ్‌గా టెస్ట్ చేసుకునేలా గ్లోబల్ టన్నెల్ లింక్ (WAN URL) తయారు చేసే కనెక్షన్.',
    teluguSource: 'ఎక్స్‌పోజింగ్ కంట్రోల్ ప్యానెల్ లోని "Start Tunnel" బటన్',
    teluguDest: 'ఇంటర్నెట్ ద్వారా కనెక్ట్ అయ్యే గ్లోబల్ సెక్యూర్ క్లౌడ్ టన్నెలింగ్ సర్вер (Secure WAN Tunnel)'
  }
];

// ==========================================
// 🧠 5. AI AGENTS TRAINING & GOVERNANCE CONNECTIONS (ఏఐ ఏజెంట్ల ట్రైనింగ్ నిబంధనల వైరింగ్)
// ==========================================
export const AI_AGENT_TRAINING_CONNECTIONS: StudioConnection[] = [
  {
    id: 'normal-studio-training-wiring',
    controlName: 'Normal App Studio Agents Training connection',
    triggerAction: 'NORMAL_STUDIO_TRAINING_RULES',
    serverRoute: '/src/config/training/normalStudioTraining.ts',
    source: 'NORMAL_STUDIO_AGENTS list (agentsConfig.ts)',
    destination: 'Gemini / Claude / DeepSeek System Prompt Context',
    purpose: 'Wires the specific PWA App creation guidelines directly to the system instructions of Normal Studio Agents.',
    teluguDesc: 'నార్మల్ స్టూడియో ఏజెంట్లకు వారి ట్రైనింగ్ ఫైల్ (/src/config/training/normalStudioTraining.ts) నుండి నియమాలను అనుసంధానించే కనెక్షన్.',
    teluguSource: 'నార్మల్ ఏజెంట్ల కాన్ఫిగరేషన్ లిస్ట్ (agentsConfig.ts)',
    teluguDest: 'మోడల్ యొక్క సిస్టమ్ ఇన్‌స్ట్రక్షన్ మరియు ఏఐ ప్రాంప్ట్ కంటెక్స్ట్'
  },
  {
    id: 'fixable-studio-training-wiring',
    controlName: 'Self Repair Studio 12 Laws Training connection',
    triggerAction: 'FIXABLE_STUDIO_TRAINING_RULES',
    serverRoute: '/src/config/training/fixableStudioTraining.ts',
    source: 'SELF_FIXER_STUDIO_AGENTS list (agentsConfig.ts)',
    destination: 'Gemini / DeepSeek Specialized Repair Prompt Context',
    purpose: 'Wires the 12 strict repair laws directly to the system instructions of Self Repair Studio Agents.',
    teluguDesc: 'రిపేర్ స్టూడియో లోపలి 8 ఏజెంట్లకు వారి 12 కఠిన నియమాల ట్రైనింగ్ ఫైల్ (/src/config/training/fixableStudioTraining.ts) ను లింక్ చేసే కనెక్షన్.',
    teluguSource: 'రిపేర్ ఏజెంట్ల కాన్ఫిగరేషన్ లిస్ట్ (agentsConfig.ts)',
    teluguDest: 'స్పెషలైజ్డ్ ఏఐ రిపేర్ సిస్టమ్ ఇన్‌స్ట్రక్షన్'
  },
  {
    id: 'reverse-studio-training-wiring',
    controlName: 'Voice Repair Decompiler 22 Laws Training connection',
    triggerAction: 'REVERSE_STUDIO_TRAINING_RULES',
    serverRoute: '/src/config/training/reverseStudioTraining.ts',
    source: 'REVERSE_STUDIO_AGENTS list (agentsConfig.ts)',
    destination: 'Autonomous Voice Specialist Speech Synthesis Context',
    purpose: 'Wires the 22 master decompiler governance laws directly to the Voice Repair Decompiler Agent.',
    teluguDesc: 'వాయిస్ డీకంపైలర్ ఏజెంట్‌కు తన 22 మాస్టర్ నియమాల ట్రైనింగ్ ఫైల్ (/src/config/training/reverseStudioTraining.ts) ను నేరుగా అనుసంధానించే కనెక్షన్.',
    teluguSource: 'రివర్స్ ఏజెంట్ల కాన్ఫిగరేషన్ లిస్ట్ (agentsConfig.ts)',
    teluguDest: 'వాయిస్ రిపేర్ స్పీచ్ మరియు డయాగ్నస్టిక్స్ ఇంజిన్'
  }
];
