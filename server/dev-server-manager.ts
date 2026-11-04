import { createServer as createViteServer } from 'vite';
import type { Express } from 'express';
import express from 'express';
import path from 'path';
import fs from 'fs';

export async function setupDevServer(app: Express) {
  const isProd = process.env.NODE_ENV === 'production';
  const distPath = path.join(process.cwd(), 'dist');

  // 🚀 VPS Production Mode: Serve optimized pre-built static bundle
  if (isProd && fs.existsSync(distPath)) {
    console.log('🚀 [Production Mode] Serving optimized static frontend from /dist...');
    app.use(express.static(distPath));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api') || req.path === '/ping' || req.path === '/.well-known') {
        return next();
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
    return;
  }

  console.log('🛠️ Setting up Vite Dev Server Middleware...');
  try {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: false 
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } catch (err) {
    console.warn('⚠️ Vite middleware initialization skipped/failed. Serving /dist fallback:', err);
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api') || req.path === '/ping' || req.path === '/.well-known') return next();
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }
}
