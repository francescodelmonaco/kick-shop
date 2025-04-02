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

  const cartsJson = JSON.stringify(carts);
  const productIds = carts.map(cart => cart.id_product);
  const quantita_prodotto = carts.map(cart => cart.quantity);

  // Query per ottenere i prezzi dei prodotti
  const priceProductsql = `
    SELECT id, price 
    FROM products 
    WHERE id IN (?);
  `;

  connection.query(priceProductsql, [productIds], (err, priceResults) => {
    if (err) {
      return res.status(500).json({
        error: 'Errore nel recupero dei prezzi',
        details: err.message
      });
    }

    // Calcola il prezzo totale
    let totalPrice = 0;
    priceResults.forEach((product, index) => {
      totalPrice += product.price * quantita_prodotto[index];
    });

    const cartsJson = JSON.stringify(carts);
  
    // Validazione email
    if (!isValidEmail(userEmail)) {
      return res.status(400).json({
        error: 'Email non valida',
        details: 'Inserire un indirizzo email valido'
      });
    }
  
    // Query SQL per inserire un nuovo ordine
    const insertOrderSql = `
      INSERT INTO orders (
        user_name, 
        user_surname,
        user_email,
        address_shipping,
        address_invoice,
        telephone,
        city,
        province,
        carts,
        total
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    // Esegue la query di inserimento con il totale già calcolato
    connection.query(insertOrderSql, [
      userName, userSurname, userEmail, addressShipping, 
      addressInvoice, telephone, city, province, cartsJson, totalPrice
    ], (err, results) => {
      if (err) {
        return res.status(500).json({
          error: 'Errore nell inserimento dell ordine',
          details: err.message
        });
      }

      // Restituisce una risposta di successo con l'ID dell'ordine
      res.status(201).json({
        status: "success",
        message: "Ordine aggiunto con successo",
        orderId: results.insertId,
        total: totalPrice
      });
    });
  });
}

// Esporta la funzione per essere utilizzata in altri file
export default storeOrder;
