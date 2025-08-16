// src/app/store/store.ts

import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default storage is localStorage

/


// RTK Query API Slices/Reducers
// Ensure these paths are correct for where you've defined your RTK Query APIs

import { userApi } from "@/features/users/userApi"; // Could be for admin users list, etc.

// --- Persist Configurations ---

// Configuration for persisting Admin Auth State
const adminPersistConfig = {
  key: "adminAuthRoot", // Unique key for admin persistence in localStorage
  version: 1,
  storage, 
  whitelist: ["adminAuth"], 
};

const persistedAdminReducer = persistReducer(adminPersistConfig, adminAuthReducer);

// Configuration for persisting User Auth State
const userPersistConfig = {
  key: "userAuthRoot", // Unique key for user persistence
  version: 1,
  storage,
  // Whitelist the userAuth slice. Ensure the key matches the store configuration.
  whitelist: ["userAuth"], // Persist the entire userAuth slice
};
// Apply the persist config to the user reducer
const persistedUserAuthReducer = persistReducer(userPersistConfig, userAuthReducer);

// --- Root Reducer Configuration ---
export const rootReducer = {

  adminAuth: persistedAdminReducer,


  userAuth: persistedUserAuthReducer,

 
  [userApi.reducerPath]: userApi.reducer,
 
};

// --- Store Configuration ---
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // These actions are needed for redux-persist to work correctly
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
    // Add RTK Query API middleware
    .concat(productApi.middleware)
    .concat(brandApi.middleware)
    .concat(userApi.middleware)
    .concat(orderApi.middleware)
    .concat(notificationApi.middleware),
});

// --- Types for TypeScript ---
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// --- Persistor ---
// Persistor is needed to wrap your store with PersistGate in _app.tsx or layout.tsx
export const persistor = persistStore(store);