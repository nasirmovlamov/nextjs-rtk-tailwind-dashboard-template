import { createApi } from '@reduxjs/toolkit/query/react';
import { AuthSlice } from '../slices/AuthSlice';
import { ENDPOINTS } from '@/app/consts/endpoints/endpoints';
import { axiosBaseQuery } from '../hooks';
import { ResponseAuth, ResponseLogin } from '../interfaces/response/auth';
import { RequestLogin } from '../interfaces/request/auth';
import { getCookie } from '@/app/utils/getCookie';
import { setCookie } from '@/app/utils/setCookie';
import { deleteCookie } from '@/app/utils/deleteCookie';
import { IAuthUser } from '../interfaces/general/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery({ baseUrl: ENDPOINTS.API }),

  tagTypes: ['auth'],
  endpoints: (builder) => ({
    login: builder.mutation<ResponseLogin, RequestLogin>({
      query: (data: RequestLogin) => ({
        url: 'auth/login',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['auth'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Update auth state (example using Redux Toolkit)
          dispatch(AuthSlice.actions.setAuth(data));
        } catch (err) {
          console.warn(err);
          // Handle login error (e.g., dispatch authSlice.actions.loginFailure)
          dispatch(AuthSlice.actions.setUnAuth());
          deleteCookie('accessToken');
          deleteCookie('refreshToken');
          deleteCookie('user');
        }
      },
    }),

    logout: builder.mutation<unknown, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
    }),

    refreshToken: builder.mutation<ResponseLogin, string>({
      query: (token) => ({
        url: 'auth/refresh',
        method: 'POST',
        data: {
          refreshToken: token,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // Update auth state (example using Redux Toolkit)
          dispatch(AuthSlice.actions.setAuth(data));
          // window.location.href = '/'
        } catch (err) {
          console.warn(err);
          // Handle login error (e.g., dispatch authSlice.actions.loginFailure)
          dispatch(AuthSlice.actions.setUnAuth());
        }
      },
      invalidatesTags: ['auth'],
    }),

    getUser: builder.query<ResponseAuth, void>({
      query: () => ({
        url: 'auth/verify-token',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Update auth state (example using Redux Toolkit)
          const accessToken = getCookie('accessToken');
          const refreshToken = getCookie('accessToken');
          const user: IAuthUser = data?.data;
          if (accessToken && refreshToken && user) {
            dispatch(
              AuthSlice.actions.setAuth({
                data: {
                  accessToken: accessToken,
                  refreshToken: refreshToken,
                  user: user,
                },
              }),
            );
            setCookie('user', JSON.stringify(data.data), 1);
          }
        } catch (err) {
          window.location.href = '/401';
          console.log(err);
          // redirect("/401");
          // Handle login error (e.g., dispatch authSlice.actions.loginFailure)
          // dispatch(AuthSlice.actions.setUnAuth());
        }
      },
      providesTags: ['auth'],
    }),
  }),
});
