import { createSlice } from "@reduxjs/toolkit";
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
			authApi.endpoints.login.matchFulfilled,
			(state, action) => {
				state.isLoggedIn = true;
				state.user = action.payload.user;
				state.token = action.payload.token;
			}
		);

		builder.addMatcher(
			authApi.endpoints.getAuth.matchFulfilled,
			(state, action) => {
				state.user = action.payload.user;
			}
		);

		builder.addMatcher(
			authApi.endpoints.logout.matchFulfilled,
			(state, action) => {
				state.isLoggedIn = false;
				state.user = null;
				state.token = null;
			}
		);

		builder.addMatcher(
			authApi.endpoints.refreshtoken.matchFulfilled,
			(state, action) => void (state.token = action.payload.token)
		);
	},
});

export default authSlice.reducer;
