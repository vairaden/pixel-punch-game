import { Typography } from '@mui/material';

type ColumnHeaderProps = {
  title: string;
};

export const ColumnHeader: React.FC<ColumnHeaderProps> = ({ title }) => {
  return (
    <Typography variant="body1" component="div" sx={{ fontWeight: 700 }}>
      {title}
    </Typography>
  );
};
