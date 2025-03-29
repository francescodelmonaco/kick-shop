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
                    <Link class="btn btn-primary" to={`/man`}>Uomo</Link>
                </li>
                <li>
                    <Link class="btn btn-primary" to={`/woman`}>Donna</Link>
                </li>
                <li>
                    <Link class="btn btn-primary" to={`/summer`}>Esatate</Link>
                </li>
                <li>
                    <Link class="btn btn-primary" to={`/winter`}>Inverno</Link>
                </li>
            </ul>
        </>
    )
}