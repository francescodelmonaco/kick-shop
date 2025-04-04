import { Link } from "react-router-dom";
import OrderRecap from "./OrderRecap";

export default function CartSection() {
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

                <OrderRecap />

                <Link className="btn btn-success mx-3 my-3" to={"/checkout"}>Procedi al prossimo step</Link>
            </div>
        </>
    );
}