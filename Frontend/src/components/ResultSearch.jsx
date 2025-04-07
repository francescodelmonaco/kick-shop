import { useGlobalContext } from "../context/GlobalContext";
import ProductCard from "./ProductCard";
import FilterButton from "./FilterButton";
import FilterSection from "./FilterSection";

export default function ResultSearch({ items }) {
    const { setFilterItems, filteredItems, viewMode } = useGlobalContext();

    return (
        <div className="px-5 pb-3">
            <div className="d-flex justify-content-between align-items-center py-2">
                <p className="text-gray-400 text-sm mb-0">
                    Prodotti trovati: {items.length}
                </p>

                <div className="d-flex align-items-center gap-2">
                    <FilterButton filter={setFilterItems} />

                    <FilterSection />
                </div>

            </div>

            <div className={viewMode === "grid" ? "row row-cols-lg-4" : "row"}>
                {filteredItems && filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <div
                            className={viewMode === "grid" ? "col-lg-3 col-md-4 col-sm-6 g-3" : "col-12 py-3"}
                            key={item.id}>
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