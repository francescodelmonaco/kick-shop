import { Link, NavLink } from "react-router-dom";

import Search from "./Search";

export default function Header() {

    return (

        <header>
            <nav className="navbar navbar-expand-lg bg-body-">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={`/`}>
                        <img className="img-fluid rounded" width="60px" src="/src/assets/img/1743723519052.jpg" alt="Logo Kick Shop" />
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "border-bottom" : "text-light"}`
                                    }
                                    aria-current="page"
                                    to={`/`}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "border-bottom" : "text-light"}`
                                    }
                                    aria-current="page"
                                    to={`/man`}
                                >
                                    Uomo
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "border-bottom" : "text-light"}`
                                    }
                                    aria-current="page"
                                    to={`/woman`}
                                >
                                    Donna
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "border-bottom" : "text-light"}`
                                    }
                                    aria-current="page"
                                    to={`/summer`}
                                >
                                    Estate
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "border-bottom" : "text-light"}`
                                    }
                                    aria-current="page"
                                    to={`/winter`}
                                >
                                    Inverno
                                </NavLink>
                            </li>
                        </ul>
                        {/* carrello */}
                        <button
                            className="btn btn-outline-light me-2 mb-2"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight"
                        >
                            <i className="fa-solid fa-cart-shopping"></i>
                        </button>

                        {/* whishlist */}
                        <button
                            className="btn btn-outline-light me-2 mb-2"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight"
                            style={{
                                transition: "background-color 0.3s, color 0.3s", 
                            }}
                        >
                            <i
                                className="fa-solid fa-heart"
                                style={{
                                    transition: "color 0.3s", // Transizione fluida per il colore
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.color = "red"; // Cambia il colore del cuoricino
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = ""; // Ripristina il colore originale
                                }}
                            ></i>
                        </button>
                        <Search />
                    </div>
                </div>
            </nav>
        </header>
    )
}