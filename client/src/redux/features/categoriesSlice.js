import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "../../helpers/axios";
import toast from "react-hot-toast";

export const searchCategory = createAsyncThunk(
	"categories/searchCategory",
	async (keyword) => {
		const response = await axios.post("categories/search", keyword);
		return response.data.data;
	}
);

export const getCategories = createAsyncThunk(
	"categories/getCategories",
	async () => {
		const response = await axios.get("categories");
		return response.data.data;
	}
);

export const showCategory = createAsyncThunk(
	"categories/getCategory",
	async (id) => {
		const response = await axios.get(`category/${id}`);
		return response.data.data;
	}
);

export const addCategory = createAsyncThunk(
	"categories/addCategory",
	async (data) => {
		const response = await axios.post("category", data);
		return response.data.data;
	}
);

export const updateCategory = createAsyncThunk(
	"categories/updateCategory",
	async (data) => {
		const response = await axios.put(`category/${data.id}`, data);
		return response.data.data;
	}
);

export const deleteCategory = createAsyncThunk(
	"categories/deleteCategory",
	async (id) => {
		await axios.delete(`category/${id}`);
		return id;
	}
);

const categoryEntity = createEntityAdapter({
	selectId: (category) => category._id,
});

const categoriesSlice = createSlice({
	name: "categories",
	initialState: categoryEntity.getInitialState(),
	extraReducers: {
		[searchCategory.fulfilled]: (state, action) => {
			categoryEntity.setAll(state, action.payload);
		},

		[getCategories.fulfilled]: (state, action) => {
			categoryEntity.setAll(state, action.payload);
		},

		[showCategory.fulfilled]: (state, action) => {
			categoryEntity.upsertOne(state, action.payload);
		},

		[addCategory.fulfilled]: (state, action) => {
			categoryEntity.addOne(state, action.payload);
			toast.success("Category added successfully");
		},

		[updateCategory.fulfilled]: (state, action) => {
			categoryEntity.upsertOne(state, action.payload);
			toast.success("Category updated successfully");
		},

		[deleteCategory.fulfilled]: (state, action) => {
			categoryEntity.removeOne(state, action.payload);
			toast.success("Category deleted successfully");
		},
	},
});

export const categoriesSelector = categoryEntity.getSelectors(
	(state) => state.categories
);
export default categoriesSlice.reducer;
