import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";

export default function SearchPage() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("query"); // estrae la query dall'url

    // CHIAMATA A TUTTI I PRODOTTI
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

    // FILTRO PER PRODOTTI CON QUERY NEL NOME DEL PRODOTTO
    const renderQueryProducts = () => {
        const filteredProducts = products.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredProducts.length === 0) {
            return <p className="text-center">Nessun prodotto trovato per "{query}".</p>;
        }

        return filteredProducts.map((product) => (
            <div className="col g-3" key={product.id}>
                <ProductCard product={product} />
            </div>
        ));
    };

    // invocazione chiamata al caricamento del componente in pagina
    useEffect(fetchProducts, []);

    return (
        <>
            <h1 className='text-center py-3'>Risultati della ricerca</h1>

            <div className="mx-5">
                <div className="row row-cols-lg-4 mb-5">
                    {renderQueryProducts()}
                </div>
            </div>
        </>
    )
};