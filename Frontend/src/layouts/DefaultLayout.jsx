import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DefaultLayout() {
  const location = useLocation();
  const isThankYouPage = location.pathname === "/thankyou";

  return (
    <>
      <Header />
      <main className="bg-light">
        <Outlet />
      </main>
      <Footer className={isThankYouPage ? "fixed-bottom" : ""} />

    </>
  );
}
