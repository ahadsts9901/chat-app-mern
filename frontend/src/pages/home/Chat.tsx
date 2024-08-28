import "./Home.css"
import { useEffect, useState } from "react"
import axios from "axios"
import { baseUrl } from "../../utils/core"
import { SmallSplashScreen } from "../splashScreen/SplashScreen"

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
          !user ? <div className="noChat"><SmallSplashScreen /></div> : "chat"
        }
      </div>
    </>
  )
}

export default Chat