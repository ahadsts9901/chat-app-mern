import { Router } from "express";
import { getProfileController, getCurrentProfileController, logoutcontroller } from "../controllers/index.mjs"

const router = Router()

router.get("/profile", getCurrentProfileController)

router.get("/profile/:userId", getProfileController)

router.post("/logout", logoutcontroller)

export default router