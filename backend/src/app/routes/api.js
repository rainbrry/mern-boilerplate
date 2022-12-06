import { Router } from "express";
import {
	isAdmin,
	isCashier,
	isLoggedin,
} from "../middlewares/auth-middleware.js";
import { verifyRefreshToken } from "../middlewares/token-middleware.js";
import AuthController from "../controllers/auth.controller.js";
import UsersController from "../controllers/users.controller.js";
import ProductsController from "../controllers/products.controller.js";
import PurchasingsController from "../controllers/purchasings.controller.js";
import SellingsController from "../controllers/sellings.controller.js";
import DashboardController from "../controllers/dashboard.controller.js";

const route = Router();

// Dashboard
route.get("/dashboard", isLoggedin, DashboardController.index);
route.post("/set-cash", isAdmin, DashboardController.setCash);

// Auth routes
route.post("/register", AuthController.register);
route.post("/login", AuthController.login);
route.get("/refresh-token", verifyRefreshToken, AuthController.refreshToken);
route.get("/get-auth", verifyRefreshToken, AuthController.getAuth);
route.get("/logout", verifyRefreshToken, AuthController.logout);

// User routes
route.get("/users", isAdmin, UsersController.index);
route.get("/user/:id", isAdmin, UsersController.show);
route.post("/user", isAdmin, UsersController.store);
route.put("/user/:id", isAdmin, UsersController.update);
route.delete("/user/:id", isAdmin, UsersController.destroy);

// Product routes
route.get("/products", isAdmin, ProductsController.index);
route.get("/product/:id", isAdmin, ProductsController.show);
route.get("/search-product", isAdmin, ProductsController.search);
route.post("/product", isAdmin, ProductsController.store);
route.put("/product/:id", isAdmin, ProductsController.update);
route.delete("/product/:id", isAdmin, ProductsController.destroy);

// Purchasing routes
route.get("/purchasings", isAdmin, PurchasingsController.index);
route.get("/purchasing/:id", isAdmin, PurchasingsController.show);
route.post("/purchasing", isAdmin, PurchasingsController.store);
route.put("/purchasing/:id", isAdmin, PurchasingsController.update);
route.delete("/purchasing/:id", isAdmin, PurchasingsController.destroy);

// Selling routes
route.get("/sellings", isAdmin, SellingsController.index);
route.get("/selling/:id", isAdmin, SellingsController.show);
route.post("/selling", isAdmin, SellingsController.store);
route.put("/return-item/:id", isAdmin, SellingsController.returnItem);
route.delete("/selling/:id", isAdmin, SellingsController.destroy);

export default route;
