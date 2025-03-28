import connection from "../data/db.js";

function index (req, res) {
    const sql = "SELECT * FROM products";
    
  connection.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({
        error: 'Errore lato server INDEX function',
    }); 
    res.json(results);})
} 


function show (req, res){
    const {id} = req.params;
    const sql = "SELECT * FROM products WHERE id = ?"; 
    connection.query(sql, [id], (err, results) => {
        if (err)
          return res.status(500).json({
            error: 'Errore lato server SHOW function',
        }); 

        
    if (results.length === 0)
        return res.status(404).json({
          error: 'Product not found',
          status:404,
          message: 'Product not found',
        });

        res.json(results);
    })
}

export {
    index, show
}