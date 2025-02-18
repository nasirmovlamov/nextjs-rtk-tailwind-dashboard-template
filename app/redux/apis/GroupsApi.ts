import { GenericResponse } from './../interfaces/response/response';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../hooks';
import { ENDPOINTS } from '@/app/consts/endpoints/endpoints';
import { IGroup } from '../interfaces/general/group';
import { GenericPaginationResponse } from '../interfaces/response/response';
import toast from 'react-hot-toast';

export const groupsApi = createApi({
  reducerPath: 'groupsApi',
  baseQuery: axiosBaseQuery({ baseUrl: ENDPOINTS.API }),
  tagTypes: ['Groups'],
  endpoints: (builder) => ({
    getGroupsAll: builder.query<GenericResponse<IGroup[]>, void>({
      query: () => {
        return {
          url: 'group/all',
          method: 'GET',
        };
      },
      providesTags: [{ type: 'Groups', id: 'LIST' }],
    }),
    getGroups: builder.query<GenericPaginationResponse<IGroup[]>, number>({
      query: (page: number) => {
        const urlParams = new URLSearchParams();
        urlParams.append('page', page ? String(page) : '1');
        return {
          url: 'group',
          method: 'GET',
          params: urlParams,
        };
      },
      providesTags: [{ type: 'Groups', id: 'LIST' }],
    }),
    getGroup: builder.query<GenericResponse<IGroup>, string>({
      query: (id) => ({
        url: `group/${id}`,
        method: 'GET',
      }),
    }),
    createGroup: builder.mutation<GenericResponse<IGroup>, Omit<IGroup, 'id'>>({
      query: (data) => ({
        url: 'group',
        method: 'POST',
        data: data,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Məlumat uğurla yaradıldı!', { position: 'top-right' });
          // window.location.href = '/'
        } catch (err) {
          console.error(err);
          toast.error('Xəta baş verdi!', { position: 'top-right' });
        }
      },
      invalidatesTags: [{ type: 'Groups', id: 'LIST' }],
    }),
    updateGroup: builder.mutation<IGroup, IGroup>({
      query: (user) => ({
        url: `group`,
        method: 'PUT',
        data: user,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Məlumat uğurla yeniləndi!', { position: 'top-right' });
          // window.location.href = '/'
        } catch (err) {
          console.error(err);
          toast.error('Xəta baş verdi!', { position: 'top-right' });
        }
      },
      invalidatesTags: [{ type: 'Groups', id: 'LIST' }],
    }),
    deleteGroup: builder.mutation<void, string>({
      query: (id) => ({
        url: `group/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Məlumat uğurla silindi!', { position: 'top-right' });
          // window.location.href = '/'
        } catch (err) {
          console.error(err);
          toast.error('Xəta baş verdi!', { position: 'top-right' });
        }
      },
      invalidatesTags: [{ type: 'Groups', id: 'LIST' }],
    }),
  }),
});
