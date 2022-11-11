import axios from "axios";

export const axiosPUBLIC = axios.create({
	baseURL: "http://localhost:8001",
	withCredentials: true,
});

export const axiosPRIVATE = axios.create({
	baseURL: "http://localhost:8001",
	withCredentials: true,
});
