import "dotenv/config"
import "./utils/mongodb.mjs"
import express, { json } from "express"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"
import { createServer } from "http"
import { Server as socketIo } from "socket.io"
import { allowedOrigins, globalIoObject } from "./utils/core.mjs"

import { authRoutes, profileRoutes, userRoutes, chatRoutes } from "./routes/index.mjs"
import { authMiddleware, socketIoMiddleware } from "./middlewares/index.mjs"

const app = express()

// middlewares
app.use(cors({ origin: allowedOrigins, credentials: true }))
app.use(morgan("dev"))
app.use(json())
app.use(cookieParser())

// routes
app.use("/api/v1", authRoutes, authMiddleware, profileRoutes, userRoutes, chatRoutes)

// socket io
const server = createServer(app)

const io = new socketIo(server, { cors: { origin: allowedOrigins, methods: "*", credentials: true } })

globalIoObject.io = io
io.use(socketIoMiddleware)

io.on("connection", (socket) => console.log(`new client connected with id: ${socket?.id}`))

const PORT = process.env.PORT || 5002

server.listen(PORT, () => console.log(`server running on port ${PORT}`))