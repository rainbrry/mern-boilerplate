import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../helpers/axios";

export const login = createAsyncThunk("auth/login", async (data) => {
	const response = await axios.post("login", data);
	return response.data.data;
});

export const getAuth = createAsyncThunk("auth/getAuth", async () => {
	const response = await axios.get("get-auth");
	return response.data.data;
});

export const logout = createAsyncThunk("auth/logout", async () => {
	await axios.get("logout");
	return true;
});

export const refreshToken = createAsyncThunk("auth/refreshToken", async () => {
	const response = await axios.get("refresh-token");
	return response.data.data;
});

const authSlice = createSlice({
	name: "authUser",
	initialState: { isLogin: false, token: null, user: null },
	extraReducers: {
		[login.fulfilled]: (state, action) => {
			state.isLogin = true;
			state.token = action.payload.token;
			state.user = action.payload.user;
		},
		[getAuth.fulfilled]: (state, action) => {
			state.user = action.payload;
		},
		[getAuth.rejected]: (state, action) => {
			state.isLogin = false;
			state.token = null;
		},
		[logout.fulfilled]: (state, action) => {
			state.isLogin = false;
			state.token = null;
			state.user = null;
		},
		[refreshToken.fulfilled]: (state, action) => {
			state.token = action.payload;
		},
	},
});

export default authSlice.reducer;
