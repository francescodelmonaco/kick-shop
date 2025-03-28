import HeroSection from "../components/HeroSection";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <>
            <h1 className="text-center my-3">Home page</h1>

            <HeroSection />

            <h2 className="text-center my-3">Categorie</h2>

            <ul className="d-flex justify-content-center gap-5">
                <li>
                    <Link class="btn btn-secondary" to={`/man`}>Uomo</Link>
                </li>
                <li>
                    <Link class="btn btn-secondary" to={`/woman`}>Donna</Link>
                </li>
                <li>
                    <button type="button" class="btn btn-secondary">Estate</button>
                </li>
                <li>
                    <button type="button" class="btn btn-secondary">Inverno</button>
                </li>
            </ul>
        </>
    )
}