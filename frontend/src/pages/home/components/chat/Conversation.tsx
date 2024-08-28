import "./Main.css"
import MessageBubble from "./MessageBubble"

const Conversation = ({ messages, setMessages }: any) => {

    return (
        <>
            <div className="conversation">
                {
                    messages?.map((message: any, i: number) => <MessageBubble key={i} message={message} setMessages={setMessages} />)
                }
            </div>
        </>
    )
}

export default Conversation