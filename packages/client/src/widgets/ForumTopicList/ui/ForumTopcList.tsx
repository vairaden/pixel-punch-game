import { Box, Pagination } from '@mui/material';
import { ForumTopicCard } from '@/entities';
import { DeleteForumTopic, EditForumTopic, OpenForumTopic } from '@/features';
import { useGetTopicsQuery } from '@/shared/api/topicApi';

export const ForumTopicList = () => {
  const { data, isLoading } = useGetTopicsQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box>
      {data?.map(({ id, title, content, createdAt, author }) => (
        <ForumTopicCard
          title={title}
          content={content}
          key={id}
          createdAt={createdAt}
          author={author}
          actions={
            <>
              <EditForumTopic id={id} />
              <DeleteForumTopic id={id} />
              <OpenForumTopic id={id} />
            </>
          }
        />
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination />
      </Box>
    </Box>
  );
};
