import "./Main.css"
import MessageBubble from "./MessageBubble"

const Conversation = ({ messages }: any) => {

    return (
        <>
            <div className="conversation">
                {
                    messages?.map((message: any, i: number) => <MessageBubble key={i} message={message} />)
                }
            </div>
        </>
    )
}

export default Conversation