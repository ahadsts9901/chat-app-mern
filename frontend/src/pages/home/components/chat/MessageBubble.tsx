import "./Message.css"
import { useSelector } from "react-redux"
import { timeAgo } from "../../../../utils/functions"
import axios from "axios"
import { baseUrl } from "../../../../utils/core"
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react"
import ConfirmAlertMUI from "../../../../mui/ConfirmAlertMui"

export const TimeAndRead = ({ time }: any) => {
    return (
        <>
            <div className="timeAndRead">
                <p className="time">{timeAgo(time)}</p>
            </div>
        </>
    )
}

export const RightChat = ({ data, setMessages }: any) => {
    return (
        <>
            <div className="rightChatBubble">
                <ActionsDropdown id={data?._id} setMessages={setMessages} />
                <p>{data?.text}</p>
                <TimeAndRead status={data?.status} time={data?.time} />
            </div>
        </>
    )
}

export const LeftChat = ({ data }: any) => {

    return (
        <>
            <div className="leftChatBubble">
                <p>{data?.text}</p>
                <TimeAndRead time={data?.time} />
            </div>
        </>
    )
}

export const ActionsDropdown = ({ id, setMessages }: any) => {

    const [showActionModal, setShowActionModal] = useState<boolean>(false)
    const [actionModalData, setActionModalData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const deleteMessage = async (messageId: string) => {

        if (!messageId || messageId?.trim() === "") return

        try {

            setIsLoading(true)

            await axios.delete(`${baseUrl}/api/v1/message/${messageId}`, { withCredentials: true })

            setMessages((messages: any) => messages?.filter((message: any) => message?._id !== messageId))
            setIsLoading(false)
            setShowActionModal(false)

        } catch (error) {
            console.error(error)
            setIsLoading(false)
        }

    }

    const openDeleteMessageModal = () => {

        setActionModalData({
            title: "Delete message?",
            description: "Are you sure you want to delete this message?. The action cannot be undone.",
            fun: () => deleteMessage(id)
        })

        handleClose()
        setShowActionModal(true)

    }

    const options = [
        { label: "Delete", fun: openDeleteMessageModal },
    ]

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event?.currentTarget)

    const handleClose = () => setAnchorEl(null)

    return (
        <>
            <ConfirmAlertMUI
                open={showActionModal}
                setOpen={setShowActionModal}
                title={actionModalData?.title}
                description={actionModalData?.description}
                fun={actionModalData?.fun}
                isLoading={isLoading}
            />
            <div className="drop-button-message">
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                    size="small"
                >
                    <IoIosArrowDown style={{ fontSize: "0.5em", color: "#fff" }} />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    {options.map((option: any, i: number) => (
                        <MenuItem key={i} onClick={option?.fun} sx={{ fontSize: "0.7em" }}>
                            {option?.label}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        </>
    )

}

const MessageBubble = ({ message, setMessages }: any) => {

    const currentUser = useSelector((state: any) => state?.user)

    return (
        <>
            {
                message?.from_id === currentUser?._id ?
                    <RightChat data={message} setMessages={setMessages} />
                    :
                    <LeftChat data={message} setMessages={setMessages} />
            }
        </>
    )
}

export default MessageBubble