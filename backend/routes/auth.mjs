import { Router } from "express";
import { googleLoginController, loginController, signupController } from "../controllers/index.mjs";
import { issueJwtTokenMiddleware } from "../middlewares/index.mjs"

const router = Router()

router.post("/signup", signupController, issueJwtTokenMiddleware, (req, res) => res.send({ message: "signup successfull" }))

router.post("/login", loginController, issueJwtTokenMiddleware, (req, res) => res.send({ message: "login successfull" }))

router.post("/google-login", googleLoginController, issueJwtTokenMiddleware, (req, res) => res.send({ message: "google login successfull", data: req?.loginTokenPayload }))

export default router