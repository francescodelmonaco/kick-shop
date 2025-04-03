import connection from "../data/db.js";

// Funzione per validare il formato dell'email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Funzione per memorizzare un nuovo ordine nel database
function storeOrder(req, res) {
  const {
    userName,
    userSurname,
    userEmail,
    addressShipping,
    addressInvoice,
    telephone,
    city,
    province,
    carts
  } = req.body;

  if (!isValidEmail(userEmail)) {
    return res.status(400).json({
      error: "Email non valida",
      details: "Inserire un indirizzo email valido"
    });
  }

  const productIds = carts.map(cart => cart.id_product);
  const productQuantities = carts.map(cart => cart.quantity);

  const verifyAvailabilitySql = `SELECT id, availability, name FROM products WHERE id IN (?);`;

  connection.query(verifyAvailabilitySql, [productIds], (err, availabilityResults) => {
    if (err) {
      return res.status(500).json({
        error: "Errore nel verificare la disponibilità del prodotto",
        details: err.message
      });
    }

    let outOfStock = false;
    for (let i = 0; i < availabilityResults.length; i++) {
      if (availabilityResults[i].availability < productQuantities[i]) {
        return res.status(400).json({
          error: `La quantità richiesta per il prodotto ${availabilityResults[i].name} supera la disponibilità (${availabilityResults[i].availability} disponibili)`
        });
      }
    }

    // Se arriviamo qui, significa che tutti i prodotti sono disponibili
    const priceProductSql = `SELECT * FROM products WHERE id IN (?);`;

    connection.query(priceProductSql, [productIds], (err, priceResults) => {
      if (err) {
        return res.status(500).json({
          error: "Errore nel recupero dei prezzi",
          details: err.message
        });
      }

      let totalPrice = 0;
      priceResults.forEach((product, index) => {
        totalPrice += product.price * productQuantities[index];
      });

      const insertOrderSql = `
        INSERT INTO orders (
          user_name, user_surname, user_email, address_shipping, address_invoice, 
          telephone, city, province, carts, total
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

      connection.query(insertOrderSql, [
        userName, userSurname, userEmail, addressShipping,
        addressInvoice, telephone, city, province, JSON.stringify(carts), totalPrice
      ], (err, results) => {
        if (err) {
          return res.status(500).json({
            error: "Errore nell'inserimento dell'ordine",
            details: err.message
          });
        }

        const orderId = results.insertId;

        const orderProducts = priceResults.map((product, index) => ([
          orderId,
          product.id,
          product.name,
          productQuantities[index],
          product.price
        ]));
        console.log(orderProducts)

        const insertOrderProductSql = `INSERT INTO order_product (order_id, product_id, name_product, quantity, unit_price) VALUES ?`;

        connection.query(insertOrderProductSql, [orderProducts], (err) => {
          if (err) {
            return res.status(500).json({
              error: "Errore nell'inserimento dei dettagli dell'ordine",
              details: err.message
            });
          }

          res.status(201).json({
            status: "success",
            message: "Ordine aggiunto con successo",
            total: totalPrice
          });
        });
      });
    });
  });
}

export default storeOrder;
