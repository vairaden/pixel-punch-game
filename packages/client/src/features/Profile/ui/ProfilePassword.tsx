import React from 'react';
import { useForm } from 'react-hook-form';

import { Paper, TextField, Button, Grid } from '@mui/material';
import { IProfilePassword } from '@/shared/types';
import { useSetProfilePasswordMutation } from '@/shared/api/profileApi';
import { Message } from '@/shared/ui';

export const ProfilePassword: React.FC = () => {
  const [profilePassword, { isSuccess, isError }] =
    useSetProfilePasswordMutation();

  const { register, handleSubmit } = useForm<IProfilePassword>();

  const onSubmit = handleSubmit(async formData => {
    await profilePassword(formData).catch(console.error);
  });

  return (
    <Paper
      component="form"
      sx={{ padding: 2, width: 600, marginTop: 2 }}
      onSubmit={onSubmit}>
      <Grid container spacing={4}>
        <Grid item>
          <TextField
            label="Старый пароль"
            variant="standard"
            type="password"
            {...register('oldPassword')}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Новый пароль"
            variant="standard"
            type="password"
            {...register('newPassword')}
          />
        </Grid>
      </Grid>
      <Button variant="contained" type="submit" sx={{ marginTop: 5 }}>
        Поменять пароль
      </Button>
      {isSuccess && <Message title="Пароль успешно изменен!" />}
      {isError && <Message severity="error" title="Что то пошло не так!" />}
    </Paper>
  );
};
