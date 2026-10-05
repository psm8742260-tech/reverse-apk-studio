// ==========================================
// AI Master Studio: పర్మినెంట్ ఫైల్ మేనేజ్మెంట్ మరియు సేవింగ్ లాజిక్
// ==========================================

import fs from 'node:fs';
import path from 'node:path';
export * from '../src/utils/storageManager.ts';

// 1. తాత్కాలిక ఫోల్డర్ కాకుండా, ఎప్పటికీ డిలీట్ కాని శాశ్వత డైరెక్టరీని సృష్టించడం
export const persistentStorageDir = path.join(process.cwd(), 'ai_master_permanent_storage');
if (!fs.existsSync(persistentStorageDir)) {
    fs.mkdirSync(persistentStorageDir, { recursive: true });
    console.log(`[✔] Permanent storage directory created at: ${persistentStorageDir}`);
}

// 2. ఫైల్స్ ఆటోమేటిక్గా డిలీట్ అవ్వకుండా సురక్షితంగా సేవ్ చేసే ఫంక్షన్
export function saveProjectFilePermanently(fileName: string, fileData: string | Buffer) {
    const targetFilePath = path.join(persistentStorageDir, fileName);
    
    try {
        fs.writeFileSync(targetFilePath, fileData);
        console.log(`[✔] Success: File '${fileName}' saved permanently at ${targetFilePath}.`);
        return { success: true, path: targetFilePath };
    } catch (error) {
        console.error(`[❌] Error saving file '${fileName}':`, error);
        return { success: false, error: error };
    }
}

// 3. ఎస్డీకే లేదా సిస్టమ్ లాగ్స్ ఓవర్ఫ్లో కాకుండా క్లీన్ చేసే ఫిల్టర్
export function filterSystemLogs(logMessage: string): boolean {
    // అనవసరమైన వేలాది ప్లాట్ఫారమ్ పాత్లు స్క్రీన్ మీద పడకుండా ఫిల్టర్ చేస్తుంది
    if (logMessage && (logMessage.includes('platforms/android-34/data/res') || logMessage.includes('data/res/values'))) {
        return false; 
    }
    console.log(logMessage);
    return true;
}

// ఇంజిన్ ఆక్టివ్ స్టేటస్ టెస్ట్ లాగ్
filterSystemLogs('⚡ AI Master Studio Permanent Storage Engine Active...');
