import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type {
  SignupCredentials,
  LoginCredentials,
  AuthSuccessResponse,
  APIError,
} from "../../types/index";

type WithMessage = { message?: string };

const toApiError = (
  error: FetchBaseQueryError,
  fallback: string
): APIError => {
  const statusCode = typeof error.status === "number" ? error.status : 500;

  // error.data can be unknown; try to read a "message" if present
  const maybe = (error.data ?? {}) as WithMessage;
  const message = maybe.message ?? fallback;

  return { message, statusCode };
};

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
      transformErrorResponse: (error): APIError =>
        toApiError(
          error as FetchBaseQueryError,
          "An unexpected error occurred during signup."
        ),
      invalidatesTags: ["User"],
    }),

    loginUser: builder.mutation<AuthSuccessResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/user/login",
        method: "POST",
        body: credentials,
      }),
      transformErrorResponse: (error): APIError =>
        toApiError(
          error as FetchBaseQueryError,
          "Login failed. Please check your credentials."
        ),
    }),
  }),
});

export const { useSignupUserMutation, useLoginUserMutation } = userAuthApi;
