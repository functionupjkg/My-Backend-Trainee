const productModel = require ("../models/productModel")




//=========================1st API Function to Create User Data ================================//

const createProductData = async function (req, res){
    let product =  req.body
    console.log(product)
    let productCreated = await productModel.create(product);
    res.send({data : productCreated}); 
}

const getProductData = async function (req, res){
    let products = await productModel.find();
    res.send({data : products});
}

//=============================================================================================//



module.exports.createProductData = createProductData;
module.exports.getProductData = getProductData;