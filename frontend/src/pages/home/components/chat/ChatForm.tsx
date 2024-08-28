import "./Main.css"
import { useState } from "react"
import { IconButton } from "@mui/material"
import { IoMdSend } from "react-icons/io";
import axios from "axios";
import { baseUrl } from "../../../../utils/core";

const ChatForm = ({ user }: any) => {

    const [text, setText] = useState<null | string>(null)

    const sendMessage = async (e: any) => {

        e?.preventDefault()

        if (!text || text?.trim() === "") return
        if (!user || !user?._id || user?._id?.trim() === "") return

        try {

            await axios.post(`${baseUrl}/api/v1/message`, {
                to_id: user?._id,
                message: text
            }, { withCredentials: true })

        } catch (error) {
            console.error(error)
        }

    }

    return (
        <>
            <form className="chatForm" onSubmit={sendMessage}>
                <input type="text" placeholder="Type a message" onChange={(e: any) => setText(e?.target?.value)} />
                <IconButton><IoMdSend style={{ fontSize: "0.8em" }} /></IconButton>
            </form>
        </>
    )
}

export default ChatForm