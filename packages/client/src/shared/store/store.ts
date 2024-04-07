import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { testApi } from '@/shared/api/testApi';
import { authApi } from '../api/authApi';
import { profileApi } from '../api/profileApi';
import { leaderboardApi } from '../api/leaderboardApi';
import { userReducer } from './slices/user.slice';
import { topicApi } from '../api/topicApi';
import { commentApi } from '../api/commentApi';
import { themeApi } from '@/shared/api/themeApi';

export const store = configureStore({
  reducer: {
    user: userReducer,
    [testApi.reducerPath]: testApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [topicApi.reducerPath]: topicApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [leaderboardApi.reducerPath]: leaderboardApi.reducer,
    [themeApi.reducerPath]: themeApi.reducer,
  },

  preloadedState:
    typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(testApi.middleware)
      .concat(topicApi.middleware)
      .concat(commentApi.middleware)
      .concat(authApi.middleware)
      .concat(profileApi.middleware)
      .concat(leaderboardApi.middleware)
      .concat(themeApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
