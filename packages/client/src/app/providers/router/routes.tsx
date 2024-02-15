import type { RouteObject } from 'react-router-dom';

import { LoginPage } from '@/pages/LoginPage';
import { RegistrationPage } from '@/pages/RegistrationPage';
import { HomePage } from '@/pages/HomePage';
import { paths } from '@/app/constants/paths';
import { AuthGuard } from './AuthGuard';

export const routes: RouteObject[] = [
  {
    path: paths.signIn,
    element: <LoginPage />,
  },
  {
    path: paths.signUp,
    element: <RegistrationPage />,
  },
  {
    path: paths.profile,
    element: (
      <AuthGuard>
        <div>Профиль пользователя</div>
      </AuthGuard>
    ),
  },
  {
    path: paths.homePage,
    element: (
      <AuthGuard>
        <HomePage />
      </AuthGuard>
    ),
  },
  {
    path: paths.game,
    element: (
      <AuthGuard>
        <div>Страница игры</div>
      </AuthGuard>
    ),
  },
  {
    path: paths.leaderboard,
    element: (
      <AuthGuard>
        <div>Страница лидерборда</div>
      </AuthGuard>
    ),
  },
  {
    path: paths.forum,
    element: (
      <AuthGuard>
        <div>Страница форума</div>
      </AuthGuard>
    ),
  },
  {
    path: paths.forumTopic,
    element: (
      <AuthGuard>
        <div>Страница топика форума</div>
      </AuthGuard>
    ),
  },
  {
    path: paths.error,
    element: (
      <AuthGuard>
        {' '}
        <div>Ошибка 500</div>
      </AuthGuard>
    ),
  },
  {
    path: '*',
    element: (
      <AuthGuard>
        <div>Ошибка 404</div>
      </AuthGuard>
    ),
  },
];
