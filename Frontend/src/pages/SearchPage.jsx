import CategorySection from "../components/CategorySection";
import ResultSearch from "../components/ResultSearch";
import { useGlobalContext } from "../context/GlobalContext";


export default function SearchPage() {

    const { searchProducts } = useGlobalContext();

    return (
        <>
            <h1 className='text-center py-3'>Risultati della ricerca</h1>

            <div className="container-fluid">

                {
                    searchProducts.length > 0 ? (
                        <ResultSearch items={searchProducts} />
                    ) : (
                        <p>Nessun prodotto trovato.</p>
                    )
                }

                <CategorySection />
            </div>


            
        </>
    )
};