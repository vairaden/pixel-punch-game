import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import * as path from 'path';
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
  build: {
    outDir: path.join(__dirname, 'dist/client'),
    rollupOptions: {
      input: {
        app: './index.html',
        sw: './sw.js',
      },
      output: {
        entryFileNames: assetInfo => {
          // ServiceWorker нужно положить в корень
          return assetInfo.name === 'sw'
            ? '[name].js'
            : 'assets/js/[name]-[hash].js';
        },
      },
    },
  },
  optimizeDeps: {
    include: ['@mui/material', '@mui/material/colors/red'],
  },
});
