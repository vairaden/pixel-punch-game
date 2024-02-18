import type { RouteObject } from 'react-router-dom';

import { LoginPage } from '@/pages/LoginPage';
import { RegistrationPage } from '@/pages/RegistrationPage';
import { HomePage } from '@/pages/HomePage';
import { ProfilePage } from '@/pages/ProfilePage';
import { paths } from '../../constants/paths';
import { AuthGuard } from './AuthGuard';
import { ErrorPage } from '@/pages/ErrorPage';
import { MainLayout } from '@/shared/layouts/MainLayout';
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
        <ProfilePage />
      </AuthGuard>
    ),
  },
  {
    path: paths.homePage,
    element: (
      <AuthGuard>
        <MainLayout>
          <HomePage />
        </MainLayout>
      </AuthGuard>
    ),
  },
  {
    path: paths.game,
    element: (
      <AuthGuard>
        <MainLayout>
          <GamePage />
        </MainLayout>
      </AuthGuard>
    ),
  },
  {
    path: paths.leaderboard,
    element: (
      <AuthGuard>
        <MainLayout>
          <LeaderBoardPage />
        </MainLayout>
      </AuthGuard>
    ),
  },
  {
    path: paths.forum,
    element: (
      <AuthGuard>
        <MainLayout>
          <div>Страница форума</div>
        </MainLayout>
      </AuthGuard>
    ),
  },
  {
    path: paths.forumTopic,
    element: (
      <AuthGuard>
        <MainLayout>
          <div>Страница топика форума</div>
        </MainLayout>
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
