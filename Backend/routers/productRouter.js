import express from 'express';

const router = express.Router();


import {index, show} from '../controllers/productController.js'



//INDEX
router.get('/', index);

//SHOW
router.get('/:id', show);

export default router;