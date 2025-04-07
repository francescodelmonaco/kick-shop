import axios from 'axios';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import CategorySection from '../components/CategorySection';
import FilterSection from '../components/FilterSection';
import { useGlobalContext } from '../context/GlobalContext';

export default function ManPage() {
    // Stato per i prodotti
    const [manProducts, setManProducts] = useState([]);

    const { viewMode } = useGlobalContext();

    // Fetch per i prodotti
    const fetchProducts = () => {
        axios
            .get('http://localhost:3000/products')
            .then((res) => {
                setManProducts(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Rendering dei prodotti
    const renderManProducts = () => {
        return manProducts
            .filter((manProduct) => manProduct.gender === "uomo") // Filtra per genere
            .map((manProduct) => (
                <div
                    className={viewMode === "grid" ? "col-lg-3 col-md-4 col-sm-6 g-3" : "col-12 py-3"}
                    key={manProduct.id}
                >
                    <ProductCard product={manProduct} viewMode={viewMode} />
                </div>
            ));
    };

    // Invocazione fetch al caricamento del componente
    useEffect(fetchProducts, []);

    return (
        <>
            <h1 className="text-center py-3">Man Collection</h1>

            <figure>
                <img src="/src/assets/img/hero-man.webp" alt="Hero image 2" className="w-100 hero-border" />
            </figure>

            <div className="px-5">
                <FilterSection />

                <div className={viewMode === "grid" ? "row row-cols-lg-4" : "row"}>
                    {renderManProducts()}
                </div>

                <CategorySection />
            </div>
        </>
    );
}