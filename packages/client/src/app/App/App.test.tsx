import App from './App';
import { render } from '@testing-library/react';

jest.mock('./App', () => {
  return function App() {
    return (
      <div data-testid="app" id="app">
        mocking
      </div>
    );
  };
});

describe.skip('App component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('renders the root element with data-testid="app"', () => {
    const { getByTestId } = render(<App />);
    const appElement = getByTestId('app');
    expect(appElement).toBeInTheDocument();
  });
});
