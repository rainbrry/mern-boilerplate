import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const productsApi = createApi({
	reducerPath: "productsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
	tagTypes: ["Products"],
	endpoints: (builder) => ({
		// GET /products all products
		getProducts: builder.query({
			query: () => "/products",
			providesTags: ["Products"],
		}),

		// GET /products/:id show product
		showProduct: builder.query({
			query: (id) => `/product/${id}`,
		}),

		// POST /product create product
		createProduct: builder.mutation({
			query: (body) => ({
				url: "/product",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Products"],
		}),

		// PUT /product/:id update product
		updateProduct: builder.mutation({
			query: (body) => ({
				url: `/product/${body.id}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["Products"],
		}),

		// DELETE /product/:id delete product
		deleteProduct: builder.mutation({
			query: (id) => ({
				url: `/product/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Products"],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useShowProductQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
} = productsApi;
