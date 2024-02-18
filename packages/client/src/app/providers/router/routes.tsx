import type { RouteObject } from 'react-router-dom';

import { LoginPage } from '@/pages/LoginPage';
import { RegistrationPage } from '@/pages/RegistrationPage';
import { HomePage } from '@/pages/HomePage';
import { paths } from '../../constants/paths';
import { AuthGuard } from './AuthGuard';
import { ErrorPage } from '@/pages/ErrorPage';
import { GamePage } from '@/pages/GamePage';
import { LeaderBoardPage } from '@/pages/LeaderBoardPage';

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
        <GamePage />
      </AuthGuard>
    ),
  },
  {
    path: paths.leaderboard,
    element: (
      <AuthGuard>
        <LeaderBoardPage />
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
    element: <ErrorPage code={500} text="Произошла непредвиденная ошибка" />,
  },
  {
    path: '*',
    element: <ErrorPage code={404} text="Страницы не существует :(" />,
  },
];
