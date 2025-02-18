import { ENDPOINTS } from '@/app/consts/endpoints/endpoints';
import { GenericPaginationResponse } from '../interfaces/response/response';
import { GenericResponse } from '../interfaces/response/response';
import { axiosBaseQuery } from '../hooks';
import { createApi } from '@reduxjs/toolkit/query/react';
import toast from 'react-hot-toast';

/* this documents api is boilerplate to increase speed of api creation */
// change api name to your api name
type IDocuments = {
  id: number;
  name: string;
}; // import your interface and assign to this type
const apiName = 'document';

// change api name
export const documentsApi = createApi({
  reducerPath: `${apiName}Api`,
  baseQuery: axiosBaseQuery({ baseUrl: ENDPOINTS.API }),
  tagTypes: [apiName],
  endpoints: (builder) => ({
    getItems: builder.query<GenericPaginationResponse<IDocuments[]>, number>({
      query: (page: number) => {
        const urlParams = new URLSearchParams();
        urlParams.append('page', page ? String(page) : '1');
        return {
          url: `${apiName}`,
          method: 'GET',
          params: urlParams,
        };
      },
      providesTags: [{ type: apiName, id: 'LIST' }],
    }),
    getItem: builder.query<GenericResponse<IDocuments>, string>({
      query: (id) => ({
        url: `${apiName}/${id}`,
        method: 'GET',
      }),
    }),
    createItem: builder.mutation<GenericResponse<IDocuments>, Omit<IDocuments, 'id'>>({
      query: (data) => ({
        url: `${apiName}`,
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
      invalidatesTags: [{ type: apiName, id: 'LIST' }],
    }),
    updateItem: builder.mutation<IDocuments, IDocuments>({
      query: (user) => ({
        url: `${apiName}`,
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
      invalidatesTags: [{ type: apiName, id: 'LIST' }],
    }),
    deleteItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `${apiName}/${id}`,
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
      invalidatesTags: [{ type: apiName, id: 'LIST' }],
    }),
  }),
});
