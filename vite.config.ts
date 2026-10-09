import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    hmr: false,
    allowedHosts: ['ai-master-studio.ai.studio', 'ais-dev-stsuzz7vqjgtuiwpqae3tz-398230688462.asia-southeast1.run.app', 'ais-pre-stsuzz7vqjgtuiwpqae3tz-398230688462.asia-southeast1.run.app', 'localhost']
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false
  }
});
