import { createServer as createViteServer } from 'vite';
import type { Express } from 'express';

export async function setupDevServer(app: Express) {
  console.log('🛠️ Setting up Vite Dev Server Middleware...');
  const vite = await createViteServer({
    server: { 
      middlewareMode: true,
      hmr: false 
    },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}
