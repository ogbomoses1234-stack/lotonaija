import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-core': ['react', 'react-dom', 'react-router-dom'],
          'vendor-state': ['zustand'],
          'vendor-http': ['axios'],
          'vendor-utils': ['clsx', 'tailwind-merge']
        }
      }
    }
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,        // ✅ Allow LAN access for phone testing
    hmr: {
      host: 'localhost' // Keep HMR stable on localhost
    }
  },
  preview: {
    port: 4173,
    host: true         // ✅ Allow LAN access for preview builds
  }
});