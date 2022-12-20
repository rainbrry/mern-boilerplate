import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";
import axios from "../../helpers/axios";

export const getExpenses = createAsyncThunk(
	"expenses/getExpenses",
	async () => {
		const response = await axios.get("expenses");
		return response.data.data;
	}
);

export const addExpense = createAsyncThunk(
	"expenses/addExpense",
	async (data) => {
		const response = await axios.post("expense", data);
		return response.data.data;
	}
);

const expenseEntity = createEntityAdapter({
	selectId: (expense) => expense._id,
});

const expensesSlice = createSlice({
	name: "expenses",
	initialState: expenseEntity.getInitialState(),
	extraReducers: {
		[getExpenses.fulfilled]: (state, action) => {
			expenseEntity.setAll(state, action.payload);
		},

		[addExpense.fulfilled]: (state, action) => {
			expenseEntity.addOne(state, action.payload);
		},
	},
});

export const expenseSelector = expenseEntity.getSelectors(
	(state) => state.expenses
);

export default expensesSlice.reducer;
