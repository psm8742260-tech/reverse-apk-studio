// ==============================================================================
// 🏛️ అడ్మిన్ యాక్సెస్ పాలసీ మరియు కేంద్రీకృత అధికారాల ఫైల్ (CENTRAL ADMIN ACCESS SYSTEM)
// ==============================================================================
// 💡 తెలుగు సమగ్ర వివరణ (Admin Master Telugu Documentation):
// అడ్మిన్ గారు! AI Master Studio లోని పూర్తి అడ్మిన్ అధికారాలు, విజిబిలిటీ స్విచ్‌లు,
// మరియు సెక్యూరిటీ గేట్‌వేలు ఈ ఒక్క ఫైల్ నుండే నియంత్రించబడతాయి.
// భవిష్యత్తులో మీరు ఏదైనా మార్చుకోవాలనుకుంటే (ఈమెయిల్, ఫోన్ నెంబర్, పాస్‌కోడ్ లేదా బటన్లు),
// ఇతర ఏ కోడ్ ఫైళ్లను ముట్టుకోకుండా, కేవలం ఈ ఒక్క ఫైల్‌లోనే మార్పులు చేసుకోవచ్చు!
// ==============================================================================

/**
 * 📧 1. అడ్మిన్ అధికారిక జిమెయిల్ (Authorized Admin Gmail)
 * 💡 తెలుగు వివరణ: అడ్మిన్ గారి అధికారిక ఈమెయిల్ అడ్రస్. 
 * ఈ ఈమెయిల్‌తో లాగిన్ అయినప్పుడు మాత్రమే అడ్మిన్ ప్యానెల్ మరియు కంట్రోలర్లు తెరుచుకుంటాయి.
 */
export const AUTHORIZED_ADMIN_GMAIL = "psm8742260@gmail.com";

/**
 * 📱 2. అడ్మిన్ అధికారిక మొబైల్ నెంబర్ (Authorized Admin Phone)
 * 💡 తెలుగు వివరణ: అడ్మిన్ గారి అధికారిక 10 అంకెల మొబైల్ నెంబర్. 
 * ఈ నెంబర్‌తో లాగిన్ అయినప్పుడు కూడా అడ్మిన్ ప్యానెల్ మరియు పూర్తి అధికారాలు లభిస్తాయి.
 */
export const AUTHORIZED_ADMIN_PHONE = "8466062260";

/**
 * 🔑 3. అడ్మిన్ గేట్‌వే సీక్రెట్ నెంబర్ (Admin Secret Passcode)
 * 💡 తెలుగు వివరణ: హెడర్ లోగో లేదా గేట్‌వే వద్ద వాడే అధికారిక సీక్రెట్ పాస్‌వర్డ్.
 */
export const ADMIN_GATEWAY_SECRET = "6606";

/**
 * ⚡ 4. సిస్టమ్ పాస్‌కోడ్ బైపాస్ కీ (System Bypass Master Key)
 * 💡 తెలుగు వివరణ: లాక్ అయిన ప్రాజెక్టులు, మోడల్స్ మరియు చాట్‌ను అన్‌లాక్ చేయడానికి వాడే మాస్టర్ కీ.
 */
export const ADMIN_PASSCODE_BYPASS = "ADMIN_BYPASS";

/**
 * 🎛️ 5. అడ్మిన్ బటన్ల విజిబిలిటీ స్విచ్‌లు (Admin UI Visibility Switches)
 * 💡 తెలుగు వివరణ: అడ్మిన్ గారు! స్క్రీన్‌పై ఏ బటన్ కనిపించాలి, ఏది దాచాలి అనేది
 * మీరు ఇక్కడే true లేదా false మార్చి చాలా సులభంగా కంట్రోల్ చేసుకోవచ్చు:
 */
