import HeroSection from "../components/HeroSection";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function HomePage() {
    const [products, setProduct] = useState([]);

    // fetch per prodotti
    const fetchProducts = () => {
        console.log('Fetching products...')

        axios
            .get('http://localhost:3000/products')
            .then((res) => {
                setProduct(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }


    // rendering prodotti in html
    const renderProducts = () => {
        return products.map((product) => {
            return (
                <div className="col" key={product.id}>
                    <ProductCard product={product} />
                </div>
            )
        })
    }

    //Invocazione chiamata al caricamento del componente in pagina
    useEffect(fetchBooks, []);

    return (
        <>
            <h1 className="text-center my-3">Home page</h1>

            <HeroSection />

            <h2 className="text-center my-3">Categorie</h2>

            <ul className="d-flex justify-content-center gap-5">

                <li>
                    <Link class="btn btn-outline-light" to={`/man`}>Uomo</Link>
                    <figure>
                        <img src="/man" alt="" className="w-100" />
                    </figure>
                </li>
                <li>
                    <Link class="btn btn-outline-light" to={`/woman`}>Donna</Link>
                </li>
                <li>
                    <Link class="btn btn-outline-light" to={`/summer`}>Esatate</Link>
                </li>
                <li>
                    <Link class="btn btn-outline-light" to={`/winter`}>Inverno</Link>
                </li>
            </ul>


            <h2>Tutta la collezione</h2>
            <div className="row row-cols-3">
                {renderProducts()}
            </div>
        </>
    )
}