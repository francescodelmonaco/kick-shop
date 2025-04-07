import { useGlobalContext } from "../context/GlobalContext";
import Badge from "react-bootstrap/Badge"
import QuantityCounter from './ QuantityCounter';
export default function OrderRecap() {

    const { cart, handleQuantityChange, handleRemoveItem, quantities, total } = useGlobalContext();

    return (
        <div className="offcanvas-body">
            {cart.length === 0 ? (
                <p>Il carrello è vuoto.</p>
            ) : (
                <ul className="list-group">
                    {cart.map((item, index) => (
                        <li key={index} className="list-group-item list-group-item-dark d-flex justify-content-between align-items-center" aria-current="true">
                            <p><strong>{item.name}</strong> - {item.price} €</p>

                            <div className='d-flex gap-2'>
                                <QuantityCounter
                                 index={index}
                                 quantity={quantities[index] || 1}
                                 onQuantityChange={handleQuantityChange}
                                 maxQuantity={item.availability} // ← questo è il limite massimo
                                />

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

                <Badge className='bg-success'>
                    <h5>
                        <strong>
                            {total.toFixed(2)} €
                        </strong>
                    </h5>
                </Badge>
            </div>
        </div>
    )
}
