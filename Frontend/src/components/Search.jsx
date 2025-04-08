import { useGlobalContext } from "../context/GlobalContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import  { useEffect } from "react";

export default function Search() {
    const { query, setQuery, handleSubmit } = useGlobalContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // Imposta la query dall'URL solo al primo render
    useEffect(() => {
        const queryParam = searchParams.get("q") || "";
        setQuery(queryParam); // Imposta la query iniziale basata sull'URL
    }, [searchParams, setQuery]);

    const handleInputChange = (e) => {
        setQuery(e.target.value); // Cambia il valore del campo di ricerca senza eseguire la ricerca
    };

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevenire il submit standard del form

        // Se la query è vuota, non fare nulla
        if (query.trim() === "") return;

        // Cambia l'URL per riflettere la ricerca
        navigate(`/search?q=${query}`);

        // Esegui la ricerca con il valore della query
        handleSubmit(query); // Chiama la funzione di ricerca nel contesto
    };

    return (
        <form className="d-flex px-2" role="search" onSubmit={handleFormSubmit}>
            <input
                className="form-control me-2"
                type="text"
                placeholder="Cerca"
                aria-label="Cerca"
                value={query}
                onChange={handleInputChange} // Aggiorna la query ma non esegue la ricerca
            />
            <button className="btn btn-outline-light" type="submit">
                Cerca
            </button>
        </form>
    );
}
