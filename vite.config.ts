import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    hmr: false,
    allowedHosts: ['aims.phrscrowd.online', 'ai-master-studio.ai.studio', 'ais-dev-stsuzz7vqjgtuiwpqae3tz-398230688462.asia-southeast1.run.app', 'ais-pre-stsuzz7vqjgtuiwpqae3tz-398230688462.asia-southeast1.run.app', 'localhost']
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-icons': ['lucide-react'],
          'vendor-firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          'vendor-ui': ['motion'],
        }
      }
    }
  }
});
