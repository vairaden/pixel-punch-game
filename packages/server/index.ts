import dotenv from 'dotenv';
import cors from 'cors';
import * as fs from 'fs';
import * as path from 'path';
import { createServer as createViteServer, ViteDevServer } from 'vite';

dotenv.config();

import express, { Request } from 'express';
// import { createClientAndConnect } from './db';
// createClientAndConnect();

const IS_DEV = process.env.NODE_ENV === 'development';

const startServer = async () => {
  const app = express();
  app.use(cors());
  const port = Number(process.env.SERVER_PORT) || 3001;

  let vite: ViteDevServer;
  const distPath = path.dirname(require.resolve('client/dist/index.html'));
  const srcPath = path.dirname(require.resolve('client/index.html'));
  const ssrClientPath = require.resolve('client/dist-ssr/client.cjs');

  if (IS_DEV) {
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

  if (!IS_DEV) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')));
  }

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template: string;

      if (!IS_DEV) {
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

      let render: (
        req: Request
      ) => Promise<{ html: string; initialState: unknown }>;

      if (!IS_DEV) {
        render = (await import(ssrClientPath)).render;
      } else {
        render = (await vite.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
          .render;
      }

      const { html, initialState } = await render(req);

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
      if (IS_DEV) {
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
