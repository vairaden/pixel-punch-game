import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// FIXME: Слой обращается к слою выше, что запрещено в FSD
import { paths } from '@/app/constants/paths';
import { ForumTopicEditForm, ForumTopicEditorProps } from '@/shared/types';
import {
  useSetTopicMutation,
  useUpdateTopicByIdMutation,
} from '@/shared/api/topicApi';

export const ForumTopicEditor = ({
  id,
}: ForumTopicEditorProps): JSX.Element => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<ForumTopicEditForm>();

  const [createTopic] = useSetTopicMutation();
  const [updateTopic] = useUpdateTopicByIdMutation();

  const handleOnSuccess = () => {
    alert('Успех');
    navigate(paths.forum);
  };

  const onSubmit: SubmitHandler<ForumTopicEditForm> = data => {
    if (id) {
      updateTopic({ id, body: data })
        .unwrap()
        .then(() => handleOnSuccess())
        .catch(console.error);
    } else {
      createTopic(data)
        .unwrap()
        .then(() => handleOnSuccess())
        .catch(console.error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        mt: '30px',
      }}>
      <Typography variant="h4">
        {id ? 'Редактирование темы' : 'Создание новой темы'}
      </Typography>
      <TextField
        label="Заголовок"
        placeholder="Введите заголовок темы"
        required
        {...register('title', { required: true })}
      />
      <TextField
        multiline
        label="Содержание"
        placeholder="Введите содержимое темы"
        minRows={4}
        {...register('content')}
      />
      <Box sx={{ display: 'flex', justifyContent: 'right' }}>
        <Button variant="contained" type="submit">
          Сохранить
        </Button>
      </Box>
    </Box>
  );
};
