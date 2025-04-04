import connection from "../data/db.js";



// Funzione visualizzare gli ordini nel database
function index(req, res) {
  const orderSql = 'SELECT * FROM orders';

  // Esegue la query per ottenere tutti gli ordini
  connection.query(orderSql, (err, orderResults) => {
    if (err) {
      return res.status(500).json({ error: 'Errore lato server nella funzione INDEX' });
    }
    res.status(
        200).json({
            message: 'Ordini recuperati con successo',
            order: orderResults
        }
    )
  });
}





// Esporta le funzioni per essere utilizzate in altri file
export { index};
