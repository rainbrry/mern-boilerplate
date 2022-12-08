import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "../../helpers/axios";
import toast from "react-hot-toast";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
	const response = await axios.get("users");
	return response.data.data.docs;
});

export const showUser = createAsyncThunk("users/getUser", async (id) => {
	const response = await axios.get(`user/${id}`);
	return response.data.data;
});

export const addUser = createAsyncThunk("users/addProduct", async (data) => {
	const response = await axios.post("user", data);
	return response.data.data;
});

export const updateUser = createAsyncThunk("users/updateUser", async (data) => {
	const response = await axios.put(`user/${data.id}`, data);
	return response.data.data;
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
	await axios.delete(`user/${id}`);
	return id;
});

const userEntity = createEntityAdapter({
	selectId: (user) => user._id,
});

const usersSlice = createSlice({
	name: "users",
	initialState: userEntity.getInitialState(),
	extraReducers: {
		[getUsers.fulfilled]: (state, action) => {
			userEntity.setAll(state, action.payload);
		},

		[showUser.fulfilled]: (state, action) => {
			userEntity.setOne(state, action.payload);
		},
		[showUser.rejected]: (state, action) => {
			toast.error(action.error.message);
		},

		[addUser.fulfilled]: (state, action) => {
			userEntity.addOne(state, action.payload);
			toast.success("Users created successfully");
		},
		[addUser.rejected]: (state, action) => {
			toast.error(action.error.message);
		},

		[updateUser.fulfilled]: (state, action) => {
			userEntity.updateOne(state, {
				id: action.payload._id,
				changes: action.payload,
			});
			toast.success("Users updated successfully");
		},
		[updateUser.rejected]: (state, action) => {
			toast.error(action.error.message);
		},

		[deleteUser.fulfilled]: (state, action) => {
			userEntity.removeOne(state, action.payload);
			toast.success("Users deleted successfully");
		},
		[deleteUser.rejected]: (state, action) => {
			toast.error(action.error.message);
		},
	},
});

export const usersSelector = userEntity.getSelectors((state) => state.users);
export default usersSlice.reducer;
