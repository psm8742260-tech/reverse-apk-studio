// 🚀 AI Master Studio - Postbuild Unified Server Sync Script
// అడ్మిన్ గారు! ఫ్రంటెండ్ బిల్డ్ (dist/) తో పాటు సర్వర్ ఫైల్స్ (server.ts, server/ మొదలైనవి) 
// అన్నీ కలిపి ఒకే ప్యాకేజీగా dist/ ఫోల్డర్‌లోకి కాపీ కాబడతాయి.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else if (exists) {
    fs.copyFileSync(src, dest);
  }
}

try {
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Copy server files into dist/ so FTP sync gets EVERYTHING in one go
  const filesToCopy = [
    'server.ts',
    'package.json',
    'metadata.json',
    'BACKUP.md',
    'firebase-applet-config.json',
    'firestore.rules'
  ];

  for (const file of filesToCopy) {
    const srcPath = path.join(rootDir, file);
    const destPath = path.join(distDir, file);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`📦 [Postbuild] Copied ${file} -> dist/${file}`);
    }
  }

  // Copy server directory into dist/server
  const serverDir = path.join(rootDir, 'server');
  if (fs.existsSync(serverDir)) {
    copyRecursiveSync(serverDir, path.join(distDir, 'server'));
    console.log(`📦 [Postbuild] Copied server/ directory -> dist/server/`);
  }

  console.log('✅ [Postbuild] Unified build package complete (Frontend + Backend Server files merged in dist/).');
} catch (error) {
  console.error('⚠️ [Postbuild Warning]:', error.message);
}
