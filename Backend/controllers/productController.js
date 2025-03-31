import connection from "../data/db.js";



function index(req, res) {
  // Query per recuperare i prodotti
  const productSql = 'SELECT * FROM products';

  // Query per recuperare le immagini dei prodotti
  const imagesSql = 'SELECT * FROM product_images WHERE product_id = ?';

  connection.query(productSql, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: 'Errore lato server nella funzione INDEX',
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        error: 'Nessun prodotto trovato',
        status: 404,
        message: 'Nessun prodotto trovato',
      });
    }

    let products = results;
    let count = 0;

    // Per ogni prodotto, recuperiamo le sue immagini
    products.forEach((product, index) => {
      connection.query(imagesSql, [product.id], (err, imagesResults) => {
        if (err) {
          return res.status(500).json({
            error: 'Errore lato server nella funzione SHOW (immagini)',
          });
        }

        // Aggiungiamo le immagini al prodotto
        product.product_images = imagesResults.map(image => ({
          ...image,
          image_url: req.imagePath + image.image_url,
        }));

        count++;

        // Se abbiamo processato tutti i prodotti, restituiamo la risposta
        if (count === products.length) {
          res.json(products);
        }
      });
    });
  });
}

function show(req, res) {
  const { slug } = req.params; // Usare lo slug invece dell'ID

  // Query per recuperare il prodotto con lo slug
  const productSql = 'SELECT * FROM products WHERE slug = ?';

  // Query per recuperare le immagini del prodotto
  const imagesSql = 'SELECT * FROM product_images WHERE product_id = ?';

  connection.query(productSql, [slug], (err, productResults) => {
    if (err) {
      return res.status(500).json({
        error: 'Errore lato server nella funzione SHOW',
      });
    }

    if (productResults.length === 0) {
      return res.status(404).json({
        error: 'Prodotto non trovato',
      });
    }

    const product = productResults[0];

    // Recuperiamo le immagini del prodotto
    connection.query(imagesSql, [product.id], (err, imagesResults) => {
      if (err) {
        return res.status(500).json({
          error: 'Errore lato server nella funzione SHOW (immagini)',
        });
      }

      // Aggiungiamo le immagini direttamente all'oggetto prodotto
      product.images = imagesResults.map(image => ({
        ...image,
        image_url: req.imagePath + image.image_url, // Aggiungi il percorso completo
      }));

      // Invia il prodotto con le immagini complete
      res.json({
        ...product,
       
      });
    });
  });
}



export {
  index, show
}