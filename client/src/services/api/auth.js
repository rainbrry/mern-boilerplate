import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: customFetchBase,
	tagTypes: ["Auth"],
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (body) => ({
				url: "/login",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Auth"],
		}),

		logout: builder.mutation({
			query: () => ({
				url: "/logout",
				method: "POST",
			}),
		}),

		refreshtoken: builder.query({
			query: () => "/refresh-token",
		}),
	}),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
