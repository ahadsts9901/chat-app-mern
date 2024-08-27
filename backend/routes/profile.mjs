import { Router } from "express";
import { getProfileController,getCurrentProfileController } from "../controllers/index.mjs"

const router = Router()

router.get("/profile", getCurrentProfileController)

router.get("/profile/:userId", getProfileController)

export default router