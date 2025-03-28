
import DefaultLayout from "./layouts/DefaultLayout"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "../src/pages/HomePage"
function App() {


    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route Component={DefaultLayout}>
                        <Route path="/" Component={HomePage} />
                    </Route>
                </Routes>
            </BrowserRouter>

        </>
    )
}

export default App
