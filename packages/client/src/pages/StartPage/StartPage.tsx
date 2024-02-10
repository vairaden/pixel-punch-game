import { Box, Container, Typography } from '@mui/material';

export function StartPage() {

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Hello
        </Typography>
      </Box>
    </Container>
  );
}
