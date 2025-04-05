import { useGlobalContext } from "../context/GlobalContext";

export default function WishSection() {
    const { wish, addToCart, handleRemoveItem } = useGlobalContext();

    return (
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
                            <li key={index}>
                                <h5>
                                    <strong>{item.name} - € {item.price}</strong>
                                </h5>
                                <button
                                    className="btn btn-success mt-2"
                                    onClick={() => addToCart(item)} // Passa il prodotto corretto alla funzione
                                >
                                    Aggiungi al carrello
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleRemoveItem(index)} // Rimuove l'elemento
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
    );
}