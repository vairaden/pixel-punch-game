import { ProfileAvatar } from '@/features';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

export const Profile: React.FC = () => {
  const { register } = useForm();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh',
      }}>
      <ProfileAvatar />
      <Box sx={{ width: 300, marginTop: 5 }}>
        <Paper
          sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
          elevation={1}
          component="form">
          <Typography variant="h4" component="h1">
            Профиль
          </Typography>
          <TextField label="Почта" variant="standard" {...register('email')} />
          <TextField label="Логин" variant="standard" {...register('logins')} />
          <TextField
            label="Имя"
            variant="standard"
            {...register('first_name')}
          />
          <TextField
            label="Фамилия"
            variant="standard"
            {...register('second_name')}
          />
          <TextField
            label="Телефон"
            variant="standard"
            type="tel"
            {...register('phone')}
          />
          <TextField
            label="Пароль"
            variant="standard"
            type="password"
            {...register('password')}
          />
          <Button variant="contained" type="submit">
            Изменить
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};
