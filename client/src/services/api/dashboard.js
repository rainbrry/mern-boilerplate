import { createApi } from "@reduxjs/toolkit/dist/query/react";
import customFetchBase from "./customFetchBase";

export const dashboardApi = createApi({
	reducerPath: "dashboardApi",
	baseQuery: customFetchBase,
	tagTypes: ["Dashboard"],
	endpoints: (builder) => ({
		// GET /dashboard => Dashboard
		getDashboard: builder.query({
			query: () => "/dashboard",
			providesTags: ["Dashboard"],
			keepUnusedDataFor: 0,
		}),
	}),
});

export const { useGetDashboardQuery } = dashboardApi;
