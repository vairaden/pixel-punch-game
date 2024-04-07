import { RouterProvider } from 'react-router-dom';
import { router } from '../providers';
import '../style/root.scss';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { darkTheme, lightTheme } from '@/app/theme';
import { CssBaseline } from '@mui/material';
import React from 'react';
import createCache from '@emotion/cache';
import { useGetThemeQuery } from '@/shared/api/themeApi';

const cache = createCache({ key: 'css' });

function App() {
  const { data } = useGetThemeQuery();

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={data?.theme === 'dark' ? darkTheme : lightTheme}>
        <CssBaseline />
        <div data-testid="app" id="app">
          <RouterProvider router={router} />
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
