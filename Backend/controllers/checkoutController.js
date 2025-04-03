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
  const productQuantities = carts.map(cart => cart.quantity);

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
      totalPrice += product.price * productQuantities[index];
    });

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
      
      const orderId = results.insertId;

      const productDetailsSql = `SELECT id, name, price FROM products WHERE id IN (?);`;

      connection.query(productDetailsSql, [productIds], (err, orderResults) => {
        if (err) {
          return res.status(500).json({ error: 'Errore nel recupero dei dettagli dei prodotti', details: err.message });
        }

        // Creiamo i dati da inserire in order_product
        const orderProducts = orderResults.map((product, index) => ([
          orderId,                // ID ordine
          product.id,             // ID prodotto
          product.name,           // Nome prodotto
          productQuantities[index], // Quantità
          product.price
        ]));

        console.log(orderProducts)

        const insertOrderProductSql = `
          INSERT INTO order_product (order_id, product_id, name_product, quantity, unit_price) 
          VALUES ?;
        `;

        // Esegue la query per inserire tutti i prodotti dell'ordine
        connection.query(insertOrderProductSql, [orderProducts], (err, orderProductResults) => {
          if (err) {
            return res.status(500).json({
              error: 'Errore nell\'inserimento dei dettagli dell\'ordine',
              details: err.message
            });
          }

          // Risposta di successo solo dopo che tutto è stato completato
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

// Esporta la funzione per essere utilizzata in altri file
export default storeOrder;