import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  SignupCredentials,
  LoginCredentials,
  AuthSuccessResponse,
  APIError,
} from "../../types/index";

export const userAuthApi = createApi({
  reducerPath: "userAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://e-backend-kwxx.onrender.com/api",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    signupUser: builder.mutation<AuthSuccessResponse, SignupCredentials>({
      query: (credentials) => ({
        url: "/auth/user/register",
        method: "POST",
        body: credentials,
      }),

      transformErrorResponse: (error: any): APIError => {
        return {
          message:
            error.data?.message ||
            "An unexpected error occurred during signup.",
          statusCode: error.status,
        };
      },
      invalidatesTags: ["User"],
    }),

    loginUser: builder.mutation<AuthSuccessResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/user/login",
        method: "POST",
        body: credentials,
      }),

      transformErrorResponse: (error: any): APIError => {
        return {
          message:
            error.data?.message ||
            "Login failed. Please check your credentials.",
          statusCode: error.status,
        };
      },
    }),
  }),
});

export const { useSignupUserMutation, useLoginUserMutation } = userAuthApi;
