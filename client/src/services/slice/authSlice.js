import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		isLoggedIn: false,
		user: null,
		role: null,
		token: null,
	},
	reducers: {
		setCredential: (state, action) => {
			state.isLoggedIn = true;
			state.user = action.payload.user;
			state.role = action.payload.role;
			state.token = action.payload.token;
		},

		logout: (state) => {
			state.user = null;
			state.role = null;
			state.token = null;
			state.isLoggedIn = false;
		},

		refreshToken: (state, action) => {
			void (state.token = action.payload.token);
		},
	},
});

export default authSlice.reducer;
export const { setCredential, logout, refreshToken } = authSlice.actions;
