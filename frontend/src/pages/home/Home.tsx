import "./Home.css"
import { useParams } from "react-router-dom"
import Chat from "./Chat"
import Contacts from "./Contacts"
import { SmallSplashScreen } from "../splashScreen/SplashScreen"
import { useEffect, useState } from "react"

const Home = () => {

  const { userId } = useParams()
  const [width, setWidth] = useState(0)

  useEffect(() => {

    const handleResize = () => setWidth(window?.innerWidth)

    handleResize();

    window?.addEventListener('resize', handleResize);

    return () => window?.removeEventListener('resize', handleResize);

  }, []);

  return (
    <>
      <div className="home">
        {
          (width > 550 && userId) ?
            <>
              <Contacts />
              <Chat userId={userId} />
            </>
            : null
        }
        {
          (width > 550 && !userId) ?
            <>
              <Contacts />
              <div className="noChat"><SmallSplashScreen /></div>
            </>
            : null
        }
        {
          (width <= 550 && !userId) ?
            <>
              <Contacts />
            </>
            : null
        }
        {
          (width <= 550 && userId) ?
            <>
              <Chat userId={userId} />
            </>
            : null
        }
      </div>
    </>
  )
}

export default Home