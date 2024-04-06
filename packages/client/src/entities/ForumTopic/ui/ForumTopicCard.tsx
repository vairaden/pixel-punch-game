import { PropsWithChildren } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
} from '@mui/material';

import { IForumTopic } from '@/shared/types';
import { BASE_URL } from '@/shared/api/baseApi';

export type ForumTopicCardProps = {
  author: IForumTopic['author'];
  createdAt: IForumTopic['createdAt'];
  title: IForumTopic['title'];
  actions?: React.ReactNode;
  content?: string;
};

export const ForumTopicCard = ({
  author,
  createdAt,
  title,
  actions,
  content,
}: PropsWithChildren<ForumTopicCardProps>): JSX.Element => {
  const AVATAR_URL = `${BASE_URL}/resources/${author?.avatar}`;

  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardHeader
        avatar={<Avatar src={AVATAR_URL} />}
        title={author?.first_name + ' ' + author?.second_name}
        subheader={createdAt}
      />

      <CardContent>
        <Typography variant="h4">{title}</Typography>
        {content && (
          <Typography variant="body1" color="text.secondary">
            {content}
          </Typography>
        )}
      </CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  );
};
