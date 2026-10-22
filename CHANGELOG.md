# CHANGELOG - Universal Hybrid Engine Centralization & Zero-Version Architecture

## 🔒 [Centralized Studio Colors & Feature Coding Config - 2026-10-22]
- **అడ్మిన్ గారి పాస్‌వర్డ్ అనుమతి:** `6606.0k`
- **సృష్టించిన కొత్త ఫైల్ పేరు:** `src/config/studioColors.ts`
- **ఫీచర్లు & కలర్ కోడింగ్:** ప్రాజెక్ట్‌లోని అన్ని బోర్డులు, ఫీచర్లు, సబ్-ఫీచర్లు, బటన్లు మరియు వాటి పూర్తి కలర్ కోడింగ్ (Backgrounds, Borders, Text, Accents, Gradients) అన్నీ ఈ ఒక్కే ఒక్క 'studioColors.ts' ఫైల్‌లో కేంద్రీకరించబడ్డాయి.
- **కనెక్షన్ బ్రిడ్జి:** ఈ కలర్స్ ఫైల్ నుండి కేవలం ఒకే ఒక సింగిల్ కనెక్షన్ బ్రిడ్జి ద్వారా మెయిన్ కనెక్షన్ సిస్టమ్‌కు అనుసంధానించబడింది.
- **తెలుగు డాక్యుమెంటేషన్:** ప్రతి ఫీచర్ మరియు బటన్‌కు స్పష్టమైన తెలుగు వివరణలు మరియు ఇంగ్లీష్-తెలుగు వైరింగ్ మ్యాపింగ్ అమర్చబడింది.
- **ధృవీకరణ:** Build Succeeded, 0 Errors.

## 🔒 [Centralized Apl API Architecture & Master Controller - 2026-10-22]
- **అడ్మిన్ గారి పాస్‌వర్డ్ అనుమతి:** `6606.0k`
- **సెంట్రలైజ్డ్ ఫైల్:** `src/aplApi.ts` (మరియు అనుకూలత కోసం `src/apiService.ts`)
- **తెలుగు డాక్యుమెంటేషన్:** ప్రతి ఒక్క ఏపీఐ ఫంక్షన్ పైన ఐకాన్లతో కూడిన సంపూర్ణ తెలుగు వివరణ, ఎండ్‌పాయింట్ వివరాలు, పారామీటర్లు, అనుసంధానించబడిన కాంపోనెంట్లు మరియు `try-catch` ఫెయిల్-సేఫ్ రక్షణ కవచాలు అమర్చబడ్డాయి.
- **అనుసంధానించిన కాంపోనెంట్లు:**
  1. `src/aplApi.ts`: సర్వర్ లైవ్ హెల్త్, AI ఇంజిన్ హెల్త్, ఫైల్ సిస్టమ్ (రీడ్/రైట్/ట్రీ), AI జనరేషన్, అడ్మిన్ సెట్టింగ్స్, కీ సింక్, ప్రాజెక్ట్ మేనేజ్‌మెంట్, TWA/PWA బిల్డర్, ZIP to APK స్ట్రీమింగ్, PHRS టెర్మినల్ బ్రిడ్జి, మార్కెట్ గ్లాస్ ఐకాన్స్, మరియు ఎక్స్‌పోజింగ్ షేర్ ఏపీఐల ఏకీకృత నియంత్రణ.
  2. `src/apiService.ts`: యూనివర్సల్ ఇంపోర్ట్ అనుకూలత కోసం రీ-ఎక్స్‌పోర్ట్ అలియాస్.
  3. `src/components/AdminPanel/ApiFailoverSection.tsx`: `checkAiHealth` మరియు `syncAdminKeys` తో అనుసంధానం.
  4. `src/components/AdminPanel/AdminPanel.tsx`: `checkAiHealth` తో అనుసంధానం.
  5. `src/components/AdminPanel/AiLiteModeSection.tsx`: `getAdminSetting`, `saveAdminSetting`, `resolveAiModel` తో అనుసంధానం.
  6. `src/components/AdminPanel/InvisibleAgentSection.tsx`: `executePhrsTerminalCommand` తో అనుసంధానం.
  7. `src/components/SelfFixerStudio.tsx`: `checkAiHealth`, `getFsTree`, `readFsFile`, `writeFsFile`, `generateAiContent` తో అనుసంధానం.
  8. `src/components/ZipToApkBuilder.tsx`: `buildZipToApkStream` తో అనుసంధానం.
  9. `src/components/BuildSuite.tsx`: `buildZipToApkStream` తో అనుసంధానం.
  10. `src/components/UrlToAppBuilder.tsx`: `analyzeAppUrl`, `buildAppFromUrl`, `sendAppBuildRequest` తో అనుసంధానం.
  11. `src/components/FirebaseProvider.tsx`: `checkServerHealth` తో అనుసంధానం.
  12. `src/components/CloudConvertStudio.tsx`: `updateManifestIcon` తో అనుసంధానం.
  13. `src/components/DecompilerWorkspace.tsx`: `saveToVault` తో అనుసంధానం.
  14. `src/utils/urlShortener.ts`: `saveExposingShare` తో అనుసంధానం.
  15. `src/components/ExposingQR.tsx`: `saveExposingShare` తో అనుసంధానం.
  16. `src/components/Icons8GlassView.tsx`: `getAdminSetting`, `saveAdminSetting`, `fetchMarketCategories`, `fetchMarketGlassIcons`, `uploadMarketIcon` తో అనుసంధానం.
  17. `src/components/LiveAppViewer.tsx`: `fetchPublishedApp` తో అనుసంధానం.
  18. `src/components/NormalAppStudio.tsx`: `aplApi.generateAiContent` తో అనుసంధానం.
  19. `src/version.ts`: `src/aplApi.ts` మరియు `src/apiService.ts` లను `FILE_VERSIONS` లో "HYBRID" గా నమోదు చేయడం.
