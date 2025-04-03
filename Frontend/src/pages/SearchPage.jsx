import ResultSearch from "../components/ResultSearch";
import { useGlobalContext } from "../context/GlobalContext";

export default function SearchPage() {

    const { products } = useGlobalContext();

    return (
        <>
            <h1 className='text-center py-3'>Risultati della ricerca</h1>
            <div className="mx-5">
                <div className="row row-cols-lg-4 mb-5">

                    {products.length > 0 ? (
                    
                        <ResultSearch items={products} />
                    ) : (
                        <p>Loading...</p>
                    )}

                </div>
            </div>
        </>
    )
};