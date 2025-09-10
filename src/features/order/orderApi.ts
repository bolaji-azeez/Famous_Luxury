import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Order } from "@/types";

export type CreateOrderInput = Omit<
  Order,
  "_id" | "id" | "__v" | "createdAt" | "updatedAt"
>;
type MaybeId = { _id?: string; id?: string };
const getOrderId = (o: Order): string | undefined => {
  const x = o as unknown as MaybeId;
  return x._id ?? x.id;
};


export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://e-backend-kwxx.onrender.com/api",
  }),
  tagTypes: ["Order"],
 
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => ({ url: "/orders" }),
      providesTags: (result) =>
        result
          ? [
              { type: "Order", id: "LIST" },
              ...result.map((o) => ({
                type: "Order" as const,
                id: getOrderId(o),
              })),
            ]
          : [{ type: "Order", id: "LIST" }],
    }),

    createOrder: builder.mutation<Order, CreateOrderInput>({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: [{ type: "Order", id: "LIST" }],
    }),
  }),
});

export const { useGetOrdersQuery, useCreateOrderMutation } = orderApi;
