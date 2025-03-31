import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"

// pages
import HomePage from "../src/pages/HomePage"
import SingleProduct from "../src/pages/SingleProduct"
import ManPage from "./pages/ManPage"
import WomanPage from "./pages/WomanPage"
import SummerPage from "./pages/SummerPage"
import WinterPage from "./pages/WinterPage"

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route Component={DefaultLayout}>
                        <Route path="/" Component={HomePage} />
                        <Route path="/:id" Component={SingleProduct} />
                        <Route path="/man" Component={ManPage} />
                        <Route path="/woman" Component={WomanPage} />
                        <Route path="/summer" Component={SummerPage} />
                        <Route path="/winter" Component={WinterPage} />
                    </Route>
                </Routes>
            </BrowserRouter>

        </>
    )
}

export default App