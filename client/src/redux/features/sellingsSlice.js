import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "../../helpers/axios";

export const getSellings = createAsyncThunk(
	"sellings/getSellings",
	async () => {
		const response = await axios.get("sellings");
		return response.data.data;
	}
);

export const addSelling = createAsyncThunk(
	"sellings/addSelling",
	async (data) => {
		const response = await axios.post("selling", data);
		return response.data.data;
	}
);

export const updateSelling = createAsyncThunk(
	"sellings/updateSelling",
	async (data) => {
		const response = await axios.put(`selling/${data.id}`, data);
		return response.data.data;
	}
);

export const deleteSelling = createAsyncThunk(
	"sellings/deleteSelling",
	async (id) => {
		await axios.delete(`selling/${id}`);
		return id;
	}
);

export const returnItem = createAsyncThunk(
	"sellings/returnItem",
	async (data) => {
		const response = await axios.put(`return-item/${data.id}`, data);
		return response.data.data;
	}
);

const sellingEntity = createEntityAdapter({
	selectId: (selling) => selling._id,
});

const sellingSlice = createSlice({
	name: "sellings",
	initialState: sellingEntity.getInitialState(),
	extraReducers: {
		[getSellings.fulfilled]: (state, action) => {
			sellingEntity.setAll(state, action.payload);
		},

		[addSelling.fulfilled]: (state, action) => {
			sellingEntity.addOne(state, action.payload);
			toast.success("Transaksi berhasil");
		},
		[updateSelling.fulfilled]: (state, action) => {
			sellingEntity.upsertOne(state, action.payload);
			toast.success("Transaksi berhasil diupdate");
		},

		[deleteSelling.fulfilled]: (state, action) => {
			sellingEntity.removeOne(state, action.payload);
			toast.success("Transaksi berhasil dihapus");
		},

		[returnItem.fulfilled]: (state, action) => {
			sellingEntity.upsertOne(state, action.payload);
			toast.success("Berhasil dikembalikan");
		},
	},
});

export const sellingsSelector = sellingEntity.getSelectors(
	(state) => state.sellings
);
export default sellingSlice.reducer;
