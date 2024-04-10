import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     emptyOutDir: true,
//     outDir: 'dist/server',
//     ssr: './src/app/entry-server.tsx',
//   },
//   define: {
//     __SERVER_PORT__: process.env.SERVER_PORT || 3001,
//   },
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
// });

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, '/src/app/entry-server.tsx'),
      name: 'ssr',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        dir: 'dist/server',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
