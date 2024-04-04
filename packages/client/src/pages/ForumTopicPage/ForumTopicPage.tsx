import { ForumTopicAddComment } from '@/features';
import { ForumTopicCommentList } from '@/widgets';
import { ForumTopicCard } from '@/entities';
import { withAuthGuard } from '@/app/providers/router/withAuthGuard';

import { Container } from '@mui/material';
import { useGetTopicByIdQuery } from '@/shared/api/topicApi';
import { useParams } from 'react-router-dom';
import { IForumTopic } from '@/shared/types';
import { useGetCommentsByIdQuery } from '@/shared/api/commentApi';

export const ForumTopicPage = withAuthGuard((): JSX.Element => {
  const param = useParams();
  const id = param['topic-id'] as unknown as number;

  const { data = {}, isLoading } = useGetTopicByIdQuery(id);
  const { data: comments, isLoading: commentIsLoading } =
    useGetCommentsByIdQuery(id);

  const { author, createdAt, title, content } = data as IForumTopic;

  if (isLoading || commentIsLoading) return <p>Loading...</p>;

  return (
    <Container maxWidth="xl" sx={{ my: '20px' }}>
      <ForumTopicCard
        author={author}
        createdAt={createdAt}
        title={title}
        content={content}
      />

      {comments?.map(comment => (
        <ForumTopicCommentList key={comment.id} {...comment} />
      ))}
      <ForumTopicAddComment reply_id={null} />
    </Container>
  );
});
