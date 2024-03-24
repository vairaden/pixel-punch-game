import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist/server',
    ssr: './entry-server.tsx',
  },
  ssr: {
    noExternal: true,
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
