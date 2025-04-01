import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"

// pages
import HomePage from "../src/pages/HomePage"
import ProductPage from "./pages/ProductPage"
import ManPage from "./pages/ManPage"
import WomanPage from "./pages/WomanPage"
import SummerPage from "./pages/SummerPage"
import WinterPage from "./pages/WinterPage"
import CartPage from "./pages/CartPage"

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route Component={DefaultLayout}>
                        <Route path="/" Component={HomePage} />
                        <Route path="/products/:slug" Component={ProductPage} />
                        <Route path="/man" Component={ManPage} />
                        <Route path="/woman" Component={WomanPage} />
                        <Route path="/summer" Component={SummerPage} />
                        <Route path="/winter" Component={WinterPage} />
                        <Route path="/cart" Component={CartPage} />
                    </Route>
                </Routes>
            </BrowserRouter>

        </>
    )
}

export default App