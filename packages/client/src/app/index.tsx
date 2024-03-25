import { CacheProvider, ThemeProvider } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import { CssBaseline } from '@mui/material';
import theme from '@/app/theme';
import { Provider } from 'react-redux';
import { store } from '@/shared/store';
import {
  registerServiceWorker,
  unregisterServiceWorker,
} from '@/shared/utils/serviceWorker';
import createCache from '@emotion/cache';

if (import.meta.env.PROD) {
  registerServiceWorker();
} else {
  unregisterServiceWorker();
}
const cache = createCache({ key: 'css' });

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  </React.StrictMode>
);
