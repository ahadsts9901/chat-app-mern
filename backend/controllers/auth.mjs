import bcrypt from "bcrypt"
import axios from "axios"
import { emailPattern, googleUserApi, passwordPattern, userNamePattern } from "../core.mjs"
import { userModel } from "../models/userModel.mjs"
import { errorMessages } from "../errorMessages.mjs"

export const signupController = async (req, res, next) => {

    const { userName, email, password } = req?.body

    if (!userName || userName?.trim() === "") {
        return res.status(400).send({
            message: errorMessages?.userNameRequired
        })
    }

    if (!email || email?.trim() === "") {
        return res.status(400).send({
            message: errorMessages?.emailRequired
        })
    }

    if (!password || password?.trim() === "") {
        return res.status(400).send({
            message: errorMessages?.passwordRequired
        })
    }

    if (!userNamePattern?.test(userName?.trim())) {
        return res.status(400).send({
            message: errorMessages?.userNameInvalid
        })
    }

    if (!emailPattern?.test(email?.toLowerCase())) {
        return res.status(400).send({
            message: errorMessages?.emailInvalid
        })
    }

    if (!passwordPattern?.test(password?.trim())) {
        return res.status(400).send({
            message: errorMessages?.passwordInvalid
        })
    }

    try {

        const isEmailTaken = await userModel?.findOne({ email: email?.trim()?.toLowerCase() }).exec()

        if (isEmailTaken) {
            return res.status(400).send({
                message: errorMessages.emailTaken
            })
        }

        const passwordHash = await bcrypt.hash(password, 12)


        const userPayload = {
            userName: userName,
            email: email?.trim()?.toLowerCase(),
            password: passwordHash,
        }

        const signupResp = await userModel?.create(userPayload)

        const tokenPayload = {
            _id: signupResp?._id,
            userName: signupResp?.userName,
            email: signupResp?.email?.toLowerCase(),
            createdOn: signupResp?.createdOn,
            isAdmin: signupResp?.isAdmin,
            profilePhoto: signupResp?.profilePhoto
        }

        req.loginTokenPayload = tokenPayload

        next()

    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }

}

export const loginController = async (req, res, next) => {

    const { email, password } = req?.body

    if (!email || email?.trim() === "") {
        return res.status(400).send({
            message: errorMessages?.emailRequired
        })
    }

    if (!password || password?.trim() === "") {
        return res.status(400).send({
            message: errorMessages?.passwordRequired
        })
    }

    if (!emailPattern?.test(email?.trim()?.toLowerCase())) {
        return res.status(400).send({
            message: errorMessages?.emailPasswordIncorrect
        })
    }

    if (!passwordPattern?.test(password?.trim())) {
        return res.status(400).send({
            message: errorMessages?.emailPasswordIncorrect
        })
    }

    try {

        const user = await userModel?.findOne({ email: email?.trim()?.toLowerCase() }).exec()

        if (!user) {
            return res.status(400).send({
                message: errorMessages.emailPasswordIncorrect
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user?.password)

        if (!isPasswordCorrect) {
            return res.status(400).send({
                message: errorMessages?.emailPasswordIncorrect
            })
        }

        const tokenPayload = {
            _id: user?._id,
            userName: user?.userName,
            email: user?.email,
            createdOn: user?.createdOn,
            isAdmin: user?.isAdmin,
            profilePhoto: user?.profilePhoto
        }

        req.loginTokenPayload = tokenPayload

        next()

    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }

}

export const googleLoginController = async (req, res, next) => {

    const { accessToken } = req?.body

    if (!accessToken || accessToken?.trim() === "") {
        return res.status(400).send({
            message: errorMessages?.noAccessToken
        })
    }

    try {

        const googleUser = await axios.get(googleUserApi, { headers: { Authorization: accessToken }, });

        const user = await userModel?.findOne({ email: googleUser?.data?.email }).exec()

        if (!user) {

            const userPayload = {
                userName: googleUser?.data?.name,
                email: googleUser?.data?.email?.toLowerCase(),
                profilePhoto: googleUser?.data?.picture,
                isEmailVerified: true,
            }

            const signupResp = await userModel?.create(userPayload)

            const tokenPayload = {
                _id: signupResp?._id,
                userName: signupResp?.userName,
                email: signupResp?.email,
                createdOn: signupResp?.createdOn,
                isAdmin: signupResp?.isAdmin,
                profilePhoto: signupResp?.profilePhoto
            }

            req.loginTokenPayload = tokenPayload

        } else if (user) {

            const tokenPayload = {
                _id: user?._id,
                userName: user?.userName,
                email: user?.email,
                createdOn: user?.createdOn,
                isAdmin: user?.isAdmin,
                profilePhoto: user?.profilePhoto
            }

            req.loginTokenPayload = tokenPayload

        }

        next()

    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }

}