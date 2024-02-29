import { Container, Box } from '@mui/material';
import { ForumTopicList } from '@/widgets';
import { ForumTopicFilter, CreateForumTopic } from '@/features';
import { IForumTopic } from '@/shared/types';
import { withAuthGuard } from '@/app/providers/router/withAuthGuard';

const mockTopics: IForumTopic[] = [
  {
    id: 1,
    title: 'Предлагаю добавить в игру возможность покупки скинов',
    author: {
      first_name: 'Иван',
      second_name: 'Иванов',
      avatar:
        'https://creazilla-store.fra1.digitaloceanspaces.com/icons/7912642/avatar-icon-md.png',
    },
    createAt: '1.01.2024',
    commentsCount: 10,
  },
  {
    id: 2,
    title: 'Предлагаю не добавлять в игру возможность покупки скинов',
    author: {
      first_name: 'Петр',
      second_name: 'Петров',
      avatar:
        'https://creazilla-store.fra1.digitaloceanspaces.com/icons/7912642/avatar-icon-md.png',
    },
    createAt: '1.01.2024',
    commentsCount: 2,
  },
];

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
        <ForumTopicList topics={mockTopics} />
      </Container>
    </Box>
  );
});
