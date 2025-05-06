import { ENDPOINTS } from '@/app/consts/endpoints/endpoints';
import { GenericPaginationResponse } from '../interfaces/response/response';
import { GenericResponse } from '../interfaces/response/response';
import { IProduct } from '../interfaces/general/product';
import { axiosBaseQuery } from '../hooks';
import { createApi } from '@reduxjs/toolkit/query/react';
import toast from 'react-hot-toast';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: axiosBaseQuery({ baseUrl: ENDPOINTS.API }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<
      GenericPaginationResponse<IProduct[]>,
      {
        page: number;
        filter?: {
          name?: string;
          groupName?: string;
          resourceSize?: string;
          order?: string;
        };
      }
    >({
      query: (params) => {
        const urlParams = new URLSearchParams();
        if (params.page) {
          urlParams.append('page', params.page ? String(params.page) : '1');
        }
        if (params.filter) {
          if (params.filter.name) {
            urlParams.append('name', params.filter.name);
          }
          if (params.filter.order) {
            urlParams.append('sort', params.filter.order);
          }
          if (params.filter.groupName) {
            urlParams.append('groupName', params.filter.groupName);
          }
          if (params.filter.resourceSize) {
            urlParams.append('resourceSize', params.filter.resourceSize);
          }
          if (params.filter.order) {
          }
        }

        return {
          url: 'resource',
          method: 'GET',
          params: urlParams,
        };
      },
      providesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    searchProductsWithUnitId: builder.query<
      GenericResponse<IProduct[]>,
      {
        searchTerm: string;
        unitId: number;
      }
    >({
      query: ({ searchTerm, unitId }) => {
        const urlParams = new URLSearchParams();
        if (searchTerm) {
          urlParams.append('name', String(searchTerm));
        }

        return {
          url: `resource/left/unit/${unitId}`,
          method: 'GET',
          params: urlParams,
        };
      },
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
