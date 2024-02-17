import { RouterProvider } from 'react-router-dom';
import { router } from '../providers';
import '../style/root.scss';

function App() {
  return (
    <div data-testid="app" id="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