- **ఫలితం:** ప్రాజెక్ట్‌లోని అన్ని నెట్‌వర్క్ మరియు సర్వర్ అనుసంధానాలు కేవలం `src/aplApi.ts` ఫైల్ ద్వారానే నియంత్రించబడుతున్నాయి.
- **ధృవీకరణ:** Build Succeeded, 0 Errors.

## 🔒 [Universal Hybrid Engine Centralization - 2026-10-21]
- **అడ్మిన్ గారి పాస్‌వర్డ్ అనుమతి:** `6606.0k`
- **సెంట్రలైజ్డ్ ఫైల్:** `src/version.ts` (ప్రతి అక్షరానికి పైన ఐకాన్లతో కూడిన సంపూర్ణ తెలుగు వివరణలతో సెంట్రలైజ్ చేయబడింది)
- **సవరించిన మరియు కనెక్ట్ చేసిన ఫైల్స్:**
  1. `src/version.ts`: సంపూర్ణ హైబ్రిడ్ కాన్‌స్టెంట్లు (`APP_VERSION`, `ENGINE_NAME`, `DEFAULT_PACKAGE_VERSION`, `DEFAULT_DECOMPILED_VERSION`, `RELEASE_ENGINE_SIGNATURE`, etc.).
  2. `server.ts`: రిలీజ్ బండిల్ README.html లోని పాత సంఖ్యను తీసేసి `AI Master Studio HYBRID ENGINE` గా అప్‌డేట్ చేయడం.
  3. `src/components/NormalAppStudio.tsx`: డీఫాల్ట్ ప్రాజెక్ట్ టెంప్లేట్ package.json లోని వెర్షన్‌ను `Hybrid` గా మార్చడం.
  4. `src/utils/apkDecompiler.ts`: డీకంపైలర్ డీఫాల్ట్ వెర్షన్‌ను `HYBRID` గా మార్చడం.
  5. `src/utils/sampleApks.ts`: శాంపిల్ APK లన్నింటి వెర్షన్లను `HYBRID` గా మార్చడం.
- **ఫలితం:** మొత్తం అప్లికేషన్‌లో ఒక్క సంఖ్యా వెర్షన్ కూడా లేకుండా 100% సంపూర్ణ హైబ్రిడ్ మోడ్ లాక్ చేయబడింది.
- **ధృవీకరణ:** Build Succeeded, TypeScript 0 Errors.

