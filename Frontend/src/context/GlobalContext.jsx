import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';


// Creazione del contesto globale
const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

    // MEMORIZZAZIONE DATI
    const [query, setQuery] = useState('');
    const [products, setProducts] =useState([]);


    //Chiamate api per ricerca 
    const isSearching = (e) =>{
        e.preventDefault(); // Evita il refresh della pagina
        // http://localhost:3000/search/
        axios.get(`http://localhost:3000/search/${query}`)
            .then(((res) => setProducts(res.data)))
            .catch((error) => console.log("Errore nella ricerca:", error));
    }
    

   


    // Valori condivisi nel contesto globale
    const value = {
        setQuery,
        isSearching,
        products
        
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