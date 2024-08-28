import { Router } from "express";
import { googleLoginController } from "../controllers/index.mjs";
import { issueJwtTokenMiddleware } from "../middlewares/index.mjs"

const router = Router()

router.post("/google-login", googleLoginController, issueJwtTokenMiddleware, (req, res) => res.send({ message: "login successfull", data: req?.loginTokenPayload }))

export default router