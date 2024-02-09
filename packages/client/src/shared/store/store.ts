import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { testApi } from '@/shared/api/testApi';

export const store = configureStore({
  reducer: {
    [testApi.reducerPath]: testApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(testApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