## 🔒 [Centralized Admin Access System - 2026-10-21]
- **అడ్మిన్ గారి పాస్‌వర్డ్ అనుమతి:** `66060k`
- **సెంట్రలైజ్డ్ ఫైల్:** `src/config/adminAccess.ts`
- **కనెక్ట్ చేసిన ఫైల్స్:**
  1. `src/components/Header.tsx` (స్క్రీన్‌షాట్ 2: హెడర్‌లోని పర్పుల్ '[🔒 Admin]' బటన్)
  2. `src/App.tsx` (రూట్ లెవల్ `isAdmin` గేట్‌వే)
  3. `src/components/NormalAppStudio.tsx` (స్క్రీన్‌షాట్ 1: సెట్టింగ్స్‌లోని '[🔒 Admin Off All]' బటన్)
  4. `src/components/SidebarDrawer.tsx` (స్క్రీన్‌షాట్ 3: సైడ్‌బార్‌లోని '[⚡ AI Master Studio]' సెల్ఫ్ ఫిక్సర్ బటన్)
- **అమలు చేసిన సెక్యూరిటీ వివరాలు:**
  1. మొత్తం అడ్మిన్ యాక్సెస్ లాజిక్, అధికారాలు, మరియు విజిబిలిటీ స్విచ్‌లు కేవలం `src/config/adminAccess.ts` లోనే సెంట్రలైజ్ చేయబడ్డాయి.
  2. ప్రతి ఫంక్షన్, కాన్ఫిగరేషన్ పైన ఐకాన్లతో కూడిన స్పష్టమైన తెలుగు డాక్యుమెంటేషన్ రాయబడింది.
  3. లూప్‌హోల్స్ (`|| true`) అన్నీ తొలగించబడ్డాయి. కేవలం అడ్మిన్ జిమెయిల్ (`psm8742260@gmail.com`) లేదా అడ్మిన్ మొబైల్ నెంబర్ (`8466062260`) తో లాగిన్ అయినప్పుడు మాత్రమే ఆ 3 బటన్లు కనిపిస్తాయి; సాధారణ యూజర్లకు 100% పూర్తిగా అదృశ్యమవుతాయి.
- **ధృవీకరణ:** Build Succeeded, TypeScript 0 Errors.

## ⚡ [Replit-Style Full Workspace & Live Execution Pipeline - 2026-10-21]
- **అడ్మిన్ గారి పాస్‌కోడ్ అనుమతి:** `6606.0k`
- **సవరించిన ఫైల్:** `src/components/NormalAppStudio.tsx`
- **అమలు చేసిన ఫీచర్లు:**
  1. **Automated ZIP Ingestion & Media Preservation:**
     - ZIP ఫైల్ అప్‌లోడ్ చేసినప్పుడు సబ్-ఫోల్డర్లతో సహా మొత్తం ఫైల్ హైరార్కీని అన్‌ప్యాక్ చేయడం.
     - ఇమేజ్‌లు (.png, .jpg, .jpeg, .gif, .webp, .ico, .bmp) కరప్ట్ కాకుండా Base64 Data URL రూపంలో ప్రిజర్వ్ చేయడం.
     - కామన్ రూట్ డైరెక్టరీలను ఆటోమేటిక్‌గా నార్మలైజ్ చేయడం.
  2. **Universal Dynamic Virtual Asset Linker & Live Execution:**
     - అన్ని CSS, JS, JSON, ఇమేజ్ ఫైళ్లను వర్చువల్ అసెట్ మ్యాప్‌గా మ్యాప్ చేసి, ప్రధాన `index.html` లోని అన్ని `<script src="...">`, `<link href="...">`, `<img src="...">` లింకులను ఆటోమేటిక్‌గా వాటి బ్లబ్/డేటా URL లతో అనుసంధానించడం.
     - HTML లో CSS/JS లింకులు మిస్ అయినా ఆటోమేటిక్‌గా ఇంజెక్ట్ చేసి రియల్ లైవ్ రన్నింగ్ యాప్‌గా పక్కనున్న ప్రివ్యూ iframe లో రన్ చేయడం.
     - రన్‌టైమ్ ఎర్రర్ ట్రాప్ స్క్రిప్ట్‌తో స్టూడియో క్రాష్ కాకుండా రక్షణ కవచం.
  3. **Auto-Save & Instant Project Archiving:**
     - జిప్ ఇంపోర్ట్ అయిన వెంటనే తాజా ప్రాజెక్ట్ ఐడీతో 'My Apps' సేవ్డ్ ప్రాజెక్ట్స్‌లో ఆటోమేటిక్‌గా సేవ్ చేయడం.
     - ఎడిటర్‌లో కోడ్ మార్చగానే హాట్ రీలోడ్ అవ్వడం.
  4. **Workspace Export (ZIP Download):**
     - సవరించిన కోడ్ మరియు బైనరీ ఇమేజ్ ఫైళ్లను పక్కాగా బండిల్ చేసి లేటెస్ట్ సోర్స్ కోడ్ డౌన్‌లోడ్ అయ్యేలా చేయడం.
