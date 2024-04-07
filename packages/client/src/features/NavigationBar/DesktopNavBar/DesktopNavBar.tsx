import { Box, MenuItem, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { navTabs } from '../constants';

export const DesktopNavBar: React.FC = () => {
  const theme = useTheme();
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
