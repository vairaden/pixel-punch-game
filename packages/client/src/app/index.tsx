// import { ThemeProvider } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App/App';
// import { CssBaseline } from '@mui/material';
// import theme from '@/app/theme';
// import { Provider } from 'react-redux';
// import { store } from '@/shared/store';
// import {
//   registerServiceWorker,
//   unregisterServiceWorker,
// } from '@/shared/utils/serviceWorker';

// if (import.meta.env.PROD) {
//   registerServiceWorker();
// } else {
//   unregisterServiceWorker();
// }

// ReactDOM.hydrateRoot(
//   document.getElementById('root') as HTMLElement,
//   <React.StrictMode>
//     <Provider store={store}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <App />
//       </ThemeProvider>
//     </Provider>
//   </React.StrictMode>
// );

// Поменять на App
import { MockPage } from './MockPage';
ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <MockPage />
  </React.StrictMode>
);
