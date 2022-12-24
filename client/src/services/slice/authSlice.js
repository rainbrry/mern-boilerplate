import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { authApi } from "../api/auth";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		isLoggedIn: false,
		user: null,
		token: null,
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			// if login is fulfilled, set isLoggedIn to true, set user to payload, set token to token
			authApi.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				state.isLoggedIn = true;
				state.user = payload.user;
				state.token = payload.token;
			},

			// if login is rejected, set isLoggedIn to false, set user to null, set token to null
			authApi.endpoints.login.matchRejected,
			(state, { payload }) => {
				state.isLoggedIn = false;
				state.user = null;
				state.token = null;
			},

			// if logout is fulfilled, set isLoggedIn to false, set user to null, set token to null
			authApi.endpoints.logout.matchFulfilled,
			(state, { payload }) => {
				state.isLoggedIn = false;
				state.user = null;
				state.token = null;
			},

			// if getAuth is fulfilled, set isLoggedIn to true, set user to payload, set token to token
			authApi.endpoints.getAuth.matchFulfilled,
			(state, { payload }) => {
				state.isLoggedIn = true;
				state.user = payload.user;
				state.token = payload.token;
			},

			// if getAuth is rejected, set isLoggedIn to false, set user to null, set token to null
			authApi.endpoints.getAuth.matchRejected,
			(state, { payload }) => {
				state.isLoggedIn = false;
				state.user = null;
				state.token = null;
			},

			// if refreshtoken is fulfilled, set isLoggedIn to true, set user to payload, set token to token
			authApi.endpoints.refreshtoken.matchFulfilled,
			(state, { payload }) => {
				state.isLoggedIn = true;
				state.user = payload.user;
				state.token = payload.token;
			},

			// if refreshtoken is rejected, set isLoggedIn to false, set user to null, set token to null
			authApi.endpoints.refreshtoken.matchRejected,
			(state, { payload }) => {
				state.isLoggedIn = false;
				state.user = null;
				state.token = null;
			}
		);
	},
});

export default authSlice.reducer;