- **ధృవీకరణ:** Build Succeeded, 0 Linter Errors.

## Changes Made:
- **File Modified:** `server/services/pwaAndroidPackager.ts`
- **Issue:** Mobile installed APK was not showing the application icon (while web browser PWA displayed it correctly and app header 'H' was updating properly).
- **Root Cause:** In the binary `AndroidManifest.xml` generator (`generateBinaryAndroidManifest`), the `<application>` attributes `icon` and `roundIcon` were set with `dataType: 0x01` (generic attribute reference) instead of `dataType: 0x1c` (`TYPE_REFERENCE`), causing Android OS parsers to fail recognizing the launcher icon resource ID `0x7f020000` and `0x7f020001`.
- **Solution / New Code:**
  - Updated `dataType` for `icon` from `0x01` to `0x1c` (`TYPE_REFERENCE`).
  - Updated `dataType` for `roundIcon` from `0x01` to `0x1c` (`TYPE_REFERENCE`).
- **Build Status:** Verified with `npm run build` -> Zero errors, build succeeded successfully.

## [Hybrid Update - 2026-10-20] - Android Mobile Fullscreen (No Address Bar) & Icon Fix & PWABuilder Parity Errors
- **అడ్మిన్ గారి పాస్‌కోడ్ అనుమతి:** `6606.0k`
- **సవరించిన ఫైల్స్:**
  1. `server/services/pwaAndroidPackager.ts`
     - `<application>` మరియు `<activity>` ట్యాగ్‌లలో `Theme.NoTitleBar.Fullscreen` థీమ్‌ను (ID: `0x01030007`) ఖచ్చితమైన బైనరీ AXML రిసోర్స్ ఐడీలతో హార్డ్‌కోడ్ చేశాము. దీనివల్ల మొబైల్ ఆండ్రాయిడ్ యాప్‌లో అడ్రస్ బార్ / టైటిల్ బార్ శాశ్వతంగా తొలగించబడింది.
  2. `server.ts`
     - `/api/admin/build-zip` లో డైనమిక్ సైట్ URL మరియు మేనిఫెస్ట్ నుండి స్టార్ట్ URL ను ఎగ్జామిన్ చేసి రియల్ ఐకాన్ జనరేషన్‌కు అందించేలా `dynamicSiteUrl` మ్యాప్ చేశాము.
  3. `src/components/UrlToAppBuilder/PackageForStoresCard.tsx`
     - PWABuilder తరహాలోనే ఒకవేళ URL లో లోపాలు లేదా మిస్సింగ్ అంశాలు ఉంటే స్పష్టమైన ఎర్రర్ నోటిఫికేషన్ మరియు సూచనలను యూజర్ బోర్డుపై హార్డ్‌కోడ్ చేశాము.
  4. `index.html` & `public/manifest.json`
     - మొబైల్ స్క్రీన్లలో 100% నేటివ్ ఫుల్ స్క్రీన్‌గా రన్ అవ్వడానికి `mobile-web-app-capable`, `apple-mobile-web-app-capable`, మరియు `display_override` (`fullscreen`) కాన్ఫిగరేషన్ చేర్చాము.
  5. `src/version.ts`
     - సవరించిన ఫైళ్లను హైబ్రిడ్ వెర్షన్ మ్యాపింగ్‌లో చేర్చి లాక్ చేశాము.
