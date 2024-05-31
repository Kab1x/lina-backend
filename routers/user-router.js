import { Router } from "express";
import { getUserById } from "../controllers/user-controller.js";

const UserRouter = Router();

UserRouter.get("/:userId", getUserById);

export default UserRouter;
