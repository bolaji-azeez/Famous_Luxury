import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import apiClient from "../../api/api";
import type { Product } from "@/types";
import type { AxiosError } from "axios";

//  interface Product {
//   _id: string;
//   productId: number;
//   name: string;
//   brand: string;
//   description: string;
//   quantity: number;
//   price: number;
//   images: string[];
//   features: string[];
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

interface ProductState {
  items: Product[];
  selectedProduct: Product | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  selectedProduct: null,
  status: "idle",
  error: null,
};

const getErrorMessage = (e: unknown, fallback = "Request failed") => {
  const err = e as AxiosError<{ message?: string }>;
  return err?.response?.data?.message ?? err?.message ?? fallback;
};
// 🔁 Thunks

// 🔁 Thunks
type MaybeApiResponse<T> = {
  data?: T;
  products?: T;
  product?: T;
  message?: string;
};

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetchAll", async (_arg, { rejectWithValue }) => {
  try {
    const res = await apiClient.get<MaybeApiResponse<Product[]>>("/products");
    const payload = res.data.data ?? res.data.products;
    if (!payload) throw new Error("Invalid response shape");
    return payload;
  } catch (e) {
    return rejectWithValue(getErrorMessage(e, "Failed to fetch products"));
  }
});

export const fetchProductById = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>("products/fetchById", async (id, { rejectWithValue }) => {
  try {
    const res = await apiClient.get<MaybeApiResponse<Product>>(
      `/products/${id}`
    );
    const payload = res.data.data ?? res.data.product;
    if (!payload) throw new Error("Invalid response shape");
    return payload;
  } catch (e) {
    return rejectWithValue(getErrorMessage(e, "Failed to fetch product"));
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
    setSelectedProduct(state, action: PayloadAction<Product>) {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // All products
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to fetch products";
      })

      // Single product
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.selectedProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.selectedProduct = action.payload;

        // Optionally keep items fresh: upsert into items
        const idx = state.items.findIndex(p => p._id === action.payload._id);
        if (idx >= 0) state.items[idx] = action.payload;
        else state.items.push(action.payload);

        state.status = "succeeded";
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to fetch product";
      });
  },
});

export const { clearSelectedProduct, setSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;

