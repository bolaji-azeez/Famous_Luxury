// src/features/product/productApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Product = {
  _id: string;
  name: string;
  brand?: { _id: string; name: string };
  description?: string;
  price: number;
  images?: { url?: string; imageId?: string; _id?: string }[];
  productId?: number;
  features?: string[];
  quantity?: number;
};

type ProductResponse =
  | Product
  | { data?: Product }
  | { product?: Product };

type GetProductsArgs = {
  search?: string;
  brandId?: string | null;
  page?: number;
  limit?: number;
  sort?: string;
};

type ProductsEnvelopeFlat =
  | { data?: Product[] }
  | { products?: Product[] }
  | { items?: Product[] }
  | { docs?: Product[] };

type ProductsEnvelopeNested = {
  data?: { products?: Product[]; items?: Product[]; docs?: Product[] };
};

type ProductsResponse = Product[] | ProductsEnvelopeFlat | ProductsEnvelopeNested;

// ---------- helpers (type-safe, no `any`) ----------
type Dict = Record<string, unknown>;
const isObj = (v: unknown): v is Dict =>
  typeof v === "object" && v !== null;

const isProductArray = (v: unknown): v is Product[] =>
  Array.isArray(v);

type MaybeId = { _id?: string; id?: string };
const getId = (p: Product): string | undefined => {
  const m = p as unknown as MaybeId;
  return m._id ?? m.id;
};

const pickArray = (res: unknown): Product[] => {
  // raw array
  if (isProductArray(res)) return res;

  if (isObj(res)) {
    // flat envelopes
    if (isProductArray((res as { data?: unknown }).data)) {
      return (res as { data?: Product[] }).data!;
    }
    if (isProductArray((res as { products?: unknown }).products)) {
      return (res as { products?: Product[] }).products!;
    }
    if (isProductArray((res as { items?: unknown }).items)) {
      return (res as { items?: Product[] }).items!;
    }
    if (isProductArray((res as { docs?: unknown }).docs)) {
      return (res as { docs?: Product[] }).docs!;
    }

    // nested under data
    const data = (res as { data?: unknown }).data;
    if (isObj(data)) {
      const d = data as Dict;
      if (isProductArray(d.products)) return d.products as Product[];
      if (isProductArray(d.items)) return d.items as Product[];
      if (isProductArray(d.docs)) return d.docs as Product[];
    }
  }
  return [];
};

const pickSingle = (res: unknown): Product => {
  if (isObj(res)) {
    const data = (res as { data?: unknown }).data;
    if (isObj(res) && (res as { product?: unknown }).product) {
      return (res as { product: Product }).product;
    }
    if (data && isObj(data)) {
      return data as Product;
    }
  }
  return res as Product;
};
// ---------------------------------------------------

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://e-backend-kwxx.onrender.com/api",
  }),
  tagTypes: ["Product", "Brand"] as const,
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], GetProductsArgs | void>({
      query: (args) => {
        const qs = new URLSearchParams();
        const a = args ?? {};
        if (a.search) qs.set("search", a.search);
        if (a.brandId) qs.set("brandId", String(a.brandId));
        if (a.page) qs.set("page", String(a.page));
        if (a.limit) qs.set("limit", String(a.limit));
        if (a.sort) qs.set("sort", a.sort);
        const suffix = qs.toString() ? `?${qs.toString()}` : "";
        return `/products${suffix}`;
      },
      transformResponse: (response: ProductsResponse): Product[] =>
        pickArray(response),
      providesTags: (result) =>
        result && result.length
          ? [
              { type: "Product" as const, id: "LIST" },
              ...result.map((p) => ({
                type: "Product" as const,
                id: getId(p),
              })),
            ]
          : [{ type: "Product" as const, id: "LIST" }],
    }),

    // /products/:id
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      transformResponse: (response: ProductResponse): Product =>
        pickSingle(response),
      providesTags: (_res, _err, id) => [
        { type: "Product" as const, id },
        { type: "Product" as const, id: "LIST" },
      ],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
