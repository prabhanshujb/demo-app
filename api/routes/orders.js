const express = require("express");

const router = express.Router();

router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'orders were fetched'
    });
});
router.post('/', (req, res, next) =>{
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'orders is created',
        createdOrder: order
    });
});
router.get('/:ordersId', (req, res, next) =>{
    res.status(200).json({
        message: 'orders were details',
        orderId: req.params.ordersId
    });
});
router.delete('/:ordersId', (req, res, next) =>{
    res.status(200).json({
        message: 'order is deleted at orderId',
        orderId: req.params.ordersId
    });
});

module.exports = router;