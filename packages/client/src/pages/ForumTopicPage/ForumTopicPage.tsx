import { IForumTopicComment } from '@/shared/types';
import { ForumTopicAddComment } from '@/features';
import { ForumTopicCommentList } from '@/widgets';
import { ForumTopicCard } from '@/entities';
import { withAuthGuard } from '@/app/providers/router/withAuthGuard';

import { Container } from '@mui/material';

const mockForumComments: IForumTopicComment[] = [
  {
    id: 0,
    author: {
      first_name: 'Иван',
      second_name: 'Иванов',
      avatar:
        'https://creazilla-store.fra1.digitaloceanspaces.com/icons/7912642/avatar-icon-md.png',
    },
    createAt: '1.01.2024',
    text: 'Отлично!',
  },
  {
    id: 1,
    author: {
      first_name: 'Петр',
      second_name: 'Петров',
      avatar:
        'https://creazilla-store.fra1.digitaloceanspaces.com/icons/7912642/avatar-icon-md.png',
    },
    createAt: '1.01.2024',
    text: 'Хорошая идея',
  },
];

export const ForumTopicPage = withAuthGuard((): JSX.Element => {
  return (
    <Container maxWidth="xl" sx={{ my: '20px' }}>
      <ForumTopicCard
        author={{
          first_name: 'Иван',
          second_name: 'Иванов',
          avatar:
            'https://creazilla-store.fra1.digitaloceanspaces.com/icons/7912642/avatar-icon-md.png',
        }}
        createAt="1.01.2024"
        title="Тема форума"
        body="Содержимое темы"
      />

      <ForumTopicCommentList comments={mockForumComments} />
      <ForumTopicAddComment />
    </Container>
  );
});
