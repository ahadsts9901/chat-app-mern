import { Router } from "express";
import { getAllUsersController } from "../controllers/index.mjs";

const router = Router()

router.get("/users", getAllUsersController)

export default router