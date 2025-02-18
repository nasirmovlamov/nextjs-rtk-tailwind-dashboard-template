import { GenericResponse } from '../interfaces/response/response';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../hooks';
import { ENDPOINTS } from '@/app/consts/endpoints/endpoints';
import { GenericPaginationResponse } from '../interfaces/response/response';
import toast from 'react-hot-toast';
import { IProduct } from '../interfaces/general/product';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: axiosBaseQuery({ baseUrl: ENDPOINTS.API }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<GenericPaginationResponse<IProduct[]>, number>({
      query: (page: number) => {
        const urlParams = new URLSearchParams();
        urlParams.append('page', page ? String(page) : '1');
        return {
          url: 'resource',
          method: 'GET',
          params: urlParams,
        };
      },
      providesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    getProduct: builder.query<GenericResponse<IProduct>, string>({
      query: (id) => ({
        url: `resource/${id}`,
        method: 'GET',
      }),
    }),
    createProduct: builder.mutation<GenericResponse<IProduct>, Omit<IProduct, 'id' | 'groupName'>>({
      query: (data) => ({
        url: 'resource',
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
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    updateProduct: builder.mutation<IProduct, Omit<IProduct, 'groupName'>>({
      query: (user) => ({
        url: `resource`,
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
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `resource/${id}`,
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
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
  }),
});
