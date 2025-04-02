import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ManPage from "./pages/ManPage";
import WomanPage from "./pages/WomanPage";
import SummerPage from "./pages/SummerPage";
import WinterPage from "./pages/WinterPage";
import CartSection from "./components/CartSection";
import Checkout from "./pages/CheckoutPage";

function App() {
    const [cart, setCart] = useState([]);

    // Funzione per aggiungere un prodotto al carrello
    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]); // Aggiunge il prodotto al carrello
    };

    return (
        <>
            <BrowserRouter>
                <CartSection cart={cart} /> {/* Passa il carrello come prop */}
                <Routes>
                    <Route Component={DefaultLayout}>
                        <Route path="/" Component={HomePage} />
                        <Route path="/products/:slug" element={<ProductPage addToCart={addToCart} />} />
                        <Route path="/man" Component={ManPage} />
                        <Route path="/woman" Component={WomanPage} />
                        <Route path="/summer" Component={SummerPage} />
                        <Route path="/winter" Component={WinterPage} />
                        <Route path="/checkout" Component={Checkout} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;