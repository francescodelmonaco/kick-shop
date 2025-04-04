import { useGlobalContext } from "../context/GlobalContext";
import ProductCard from "./ProductCard";
import FilterButton from "./FilterButton";

export default function ResultSearch({ items }) {
    const { setFilterItems, filteredItems } = useGlobalContext();

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