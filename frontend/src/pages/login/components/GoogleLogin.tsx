import "./GoogleLogin.css"
import "../../../utils/firebase"
import { baseUrl } from "../../../utils/core";
import { login, logout } from "../../../redux/user";
import AlertMui from "../../../mui/AlertMui";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";

const GoogleLogin = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [googleToken, setGoogleToken] = useState<null | string>(null)

    useEffect(() => {
        if (googleToken) googleLogin(googleToken)
    }, [googleToken])

    const getAccessToken = async () => {

        setIsLoading(true)

        await signInWithPopup(auth, googleProvider)
            .then((result) => {
                const credential: any = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                setGoogleToken(token)
                setIsLoading(false)
            }).catch((error) => {
                console.error(error);
                setIsLoading(false)
            });

    }

    const googleLogin = async (token: string) => {

        if (!token) return

        try {

            const resp = await axios.post(`${baseUrl}/api/v1/google-login`, {
                accessToken: `Bearer ${token}`
            }, { withCredentials: true })

            dispatch(login(resp?.data?.data))
            navigate("/")

        } catch (error) {
            console.error(error)
            dispatch(logout())
            setErrorMessage("Error in signing in")
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000);
        }

    }

    return (
        <>
            {errorMessage && <AlertMui status="error" text={errorMessage} />}
            <Button disabled={isLoading} color="primary" variant="contained"
                sx={{ padding: "0.5em 1em" }}
                onClick={getAccessToken}
            >
                <FcGoogle style={{ width: "2em", height: "2em", marginRight: "0.5em", marginLeft: "-0.3em", background: "#fff", borderRadius: "100px", padding: "0.3em" }} /> Continue With Google
            </Button>
        </>
    )
}

export default GoogleLogin