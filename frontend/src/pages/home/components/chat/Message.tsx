import "./Message.css"
import { useSelector } from "react-redux"

const Message = ({ message }: any) => {

    const currentUser = useSelector((state: any) => state?.user)

    return (
        <>

        </>
    )
}

export default Message