import React from 'react';
import { useForm } from 'react-hook-form';

import { Paper, TextField, Button, Grid } from '@mui/material';

export const ProfilePassword: React.FC = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(formData => {
    console.log(formData);
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
    </Paper>
  );
};
