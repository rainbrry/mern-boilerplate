import { Router } from "express";
import UsersController from "../controllers/users.controller.js";
import AuthController from "../controllers/auth.controller.js";
import { isAdmin } from "../middlewares/auth-middleware.js";
import { verifyRefreshToken } from "../middlewares/token-middleware.js";

const route = Router();

route.get("/", async (req, res) => {
	res.send("Hello World");
});

route.post("/register", AuthController.register);
route.post("/login", AuthController.login);
route.get("/refresh-token", verifyRefreshToken, AuthController.refreshToken);
route.get("/get-auth", verifyRefreshToken, AuthController.getAuth);
route.get("/logout", verifyRefreshToken, AuthController.logout);

route.get("/users", isAdmin, UsersController.index);
route.get("/user/:id", isAdmin, UsersController.show);
route.post("/user", isAdmin, UsersController.store);
route.put("/user/:id", isAdmin, UsersController.update);
route.delete("/user/:id", isAdmin, UsersController.destroy);

export default route;
