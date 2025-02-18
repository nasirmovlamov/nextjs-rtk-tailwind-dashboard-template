import { GenericResponse } from '../interfaces/response/response';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../hooks';
import { ENDPOINTS } from '@/app/consts/endpoints/endpoints';
import { GenericPaginationResponse } from '../interfaces/response/response';
import toast from 'react-hot-toast';

/* this example api is boilerplate to increase speed of api creation */
// change api name to your api name
type IExample = {
  id: number;
  name: string;
}; // import your interface and assign to this type
const apiName = 'resource';

// change api name
export const exampleApi = createApi({
  reducerPath: `${apiName}Api`,
  baseQuery: axiosBaseQuery({ baseUrl: ENDPOINTS.API }),
  tagTypes: [apiName],
  endpoints: (builder) => ({
    getItems: builder.query<GenericPaginationResponse<IExample[]>, number>({
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
    getItem: builder.query<GenericResponse<IExample>, string>({
      query: (id) => ({
        url: `${apiName}/${id}`,
        method: 'GET',
      }),
    }),
    createItem: builder.mutation<GenericResponse<IExample>, Omit<IExample, 'id'>>({
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
    updateItem: builder.mutation<IExample, IExample>({
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
