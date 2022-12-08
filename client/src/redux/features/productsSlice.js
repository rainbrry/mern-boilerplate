import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "../../helpers/axios";
import toast from "react-hot-toast";

export const searchProducts = createAsyncThunk(
	"products/searchProducts",
	async (query) => {
		const response = await axios.get(`search-product?query=${query}`);
		return response.data.data;
	}
);

export const getProducts = createAsyncThunk(
	"products/getProducts",
	async () => {
		const response = await axios.get("products");
		return response.data.data.docs;
	}
);

export const showProduct = createAsyncThunk(
	"products/getProduct",
	async (id) => {
		const response = await axios.get(`product/${id}`);
		return response.data.data;
	}
);

export const addProduct = createAsyncThunk(
	"products/addProduct",
	async (data) => {
		const response = await axios.post("product", data);
		return response.data.data;
	}
);

export const updateProduct = createAsyncThunk(
	"products/updateProduct",
	async (data) => {
		const response = await axios.put(`product/${data.id}`, data);
		return response.data.data;
	}
);

export const deleteProduct = createAsyncThunk(
	"products/deleteProduct",
	async (id) => {
		await axios.delete(`product/${id}`);
		return id;
	}
);

const productEntity = createEntityAdapter({
	selectId: (product) => product._id,
});

const productsSlice = createSlice({
	name: "products",
	initialState: productEntity.getInitialState(),
	extraReducers: {
		[searchProducts.fulfilled]: (state, action) => {
			productEntity.setAll(state, action.payload);
			if (action.payload.length === 0) toast.error("Produk tidak ditemukan");
		},

		[getProducts.fulfilled]: (state, action) => {
			productEntity.setAll(state, action.payload);
		},

		[showProduct.fulfilled]: (state, action) => {
			productEntity.setOne(state, action.payload);
		},
		[showProduct.rejected]: (state, action) => {
			toast.error(action.error.message);
		},

		[addProduct.fulfilled]: (state, action) => {
			productEntity.addOne(state, action.payload);
			toast.success("Product created successfully");
		},

		[updateProduct.fulfilled]: (state, action) => {
			productEntity.updateOne(state, {
				id: action.payload._id,
				changes: action.payload,
			});
			toast.success("Product updated successfully");
		},

		[deleteProduct.fulfilled]: (state, action) => {
			productEntity.removeOne(state, action.payload);
			toast.success("Product deleted successfully");
		},
	},
});

export const productsSelector = productEntity.getSelectors(
	(state) => state.products
);
export default productsSlice.reducer;
