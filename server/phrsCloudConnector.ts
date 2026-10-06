/**
 * ============================================================================
 * 🌐 PHRS CLOUD SERVER CONNECTOR & AI MASTER STUDIO BRIDGE
 * ============================================================================
 * 
 * 💡 తెలుగు వివరణ (Telugu Description):
 * ఈ ఫైల్ మన 'AI Master Studio' (ReverseAPK Studio) మరియు 'PHRS Cloud Server' 
 * (ఫైర్‌బేస్/క్లౌడ్ డేటాబేస్ & బ్యాకెండ్ సర్వర్) మధ్య కనెక్షన్‌ను నిర్వహించడానికి 
 * మరియు సింక్రొనేషన్ చేయడానికి ప్రత్యేకంగా సృష్టించబడిన డెడికేటెడ్ మాడ్యూల్.
 * 
 * భవిష్యత్తులో అడ్మిన్ గారు ఏజెంట్లపై ఆధారపడకుండా, తామే స్వయంగా చిన్న చిన్న మార్పులు 
 * లేదా సవరణలు చేసుకోవడానికి వీలుగా ప్రతి ఫంక్షన్ మరియు కోడ్ బ్లాక్‌కు కింద 
 * స్పష్టమైన తెలుగు వివరణ (Comments) ఇవ్వబడింది.
 * ============================================================================
 */

import express from 'express';
import { db } from '../src/firebase.ts';
import { collection, getDocs, doc, setDoc, getDoc, query, serverTimestamp } from 'firebase/firestore';
import fs from 'fs/promises';
import path from 'path';

/**
 * 💡 PHRS Cloud Connection Status & Info
 * సర్వర్ కనెక్షన్ వివరాలను మరియు స్టేటస్‌ను నిల్వ చేయడానికి వాడే ఆబ్జెక్ట్.
 */
export const PHRS_CLOUD_CONFIG = {
  serverName: 'PHRS Cloud Server',
  studioName: 'AI Master Studio (ReverseAPK Studio)',
  version: '3.9.0',
  syncIntervalMs: 60000, // ప్రతి 60 సెకండ్లకు సింక్ అవుతుంది
  isConnected: true
};

/**
 * 💡 PHRS Cloud Server Health & Status Check Endpoint Handler
 * అడ్మిన్ గారు లేదా క్లయింట్ సర్వర్ కనెక్షన్ సరిగ్గా ఉందో లేదో చెక్ చేసుకోవడానికి ఈ ఫంక్షన్ పనిచేస్తుంది.
 */
export async function handlePhrsHealthCheck(req: express.Request, res: express.Response) {
  try {
    // క్లౌడ్ డేటాబేస్ (db) అందుబాటులో ఉందో లేదో తనిఖీ చేయడం
    const databaseActive = db !== null && db !== undefined;
    
    res.json({
      success: true,
      server: PHRS_CLOUD_CONFIG.serverName,
      connectedToStudio: PHRS_CLOUD_CONFIG.studioName,
      databaseStatus: databaseActive ? 'Connected & Active (కనెక్ట్ చేయబడింది)' : 'Local Standalone Mode',
      timestamp: new Date().toISOString(),
      message: 'PHRS Cloud Server & AI Master Studio bridge is fully operational.'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error?.message || 'PHRS Cloud health check failed.'
    });
  }
}

/**
 * 💡 PHRS Cloud Server Sync Handler (డేటా సింక్రొనేషన్ ఫంక్షన్)
 * క్లౌడ్ సర్వర్ నుండి లేటెస్ట్ యాప్ డేటాను, పబ్లిష్డ్ బ్యాకప్‌లను లోకల్ డైరెక్టరీకి సింక్ చేస్తుంది.
 */
export async function syncPhrsCloudData() {
  if (!db) {
    console.log('⚠️ [PHRS Cloud]: Database not initialized. Skipping cloud sync.');
    return { synced: false, count: 0 };
  }

  try {
    const pubDir = path.join(process.cwd(), 'published_backup');
    await fs.mkdir(pubDir, { recursive: true });
    
    // క్లౌడ్ కలెక్షన్ నుండి డేటా పొందడం
    const q = query(collection(db, 'published_apps'));
    const snapshot = await getDocs(q);
    let count = 0;

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      const slug = data.slug || docSnap.id;
      const appFolder = path.join(pubDir, slug);
      await fs.mkdir(appFolder, { recursive: true });

      const appJsonPath = path.join(appFolder, 'app.json');
      await fs.writeFile(appJsonPath, JSON.stringify(data, null, 2), 'utf8');
      count++;
    }

    console.log(`✅ [PHRS Cloud]: Successfully synchronized ${count} apps from cloud server.`);
    return { synced: true, count };
  } catch (err: any) {
    console.warn('⚠️ [PHRS Cloud Sync Error]:', err?.message || err);
    return { synced: false, count: 0, error: err?.message };
  }
}

/**
 * 💡 Register PHRS Cloud Bridge Express Routes
 * మెయిన్ సర్వర్‌కు ఈ క్లౌడ్ కనెక్షన్ రూట్లను అనుసంధానించడానికి ఈ ఫంక్షన్ వాడబడుతుంది.
 */
export function registerPhrsCloudRoutes(app: express.Express) {
  // 1. హెల్త్ చెక్ రౌట్
  app.get('/api/phrs/health', handlePhrsHealthCheck);

  // 2. మాన్యువల్ సింక్ రౌట్
  app.post('/api/phrs/sync', async (req, res) => {
    try {
      const result = await syncPhrsCloudData();
      res.json({ success: true, ...result });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  console.log('🌐 [PHRS Cloud Connector]: Routes /api/phrs/health and /api/phrs/sync successfully registered.');
}
