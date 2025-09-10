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
import { storage } from "@/lib/persistStorage";

import userAuthReducer from "../../features/userAuth/userAuthSlice";
import { userAuthApi } from "@/features/userAuth/userApi";
import { brandApi } from "@/features/brand/brandApi";
import { orderApi } from "@/features/order/orderApi";
import { productApi } from "@/features/products/productApi";

const userPersistConfig = {
  key: "userAuth",
  version: 1,
  storage,
  whitelist: ["userAuth", "token"],
};

const persistedUserAuthReducer = persistReducer(
  userPersistConfig,
  userAuthReducer
);

export const store = configureStore({
  reducer: {
    userAuth: persistedUserAuthReducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [productApi.reducerPath]: productApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(brandApi.middleware)
      .concat(userAuthApi.middleware)
      .concat(orderApi.middleware)
      .concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
