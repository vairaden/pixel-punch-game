import { HomePage } from '@/pages/HomePage';
import '../style/root.scss';
import { LoginPage } from '@/pages/LoginPage';
import { RegistrationPage } from '@/pages/RegistrationPage';

function App() {
  // TODO: Роутер
  return (
    <div data-testid="app" id="app">
      {/* <HomePage /> */}
      <LoginPage />
      {/* <RegistrationPage /> */}
    </div>
  );
}

export default App;
