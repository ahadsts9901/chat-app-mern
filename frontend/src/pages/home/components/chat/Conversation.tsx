import "./Main.css"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { baseUrl } from "../../../../utils/core"
import Message from "./Message"

const Conversation = () => {

    const { userId } = useParams()

    const [messages, setMessages] = useState<any[]>([])

    useEffect(() => {

        if (userId) getMessages(userId)

    }, [userId])

    const getMessages = async (userId: string) => {

        if (!userId || userId?.trim() === "") return

        try {

            const resp = await axios.get(`${baseUrl}/api/v1/messages/${userId}`, { withCredentials: true })

            setMessages(resp?.data?.data)

        } catch (error) {
            console.error(error)
        }

    }

    return (
        <>
            <div className="conversation">
                {
                    messages?.map((message: any, i: number) => <Message key={i} message={message} />)
                }
            </div>
        </>
    )
}

export default Conversation