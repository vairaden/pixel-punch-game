import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';

import {
  registerServiceWorker,
  unregisterServiceWorker,
} from '@/shared/utils/serviceWorker';
import { store } from '@/shared/store';
import { Provider } from 'react-redux';

if (import.meta.env.PROD) {
  registerServiceWorker();
} else {
  unregisterServiceWorker();
}

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
