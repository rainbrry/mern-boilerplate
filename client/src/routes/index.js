import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
	AdminRoutes,
	CashierRoutes,
	PrivateRoutes,
	PublicRoutes,
} from "./routes.middleware";
import MainLayout from "../views/layouts/MainLayout";
import Login from "../views/pages/auth/Login";
import Dashboard from "../views/pages/dashboard";
import Users from "../views/pages/users";
import Products from "../views/pages/products";
import Purchasings from "../views/pages/purchasings";
import AddPurchasing from "../views/pages/purchasings/create";
import EditPurchasing from "../views/pages/purchasings/edit";
import Sellings from "../views/pages/sellings";
import AddSelling from "../views/pages/sellings/create";
import ReturnSelling from "../views/pages/sellings/edit";
import Expenses from "../views/pages/expenses";
import PurchasingReport from "../views/pages/reports/purchasing-report";
import SalesReports from "../views/pages/reports/sales-report";
import ReturnSalesReport from "../views/pages/reports/return-sales-report";

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
								<AdminRoutes>
									<Users />
								</AdminRoutes>
							</PrivateRoutes>
						}
					/>

					<Route
						path="/products"
						element={
							<PrivateRoutes>
								<AdminRoutes>
									<Products />
								</AdminRoutes>
							</PrivateRoutes>
						}
					/>

					<Route
						path="/purchasings"
						element={
							<PrivateRoutes>
								<AdminRoutes>
									<Purchasings />
								</AdminRoutes>
							</PrivateRoutes>
						}
					/>

					<Route
						path="/new-purchasing"
						element={
							<PrivateRoutes>
								<AdminRoutes>
									<AddPurchasing />
								</AdminRoutes>
							</PrivateRoutes>
						}
					/>

					<Route
						path="/edit-purchasing/:id"
						element={
							<PrivateRoutes>
								<AdminRoutes>
									<EditPurchasing />
								</AdminRoutes>
							</PrivateRoutes>
						}
					/>

					<Route
						path="/sellings"
						element={
							<PrivateRoutes>
								<Sellings />
							</PrivateRoutes>
						}
					/>

					<Route
						path="/new-selling"
						element={
							<PrivateRoutes>
								<CashierRoutes>
									<AddSelling />
								</CashierRoutes>
							</PrivateRoutes>
						}
					/>

					<Route
						path="/return-selling/:id"
						element={
							<PrivateRoutes>
								<CashierRoutes>
									<ReturnSelling />
								</CashierRoutes>
							</PrivateRoutes>
						}
					/>

					<Route
						path="/expenses"
						element={
							<PrivateRoutes>
								<CashierRoutes>
									<Expenses />
								</CashierRoutes>
							</PrivateRoutes>
						}
					/>

					<Route
						path="/purchasing-reports"
						element={
							<PrivateRoutes>
								<AdminRoutes>
									<PurchasingReport />
								</AdminRoutes>
							</PrivateRoutes>
						}
					/>

					<Route
						path="/sales-reports"
						element={
							<PrivateRoutes>
								<SalesReports />
							</PrivateRoutes>
						}
					/>

					<Route
						path="/return-sales-reports"
						element={
							<PrivateRoutes>
								<ReturnSalesReport />
							</PrivateRoutes>
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
