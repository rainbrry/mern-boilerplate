import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";

export const usersApi = createApi({
	reducerPath: "usersApi",
	baseQuery: customFetchBase,
	tagTypes: ["Users"],
	endpoints: (builder) => ({
		// GET /users all users
		getUsers: builder.query({
			query: () => "/users",
			providesTags: ["Users"],
		}),

		// GET /users/:id show user
		showUser: builder.query({
			query: (id) => `/users/${id}`,
		}),

		// POST /user create user
		createUser: builder.mutation({
			query: (body) => ({
				url: "/user",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Users"],
		}),

		// PUT /user/:id update user
		updateUser: builder.mutation({
			query: (body) => ({
				url: `/user/${body.id}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["Users"],
		}),

		// DELETE /user/:id delete user
		deleteUser: builder.mutation({
			query: (id) => ({
				url: `/user/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Users"],
		}),
	}),
});

export const {
	useGetUsersQuery,
	useLazyGetUsersQuery,
	useShowUserQuery,
	useLazyShowUserQuery,
	useCreateUserMutation,
	useUpdateUserMutation,
	useDeleteUserMutation,
} = usersApi;
