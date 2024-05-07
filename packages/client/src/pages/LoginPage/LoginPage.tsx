import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { paths } from '@/app/constants/paths';
import {
  yandexRedirectUrl,
  useLoginByLoginMutation,
  useLoginByYandexMutation,
} from '@/shared/api/authApi';
import { ILoginData } from '@/shared/types';
import { loginValidator, passwordValidator } from '@/shared/utils';
import {
  Box,
  Button,
  Paper,
  SvgIcon,
  TextField,
  Typography,
} from '@mui/material';
import { YandexIcon } from '@/shared/ui/icons/YandexIcon';

export const LoginPage: React.FC = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>({ mode: 'all' });

  const navigate = useNavigate();
  const [loginByLogin, { isError }] = useLoginByLoginMutation();
  const [loginByYandex] = useLoginByYandexMutation();

  const onSubmit = handleSubmit(async data => {
    await loginByLogin(data)
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

  const onLoginByYandex = () => {
    loginByYandex()
      .unwrap()
      .then(() => {
        window.open(yandexRedirectUrl, '_blank');
        window.close();
      });
  };

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
            Авторизация
          </Typography>
          <TextField
            label="Логин"
            variant="outlined"
            error={!!errors?.login}
            helperText={errors?.login?.message}
            {...register('login', loginValidator)}
          />
          <TextField
            label="Пароль"
            variant="outlined"
            type="password"
            error={!!errors?.password}
            helperText={errors?.password?.message}
            {...register('password', passwordValidator)}
          />
          {isError && (
            <Typography variant="body2" color="error">
              Неправильный логин или пароль
            </Typography>
          )}
          <Button variant="contained" type="submit">
            Войти
          </Button>
          <Button variant="outlined" onClick={() => navigate(paths.signUp)}>
            Зарегистрироваться
          </Button>
          <Typography>С помощью соц. сетей</Typography>
          <Box>
            <Button onClick={onLoginByYandex}>
              <SvgIcon>
                <YandexIcon />
              </SvgIcon>
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
