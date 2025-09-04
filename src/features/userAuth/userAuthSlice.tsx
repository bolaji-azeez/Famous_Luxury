import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userAuthApi } from "@/features/userAuth/userApi";
import type { RootState } from "../../app/store/store";
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";
export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
}
export interface AuthSuccessResponse {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  token: string;
}
export interface APIError {
  message: string;
  statusCode?: number;
}
export interface UserAuthState {
  user: User | null;
  token: string | null;
  status: RequestStatus;
  error: string | null;
  signupStatus: RequestStatus;
  signupError: string | null;
}
const initialState: UserAuthState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
  signupStatus: "idle",
  signupError: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearSignupError(state) {
      state.signupError = null;
      state.signupStatus = "idle";
    },
    clearLoginError(state) {
      state.error = null;
      state.status = "idle";
    },
    setUserFromPersistence(
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = "succeeded";
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      state.signupStatus = "idle";
      state.signupError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userAuthApi.endpoints.signupUser.matchPending, (state) => {
        state.signupStatus = "loading";
        state.signupError = null;
      })
      .addMatcher(
        userAuthApi.endpoints.signupUser.matchFulfilled,
        (state, { payload }) => {
          const res = payload as AuthSuccessResponse;
          state.signupStatus = "succeeded";
          state.user = {
            id: res._id,
            fullName: res.fullName,
            email: res.email,
            phoneNumber: res.phoneNumber,
          };
          state.token = res.token;
        }
      )
      .addMatcher(
        userAuthApi.endpoints.signupUser.matchRejected,
        (state, { payload }) => {
          const err = payload as APIError | undefined;
          state.signupStatus = "failed";
          state.signupError =
            err?.message ?? "Signup failed. Please try again.";
        }
      );
    builder
      .addMatcher(userAuthApi.endpoints.loginUser.matchPending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addMatcher(
        userAuthApi.endpoints.loginUser.matchFulfilled,
        (state, { payload }) => {
          const res = payload as AuthSuccessResponse;
          state.status = "succeeded";
          state.user = {
            id: res._id,
            fullName: res.fullName,
            email: res.email,
            phoneNumber: res.phoneNumber,
          };
          state.token = res.token;
        }
      )
      .addMatcher(
        userAuthApi.endpoints.loginUser.matchRejected,
        (state, { payload }) => {
          const err = payload as APIError | undefined;
          state.status = "failed";
          state.error =
            err?.message ?? "Login failed. Please check your credentials.";
        }
      );
  },
});
export const {
  clearSignupError,
  clearLoginError,
  logout,
  setUserFromPersistence,
} = userSlice.actions;
export const selectUser = (state: RootState) => state.userAuth.user;
export const selectToken = (state: RootState) => state.userAuth.token;
export const selectLoginStatus = (state: RootState) => state.userAuth.status;
export const selectLoginError = (state: RootState) => state.userAuth.error;
export const selectSignupStatus = (state: RootState) =>
  state.userAuth.signupStatus;
export const selectSignupError = (state: RootState) =>
  state.userAuth.signupError;
export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.userAuth.token);
export default userSlice.reducer;
