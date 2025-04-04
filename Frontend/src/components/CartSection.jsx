import { Link } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useGlobalContext } from "../context/GlobalContext";

export default function CartSection() {
    
    const { cart, handleQuantityChange, handleRemoveItem, total } = useGlobalContext();
    
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
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleRemoveItem(index)} // Rimuove l'elemento
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>


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