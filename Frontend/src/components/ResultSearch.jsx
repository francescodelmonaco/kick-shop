import ProductCard from "../components/ProductCard"

export default function ResultSearch({ items }) {
    return (
        <div className="px-5 pb-3">
            <div className="d-flex justify-content-between">
                <p className="text-gray-400 text-sm">
                    Prodotti trovati: {items.length}
                </p>

                <div class="dropdown">
                    <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Filtra per
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Nome</a></li>
                        <li><a class="dropdown-item" href="#">Prezzo</a></li>
                    </ul>
                </div>
            </div>

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