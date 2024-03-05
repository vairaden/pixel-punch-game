import { ThemeProvider } from '@emotion/react';
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

if (import.meta.env.PROD) {
  registerServiceWorker();
} else {
  unregisterServiceWorker();
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
