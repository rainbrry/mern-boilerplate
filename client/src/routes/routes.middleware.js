import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useLogoutMutation } from "../services/api/auth";

export const PrivateRoutes = ({ children }) => {
	const { auth } = useSelector((state) => state);
	return auth.isLoggedIn && auth.token ? children : <Navigate to="/login" />;
};

export const PublicRoutes = ({ children }) => {
	const { auth } = useSelector((state) => state);
	return auth.isLoggedIn && auth.token ? <Navigate to="/" /> : children;
};
