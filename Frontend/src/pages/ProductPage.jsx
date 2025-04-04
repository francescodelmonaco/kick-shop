import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function ProductPage({ addToCart }) {
    // CHIAMATA SINGOLO PRODOTTO
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

    // CHIAMATA PRODOTTI CORRELATI
    const [relatedProducts, setRelatedProducts] = useState([]);

    // fetch per prodotti
    const fetchProducts = () => {
        // console.log('Fetching products...')

        axios
            .get('http://localhost:3000/products')
            .then((res) => {
                setRelatedProducts(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // rendering prodotti in html
    const renderRelatedProducts = () => {
        return relatedProducts
            .filter((relatedProduct) => relatedProduct.brand === product.brand && relatedProduct.id !== product.id) // Filtra per brand e rimuove il prodotto principale
            .map((relatedProduct) => (
                <div className="col g-3" key={relatedProduct.id}>
                    <ProductCard product={relatedProduct} addToCart={addToCart} />
                </div>
            ));
    };

    // invocazione chiamata al caricamento del componente in pagina
    useEffect(fetchProducts, []);

    // rendering prodotti in html
    const renderProducts = () => {
        const { id, name, description, price, gender, season, brand, sizes, images } = product;
        return (
            <>
                <div key={id} className="container-fluid d-flex flex-xl-row flex-lg-row flex-md-column flex-sm-column flex-column gap-5 py-3">
                    <div id={`carousel-${id}`} className="carousel slide w-50" data-bs-theme="dark">
                        <div className="carousel-inner">
                            {images && images.map((image, index) => {
                                const { id: imageId, image_url } = image;

                                // Aggiungi la classe "active" solo per la prima immagine
                                const className = index === 0 ? 'carousel-item active' : 'carousel-item';

                                return (
                                    <div key={imageId} className={className}>
                                        <figure className="boxImgProduct " >
                                            <img src={image_url} alt={name} className="w-100 mb-3 imgBox" />
                                        </figure>
                                    </div>
                                );
                            })}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${id}`} data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${id}`} data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>


                    <aside className="w-50 d-flex flex-column justify-content-center align-items-start">
                        <hr className="w-100" />
                        {/* <h1>Dettaglio Prodotto</h1> */}
                        <h2>{name}</h2>
                        <p> <strong>Brand: </strong>{brand}</p>
                        <p> <strong>Prezzo: </strong>{price} €</p>
                        <p> <strong>Genere: </strong>{gender}</p>
                        {/* <p>Taglie: {sizes}</p> */}
                        <p> <strong>Stagione: </strong>{season}</p>
                        <p> <strong>Descrizione: </strong>{description}</p>

                        {/* bottone per aggiunta del prodotto al carrello */}
                        <button
                            className="btn btn-success"
                            onClick={() => addToCart(product)}
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight"
                        >
                            Aggiungi al carrello
                        </button>

                        <hr className="w-100" />
                    </aside>
                </div>

                {/* prodotti correlati */}
                <h2 className="text-center my-3">Prodotti correlati</h2>

                <div className="mx-5">
                    <div className="row row-cols-lg-4 mb-5">
                        {renderRelatedProducts()}
                    </div>
                </div>

            </>

        )
    }

    // invocazione chiamata al caricamento del componente in pagina
    useEffect(fetchProduct, [slug])

    return (
        <>
            <div>
                {renderProducts()}
            </div>

        </>
    )
};