import { createApi } from "@reduxjs/toolkit/dist/query/react";
import customFetchBase from "./customFetchBase";

export const sellingsApi = createApi({
	reducerPath: "sellingsApi",
	baseQuery: customFetchBase,
	tagTypes: ["Sellings"],
	endpoints: (builder) => ({
		// GET /sellings all sellings
		getSellings: builder.query({
			query: () => "/sellings",
			providesTags: ["Sellings"],
		}),

		// GET /sellings/:id show selling
		showSelling: builder.query({
			query: (id) => `/sellings/${id}`,
		}),

		// POST /selling create selling
		createSelling: builder.mutation({
			query: (body) => ({
				url: "/selling",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Sellings"],
		}),

		// PUT /selling/:id update selling
		returnItem: builder.mutation({
			query: (body) => ({
				url: `/selling/${body.id}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["Sellings"],
		}),

		// DELETE /selling/:id delete selling
		deleteSelling: builder.mutation({
			query: (id) => ({
				url: `/selling/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Sellings"],
		}),
	}),
});

export const {
	useGetSellingsQuery,
	useShowSellingQuery,
	useCreateSellingMutation,
	useReturnItemMutation,
	useDeleteSellingMutation,
} = sellingsApi;
