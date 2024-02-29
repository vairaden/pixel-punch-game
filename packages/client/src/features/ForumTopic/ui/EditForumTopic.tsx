import { Button } from '@mui/material';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { IForumTopic } from '@/shared/types';
import { useNavigate } from 'react-router-dom';
import { paths } from '@/app/constants/paths';

type EditForumTopicProps = {
  id: IForumTopic['id'];
};

export const EditForumTopic = ({ id }: EditForumTopicProps): JSX.Element => {
  const navigate = useNavigate();

  const handleEditButtonClick = () => {
    navigate(`${paths.forumTopicCreate}/${id}`);
  };

  return (
    <Button
      color="success"
      variant="outlined"
      startIcon={<EditOutlined />}
      onClick={handleEditButtonClick}>
      Редактировать
    </Button>
  );
};
