import { useState } from "react"
import "./Main.css"
import { IconButton } from "@mui/material"
import { IoMdSend } from "react-icons/io";

const ChatForm = () => {

    const [text, setText] = useState<null | string>(null)

    return (
        <>
            <form className="chatForm">
                <input type="text" placeholder="Type a message" onChange={(e: any) => setText(e?.target?.value)} />
                <IconButton><IoMdSend style={{ fontSize: "0.8em" }} /></IconButton>
            </form>
        </>
    )
}

export default ChatForm