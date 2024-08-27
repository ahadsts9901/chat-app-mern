import "dotenv/config"
import express, { json } from "express"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.mjs"
import profileRoutes from "./routes/profile.mjs"
import userRoutes from "./routes/users.mjs"
import chatRoutes from "./routes/chat.mjs"

import { authMiddleware } from "./middlewares/index.mjs"

const app = express()

// middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(morgan("dev"))
app.use(json())
app.use(cookieParser())

// routes
app.use("/api/v1", authRoutes, authMiddleware, profileRoutes, userRoutes, chatRoutes)

const PORT = process.env.PORT || 5002

app.listen(PORT, () => console.log(`server running on port ${PORT}`))