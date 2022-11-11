import { Router } from "express";
import { isAdmin } from "../middlewares/auth-middleware.js";
import { verifyRefreshToken } from "../middlewares/token-middleware.js";
import AuthController from "../controllers/auth.controller.js";
import UsersController from "../controllers/users.controller.js";
import CategoriesController from "../controllers/categories.controller.js";
import SuppliersController from "../controllers/suppliers.controller.js";
import ProductsController from "../controllers/products.controller.js";

const route = Router();

// Dashboard
route.get("/", async (req, res) => {
	res.send("Hello World");
});

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

// Category routes
route.get("/categories", isAdmin, CategoriesController.index);
route.get("/category/:keyword", isAdmin, CategoriesController.search);
route.get("/category/:id", isAdmin, CategoriesController.show);
route.post("/category", isAdmin, CategoriesController.store);
route.put("/category/:id", isAdmin, CategoriesController.update);
route.delete("/category/:id", isAdmin, CategoriesController.destroy);

// Supplier routes
route.get("/suppliers", isAdmin, SuppliersController.index);
route.get("/supplier/:keyword", isAdmin, SuppliersController.search);
route.get("/supplier/:id", isAdmin, SuppliersController.show);
route.post("/supplier", isAdmin, SuppliersController.store);
route.put("/supplier/:id", isAdmin, SuppliersController.update);
route.delete("/supplier/:id", isAdmin, SuppliersController.destroy);

// Product routes
route.get("/products", isAdmin, ProductsController.index);
route.get("/product/:keyword", isAdmin, ProductsController.search);
route.get("/product/:id", isAdmin, ProductsController.show);
route.post("/product", isAdmin, ProductsController.store);
route.put("/product/:id", isAdmin, ProductsController.update);
route.delete("/product/:id", isAdmin, ProductsController.destroy);

export default route;
