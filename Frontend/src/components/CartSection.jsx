import { Link } from "react-router-dom";

export default function CartSection({ cart = [] }) {
    return (
        <>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">
                        Prodotti Carrello
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close" >

                    </button>
                </div>
                <div className="offcanvas-body">
                    {cart.length === 0 ? (
                        <p>Il carrello è vuoto.</p>
                    ) : (
                        <ul className="list-group">
                            {cart.map((item, index) => (
                                <li key={index} class="list-group-item list-group-item-dark" aria-current="true">
                                    <strong>{item.name}</strong> - {item.price} €
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <Link className="btn btn-primary mx-3 my-3" to={"/checkout"}>Checkout</Link>
            </div>
        </>
    );
}