import type { RouteObject } from 'react-router-dom';

import { LoginPage } from '@/pages/LoginPage';
import { RegistrationPage } from '@/pages/RegistrationPage';
import { HomePage } from '@/pages/HomePage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/registration',
    element: <RegistrationPage />,
  },
  {
    path: '/profile',
    element: <div>Профиль пользователя</div>,
  },
  {
    path: '/main',
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
    element: <div>Ошибка 404</div>,
  },
];
