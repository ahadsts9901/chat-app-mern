import "./Main.css"
import { defaultProfilePicture } from "../../../../utils/core"
import { useSelector } from "react-redux"

const Header = ({ user }: any) => {

    const currentUser = useSelector((state: any) => state?.user)

    return (
        <>
            <div className="header">
                <img src={user?.profilePhoto ? user?.profilePhoto : defaultProfilePicture} alt="profile photo"
                    onError={(e: any) => e.target.src = defaultProfilePicture}
                />
                <h3>
                    {
                        user?._id === currentUser?._id ? "You" :
                            user?.userName ? user?.userName : "Chat App"
                    }
                </h3>
            </div>
        </>
    )
}

export default Header