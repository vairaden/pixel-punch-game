import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
} from '@mui/material';

import { IForumTopicComment } from '@/shared/types';

type ForumTopicCommentProps = IForumTopicComment;

export const ForumTopicComment = ({
  content,
  createdAt,
  author,
}: ForumTopicCommentProps): JSX.Element => {
  return (
    <Card variant="outlined">
      <CardHeader
        avatar={<Avatar src={''}></Avatar>}
        title={`${author.first_name} ${author.second_name}`}
        subheader={createdAt}
      />
      <CardContent>
        <Typography variant="body1">{content}</Typography>
      </CardContent>
    </Card>
  );
};
