import "./Message.css"
import { useSelector } from "react-redux"
import { timeAgo } from "../../../../utils/functions"
import axios from "axios"
import { baseUrl } from "../../../../utils/core"
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react"

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

export const LeftChat = ({ data, setMessages }: any) => {

    return (
        <>
            <div className="leftChatBubble">
                <ActionsDropdown id={data?._id} setMessages={setMessages} />
                <p>{data?.text}</p>
                <TimeAndRead time={data?.time} />
            </div>
        </>
    )
}

export const ActionsDropdown = ({ id, setMessages }: any) => {

    const deleteMessage = async (messageId: string) => {

        if (!messageId || messageId?.trim() === "") return

        try {

            await axios.delete(`${baseUrl}/api/v1/message/${messageId}`, { withCredentials: true })
            setMessages((messages: any) => messages?.filter((message: any) => message?._id !== messageId))

        } catch (error) {
            console.error(error)
        }

    }

    const options = [
        { label: "Delete", fun: deleteMessage },
    ]

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event?.currentTarget)

    const handleClose = () => setAnchorEl(null)

    return (
        <>
            <div>
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
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
                    {options.map((option: any, i: number) => (
                        <MenuItem key={i} onClick={option?.fun}>
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