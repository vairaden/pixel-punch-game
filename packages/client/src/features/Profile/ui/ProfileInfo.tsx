import React from 'react';
import { useForm } from 'react-hook-form';

import { Paper, TextField, Button, Grid } from '@mui/material';

import { IProfile } from '@/shared/types';
import { useSetProfileInfoMutation } from '@/shared/api/profileApi';
import { useActions, useAppSelector } from '@/shared/hooks';
import { Message } from '@/shared/ui';
import { selectProfileInfo } from '../model/selectors';

export const ProfileInfo: React.FC = () => {
  const [profileInfo, { isSuccess, isError }] = useSetProfileInfoMutation();

  const profile = useAppSelector(selectProfileInfo);
  const { setProfile } = useActions();

  const { register, handleSubmit } = useForm<IProfile>();

  const onSubmit = handleSubmit(async formData => {
    try {
      const response = await profileInfo(formData).unwrap();
      setProfile(response);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Paper component="form" sx={{ padding: 2, width: 600 }} onSubmit={onSubmit}>
      <Grid container spacing={4}>
        <Grid item>
          <TextField
            label="Почта"
            variant="standard"
            {...register('email')}
            defaultValue={profile.email}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Логин"
            variant="standard"
            {...register('login')}
            defaultValue={profile.login}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Имя"
            variant="standard"
            {...register('first_name')}
            defaultValue={profile.first_name}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Фамилия"
            variant="standard"
            {...register('second_name')}
            defaultValue={profile.second_name}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Телефон"
            variant="standard"
            type="tel"
            {...register('phone')}
            defaultValue={profile.phone}
          />
        </Grid>
      </Grid>
      <Button variant="contained" type="submit" sx={{ marginTop: 5 }}>
        Изменить
      </Button>
      {isSuccess && <Message title="Данные пользователя успешно обновлены!" />}
      {isError && <Message title="Что то пошло не так!" />}
    </Paper>
  );
};
