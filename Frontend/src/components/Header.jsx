import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {

    // LOGICA SEARCH BAR
    const [query, setQuery] = useState("");
    const navigate = useNavigate(); // per andare alla pagina di ricerca del prodotto

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(query)
        navigate(`search?query=${query}`);
        setQuery(""); // resetta il contenuto della search bar
    };

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
                        </ul>

                        <form className="d-flex px-2" role="search">
                            <input className="form-control me-2" type="search" placeholder="Cerca" aria-label="Cerca" />
                            <button className="btn btn-outline-light" type="submit">Cerca</button>
                        </form>
                    </div>

                </div>
            </nav>
        </header>
    )
}