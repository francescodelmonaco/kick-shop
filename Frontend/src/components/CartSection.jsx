import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';

export default function CartSection({ cart = [] }) {
    const [quantities, setQuantities] = useState(cart.map(() => 1)); // Stato per le quantità
    const [total, setTotal] = useState(0); // Stato per il totale

    // Sincronizza quantities con il carrello
    useEffect(() => {
        setQuantities((prevQuantities) => {
            // Aggiungi quantità iniziale (1) per ogni nuovo elemento nel carrello
            const newQuantities = [...prevQuantities];
            while (newQuantities.length < cart.length) {
                newQuantities.push(1);
            }
            return newQuantities;
        });
    }, [cart]);
    // Funzione per aggiornare la quantità di un elemento
    const handleQuantityChange = (index, value) => {
        const updatedQuantities = [...quantities];
        updatedQuantities[index] = parseInt(value);
        setQuantities(updatedQuantities);
    };

    // Calcola il totale ogni volta che le quantità cambiano
    useEffect(() => {
        const newTotal = cart.reduce((acc, item, index) => {
            return acc + item.price * quantities[index] || 1;
        }, 0);
        setTotal(newTotal);
    }, [quantities, cart]);

    return (
        <>
            <div className="offcanvas offcanvas-end" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">
                        Prodotti Carrello
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close">
                    </button>
                </div>
                <div className="offcanvas-body">
                    {cart.length === 0 ? (
                        <p>Il carrello è vuoto.</p>
                    ) : (
                        <ul className="list-group">
                            {cart.map((item, index) => (
                                <li key={index} className="list-group-item list-group-item-dark" aria-current="true">
                                    <strong>{item.name}</strong> - {item.price} €
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Select
                                            defaultValue="1"
                                            className="form-select-sm"
                                            style={{ width: '60px' }}
                                            onChange={(e) => handleQuantityChange(index, e.target.value)}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </Form.Select>
                                    </Form.Group>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="input-group">
                        <span className="input-group-text"><strong>TOTALE : </strong></span>
                        <span className="input-group-text">{total.toFixed(2)} €</span>
                    </div>
                </div>

                <Link className="btn btn-primary mx-3 my-3" to={"/checkout"}>Checkout</Link>
            </div>
        </>
    );
}