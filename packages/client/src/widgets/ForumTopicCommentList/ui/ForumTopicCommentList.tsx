import { IForumTopicComment } from '@/shared/types';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Pagination,
} from '@mui/material';

type ForumTopicCommentListProps = {
  comments: IForumTopicComment[];
};

export const ForumTopicCommentList = ({
  comments,
}: ForumTopicCommentListProps) => {
  return (
    <Box
      sx={{
        my: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}>
      {comments.map(comment => (
        <Card variant="outlined" key={comment.id}>
          <CardHeader
            avatar={<Avatar src={comment.author.avatar}></Avatar>}
            title={`${comment.author.first_name} ${comment.author.second_name}`}
            subheader={comment.createAt}
          />
          <CardContent>
            <Typography variant="body1">{comment.text}</Typography>
          </CardContent>
        </Card>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination />
      </Box>
    </Box>
  );
};
