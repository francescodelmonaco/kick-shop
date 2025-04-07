import { useGlobalContext } from "../context/GlobalContext";

export default function ListProductCard({ product }) {
    const { addToCart, addToWish } = useGlobalContext();

    const { id, name, price, images } = product;

    return (
        <div key={id}>
            <div className="card">
                <div className="row p-4">
                    <div id={`carousel-${id}`} className="col-md-5 d-flex gap-3" data-bs-theme="dark">
                        {images && images.map((image) => {
                            const { id: imageId, image_url } = image;

                            return (
                                <figure className="imgBox-dimension" key={imageId}>
                                    <img src={image_url} alt={name} className="w-100 effectCard imgBox" />
                                </figure>
                            );
                        })}
                    </div>

                    {/* info prodotto */}
                    <div className="col-md-7 d-flex align-items-center">
                        <div className="card-body">
                            <div className="d-flex justify-content-between pb-5">
                                <h5 className="card-title fs-2">{name}</h5>
                                <h5 className="card-text price fs-2"><strong>€ {price}</strong></h5>
                            </div>

                            <div className="d-flex justify-content-between gap-5">
                                {/* bottone per aggiunta del prodotto alla whishlist */}
                                <button
                                    className="btn btn-primary w-100"
                                    onClick={() => addToWish(product)} // Aggiunge il prodotto alla wishlist
                                    type="button"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasLeft" // ID della canvas
                                    aria-controls="offcanvasLeft"
                                >
                                    <i className="fa-solid fa-heart"></i>
                                </button>
                                {/* bottone per aggiunta del prodotto al carrello */}
                                <button
                                    className="btn btn-success w-100"
                                    onClick={() => addToCart(product)}
                                    type="button"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasRight"
                                    aria-controls="offcanvasRight"
                                >
                                    <i className="fa-solid fa-cart-shopping"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}