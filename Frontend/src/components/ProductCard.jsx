import { Link } from "react-router-dom";

export default function ProductCard({ product, addToCart }) {
    const { id, name, price, season, gender, brand, slug, images } = product;

    return (
        <div className="card h-100" key={id}>
            <Link className="card-body" to={`/products/${slug}`}
                onClick={() => window.scrollTo(0, 0)} // Riporta lo scroll all'inizio della pagina
            >
                <div id={`carousel-${id}`} className="carousel slide" data-bs-theme="dark">
                    <div className="carousel-inner cardBox position-relative">
                        {/* Icona del cuore */}
                        <i
                            className="fa-solid fa-heart  heart-icon"
                            style={{
                                top: "10px",
                                right: "10px",
                                color: "gray",
                                fontSize: "1.5rem",
                                cursor: "pointer",
                                zIndex: 10,
                                transition: "color 0.3s",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.color = "red";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = "gray";
                            }}
                        ></i>

                        {/* Icona del carrello */}
                        <i className="fa-solid fa-cart-shopping cart-icon"
                            type="button"
                            onClick={() => addToCart(product)}
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight"// Chiama la funzione addToCart con il prodotto
                        >

                        </i>


                        {/* Carousel delle immagini */}
                        {images &&
                            images.reverse().map((image, index) => {
                                const { id, image_url } = image;

                                // Aggiungi la classe "active" solo per la prima immagine
                                const className = index === 0 ? "carousel-item active" : "carousel-item";

                                return (
                                    <div key={id} className={className}>
                                        <img src={image_url} alt={name} className="w-100 mb-3 effectCard imgBox" />
                                    </div>
                                );
                            })}
                    </div>

                    {/* Controlli del carousel */}
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target={`#carousel-${id}`}
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target={`#carousel-${id}`}
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

                {/* Dettagli del prodotto */}
                <p className="fonts"> <h5 className="card-title"><strong>{name}</strong></h5>{gender}</p>
                <p className="fonts"><strong>a partire da:</strong> <button className="btn btn-outline-success"><strong>€{price}</strong></button></p>

            </Link>
        </div>
    );
}