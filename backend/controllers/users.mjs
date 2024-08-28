import { userModel } from "../models/userModel.mjs"
import { errorMessages } from "../utils/errorMessages.mjs"

export const getAllUsersController = async (req, res) => {

    try {

        const users = await userModel.find({}).exec()

        return res.send({
            message: "users fetched",
            data: users
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }

}