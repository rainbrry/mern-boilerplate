import axios from "./axios";
import { refreshToken } from "../redux/features/authSlice";

const setupInterceptors = (store) => {
	const { dispatch } = store;

	axios.interceptors.request.use(
		(config) => {
			const { token } = store.getState().auth;
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},
		(error) => Promise.reject(error)
	);

	axios.interceptors.response.use(
		(response) => {
			return response;
		},
		async (error) => {
			const originalConfig = error.config;

			if (originalConfig.url !== "login" && error.response) {
				if (error.response.status === 405 && !originalConfig._retry) {
					originalConfig._retry = true;
					await dispatch(refreshToken());

					return axios(originalConfig);
				}
				return Promise.reject(error);
			}
			return Promise.reject(error);
		}
	);
};
export default setupInterceptors;
