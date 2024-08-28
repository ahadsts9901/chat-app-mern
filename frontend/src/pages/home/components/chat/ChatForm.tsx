import "./Main.css"
import { useState } from "react"
import { IconButton } from "@mui/material"
import { IoMdSend } from "react-icons/io";
import axios from "axios";
import { baseUrl } from "../../../../utils/core";

const ChatForm = ({ user, setMessages }: any) => {

    const [text, setText] = useState<string>("")

    const sendMessage = async (e: any) => {

        e?.preventDefault()

        if (!text || text?.trim() === "") return
        if (!user || !user?._id || user?._id?.trim() === "") return

        try {

            const resp = await axios.post(`${baseUrl}/api/v1/message`, {
                to_id: user?._id,
                text: text
            }, { withCredentials: true })

            const newMessage = resp?.data?.data

            setMessages((prev: any) => [newMessage, ...prev])

            setText("")

        } catch (error) {
            console.error(error)
        }

    }

    return (
        <>
            <form className="chatForm" onSubmit={sendMessage}>
                <input type="text" value={text} placeholder="Type a message" onChange={(e: any) => setText(e?.target?.value)} />
                <IconButton type="submit"><IoMdSend style={{ fontSize: "0.8em" }} /></IconButton>
            </form>
        </>
    )
}

export default ChatForm