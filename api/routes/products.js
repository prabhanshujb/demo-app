const express = require("express");
const mongoose = require("mongoose")
const router = express.Router(); //for hadling different rout request

const Product = require("../models/productsmodel");
 
router.get('/', (req, res, next) => { //for handling request, registering diff routes
    Product.find()
    .select("name price _id")
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                        request: {
                            type: 'GET',
                            url: req.get('host')+'/products/'+ doc._id 
                        }
                };
            })
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
        error: err
    });
});

});    //for regestering diff routes

router.post('/', (req, res, next) => { 
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save()
        .then(result =>{
        console.log(result);
        res.status(201).json({
        message: 'product created',
        createdProduct: {
            name: result.name,
            price: result.price,
            _id: result._id,
            request: {
                type: 'GET',
                url: req.get('host')+'/products/'+ result._id 
            }
        }
    });
})
.catch(err =>{
    console.log(err);
    res.status(500).json({
    error: err
    });
    });
}); 
router.get('/:productId', (req, res, next) => { 
    const id = req.params.productId;
    Product.findById(id)
    .select("name price _id")
    .exec()
    .then(doc =>{
        console.log("From database",doc); //fetching the data from database
        if(doc){
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    url: req.get('host')+'/products/'
                }
            }); 
        }
        else{
            res.status(404).json({message: "no valid entry found"});
        }
    })
    .catch(err =>{
        console.log(err);   
        res.status(500).json({error});
    });
}); 

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, { $set: updateOps})
    .exec()
    .then(result =>{
        res.status(200).json({
            message: "product updated", 
                request : {
                    type: 'GET',
                    url: req.get('host')+'/products/' + id
                }
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:productId', (req, res, next)=>{
    const id = req.params.productId;
    Product.remove({ _id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product deleted',
          request: {
              type: 'POST',
              url: req.get('host')+'/products/',
              body: { name: 'String', price: 'Number' }
          }
        });
        })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});
module.exports = router;
