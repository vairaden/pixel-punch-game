import React from 'react';
import { useForm } from 'react-hook-form';

import { Paper, TextField, Button, Grid } from '@mui/material';

export const ProfileInfo: React.FC = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(formData => {
    console.log(formData);
  });

  return (
    <Paper component="form" sx={{ padding: 2, width: 600 }} onSubmit={onSubmit}>
      <Grid container spacing={4}>
        <Grid item>
          <TextField label="Почта" variant="standard" {...register('email')} />
        </Grid>
        <Grid item>
          <TextField label="Логин" variant="standard" {...register('logins')} />
        </Grid>
        <Grid item>
          <TextField
            label="Имя"
            variant="standard"
            {...register('first_name')}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Фамилия"
            variant="standard"
            {...register('second_name')}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Телефон"
            variant="standard"
            type="tel"
            {...register('phone')}
          />
        </Grid>
        {/*<TextField
          label="Пароль"
          variant="standard"
          type="password"
          {...register('password')}
        />*/}
      </Grid>
      <Button variant="contained" type="submit" sx={{ marginTop: 5 }}>
        Изменить
      </Button>
    </Paper>
  );
};
