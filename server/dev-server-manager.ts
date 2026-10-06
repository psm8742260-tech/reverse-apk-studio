import express from 'express';
import fs from 'fs/promises';
import path from 'path';

/**
 * AI Master Studio - Dedicated Dev Server Manager
 * Handles Vite middleware configuration, development hot-reloading,
 * HTML template transformation, and production static fallback routes.
 */
export async function setupDevServer(app: express.Express) {
  if (process.env.NODE_ENV !== 'production') {
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'custom',
      });

      app.use(vite.middlewares);

      app.use('*', async (req, res, next) => {
        const url = req.originalUrl;
        try {
          const rawIndex = await fs.readFile(path.join(process.cwd(), 'index.html'), 'utf8');
          let template = await vite.transformIndexHtml(url, rawIndex);
          res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
        } catch (e: any) {
          vite.ssrFixStacktrace(e);
          next(e);
        }
      });
      console.log('⚡ Vite Dev Server middleware configured successfully.');
    } catch (err: any) {
      console.error('⚠️ Vite Dev Server setup error:', err?.message || err);
    }
  } else {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  }

  // SPA Fallback for production to prevent white screens on refresh
  app.get('*', (req, res) => {
    try {
      const distPath = path.resolve(process.cwd(), 'dist');
      res.sendFile(path.join(distPath, 'index.html'));
    } catch (err) {
      res.status(500).send('System Maintenance');
    }
  });
}
