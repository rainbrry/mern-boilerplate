import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
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
import usersReducer from "./features/usersSlice";
import authReducer from "./features/authSlice";
import productsReducer from "./features/productsSlice";

const encryptor = encryptTransform({
	secretKey: "this-is-secret-and-you-dont-know-it",
	onError: (error) => {
		console.log(error);
	},
});

const persistConfig = {
	key: "auth",
	storage,
	whitelist: ["isLogin", "token"],
	transforms: [encryptor],
	debug: false,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
	reducer: {
		auth: persistedReducer,
		users: usersReducer,
		products: productsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);
export default store;
