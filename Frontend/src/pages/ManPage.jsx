import axios from 'axios';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function ManPage() {

    // CHIAMATA PRODOTTI UOMO
    const [manProducts, setManProducts] = useState([]);

    // fetch per prodotti
    const fetchProducts = () => {
        // console.log('Fetching products...')

        axios
            .get('http://localhost:3000/products')
            .then((res) => {
                setManProducts(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // rendering prodotti in html
    const renderManProducts = () => {
        return manProducts
            .filter((manProduct) => manProduct.gender === "uomo") // Filtra per genere
            .map((manProduct) => (
                <div className="col g-3 pb-3" key={manProduct.id}>
                    <ProductCard product={manProduct} />
                </div>
            ));
    };

    // invocazione chiamata al caricamento del componente in pagina
    useEffect(fetchProducts, []);

    return (
        <>
            <h1 className="text-center py-3">Man Collection</h1>

            <figure>
                <img src="/src/assets/img/hero-section-2-man.webp" alt="Hero image 2" className="w-100 hero-border" />
            </figure>

            <div className="px-5">
                <div className="row row-cols-lg-4 mb-5">
                    {renderManProducts()}
                </div>
            </div>
        </>
    )
}