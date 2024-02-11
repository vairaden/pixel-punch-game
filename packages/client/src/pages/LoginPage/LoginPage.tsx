import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';

export const LoginPage: React.FC = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    reset();
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
