import {
  useLazyGetUserInfoQuery,
  useLoginByLoginMutation,
} from '@/shared/api/authApi';
import { ILoginData } from '@/shared/types';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

export const LoginPage: React.FC = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loginByLogin, { isError }] = useLoginByLoginMutation();
  const [getUserInfo] = useLazyGetUserInfoQuery();

  useEffect(() => {
    getUserInfo().then(res => console.log(res));
  }, []);

  const onSubmit = (data: FieldValues) => {
    loginByLogin(data as ILoginData)
      .unwrap()
      .then(() => {
        reset();
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        console.log('go to the app');
      })
      .catch(e => console.log(e));
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
            Authorization
          </Typography>
          <TextField label="Login" variant="outlined" {...register('login')} />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            {...register('password')}
          />
          {isError && (
            <Typography variant="body2" color="error">
              Login or password is incorrect
            </Typography>
          )}
          <Button variant="contained" type="submit">
            Sign in
          </Button>
          <Button
            variant="outlined"
            onClick={() => console.log('go to registration page')}>
            Sign up
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};
