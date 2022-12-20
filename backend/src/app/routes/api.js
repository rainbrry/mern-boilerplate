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
import PurchasingController from "../controllers/purchasings.controller.js";
import ExpensesController from "../controllers/expenses.controller.js";

const route = Router();

/**
 * @description API routes dashboard
 * @access Public
 * @url /api/{url}
 */
route.get("/dashboard", isLoggedin, DashboardController.index);
route.post("/set-cash", isAdmin, DashboardController.setCash);

/**
 * @description API routes auth
 * @access Public
 * @url /api/{url}
 */
route.post("/login", AuthController.login);
route.get("/refresh-token", verifyRefreshToken, AuthController.refreshToken);
route.get("/get-auth", verifyRefreshToken, AuthController.getAuth);
route.get("/logout", verifyRefreshToken, AuthController.logout);

/**
 * @description API routes users
 * @access Public
 * @url /api/{url}
 * @note Only admin can access this routes
 */
route.get("/users", isAdmin, UsersController.index);
route.get("/user/:id", isAdmin, UsersController.show);
route.post("/user", isAdmin, UsersController.store);
route.put("/user/:id", isAdmin, UsersController.update);
route.delete("/user/:id", isAdmin, UsersController.destroy);

/**
 * @description API routes products
 * @access Public
 * @url /api/{url}
 * @note Admin can access all routes
 * @note Cashier can only access index, show, search
 */
route.get("/products", isAdmin || isCashier, ProductsController.index);
route.get("/product/:id", isAdmin || isCashier, ProductsController.show);
route.get("/search-product", isAdmin || isCashier, ProductsController.search);
route.post("/product", isAdmin, ProductsController.store);
route.put("/product/:id", isAdmin, ProductsController.update);
route.delete("/product/:id", isAdmin, ProductsController.destroy);

/**
 * @description API routes purchasings
 * @access Public
 * @url /api/{url}
 * @note Only admin can access this routes
 */
route.get("/purchasings", isAdmin, PurchasingsController.index);
route.get("/purchasing/:id", isAdmin, PurchasingsController.show);
route.get("/search-purchasing", isAdmin, PurchasingsController.search);
route.post("/purchasing", isAdmin, PurchasingsController.store);
route.put("/purchasing/:id", isAdmin, PurchasingsController.update);
route.delete("/purchasing/:id", isAdmin, PurchasingsController.destroy);
route.get("/purchasing-reports", isAdmin, PurchasingController.report);

/**
 * @description API routes sellings and expenses
 * @access Public
 * @url /api/{url}
 * @note Admin can access index and show
 * @note Cashier can access all routes
 */
route.get("/sellings", isLoggedin, SellingsController.index);
route.get("/selling/:id", isLoggedin, SellingsController.show);
route.get("/search-selling", isLoggedin, SellingsController.search);
route.post("/selling", isLoggedin, SellingsController.store);
route.put("/return-item/:id", isLoggedin, SellingsController.returnItem);
route.get("/sales-reports", isAdmin, SellingsController.report);
route.get("/return-reports", isAdmin, SellingsController.returnReports);
route.get("/expenses", isLoggedin, ExpensesController.index);
route.post("/expense", isLoggedin, ExpensesController.store);

export default route;
