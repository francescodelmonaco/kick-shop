import HeroSection from "../components/HeroSection";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from 'react';
import axios from 'axios';

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
            <h1 className="text-center my-3">Home page</h1>

            <HeroSection />

            <h2 className="text-center my-3">Categorie</h2>

            <ul className="d-flex justify-content-center gap-lg-5 gap-sm-2">
                <li>
                    <Link className="btn btn-outline-primary" to={`/man`}>Uomo</Link>
                    <figure>
                        <img src="/man" alt="" className="w-100" />
                    </figure>
                </li>

                <li>
                    <Link className="btn btn-outline-primary" to={`/woman`}>Donna</Link>
                </li>

                <li>
                    <Link className="btn btn-outline-primary" to={`/summer`}>Estate</Link>
                </li>

                <li>
                    <Link className="btn btn-outline-primary" to={`/winter`}>Inverno</Link>
                </li>
            </ul>

            <h2 className="text-center">Tutta la collezione</h2>

            <div className="mx-5">
                <div className="row row-cols-lg-4">
                    {renderProducts()}
                </div>
            </div>
        </>
    )
}