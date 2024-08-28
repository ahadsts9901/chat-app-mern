import "./SplashScreen.css"
import logo from "../../assets/logo.png"

const SplashScreen = () => {
  return (
    <>
      <div className="splashScreen">
        <img src={logo} alt="logo" />
        <h1>Chat App</h1>
      </div>
    </>
  )
}

export default SplashScreen