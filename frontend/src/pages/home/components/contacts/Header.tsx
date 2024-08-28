import "./Main.css"
import { defaultProfilePicture } from "../../../../utils/core"
import { useSelector } from "react-redux"

const Header = () => {

    const currentUser = useSelector((state: any) => state?.user)

    return (
        <>
            <div className="header">
                <img src={currentUser?.profilePhoto ? currentUser?.profilePhoto : defaultProfilePicture} alt="profile photo"
                    onError={(e: any) => e.target.src = defaultProfilePicture}
                />
                <h3>{currentUser?.userName ? currentUser?.userName : "Chat App"}</h3>
            </div>
        </>
    )
}

export default Header