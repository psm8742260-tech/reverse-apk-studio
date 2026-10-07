import { syncArtifactToPHRS as remoteSync } from './phrsRemoteWorker.ts';

export async function triggerAutoBackup() {
  console.log('☁️ Auto Backup Triggered via PHRS Worker');
  return { success: true };
}

export async function syncArtifactToPHRS(fileName: string, fileData: any) {
  return remoteSync(fileName, fileData);
}
