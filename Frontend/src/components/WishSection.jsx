import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function WishSection() {
    const { wish, addToCart, handleRemoveItemWish } = useGlobalContext();
    const navigate = useNavigate();

    // Stato per la modale di conferma
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
            <div className="offcanvas offcanvas-start" id="offcanvasLeft" aria-labelledby="offcanvasLeftLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasLeftLabel">Wishlist</h5>
                    <button
                        type="button"
                        className="btn-close btn-outline-danger"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    {wish.length > 0 ? (
                        <ul>
                            {wish.map((item, index) => (
                                <li key={`${item.id}-${index}`} className="mb-4">
                                    <h5>
                                        <strong>{item.name} - € {item.price}</strong>
                                    </h5>
                                    <button
                                        className="btn btn-success"
                                        onClick={() => {
                                            addToCart(item);
                                            handleRemoveItemWish(item.id);
                                        }}
                                    >
                                        <i class="fa-solid fa-cart-shopping"></i>
                                    </button>

                                    <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                            window.scrollTo(0, 0);
                                            navigate("/wish/");
                                        }}
                                        data-bs-dismiss="offcanvas"
                                        aria-label="Close"
                                    >
                                     <i class="fa-solid fa-eye"></i>
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() => confirmRemove(item.id)}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>La tua wishlist è vuota.</p>
                    )}
                </div>
            </div>

            {/* Modale di conferma */}
            {showModal && (
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
