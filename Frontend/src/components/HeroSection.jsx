export default function HeroSection() {
    return (
        <div className="position-relative">
            <figure >
                <img src="src/assets/img/hero-section-1.webp" alt="Hero image 1" className="w-100 hero-border" />
            </figure>

            <button className="btn btn-outline-light position-absolute end-0 bottom-0 me-3 mb-3" type="submit">Acquista</button>
        </div>
    )
}