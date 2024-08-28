import "./Home.css"
import { useEffect, useState } from "react"
import axios from "axios"
import { baseUrl } from "../../utils/core"
import { SmallSplashScreen } from "../splashScreen/SplashScreen"
import Header from "./components/contacts/Header"
import ChatForm from "./components/chat/ChatForm"
import Conversation from "./components/chat/Conversation"
import io from 'socket.io-client';
import { useSelector } from "react-redux"

const Chat = ({ userId }: any) => {

  const currentUser = useSelector((state: any) => state?.user)

  const [user, setUser] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])

  useEffect(() => {

    if (!userId || userId?.trim() === "") return

    getUserProfile(userId)
    getMessages(userId)

  }, [userId])

  useEffect(() => {

    listenSocketChannel()

  }, []);

  const listenSocketChannel = async () => {

    const socket = io(baseUrl);

    socket.on('connect', () => console.log("connected"))

    socket.on('disconnect', (message) => console.log("socket disconnected from server: ", message))

    socket.on(`chat-message-${currentUser?._id}`, async (e: any) => setMessages((prev: any) => [e, ...prev]))

    socket.on(`delete-chat-message-${currentUser?._id}`, async (e: any) => setMessages((oldMessages: any) => oldMessages?.filter((message: any) => message?._id != e?.deletedMessageId)))

    return () => socket.close()

  }

  const getUserProfile = async (userId: string) => {

    if (!userId || userId?.trim() === "") return

    try {

      setUser(null)

      const resp = await axios.get(`${baseUrl}/api/v1/profile/${userId}`, { withCredentials: true })

      setUser(resp?.data?.data)

    } catch (error) {
      console.error(error)
    }

  }

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
      <div className="chat">
        {
          !user ? <div className="noChat"><SmallSplashScreen /></div> :
            <>
              <Header user={user} showBackButton />
              <Conversation messages={messages} setMessages={setMessages} />
              <ChatForm user={user} setMessages={setMessages} />
            </>
        }
      </div>
    </>
  )
}

export default Chat