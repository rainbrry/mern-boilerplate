import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../views/layouts/MainLayout";
import Home from "../views/pages/home";
import Users from "../views/pages/users";
import Products from "../views/pages/products";
import Login from "../views/pages/auth/Login";
import Error403 from "../views/pages/error/Error403";
import Error404 from "../views/pages/error/Error404";
import Guest from "../middlewares/Guest";
import Auth from "../middlewares/Auth";

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
								<Home />
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
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
