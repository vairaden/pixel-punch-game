import { ProfileAvatar, ProfileInfo, ProfilePassword } from '@/features';
import { Box, Typography } from '@mui/material';
import React from 'react';

export const Profile: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh',
      }}>
      <Typography variant="h4" component="h1">
        Профиль
      </Typography>

      <ProfileAvatar />
      <ProfileInfo />
      <ProfilePassword />
    </Box>
  );
};
