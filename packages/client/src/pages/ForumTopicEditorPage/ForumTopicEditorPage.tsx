import { Container } from '@mui/material';
import { ForumTopicEditor } from '@/features';
import { useParams } from 'react-router-dom';
import { withAuthGuard } from '@/app/providers/router/withAuthGuard';

export const ForumTopicEditorPage = withAuthGuard(() => {
  const params = useParams<{ 'topic-id'?: string }>();
  const id = params['topic-id'] ? +params['topic-id'] : undefined;

  return (
    <Container maxWidth="xl">
      <ForumTopicEditor id={id} />
    </Container>
  );
});
