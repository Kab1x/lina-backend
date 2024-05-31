import { Router } from "express";
import { login, signup } from "../controllers/authentication-controller.js";

const AuthenticationRouter = Router();

AuthenticationRouter.post("/signup", signup);
AuthenticationRouter.post("/login", login);

export default AuthenticationRouter;
