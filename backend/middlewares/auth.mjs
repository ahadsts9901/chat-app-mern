import "dotenv/config"
import jwt from "jsonwebtoken"
import { errorMessages } from "../utils/errorMessages.mjs"

export const authMiddleware = async (req, res, next) => {

    try {

        const { hart } = req?.cookies

        if (!hart) {
            return res.status(401).send({
                message: errorMessages?.unAuthError
            })
        }

        const currentUser = jwt?.verify(hart, process.env.JWT_KEY)

        if (!currentUser) {
            return res.status(401).send({
                message: errorMessages?.unAuthError
            })
        }

        req.currentUser = currentUser

        next()

    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }

}