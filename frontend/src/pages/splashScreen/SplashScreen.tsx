import "./SplashScreen.css"
import logo from "../../assets/logo.png"
import GoogleLogin from "../login/components/GoogleLogin"

export const SmallSplashScreen = ({ showButton }: any) => {
  return (
    <>
      <div className="smallSplashScreen">
        <img src={logo} alt="logo" />
        <h1>Chat App</h1>
        {
          showButton && <GoogleLogin />
        }
      </div>
    </>
  )
}

const SplashScreen = ({ showButton }: any) => {
  return (
    <>
      <div className="splashScreen">
        <img src={logo} alt="logo" />
        <h1>Chat App</h1>
        {
          showButton && <GoogleLogin />
        }
      </div>
    </>
  )
}

export default SplashScreen