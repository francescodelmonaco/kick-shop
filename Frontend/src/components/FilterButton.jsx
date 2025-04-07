export default function FilterButton({ filter }) {
    return (
        <>
            {/* Dropdown per i filtri */}
            < div className="dropdown" >
                <button
                    className="btn btn-light dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Ordina per
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <button
                            className="dropdown-item"
                            onClick={() => filter("name-asc")}
                        >
                            Nome (A-Z)
                        </button>
                    </li>
                    <li>
                        <button
                            className="dropdown-item"
                            onClick={() => filter("name-desc")}
                        >
                            Nome (Z-A)
                        </button>
                    </li>
                    <li>
                        <button
                            className="dropdown-item"
                            onClick={() => filter("price-asc")}
                        >
                            Prezzo (Crescente)
                        </button>
                    </li>
                    <li>
                        <button
                            className="dropdown-item"
                            onClick={() => filter("price-desc")}
                        >
                            Prezzo (Decrescente)
                        </button>
                    </li>
                </ul>
            </div >
        </>
    )
};