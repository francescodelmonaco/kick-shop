import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useGlobalContext } from "../context/GlobalContext";

export default function OrderRecap() {

    const { cart, handleQuantityChange, handleRemoveItem, quantities, total } = useGlobalContext();

    return (
        <div className="offcanvas-body">
            {cart.length === 0 ? (
                <p>Il carrello è vuoto.</p>
            ) : (
                <ul className="list-group">
                    {cart.map((item, index) => (
                        <li key={index} className="list-group-item list-group-item-dark d-flex justify-content-between" aria-current="true">
                            <p><strong>{item.name}</strong> - {item.price} €</p>

                            <div className='d-flex gap-2'>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Select
                                        value={quantities[index] || 1}
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
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className="input-group pt-3 d-flex justify-content-end">
                <span className="input-group-text"><strong>TOTALE : </strong></span>
                <span className="input-group-text btn btn-outline-success"><strong>{total.toFixed(2)} €</strong></span>
            </div>
        </div>
    )
}