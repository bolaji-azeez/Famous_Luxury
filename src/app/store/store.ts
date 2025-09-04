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
import storage from "redux-persist/lib/storage";

import userAuthReducer from "../../features/userAuth/userAuthSlice";
import { userAuthApi } from "@/features/userAuth/userApi";
import { brandApi } from "@/features/brand/brandApi";
import { orderApi } from "@/features/order/orderApi";

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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(brandApi.middleware)
      .concat(userAuthApi.middleware)
      .concat(orderApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
