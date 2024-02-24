import type { RouteObject } from 'react-router-dom';

import { LoginPage } from '@/pages/LoginPage';
import { RegistrationPage } from '@/pages/RegistrationPage';
import { HomePage } from '@/pages/HomePage';
import { ProfilePage } from '@/pages/ProfilePage';
import { paths } from '../../constants/paths';
import { AuthGuard } from './AuthGuard';
import { ErrorPage } from '@/pages/ErrorPage';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { LeaderBoardPage } from '@/pages/LeaderBoardPage';
import { GameProcess } from '@/processes/GameProcess';
import { ErrorBoundary } from '../errorBoundary';

export const routes: RouteObject[] = [
  {
    path: paths.signIn,
    element: (
      <ErrorBoundary>
        <LoginPage />
      </ErrorBoundary>
    ),
  },
  {
    path: paths.signUp,
    element: (
      <ErrorBoundary>
        <RegistrationPage />
      </ErrorBoundary>
    ),
  },
  {
    path: paths.profile,
    element: (
      <ErrorBoundary>
        <AuthGuard>
          <MainLayout>
            <ProfilePage />
          </MainLayout>
        </AuthGuard>
      </ErrorBoundary>
    ),
  },
  {
    path: paths.homePage,
    element: (
      <ErrorBoundary>
        <AuthGuard>
          <MainLayout>
            <HomePage />
          </MainLayout>
        </AuthGuard>
      </ErrorBoundary>
    ),
  },
  {
    path: paths.game,
    element: (
      <ErrorBoundary>
        <AuthGuard>
          <MainLayout>
            <GameProcess />
          </MainLayout>
        </AuthGuard>
      </ErrorBoundary>
    ),
  },
  {
    path: paths.leaderboard,
    element: (
      <ErrorBoundary>
        <AuthGuard>
          <MainLayout>
            <LeaderBoardPage />
          </MainLayout>
        </AuthGuard>
      </ErrorBoundary>
    ),
  },
  {
    path: paths.forum,
    element: (
      <ErrorBoundary>
        <AuthGuard>
          <MainLayout>
            <div>Страница форума</div>
          </MainLayout>
        </AuthGuard>
      </ErrorBoundary>
    ),
  },
  {
    path: paths.forumTopic,
    element: (
      <ErrorBoundary>
        <AuthGuard>
          <MainLayout>
            <div>Страница топика форума</div>
          </MainLayout>
        </AuthGuard>
      </ErrorBoundary>
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
