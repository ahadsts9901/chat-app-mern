import { useSelector } from "react-redux"
import { defaultProfilePicture } from "../../../../utils/core"
import "./Main.css"

const Contact = ({ user }: any) => {

    const currentUser = useSelector((state: any) => state?.user)

    return (
        <>
            <div className="contact">
                <img src={user?.profilePhoto ? user?.profilePhoto : defaultProfilePicture} alt="profile photo"
                    onError={(e: any) => e.target.src = defaultProfilePicture}
                />
                <p>
                    {
                        currentUser?._id === user?._id ? "You" :
                            user?.userName ? user?.userName : ""
                    }
                </p>
            </div>
        </>
    )
}

export default Contact