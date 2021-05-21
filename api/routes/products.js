const express = require("express");

const router = express.Router(); //for hadling different rout request

router.get('/', (req, res, next) => { //for handling request, registering diff routes
    res.status(200).json({
        message: 'handling the product request'
    });
});    //for regestering diff routes
router.post('/', (req, res, next) => { 
    res.status(200).json({
        message: 'handling the product request'
    });
}); 
router.get('/:productId', (req, res, next) => { 
    const id = req.params.productId;
    if(id === 'special') {
        res.status(200).json({
            message: 'A special id product is available',
            id: id
        }); 
    } else {
        res.status(200).json({
            message: 'not a special id product'
        });
    }
}); 

module.exports = router;
