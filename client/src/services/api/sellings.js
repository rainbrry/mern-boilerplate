import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const sellingsApi = createApi({
	reducerPath: "sellingsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000/api",
		credentials: "include",
		prepareHeaders: (headers, { getState }) => {
			const token = getState().auth.token;
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
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
