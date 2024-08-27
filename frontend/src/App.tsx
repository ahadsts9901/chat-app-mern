import "./App.css"
import { ThemeProvider } from "@emotion/react"
import { theme } from "./utils/theme"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { BrowserRouter } from "react-router-dom"
import Routing from "./Routing"

const App = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Routing />
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    )
}

export default App