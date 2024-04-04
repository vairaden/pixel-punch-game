import { ForumTopicAddComment } from '@/features';
import { IForumTopicComment } from '@/shared/types';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  CardActions,
} from '@mui/material';

export const ForumTopicCommentList = ({
  id,
  author,
  createdAt,
  content,
  replies,
}: IForumTopicComment) => {
  return (
    <Box
      sx={{
        my: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}>
      <Card variant="outlined" key={id}>
        <CardHeader
          avatar={<Avatar></Avatar>}
          title={`${author?.first_name} ${author?.second_name}`}
          subheader={createdAt}
        />
        <CardContent>
          <Typography variant="body1">{content}</Typography>
        </CardContent>
        <CardActions>
          <ForumTopicAddComment reply_id={id} />
        </CardActions>
        {replies?.map(({ id, author, content, createdAt, replies }) => (
          <Box key={id} sx={{ marginLeft: 3 }}>
            <ForumTopicCommentList
              id={id}
              author={author}
              content={content}
              createdAt={createdAt}
              replies={replies}
            />
          </Box>
        ))}
      </Card>
    </Box>
  );
};
