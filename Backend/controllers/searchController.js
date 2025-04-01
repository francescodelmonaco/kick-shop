import connection from "../data/db.js";

function search(req, res) {
  // Recupera il termine di ricerca dai parametri della richiesta
  const searchTerm = req.params.name || '';

  // Query per selezionare i prodotti
  let sql = 'SELECT * FROM products';
  const imagesSql = 'SELECT * FROM images WHERE product_id = ?';
  const sizesSql = 'SELECT * FROM sizes WHERE product_id = ?';
  const params = [];

  // Se è stato fornito un termine di ricerca, aggiunge una clausola WHERE per filtrare i prodotti
  if (searchTerm){
    sql += ' WHERE name LIKE ?';
    params.push(`%${searchTerm}%`); // Usa il carattere jolly per la ricerca parziale
  }  

  // Esegue la query per cercare i prodotti nel database
  connection.query(sql, params, (err, searchResults) => {
      if (err) {
        return res.status(500).json({ error: 'Errore lato server nella funzione search' });
      }
      
      // Se nessun prodotto è stato trovato, restituisce un errore 404
      if (searchResults.length === 0){
        return res.status(404).json({error: 'Prodotto non trovato'});
      }
      
      // Se trova almeno un prodotto, prende il primo risultato
      const product = searchResults[0];

      // Query per recuperare le immagini associate al prodotto trovato
      connection.query(imagesSql, [product.id], (err, imagesResults) => {
        if (err) {
          return res.status(500).json({ error: 'Errore lato server nel recupero immagini' });
        }
        
        // Aggiunge le immagini al prodotto, costruendo gli URL corretti
        product.images = imagesResults.map((image, idx) => ({
          ...image,
          image_url: `${req.imagePath}${product.slug}-${idx + 1}.webp`,
        }));
  
        // Query per recuperare le taglie disponibili per il prodotto
        connection.query(sizesSql, [product.id], (err, sizesResults) => {
          if (err) {
            return res.status(500).json({ error: 'Errore lato server nel recupero taglie' });
          }
          
          // Aggiunge le taglie al prodotto
          product.sizes = sizesResults;
          
          // Restituisce il prodotto con immagini e taglie incluse
          res.json(product); 
        });
      });
  });
}

export default search;