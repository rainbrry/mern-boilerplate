import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const purchasingsApi = createApi({
	reducerPath: "purchasingsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
	tagTypes: ["Purchasings"],
	endpoints: (builder) => ({
		// GET /purchasings all purchasings
		getPurchasings: builder.query({
			query: () => "/purchasings",
			providesTags: ["Purchasings"],
		}),

		// GET /purchasings/:id show purchasing
		showPurchasing: builder.query({
			query: (id) => `/purchasings/${id}`,
		}),

		// POST /purchasing create purchasing
		createPurchasing: builder.mutation({
			query: (body) => ({
				url: "/purchasing",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Purchasings"],

			// PUT /purchasing/:id update purchasing
			updatePurchasing: builder.mutation({
				query: (body) => ({
					url: `/purchasing/${body.id}`,
					method: "PUT",
					body,
				}),
				invalidatesTags: ["Purchasings"],

				// DELETE /purchasing/:id delete purchasing
				deletePurchasing: builder.mutation({
					query: (id) => ({
						url: `/purchasing/${id}`,
						method: "DELETE",
					}),
					invalidatesTags: ["Purchasings"],
				}),
			}),
		}),
	}),
});

export const {
	useGetPurchasingsQuery,
	useShowPurchasingQuery,
	useCreatePurchasingMutation,
	useUpdatePurchasingMutation,
	useDeletePurchasingMutation,
} = purchasingsApi;
