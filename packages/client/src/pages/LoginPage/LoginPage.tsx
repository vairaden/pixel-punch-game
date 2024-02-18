import { paths } from '@/app/constants/paths';
import {
  useLazyGetUserInfoQuery,
  useLoginByLoginMutation,
} from '@/shared/api/authApi';
import { ILoginData } from '@/shared/types/auth.interface';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<ILoginData>();
  const navigate = useNavigate();
  const [loginByLogin, { isError }] = useLoginByLoginMutation();
  const [getUserInfo] = useLazyGetUserInfoQuery();

  useEffect(() => {
    getUserInfo()
      .unwrap()
      .then(() => {
        navigate(paths.homePage);
      });
  }, []);

  const onSubmit = (data: ILoginData) => {
    loginByLogin(data)
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
          onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" component="h1">
            Авторизация
          </Typography>
          <TextField label="Логин" variant="outlined" {...register('login')} />
          <TextField
            label="Пароль"
            variant="outlined"
            type="password"
            {...register('password')}
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
        </Paper>
      </Box>
    </Box>
  );
};
