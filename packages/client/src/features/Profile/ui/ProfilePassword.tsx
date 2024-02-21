import React from 'react';
import { useForm } from 'react-hook-form';

import { Paper, TextField, Button, Grid } from '@mui/material';
import { IProfilePassword } from '@/shared/types';
import { useSetProfilePasswordMutation } from '@/shared/api/profileApi';
import { Message } from '@/shared/ui';
import { passwordValidator } from '@/shared/utils';

export const ProfilePassword: React.FC = () => {
  const [profilePassword, { isSuccess, isError }] =
    useSetProfilePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfilePassword>({ mode: 'all' });

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
            error={!!errors?.oldPassword}
            helperText={errors?.oldPassword?.message}
            {...register('oldPassword', passwordValidator)}
          />
        </Grid>
        <Grid item>
          <TextField
            type="password"
            variant="standard"
            label="Новый пароль"
            error={!!errors?.newPassword}
            helperText={errors?.newPassword?.message}
            {...register('newPassword', passwordValidator)}
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
