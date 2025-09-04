
"use client";

import { Provider } from "react-redux";
import { store } from "../app/store/store";
import { CartProvider } from "@/app/components/context/cardContext"; 
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CartProvider>{children}</CartProvider>
    </Provider>
  );
}