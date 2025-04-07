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
    const [wish, setWish] = useState([])

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


    // VISUALIZZAZIONE GRIGLIA - LISTA
    const [viewMode, setViewMode] = useState("grid"); // "grid" o "list"


    // Valori condivisi nel contesto globale

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
        setCart((prevCart) => {
            if (prevCart.some((item) => item.id === product.id)) {
                return prevCart; // Non aggiungere duplicati
            }
            return [...prevCart, product];
        });
    };


    const addToWish = (product) => {
        setWish((prevWish) => {
            if (prevWish.some((item) => item.id === product.id)) {
                return prevWish; // Non aggiungere duplicati
            }
            return [...prevWish, product];
        });
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
    const handleRemoveItemWish = (id) => {
        const itemToRemove = wish.find((item) => item.id === id); // Trova l'elemento da rimuovere
        if (itemToRemove) {
            setWish((prevWish) => prevWish.filter((item) => item.id !== id)); // Rimuove solo il prodotto con l'ID corrispondente
        };
    };

    const setFieldValue = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    //in submitCheckout implemento il navigate affinche una volta inviato il form si possa navigare alla thankyou page

    const submitCheckout = (e, navigate) => {
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
                navigate("/thankyou")
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
        addToWish,
        quantities,
        handleQuantityChange,
        handleRemoveItem,
        handleRemoveItemWish,
        setQuantities,
        total,
        setTotal,
        wish,
        viewMode,
        setViewMode,
       
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };