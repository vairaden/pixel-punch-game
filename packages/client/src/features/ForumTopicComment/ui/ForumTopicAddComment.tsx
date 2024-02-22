import { Box, TextField } from '@mui/material';

export const ForumTopicAddComment = (): JSX.Element => {
  return (
    <Box>
      <TextField
        placeholder="Введите комментарий"
        label="Ваш комментарий"
        multiline
        minRows={4}
        fullWidth
      />
    </Box>
  );
};
