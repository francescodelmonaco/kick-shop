import express from 'express';

const router = express.Router();


import storeOrder from '../controllers/orderController.js';





//rotta per aggiungere un ordine
router.post('/', storeOrder);

export default router;