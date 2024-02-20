import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { paths } from '@/app/constants/paths';
import { useCreateUserMutation } from '@/shared/api/authApi';
import { IUser } from '@/shared/types/auth.interface';
import {
  emailValidator,
  loginValidator,
  namelValidator,
  passwordValidator,
  phoneValidator,
} from '@/shared/utils';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';

export const RegistrationPage: React.FC = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<IUser, 'id'>>({ mode: 'all' });

  const navigate = useNavigate();
  const [createUser, { isError }] = useCreateUserMutation();

  const onSubmit = handleSubmit(async data => {
    await createUser(data)
      .unwrap()
      .then(() => {
        reset();
        navigate(paths.homePage);
      })
      .catch(e => {
        if (e.status >= 500) {
          navigate(paths.error);
        }
      });
  });

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}>
      <Box sx={{ width: 300 }}>
        <Paper
          sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
          elevation={1}
          component="form"
          onSubmit={onSubmit}>
          <Typography variant="h4" component="h1">
            Регистрация
          </Typography>
          <TextField
            label="Имя"
            variant="outlined"
            error={!!errors?.first_name}
            helperText={errors?.first_name?.message}
            {...register('first_name', namelValidator)}
          />
          <TextField
            label="Фамилия"
            variant="outlined"
            error={!!errors?.second_name}
            helperText={errors?.second_name?.message}
            {...register('second_name', namelValidator)}
          />
          <TextField
            label="Login"
            variant="outlined"
            error={!!errors?.login}
            helperText={errors?.login?.message}
            {...register('login', loginValidator)}
          />
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            error={!!errors?.email}
            helperText={errors?.email?.message}
            {...register('email', emailValidator)}
          />
          <TextField
            label="Пароль"
            type="password"
            variant="outlined"
            error={!!errors?.password}
            helperText={errors?.password?.message}
            {...register('password', passwordValidator)}
          />
          <TextField
            label="Телефон"
            variant="outlined"
            error={!!errors?.phone}
            helperText={errors?.phone?.message}
            {...register('phone', phoneValidator)}
          />
          {isError && (
            <Typography variant="body2" color="error">
              Что-то пошло не так
            </Typography>
          )}
          <Button variant="contained" type="submit">
            Зарегистрироваться
          </Button>
          <Button variant="outlined" onClick={() => navigate(paths.signIn)}>
            Войти
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};
