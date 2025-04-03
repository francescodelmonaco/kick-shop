import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard";
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
            <h1 className="text-center py-3">Kick Shop</h1>

            <HeroSection />

            {/* categorie */}
            <h2 className="text-center py-3">Categorie</h2>

            <div className="container-fluid">
                <ul className="row">
                    <li className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                        <Link className="w-100 position-relative" to={`/man`}>
                            <figure className="categoryCard">
                                <img src="/src/assets/img/man.jpg" alt="Man category" className="w-100 imgBox" />
                            </figure>

                            <button className="btn btn-light position-absolute start-0 bottom-0 ms-3 mb-3 fs-4">Uomo</button>
                        </Link>

                    </li>

                    <li className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                        <Link className="w-100 position-relative" to={`/woman`}>
                            <figure className="categoryCard">
                                <img src="/src/assets/img/woman.jpg" alt="Man category" className="w-100 imgBox" />
                            </figure>

                            <button className="btn btn-light position-absolute start-0 bottom-0 ms-3 mb-3 fs-4">Donna</button>
                        </Link>
                    </li>

                    <li className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                        <Link className="w-100 position-relative" to={`/summer`}>
                            <figure className="categoryCard">
                                <img src="/src/assets/img/summer.jpg" alt="Man category" className="w-100 imgBox" />
                            </figure>

                            <button className="btn btn-light position-absolute start-0 bottom-0 ms-3 mb-3 fs-4">Estate</button>
                        </Link>
                    </li>

                    <li className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                        <Link className="w-100 position-relative" to={`/winter`}>
                            <figure className="categoryCard" >
                                <img src="/src/assets/img/winter.jpg" alt="Man category" className="w-100 imgBox" />
                            </figure>

                            <button className="btn btn-light position-absolute start-0 bottom-0 ms-3 mb-3 fs-4">Inverno</button>
                        </Link>
                    </li>
                </ul>
            </div>

            {/* <h2 className="text-center">Tutta la collezione</h2>

<div className="mx-5 mb-5">
<div className="row row-cols-lg-4">
{renderProducts()}
</div>
</div> */}
        </>
    )
}