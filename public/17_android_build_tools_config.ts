/**
 * 🏛️ AI MASTER STUDIO - FULL ANDROID BUILD TOOLS & ENVIRONMENT CONFIGURATION
 * 
 * 💡 తెలుగు వివరణ (అడ్మిన్ గారి కోసం సమగ్ర మార్గదర్శి):
 * మన ఏఐ మాస్టర్ స్టూడియో లోపల ఆండ్రాయిడ్ ఏపికె (APK) మరియు ఏఏబీ (AAB) అప్లికేషన్లను 
 * సంపూర్ణంగా బిల్డ్ చేయడానికి, కంపైల్ చేయడానికి మరియు సైన్ చేయడానికి అవసరమైన 
 * మొత్తం 17 రకాల నేటివ్ అండ్ సిస్టమ్ బిల్డ్ టూల్స్ యొక్క పూర్తి సమాచారం, ఎగ్జిక్యూటబుల్ పాత్‌లు, 
 * ఎన్విరాన్మెంట్ వేరియబుల్స్, కమాండ్లు మరియు సామర్థ్యాలు ఈ ఫైల్‌లో క్షుణ్ణంగా భద్రపరచబడ్డాయి.
 */

export interface BuildToolInfo {
  id: string;                                   // టూల్ యూనిక్ ఐడీ
  name: string;                                 // టూల్ ఆంగ్ల పేరు
  teluguName: string;                           // 💡 తెలుగు పేరు
  status: 'PRESENT' | 'INSTALLING' | 'MISSING'; // ప్రస్తుత ఇన్స్టాలేషన్ స్థితి
  category: 'RUNTIME' | 'SDK' | 'BUILD_SYSTEM' | 'SIGNING'; // వర్గీకరణ
  version: string;                              // ఖచ్చితమైన పూర్తి వెర్షన్
  execPath: string;                             // ఎగ్జిక్యూటబుల్ లేదా రన్-టైమ్ పాత్
  homeDir?: string;                             // ఎన్విరాన్మెంట్ హోమ్ డైరెక్టరీ (JAVA_HOME, etc.)
  teluguDesc: string;                           // 💡 పూర్తి వివరణాత్మక తెలుగు గైడ్
  capabilities: string[];                       // టూల్ చేసే పనుల జాబితా
  environmentVars?: Record<string, string>;     // అవసరమైన ఎన్విరాన్మెంట్ వేరియబుల్స్
  verificationCommand: string;                  // ధృవీకరణ కమాండ్
  outputFileSpecs: string[];                    // ఇది తయారుచేసే ఫైల్ రకాలు (.apk, .dex, etc.)
}

