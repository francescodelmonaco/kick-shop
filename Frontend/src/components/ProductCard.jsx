import { Link } from "react-router-dom"

export default function ProductCard({ product }) {

    const { id, name, price, gender, brand, slug } = product
    return (
        <div className="card h-100">
            {/* <img src={image} alt={name} /> */}
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p>{brand}</p>
                <p>Prezzo: {price} €</p>
                <p>{gender}</p>
                {/* attendere modifica database per togliere id */}
                <Link to={`/products/${slug}`}>Read More</Link>
            </div>
        </div>
    )
}