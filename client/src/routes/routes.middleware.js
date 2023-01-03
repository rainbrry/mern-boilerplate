import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
	const { auth } = useSelector((state) => state);
	return auth.isLoggedIn && auth.token ? children : <Navigate to="/login" />;
};

export const PublicRoutes = ({ children }) => {
	const { auth } = useSelector((state) => state);
	return auth.isLoggedIn && auth.token ? <Navigate to="/" /> : children;
};

export const AdminRoutes = ({ children }) => {
	const { auth } = useSelector((state) => state);
	return auth.role === "admin" ? children : <Navigate to="/" />;
};

export const CashierRoutes = ({ children }) => {
	const { auth } = useSelector((state) => state);
	return auth.role === "kasir" ? children : <Navigate to="/" />;
};
