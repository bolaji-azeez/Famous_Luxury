import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Brand } from "@/types";

// Define a type that includes the _id property
type BrandWithId = Brand & { _id: string };

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
              { type: "Brand" as const, id: "LIST" },
              ...result.map((b) => ({
                type: "Brand" as const,
                id: (b as BrandWithId)._id,
              })),
            ]
          : [{ type: "Brand" as const, id: "LIST" }],
    }),
  }),
});

export const { useGetBrandsQuery } = brandApi;