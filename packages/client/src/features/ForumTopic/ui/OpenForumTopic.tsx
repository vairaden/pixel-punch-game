import { paths } from '@/app/constants/paths';
import { IForumTopic } from '@/shared/types';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type OpenForumTopicProps = { id: IForumTopic['id'] };

export const OpenForumTopic = ({ id }: OpenForumTopicProps): JSX.Element => {
  const navigate = useNavigate();

  const handleOpenButtonClick = () => {
    navigate(`${paths.forum}/${id}`);
  };
  return (
    <Button color="info" variant="outlined" onClick={handleOpenButtonClick}>
      Открыть
    </Button>
  );
};
