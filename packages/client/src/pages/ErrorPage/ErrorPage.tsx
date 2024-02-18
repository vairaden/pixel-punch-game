import { Box, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

type ErrorPageProps = {
  code: number;
  text: string;
};

export const ErrorPage = ({ code, text }: ErrorPageProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        flexDirection: 'column',
      }}>
      <Typography variant="h1" component="h1">
        {code}
      </Typography>
      <Typography variant="body1" component="p">
        {text}
      </Typography>
      <Link to="/" component={RouterLink}>
        Вернуться на главную
      </Link>
    </Box>
  );
};
