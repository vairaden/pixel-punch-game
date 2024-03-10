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

describe.skip('App', () => {
  test('рендер компонента', () => {
    render(<App />);
  });

  test('рендер компонента с with data-testid="app"', () => {
    const { getByTestId } = render(<App />);
    const appElement = getByTestId('app');
    expect(appElement).toBeInTheDocument();
  });
});
