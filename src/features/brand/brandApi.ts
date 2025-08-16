// features/brand/brandApi.ts
import type { Brand } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandApi = createApi({
  baseQuery: fetchBaseQuery({
     baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().adminAuth.token; //

      console.log(token); // Adjust based on your auth state
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  reducerPath: "brandApi",
  tagTypes: ["Brand"],
  endpoints: (builder) => ({
    getBrands: builder.query<Brand[], void>({
      query: () => "/brands",
      providesTags: (result) =>
        result ? result.map(({ _id }) => ({ type: "Brand", id: _id })) : ["Brand"],
    }),

   

   
  }),
});

export const {
  useGetBrandsQuery,
} = brandApi;
