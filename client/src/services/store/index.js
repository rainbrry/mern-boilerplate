import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { authApi } from "../api/auth";
import { usersApi } from "../api/users";
import { productsApi } from "../api/products";
import { sellingsApi } from "../api/sellings";
import { purchasingsApi } from "../api/purchasings";
import { dashboardApi } from "../api/dashboard";
import { expensesApi } from "../api/expenses";
import { reportsApi } from "../api/reports";
import auth from "../slice/authSlice";
import chartReducer from "../slice/chartSlice";
import purchasingCartReducer from "../slice/purchasingCartSlice";
import sellingCartReducer from "../slice/sellingCartSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
} from "redux-persist";

const encryptor = encryptTransform({
	secretKey: "my-super-secret",
	onError: () => console.log("error"),
});

const persistConfig = {
	key: "auth",
	storage,
	whitelist: ["token", "isLoggedIn", "user", "role"],
	transforms: [encryptor],
	debug: false,
};

const persistedReducer = persistReducer(persistConfig, auth);

const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
		[productsApi.reducerPath]: productsApi.reducer,
		[sellingsApi.reducerPath]: sellingsApi.reducer,
		[purchasingsApi.reducerPath]: purchasingsApi.reducer,
		[dashboardApi.reducerPath]: dashboardApi.reducer,
		[expensesApi.reducerPath]: expensesApi.reducer,
		[reportsApi.reducerPath]: reportsApi.reducer,
		auth: persistedReducer,
		chart: chartReducer,
		sellingCart: sellingCartReducer,
		purchasingCart: purchasingCartReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(
			authApi.middleware,
			usersApi.middleware,
			productsApi.middleware,
			expensesApi.middleware,
			purchasingsApi.middleware,
			sellingsApi.middleware,
			dashboardApi.middleware,
			reportsApi.middleware
		),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
export default store;
