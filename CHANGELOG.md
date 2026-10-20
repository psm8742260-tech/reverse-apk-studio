# CHANGELOG - PWA Android Packager Icon Fix & Backup

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

