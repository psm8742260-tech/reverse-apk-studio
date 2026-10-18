// 🚀 AI Master Studio - Auto Version Increment Script
// అడ్మిన్ గారు! బిల్డ్ రన్ అయిన ప్రతిసారీ ప్యాచ్ వెర్షన్ (e.g., 3.9.0 -> 3.9.1) ను స్వయంచాలకంగా పెంచే స్క్రిప్ట్.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

try {
  // 1. Read package.json
  const packageJsonPath = path.join(rootDir, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  const oldVersion = pkg.version || '3.9.0';
  const parts = oldVersion.split('.');

  let major = parseInt(parts[0] || '1', 10);
  let minor = parseInt(parts[1] || '0', 10);
  let patch = parseInt(parts[2] || '0', 10);

  if (isNaN(patch)) patch = 0;
  patch += 1;

  const newVersion = `${major}.${minor}.${patch}`;

  // 2. Update package.json
  pkg.version = newVersion;
  fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
  console.log(`🚀 [Auto-Version] package.json version updated: ${oldVersion} -> ${newVersion}`);

  // 3. Update public/manifest.json
  const manifestPath = path.join(rootDir, 'public/manifest.json');
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    manifest.version = newVersion;
    if (Array.isArray(manifest.icons)) {
      manifest.icons = manifest.icons.map(icon => ({
        ...icon,
        src: icon.src ? icon.src.split('?')[0] + `?v=${newVersion}` : icon.src
      }));
    }
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
    console.log(`📱 [Auto-Version] public/manifest.json version synced: ${newVersion}`);
  }

  // 4. Update src/version.ts (🔒 Permanent H & HYBRID ENGINE Immutable Lock)
  const srcVersionPath = path.join(rootDir, 'src/version.ts');
  const versionFileContent = `// 🔒 AI Master Studio - Permanent Hybrid Engine Immutable Lock
// అడ్మిన్ గారి శాశ్వత లాక్: నెంబర్లు పూర్తిగా రద్దు చేయబడ్డాయి. కేవలం 'H' మరియు 'HYBRID ENGINE' మాత్రమే ఉండాలి.
export const APP_VERSION = 'H';
export const ENGINE_NAME = 'HYBRID ENGINE';
export const DISPLAY_BADGE = 'H';
export const PREVIOUS_VERSION = 'H';
export const BUILD_TIMESTAMP = '${new Date().toISOString()}';

// 🌐 Service Worker (sw.js) & main.tsx Direct Connections
export const SW_CACHE_NAME = 'aims-service-worker-hybrid-engine';
export const MAIN_CACHE_KEY = 'aims_hybrid_engine';

// ⚡ Hybrid Live Engine Connection (హైబ్రిడ్ లైవ్ కనెక్షన్)
export const HYBRID_MODE_ACTIVE = true;
export const HYBRID_SYNC_STRATEGY = 'NETWORK_FIRST_LIVE_RELOAD';

export default APP_VERSION;
`;
  fs.writeFileSync(srcVersionPath, versionFileContent, 'utf8');
  console.log(`📜 [Auto-Version] src/version.ts generated: ${newVersion}`);

  // 5. Update public/sw.js cache name so browser immediately purges old cache on version change
  const swPath = path.join(rootDir, 'public/sw.js');
  if (fs.existsSync(swPath)) {
    let swContent = fs.readFileSync(swPath, 'utf8');
    swContent = swContent.replace(/const CACHE_NAME = ['"].*?['"];/, `const CACHE_NAME = 'aims-service-worker-v${newVersion}';`);
    fs.writeFileSync(swPath, swContent, 'utf8');
    console.log(`🌐 [Auto-Version] public/sw.js cache name updated to aims-service-worker-v${newVersion}`);
  }

  console.log(`✅ [Auto-Version] Version incremented successfully to ${newVersion}`);
} catch (error) {
  console.error('⚠️ [Auto-Version Warning] Failed to increment version:', error.message);
  // Non-fatal fail-safe: do not crash build if version file cannot be updated
}