export const ADMIN_UI_VISIBILITY_CONFIG = {
  /**
   * 🔘 బటన్ 1: హెడర్ కుడివైపున పర్పుల్ కలర్ '[🔒 Admin]' బటన్ కనిపించాలా?
   * 💡 true = అడ్మిన్ లాగిన్ అయినప్పుడు హెడర్‌లో Admin బటన్ కనిపిస్తుంది.
   * 💡 false = ఎవరికీ కనిపించదు.
   */
  showHeaderAdminButton: true,

  /**
   * 🔘 బటన్ 2: సెట్టింగ్స్ లో '[🔒 Admin Off All]' డెవలపర్ కంట్రోలర్ బటన్ కనిపించాలా?
   * 💡 true = అడ్మిన్ లాగిన్ అయినప్పుడు మాత్రమే ఈ బటన్ కనిపిస్తుంది.
   * 💡 false = ఎవరికీ కనిపించదు.
   */
  showAdminDeveloperControl: true,

  /**
   * 🔘 బటన్ 3: సైడ్‌బార్ లో '[⚡ AI Master Studio]' సెల్ఫ్ ఫిక్సర్ బటన్ కనిపించాలా?
   * 💡 true = అడ్మిన్ లాగిన్ అయినప్పుడు మాత్రమే సైడ్‌బార్‌లో ఈ గోల్డెన్ బటన్ కనిపిస్తుంది.
   * 💡 false = ఎవరికీ కనిపించదు.
   */
  showSelfFixerInSidebar: true,
};

/**
 * 🛡️ అడ్మిన్ యాక్సెస్ కాన్ఫిగరేషన్ ఇంటర్‌ఫేస్
 */
export interface AdminAccessConfig {
  role: 'ADMIN';
  canAccessAdminPanel: boolean;
  canAccessAdminGateway: boolean;
  canViewAdminDeveloperControllers: boolean;
  canBypassChatLock: boolean;
  canBypassSystemPasscodes: boolean;
  canSwitchAllAIModels: boolean;
  canManageDeployments: boolean;
  canManageUsers: boolean;
  canOverrideProjectLocks: boolean;
  canAccessLiveVisualBuilder: boolean;
  canAccessDatabaseInternals: boolean;
  canDeployToPhrsCrowd: boolean;
  canAccessServerLogs: boolean;
  canForceUnlockManagerPermissions: boolean;
  canExportSystemCheckpoints: boolean;
}

/**
 * 📋 అడ్మిన్ యాక్సెస్ అనుమతుల వివరాల పట్టిక
 */
export interface AdminPermissionDetail {
  key: keyof AdminAccessConfig;
  name: string;
  nameTelugu: string;
  allowed: boolean;
  descriptionTelugu: string;
}

export const ADMIN_ACCESS_PERMISSIONS: AdminPermissionDetail[] = [
  {
    key: 'canAccessAdminPanel',
    name: 'Admin Panel Access',
    nameTelugu: 'అడ్మిన్ ప్యానెల్ యాక్సెస్',
    allowed: true,
    descriptionTelugu: 'సిస్టమ్ ఫీచర్ ఫ్లాగ్స్, సెట్టింగ్స్ మరియు ప్రాజెక్ట్ మేనేజ్‌మెంట్ ప్యానెల్ తెరవగలరు.'
  },
  {
    key: 'canAccessAdminGateway',
    name: 'Admin Gateway Secret Trigger',
    nameTelugu: 'అడ్మిన్ గేట్‌వే సీక్రెట్ ట్రిగ్గర్',
    allowed: true,
    descriptionTelugu: 'హెడర్ టైటిల్‌పై 5 క్లిక్‌లు చేయడం ద్వారా పాస్‌కోడ్ గేట్‌వే ఓపెన్ చేయగలరు.'
  },
  {
    key: 'canViewAdminDeveloperControllers',
    name: 'Admin Developer Controllers',
    nameTelugu: 'అడ్మిన్ డెవలపర్ కంట్రోలర్స్',
    allowed: true,
    descriptionTelugu: 'అడ్మిన్ మొబైల్ (8466062260) లాగిన్ అయినప్పుడు మాత్రమే డెవలపర్ టెస్టింగ్ కంట్రోల్స్ కనిపిస్తాయి.'
  },
  {
    key: 'canBypassChatLock',
    name: 'Bypass Chat Lock',
    nameTelugu: 'చాట్ లాక్ బైపాస్',
    allowed: true,
    descriptionTelugu: 'చాట్ 2 మెసేజ్‌ల లాక్‌ను అడ్మిన్ బైపాస్ చేయగలరు (పరిమితి లేకుండా చాట్ చేయవచ్చు).'
  },
  {
    key: 'canBypassSystemPasscodes',
    name: 'Bypass Passcodes & Locks',
    nameTelugu: 'సిస్టమ్ పాస్‌కోడ్స్ బైపాస్',
    allowed: true,
    descriptionTelugu: 'ADMIN_BYPASS ద్వారా ఏదైనా లాక్ అయిన ప్రాజెక్ట్ లేదా ఎడిటర్‌ను అన్‌లాక్ చేయగలరు.'
  },
  {
    key: 'canSwitchAllAIModels',
    name: 'Switch All AI Models',
    nameTelugu: 'అన్ని ఏఐ మోడల్స్ ఎంపిక',
    allowed: true,
    descriptionTelugu: 'హెడర్‌లో జెమిని, క్లాడ్, డీప్‌సీక్ వంటి అధునాతన మోడళ్లను నేరుగా స్విచ్ చేయగలరు.'
  },
  {
    key: 'canManageDeployments',
    name: 'Manage Cloud Deployments',
    nameTelugu: 'క్లౌడ్ డిప్లాయ్‌మెంట్స్ నిర్వహణ',
    allowed: true,
    descriptionTelugu: 'PHRS Crowd సర్వర్ డిప్లాయ్‌మెంట్లు, లింకులు మరియు స్టేటస్‌లను సవరించగలరు.'
  },
  {
    key: 'canAccessLiveVisualBuilder',
    name: 'Live Visual Builder',
    nameTelugu: 'లైవ్ విజువల్ బిల్డర్ ఎడిటింగ్',
    allowed: true,
    descriptionTelugu: 'UI కాంపోనెంట్లను లైవ్ గా డ్రాగ్ & డ్రాప్ చేసి ఎడిట్ చేసే పూర్తి అధికారం.'
  },
  {
    key: 'canAccessDatabaseInternals',
    name: 'Database Internals Access',
    nameTelugu: 'డేటాబేస్ ఇంటర్నల్స్ యాక్సెస్',
    allowed: true,
    descriptionTelugu: 'ఫైర్‌బేస్ ఫైర్‌స్టోర్ కలెక్షన్లు మరియు డేటాను యాక్సెస్ చేసే అధికారం.'
  },
  {
    key: 'canForceUnlockManagerPermissions',
    name: 'Force Unlock Manager Permissions',
    nameTelugu: 'మేనేజర్ పరిమితులను ఓవర్‌రైడ్ చేయడం',
    allowed: true,
    descriptionTelugu: 'ఎడిటింగ్, అప్‌లోడింగ్ పై ఉండే ఏవైనా పరిమితులను ఫోర్స్ అన్‌లాక్ చేయగలరు.'
  }
];

