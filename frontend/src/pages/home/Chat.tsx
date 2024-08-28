import "./Home.css"
import { useEffect, useState } from "react"
import axios from "axios"
import { baseUrl } from "../../utils/core"
import { SmallSplashScreen } from "../splashScreen/SplashScreen"
import Header from "./components/contacts/Header"
import ChatForm from "./components/chat/ChatForm"
import Conversation from "./components/chat/Conversation"

const Chat = ({ userId }: any) => {

  const [user, setUser] = useState<any>(null)

  useEffect(() => {

    if (userId) getUserProfile(userId)

  }, [userId])

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

  return (
    <>
      <div className="chat">
        {
          !user ? <div className="noChat"><SmallSplashScreen /></div> :
            <>
              <Header user={user} />
              <Conversation />
              <ChatForm user={user} />
            </>
        }
      </div>
    </>
  )
}

export default Chat