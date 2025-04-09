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
      <Footer
        className=""
        style={isThankYouPage ? {
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#000",
          color: "#fff",
          zIndex: 9999,
          textAlign: "center"
        } : {}}
      />

    </>
  );
}
