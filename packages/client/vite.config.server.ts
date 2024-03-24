import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: 'inline',
    lib: {
      entry: path.resolve(__dirname, 'entry-server.tsx'),
      name: 'EntryServer',
      fileName: 'entry-server',
      formats: ['cjs'],
    },
    outDir: 'dist/server',
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
