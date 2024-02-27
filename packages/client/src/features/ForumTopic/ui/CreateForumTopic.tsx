import { paths } from '@/app/constants/paths';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Add from '@mui/icons-material/Add';

export const CreateForumTopic = () => {
  const navigate = useNavigate();

  const handleCreateTopicClick = () => {
    navigate(paths.forumTopicCreate);
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<Add />}
      onClick={handleCreateTopicClick}>
      Создать тему
    </Button>
  );
};
