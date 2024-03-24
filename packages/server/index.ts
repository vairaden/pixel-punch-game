import dotenv from 'dotenv';
import cors from 'cors';
import * as fs from 'fs';
import * as path from 'path';
import { createServer as createViteServer, ViteDevServer } from 'vite';

dotenv.config();

import express from 'express';
// import { createClientAndConnect } from './db';
// createClientAndConnect();

const isDev = () => process.env.NODE_ENV === 'development';

const startServer = async () => {
  const app = express();
  app.use(cors());
  const port = Number(process.env.SERVER_PORT) || 3001;

  let vite: ViteDevServer;
  const distPath = path.dirname(require.resolve('client/dist/index.html'));
  const srcPath = path.dirname(require.resolve('client/index.html'));
  const ssrClientPath = require.resolve('client/dist-ssr/client.cjs');

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    });

    app.use(vite.middlewares);
  }

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)');
  });

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')));
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template: string;

      if (!isDev()) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        );
      } else {
        template = fs.readFileSync(
          path.resolve(srcPath, 'index.html'),
          'utf-8'
        );

        template = await vite.transformIndexHtml(url, template);
      }

      let render: () => Promise<{ html: string; initialState: unknown }>;

      if (!isDev()) {
        render = (await import(ssrClientPath)).render;
      } else {
        render = (await vite.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
          .render;
      }

      const { html, initialState } = await render();

      const appHtml = template
        .replace(`<!--ssr-outlet-->`, html)
        .replace(
          `<!--ssr-initial-state-->`,
          `<script>window.APP_INITIAL_STATE = ${JSON.stringify(
            initialState
          )};</script>`
        );

      res.status(200).set({ 'Content-Type': 'text/html' }).end(appHtml);
    } catch (e) {
      if (isDev()) {
        vite.ssrFixStacktrace(e as Error);
      }
      next(e);
    }
  });

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
};

startServer();
