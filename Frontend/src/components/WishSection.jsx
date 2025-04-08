import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { Link, useNavigate } from "react-router-dom";

export default function WishSection() {
    const { wish, addToCart, handleRemoveItemWish } = useGlobalContext();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const confirmRemove = (productId) => {
        setSelectedProductId(productId);
        setShowModal(true);
    };

    const handleConfirm = () => {
        handleRemoveItemWish(selectedProductId);
        setShowModal(false);
        setSelectedProductId(null);
    };

    const handleCancel = () => {
        setShowModal(false);
        setSelectedProductId(null);
    };

    const handleWishlistNavigation = () => {
        navigate("/wish"); // Naviga alla pagina di wishlist
        window.scrollTo(0, 0); // Scrolla verso l'alto
    };

    return (
        <>
            <div className="offcanvas offcanvas-start" id="offcanvasLeft" aria-labelledby="offcanvasLeftLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasLeftLabel">Prodotti nella Wishlist</h5>
                    <button
                        type="button"
                        className="btn-close btn-outline-danger"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>

                <div className="offcanvas-body">

                    {wish.length > 0 ? (
                        <ul className="list-group">
                            {wish.map((item) => (
                                <li key={item.id} className="list-group-item list-group-item-dark d-flex gap-3 align-items-center" aria-current="true">
                                    {/* Immagine prodotto */}
                                    <img
                                        src={item.images?.[0]?.image_url}
                                        alt={item.name}
                                        style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                                    />

                                    <div className="d-flex flex-column w-100">
                                        <p>
                                            <strong>{item.name} - € {item.price}</strong>
                                        </p>

                                        <div className="d-flex justify-content-between gap-2">
                                            <button
                                                className="btn btn-success w-100"
                                                onClick={() => {
                                                    addToCart(item);
                                                    handleRemoveItemWish(item.id);
                                                }}
                                            >
                                                <i className="fa-solid fa-cart-shopping"></i>
                                            </button>

                                            <button
                                                className="btn btn-primary w-100"
                                                onClick={() => {
                                                    window.scrollTo(0, 0);
                                                    navigate("/wish");
                                                }}
                                                data-bs-dismiss="offcanvas"
                                                aria-label="Close"
                                            >
                                                <i className="fa-solid fa-eye"></i>
                                            </button>

                                            <button
                                                className="btn btn-danger w-100"
                                                onClick={() => confirmRemove(item.id)}
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-muted">
                            <i className="fa-solid fa-heart-broken"></i> La tua wishlist è vuota.
                        </p>
                    )}
                </div>

                <Link
                    type="button"
                    className="btn btn-primary mx-3 my-3"
                    onClick={() => {
                        handleWishlistNavigation()
                    }}
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                >
                    Vai alla tua Wish List
                </Link>
            </div>


            {showModal && selectedProductId && (
                <div className="modal show fade d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Conferma rimozione</h5>
                                <button type="button" className="btn-close" onClick={handleCancel}></button>
                            </div>
                            <div className="modal-body">
                                <p>Sei sicuro di voler rimuovere questo prodotto dalla wishlist?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={handleCancel}>
                                    Annulla
                                </button>
                                <button className="btn btn-danger" onClick={handleConfirm}>
                                    Rimuovi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}