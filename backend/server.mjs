import express, { json } from "express"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(morgan("dev"))
app.use(json())
app.use(cookieParser())

const PORT = process.env.PORT || 5002

app.listen(PORT, () => console.log(`server running on port ${PORT}`))