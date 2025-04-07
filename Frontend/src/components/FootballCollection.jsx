import { Link } from "react-router-dom";
import bunnerballs from "../assets/img/bunner-balls.webp";

export default function FootballCollection() {
    return (
        <>
            <Link
                className="w-100 position-relative d-block"
                onClick={() => window.scrollTo(0, 0)}
                to={`/ballon`}
            >
                <figure className="categoryCard w-100 mb-4">
                    <img src={bunnerballs} alt="Ball category" className="w-100" />
                </figure>
                <button
                    className="btn footer-button category-button position-absolute start-50 bottom-0 ms-3 mb-3 fs-4 d-none d-lg-block"
                    style={{ zIndex: 10 }}
                >
                    Palloni da Collezione
                </button>
            </Link>
        </>
    );
}