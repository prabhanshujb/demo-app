const mongoose = require("mongoose")
const Product = require("../models/productsmodel");

const createProduct = (params) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: params.name,
        price: params.price,
    });

        return product.save();
}

module.exports = {
    createProduct,
}