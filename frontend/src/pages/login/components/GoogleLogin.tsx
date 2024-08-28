import "./GoogleLogin.css"
import { Button } from "@mui/material"
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {

    

    return (
        <>
            <Button color="primary" variant="contained" sx={{ padding: "0.5em 1em" }}
            onClick={googleLogin}
            >
                <FcGoogle style={{ width: "2em", height: "2em", marginRight: "0.5em",marginLeft: "-0.3em", background: "#fff", borderRadius: "100px", padding: "0.3em" }} /> Continue With Google
            </Button>
        </>
    )
}

export default GoogleLogin