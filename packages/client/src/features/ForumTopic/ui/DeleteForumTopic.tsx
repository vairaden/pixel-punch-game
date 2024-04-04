import { Button } from '@mui/material';

import Delete from '@mui/icons-material/Delete';
import { IForumTopic } from '@/shared/types';
import { useDeleteTopicByIdMutation } from '@/shared/api/topicApi';

type DeleteForumTopicProps = {
  id: IForumTopic['id'];
};

export const DeleteForumTopic = ({
  id,
}: DeleteForumTopicProps): JSX.Element => {
  const [deleteTopic] = useDeleteTopicByIdMutation();

  const handleDeleteButtonClick = () => {
    deleteTopic(id);
  };

  return (
    <Button
      color="error"
      variant="outlined"
      startIcon={<Delete />}
      onClick={handleDeleteButtonClick}>
      Удалить
    </Button>
  );
};
