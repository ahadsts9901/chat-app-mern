import { useEffect, useState } from "react"
import "./Home.css"
import Contact from "./components/contacts/Contact"
import Header from "./components/contacts/Header"
import axios from "axios"
import { baseUrl } from "../../utils/core"
import { useSelector } from "react-redux"

const Contacts = () => {

  const currentUser = useSelector((state: any) => state?.user)

  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {

    try {

      const resp = await axios.get(`${baseUrl}/api/v1/users`, { withCredentials: true })

      setUsers(resp?.data?.data)

    } catch (error) {
      console.error(error)
    }

  }

  return (
    <>
      <div className="contacts">
        <Header user={currentUser} showDrop={true} />
        <div className="users">
          {
            users?.map((user: any, i: number) => <Contact key={i} user={user} />)
          }
        </div>
      </div>
    </>
  )
}

export default Contacts