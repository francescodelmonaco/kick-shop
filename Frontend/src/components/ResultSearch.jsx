import ProductCard from "../components/ProductCard"

export default function ResultSearch({ items }) {
    return (
        <div className="px-5 pb-3">
            <p className="text-gray-400 text-sm mb-4">
                Prodotti trovati: {items.length}
            </p>

            <div className="row row-cols-lg-4 mb-5">

                {
                    items && items.length > 0 ? (
                        items.map((item) => {
                            console.log(item)

                            return (
                                <div className="col g-3 pb-3" key={item.id}>
                                    <ProductCard product={item} />
                                </div>
                            )
                        })
                    ) : (
                        <p className="text-gray-400">Nessun risultato</p>
                    )

                }

            </div>
        </div>
    )
};