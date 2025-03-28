//pacchetti 
import express from 'express';

//impostiamo express e la porta del server
const app = express();
const port = 3000;

//attivazione del server
app.listen(port, () => {
    console.log(`Server kick-shop in funzione sulla porta: ${port}`);
});