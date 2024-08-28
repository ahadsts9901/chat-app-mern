import Chat from "./Chat"
import Contacts from "./Contacts"
import "./Home.css"

const Home = () => {
  return (
    <>
      <div className="home">
        <Contacts />
        <Chat />
      </div>
    </>
  )
}

export default Home