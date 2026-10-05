/**
 * 🏛️ AI Master Studio - File Deletion Audit Utility
 * అడ్మిన్ గారు! ఫైల్స్ ఎక్కడ డిలీట్ అవుతున్నాయో పర్యవేక్షించడానికి ఈ ఫైల్ సృష్టించబడింది.
 * ఈ ఫైల్‌లో డిలీట్ చేసే లాజిక్ అంతా ఏకీకృతం చేయబడింది.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

export interface DeletionLog {
  timestamp: string;
  path: string;
  reason: string;
  stack?: string;
}

// 🛡️ [SYSTEM LOCK] - ఈ లిస్ట్ లో ఉన్న ఫైల్స్ ని ఎట్టి పరిస్థితుల్లోనూ డిలీట్ చేయకూడదు.
const PROTECTED_PATHS = [
  'src',
  'public',
  'server',
  'server.ts',
  'package.json',
  'CHANGELOG.md',
  'RESTART_TRACKER.md',
  'AGENTS.md',
  'index.html',
  'metadata.json',
  'vite.config.ts',
  'tsconfig.json',
  'firebase-applet-config.json',
  'persistent_workspace',
  'ai_master_permanent_storage'
];

// 🧹 [JUNK TRACKING] - ఇవి గతంలో డిలీట్ చేయబడిన లేదా డిలీట్ చేయాల్సిన చెత్త ఫైల్స్.
export const KNOWN_JUNK = [
  'app',
  'bun.lock',
  'Lohit-Telugu.ttf',
  'NotoSansTelugu-Regular.ttf',
  'DRAFT_firestore.rules',
  'security_spec.md',
  'studio_config.json',
  'tmp/setup_android_sdk.sh',
  'tmp/setup_gradle.sh',
  'tmp/test_android_build.sh',
  'builds/test-dialer.apk',
  'builds/release.keystore'
];

/**
 * సురక్షితంగా ఫైల్ లేదా డైరెక్టరీని డిలీట్ చేయడానికి ఈ ఫంక్షన్ వాడాలి.
 * ఇది డిలీట్ చేయడానికి ముందు ఆడిట్ చేస్తుంది.
 */
export async function safeDelete(targetPath: string, reason: string): Promise<boolean> {
  try {
    const absolutePath = path.resolve(targetPath);
    const relativePath = path.relative(process.cwd(), absolutePath);

    // 🔒 Protection Check: Check if path is protected
    const isProtected = PROTECTED_PATHS.some(p => relativePath === p || relativePath.startsWith(p + '/'));
    
    if (isProtected) {
      console.error(`🛡️ [SECURITY ALERT] Attempted to delete protected path: ${relativePath}. Action Blocked.`);
      await logDeletionAttempt({
        timestamp: new Date().toISOString(),
        path: relativePath,
        reason: `BLOCKED: ${reason} (Protected Path)`,
        stack: new Error().stack
      });
      return false;
    }

    // 📝 Log the deletion attempt before performing it
    await logDeletionAttempt({
      timestamp: new Date().toISOString(),
      path: relativePath,
      reason,
      stack: new Error().stack
    });

    try {
      // 🏛️ అడ్మిన్ గారు! ఫైల్స్ ఎక్కడ డిలీట్ అవుతున్నాయో తెలుసుకోవడానికి 'DELETION_AUDIT.log' ఫైల్ ని చూడండి.
      // ఇప్పుడు డిలీషన్ లాజిక్ ని యాక్టివేట్ చేస్తున్నాము.
      await fs.rm(absolutePath, { recursive: true, force: true });
      return true;
    } catch (err: any) {
      console.error(`❌ Deletion failed for ${relativePath}:`, err.message);
      return false;
    }
  } catch (err) {
    console.error('safeDelete overall error:', err);
    return false;
  }
}

/**
 * డిలీట్ అటెంప్ట్స్ ని ఒక ఫైల్ లో రికార్డ్ చేస్తుంది.
 */
async function logDeletionAttempt(log: DeletionLog) {
  const auditFilePath = path.join(process.cwd(), 'DELETION_AUDIT.log');
  const logEntry = `[${log.timestamp}] PATH: ${log.path} | REASON: ${log.reason}\n`;
  
  try {
    await fs.appendFile(auditFilePath, logEntry, 'utf8');
  } catch (err) {
    console.error('Failed to write deletion audit log:', err);
  }
}
