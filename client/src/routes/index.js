import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../views/layouts/MainLayout";
import Login from "../views/pages/auth/Login";
import Dashboard from "../views/pages/dashboard";
import Users from "../views/pages/users";
import Products from "../views/pages/products";
import Purchasings from "../views/pages/purchasings";
import AddPurchasing from "../views/pages/purchasings/create";
import { PrivateRoutes, PublicRoutes } from "./routes.middleware";

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/login"
					element={
						<PublicRoutes>
							<Login />
						</PublicRoutes>
					}
				/>

				<Route path="/" element={<MainLayout />}>
					<Route
						path="/"
						exact={"true"}
						element={
							<PrivateRoutes>
								<Dashboard />
							</PrivateRoutes>
						}
					/>
					<Route
						path="/users"
						element={
							<PrivateRoutes>
								<Users />
							</PrivateRoutes>
						}
					/>
					<Route
						path="/products"
						element={
							<PrivateRoutes>
								<Products />
							</PrivateRoutes>
						}
					/>
					<Route
						path="/purchasings"
						element={
							<PrivateRoutes>
								<Purchasings />
							</PrivateRoutes>
						}
					/>
					<Route
						path="/new-purchasing"
						element={
							<PrivateRoutes>
								<AddPurchasing />
							</PrivateRoutes>
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
