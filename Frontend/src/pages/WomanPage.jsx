import axios from 'axios';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import CategorySection from '../components/CategorySection';

export default function WomanPage() {

    // CHIAMATA PRODOTTI donna
    const [womanProducts, setWomanProducts] = useState([]);

    // fetch per prodotti
    const fetchProducts = () => {
        // console.log('Fetching products...')

        axios
            .get('http://localhost:3000/products')
            .then((res) => {
                setWomanProducts(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // rendering prodotti in html
    const renderWomanProducts = () => {
        return womanProducts
            .filter((womanProduct) => womanProduct.gender === "donna") // Filtra per genere
            .map((womanProduct) => (
                <div className="col-lg-3 col-md-4 col-sm-6 g-3 pb-3" key={womanProduct.id}>
                    <ProductCard product={womanProduct} />
                </div>
            ));
    };

    // invocazione chiamata al caricamento del componente in pagina
    useEffect(fetchProducts, []);

    return (
        <>
            <h1 className="text-center py-3">Woman Collection</h1>
            

            <figure>
                <img src="/src/assets/img/hero-woman.webp" alt="Hero image 3" className="w-100 hero-border" />
            </figure>

            <div className="px-5">
                <div className="row row-cols-lg-4 mb-5">
                    {renderWomanProducts()}
                </div>
                <CategorySection />
            </div>
        </>
    )
}