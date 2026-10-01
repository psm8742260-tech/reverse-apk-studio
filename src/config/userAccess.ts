// ==============================================================================
// 👤 సాధారణ యూజర్ యాక్సెస్ పాలసీ మరియు ఫీచర్ల ఫైల్ (USER ACCESS & PERMISSIONS MATRIX)
// ==============================================================================
// 💡 తెలుగు వివరణ (User Telugu Documentation):
// ఈ ఫైల్ AI Master Studio లో సాధారణ వినియోగదారులకు (Users / Developers) ఏయే ఫీచర్లు
// అందుబాటులో ఉంటాయి, ఎలాంటి పరిమితులు మరియు భద్రతా హక్కులు వర్తిస్తాయో స్పష్టంగా తెలుపుతుంది.
// 
// 🌟 సాధారణ యూజర్లకు అందుబాటులో ఉండే ఫీచర్లు (User Allowed Features):
// 1. ప్రాజెక్ట్ క్రియేషన్ & ఎడిటింగ్: కొత్త ప్రాజెక్ట్‌లను తయారు చేసుకోవడం మరియు సొంత కోడ్‌ను ఎడిట్ చేయడం.
// 2. APK అప్‌లోడ్ & డీకంపైలర్: Android APK లను అప్‌లోడ్ చేసి కోడ్ మరియు అసెట్స్‌ను విశ్లేషించడం.
// 3. లైవ్ ప్రివ్యూ: తయారు చేసిన వెబ్ లేదా ఆండ్రాయిడ్ యాప్‌ను లైవ్ స్క్రీన్‌లో టెస్ట్ చేసుకోవడం.
// 4. క్లౌడ్ పబ్లిషింగ్: PHRS Crowd నెట్‌వర్క్‌లో యాప్‌ను పబ్లిష్ చేసి లైవ్ లింక్ పొందడం.
// 5. సోర్స్ కోడ్ డౌన్‌లోడ్: ZIP ఫైల్ రూపంలో ప్రాజెక్ట్ కోడ్‌ను డౌన్‌లోడ్ చేసుకోవడం.
// 6. GitHub ఎక్స్‌పోర్ట్: ప్రాజెక్ట్ కోడ్‌ను GitHub రిపోజిటరీకి పుష్ చేయడం.
// 7. AI చాట్ అసిస్టెంట్: కోడ్ రాయడానికి ఏఐ ఏజెంట్లను సంప్రదించడం (2 మెసేజ్‌ల పరిమితికి లోబడి).
// 
// 🚫 సాధారణ యూజర్లకు నిషేధించబడినవి (Strictly Restricted for Users):
// 1. అడ్మిన్ ప్యానెల్ & గేట్‌వే యాక్సెస్ ఉండదు (హెడర్ టైటిల్ సీక్రెట్ క్లిక్స్ పనిచేయవు).
// 2. అడ్మిన్ డెవలపర్ కంట్రోలర్స్ & డీబగ్గింగ్ టూల్స్ కనిపించవు.
// 3. సిస్టమ్ చాట్ లాక్‌లు మరియు పాస్‌కోడ్ లాక్‌లను బైపాస్ చేయలేరు.
// 4. డేటాబేస్ ఇంటర్నల్స్ మరియు ఇతర యూజర్ల డేటాను యాక్సెస్ చేయలేరు.
// ==============================================================================

/**
 * 🛡️ సాధారణ యూజర్ యాక్సెస్ కాన్ఫిగరేషన్ ఇంటర్‌ఫేస్
 */
export interface UserAccessConfig {
  role: 'USER';
  // అందుబాటులో ఉండే ఫీచర్లు (Allowed)
  canCreateProjects: boolean;
  canEditOwnCode: boolean;
  canUploadApk: boolean;
  canDecompileApk: boolean;
  canLivePreview: boolean;
  canPublishToCloud: boolean;
  canDownloadZip: boolean;
  canExportToGitHub: boolean;
  canUseChatPrompt: boolean;
  canSelectPublicAIModels: boolean;
  canSwitchTheme: boolean;
  canAccessKeyboardShortcuts: boolean;
  canAccessSelfFixer: boolean;

