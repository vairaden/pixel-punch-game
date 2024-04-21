import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: true,
    outDir: 'dist/server',
    ssr: './src/app/entry-server.tsx',
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
  optimizeDeps: {
    include: ['@mui/material', '@mui/material/colors/red'],
  },
});
