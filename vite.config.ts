
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Ersetze 'DEIN-REPOS-NAME' durch den Namen deines GitHub-Repositories
export default defineConfig({
  plugins: [react()],
  base: './', // Verwendung von './' macht die App flexibel für beliebige Unterordner auf GH Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
  },
  server: {
    port: 3000,
  }
});
