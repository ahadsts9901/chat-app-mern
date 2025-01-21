import { isValidObjectId } from "mongoose"
import { errorMessages } from "../utils/errorMessages.mjs"
import { chatModel } from "../models/index.mjs"
import { globalIoObject, socketUsers } from "../utils/core.mjs"

export const sendMessageController = async (req, res) => {

    const { _id } = req?.currentUser
    const { to_id, text } = req?.body

    if (!_id || _id?.trim === "") {
        return res.status(400).send({
            message: errorMessages?.unAuthError
        })
    }

    if (!isValidObjectId(_id)) {
        return res.status(400).send({
            message: errorMessages?.unAuthError
        })
    }

    if (!to_id || to_id?.trim === "") {
        return res.status(400).send({
            message: errorMessages?.idIsMissing
        })
    }

    if (!isValidObjectId(to_id)) {
        return res.status(400).send({
            message: errorMessages?.invalidId
        })
    }

    if (!text || text?.trim() === "") {
        return res.status(400).send({
            message: errorMessages?.messageRequired
        })
    }

    try {

        const message = {
            from_id: _id,
            to_id: to_id,
            text: text,
        }

        const resp = await chatModel.create(message)

        const messageToEmit = {
            ...message,
            _id: resp?._id,
            createdOn: resp?.createdOn
        }

        if (socketUsers[to_id]) {

            console.log(`emitting message to ${to_id}`)
            socketUsers[to_id]?.emit(`SEND_MESSAGE`, messageToEmit)

        }

        res.send({
            message: "message sent",
            data: messageToEmit
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }

}

export const getMessagesController = async (req, res) => {

    const from_id = req?.currentUser?._id
    const to_id = req?.params?.userId

    if (!from_id || from_id?.trim === "") {
        return res.status(400).send({
            message: errorMessages?.unAuthError
        })
    }

    if (!isValidObjectId(from_id)) {
        return res.status(400).send({
            message: errorMessages?.unAuthError
        })
    }

    if (!to_id || to_id?.trim === "") {
        return res.status(400).send({
            message: errorMessages?.idIsMissing
        })
    }

    if (!isValidObjectId(to_id)) {
        return res.status(400).send({
            message: errorMessages?.invalidId
        })
    }

    try {

        const pipeline = {
            $or: [
                {
                    to_id: to_id,
                    from_id: from_id,
                },
                {
                    to_id: from_id,
                    from_id: to_id,
                }
            ]
        }

        const messages = await chatModel.find(pipeline).sort({ _id: -1 }).exec()

        res.send({
            message: "messages fetched",
            data: messages
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }

}

export const deleteMessageController = async (req, res) => {

    const { messageId } = req?.params

    if (!messageId || messageId?.trim === "") {
        return res.status(400).send({
            message: errorMessages?.idIsMissing
        })
    }

    if (!isValidObjectId(messageId)) {
        return res.status(400).send({
            message: errorMessages?.invalidId
        })
    }

    try {

        const message = await chatModel.findById(messageId)

        if (!message) {
            return res.status(404).send({
                message: errorMessages?.messageNotFound
            })
        }

        if (message?.from_id != req?.currentUser?._id) {
            return res.status(401).send({
                message: errorMessages?.unAuthError
            })
        }

        const deleteResponse = await chatModel.findByIdAndDelete(messageId)

        if (globalIoObject?.io) {

            console.log(`emitting message to ${deleteResponse?.to_id}`)
            globalIoObject?.io?.emit(`DELETE_MESSAGE`, { deletedMessageId: deleteResponse?._id })

        }

        res.send({
            message: "messages deleted",
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }

}