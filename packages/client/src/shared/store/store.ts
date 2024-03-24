import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { testApi } from '@/shared/api/testApi';
import { authApi } from '../api/authApi';
import { profileApi } from '../api/profileApi';
import { userReducer } from './slices/user.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    [testApi.reducerPath]: testApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  preloadedState:
    typeof window === 'undefined' ? null : window.APP_INITIAL_STATE,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(testApi.middleware)
      .concat(authApi.middleware)
      .concat(profileApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
