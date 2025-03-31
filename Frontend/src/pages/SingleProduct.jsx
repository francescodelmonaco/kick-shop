import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SingleProduct() {

    const { slug } = useParams();
    const [product, setProduct] = useState([]);

    // fetch per prodotti
    const fetchProduct = () => {
        // console.log('Fetching products...')

        axios
            .get(`http://localhost:3000/products/${slug}`)
            .then((res) => {
                setProduct(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // rendering prodotti in html
    const renderProducts = () => {
        return (
            <>
                <h1 className="text-center my-3">Product name</h1>
                <ProductCard product={product} />
            </>
        )
    }

    // invocazione chiamata al caricamento del componente in pagina
    useEffect(fetchProduct, [slug])

    return (
        <>
            <div className="container-fluid">
                {renderProducts()}
            </div>
        </>
    )
};