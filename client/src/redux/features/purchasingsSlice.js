import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";
import axios from "../../helpers/axios";
import { toast } from "react-hot-toast";

export const getPurchasings = createAsyncThunk(
	"purchasings/getPurchasings",
	async () => {
		const response = await axios.get("purchasings");
		return response.data.data;
	}
);

export const addPurchasing = createAsyncThunk(
	"purchasings/addPurchasing",
	async (data) => {
		const response = await axios.post("purchasing", data);
		return response.data.data;
	}
);

export const updatePurchasing = createAsyncThunk(
	"purchasings/updatePurchasing",
	async (data) => {
		const response = await axios.put(`purchasing/${data.id}`, data);
		return response.data.data;
	}
);

export const deletePurchasing = createAsyncThunk(
	"purchasings/deletePurchasing",
	async (id) => {
		await axios.delete(`purchasing/${id}`);
		return id;
	}
);

const purchasingEntity = createEntityAdapter({
	selectId: (purchasing) => purchasing._id,
});

const purchasingsSlice = createSlice({
	name: "purchasings",
	initialState: purchasingEntity.getInitialState(),
	extraReducers: {
		[getPurchasings.fulfilled]: (state, action) => {
			purchasingEntity.setAll(state, action.payload);
		},

		[addPurchasing.fulfilled]: (state, action) => {
			purchasingEntity.addOne(state, action.payload);
			toast.success("Transaksi berhasil");
		},

		[updatePurchasing.fulfilled]: (state, action) => {
			purchasingEntity.upsertOne(state, action.payload);
			toast.success("Transaksi berhasil");
		},

		[deletePurchasing.fulfilled]: (state, action) => {
			purchasingEntity.removeOne(state, action.payload);
			toast.success("Transaksi berhasil dihapus");
		},
	},
});

export const purchasingsSelector = purchasingEntity.getSelectors(
	(state) => state.purchasings
);
export default purchasingsSlice.reducer;
