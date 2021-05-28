const productDao = require('../dao/productDao');

const createProduct = async(params) => {

    //computation
    //formula
    // password hash
    // email send
    // params.created_at = Date.now();
    // const getExistingProduct = await productDao.getProduct(params);
    // if(getExistingProduct) {
    //     return "Product exist already";
    // }

    const product = await productDao.createProduct(params);
    
    return product;
}

module.exports = {

    createProduct,

}