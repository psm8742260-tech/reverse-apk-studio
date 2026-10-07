import type { Express } from 'express';
import { checkPhrsWorkerStatus, PHRS_WORKER_CONFIG } from './services/phrsRemoteWorker.ts';

export function registerPhrsCloudRoutes(app: Express) {
  console.log('☁️ PHRS Cloud Routes & Remote Worker Registered.');
  app.get('/api/phrs/status', async (req, res) => {
    const workerStatus = await checkPhrsWorkerStatus();
    res.json({
      status: 'active',
      engine: 'phrs-master-cloud',
      workerUrl: PHRS_WORKER_CONFIG.baseUrl,
      worker: workerStatus
    });
  });
}
