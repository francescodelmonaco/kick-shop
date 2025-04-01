import connection from "../data/db.js"

function storeOrder(req, res) {
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
  
    connection.query(sql, [userName, userSurname, userEmail, addressShipping, addressInvoice, telephone, city, province], (err, results) => {
      if (err) {
        return res.status(500).json({
          error: 'Errore nel database',
          details: err.message
        });
      }
      res.status(201).json({
        status: "success",
        message: "Ordine aggiunto con successo",
        orderId: results.insertId
      });
    });
  }
export default storeOrder;  