  // నిషేధించబడిన ఫీచర్లు (Restricted - ఎల్లప్పుడూ false)
  canAccessAdminPanel: false;
  canAccessAdminGateway: false;
  canViewAdminDeveloperControllers: false;
  canBypassChatLock: false;
  canBypassSystemPasscodes: false;
  canManageOtherUsers: false;
  canAccessDatabaseInternals: false;
  canAccessServerEnvironmentKeys: false;
}

/**
 * 📋 సాధారణ యూజర్ యాక్సెస్ అనుమతుల వివరాల పట్టిక (Telugu Explanations for Matrix)
 */
export interface UserPermissionDetail {
  key: keyof UserAccessConfig;
  name: string;
  nameTelugu: string;
  allowed: boolean;
  descriptionTelugu: string;
}

export const USER_ACCESS_PERMISSIONS: UserPermissionDetail[] = [
  {
    key: 'canCreateProjects',
    name: 'Create Projects',
    nameTelugu: 'ప్రాజెక్ట్ క్రియేషన్',
    allowed: true,
    descriptionTelugu: 'వినియోగదారులు కొత్త వెబ్ మరియు ఆండ్రాయిడ్ యాప్ ప్రాజెక్టులను సృష్టించవచ్చు.'
  },
  {
    key: 'canEditOwnCode',
    name: 'Edit Code in Editor',
    nameTelugu: 'సొంత కోడ్ ఎడిటింగ్',
    allowed: true,
    descriptionTelugu: 'స్టూడియో కోడ్ ఎడిటర్‌లో తన ప్రాజెక్ట్ ఫైళ్లను మార్చుకోవచ్చు.'
  },
  {
    key: 'canUploadApk',
    name: 'Upload APK File',
    nameTelugu: 'APK అప్‌లోడ్',
    allowed: true,
    descriptionTelugu: 'ఆండ్రాయిడ్ APK ఫైళ్లను అప్‌లోడ్ చేసి విశ్లేషించవచ్చు.'
  },
  {
    key: 'canDecompileApk',
    name: 'Decompile APK File',
    nameTelugu: 'APK డీకంపైలేషన్',
    allowed: true,
    descriptionTelugu: 'APK లోపల ఉన్న HTML, JS, CSS, మరియు ఇమేజ్ అసెట్లను బయటకు తీయవచ్చు.'
  },
  {
    key: 'canLivePreview',
    name: 'Live App Preview',
    nameTelugu: 'లైవ్ యాప్ ప్రివ్యూ',
    allowed: true,
    descriptionTelugu: 'రూపొందించిన ప్రాజెక్ట్ ఎలా పనిచేస్తుందో ప్రివ్యూ స్క్రీన్‌లో లైవ్‌గా చూడవచ్చు.'
  },
  {
    key: 'canPublishToCloud',
    name: 'Publish to Cloud',
    nameTelugu: 'క్లౌడ్ పబ్లిషింగ్',
    allowed: true,
    descriptionTelugu: 'PHRS Crowd సర్వర్‌లో ప్రాజెక్ట్‌ను హోస్ట్ చేసి పబ్లిక్ లైవ్ లింక్ పొందవచ్చు.'
  },
  {
    key: 'canDownloadZip',
    name: 'Download Project ZIP',
    nameTelugu: 'జిప్ డౌన్‌లోడ్',
    allowed: true,
    descriptionTelugu: 'ప్రాజెక్ట్ యొక్క పూర్తి సోర్స్ కోడ్‌ను ZIP ఫైల్‌గా డౌన్‌లోడ్ చేసుకోవచ్చు.'
  },
  {
    key: 'canExportToGitHub',
    name: 'Export to GitHub',
    nameTelugu: 'GitHub ఎక్స్‌పోర్ట్',
    allowed: true,
    descriptionTelugu: 'తన ప్రాజెక్ట్ కోడ్‌ను వ్యక్తిగత GitHub రిపోజిటరీకి అప్‌లోడ్ చేసుకోవచ్చు.'
  },
  {
    key: 'canUseChatPrompt',
    name: 'AI Chat Prompt',
    nameTelugu: 'ఏఐ చాట్ ప్రోంప్ట్',
    allowed: true,
    descriptionTelugu: 'కోడింగ్ సహాయం కోసం చాట్ బాక్స్ ద్వారా ఏఐ ఏజెంట్లను సంప్రదించవచ్చు.'
  },
  // 🚫 నిషేధించబడినవి (Restricted)
  {
    key: 'canAccessAdminPanel',
    name: 'Admin Panel Access',
    nameTelugu: 'అడ్మిన్ ప్యానెల్ నిషేధం',
    allowed: false,
    descriptionTelugu: 'సాధారణ యూజర్లకు అడ్మిన్ ప్యానెల్ తెరవడానికి ఎలాంటి అనుమతి ఉండదు.'
  },
  {
    key: 'canViewAdminDeveloperControllers',
    name: 'Admin Developer Controllers',
    nameTelugu: 'అడ్మిన్ డెవలపర్ కంట్రోలర్స్ నిషేధం',
    allowed: false,
    descriptionTelugu: 'అడ్మిన్ మొబైల్ లేని సాధారణ యూజర్లకు డెవలపర్ టెస్టింగ్ కంట్రోలర్స్ కనిపించవు.'
  },
  {
    key: 'canBypassChatLock',
    name: 'Bypass Chat Lock',
    nameTelugu: 'చాట్ లాక్ బైపాస్ నిషేధం',
    allowed: false,
    descriptionTelugu: 'సాధారణ యూజర్లు 2 మెసేజ్‌ల పరిమితిని ఉల్లంఘించలేరు (సబ్‌స్క్రిప్షన్ అవసరం).'
  },
  {
    key: 'canAccessDatabaseInternals',
    name: 'Database Internals Access',
    nameTelugu: 'డేటాబేస్ యాక్సెస్ నిషేధం',
    allowed: false,
    descriptionTelugu: 'సిస్టమ్ డేటాబేస్ లేదా సర్వర్ కాన్ఫిగరేషన్లను సాధారణ యూజర్లు మార్చలేరు.'
  }
];

