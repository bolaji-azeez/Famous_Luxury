import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

export interface User {
  email: string;
  fullName: string;
  Password: string;
  phoneNumber: number;
}

export interface UserAuthState {
  user: User | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  signupStatus: "idle" | "loading" | "succeeded" | "failed";
  signupError: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  fullName?: string;
  phoneNumber?: number;
}
// Optional name for si

export const userLogin = createAsyncThunk(
  "user/Login",
  async (credentails: LoginCredentials, { rejectWithValue }) => {
    try {
      const data = await login(credentials);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);


export const signupUser = createAsyncThunk(
    "user/Signup",
    async
)
