// ==========================================
// AI Master Studio: storageManager.ts
// పర్మినెంట్ స్టోరేజ్ & లాగ్ ఫిల్టరింగ్ మేనేజర్
// ==========================================

import fs from 'node:fs';
import path from 'node:path';

/**
 * 🔒 1. రూట్ డైరెక్టరీలో శాశ్వత వర్క్‌స్పేస్ (ఎప్పటికీ డిలీట్ కాని డైరెక్టరీ)
 * ఏ బిల్డ్ ఫైల్స్ లేదా ఏపీకేలు కూడా tmp ఫోల్డర్లో వేయకూడదు.
 */
export const PERSISTENT_WORKSPACE_DIR = path.join(process.cwd(), 'persistent_workspace');

try {
  if (!fs.existsSync(PERSISTENT_WORKSPACE_DIR)) {
    fs.mkdirSync(PERSISTENT_WORKSPACE_DIR, { recursive: true });
    console.log(`[✔] Permanent workspace initialized at: ${PERSISTENT_WORKSPACE_DIR}`);
  }
} catch (err) {
  console.error('[❌] Error initializing persistent workspace directory:', err);
}

/**
 * 📁 నిర్దిష్ట బిల్డ్ కోసం persistent_workspace లోపల సబ్-డైరెక్టరీని పొందే ఫంక్షన్
 */
export function getPersistentWorkspace(subDir?: string): string {
  const targetDir = subDir ? path.join(PERSISTENT_WORKSPACE_DIR, subDir) : PERSISTENT_WORKSPACE_DIR;
  try {
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
  } catch (err) {
    console.error(`[❌] Error creating workspace subDir '${subDir}':`, err);
  }
  return targetDir;
}

/**
 * 💾 2. బిల్డ్ ఫైల్స్, APK, AAB లను persistent_workspace లో శాశ్వతంగా సేవ్ చేసే ఫంక్షన్
 */
export function saveBuildFilePermanently(fileName: string, fileData: string | Buffer, subDir?: string) {
  try {
    const parentDir = subDir ? getPersistentWorkspace(subDir) : PERSISTENT_WORKSPACE_DIR;
    const targetFilePath = path.join(parentDir, fileName);

    fs.writeFileSync(targetFilePath, fileData);
    console.log(`[✔] Success: Build artifact '${fileName}' saved permanently at ${targetFilePath}`);

    // 🛡️ [PHRS Auto-Backup] phrscrowd.online కి బ్యాక్‌గ్రౌండ్ రిమోట్ సింక్ (Fail-Safe Non-Blocking)
    try {
      import('../../server/services/phrsAutoBackup.ts')
        .then(({ syncArtifactToPHRS }) => {
          syncArtifactToPHRS(fileName, fileData).catch(() => {});
        })
        .catch(() => {});
    } catch {
      // Ignore background sync errors
    }

    return { success: true, path: targetFilePath };
  } catch (error) {
    console.error(`[❌] Error saving build artifact '${fileName}' permanently:`, error);
    return { success: false, error };
  }
}

/**
 * 🛡️ 3. ఆండ్రాయిడ్ ఎస్డీకే (platforms/android-34/data/res/...) లాగ్ ఫిల్టర్
 * వేలాది ఎస్డీకే పాత్లు టెర్మినల్ లేదా UI లో ఓవర్‌ఫ్లో కాకుండా సమర్థవంతంగా అడ్డుకుంటుంది.
 */
export function filterAndroidSdkLogs(logMessage: string): boolean {
  if (!logMessage || typeof logMessage !== 'string') {
    return false;
  }

  // ఆండ్రాయిడ్ ఎస్డీకే రిసోర్సెస్ నాయిస్ ఫిల్టర్
  if (
    logMessage.includes('platforms/android-34/data/res') ||
    logMessage.includes('platforms/android-') ||
    logMessage.includes('data/res/values') ||
    logMessage.includes('data/res/drawable')
  ) {
    return false;
  }

  return true;
}

/**
 * బ్యాక్‌వర్డ్ కంపాటిబిలిటీ అలియాసెస్ (Backward Compatibility Aliases)
 */
export const saveProjectFilePermanently = saveBuildFilePermanently;
export const filterSystemLogs = filterAndroidSdkLogs;
export const persistentStorageDir = PERSISTENT_WORKSPACE_DIR;
