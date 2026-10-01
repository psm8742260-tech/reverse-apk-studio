import { db } from '../firebase';
import { doc, setDoc, updateDoc, collection } from 'firebase/firestore';
import { safeStorage } from '../utils/safeStorage';

/**
 * AI MASTER STUDIO - GLOBAL PAYMENT CONTROLLER (PaymentFile)
 * 
 * 💡 అడ్మిన్ గారు! మన పేమెంట్ ఫైల్ లోని ప్రతి ఒక్క కాన్ఫిగరేషన్ మరియు ఫంక్షన్ 
 * చదువుకోవడానికి చాలా సులభంగా ఉండేలా... పైన ఒక ఇంగ్లీషు కోడింగ్ లైన్ మరియు 
 * దాని కింద ఒక ప్రత్యేకమైన తెలుగు వివరణ కామెంట్ వచ్చేలా అప్‌గ్రేడ్ చేయబడింది.
 */

// ==========================================
// 🏛️ 1. APPLICATION MAIN SUBSCRIPTION CONFIG (యాప్ మెయిన్ సబ్‌స్క్రిప్షన్ నిబంధనలు)
// ==========================================
export const PAYMENT_CONFIG = {
  SUBSCRIPTION_PRICE: 200,
  // 💡 తెలుగు వివరణ: యాప్ యాక్టివేషన్ నెలవారీ చందా ధర (₹200)
  
  VALIDITY_DAYS: 30,
  // 💡 తెలుగు వివరణ: సబ్‌స్క్రిప్షన్ యాక్టివేషన్ వాలిడిటీ సమయం (30 రోజులు)
  
  PLAN_NAME: "Monthly Activation",
  // 💡 తెలుగు వివరణ: ఈ ప్లాన్ యొక్క అధికారిక పేరు
  
  FEATURES: [
    "Full Decompiler Access",
    "Ad-Free Experience",
    "Premium Support",
    "30 Days Validity"
  ]
  // 💡 తెలుగు వివరణ: సబ్‌స్క్రిప్షన్ తీసుకున్న వారికి లభించే ప్రీమియం ఫీచర్ల జాబితా
};

// ==========================================
// 💳 2. STUDIO SERVICE CHARGES (స్టూడియో సర్వీస్ ఛార్జీలు - Individual Services)
// ==========================================
export const SERVICE_CHARGES = {
  RATE_PER_MINUTE: 2,
  // 💡 తెలుగు వివరణ: నార్మల్ స్టూడియోకి నిమిషానికి ఛార్జ్ (₹)
  
  APK_REPAIR: 49,
  // 💡 తెలుగు వివరణ: APK రిపేర్ సర్వీస్ ధర
  
  ZIP_DOWNLOAD: 199,
  // 💡 తెలుగు వివరణ: పూర్తి సోర్స్ కోడ్ ఎగుమతి ధర
  
  LIVE_URL: 99,
  // 💡 తెలుగు వివరణ: లైవ్ ప్రివ్యూ URL ధర
  
  FOLDER_DOWNLOAD: 29
  // 💡 తెలుగు వివరణ: ఫోల్డర్ డౌน์โหลด ధర
};

// ==========================================
// 👛 3. WALLET RECHARGE PRESETS (వాలెట్ రీఛార్జ్ ప్రిసెట్స్ - Admin Section)
// ==========================================
export const WALLET_PRESETS = [10, 50, 100, 200, 500];
// 💡 తెలుగు వివరణ: అడ్మిన్ ప్యానెల్ లో వాలెట్ బ్యాలెన్స్ అప్‌డేట్ చేయడానికి సిద్ధంగా ఉండే ప్రీ-సెట్ రూపాయల లిస్ట్

// ==========================================
// ⏳ 4. NORMAL STUDIO QUICK PACKAGES (నార్మల్ స్టూడియో ప్యాకేజీలు)
// ==========================================
export const NORMAL_STUDIO_PACKS = [
  { min: 5, price: 10, label: "5 నిమిషాలు (₹10)" },
  // 💡 తెలుగు వివరణ: 5 నిమిషాల స్టూడియో రన్ కోసం ₹10 ప్యాకేజీ
  
  { min: 10, price: 20, label: "10 నిమిషాలు (₹20)" },
  // 💡 తెలుగు వివరణ: 10 నిమిషాల స్టూడియో రన్ కోసం ₹20 ప్యాకేజీ
  
  { min: 15, price: 30, label: "15 నిమిషాలు (₹30)" }
  // 💡 తెలుగు వివరణ: 15 నిమిషాల స్టూడియో రన్ కోసం ₹30 ప్యాకేజీ
];

