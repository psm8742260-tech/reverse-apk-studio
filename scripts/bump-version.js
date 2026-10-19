// 🚀 AI Master Studio - Hybrid Mode Synchronizer
// అడ్మిన్ గారు! వర్షన్ నెంబర్లు పూర్తిగా తొలగించబడి, అప్లికేషన్ పూర్తిగా హైబ్రిడ్ మోడ్‌లో సింక్ చేయబడింది.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

try {
  // 1. Ensure package.json version is Hybrid
  const packageJsonPath = path.join(rootDir, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  pkg.version = 'Hybrid';
  fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');

  // 2. Ensure public/manifest.json version is Hybrid
  const manifestPath = path.join(rootDir, 'public/manifest.json');
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    manifest.version = 'Hybrid';
    if (Array.isArray(manifest.icons)) {
      manifest.icons = manifest.icons.map(icon => ({
        ...icon,
        src: icon.src ? icon.src.split('?')[0] + '?v=hybrid' : icon.src
      }));
    }
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  }

  // 3. Ensure public/sw.js cache name is aims-service-worker-hybrid
  const swPath = path.join(rootDir, 'public/sw.js');
  if (fs.existsSync(swPath)) {
    let swContent = fs.readFileSync(swPath, 'utf8');
    swContent = swContent.replace(/const CACHE_NAME = ['"].*?['"];/, `const CACHE_NAME = 'aims-service-worker-hybrid';`);
    fs.writeFileSync(swPath, swContent, 'utf8');
  }

  console.log('✅ [Hybrid Engine] Application successfully synced to Hybrid mode (Zero version numbers).');
} catch (error) {
  console.error('⚠️ [Hybrid Engine Warning]:', error.message);
}
