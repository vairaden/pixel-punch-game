import { Container, Box } from '@mui/material';
import { ForumTopicList } from '@/widgets';
import { ForumTopicFilter, CreateForumTopic } from '@/features';
import { withAuthGuard } from '@/app/providers/router/withAuthGuard';

export const ForumPage = withAuthGuard(() => {
  return (
    <Box>
      <Container maxWidth="xl">
        <Box
          sx={{
            paddingY: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <ForumTopicFilter />
          <CreateForumTopic />
        </Box>
        <ForumTopicList />
      </Container>
    </Box>
  );
});
