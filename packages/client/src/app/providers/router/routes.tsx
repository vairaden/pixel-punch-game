import type { RouteObject } from 'react-router-dom';

import { LoginPage } from '@/pages/LoginPage';
import { RegistrationPage } from '@/pages/RegistrationPage';
import { HomePage } from '@/pages/HomePage';
import { ErrorPage } from '@/pages/ErrorPage';

export const routes: RouteObject[] = [
  {
    path: '/sign-in',
    element: <LoginPage />,
  },
  {
    path: '/sign-up',
    element: <RegistrationPage />,
  },
  {
    path: '/profile',
    element: <div>Профиль пользователя</div>,
  },
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/game',
    element: <div>Страница игры</div>,
  },
  {
    path: '/leaderboard',
    element: <div>Страница лидерборда</div>,
  },
  {
    path: '/forum',
    element: <div>Страница форума</div>,
  },
  {
    path: '/forum/:topic-id',
    element: <div>Страница топика форума</div>,
  },
  {
    path: '/500',
    element: <div>Ошибка 500</div>,
  },
  {
    path: '*',
    element: <ErrorPage code={404} text="Страницы не существует :(" />,
  },
];
