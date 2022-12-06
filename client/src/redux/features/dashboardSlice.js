import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../helpers/axios";

export const getDashboard = createAsyncThunk(
	"dashboard/getDashboard",
	async () => {
		const response = await axios.get("dashboard");
		return response.data.data;
	}
);

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState: {
		revenue: 0,
		sales: 0,
		expenses: 0,
		chart: [],
	},
	extraReducers: {
		[getDashboard.fulfilled]: (state, action) => {
			state.revenue = action.payload.todaysRevenue;
			state.sales = action.payload.todaysSales;
			state.expenses = action.payload.todaysExpenses;
			state.chart = action.payload.chart;
		},
	},
});

export default dashboardSlice.reducer;