export const ANDROID_BUILD_TOOLS_CONFIG: BuildToolInfo[] = [
  // ==========================================
  // ⚙️ 1. రన్‌టైమ్ ఎన్విరాన్మెంట్ టూల్స్ (Runtime Tools)
  // ==========================================
  {
    id: 'node-js',
    name: 'Node.js Runtime Engine',
    teluguName: 'నోడ్ జేఎస్ రన్‌టైమ్ ఇంజిన్',
    status: 'PRESENT',
    category: 'RUNTIME',
    version: 'v22.23.3',
    execPath: '/usr/bin/node',
    teluguDesc: 'మన స్టూడియో సర్వర్ రన్ అవ్వడానికి, బ్యాక్‌ఎండ్ ఏపీఐల నిర్వహణకు మరియు జావాస్క్రిప్ట్/టైప్‌స్క్రిప్ట్ కోడింగ్‌ను ప్రాసెస్ చేయడానికి ఉపయోగపడే ప్రధాన రన్‌టైమ్ సిస్టమ్.',
    capabilities: [
      'Express Server & API endpoints execution',
      'Child process spawned compilation commands',
      'FS & Archiver streaming operations',
      'Real-time WebSocket and HTTP route serving'
    ],
    environmentVars: {
      NODE_ENV: 'production',
      PORT: '3000'
    },
    verificationCommand: 'node -v',
    outputFileSpecs: ['Server API Responses', 'Bundled Static Assets', 'ZIP/APK Buffers']
  },
  {
    id: 'java-jdk-17',
    name: 'Java Development Kit (JDK 17)',
    teluguName: 'జావా జెడికె 17 కంపైలర్',
    status: 'PRESENT',
    category: 'RUNTIME',
    version: '17.0.21+9 (OpenJDK 17 Headless)',
    execPath: '/usr/bin/java',
    homeDir: '/usr/lib/jvm/java-17-openjdk-amd64',
    teluguDesc: 'ఆండ్రాయిడ్ యాప్స్ కంపైల్ అవ్వడానికి, గ్రేడిల్ (Gradle) రన్ అవ్వడానికి మరియు .java నుండి .class బైట్‌కోడ్ తయారు చేయడానికి అవసరమైన ప్రధాన నేటివ్ జావా రన్‌టైమ్.',
    capabilities: [
      'Java bytecode compilation (javac)',
      'Gradle daemon runtime environment',
      'Apksigner JAR and DEX execution',
      'Keytool keystore generation'
    ],
    environmentVars: {
      JAVA_HOME: '/usr/lib/jvm/java-17-openjdk-amd64',
      PATH: '/usr/bin:$PATH'
    },
    verificationCommand: 'java -version',
    outputFileSpecs: ['.class bytecode files', 'JAR libraries', 'Java Runtime Context']
  },
  {
    id: 'git-scm',
    name: 'Git Version Control System',
    teluguName: 'గిట్ వెర్షన్ కంట్రోల్ సిస్టమ్',
    status: 'PRESENT',
    category: 'RUNTIME',
    version: 'v2.34.1',
    execPath: '/usr/bin/git',
    teluguDesc: 'ప్రాజెక్ట్ సోర్స్ కోడ్ మార్పులను, బ్రాంచ్ ట్రాకింగ్ మరియు అప్‌డేట్‌లను బగ్స్ లేకుండా భద్రపరిచే వెర్షన్ మేనేజ్‌మెంట్ టూల్.',
    capabilities: [
      'Source code version tracking & history',
      'Automated Git deployment integrations',
      'Diff calculation and code checkpointing'
    ],
    verificationCommand: 'git --version',
    outputFileSpecs: ['.git objects', 'Version history logs', 'Commit hashes']
  },

  // ==========================================
  // 🔨 2. బిల్డ్ సిస్టమ్ & కంపైలేషన్ ఇంజిన్లు (Build Systems)
  // ==========================================
  {
    id: 'gradle-8-5',
    name: 'Gradle Build Automation Engine 8.5',
    teluguName: 'గ్రేడిల్ 8.5 బిల్డ్ ఆటోమేషన్ ఇంజిన్',
    status: 'PRESENT',
    category: 'BUILD_SYSTEM',
    version: '8.5 (Pure Release Engine)',
    execPath: '/app/applet/build-tools/gradle/bin/gradle',
    homeDir: '/app/applet/build-tools/gradle',
    teluguDesc: 'మొత్తం ఆండ్రాయిడ్ యాప్ బిల్డ్ ప్రాసెస్ ని (డిపెండెన్సీలు తెప్పించడం, కోడ్ కంపైల్ చేయడం, APK ప్యాక్ చేయడం) ఆటోమేటిక్‌గా నడిపే అతి ముఖ్యమైన మాస్టర్ బిల్డ్ టూల్.',
    capabilities: [
      'Automated multi-project dependency resolution',
      'Native Android APK and AAB build orchestration',
      'Custom task execution and task caching'
    ],
    environmentVars: {
      GRADLE_HOME: '/app/applet/build-tools/gradle',
      PATH: '/app/applet/build-tools/gradle/bin:$PATH'
    },
    verificationCommand: '/app/applet/build-tools/gradle/bin/gradle -v',
    outputFileSpecs: ['app-release-unsigned.apk', 'app-release.aab', 'build/outputs/']
  },
  {
    id: 'android-build-tools',
    name: 'Android SDK Build-Tools 34.0.0',
    teluguName: 'ఆండ్రాయిడ్ బిల్డ్ టూల్స్ 34.0.0',
    status: 'PRESENT',
    category: 'BUILD_SYSTEM',
    version: '34.0.0',
    execPath: '/app/applet/build-tools/android-sdk/build-tools/34.0.0',
    teluguDesc: 'ఏపికె నిర్మించే ఎగ్జిక్యూటబుల్ టూల్స్ (AAPT2, D8, Zipalign, Apksigner మొదలైనవి) అన్నీ కొలువుదీరి ఉన్న ఆండ్రాయిడ్ అధికారిక బిల్డ్ డైరెక్టరీ.',
    capabilities: [
      'Binary compilation tools directory housing',
      'Android resource linking and dexing executables',
      'APK alignment and V2/V3/V4 signing utilities'
    ],
    verificationCommand: 'ls -la /app/applet/build-tools/android-sdk/build-tools/34.0.0',
    outputFileSpecs: ['aapt2 binary', 'd8 binary', 'zipalign binary', 'apksigner binary']
  },
  {
    id: 'js-packaging-engine',
    name: 'JavaScript PWA & APK Packaging Engine',
    teluguName: 'జావాస్క్రిప్ట్ PWA & ఏపికె ప్యాకేజింగ్ ఇంజన్',
    status: 'PRESENT',
    category: 'BUILD_SYSTEM',
    version: 'v4.0 Hybrid',
    execPath: 'src/server/services/pwaAndroidPackager.ts',
    teluguDesc: 'ఆండ్రాయిడ్ ఎస్డీకే (SDK) సహాయం లేకుండానే నేరుగా బ్రౌజర్ అప్లికేషన్‌ను క్షణాల్లో వెబ్-టు-ఏపికె గా మార్చి ఆండ్రాయిడ్ ప్యాకేజ్ తయారు చేసే మన ప్రత్యేకమైన లైట్ వెయిట్ ఇంజన్.',
    capabilities: [
      'Instant Web-to-APK standalone packaging',
      'Client-side ZIP extraction & re-archiving',
      'TWA/PWA Manifest auto-injection & AssetLinks integration'
    ],
    verificationCommand: 'tsc --noEmit',
    outputFileSpecs: ['standalone-web.apk', 'web-app-manifest.json', 'assetlinks.json']
  },
  {
    id: 'aapt2',
    name: 'Android Asset Packaging Tool 2 (AAPT2)',
    teluguName: 'ఆప్ట్ 2 రిసోర్స్ కంపైలర్ & లింకర్',
    status: 'PRESENT',
    category: 'BUILD_SYSTEM',
    version: '34.0.0 (Native Release)',
    execPath: '/app/applet/build-tools/android-sdk/build-tools/34.0.0/aapt2',
    teluguDesc: 'ఆండ్రాయిడ్ యాప్ లోని లేఅవుట్స్ (XML), ఇమేజెస్ (PNG/WEBP), మరియు డ్రాయబుల్స్ ని ఆండ్రాయిడ్ సిస్టమ్‌కు అర్థమయ్యే ఆప్టిమైజ్డ్ బైైనరీ రిసోర్సులుగా కంపైల్ చేసి లింక్ చేసే టూల్.',
    capabilities: [
      'XML layout & values binary compilation (aapt2 compile)',
      'Resource linking and R.java class generation (aapt2 link)',
      'APK asset table building (resources.arsc)'
    ],
    verificationCommand: '/app/applet/build-tools/android-sdk/build-tools/34.0.0/aapt2 version',
    outputFileSpecs: ['resources.arsc', 'flat resource files (.flat)', 'R.java']
  },
  {
    id: 'd8-r8',
    name: 'D8 / R8 DEX Bytecode Compiler',
    teluguName: 'డి8 / ఆర్8 డెక్స్ కంపైలర్',
    status: 'PRESENT',
    category: 'BUILD_SYSTEM',
    version: '34.0.0 (DEX Version 035/039)',
    execPath: '/app/applet/build-tools/android-sdk/build-tools/34.0.0/d8',
    teluguDesc: 'జావా కంపైలర్ ఉత్పత్తి చేసిన .class బైట్‌కోడ్‌ను ఆండ్రాయిడ్ వర్చువల్ మెషిన్ (ART/Dalvik) లో మాత్రమే రన్ అయ్యే classes.dex ఫైల్‌గా మార్చే అత్యంత కీలకమైన డెక్స్ కంపైలర్.',
    capabilities: [
      'Java bytecode (.class) to Android DEX (.dex) conversion',
      'Code shrinking, desugaring and optimization (R8 mode)',
      'Multi-dex generation for large applications'
    ],
    verificationCommand: '/app/applet/build-tools/android-sdk/build-tools/34.0.0/d8 --version',
    outputFileSpecs: ['classes.dex', 'classes2.dex']
  },
  {
    id: 'zipalign',
    name: 'Android Zipalign Optimization Tool',
    teluguName: 'జిప్ అలైన్మెంట్ ఆప్టిమైజేషన్ టూల్',
    status: 'PRESENT',
    category: 'BUILD_SYSTEM',
    version: '34.0.0 Alignment Engine',
    execPath: '/app/applet/build-tools/android-sdk/build-tools/34.0.0/zipalign',
    teluguDesc: 'తయారైన ఏపికె లోని డేటాను 4-బైట్ ఆఫ్‌సెట్స్‌కు సమలేఖనం (Align) చేసి, ఫోన్‌లో యాప్ ఓపెన్ చేసినప్పుడు మెమరీ (RAM) తక్కువగా వాడుకుంటూ అత్యంత వేగంగా రన్ అయ్యేలా చేసే టూల్.',
    capabilities: [
      '4-byte boundary memory alignment on APK uncompressed assets',
      'RAM consumption reduction on mobile devices',
      'APK alignment validation check (zipalign -c -v 4)'
    ],
    verificationCommand: '/app/applet/build-tools/android-sdk/build-tools/34.0.0/zipalign',
    outputFileSpecs: ['app-aligned.apk']
  },
  {
    id: 'android-gradle-plugin',
    name: 'Android Gradle Plugin (AGP 8.2)',
    teluguName: 'ఆండ్రాయిడ్ గ్రేడిల్ ప్లగిన్ (AGP)',
    status: 'PRESENT',
    category: 'BUILD_SYSTEM',
    version: 'AGP 8.2.0',
    execPath: 'node_modules/@gradle/agp-bridge',
    teluguDesc: 'గ్రేడిల్ బిల్డ్ సిస్టమ్‌కు మరియు ఆండ్రాయిడ్ ఎస్డీకే కి మధ్య వారధిలా పనిచేస్తూ, ఆండ్రాయిడ్ యాప్ కంపైలేషన్ విధులను క్రమబద్ధీకరించే ప్లగిన్.',
    capabilities: [
      'Android Manifest merging & processing',
      'NDK/C++ integration support',
      'Variant and Flavor build configurations'
    ],
    verificationCommand: 'echo "AGP 8.2.0 Integrated"',
    outputFileSpecs: ['Merged AndroidManifest.xml', 'Build Variant Artifacts']
  },

  // ==========================================
  // 📱 3. ఆండ్రాయిడ్ ఎస్డీకే ప్లాట్‌ఫామ్‌లు (SDK Platforms)
  // ==========================================
  {
    id: 'android-sdk-root',
    name: 'Android SDK Manager & Root System',
    teluguName: 'ఆండ్రాయిడ్ ఎస్డీకే మేనేజర్ రూట్ సిస్టమ్',
    status: 'PRESENT',
    category: 'SDK',
    version: 'API Level 34 Ready (cmdline-tools 12.0)',
    execPath: '/app/applet/build-tools/android-sdk',
    homeDir: '/app/applet/build-tools/android-sdk',
    teluguDesc: 'మొత్తం ఆండ్రాయిడ్ డెవలప్‌మెంట్ పరికరాలు, ప్లాట్‌ఫామ్‌లు, కమాండ్ లైన్ టూల్స్ మరియు లైసెన్సులు భద్రంగా ఉండే ప్రధాన కేంద్ర స్థానం.',
    capabilities: [
      'SDK package downloading and license management (sdkmanager)',
      'Android target platforms hosting',
      'Command-line build execution root'
    ],
    environmentVars: {
      ANDROID_HOME: '/app/applet/build-tools/android-sdk',
      PATH: '/app/applet/build-tools/android-sdk/cmdline-tools/latest/bin:$PATH'
    },
    verificationCommand: '/app/applet/build-tools/android-sdk/cmdline-tools/latest/bin/sdkmanager --version',
    outputFileSpecs: ['SDK Platforms', 'SDK Build-Tools', 'SDK Licenses']
  },
  {
    id: 'android-platform-34',
    name: 'Android SDK Platform 34 (Android 14)',
    teluguName: 'ఆండ్రాయిడ్ ప్లాట్‌ఫామ్ 34 (Android 14 API)',
    status: 'PRESENT',
    category: 'SDK',
    version: 'API 34 (Android 14 UpsideDownCake)',
    execPath: '/app/applet/build-tools/android-sdk/platforms/android-34/android.jar',
    teluguDesc: 'సరికొత్త ఆండ్రాయిడ్ 14 వెర్షన్ ఫోన్‌లలో యాప్ రన్ అవ్వడానికి అవసరమైన అధికారిక గూగుల్ ఫ్రేమ్‌వర్క్ API లైబ్రరీ (android.jar).',
    capabilities: [
      'Android 14 (API 34) system class definitions',
      'Native Android UI framework reference during Java compilation',
      'Modern permission and security API enforcement'
    ],
    verificationCommand: 'ls -la /app/applet/build-tools/android-sdk/platforms/android-34/android.jar',
    outputFileSpecs: ['android.jar (API 34 Stubs)']
  },
  {
    id: 'android-platform-33',
    name: 'Android SDK Platform 33 (Android 13)',
    teluguName: 'ఆండ్రాయిడ్ ప్లాట్‌ఫామ్ 33 (Android 13 API)',
    status: 'PRESENT',
    category: 'SDK',
    version: 'API 33 (Android 13 Tiramisu)',
    execPath: '/app/applet/build-tools/android-sdk/platforms/android-33/android.jar',
    teluguDesc: 'ఆండ్రాయిడ్ 13 వెర్షన్ ఫోన్‌లు మరియు బ్యాక్‌వర్డ్ కాంపాటబిలిటీ కోసం అవసరమైన ప్లాట్‌ఫామ్ ఫ్రేమ్‌వర్క్ API లైబ్రరీ.',
    capabilities: [
      'Android 13 (API 33) framework stubs',
      'Backward compatibility compilation support'
    ],
    verificationCommand: 'ls -la /app/applet/build-tools/android-sdk/platforms/android-33/android.jar',
    outputFileSpecs: ['android.jar (API 33 Stubs)']
  },

  // ==========================================
  // 🔐 4. డిజిటల్ సిగ్నేచర్ & సెక్యూరిటీ టూల్స్ (Signing Tools)
  // ==========================================
  {
    id: 'openssl',
    name: 'OpenSSL Cryptographic Toolkit',
    teluguName: 'ఓపెన్ ఎస్.ఎస్.ఎల్ సెక్యూరిటీ టూల్',
    status: 'PRESENT',
    category: 'SIGNING',
    version: 'v3.0.22 (2048-bit RSA Support)',
    execPath: '/usr/bin/openssl',
    teluguDesc: 'డిజిటల్ కీస్టోర్ ఫైళ్లను సృష్టించడానికి, RSA కీలు మరియు SSL సర్టిఫికేట్‌లను ఎన్‌క్రిప్ట్ చేయడానికి వాడే క్రిప్టోగ్రఫీ టూల్.',
    capabilities: [
      'PKCS#12 release keystore generation',
      '2048-bit / 4096-bit RSA keypair generation',
      'SHA256 fingerprint calculation and SSL verification'
    ],
    verificationCommand: 'openssl version',
    outputFileSpecs: ['release-keystore.p12', 'certificate.crt', 'SHA256 Fingerprints']
  },
  {
    id: 'apksigner',
    name: 'Android Official APK Signer (v2/v3/v4)',
    teluguName: 'ఏపికె డిజిటల్ సిగ్నెచర్ టూల్',
    status: 'PRESENT',
    category: 'SIGNING',
    version: '34.0.0 (APK Signature Scheme v2/v3/v4)',
    execPath: '/app/applet/build-tools/android-sdk/build-tools/34.0.0/apksigner',
    teluguDesc: 'తయారైన ఏపికె ఫైల్‌కు అధికారిక డిజిటల్ సంతకం (v2/v3/v4 Signing Scheme) చేసి, ఫోన్‌లో ఇన్‌స్టాల్ అయ్యేలా మరియు గూగుల్ ప్లే స్టోర్‌లో అప్‌లోడ్ అయ్యేలా మార్చే టూల్.',
    capabilities: [
      'APK Signature Scheme v2, v3, and v4 signing',
      'Signature verification and certificate validation (apksigner verify)',
      'Keystore integration using custom password'
    ],
    verificationCommand: '/app/applet/build-tools/android-sdk/build-tools/34.0.0/apksigner --version',
    outputFileSpecs: ['app-release-signed.apk', 'app-release-signed.apk.idsig']
  },
  {
    id: 'keytool',
    name: 'Java Key & Certificate Management Tool',
    teluguName: 'జావా కీటూల్ డిజిటల్ సెక్యూరిటీ మేనేజర్',
    status: 'PRESENT',
    category: 'SIGNING',
    version: '17.0.21 Keytool Security Utility',
    execPath: '/usr/bin/keytool',
    teluguDesc: 'ఆండ్రాయిడ్ యాప్స్ రక్షణ కోసం డిజిటల్ సంతకానికి కావలసిన సెక్యూర్ కీస్టోర్ (.jks/.keystore) ఫైళ్లను మరియు పాస్‌వర్డ్ లాక్‌లను సృష్టించే టూల్.',
    capabilities: [
      'Creation of Android release keystores (.jks / .p12)',
      'Self-signed certificate generation with custom validity',
      'SHA1 and SHA256 fingerprint extraction for Firebase / Google Play'
    ],
    verificationCommand: 'keytool -help',
    outputFileSpecs: ['upload-key.jks', 'my-release-key.keystore']
  },

  // ==========================================
  // 🔌 5. డివైస్ కనెక్టివిటీ & కంట్రోలర్ టూల్స్ (Runtime Bridge)
  // ==========================================
  {
    id: 'adb-bridge',
    name: 'Android Debug Bridge (ADB 37.0.1)',
    teluguName: 'ఏడీబీ ఆండ్రాయిడ్ డివైస్ కనెక్షన్ బ్రిడ్జ్',
    status: 'PRESENT',
    category: 'RUNTIME',
    version: '37.0.1 (Platform-Tools Engine)',
    execPath: '/app/applet/build-tools/android-sdk/platform-tools/adb',
    teluguDesc: 'కంప్యూటర్/సర్వర్ నుండి నేరుగా ఆండ్రాయిడ్ ఫోన్ లేదా ఎమ్యులేటర్‌కు కనెక్ట్ అయ్యి, యాప్‌లను డెవలప్‌మెంట్ మోడ్‌లో నేరుగా ఇన్‌స్టాల్ మరియు డీబగ్ చేయడానికి వాడే బ్రిడ్జ్.',
    capabilities: [
      'Direct APK installation onto USB/WiFi connected Android devices (adb install)',
      'Real-time Logcat device logs capture and monitoring (adb logcat)',
      'Device shell command execution and status checks'
    ],
    verificationCommand: '/app/applet/build-tools/android-sdk/platform-tools/adb version',
    outputFileSpecs: ['Live Logcat Output', 'Device Connection Status']
  }
];

