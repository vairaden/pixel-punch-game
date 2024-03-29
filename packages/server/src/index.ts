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
  const clientPath = path.resolve('../client');

  if (IS_DEV) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
      resolve: {
        alias: {
          '@': path.join(clientPath, 'src'),
        },
      },
      define: {
        __SERVER_PORT__: process.env.SERVER_PORT || 3001,
      },
    });

    app.use(vite.middlewares);
  } else {
    app.use(
      express.static(path.resolve(clientPath, 'dist/client'), { index: false })
    );
  }

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template: string;
      let render: (
        req: Request
      ) => Promise<{ html: string; initialState: unknown; css: string }>;

      if (IS_DEV) {
        template = fs.readFileSync(
          path.resolve(clientPath, 'index.html'),
          'utf-8'
        );

        template = await vite.transformIndexHtml(url, template);
        render = (
          await vite.ssrLoadModule(
            path.resolve(clientPath, 'src/app/entry-server.tsx')
          )
        ).render;
      } else {
        template = fs.readFileSync(
          path.resolve(clientPath, 'dist/client/index.html'),
          'utf-8'
        );
        render = (
          await import(path.resolve(clientPath, 'dist/server/entry-server.js'))
        ).render;
      }

      const { html, initialState, css } = await render(req);

      const appHtml = template
        .replace(`<!--ssr-outlet-->`, html)
        .replace(`<!--ssr-css-->`, css)
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

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the utils :)');
  });

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
};

startServer();
