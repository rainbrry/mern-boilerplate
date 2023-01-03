import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";

export const reportsApi = createApi({
	reducerPath: "reportsApi",
	baseQuery: customFetchBase,
	tagTypes: ["Reports"],
	endpoints: (builder) => ({
		// GET /purchasing-reports all purchasing reports
		getPurchasingReports: builder.query({
			query: () => "/purchasing-reports",
			providesTags: ["Reports"],
		}),

		// GET /sales-reports all sales reports
		getSalesReports: builder.query({
			query: () => "/sales-reports",
			providesTags: ["Reports"],
		}),

		// GET /return-reports all return sales reports
		getReturnSalesReports: builder.query({
			query: () => "/return-reports",
			providesTags: ["Reports"],
		}),
	}),
});

export const {
	useGetPurchasingReportsQuery,
	useGetSalesReportsQuery,
	useGetReturnSalesReportsQuery,
} = reportsApi;
