import React from 'react';
import { useForm } from 'react-hook-form';

import { Paper, TextField, Button, Grid } from '@mui/material';

import { IProfile } from '@/shared/types';
import { useSetProfileInfoMutation } from '@/shared/api/profileApi';
import { useAppSelector } from '@/shared/hooks';
import { Message } from '@/shared/ui';
import { selectProfileInfo } from '../model/selectors';
import {
  emailValidator,
  loginValidator,
  namelValidator,
  phoneValidator,
} from '@/shared/utils';

export const ProfileInfo: React.FC = () => {
  const [profileInfo, { isSuccess, isError }] = useSetProfileInfoMutation();

  const profile = useAppSelector(selectProfileInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfile>({ mode: 'all' });

  const onSubmit = handleSubmit(async formData => {
    await profileInfo(formData);
  });

  return (
    <Paper component="form" sx={{ padding: 2, width: 600 }} onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item md={4}>
          <TextField
            label="Почта"
            variant="standard"
            error={!!errors?.email}
            defaultValue={profile.email}
            helperText={errors?.email?.message}
            {...register('email', emailValidator)}
          />
        </Grid>
        <Grid item md={4}>
          <TextField
            label="Логин"
            variant="standard"
            error={!!errors?.login}
            defaultValue={profile.login}
            helperText={errors?.login?.message}
            {...register('login', loginValidator)}
          />
        </Grid>
        <Grid item md={4}>
          <TextField
            label="Имя"
            variant="standard"
            error={!!errors?.first_name}
            defaultValue={profile.first_name}
            helperText={errors?.first_name?.message}
            {...register('first_name', namelValidator)}
          />
        </Grid>
        <Grid item md={4}>
          <TextField
            label="Фамилия"
            variant="standard"
            error={!!errors?.second_name}
            defaultValue={profile.second_name}
            helperText={errors?.second_name?.message}
            {...register('second_name', namelValidator)}
          />
        </Grid>
        <Grid item md={4}>
          <TextField
            type="tel"
            label="Телефон"
            variant="standard"
            error={!!errors?.phone}
            defaultValue={profile.phone}
            helperText={errors?.phone?.message}
            {...register('phone', phoneValidator)}
          />
        </Grid>
      </Grid>
      <Button variant="contained" type="submit" sx={{ marginTop: 5 }}>
        Изменить
      </Button>
      {isSuccess && <Message title="Данные пользователя успешно обновлены!" />}
      {isError && <Message severity="error" title="Что то пошло не так!" />}
    </Paper>
  );
};
