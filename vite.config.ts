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
        // ✅ Use function syntax for manualChunks to avoid type errors
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-core';
            }
            if (id.includes('zustand')) {
              return 'vendor-state';
            }
            if (id.includes('axios')) {
              return 'vendor-http';
            }
            if (id.includes('clsx') || id.includes('tailwind-merge')) {
              return 'vendor-utils';
            }
            return 'vendor';
          }
        }
      }
    }
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    hmr: {
      host: 'localhost'
    }
  },
  preview: {
    port: 4173,
    host: true
  }
});