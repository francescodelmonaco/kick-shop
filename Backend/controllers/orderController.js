import connection from "../data/db.js";

// Funzione per memorizzare un nuovo ordine nel database
function storeOrder(req, res) {
    // Estrae i dati dalla richiesta
    const {
      userName,
      userSurname,
      userEmail,
      addressShipping,
      addressInvoice,
      telephone,
      city,
      province
    } = req.body;
  
    // Query SQL per inserire un nuovo ordine
    const sql = `
      INSERT INTO orders (
        user_name, 
        user_surname,
        user_email,
        address_shipping,
        address_invoice,
        telephone,
        city,
        province
      ) VALUES (?,?,?,?,?,?,?,?);
    `;
  
    // Esegue la query con i parametri forniti
    connection.query(sql, [userName, userSurname, userEmail, addressShipping, addressInvoice, telephone, city, province], (err, results) => {
      if (err) {
        return res.status(500).json({
          error: 'Errore nel database',
          details: err.message
        });
      }
      
      // Restituisce una risposta di successo con l'ID dell'ordine
      res.status(201).json({
        status: "success",
        message: "Ordine aggiunto con successo",
        orderId: results.insertId
      });
    });
  }
  
// Esporta la funzione per essere utilizzata in altri file
export default storeOrder;