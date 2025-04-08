import { Link, NavLink } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

import Search from "./Search";

export default function Header() {
    const { wish, cart } = useGlobalContext();

    return (
        <header className="fixed-top">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link
                        className="navbar-brand"
                        to={`/`}
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        <img className="img-fluid rounded" width="60px" src="/src/assets/img/logo-kick-shop.png" alt="Logo Kick Shop" />
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "text-light border-bottom" : "text-light"}`
                                    }
                                    to={`/`}
                                    aria-current="page"
                                    onClick={() => window.scrollTo(0, 0)}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "text-light border-bottom" : "text-light"}`
                                    }
                                    aria-current="page"
                                    to={`/man`}
                                    onClick={() => window.scrollTo(0, 0)}
                                >
                                    Uomo
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "text-light border-bottom" : "text-light"}`
                                    }
                                    aria-current="page"
                                    to={`/woman`}
                                    onClick={() => window.scrollTo(0, 0)}
                                >
                                    Donna
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "text-light border-bottom" : "text-light"}`
                                    }
                                    aria-current="page"
                                    to={`/summer`}
                                    onClick={() => window.scrollTo(0, 0)}
                                >
                                    Estate
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "text-light border-bottom" : "text-light"}`
                                    }
                                    aria-current="page"
                                    to={`/winter`}
                                    onClick={() => window.scrollTo(0, 0)}
                                >
                                    Inverno
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "text-light border-bottom" : "text-light"}`
                                    }
                                    aria-current="page"
                                    to={`/ballon`}
                                    onClick={() => window.scrollTo(0, 0)}
                                >
                                    Palloni
                                </NavLink>
                            </li>
                        </ul>


                        {/* Wishlist */}
                        <div className="wishlist-container">
                            <NavLink
                                className=" me-2 mb-3 mb-lg-0"
                                to={`/wish`}
                                style={{
                                    transition: "background-color 0.3s, color 0.3s",
                                }}
                            >
                                <i
                                    className="fa-solid fa-heart custom-heart"
                                    style={{
                                        transition: "color 0.3s",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.color = "red"; // Cambia il colore del cuoricino
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = ""; // Ripristina il colore originale
                                    }}
                                ></i>
                            </NavLink>
                            {wish.length > 0 && (
                                <span className="notification-badge-heart">{wish.length}</span>
                            )}
                        </div>

                        {/* Carrello */}
                        <div className="cart-container">
                            <NavLink
                                className=" me-2 mb-3 mb-lg-0"
                                to={`/checkout`}
                                style={{
                                    transition: "background-color 0.3s, color 0.3s",
                                }}
                            >
                                <i
                                    className="fa-solid fa-cart-shopping custom-cart"
                                    style={{
                                        transition: "color 0.3s",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.color = "green"; // Cambia il colore del cuoricino
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = ""; // Ripristina il colore originale
                                    }}
                                ></i>
                            </NavLink>
                            {cart.length > 0 && (
                                <span className="notification-badge-cart">{cart.length}</span>
                            )}
                        </div>


                        <Search />

                    </div>
                </div>
            </nav >
        </header >
    );
}