import { Button } from '@mui/material';

import Delete from '@mui/icons-material/Delete';
import { IForumTopic } from '@/shared/types';

type DeleteForumTopicProps = {
  id: IForumTopic['id'];
};

export const DeleteForumTopic = ({
  id,
}: DeleteForumTopicProps): JSX.Element => {
  const handleDeleteButtonClick = () => {
    console.log(`delete topic with id: ${id}`);
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