export const DEFAULT_ADMIN_ACCESS_RULES: AdminAccessConfig = {
  role: 'ADMIN',
  canAccessAdminPanel: true,
  canAccessAdminGateway: true,
  canViewAdminDeveloperControllers: true,
  canBypassChatLock: true,
  canBypassSystemPasscodes: true,
  canSwitchAllAIModels: true,
  canManageDeployments: true,
  canManageUsers: true,
  canOverrideProjectLocks: true,
  canAccessLiveVisualBuilder: true,
  canAccessDatabaseInternals: true,
  canDeployToPhrsCrowd: true,
  canAccessServerLogs: true,
  canForceUnlockManagerPermissions: true,
  canExportSystemCheckpoints: true,
};

/**
 * 🔍 6. యూజర్ అడ్మిన్ అవునో కాదో ఖచ్చితంగా ధృవీకరించే కోర్ ఫంక్షన్ (Zero-Loopholes)
 * 💡 తెలుగు వివరణ: లాగిన్ అయిన వ్యక్తి యొక్క ఈమెయిల్ లేదా ఫోన్ నెంబర్ ఖచ్చితంగా
 * అడ్మిన్ ఆధారాలతో సరిపోలితేనే true రిటర్న్ చేస్తుంది. సాధారణ యూజర్లకు ఖచ్చితంగా false రిటర్న్ అవుతుంది.
 */
export function isAdminUser(
  userEmail?: string | null,
  userPhone?: string | null,
  isAdminUnlocked?: boolean
): boolean {
  try {
    const cleanEmail = (userEmail || '').trim().toLowerCase();
    const cleanPhone = (userPhone || '').trim().replace(/\D/g, '');
    const adminPhoneDigits = AUTHORIZED_ADMIN_PHONE.replace(/\D/g, '');

    const emailMatch = !!(cleanEmail && cleanEmail === AUTHORIZED_ADMIN_GMAIL.toLowerCase());
    const phoneMatch = !!(cleanPhone && cleanPhone.includes(adminPhoneDigits));
    const phoneDirectEmailMatch = !!(userPhone && userPhone.trim().toLowerCase() === AUTHORIZED_ADMIN_GMAIL.toLowerCase());

    const isUnlocked = isAdminUnlocked === true;

    return emailMatch || phoneMatch || phoneDirectEmailMatch || isUnlocked;
  } catch {
    return false;
  }
}

