import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../views/layouts/MainLayout";
import Login from "../views/pages/auth/Login";
import Dashboard from "../views/pages/dashboard";
import Users from "../views/pages/users";
import Products from "../views/pages/products";
import Purchasings from "../views/pages/purchasings";
import AddPurchasing from "../views/pages/purchasings/create";

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />

				<Route path="/" element={<MainLayout />}>
					<Route path="/" exact={"true"} element={<Dashboard />} />
					<Route path="/users" element={<Users />} />
					<Route path="/products" element={<Products />} />
					<Route path="/purchasings" element={<Purchasings />} />
					<Route path="/new-purchasing" element={<AddPurchasing />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
