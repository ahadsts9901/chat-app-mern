import { Router } from "express";
import { getMessagesController, sendMessageController } from "../controllers/index.mjs"

const router = Router()

router.post("/message", sendMessageController)

router.get("/messages/:userId", getMessagesController)

export default router