import "./Message.css"
import { useSelector } from "react-redux"
import { timeAgo } from "../../../../utils/functions"
import axios from "axios"
import { baseUrl } from "../../../../utils/core"

export const TimeAndRead = ({ time }: any) => {
    return (
        <>
            <div className="timeAndRead">
                <p className="time">{timeAgo(time)}</p>
            </div>
        </>
    )
}

export const RightChat = ({ data, setMessages }: any) => {
    return (
        <>
            <div className="rightChatBubble">
                <ActionsDropdown id={data?._id} setMessages={setMessages} />
                <p>{data?.text}</p>
                <TimeAndRead status={data?.status} time={data?.time} />
            </div>
        </>
    )
}

export const LeftChat = ({ data, setMessages }: any) => {

    return (
        <>
            <div className="leftChatBubble">
                <ActionsDropdown id={data?._id} setMessages={setMessages} />
                <p>{data?.text}</p>
                <TimeAndRead time={data?.time} />
            </div>
        </>
    )
}

export const ActionsDropdown = ({ id, setMessages }: any) => {

    const deleteMessage = async (messageId: string) => {

        if (!messageId || messageId?.trim() === "") return

        try {

            await axios.delete(`${baseUrl}/api/v1/message/${messageId}`, { withCredentials: true })
            setMessages((messages: any) => messages?.filter((message: any) => message?._id !== messageId))

        } catch (error) {
            console.error(error)
        }

    }

    const options = [
        { label: "Delete", fun: deleteMessage }
    ]

    return (
        <>

        </>
    )

}

const MessageBubble = ({ message, setMessages }: any) => {

    const currentUser = useSelector((state: any) => state?.user)

    return (
        <>
            {
                message?.from_id === currentUser?._id ?
                    <RightChat data={message} setMessages={setMessages} />
                    :
                    <LeftChat data={message} setMessages={setMessages} />
            }
        </>
    )
}

export default MessageBubble