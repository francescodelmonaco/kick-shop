import express from 'express';

const router = express.Router();


import {index, show, storeOrder} from '../controllers/productController.js'



//INDEX
router.get('/', index);

//SHOW
router.get('/:slug', show);

//rotta per aggiungere un ordine
router.post('/', storeOrder);


export default router;