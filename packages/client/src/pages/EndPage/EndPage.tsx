import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
  resetCallback: () => void;
}

export const EndPage: FC<Props> = ({ resetCallback }) => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Paper sx={{ display: 'flex', flexDirection: 'column', padding: 8 }}>
          <Typography sx={{textAlign: 'center', mb: 4}} variant="h3">
            Отличный результат!
          </Typography>
          <Button variant="contained" onClick={resetCallback}>Назад</Button>
        </Paper>
      </Box>
    </Container>
  );
};