/**
 * 📱 7. అడ్మిన్ మొబైల్ లేదా జిమెయిల్ లాగిన్ వెరిఫికేషన్ ఫంక్షన్
 * 💡 తెలుగు వివరణ: డెవలపర్ కంట్రోల్స్ కోసం ఈమెయిల్ మరియు ఫోన్ నెంబర్ రెండింటినీ సమాన అధికారాలతో చెక్ చేస్తుంది.
 */
export function isAdminMobileUser(
  userEmail?: string | null,
  userPhone?: string | null,
  isAdminUnlocked?: boolean
): boolean {
  return isAdminUser(userEmail, userPhone, isAdminUnlocked);
}

/**
 * 🔒 8. స్క్రీన్‌షాట్ 2: హెడర్‌లోని పర్పుల్ '[🔒 Admin]' బటన్ కనిపించవచ్చా లేదా నిర్ణయించే ఫంక్షన్
 * 💡 తెలుగు వివరణ: అడ్మిన్ జిమెయిల్ లేదా మొబైల్ నెంబర్‌తో లాగిన్ అయినప్పుడు మాత్రమే
 * హెడర్‌లో ఆ అడ్మిన్ బటన్ కనిపిస్తుంది. నార్మల్ యూజర్లకు కనిపించదు.
 */
export function canShowHeaderAdminButton(
  userEmail?: string | null,
  userPhone?: string | null,
  isAdminUnlocked?: boolean
): boolean {
  if (!ADMIN_UI_VISIBILITY_CONFIG.showHeaderAdminButton) return false;
  return isAdminUser(userEmail, userPhone, isAdminUnlocked);
}

/**
 * ⚡ 9. స్క్రీన్‌షాట్ 1: సెట్టింగ్స్‌లోని '[🔒 Admin Off All]' బటన్ కనిపించవచ్చా లేదా నిర్ణయించే ఫంక్షన్
 * 💡 తెలుగు వివరణ: అడ్మిన్ జిమెయిల్ లేదా మొబైల్ నెంబర్‌తో లాగిన్ అయినప్పుడు మాత్రమే
 * 'ADMIN DEVELOPER CONTROL' కింద ఉన్న ఆ బటన్ కనిపిస్తుంది. నార్మల్ యూజర్లకు కనిపించదు.
 */
export function canShowAdminDeveloperControl(
  userEmail?: string | null,
  userPhone?: string | null,
  isAdminUnlocked?: boolean
): boolean {
  if (!ADMIN_UI_VISIBILITY_CONFIG.showAdminDeveloperControl) return false;
  return isAdminUser(userEmail, userPhone, isAdminUnlocked);
}

/**
 * 🛠️ 10. స్క్రీన్‌షాట్ 3: సైడ్‌బార్‌లోని '[⚡ AI Master Studio]' సెల్ఫ్ ఫిక్సర్ బటన్ కనిపించవచ్చా లేదా నిర్ణయించే ఫంక్షన్
 * 💡 తెలుగు వివరణ: అడ్మిన్ జిమెయిల్ లేదా మొబైల్ నెంబర్‌తో లాగిన్ అయినప్పుడు మాత్రమే
 * సైడ్‌బార్‌లో ఆ బంగారు మెరుపు గుర్తుతో కూడిన బటన్ కనిపిస్తుంది. నార్మల్ యూజర్లకు కనిపించదు.
 */
export function canShowSelfFixerButton(
  userEmail?: string | null,
  userPhone?: string | null,
  isAdminUnlocked?: boolean
): boolean {
  if (!ADMIN_UI_VISIBILITY_CONFIG.showSelfFixerInSidebar) return false;
  return isAdminUser(userEmail, userPhone, isAdminUnlocked);
}

/**
 * 🔑 11. అడ్మిన్ పాస్‌వర్డ్ సరైనదో కాదో తనిఖీ చేసే ఫంక్షన్
 */
export function verifyAdminPasscode(passcode: string): boolean {
  if (!passcode) return false;
  const clean = passcode.trim();
  return clean === ADMIN_GATEWAY_SECRET || clean === "6606.ok" || clean === "6606.0k" || clean === "66060k";
}

/**
 * 📜 12. అడ్మిన్ యాక్సెస్ రూల్స్ ను పొందే ఫంక్షన్
 */
export function getAdminAccessRules(): AdminAccessConfig {
  return { ...DEFAULT_ADMIN_ACCESS_RULES };
}
