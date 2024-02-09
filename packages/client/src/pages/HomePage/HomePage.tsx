import { Box, Container, Typography } from '@mui/material'
import { useGetTestDataQuery } from '@/shared/api/testApi'

export function HomePage() {
  const { data, isLoading } = useGetTestDataQuery()

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          {isLoading ? 'Loading' : data}
        </Typography>
      </Box>
    </Container>
  )
}
