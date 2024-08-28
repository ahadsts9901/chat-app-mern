import { Router } from "express";
import { deleteMessageController, getMessagesController, sendMessageController } from "../controllers/index.mjs"

const router = Router()

router.post("/message", sendMessageController)

router.get("/messages/:userId", getMessagesController)

router.delete("/message/:messageId", deleteMessageController)

export default router