import { useParams } from "react-router-dom"
import Chat from "./Chat"
import Contacts from "./Contacts"
import "./Home.css"
import SplashScreen from "../splashScreen/SplashScreen"

const Home = () => {

  const { userId } = useParams()

  return (
    <>
      <div className="home">
        <Contacts />
        {
          userId ? <Chat userId={userId} /> :
            <div className="noChat"><SplashScreen /></div>
        }
      </div>
    </>
  )
}

export default Home