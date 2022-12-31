import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { logout, refreshToken } from "../slice/authSlice";
import { Mutex } from "async-mutex";

const baseUrl = "http://localhost:5000/api";
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
	baseUrl,
	credentials: "include",
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		return headers;
	},
});
const customFetchBase = async (arg, api, extraOptions) => {
	await mutex.waitForUnlock();
	let result = await baseQuery(arg, api, extraOptions);

	// if unauthorized, it means cookie was deleted or expired, logout user
	if (result.error && result.error.status === 401) {
		api.dispatch(logout());
		result = await baseQuery(arg, api, extraOptions);
	}

	// if error status is 405 and the error is Invalid token, refresh the access token
	if (
		result.error &&
		result.error.status === 405 &&
		result.error.data.message === "Invalid token!"
	) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
			try {
				const refreshResult = await baseQuery(
					"refresh-token",
					api,
					extraOptions
				);
				if (refreshResult.data) {
					api.dispatch(refreshToken(refreshResult.data));
					result = await baseQuery(arg, api, extraOptions);
				} else {
					api.dispatch(logout());
				}
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await baseQuery(arg, api, extraOptions);
		}
	}

	return result;
};

export default customFetchBase;
