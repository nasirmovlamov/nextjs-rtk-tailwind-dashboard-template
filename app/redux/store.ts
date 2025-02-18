import { AppSlice } from './slices/AppSlice';
import { AuthSlice } from './slices/AuthSlice';
import { authApi } from './apis/AuthApi';
import { brigadesApi } from './apis/BrigadesApi';
import { configureStore } from '@reduxjs/toolkit';
import { corpsApi } from './apis/CorpsApi';
import { documentsApi } from '@/app/redux/apis/DocumentsApi';
import { exampleApi } from './apis/ExampleApi';
import { groupsApi } from './apis/GroupsApi';
import { productsApi } from './apis/ProductsApi';
import { usersApi } from './apis/UsersApi';

export const store = configureStore({
  reducer: {
    app: AppSlice.reducer,
    auth: AuthSlice.reducer,
    // apis
    [authApi.reducerPath]: authApi.reducer,
    [corpsApi.reducerPath]: corpsApi.reducer,
    [brigadesApi.reducerPath]: brigadesApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [documentsApi.reducerPath]: documentsApi.reducer,

    // importing of exampleApi
    [exampleApi.reducerPath]: exampleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      corpsApi.middleware,
      brigadesApi.middleware,
      groupsApi.middleware,
      productsApi.middleware,
      usersApi.middleware,
      exampleApi.middleware,
      documentsApi.middleware,
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
