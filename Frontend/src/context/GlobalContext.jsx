import axios from 'axios';
import { createContext, useContext, useState } from 'react';


// Creazione del contesto globale
const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

    // RICERCA
    const [query, setQuery] = useState('');
    const [searchProducts, setSearchProducts] = useState([]);


    //Chiamate api per ricerca 
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita il refresh della pagina

        // http://localhost:3000/search/
        axios.get(`http://localhost:3000/search/${query}`)
            .then(((res) => setSearchProducts(res.data)))
            .catch((error) => console.log("Errore nella ricerca:", error));

        setQuery(""); // svuota search bar

    }

    // Valori condivisi nel contesto globale
    const value = {
        query,
        setQuery,
        handleSubmit,
        searchProducts
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

// Hook personalizzato per accedere al contesto globale in altri componenti
const useGlobalContext = () => useContext(GlobalContext);

// Esportazione del GlobalProvider e del custom hook per l'uso nei componenti
export { GlobalProvider, useGlobalContext };