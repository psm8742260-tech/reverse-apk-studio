// 📦 AI Master Studio - Export Clean Project ZIP Script
// అడ్మిన్ గారు! GitHub కి పుష్ చేయడానికి అవసరమైన పూర్తి ప్రాజెక్ట్ సోర్స్ కోడ్‌ను ఒకే జిప్ ఫైల్‌గా మార్చే స్క్రిప్ట్.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import JSZip from 'jszip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function createCleanProjectZip() {
  const zip = new JSZip();
  const ignored = new Set([
    'node_modules',
    'dist',
    '.git',
    'aims_project_source.zip',
    '.aistudio'
  ]);

  function addDir(currentDir, relativePath = '') {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (ignored.has(entry.name)) continue;
      if (entry.name === 'aims_project_source.zip') continue;

      const fullPath = path.join(currentDir, entry.name);
      const relPath = relativePath ? `${relativePath}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        addDir(fullPath, relPath);
      } else if (entry.isFile()) {
        zip.file(relPath, fs.readFileSync(fullPath));
      }
    }
  }

  addDir(rootDir);

  const content = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 }
  });

  const outPath = path.join(rootDir, 'public', 'aims_project_source.zip');
  fs.writeFileSync(outPath, content);
  console.log(`✅ [Export-Zip] Project source ZIP generated successfully at ${outPath} (${(content.length / (1024 * 1024)).toFixed(2)} MB)`);
}

createCleanProjectZip().catch((err) => {
  console.error('❌ [Export-Zip] Failed to create project zip:', err.message);
});
