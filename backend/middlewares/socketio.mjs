import cookie from "cookie"
import jwt from "jsonwebtoken"
import { socketUsers } from "../utils/core.mjs";

export const socketIoMiddleware = (socket, next) => {
    const user_cookie = socket.request.headers.cookie
    const parsedCookies = cookie.parse(user_cookie || "");
    try {
        const currentUser = jwt.verify(parsedCookies.hart, process.env.JWT_KEY);
        socketUsers[currentUser._id] = socket;
        socket.on("disconnect", (reason, desc) => {
            console.log("disconnect event: ", reason, desc);
        });
        next();

    } catch (err) {
        return next(new Error('authentication error'));
    }
}