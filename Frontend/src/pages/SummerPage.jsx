
import axios from 'axios';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import CategorySection from '../components/CategorySection';

export default function SummerPage() {

    // CHIAMATA PRODOTTI UOMO
    const [summerProducts, setSummerProducts] = useState([]);

    // fetch per prodotti
    const fetchProducts = () => {
        // console.log('Fetching products...')

        axios
            .get('http://localhost:3000/products')
            .then((res) => {
                setSummerProducts(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // rendering prodotti in html
    const renderSummerProducts = () => {
        return summerProducts
            .filter((summerProduct) => summerProduct.season === "estate" || summerProduct.season === "primavera") // Filtra per genere
            .map((summerProduct) => (
                <div className="col-lg-3 col-md-4 col-sm-6 g-3 pb-3" key={summerProduct.id}>
                    <ProductCard product={summerProduct} />
                </div>
            ));
    };

    // invocazione chiamata al caricamento del componente in pagina
    useEffect(fetchProducts, []);

    return (
        <>
            <h1 className="text-center py-3">Collezione Estate</h1>

            <figure>
                <img src="/src/assets/img/hero-summer.webp" alt="Hero image 3" className="w-100 hero-border" />
            </figure>

            <div className="px-5">
                <div className="row row-cols-lg-4 mb-5">
                    {renderSummerProducts()}
                </div>
                <CategorySection />
            </div>
        </>
    )
}