## [Universal Hybrid Update - 2026-10-20] - Strict 6-File ZIP Bundle, Universal HYBRID Target & ARSC Header Alignment
- **అడ్మిన్ గారి పాస్‌కోడ్ అనుమతి:** `6606.0k`
- **సవరణ వివరాలు:**
  1. `server.ts`:
     - గూగుల్ ప్లే ప్యాకేజీ జిప్ నుండి పై 2 విడిగా ఉన్న ఇమేజ్ ఫైల్స్ (`app_icon.png` మరియు `ic_launcher-playstore.png`) తొలగించబడ్డాయి. రూల్ 54 ప్రకారం ఖచ్చితంగా 6 క్లీన్ ఫైల్స్ (`APK`, `AAB`, `Keystore`, `Signing-info`, `Assetlinks`, `Readme`) మాత్రమే జిప్‌లో ఉండేలా సెట్ చేయబడింది.
  2. `server/services/pwaAndroidPackager.ts`:
     - `resources.arsc` లోని `headerSize1` ను ఖచ్చితంగా 76 బైట్లుగా (`20 + configSize = 76`) లెక్కించి, ఆండ్రాయిడ్ `AssetManager` క్రాష్ కాకుండా ఒరిజినల్ లోగో నేరుగా `myapplication.apk` పై కనిపించేలా అలైన్ చేశాము.
     - నిర్దిష్ట ఆండ్రాయిడ్ వెర్షన్ లేకుండా, ఆండ్రాయిడ్ 5.0 (API 21) నుండి ఆండ్రాయిడ్ 15 (API 34) వరకు అన్ని డివైజ్‌లకు పనికొచ్చేలా యూనివర్సల్ `"HYBRID"` వెర్షన్‌గా సెట్ చేశాము.
- **ధృవీకరణ ఫలితం:** Build Succeeded, 0 Errors, Verified with Linter.

## [Universal Hybrid Mode & Model Pool Restoration - 2026-10-21] - Centralized HYBRID Versioning & Gemini Flash-Lite Restoration
- **అడ్మిన్ గారి పాస్‌కోడ్ అనుమతి:** `6606.0k`
- **సవరణ వివరాలు:**
  1. `server.ts`:
     - అడ్మిన్ గారి ఆదేశానుసారం గత ఏజెంట్ తొలగించిన `gemini-3.5-flash-lite` మోడల్‌ను లైట్-మోడ్ ఓవర్‌రైడ్ స్విచ్‌లో యధావిధిగా పునరుద్ధరించాము (`selectedModel = "gemini-3.5-flash-lite"`).
     - జెమిని యాక్టివ్ మోడల్స్ పూల్ (`geminiModelsPool`) లో `gemini-3.5-flash-lite`, `gemini-3.6-flash`, `gemini-3.5-flash` తో పాటు `gemini-2.5-flash`, `gemini-2.5-pro` లను చేర్చి, ట్రై-క్యాచ్ సేఫ్‌గార్డ్‌తో 100% లైవ్ కనెక్షన్ లభించేలా హార్డ్‌కోడ్ చేశాము.
  2. `src/version.ts`:
     - అప్లికేషన్ మొత్తంలో ఎక్కడా సంఖ్యల రూపంలో వెర్షన్లు లేకుండా కేవలం `src/version.ts` లోనే సెంట్రలైజ్ చేసి, అన్ని ఫైళ్లను `HYBRID` గా మ్యాప్ చేశాము.
  3. `src/App.tsx`:
     - ఫుటర్‌లోని హార్డ్‌కోడెడ్ `v1.0` ను తొలగించి, `src/version.ts` నుండి `APP_VERSION` ఇంపోర్ట్ చేసుకుని డైనమిక్‌గా డిస్‌ప్లే అయ్యేలా సెట్ చేశాము.
  4. `src/components/BuildSuite.tsx`:
     - హార్డ్‌కోడెడ్ `v4.0` ను తొలగించి, సెంట్రలైజ్డ్ `ENGINE_NAME` మరియు `APP_VERSION` లను లింక్ చేశాము.
  5. `src/utils/sampleApks.ts`, `src/studio_config.json`, `public/sw.js`, `index.html`:
     - అన్ని చోట్లా సంఖ్యల వెర్షన్లను తొలగించి యూనివర్సల్ `HYBRID` మోడ్‌కు మార్చాము.
- **ధృవీకరణ ఫలితం:** జీరో ఎర్రర్స్, కంపైలేషన్ పాస్, లైవ్ సిస్టమ్ సేఫ్టీ ఆడిట్ సక్సెస్.


