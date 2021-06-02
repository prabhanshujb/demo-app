const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const checkAuth = require("../middleware/checkAuth");

const Order = require("../models/orderModel");
const Product = require("../models/productsmodel");

const orderControllers = require("../controllers/orderController");

router.get('/', checkAuth, orderControllers.orders_get_all);

router.post('/', checkAuth, orderControllers.orderCreateNew);

router.get('/:ordersId', checkAuth, orderControllers.OrderGetid); 

router.delete('/:ordersId', checkAuth, orderControllers.orderRemove);

module.exports = router;