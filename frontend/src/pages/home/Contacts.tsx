import "./Home.css"
import Contact from "./components/contacts/Contact"
import Header from "./components/contacts/Header"

const Contacts = () => {
  return (
    <>
      <div className="contacts">
        <Header />
        <Contact />
      </div>
    </>
  )
}

export default Contacts