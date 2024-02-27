import type { RouteObject } from 'react-router-dom';

import { LoginPage } from '@/pages/LoginPage';
import { RegistrationPage } from '@/pages/RegistrationPage';
import { HomePage } from '@/pages/HomePage';
import { ProfilePage } from '@/pages/ProfilePage';
import { paths } from '../../constants/paths';
import { ErrorPage } from '@/pages/ErrorPage';
import { LeaderBoardPage } from '@/pages/LeaderBoardPage';
import { GameProcess } from '@/processes/GameProcess';
import { ErrorBoundary } from '../errorBoundary';
import { withAuthGuard } from './withAuthGuard';

const ForumPage = withAuthGuard(() => <div>Страница форума</div>);
const ForumTopicPage = withAuthGuard(() => <div>Страница топика форума</div>);

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
        <ProfilePage />
      </ErrorBoundary>
    ),
  },
  {
    path: paths.homePage,
    element: (
      <ErrorBoundary>
        <HomePage />
      </ErrorBoundary>
    ),
  },
  {
    path: paths.game,
    element: (
      <ErrorBoundary>
        <GameProcess />
      </ErrorBoundary>
    ),
  },
  {
    path: paths.leaderboard,
    element: (
      <ErrorBoundary>
        <LeaderBoardPage />
      </ErrorBoundary>
    ),
  },
  {
    path: paths.forum,
    element: (
      <ErrorBoundary>
        <ForumPage />
      </ErrorBoundary>
    ),
  },
  {
    path: paths.forumTopic,
    element: (
      <ErrorBoundary>
        <ForumTopicPage />
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
