import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../hooks";
import { ENDPOINTS } from "@/app/consts/endpoints/endpoints";
import { IGroup } from "../interfaces/request/group";

export const groupsApi = createApi({
  reducerPath: "usersApi",
  baseQuery: axiosBaseQuery({ baseUrl: ENDPOINTS.API }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<IGroup[], void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: (result = []) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "User" as const, id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    getUser: builder.query<IGroup, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "User", id: arg }],
    }),
    createUser: builder.mutation<Omit<IGroup, 'id'>, IGroup>({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation<IGroup, IGroup>({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg }],
    }),
  }),
});
