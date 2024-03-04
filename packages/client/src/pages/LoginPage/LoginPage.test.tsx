import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/shared/store';
import { LoginPage } from './index';

const mockLoginResult = {
  unwrap: jest.fn().mockResolvedValue({}),
};

const mockLoginByLogin = jest.fn().mockReturnValue(mockLoginResult);

jest.mock('@/shared/api/authApi', () => ({
  __esModule: true,
  ...jest.requireActual('@/shared/api/authApi'),
  useLoginByLoginMutation: () => [mockLoginByLogin, { isError: false }],
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('LoginPage', () => {
  test('проверка правильности отображения страницы', () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(getByLabelText('Логин')).toBeInTheDocument();
    expect(getByLabelText('Пароль')).toBeInTheDocument();
    expect(getByText('Войти')).toBeInTheDocument();
    expect(getByText('Зарегистрироваться')).toBeInTheDocument();
  });

  test('сабмит формы с корректными данными', async () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(getByLabelText('Логин'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(getByLabelText('Пароль'), {
      target: { value: 'Password123' },
    });
    fireEvent.click(getByText('Войти'));

    await waitFor(() => {
      expect(mockLoginByLogin).toHaveBeenCalledWith({
        login: 'testuser',
        password: 'Password123',
      });
    });
  });

  test('отображение ошибки при невалидных значениях', async () => {
    jest.mock('@/shared/api/authApi', () => ({
      __esModule: true,
      ...jest.requireActual('@/shared/api/authApi'),
      useLoginByLoginMutation: () => [mockLoginByLogin, { isError: true }],
    }));

    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(getByLabelText('Логин'), { target: { value: 'ad' } });
    fireEvent.change(getByLabelText('Пароль'), { target: { value: '111' } });
    fireEvent.click(getByText('Войти'));

    await waitFor(() => {
      expect(getByText('Минимум 3 символа!')).toBeInTheDocument();
      expect(getByText('Минимум 8 символов!')).toBeInTheDocument();
    });
  });
});
