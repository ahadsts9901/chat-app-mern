export const userNamePattern = /^[a-zA-Z0-9 !@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{2,15}$/;
export const emailPattern = /^[a-zA-Z0-9!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?!.*\s{2})[a-zA-Z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,24}$/;
export const otpPattern = /^[a-zA-Z0-9]{6}$/

export const sessionInDays = 15;
export const _1mbSize = 10000000
export const imageMessageSize = _1mbSize * 5

export const cloudinaryChatFilesFolder = "chat-app-mern-sts/chat-files"
export const profilePictureUploadFolder = "chat-app-mern-sts/profile-pictures"
export const defaultProfilePicture = "https://res.cloudinary.com/do6sd9nyx/image/upload/v1706343891/we-app-nextjs/Assets/profile-picture_ufgahm.png"
export const googleUserApi = "https://www.googleapis.com/oauth2/v3/userinfo"

export const allowedOrigins = "http://localhost:5173"

export let globalIoObject = { io: null }