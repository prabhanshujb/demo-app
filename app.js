//express for handling request
const express = require('express');
const app = express(); //running the express
const morgan = require("morgan");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//handling cors errors

const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');


const url = "mongodb://localhost:27017/node-rest-api";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header (
        "Access-Control-Allow-Header",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(res.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", 'PUT, POST, GET, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

//handling route request
app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);
app.use('/user', userRoutes);


app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;