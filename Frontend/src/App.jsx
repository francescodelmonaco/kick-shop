import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"

// pages
import HomePage from "../src/pages/HomePage"
import SingleProduct from "../src/pages/SingleProduct"
import ManPage from "./pages/ManPage"
import WomanPage from "./pages/WomanPage"

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
                    </Route>
                </Routes>
            </BrowserRouter>

        </>
    )
}

export default App