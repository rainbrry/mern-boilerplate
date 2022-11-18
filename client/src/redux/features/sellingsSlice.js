import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";
import axios from "../../helpers/axios";

export const getSellings = createAsyncThunk(
	"sellings/getSellings",
	async () => {
		const response = await axios.get("sellings");
		return response.data.data;
	}
);

export const showSellings = createAsyncThunk(
	"sellings/showSellings",
	async (id) => {
		const response = await axios.get(`selling/${id}`);
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

export const returnSelling = createAsyncThunk(
	"sellings/returnSelling",
	async (id) => {
		const response = await axios.put(`selling/return/${id}`);
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
		[getSellings.fulfilled]: sellingEntity.setAll,
		[showSellings.fulfilled]: sellingEntity.setOne,
		[addSelling.fulfilled]: sellingEntity.addOne,
		[updateSelling.fulfilled]: sellingEntity.upsertOne,
		[deleteSelling.fulfilled]: sellingEntity.removeOne,
		[returnSelling.fulfilled]: sellingEntity.upsertOne,
	},
});

export const sellingsSelector = sellingEntity.getSelectors(
	(state) => state.sellings
);
export default sellingSlice.reducer;
