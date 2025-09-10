// src/app/providers.tsx
"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/app/store/store"; // ensure this path is correct
import { CartProvider } from "../app/components/context/cardContext"; // <-- add this

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </CartProvider>
  );
}
