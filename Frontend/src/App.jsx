import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";

// layout
import DefaultLayout from "./layouts/DefaultLayout";

// pages
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ManPage from "./pages/ManPage";
import WomanPage from "./pages/WomanPage";
import SummerPage from "./pages/SummerPage";
import WinterPage from "./pages/WinterPage";
import Checkout from "./pages/CheckoutPage";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";

// components
import CartSection from "./components/CartSection";

function App() {
    return (
        <GlobalProvider>
            <BrowserRouter>
                <CartSection />
                <Routes>
                    <Route Component={DefaultLayout}>
                        <Route path="/" Component={HomePage} />
                        <Route path="/products/:slug" Component={ProductPage} />
                        <Route path="/man" Component={ManPage} />
                        <Route path="/woman" Component={WomanPage} />
                        <Route path="/summer" Component={SummerPage} />
                        <Route path="/winter" Component={WinterPage} />
                        <Route path="/checkout" Component={Checkout} />
                        <Route path="/search" Component={SearchPage} />
                    </Route>
                        <Route path="*" Component={NotFound} />
                </Routes>
            </BrowserRouter>
        </GlobalProvider>
    );
}

export default App;