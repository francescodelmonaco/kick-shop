import { Link } from "react-router-dom"


export default function ProductCard({ product }) {

    const { id, name, price, gender, season, brand } = product
    return (
        <>

            <div className="card mb-4">
                {/* <img src={image} alt={name} /> */}
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <span>{price} €</span>
                    <p>{season}</p>
                    <p>{gender}</p>
                    <p>{brand}</p>
                    {/* attendere modifica database per togliere id */}
                    <Link to={`/product/${id}`}>Read More</Link>
                </div>
            </div>

        </>

    )
}