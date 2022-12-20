import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../helpers/axios";

export const getPurchasingReports = createAsyncThunk(
	"purchasingReport/getPurchasingReport",
	async () => {
		const response = await axios.get(`/purchasing-reports`);
		return response.data.data;
	}
);

export const getSalesReports = createAsyncThunk(
	"salesReport/getSalesReport",
	async () => {
		const response = await axios.get(`/sales-reports`);
		return response.data.data;
	}
);

export const getReturnsReports = createAsyncThunk(
	"returnsReport/getReturnsReport",
	async () => {
		const response = await axios.get(`/return-reports`);
		return response.data.data;
	}
);

const reportsSlice = createSlice({
	name: "reports",
	initialState: {
		purchasingReports: [],
		salesReports: [],
		returnReports: [],
	},
	extraReducers: {
		[getPurchasingReports.fulfilled]: (state, action) => {
			state.purchasingReports = action.payload;
		},

		[getSalesReports.fulfilled]: (state, action) => {
			state.salesReports = action.payload;
		},

		[getReturnsReports.fulfilled]: (state, action) => {
			state.returnReports = action.payload;
		},
	},
});

export default reportsSlice.reducer;
