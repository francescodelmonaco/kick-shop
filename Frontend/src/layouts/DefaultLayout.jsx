import FootballCollection from "../components/FootballCollection";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
// import BannerScroll from "../components/BannerScroll";

export default function DefaultLayout() {
    return (
        <>
            {/* <BannerScroll/> */}

            {/* Header principale sotto la barra di scorrimento */}
            <Header />

            <main>
                {/* Questo è il contenuto dinamico delle rotte */}
                <Outlet />
                <FootballCollection />
            </main>

            <footer>
                <Footer />
            </footer>
        </>
    );
}
