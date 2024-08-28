import "./Main.css"
import { baseUrl, defaultProfilePicture } from "../../../../utils/core"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { logout } from "../../../../redux/user"
import ConfirmAlertMUI from "../../../../mui/ConfirmAlertMui"
import { IconButton, Menu, MenuItem } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IoArrowBackSharp } from "react-icons/io5";

export const LogoutDrop = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [alertData, setAlertdata] = useState<any>(null)
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const logoutConfirmation = () => {

        setIsAlertOpen(true)
        setAlertdata({
            title: "Logout?",
            description: "Are you sure you want to logout?. The action cannot be undone",
            fun: _logout,
        })
        handleClose()

    }

    const _logout = async () => {

        try {

            setIsLoading(true)

            await axios.post(`${baseUrl}/api/v1/logout`, {}, {
                withCredentials: true
            })

            setIsLoading(false)
            dispatch(logout())
            setAlertdata(null)
            setIsAlertOpen(false)
            navigate("/login")

        } catch (error: any) {
            console.error(error)
            setIsLoading(false)
        }

    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event?.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const options = [
        { label: "Logout", fun: logoutConfirmation }
    ]

    return (
        <>
            <div className="logout">
                <ConfirmAlertMUI
                    open={isAlertOpen}
                    setOpen={setIsAlertOpen}
                    title={alertData?.title}
                    description={alertData?.description}
                    fun={alertData?.fun}
                    isLoading={isLoading}
                />
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon sx={{ color: "#fff", fontSize: "0.8em" }} />
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    {options?.map((option: any, i: number) => (
                        <MenuItem key={i} onClick={option?.fun} sx={{ fontSize: "0.8em", padding: "1em" }}>
                            {option?.label}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        </>
    )

}

export const BackButton = () => {

    return (
        <>
            <IconButton size="small" onClick={() => window.history.back()}>
                <IoArrowBackSharp style={{ color: "#fff", fontSize: "0.8em" }} />
            </IconButton>
        </>
    )

}

const Header = ({ user, showDrop, showBackButton }: any) => {

    const currentUser = useSelector((state: any) => state?.user)

    return (
        <>
            <div className="header">
                {showBackButton && <BackButton />}
                <img src={user?.profilePhoto ? user?.profilePhoto : defaultProfilePicture} alt="profile photo"
                    onError={(e: any) => e.target.src = defaultProfilePicture}
                />
                <h3>
                    {
                        user?._id === currentUser?._id ? "You" :
                            user?.userName ? user?.userName : "Chat App"
                    }
                </h3>
                {showDrop && <LogoutDrop />}
            </div>
        </>
    )
}

export default Header