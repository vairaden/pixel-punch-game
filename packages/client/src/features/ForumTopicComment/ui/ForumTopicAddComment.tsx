import { useSetCommentByIdMutation } from '@/shared/api/commentApi';
import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

interface ITopicComment {
  reply_id: number | null;
}

export const ForumTopicAddComment = ({ reply_id }: ITopicComment) => {
  const param = useParams();
  const topicId = param['topic-id'] as unknown as number;

  const [createComment] = useSetCommentByIdMutation();
  const { register, handleSubmit, reset } = useForm<{ content: string }>();

  const onSubmit = handleSubmit(data => {
    createComment({
      content: data.content,
      topic_id: topicId,
      reply_id,
    })
      .unwrap()
      .then(() => reset())
      .catch(console.error);
  });

  return (
    <Box
      sx={{ width: '100%', display: 'flex', columnGap: 1 }}
      component="form"
      onSubmit={onSubmit}>
      <TextField
        placeholder="Введите комментарий"
        label="Ваш комментарий"
        multiline
        minRows={1}
        fullWidth
        {...register('content')}
      />
      <Button type="submit" variant="outlined" sx={{ width: '200px' }}>
        Комментировать
      </Button>
    </Box>
  );
};
