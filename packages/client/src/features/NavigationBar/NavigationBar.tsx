import { AppBar, Toolbar, Container } from '@mui/material';
import { DesktopNavBar } from './DesktopNavBar';
import { MobileNavBar } from './MobileNavBar';
import { UserMenu } from './UserMenu';

export const NavigationBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters component="nav">
          <MobileNavBar />
          <DesktopNavBar />
          <UserMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
