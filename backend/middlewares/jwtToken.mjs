import "dotenv/config"
import jwt from "jsonwebtoken"
import { errorMessages } from "../utils/errorMessages.mjs"
import { sessionInDays } from "../utils/core.mjs"

export const issueJwtTokenMiddleware = async (req, res, next) => {

    try {

        const { loginTokenPayload } = req

        if (!loginTokenPayload) {
            return res.status(400).send({
                message: errorMessages.noTokenPayload
            })
        }

        const hart = jwt?.sign(loginTokenPayload, process.env.JWT_KEY, { expiresIn: `${sessionInDays}d` })

        res.cookie('hart', hart, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + sessionInDays * 24 * 60 * 60 * 1000)
        });

        next()

    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }

}