import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";

export const expensesApi = createApi({
	reducerPath: "expensesApi",
	baseQuery: customFetchBase,
	tagTypes: ["Expenses"],
	endpoints: (builder) => ({
		// GET /expenses all expenses
		getExpenses: builder.query({
			query: () => "/expenses",
			providesTags: ["Expenses"],
		}),

		// GET /expenses/:id show expense
		showExpense: builder.query({
			query: (id) => `/expenses/${id}`,
			providesTags: ["Expenses"],
		}),

		// POST /expense create expense
		createExpense: builder.mutation({
			query: (body) => ({
				url: "/expense",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Expenses"],
		}),

		// PUT /expense/:id update expense
		updateExpense: builder.mutation({
			query: (body) => ({
				url: `/expense/${body.id}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["Expenses"],
		}),

		// DELETE /expense/:id delete expense
		deleteExpense: builder.mutation({
			query: (id) => ({
				url: `/expense/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Expenses"],
		}),
	}),
});

export const {
	useGetExpensesQuery,
	useShowExpenseQuery,
	useCreateExpenseMutation,
	useUpdateExpenseMutation,
	useDeleteExpenseMutation,
} = expensesApi;
