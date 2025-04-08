import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate, Link, useParams } from "react-router-dom";

export default function WishRecap() {

    const { slug } = useParams();

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

    return (
        <>
            <div className="offcanvas-body">
                {wish.length > 0 ? (
                    <ul className="list-group">
                        {wish.map((item) => (
                            <li key={item.id} className="list-group-item list-group-item-dark d-flex gap-3 align-items-center" aria-current="true">
                                {/* Immagine prodotto */}
                                <Link
                                    to={`/products/${item.slug}`}
                                    onClick={window.scrollTo(0, 0)}
                                >
                                    <img
                                        src={item.images?.[0]?.image_url}
                                        alt={item.name}
                                        style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                                    />
                                </Link>

                                <div className="d-flex flex-column w-100">
                                    <p>
                                        <strong>{item.name} - € {item.price}</strong>
                                    </p>

                                    <div className="d-flex justify-content-between gap-3">
                                        <button
                                            className="btn btn-success w-100"
                                            onClick={() => {
                                                addToCart(item);
                                                handleRemoveItemWish(item.id);
                                            }}
                                        >
                                            <i className="fa-solid fa-cart-shopping"></i>
                                        </button>

                                        <Link
                                            type="button"
                                            className="btn btn-primary w-100"
                                            to={`/products/${item.slug}`}
                                            onClick={window.scrollTo(0, 0)}
                                        // data-bs-dismiss="offcanvas"
                                        // aria-label="Close"
                                        >
                                            <i className="fa-solid fa-eye"></i>
                                        </Link>

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

            {
                showModal && selectedProductId && (
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
                )
            }
        </>
    )
};