import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from 'react-router-dom';

export default function () {

    let navigate = useNavigate();

    const { query, setQuery, handleSubmit } = useGlobalContext();

    return (
        <form className="d-flex px-2" role="search" onSubmit={handleSubmit}>
            {/* search bar */}
            <input
                className="form-control me-2"
                type="text"
                placeholder="Cerca"
                aria-label="Cerca"
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <button
                className="btn btn-outline-light"
                type="submit"
                onClick={() => {
                    navigate(`search`)
                }}
            >Cerca</button>
        </form>
    )
};