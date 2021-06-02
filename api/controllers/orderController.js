const mongoose = require("mongoose");

const Order = require("../models/orderModel");
const Product = require("../models/productsmodel");

//showing all order in Db
exports.orders_get_all = (req, res, next) => {
  Order.find()
    .select("product quantity_id")
    .populate("product", "name")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/orders/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

//creating new order by product id
exports.orderCreateNew = (req, res, next) =>{
  Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      });
      return order.save();
    })
      .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Order stored",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/orders/" + result._id
        }
      });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
    };

exports.OrderGetid = (req, res, next) =>{
  Order.findById(req.params.ordersId)
    .populate("product")
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json({
        order: order,
        request: {
          message: 'orders details',
          orderId: req.params.ordersId,
          type: "GET",
          url: "http://localhost:3000/orders"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  };

    exports.orderRemove = (req, res, next) =>{
      Order.remove({_id: req.params.orderId})
      .exec()
      .then(result => {
        //if (!order) {
        //  return res.status(404).json({
         //   message: "Order not found"
         // });
        //}
      res.status(200).json({
        message: 'orders removed',
        request: {
        type: "GET",
        body: { productId: "ID", quantity: "Number" }
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
    };