# CHANGELOG - PWA Android Packager Icon Fix & Backup

## Changes Made:
- **File Modified:** `server/services/pwaAndroidPackager.ts`
- **Issue:** Mobile installed APK was not showing the application icon (while web browser PWA displayed it correctly and app header 'H' was updating properly).
- **Root Cause:** In the binary `AndroidManifest.xml` generator (`generateBinaryAndroidManifest`), the `<application>` attributes `icon` and `roundIcon` were set with `dataType: 0x01` (generic attribute reference) instead of `dataType: 0x1c` (`TYPE_REFERENCE`), causing Android OS parsers to fail recognizing the launcher icon resource ID `0x7f020000` and `0x7f020001`.
- **Solution / New Code:**
  - Updated `dataType` for `icon` from `0x01` to `0x1c` (`TYPE_REFERENCE`).
  - Updated `dataType` for `roundIcon` from `0x01` to `0x1c` (`TYPE_REFERENCE`).
- **Build Status:** Verified with `npm run build` -> Zero errors, build succeeded successfully.