/**
 * 👤 ప్రాథమిక సాధారణ యూజర్ యాక్సెస్ రూల్స్
 */
export const DEFAULT_USER_ACCESS_RULES: UserAccessConfig = {
  role: 'USER',
  canCreateProjects: true,
  canEditOwnCode: true,
  canUploadApk: true,
  canDecompileApk: true,
  canLivePreview: true,
  canPublishToCloud: true,
  canDownloadZip: true,
  canExportToGitHub: true,
  canUseChatPrompt: true,
  canSelectPublicAIModels: true,
  canSwitchTheme: true,
  canAccessKeyboardShortcuts: true,
  canAccessSelfFixer: true,

  // నిషేధించబడినవి (Restricted for Users)
  canAccessAdminPanel: false,
  canAccessAdminGateway: false,
  canViewAdminDeveloperControllers: false,
  canBypassChatLock: false,
  canBypassSystemPasscodes: false,
  canManageOtherUsers: false,
  canAccessDatabaseInternals: false,
  canAccessServerEnvironmentKeys: false,
};

/**
 * 📜 సాధారణ వినియోగదారుల యాక్సెస్ రూల్స్ పొందే ఫంక్షన్
 */
export function getUserAccessRules(isLoggedIn: boolean = false): UserAccessConfig {
  return {
    ...DEFAULT_USER_ACCESS_RULES,
    // లాగిన్ కాని యూజర్లకు కొన్ని ప్రత్యేక పరిమితులు
    canPublishToCloud: isLoggedIn,
    canExportToGitHub: isLoggedIn
  };
}

/**
 * 🔍 సాధారణ యూజర్ కి నిర్దిష్ట ఫీచర్ యాక్సెస్ ఉందో లేదో తనిఖీ చేసే ఫంక్షన్
 */
export function isFeatureAccessibleForUser(
  featureKey: keyof UserAccessConfig,
  isLoggedIn: boolean = false
): boolean {
  const rules = getUserAccessRules(isLoggedIn);
  return rules[featureKey] === true;
}

/**
 * 🏷️ యూజర్ రోల్ టైటిల్
 */
export function getUserRoleTitle(isLoggedIn: boolean = false): string {
  return isLoggedIn ? 'రిజిస్టర్డ్ యూజర్ (Registered User)' : 'అతిథి యూజర్ (Guest User)';
}
