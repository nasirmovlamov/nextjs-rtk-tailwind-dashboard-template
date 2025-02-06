"use client";
import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./slices/AuthSlice";
import { authApi } from "./apis/AuthApi";
import { AppSlice } from "./slices/AppSlice";
import { corpsApi } from "./apis/CorpsApi";
import { brigadesApi } from "./apis/BrigadesApi";

export const store = configureStore({
  reducer: {
    app: AppSlice.reducer,
    auth: AuthSlice.reducer,
    // apis
    [authApi.reducerPath]: authApi.reducer,
    [corpsApi.reducerPath]: corpsApi.reducer,
    [brigadesApi.reducerPath]: brigadesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      corpsApi.middleware,
      brigadesApi.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
