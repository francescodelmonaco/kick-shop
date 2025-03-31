import { Link } from "react-router-dom"

export default function ProductCard({ product }) {

    const { id, name, price, gender, brand, slug } = product
    return (
        <div className="card h-100">
            <Link className="card-body" to={`/products/${slug}`}>
                <figure>
                    <img src="/puma-carbon.jpg" alt={name} className="w-100" />
                </figure>
                <h5 className="card-title">{name}</h5>
                <p>{brand}</p>
                <p>Prezzo: {price} €</p>
                <p>Genere: {gender}</p>

                <div className="d-flex gap-3 justify-content-center ">
                    <Link to={`/products/${slug}`} className="btn btn-outline-primary">Dettagli</Link>
                    <Link to={`/products/${slug}`} className="btn btn-outline-primary">Carrello</Link>
                </div>
            </Link>

        </div>
    )
}