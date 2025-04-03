import ProductCard from "../components/ProductCard"

export default function ResultSearch({ items }) {
    return (
        <div className="mb-8">
            <p className="text-gray-400 text-sm mb-4">
                risultati trovati: {items.length}
            </p>
            <ul className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
                {
                    items && items.length > 0 ? (
                        items.map((item) => {
                            console.log(item)

                            return (
                                <>
                                    <div >
                                        <ProductCard key={item.id} product={item} />
                                    </div>
                                </>


                            )
                        })
                    ) : (
                        <p className="text-gray-400">nessun risultato</p>
                    )

                }
            </ul>
        </div>
    )
};