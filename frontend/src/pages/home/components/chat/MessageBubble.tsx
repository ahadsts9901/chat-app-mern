import "./Message.css"
import { useSelector } from "react-redux"
import { timeAgo } from "../../../../utils/functions"

export const RightChat = ({ data }: any) => {
    return (
        <>
            <div className="rightChatBubble">
                <p>{data?.text}</p>
                <TimeAndRead status={data?.status} time={data?.time} />
            </div>
        </>
    )
}

export const TimeAndRead = ({ time }: any) => {
    return (
        <>
            <div className="timeAndRead">
                <p className="time">{timeAgo(time)}</p>
            </div>
        </>
    )
}

export const LeftChat = ({ data }: any) => {

    return (
        <>
            <div className="leftChatBubble">
                <p>{data?.text}</p>
                <TimeAndRead time={data?.time} />
            </div>
        </>
    )
}

const MessageBubble = ({ message }: any) => {

    const currentUser = useSelector((state: any) => state?.user)

    return (
        <>
            {
                message?.from_id === currentUser?._id ? <RightChat data={message} /> : <LeftChat data={message} />
            }
        </>
    )
}

export default MessageBubble