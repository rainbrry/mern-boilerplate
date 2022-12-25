import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
	reducerPath: "authApi",
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
	useRefreshtokenQuery,
	useLazyGetAuthQuery,
} = authApi;
