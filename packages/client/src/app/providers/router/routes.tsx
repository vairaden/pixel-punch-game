import type { RouteObject } from 'react-router-dom';

import { LoginPage } from '@/pages/LoginPage';
import { RegistrationPage } from '@/pages/RegistrationPage';
import { HomePage } from '@/pages/HomePage';
import { ErrorPage } from '@/pages/ErrorPage';
import { LeaderBoardPage } from '@/pages/LeaderBoardPage';

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
    element: <LeaderBoardPage />,
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
    element: <ErrorPage code={500} text="Произошла непредвиденная ошибка" />,
  },
  {
    path: '*',
    element: <ErrorPage code={404} text="Страницы не существует :(" />,
  },
];
