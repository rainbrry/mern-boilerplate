import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../views/layouts/MainLayout";
import Guest from "../middlewares/Guest";
import Auth from "../middlewares/Auth";
import Login from "../views/pages/auth/Login";
import Users from "../views/pages/users";
import Products from "../views/pages/products";
import Purchasings from "../views/pages/purchasings";
import AddPurchasing from "../views/pages/purchasings/create";
import Sellings from "../views/pages/sellings";
import AddSelling from "../views/pages/sellings/create";
import Error403 from "../views/pages/error/Error403";
import Error404 from "../views/pages/error/Error404";
import Dashboard from "../views/pages/dashboard";
import EditPurchasing from "../views/pages/purchasings/edit";

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/login"
					element={
						<Guest>
							<Login />
						</Guest>
					}
				/>

				<Route path="/403" element={<Error403 />} />
				<Route path="/404" element={<Error404 />} />

				<Route path="/" element={<MainLayout />}>
					<Route
						path="/"
						exact={"true"}
						element={
							<Auth>
								<Dashboard />
							</Auth>
						}
					/>
					<Route
						path="/users"
						element={
							<Auth>
								<Users />
							</Auth>
						}
					/>
					<Route
						path="/products"
						element={
							<Auth>
								<Products />
							</Auth>
						}
					/>
					<Route
						path="/purchasings"
						element={
							<Auth>
								<Purchasings />
							</Auth>
						}
					/>
					<Route
						path="/purchase"
						element={
							<Auth>
								<AddPurchasing />
							</Auth>
						}
					/>

					<Route
						path="/edit-purchasing/:id"
						element={
							<Auth>
								<EditPurchasing />
							</Auth>
						}
					/>

					<Route
						path="/sellings"
						element={
							<Auth>
								<Sellings />
							</Auth>
						}
					/>
					<Route
						path="/sales"
						element={
							<Auth>
								<AddSelling />
							</Auth>
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
