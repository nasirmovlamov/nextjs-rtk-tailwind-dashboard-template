import { createApi } from "@reduxjs/toolkit/query/react";
import { AuthSlice } from "../slices/AuthSlice";
import { ENDPOINTS } from "@/app/consts/endpoints/endpoints";
import { axiosBaseQuery } from "../hooks";
import { ResponseAuth, ResponseLogin } from "../interfaces/response/auth";
import { RequestLogin } from "../interfaces/request/auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery({ baseUrl: ENDPOINTS.API }),

  tagTypes: ["auth"],
  endpoints: (builder) => ({
    login: builder.mutation<ResponseLogin, RequestLogin>({
      query: (data: RequestLogin) => ({
        url: "/login",
        method: "POST",
        data,
      }),
      invalidatesTags: ["auth"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // Update auth state (example using Redux Toolkit)
          dispatch(AuthSlice.actions.setAuth(data));
        } catch (err) {
          console.warn(err);
          // Handle login error (e.g., dispatch authSlice.actions.loginFailure)
          dispatch(AuthSlice.actions.setUnAuth());
        }
      },
    }),

    logout: builder.mutation<unknown, void>({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
    }),

    refreshToken: builder.mutation<ResponseLogin, string>({
      query: (token) => ({
        url: "/refresh",
        method: "POST",
        data: {
          refresh_token: token,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // Update auth state (example using Redux Toolkit)
          dispatch(AuthSlice.actions.setAuth(data));
        } catch (err) {
          console.warn(err);
          // Handle login error (e.g., dispatch authSlice.actions.loginFailure)
          dispatch(AuthSlice.actions.setUnAuth());
        }
      },
      invalidatesTags: ["auth"],
    }),

    getUser: builder.query<ResponseAuth, void>({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // Update auth state (example using Redux Toolkit)
          dispatch(AuthSlice.actions.setAuth(data));
        } catch (err) {
          console.warn(err);
          // Handle login error (e.g., dispatch authSlice.actions.loginFailure)
          dispatch(AuthSlice.actions.setUnAuth());
        }
      },
      providesTags: ["auth"],
    }),
  }),
});
