import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "../../helpers/axios";
import toast from "react-hot-toast";

export const searchSuppliers = createAsyncThunk(
	"suppliers/searchSuppliers",
	async (keyword) => {
		const response = await axios.post("suppliers/search", keyword);
		return response.data.data;
	}
);

export const getSuppliers = createAsyncThunk(
	"suppliers/getSuppliers",
	async () => {
		const response = await axios.get("suppliers");
		return response.data.data;
	}
);

export const showSupplier = createAsyncThunk(
	"suppliers/getSupplier",
	async (id) => {
		const response = await axios.get(`supplier/${id}`);
		return response.data.data;
	}
);

export const addSupplier = createAsyncThunk(
	"suppliers/addSupplier",
	async (data) => {
		const response = await axios.post("supplier", data);
		return response.data.data;
	}
);

export const updateSupplier = createAsyncThunk(
	"suppliers/updateSupplier",
	async (data) => {
		const response = await axios.put(`supplier/${data.id}`, data);
		return response.data.data;
	}
);

export const deleteSupplier = createAsyncThunk(
	"suppliers/deleteSupplier",
	async (id) => {
		await axios.delete(`supplier/${id}`);
		return id;
	}
);

const supplierEntity = createEntityAdapter({
	selectId: (supplier) => supplier._id,
});

const suppliersSlice = createSlice({
	name: "suppliers",
	initialState: supplierEntity.getInitialState({
		search: [],
	}),
	reducers: {},
	extraReducers: {
		[searchSuppliers.fulfilled]: (state, action) => {
			state.search = action.payload;
		},

		[getSuppliers.fulfilled]: (state, action) => {
			supplierEntity.setAll(state, action.payload);
		},

		[showSupplier.fulfilled]: (state, action) => {
			supplierEntity.upsertOne(state, action.payload);
		},

		[addSupplier.fulfilled]: (state, action) => {
			supplierEntity.addOne(state, action.payload);
			toast.success("Supplier added successfully");
		},

		[updateSupplier.fulfilled]: (state, action) => {
			supplierEntity.upsertOne(state, {
				id: action.payload._id,
				changes: action.payload,
			});
			toast.success("Supplier updated successfully");
		},

		[deleteSupplier.fulfilled]: (state, action) => {
			supplierEntity.removeOne(state, action.payload);
			toast.success("Supplier deleted successfully");
		},
	},
});

export const suppliersSelector = supplierEntity.getSelectors(
	(state) => state.suppliers
);
export default suppliersSlice.reducer;
