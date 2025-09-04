import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Brand, BrandWithProductsResponse } from "@/types";

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://e-backend-kwxx.onrender.com/api",
  }),

  tagTypes: ["Brand", "Product"],
  endpoints: (builder) => ({
    getBrands: builder.query<Brand[], void>({
      query: () => "/brands",
      providesTags: (result) =>
        result
          ? [
              { type: "Brand", id: "LIST" },
              ...result.map((b) => ({ type: "Brand" as const, id: b._id })),
            ]
          : [{ type: "Brand", id: "LIST" }],
    }),
    getBrandDetailsAndProducts: builder.query<
      BrandWithProductsResponse,
      string
    >({
      query: (slug) => `/brands/${slug}/products`,
      providesTags: (result, _err, slug) =>
        result
          ? [
              { type: "Brand", id: slug },
              ...(result.products ?? []).map((p) => ({
                type: "Product" as const,
                id: p._id,
              })),
            ]
          : [{ type: "Brand", id: slug }],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useGetBrandDetailsAndProductsQuery,
  useLazyGetBrandDetailsAndProductsQuery,
} = brandApi;