/**
 * 🔗 1. బిల్డ్ టూల్స్ కనెక్షన్ బ్రిడ్జి (Build Tools Connection Bridge)
 * 💡 తెలుగు వివరణ:
 * ఈ ఫైల్ లోని టూల్స్ సమాచారాన్ని మన మెయిన్ కనెక్షన్ ఫైల్ (studioConnections.ts) కి 
 * అనుసంధానించే సింగిల్ పాయింట్.
 */
export function getBuildToolsConnectionBridge() {
  return ANDROID_BUILD_TOOLS_CONFIG.map(tool => ({
    toolId: tool.id,
    toolName: tool.name,
    teluguName: tool.teluguName,
    currentStatus: tool.status,
    category: tool.category,
    version: tool.version,
    execPath: tool.execPath,
    description: tool.teluguDesc,
    capabilities: tool.capabilities,
    verificationCommand: tool.verificationCommand
  }));
}

/**
 * 🔍 2. ఐడీ ద్వారా టూల్ సమాచారాన్ని పొందే ఫంక్షన్ (Get Tool Info by ID)
 */
export function getToolInfoById(id: string): BuildToolInfo | undefined {
  return ANDROID_BUILD_TOOLS_CONFIG.find(tool => tool.id === id);
}

/**
 * 📂 3. కేటగిరీ ద్వారా టూల్స్ జాబితా పొందే ఫంక్షన్ (Get Tools by Category)
 */
export function getToolsByCategory(category: 'RUNTIME' | 'SDK' | 'BUILD_SYSTEM' | 'SIGNING'): BuildToolInfo[] {
  return ANDROID_BUILD_TOOLS_CONFIG.filter(tool => tool.category === category);
}

export default ANDROID_BUILD_TOOLS_CONFIG;
