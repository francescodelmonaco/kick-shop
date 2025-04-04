import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    // Initial form data
    const initialData = {
        userName: '',
        userSurname: '',
        userEmail: '',
        addressShipping: '',
        addressInvoice: '',
        telephone: '',
        city: '',
        province: '',
    }

    // Memorizza dati
    const [query, setQuery] = useState('');
    const [searchProducts, setSearchProducts] = useState([]);


    const [formData, setFormData] = useState(initialData);
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [quantities, setQuantities] = useState([]);
    const [total, setTotal] = useState(0);



    const handleSubmit = (e) => {
        e.preventDefault(); // Evita il refresh della pagina
        // http://localhost:3000/search/
        axios.get(`http://localhost:3000/search/${query}`)
            .then(((res) => setSearchProducts(res.data)))
            .catch((error) => console.log("Errore nella ricerca:", error));
        setQuery(""); // svuota search bar

    }



    // FILTRO
    const [filterItems, setFilterItems] = useState("");

    // Funzione filtri
    const filters = () => {
        if (filterItems === "name-asc") {
            searchProducts.sort((a, b) => a.name.localeCompare(b.name)); // Ordina per nome A-Z
        } else if (filterItems === "name-desc") {
            searchProducts.sort((a, b) => b.name.localeCompare(a.name)); // Ordina per nome Z-A
        } else if (filterItems === "price-asc") {
            searchProducts.sort((a, b) => a.price - b.price); // Ordina per prezzo crescente
        } else if (filterItems === "price-desc") {
            searchProducts.sort((a, b) => b.price - a.price); // Ordina per prezzo decrescente
        }

        return searchProducts;
    };

    const filteredItems = filters(); // Ottieni i prodotti filtrati





    // Valori condivisi nel contesto globale
    // Cart related effects and functions
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        setQuantities((prevQuantities) => {
            return cart.map((_, index) => prevQuantities[index] || 1);
        });
    }, [cart]);


    useEffect(() => {
        const newTotal = cart.reduce((acc, item, index) => {
            return acc + item.price * (quantities[index] || 1);
        }, 0);
        setTotal(newTotal);
    }, [quantities, cart]);

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };


    const handleQuantityChange = (index, value) => {
        const updatedQuantities = [...quantities];
        updatedQuantities[index] = parseInt(value);
        setQuantities(updatedQuantities);
    };

    const handleRemoveItem = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
    };

    const setFieldValue = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const submitCheckout = (e) => {
        e.preventDefault();
        if (!formData.userEmail || !formData.userName) {
            alert("Compila tutti i campi obbligatori!");
            return;
        }

        const cartWithQuantities = cart.map((item, index) => ({
            id_product: item.id,  // recuperato dal carrello
            quantity: quantities[index] || 1  // scelto dall'utente nel carrello
        }));



        const dataToSend = {
            ...formData,
            carts: cartWithQuantities
        };

        axios.post('http://localhost:3000/checkout', dataToSend, {
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => {
                alert("Ordine completato con successo!");
                setCart([]);
                setFormData(initialData);
            })
            .catch((err) => {
                alert(err.response?.data?.error || "Errore durante l'invio dell'ordine");
            });
    };

    const value = {
        query,
        setQuery,
        handleSubmit,
        searchProducts,
        submitCheckout,
        formData,
        setFieldValue,
        setFilterItems,
        filteredItems,
        cart,
        setCart,
        addToCart,
        quantities,
        handleQuantityChange,
        handleRemoveItem,
        total
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };