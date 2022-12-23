import { Router } from "express";
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
route.get("/dashboard", DashboardController.index);
route.post("/set-cash", DashboardController.setCash);

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
route.get("/users", UsersController.index);
route.get("/user/:id", UsersController.show);
route.post("/user", UsersController.store);
route.put("/user/:id", UsersController.update);
route.delete("/user/:id", UsersController.destroy);

/**
 * @description API routes products
 * @access Public
 * @url /api/{url}
 * @note Admin can access all routes
 * @note Cashier can only access index, show, search
 */
route.get("/products", ProductsController.index);
route.get("/product/:id", ProductsController.show);
route.get("/search-product", ProductsController.search);
route.post("/product", ProductsController.store);
route.put("/product/:id", ProductsController.update);
route.delete("/product/:id", ProductsController.destroy);

/**
 * @description API routes purchasings
 * @access Public
 * @url /api/{url}
 * @note Only admin can access this routes
 */
route.get("/purchasings", PurchasingsController.index);
route.get("/purchasing/:id", PurchasingsController.show);
route.get("/search-purchasing", PurchasingsController.search);
route.post("/purchasing", PurchasingsController.store);
route.put("/purchasing/:id", PurchasingsController.update);
route.delete("/purchasing/:id", PurchasingsController.destroy);
route.get("/purchasing-reports", PurchasingController.report);

/**
 * @description API routes sellings and expenses
 * @access Public
 * @url /api/{url}
 * @note Admin can access index and show
 * @note Cashier can access all routes
 */
route.get("/sellings", SellingsController.index);
route.get("/selling/:id", SellingsController.show);
route.get("/search-selling", SellingsController.search);
route.post("/selling", SellingsController.store);
route.put("/return-item/:id", SellingsController.returnItem);
route.get("/sales-reports", SellingsController.report);
route.get("/return-reports", SellingsController.returnReports);
route.get("/expenses", ExpensesController.index);
route.post("/expense", ExpensesController.store);

export default route;
