import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '@/app/App/App';
import { store } from '@/shared/store';

export function render() {
  return {
    html: renderToString(<App />),
    initialState: store.getState(),
  };
}
