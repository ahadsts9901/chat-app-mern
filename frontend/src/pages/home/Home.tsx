import "./Home.css"
import { useParams } from "react-router-dom"
import Chat from "./Chat"
import Contacts from "./Contacts"
import { SmallSplashScreen } from "../splashScreen/SplashScreen"

const Home = () => {

  const { userId } = useParams()

  return (
    <>
      <div className="home">
        <Contacts />
        {
          userId ? <Chat userId={userId} /> :
            <div className="noChat"><SmallSplashScreen /></div>
        }
      </div>
    </>
  )
}

export default Home