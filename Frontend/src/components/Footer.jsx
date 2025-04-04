import { Link } from "react-router-dom";
import bunnerballs from "../assets/img/bunner-balls.webp";

export default function Footer() {
    return (
        <>
            <Link className="w-100 position-relative d-block" to={`/man`}>
                <figure className="categoryCard mx-auto mb-0">
                    <img src={bunnerballs} alt="Ball category" className="w-100 imgBox" />
                </figure>
                <button
                    className="btn btn-light position-absolute start-50 translate-middle-x bottom-0 ms-3 mb-3 fs-4"
                    style={{ zIndex: 10 }}
                >
                    Palloni da Collezione
                </button>
            </Link>
        </>
    );
}