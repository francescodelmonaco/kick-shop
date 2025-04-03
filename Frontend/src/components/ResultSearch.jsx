import { useState } from "react";
import ProductCard from "../components/ProductCard";
import FilterButton from "./FilterButton";

export default function ResultSearch({ items }) {
    const [filterItems, setFilterItems] = useState("");

    // Funzione filtri
    const filters = () => {
        if (filterItems === "name-asc") {
            items.sort((a, b) => a.name.localeCompare(b.name)); // Ordina per nome A-Z
        } else if (filterItems === "name-desc") {
            items.sort((a, b) => b.name.localeCompare(a.name)); // Ordina per nome Z-A
        } else if (filterItems === "price-asc") {
            items.sort((a, b) => a.price - b.price); // Ordina per prezzo crescente
        } else if (filterItems === "price-desc") {
            items.sort((a, b) => b.price - a.price); // Ordina per prezzo decrescente
        }

        return items;
    };

    const filteredItems = filters(); // Ottieni i prodotti filtrati

    return (
        <div className="px-5 pb-3">
            <div className="d-flex justify-content-between align-items-center py-2">
                <p className="text-gray-400 text-sm mb-0">
                    Prodotti trovati: {items.length}
                </p>

                <FilterButton filter={setFilterItems} />
            </div>

            <div className="row row-cols-lg-4 mb-5">
                {filteredItems && filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <div className="col g-3 pb-3" key={item.id}>
                            <ProductCard product={item} />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400">Nessun risultato</p>
                )}
            </div>
        </div>
    );
}