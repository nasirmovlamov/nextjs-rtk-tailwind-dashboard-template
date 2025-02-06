"use client";
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../hooks";
import { ENDPOINTS } from "@/app/consts/endpoints/endpoints";
import {
  GenericPaginationResponse,
  GenericResponse,
} from "../interfaces/response/response";
import toast from "react-hot-toast";
import { IBrigade, ICreateBrigade, IUpdateBrigade } from "../interfaces/general/brigade";

export const brigadesApi = createApi({
  reducerPath: "brigadesApi",
  baseQuery: axiosBaseQuery({ baseUrl: ENDPOINTS.API }),
  tagTypes: ["Brigades"],
  endpoints: (builder) => ({
    getBrigades: builder.query<GenericPaginationResponse<IBrigade[]>, void>({
      query: (params) => ({
        url: "unit",
        method: "GET",
        params: params,
      }),
      providesTags: [{ type: "Brigades", id: "LIST" }],
    }),
    getBrigade: builder.query<GenericResponse<IBrigade>, string>({
      query: (id) => ({
        url: `unit/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "Brigades", id: arg }],
    }),
    createBrigades: builder.mutation<
      GenericPaginationResponse<IBrigade[]>,
      ICreateBrigade
    >({
      query: (corp) => ({
        url: "unit",
        method: "POST",
        data: corp,
      }),
      invalidatesTags: [{ type: "Brigades", id: "LIST" }],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Məlumat uğurla yaradıldı!", { position: "top-right" });
          // window.location.href = '/'
        } catch (err) {
          console.error(err);
          toast.error("Xəta baş verdi!", { position: "top-right" });
        }
      },
    }),
    updateBrigades: builder.mutation<
      GenericPaginationResponse<IBrigade[]>,
      IUpdateBrigade
    >({
      query: (corp) => ({
        url: `unit`,
        method: "PUT",
        data: corp,
      }),
      invalidatesTags: [{ type: "Brigades", id: "LIST" }],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Məlumat uğurla yeniləndi!", { position: "top-right" });
          // window.location.href = '/'
        } catch (err) {
          console.error(err);
          toast.error("Xəta baş verdi!", { position: "top-right" });
        }
      },
    }),
    deleteBrigades: builder.mutation<void, string>({
      query: (id) => ({
        url: `/unit/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Brigades", id: "LIST" }],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Məlumat uğurla silindi!", { position: "top-right" });
          // window.location.href = '/'
        } catch (err) {
          console.error(err);
          toast.error("Xəta baş verdi!", { position: "top-right" });
        }
      },
    }),
  }),
});
