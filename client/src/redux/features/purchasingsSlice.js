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
		[addPurchasing.rejected]: (state, action) => {
			toast.error(action.error.message);
		},
	},
});

export const purchasingsSelector = purchasingEntity.getSelectors(
	(state) => state.purchasings
);
export default purchasingsSlice.reducer;
