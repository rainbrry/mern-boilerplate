import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000/api",
		credentials: "include",
	}),
	tagTypes: ["Auth"],
	prepareHeaders: (headers, store) => {
		const token = store.getState().auth.token;
		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}
		return headers;
	},
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (body) => ({
				url: "/login",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Auth"],
		}),

		logout: builder.query({
			query: () => "/logout",
		}),

		getAuth: builder.query({
			query: () => "/get-auth",
			providesTags: ["Auth"],
		}),

		refreshtoken: builder.query({
			query: () => "/refreshtoken",
		}),
	}),
});

export const {
	useLoginMutation,
	useLogoutMutation,
	useGetAuthQuery,
	useLazyRefreshtokenQuery,
} = authApi;
