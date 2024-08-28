import { Router } from "express";
import { sendMessageController } from "../controllers/index.mjs"

const router = Router()

router.post("/message", sendMessageController)

export default router