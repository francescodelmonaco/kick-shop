import { useGlobalContext } from "../context/GlobalContext";
import Badge from "react-bootstrap/Badge";
import QuantityCounter from './ QuantityCounter';
import { useState } from 'react';
import ConfirmationModal from "./ConfirmationModal";
import { NavLink } from "react-router-dom";

export default function OrderRecap() {
    const { cart, handleQuantityChange, handleRemoveItem, quantities } = useGlobalContext();

    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const ShippingCost = 25; // Costo fisso di spedizione

    const confirmRemove = (index) => {
        setSelectedIndex(index);
        setShowModal(true);
    };

    const handleConfirm = () => {
        handleRemoveItem(selectedIndex);
        setShowModal(false);
        setSelectedIndex(null);
    };

    const handleCancel = () => {
        setShowModal(false);
        setSelectedIndex(null);
    };

    // Calcolare il totale escludendo i prodotti non disponibili
    const subtotal = cart.reduce((acc, item, index) => {
        if (item.availability > 0) {
            acc += item.price * (quantities[index] || 1);
        }
        return acc;
    }, 0);

    // Calcolare il totale con il costo di spedizione
    const total = subtotal + ShippingCost;

    // Calcolare il nuovo totale se il totale supera i 200€
    const newTotal = total >= 200 ? subtotal : total;

    // Funzione per mostrare il messaggio di spedizione gratuita
    const freeShipping = () => {
        if (subtotal >= 200) {
            return (
                <div className="alert alert-success mt-3">
                    🎉 Spedizione gratuita per ordini superiori a 200€!
                </div>
            );
        } else {
            const amountLeft = (200 - subtotal).toFixed(2);
            return (
                <div className="alert alert-warning mt-3">
                    Mancano <strong>{amountLeft}€</strong> per ottenere la spedizione gratuita. Potrebbe interressarti:
                    <NavLink
                        aria-current="page"
                        to={`/ballon`}
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        <button
                            className="btn btn-outline-primary"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        >
                            Palloni
                        </button>
                    </NavLink>
                    da collezione.
                </div>
            );
        }
    };

    return (
        <div className="offcanvas-body">
            {cart.length === 0 ? (
                <p>Il carrello è vuoto.</p>
            ) : (
                <ul className="list-group">
                    {cart.map((item, index) => (
                        <li key={index} className="list-group-item list-group-item-dark d-flex justify-content-between align-items-center gap-3" aria-current="true">
                            {/* Immagine prodotto */}
                            <img
                                src={item.images?.[0]?.image_url}
                                alt={item.name}
                                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                            />

                            {/* Info e badge */}
                            <div className="d-flex flex-column flex-grow-1">
                                <p className="mb-1">
                                    <strong>{item.name}</strong> - {item.price} €
                                </p>

                                {item.availability === 0 && (
                                    <Badge bg="warning" text="dark">Non disponibile</Badge>
                                )}
                            </div>

                            {/* Counter + trash */}
                            <div className='d-flex gap-2 align-items-center'>
                                {item.availability > 0 ? (
                                    <QuantityCounter
                                        index={index}
                                        quantity={quantities[index] || 1}
                                        onQuantityChange={handleQuantityChange}
                                        maxQuantity={item.availability}
                                    />
                                ) : (
                                    <span className="text-muted">Prodotto esaurito</span>
                                )}

                                <button
                                    className="btn btn-danger"
                                    onClick={() => confirmRemove(index)}
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* Costo di spedizione */}
            <div><h5>Costo di spedizione: {ShippingCost}€</h5></div>

            {/* Totale */}
            <div className="input-group pt-3 d-flex justify-content-end">
                <span className="input-group-text"><strong>TOTALE : </strong></span>
                <Badge
                    className={`bg-secondary ${total >= 200 ? "text-decoration-line-through text-danger" : ""}`}
                >
                    <h5>
                        <strong>{total.toFixed(2)} €</strong>
                    </h5>
                </Badge>
            </div>

            {/* Messaggio di spedizione gratuita */}
            {freeShipping()}

            {/* Nuovo totale */}
            <div className="input-group pt-3 d-flex justify-content-end">
                <span className="input-group-text"><strong>PREZZO FINALE: </strong></span>
                <Badge className='bg-success'>
                    <h5>
                        <strong>{newTotal.toFixed(2)} €</strong>
                    </h5>
                </Badge>
            </div>

            {/* Modal di conferma */}
            <ConfirmationModal
                show={showModal}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
                message="Sei sicuro di voler rimuovere questo prodotto dal carrello?"
            />
        </div>
    );
}