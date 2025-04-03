import { Link, NavLink } from "react-router-dom";


export default function Header() {
    return (

        <header>

            <nav className="navbar navbar-expand-lg bg-body-">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={`/`}>
                        <img className="img-fluid rounded" width="60px" src="/src/assets/img/logo.png" alt="Logo Kick Shop" />
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link text-light" aria-current="page" to={`/`}>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-light" aria-current="page" to={`/man`}>Uomo</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-light" aria-current="page" to={`/woman`}>Donna</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-light" aria-current="page" to={`/summer`}>Estate</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-light" aria-current="page" to={`/winter`}>Inverno</NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <NavLink className="nav-link text-light" aria-current="page" to={`/cart`}>Carrello</NavLink>
                            </li> */}
                        </ul>

                        <form className="d-flex px-2" role="search">
                            <button
                                className="btn btn-outline-light me-2"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight"
                                aria-controls="offcanvasRight"
                            >
                            <i class="fa-solid fa-cart-shopping"></i>
                            </button>
                            <button
                                    className="btn btn-outline-light me-2"
                                    type="button"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasRight"
                                    aria-controls="offcanvasRight"
                                    style={{
                                        transition: "background-color 0.3s, color 0.3s", // Per un effetto più fluido
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = "red";
                                        e.target.style.color = "white";
                                        e.target.style.borderColor = "red";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = "";
                                        e.target.style.color = "";
                                        e.target.style.borderColor = "";
                                    }}
                                >
                                    <i className="fa-solid fa-heart"></i>
                            </button>
                            <input className="form-control me-2" type="search" placeholder="Cerca" aria-label="Cerca" />
                            <button className="btn btn-outline-light" type="submit">Cerca</button>
                        </form>
                    </div>

                </div>
            </nav>

        </header>
    )
}