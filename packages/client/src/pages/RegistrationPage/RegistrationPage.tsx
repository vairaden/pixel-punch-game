import { useCreateUserMutation } from '@/shared/api/authApi';
import { IUser } from '@/shared/types';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';

export const RegistrationPage: React.FC = () => {
  const { register, handleSubmit, reset } = useForm();
  const [createUser, { isError }] = useCreateUserMutation();

  const onSubmit = (data: FieldValues) => {
    createUser(data as Omit<IUser, 'id'>)
      .unwrap()
      .then(() => {
        reset();
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
            Registration
          </Typography>
          <TextField
            label="First Name"
            variant="outlined"
            {...register('first_name')}
          />
          <TextField
            label="Second Name"
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
            label="Password"
            variant="outlined"
            type="password"
            {...register('password')}
          />
          <TextField label="Phone" variant="outlined" {...register('phone')} />
          {isError && (
            <Typography variant="body2" color="error">
              Something went wrong
            </Typography>
          )}
          <Button variant="contained" type="submit">
            Sign up
          </Button>
          <Button
            variant="outlined"
            onClick={() => console.log('go to login page')}>
            Sign in
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};
