const express = require("express");
const mongoose = require("mongoose");
const { product_get } = require("../controllers/productController");
const router = express.Router(); //for hadling different rout request

const checkAuth = require("../middleware/checkAuth");
const Product = require("../models/productsmodel");

const productControllers = require('../controllers/productController');

router.get('/', productControllers.product_get); //for handling request, registering diff routes
    
router.post('/',checkAuth, productControllers.productCreateNew);

router.get('/:productId', productControllers.productGetId);

router.patch('/:productId', checkAuth, productControllers.productUpdate);

router.delete('/:productId', checkAuth, productControllers.productDelete);

module.exports = router;