// ==========================================
// ⚙️ 5. API BUDGET ROUTER CONTROLS (ఏపీఐ బడ్జెట్ నియంత్రణ)
// ==========================================
export const API_CONTROLS = {
  DAILY_BUDGET_CAP: 500.0,
  // 💡 తెలుగు వివరణ: రోజువారీ గరిష్ట ఖర్చు పరిమితి (₹500.0)
  
  RESET_TIME: "00:00:00"
  // 💡 తెలుగు వివరణ: ఏపీఐ బడ్జెట్ రోజువారీగా రీసెట్ అయ్యే సమయం (రాత్రి 12 గంటలకు)
};

// ==========================================
// 🛡️ 6. CORE PAYMENT PROCESSING LOGIC (ప్రధాన పేమెంట్ ప్రాసెసింగ్ ఫంక్షన్లు)
// ==========================================

// యూజర్ వాలెట్ నుండి డబ్బులు కట్ చేసే ఫంక్షన్
export const deductWalletBalance = async (userEmail: string, currentBalance: number, amount: number, serviceName: string, metadata: any = {}) => {
  // 💡 తెలుగు వివరణ: యూజర్ అడిగిన సర్వీస్ కి కావలసిన డబ్బులు వాలెట్ లో ఉన్నాయో లేదో చెక్ చేసే లాజిక్
  
  if (currentBalance < amount) {
    throw new Error('Insufficient Balance - బ్యాలెన్స్ సరిపోదు');
    // 💡 తెలుగు వివరణ: బ్యాలెన్స్ తక్కువగా ఉంటే క్రాష్ అవ్వకుండా యూజర్ కి చూపే ఎర్రర్ మెసేజ్
  }

  const walletRef = doc(db, 'user_wallets', userEmail);
  // 💡 తెలుగు వివరణ: డేటాబేస్ లో యూజర్ వాలెట్ డాక్యుమెంట్ కనెక్షన్ లింక్
  
  const txRef = doc(collection(db, 'wallet_transactions'));
  // 💡 తెలుగు వివరణ: ట్రాన్సాక్షన్ హిస్టరీ రాయడానికి ఫైర్ స్టోర్ కలెక్షన్ కనెక్షన్

  await updateDoc(walletRef, {
    balanceINR: currentBalance - amount,
    lastUpdated: new Date().toISOString()
  });
  // 💡 తెలుగు వివరణ: యూజర్ వాలెట్ లోని బ్యాలెన్స్ నుండి సదరు ఛార్జీని కట్ చేసి డేటాబేస్ లో అప్‌డేట్ చేసే కనెక్షన్
  
  await setDoc(txRef, {
    userEmail,
    amount,
    type: 'DEBIT',
    service: serviceName,
    timestamp: new Date().toISOString(),
    ...metadata
  });
  // 💡 తెలుగు వివరణ: కట్ అయిన బ్యాలెన్స్ వివరాలను హిస్టరీ లాగ్ (Debit Transaction Log) రూపంలో భద్రపరిచే కనెక్షన్

  return true;
};

// నార్మల్ స్టూడియో పాస్‌కోడ్ సృష్టించే ఫంక్షన్
export const createServicePasscode = async (userEmail: string, duration: number, passcode: string) => {
  // 💡 తెలుగు వివరణ: యూజర్ పేమెంట్ సక్సెస్ అయ్యాక నార్మల్ స్టూడియో ని అన్‌లాక్ చేసే పాస్‌కోడ్ సృష్టించే ఫంక్షన్
  
  const passRef = doc(collection(db, 'system_passcodes'), passcode);
  // 💡 తెలుగు వివరణ: డేటాబేస్ లోని సిస్టమ్ పాస్‌కోడ్‌ల కలెక్షన్ కనెక్షన్ లింక్

  await setDoc(passRef, {
    code: passcode,
    duration: duration,
    createdAt: new Date().toISOString(),
    isUsed: false,
    userEmail
  });
  // 💡 తెలుగు వివరణ: కొత్త పాస్‌కోడ్ డేటాను మరియు ఉపయోగ కాల పరిమితిని డేటాబేస్ లో సేవ్ చేసే కనెక్షన్
};

