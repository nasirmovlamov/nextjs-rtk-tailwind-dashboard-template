"use client";
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../hooks";
import { ENDPOINTS } from "@/app/consts/endpoints/endpoints";
import { ICorp } from "../interfaces/general/corps";
import { GenericResponse } from "../interfaces/response/response";
import toast from "react-hot-toast";

export const corpsApi = createApi({
  reducerPath: "corpsApi",
  baseQuery: axiosBaseQuery({ baseUrl: ENDPOINTS.API }),
  tagTypes: ["Corps"],
  endpoints: (builder) => ({
    getCorps: builder.query<GenericResponse<ICorp[]>, void>({
      query: () => ({
        url: "unit/union",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result?.data?.map(({ id }) => ({
                type: "Corps" as const,
                id,
              })),
              { type: "Corps", id: "LIST" },
            ]
          : [{ type: "Corps", id: "LIST" }],
    }),
    getCorp: builder.query<GenericResponse<ICorp>, string>({
      query: (id) => ({
        url: `unit/union/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "Corps", id: arg }],
    }),
    createCorps: builder.mutation<GenericResponse<ICorp[]>, Omit<ICorp, "id">>({
      query: (corp) => ({
        url: "unit/union",
        method: "POST",
        data: corp,
      }),
      invalidatesTags: [{ type: "Corps", id: "LIST" }],
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
    updateCorps: builder.mutation<GenericResponse<ICorp[]>, ICorp>({
      query: (corp) => ({
        url: `unit/union`,
        method: "PUT",
        data: corp,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Corps", id: arg.id }],
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
    deleteCorps: builder.mutation<void, string>({
      query: (id) => ({
        url: `/unit/union/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Corps", id: arg }],
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
