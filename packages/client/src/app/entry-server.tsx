import React from 'react';
import { renderToString } from 'react-dom/server';
import { store } from '@/shared/store';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { routes } from '@/app/providers/router/routes';
import { createFetchRequest } from './utils/server-utils';
import { Request } from 'express';
import createCache from '@emotion/cache';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import createEmotionServer from '@emotion/server/create-instance';
import { lightTheme } from '@/app/theme';

export async function render(req: Request) {
  const { query, dataRoutes } = createStaticHandler(routes);
  const fetchRequest = createFetchRequest(req);
  const context = await query(fetchRequest);

  if (context instanceof Response) {
    throw context;
  }

  const router = createStaticRouter(dataRoutes, context);

  const theme = createTheme({
    palette: {
      mode: 'light',
      ...lightTheme,
    },
  });

  const cache = createCache({ key: 'css' });
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  const html = renderToString(
    <Provider store={store}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div data-testid="app" id="app">
            <StaticRouterProvider router={router} context={context} />
          </div>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );

  const emotionChunks = extractCriticalToChunks(html);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);

  return {
    html,
    initialState: store.getState(),
    css: emotionCss,
  };
}