// అడ్మిన్ వాలెట్ బ్యాలెన్స్ అప్‌డేట్ చేసే ఫంక్షన్
export const adminUpdateUserBalance = async (walletPath: string, currentBalance: number, addAmount: number) => {
  // 💡 తెలుగు వివరణ: అడ్మిన్ గారు ఏదైనా యూజర్ వాలెట్ ను రీఛార్జ్ చేసినప్పుడు నడిచే ఫంక్షన్
  
  const docRef = doc(db, walletPath);
  // 💡 తెలుగు వివరణ: సదరు యూజర్ వాలెట్ కి సంబంధించిన డేటాబేస్ మార్గం
  
  const newBalance = currentBalance + addAmount;
  // 💡 తెలుగు వివరణ: పాత బ్యాలెన్స్ కి కొత్త రీఛార్జ్ మొత్తాన్ని కూడే లెక్క

  await updateDoc(docRef, {
    balanceINR: newBalance,
    isRechargeActive: true,
    lastUpdated: new Date().toISOString()
  });
  // 💡 తెలుగు వివరణ: కొత్తగా కూడిన బ్యాలెన్స్ మొత్తాన్ని డేటాబేస్ లో అప్‌డేట్ చేసే కనెక్షన్
  
  const logRef = doc(collection(db, 'wallet_transactions'));
  // 💡 తెలుగు వివరణ: వాలెట్ ట్రాన్సాక్షన్స్ లాగ్ కలెక్షన్ కనెక్షన్

  // 💡 తెలుగు వివరణ: వాలెట్ పాత్ (users/UID/wallets/balance) నుండి కేవలం క్లీన్ యూజర్ ఐడీని మాత్రమే వేరు చేసి లాగ్‌లోకి రాస్తాము
  const cleanUserIdentity = walletPath.split('/')[1] || walletPath;

  await setDoc(logRef, {
    userEmail: cleanUserIdentity,
    amount: addAmount,
    type: 'CREDIT',
    service: 'ADMIN_RECHARGE',
    timestamp: new Date().toISOString()
  });
  // 💡 తెలుగు వివరణ: రీఛార్జ్ అయిన వివరాలను హిస్టరీ లాగ్ (Credit Transaction Log) రూపంలో భద్రపరిచే కనెక్షన్

  return newBalance;
};

// ==========================================
// 💾 7. STORAGE CONFIGURATION (లోకల్ స్టోరేజ్ కీస్)
// ==========================================
export const STORAGE_KEYS = {
  ACTIVATED: 'studio_activated',
  // 💡 తెలుగు వివరణ: యాప్ యాక్టివేట్ అయిందో లేదో బ్రౌజర్ మెమరీ లో సేవ్ చేసే కీ
  
  ACTIVATED_AT: 'studio_activated_at'
  // 💡 తెలుగు వివరణ: యాప్ ఏ సమయంలో యాక్టివేట్ అయిందో సేవ్ చేసే టైమ్‌స్టాంప్ కీ
};

// ==========================================
// 🔑 8. ACTIVATION HELPERS (యాక్టివేషన్ సహాయక ఫంక్షన్లు)
// ==========================================

export const getActivationData = () => {
  // 💡 తెలుగు వివరణ: యాప్ యాక్టివేషన్ స్థితిని లోకల్ స్టోరేజ్ నుండి సేకరించే ఫంక్షన్
  
  return {
    isActivated: safeStorage.getItem(STORAGE_KEYS.ACTIVATED) === 'true',
    activatedAt: safeStorage.getItem(STORAGE_KEYS.ACTIVATED_AT)
  };
};

export const saveActivationSuccess = () => {
  // 💡 తెలుగు వివరణ: యాక్టివేషన్ విజయవంతం అయ్యాక బ్రౌజర్ మెమరీలో సేవ్ చేసే ఫంక్షన్
  
  const now = Date.now().toString();
  safeStorage.setItem(STORAGE_KEYS.ACTIVATED, 'true');
  safeStorage.setItem(STORAGE_KEYS.ACTIVATED_AT, now);
};

