import express, { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import cors from 'cors';
import * as fs from 'fs';
import * as path from 'path';
import { ViteDevServer } from 'vite';
import helmet from 'helmet';

import { router } from './routes';
import { dbConnect } from './models';
import { initReactions } from './utils/initReactions';
import { proxyReq } from './utils/proxy';
import { auth } from './middlewares/auth';

const IS_DEV = process.env.NODE_ENV === 'development';

const startServer = async () => {
  await dbConnect();

  if (process.env.DB_INIT) {
    await initReactions();
  }

  const app = express();
  app.use(cors());
  const port = Number(process.env.SERVER_PORT) || 3001;

  let vite: ViteDevServer;
  let clientPath: string;

  if (IS_DEV) {
    clientPath = path.resolve('../client');
    const { createServer } = await import('vite');
    vite = await createServer({
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
    clientPath = path.resolve('client');
    app.use(
      express.static(path.resolve(clientPath, 'client'), { index: false })
    );
  }

  app.use(express.json());
  app.use(helmet.xXssProtection());

  const handleProxy = (req: Request, res: Response, next: NextFunction) => {
    proxyReq(req, res, next);
  };

  app.use('/api/v2', auth, handleProxy);
  app.use('/api', router);

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
          path.resolve(clientPath, 'client/index.html'),
          'utf-8'
        );
        render = (
          await import(path.resolve(clientPath, 'server/entry-server.js'))
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

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
};

startServer();
