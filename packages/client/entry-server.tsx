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
import { createFetchRequest } from './server-utils';
import { Request } from 'express';

export async function render(req: Request) {
  const { query, dataRoutes } = createStaticHandler(routes);
  const fetchRequest = createFetchRequest(req);
  const context = await query(fetchRequest);

  if (context instanceof Response) {
    throw context;
  }

  const router = createStaticRouter(dataRoutes, context);

  return {
    html: renderToString(
      <Provider store={store}>
        <StaticRouterProvider router={router} context={context} />
      </Provider>
    ),
    initialState: store.getState(),
  };
}
