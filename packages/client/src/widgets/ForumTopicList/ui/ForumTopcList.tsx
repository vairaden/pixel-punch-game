import { Box, Pagination } from '@mui/material';
import { ForumTopicCard } from '@/entities';
import { IForumTopic } from '@/shared/types';
import { DeleteForumTopic, EditForumTopic, OpenForumTopic } from '@/features';

type ForumTopicListProps = {
  topics: IForumTopic[];
};

export const ForumTopicList = ({
  topics,
}: ForumTopicListProps): JSX.Element => {
  return (
    <Box>
      {topics.map(topic => (
        <ForumTopicCard
          title={topic.title}
          key={topic.id}
          createAt={topic.createAt}
          author={topic.author}
          actions={
            <>
              <EditForumTopic id={topic.id} />
              <DeleteForumTopic id={topic.id} />
              <OpenForumTopic id={topic.id} />
            </>
          }></ForumTopicCard>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination />
      </Box>
    </Box>
  );
};
