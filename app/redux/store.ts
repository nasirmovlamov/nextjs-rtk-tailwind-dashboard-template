import { AppSlice } from './slices/AppSlice';
import { AuthSlice } from './slices/AuthSlice';
import { authApi } from './apis/AuthApi';
import { configureStore } from '@reduxjs/toolkit';
import { exampleApi } from './apis/ExampleApi';
import { usersApi } from './apis/UsersApi';

export const store = configureStore({
  reducer: {
    app: AppSlice.reducer,
    auth: AuthSlice.reducer,
    // apis
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    // importing of exampleApi
    [exampleApi.reducerPath]: exampleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      usersApi.middleware,
      exampleApi.middleware,
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
