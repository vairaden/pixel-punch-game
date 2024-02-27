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

export type ForumTopicCardProps = {
  author: IForumTopic['author'];
  createAt: IForumTopic['createAt'];
  title: IForumTopic['title'];
  actions?: React.ReactNode;
  body?: string;
};

export const ForumTopicCard = ({
  author,
  createAt,
  title,
  actions,
  body,
}: PropsWithChildren<ForumTopicCardProps>): JSX.Element => {
  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardHeader
        avatar={<Avatar src={author.avatar}></Avatar>}
        title={author.first_name + ' ' + author.second_name}
        subheader={createAt}
      />

      <CardContent>
        <Typography variant="h4">{title}</Typography>
        {body && (
          <Typography variant="body1" color="text.secondary">
            {body}
          </Typography>
        )}
      </CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  );
};
