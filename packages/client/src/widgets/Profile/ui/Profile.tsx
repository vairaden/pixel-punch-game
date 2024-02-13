import { ProfileAvatar } from '@/features';
import { Box } from '@mui/material';
import React from 'react';

export const Profile: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}>
      <ProfileAvatar />
    </Box>
  );
};
