import { NavigationBar } from '@/features/NavigationBar';
import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <NavigationBar />
      <Box sx={{ padding: 2, paddingTop: 1 }}>{children}</Box>
    </>
  );
};
