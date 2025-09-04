// src/store/ordersSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "@/types";

interface OrdersUIState {
  selectedOrder: Order | null;
}
const initialState: OrdersUIState = { selectedOrder: null };

const ordersSlice = createSlice({
  name: "ordersUI",
  initialState,
  reducers: {
    setSelectedOrder(state, action: PayloadAction<Order | null>) {
      state.selectedOrder = action.payload;
    },
  },
});

export const { setSelectedOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
