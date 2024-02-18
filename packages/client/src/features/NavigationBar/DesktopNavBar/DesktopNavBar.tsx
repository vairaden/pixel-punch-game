import { Box, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { navTabs } from '../constants';
import theme from '@/app/theme';

export const DesktopNavBar: React.FC = () => {
  return (
    <Box
      sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}
      component="ul">
      {navTabs.map(it => (
        <MenuItem color={theme.palette.primary.contrastText} key={it.title}>
          <Link to={it.path}>{it.title}</Link>
        </MenuItem>
      ))}
    </Box>
  );
};
