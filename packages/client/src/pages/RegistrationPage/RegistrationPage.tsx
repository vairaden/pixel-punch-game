import { paths } from '@/app/constants/paths';
import { useCreateUserMutation } from '@/shared/api/authApi';
import { IUser } from '@/shared/types';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const RegistrationPage: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<Omit<IUser, 'id'>>();
  const navigate = useNavigate();
  const [createUser, { isError }] = useCreateUserMutation();

  const onSubmit = (data: Omit<IUser, 'id'>) => {
    createUser(data)
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
            Регистрация
          </Typography>
          <TextField
            label="Имя"
            variant="outlined"
            {...register('first_name')}
          />
          <TextField
            label="Фамилия"
            variant="outlined"
            {...register('second_name')}
          />
          <TextField label="Login" variant="outlined" {...register('login')} />
          <TextField
            label="Email"
            variant="outlined"
            {...register('email')}
            type="email"
          />
          <TextField
            label="Пароль"
            variant="outlined"
            type="password"
            {...register('password')}
          />
          <TextField
            label="Телефон"
            variant="outlined"
            {...register('phone')}
          />
          {isError && (
            <Typography variant="body2" color="error">
              Что-то пошло не так
            </Typography>
          )}
          <Button variant="contained" type="submit">
            Войти
          </Button>
          <Button variant="outlined" onClick={() => navigate(paths.signIn)}>
            Зарегистрироваться
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};
