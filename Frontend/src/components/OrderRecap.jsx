import { useGlobalContext } from "../context/GlobalContext";
import Badge from "react-bootstrap/Badge";
import QuantityCounter from "./ QuantityCounter";
import { useEffect } from "react";
import { NavLink } from "react-router-dom"; // Per il pulsante che rimanda a BallonPage

export default function OrderRecap() {
  const { cart, handleQuantityChange, handleRemoveItem, quantities } = useGlobalContext();

  // Calcola il totale dei prodotti (solo quelli disponibili)
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const quantity = quantities[i] || 1;
    if (item.availability > 0) {
      total += item.price * quantity;
    }
  }

  // Calcola il costo di spedizione lato front-end:
  // Se il totale supera 200 €, la spedizione è gratuita, altrimenti costa 25 €
  const computedShippingCost = total > 0 ? (total > 200 ? 0 : 25) : 0;
  const grandTotal = total + computedShippingCost;

  useEffect(() => {
    console.log("Shipping cost has changed:", computedShippingCost);
    console.log("Total without shipping:", total);
  }, [computedShippingCost, total]);

  return (
    <div className="offcanvas-body">
      {cart.length === 0 ? (
        <p>Il carrello è vuoto.</p>
      ) : (
        <ul className="list-group">
          {cart.map((item, index) => (
            <li
              key={index}
              className="list-group-item list-group-item-dark d-flex justify-content-between align-items-center gap-3"
              aria-current="true"
            >
              {/* Immagine prodotto */}
              <img
                src={item.images?.[0]?.image_url}
                alt={item.name}
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
  
              {/* Informazioni e badge */}
              <div className="d-flex flex-column flex-grow-1">
                <p className="mb-1">
                  <strong>{item.name}</strong> - {item.price} €
                </p>
                {item.availability === 0 && (
                  <Badge bg="warning" text="dark">
                    Non disponibile
                  </Badge>
                )}
              </div>
  
              {/* Counter + trash */}
              <div className="d-flex gap-2 align-items-center">
                {item.availability > 0 ? (
                  <QuantityCounter
                    index={index}
                    quantity={quantities[index] || 1}
                    onQuantityChange={handleQuantityChange}
                    maxQuantity={item.availability}
                  />
                ) : (
                  <span className="text-muted">Prodotto esaurito</span>
                )}
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveItem(index)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
  
      {/* Se ci sono prodotti nel carrello, mostra il costo di spedizione e il totale */}
      {cart.length > 0 && (
        <div>
          <div className="input-group pt-3 d-flex justify-content-end">
            <span className="input-group-text">
              <strong>Costo di spedizione : </strong>
            </span>
            <Badge className="bg-warning">
              <h5>
                <strong>{computedShippingCost} €</strong>
              </h5>
            </Badge>
          </div>
  
          {/* Totale dei prodotti */}
          <div className="input-group pt-3 d-flex justify-content-end">
            <span className="input-group-text">
              <strong>Totale Prodotti : </strong>
            </span>
            <Badge className="bg-info">
              <h5>
                <strong>{total.toFixed(2)} €</strong>
              </h5>
            </Badge>
          </div>
  
          {/* Pop-up condizionali sotto il totale */}
          {total < 200 ? (
            // Se il totale è inferiore a 200€
            <div className="alert alert-warning mt-3" role="alert">
              Guarda, ti mancano <strong>{(200 - total).toFixed(2)} €</strong> per raggiungere la
              spedizione gratuita. Dai un'occhiata a{" "}
              <NavLink to="/ballon" className="btn btn-link p-0 align-baseline">
                Palloni
              </NavLink>{" "}
              per trovare qualcosa che ti piaccia!
            </div>
          ) : (
            // Se il totale è pari o superiore a 200€
            <div className="alert alert-success mt-3" role="alert">
              Benissimo, raggiungendo i 200 € hai ottenuto la spedizione gratuita presso il nostro sito!
            </div>
          )}
  
          {/* Totale sbarrato se la spedizione è gratuita */}
          {total >= 200 && (
            <div className="input-group pt-3 d-flex justify-content-end">
              <span className="input-group-text">
                <strong>Totale con spedizione : </strong>
              </span>
              <Badge className="bg-danger">
                <h5>
                  <strong>
                    <span className="strike-through">
                      {(total + 25).toFixed(2)} €
                    </span>
                  </strong>
                </h5>
              </Badge>
            </div>
          )}
  
          {/* Totale finale */}
          <div className="input-group pt-3 d-flex justify-content-end">
            <span className="input-group-text">
              <strong> TOTALE ORDINE : </strong>
            </span>
            <Badge className={`bg-${computedShippingCost === 0 ? 'success' : 'danger'}`}>
              <h5>
                <strong>{grandTotal.toFixed(2)} €</strong>
              </h5>
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
  
}
