import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard";
import axios from 'axios';
import CategorySection from "../components/CategorySection";

export default function HomePage() {
    const [products, setProducts] = useState([]);

    // fetch per prodotti
    const fetchProducts = () => {
        // console.log('Fetching products...')

        axios
            .get('http://localhost:3000/products')
            .then((res) => {
                setProducts(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // rendering prodotti in html
    const renderProducts = () => {
        return products.map((product) => {
            return (
                <div className="col g-3" key={product.id}>
                    <ProductCard product={product} />
                </div>
            )
        })
    }

    // invocazione chiamata al caricamento del componente in pagina
    useEffect(fetchProducts, []);

    return (
        <>
            <h1 className="text-center py-3">Kick Shop</h1>

            <HeroSection />
            <CategorySection />



            {/* <h2 className="text-center">Tutta la collezione</h2>

<div className="mx-5 mb-5">
<div className="row row-cols-lg-4">
{renderProducts()}
</div>
</div> */}
        </>
    )
}