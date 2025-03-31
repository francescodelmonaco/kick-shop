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
        const { id, name, description, price, gender, season, brand } = product;
        return (
            <>
                <figure>
                    <img src="/puma-carbon.jpg" alt={name} />
                </figure>

                <aside>
                    <h2>{name}</h2>
                    <p>{brand}</p>
                    <p>Descrizione: {description}</p>
                    <p>Prezzo: {price} €</p>
                    <p>Genere: {gender}</p>
                    <p>Stagione: {season}</p>
                </aside>
            </>
        )
    }

    // invocazione chiamata al caricamento del componente in pagina
    useEffect(fetchProduct, [slug])

    return (
        <>
            <div className="container-fluid d-flex gap-5 my-3">
                {renderProducts()}
            </div>
        </>
    )
};