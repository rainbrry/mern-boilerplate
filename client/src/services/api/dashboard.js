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
			providesTags: (result) => [{ type: "Dashboard", id: "LIST" }],

			// if the result is undefined, it means that the request failed
			// so we don't want to cache the result
			keepUnusedDataFor: 0,
		}),
	}),
});

export const { useGetDashboardQuery } = dashboardApi;
