import App from './App';
import { render, screen } from '@testing-library/react';
import { store } from '@/shared/store';
import { Provider } from 'react-redux';

test('Example test', async () => {
  // TODO: Нормально замокать redux
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByTestId('app')).toBeVisible();
});