export const clearActivation = () => {
  // 💡 తెలుగు వివరణ: యాక్టివేషన్ సమయం ముగిసినప్పుడు బ్రౌజర్ మెమరీని క్లియర్ చేసే ఫంక్షన్
  
  safeStorage.removeItem(STORAGE_KEYS.ACTIVATED);
  safeStorage.removeItem(STORAGE_KEYS.ACTIVATED_AT);
};

// Standalone మోడ్ డిటెక్షన్ లాజిక్
export const isStandaloneMode = () => {
  // 💡 తెలుగు వివరణ: యూజర్ వెబ్‌సైట్ రూపంలో వాడుతున్నారా లేదా ఇన్‌స్టాల్ చేసుకున్న యాప్ రూపంలో వాడుతున్నారా అని కనిపెట్టే లాజిక్
  
  return window.matchMedia('(display-mode: standalone)').matches || 
         (window.navigator as any).standalone || 
         document.referrer.includes('android-app://');
};

// ==========================================
// ⏰ 9. EXPIRY CHECK LOGIC (సబ్‌స్క్రిప్షన్ గడువు ముగింపు లాజిక్)
// ==========================================
export const checkSubscriptionExpiry = (): boolean => {
  // 💡 తెలుగు వివరణ: యూజర్ యాక్టివేషన్ గడువు (30 రోజులు) ముగిసిందో లేదో ప్రతి సెకనుకు చెక్ చేసే లైవ్ లాజిక్
  
  const { isActivated, activatedAt } = getActivationData();
  
  if (!isActivated || !activatedAt) return true;

  const activatedTime = parseInt(activatedAt, 10);
  const validityInMs = PAYMENT_CONFIG.VALIDITY_DAYS * 24 * 60 * 60 * 1000;
  // 💡 తెలుగు వివరణ: 30 రోజుల సమయాన్ని మిల్లీ సెకన్లలోకి మార్చే లెక్క
  
  const isExpired = Date.now() - activatedTime > validityInMs;
  
  if (isExpired) {
    clearActivation();
    // 💡 తెలుగు వివరణ: ఒకవేళ 30 రోజులు దాటిపోతే యాక్టివేషన్ రద్దు చేసి మెమరీని క్లియర్ చేస్తుంది
  }
  
  return isExpired;
};

// ==========================================
// 🎫 10. PASSCODE GENERATOR (పాస్‌కోడ్ జెనరేటర్)
// ==========================================
export const generatePasscode = (prefix: string = 'NS') => {
  // 💡 తెలుగు వివరణ: నార్మల్ స్టూడియో టైం ప్యాకేజీలు కొన్నప్పుడు ఆటోమేటిక్ గా ఒక కొత్త పాస్‌కోడ్ ను సృష్టించే ఫంక్షన్
  
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-PASS-${random}`;
};

// ==========================================
// 💡 తెలుగు వివరణ: రోజువారీ మరియు నెలవారీ ఆదాయ గణాంకాలను (Today, Yesterday, Monthly) లెక్క కట్టే పూర్తి లాజిక్ ఫంక్షన్
// ==========================================
export const calculateWalletRevenueStats = (transactions: any[]) => {
  try {
    const todayStr = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    const todayAmount = transactions
      .filter(t => new Date(t.timestamp).toDateString() === todayStr)
      .reduce((acc, curr) => acc + (curr.amount || 0), 0);

    const yesterdayAmount = transactions
      .filter(t => new Date(t.timestamp).toDateString() === yesterdayStr)
      .reduce((acc, curr) => acc + (curr.amount || 0), 0);

    const now = new Date();
    const thisMonthAmount = transactions
      .filter(t => {
        const d = new Date(t.timestamp);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .reduce((acc, curr) => acc + (curr.amount || 0), 0);

    return { todayAmount, yesterdayAmount, thisMonthAmount };
  } catch (error) {
    console.error("Error calculating revenue stats in PaymentFile:", error);
    return { todayAmount: 0, yesterdayAmount: 0, thisMonthAmount: 0 };
  }
};

