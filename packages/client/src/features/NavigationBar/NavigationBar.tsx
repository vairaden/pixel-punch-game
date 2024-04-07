import {
  AppBar,
  Toolbar,
  Container,
  useTheme,
  IconButton,
} from '@mui/material';
import { DesktopNavBar } from './DesktopNavBar';
import { MobileNavBar } from './MobileNavBar';
import { UserMenu } from './UserMenu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useSetThemeMutation } from '@/shared/api/themeApi';

export const NavigationBar = () => {
  const theme = useTheme();
  const [setTheme] = useSetThemeMutation();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters component="nav">
          <MobileNavBar />
          <DesktopNavBar />
          <IconButton
            sx={{ ml: 1 }}
            onClick={() =>
              setTheme({
                theme: theme.palette.mode === 'dark' ? 'light' : 'dark',
              })
            }
            color="inherit">
            {theme.palette.mode === 'dark' ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
          <UserMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
