const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const productModel = require("../models/productModel");

//=========================1st API Function to Create User Data ================================//

const createOrderData = async function (req, res) {
    let order = req.body;
    let userID = req.body.userId;
    let productID = req.body.productId;
  
    let user = await userModel.findById(userID);
    let product = await productModel.findById(productID);
  // if userid not found then..
    if (!order.userId) {
      res.send("ERROR: USER ID ABSENT. Please enter it.");
      return;
    }
  // if product id not found.. then
    if (!order.productId) {
      res.send("ERROR: Product ID ABSENT. Please enter it.");
      return;
    }
  
    let flagUser = 0; // here flagUser =0 take n also product
    let flagProduct = 0;
  
    let client = await userModel.find();
    let prod = await productModel.find();
 
    for (let i = 0; i < client.length; i++) { 
      if (order.userId == client[i]._id) {
        flagUser++;
      }
    }
    for (let j = 0; j < prod.length; j++) {
      if (order.productId == prod[j]._id) {
        flagProduct++;
      }
    }
  
    if (!flagUser) {
      res.send(
        "ERROR: INVALID User ID . User ID not present in User's Collection."
      );
      return;
    }
 
    if (!flagProduct) {
      res.send(
        "ERROR: INVALID Product ID . Product ID not present in Product's Collection."
      );
      return;
    }
  
    if (flagUser && flagProduct) {
      let isFreeUser = req.headers["isfreeappuser"];
  
      if (isFreeUser == "true") {
        order.amount = 0;
        let ChangeUSerStatus = await userModel.findOneAndUpdate(
          { _id: userID },
          { isFreeAppUser: true },
          { new: true }
        );
        let orderCreated = await orderModel.create(order);
        res.send({ Order_Placed: orderCreated });
      } else {
        let price = product.price;
  
        if (user.balance < price) {
          return res.send("User Does NOT Have Enough Balance.");
        }
  
        let updateUserBalance = await userModel.findOneAndUpdate(
          { _id: userID },
          { $inc: { balance: -price }, isFreeAppUser: false },
          { new: true }
        );
        order.amount = price;
        let orderCreated = await orderModel.create(order);
        res.send({ Order_Placed: orderCreated });
      }
    }
  };
  
  const getOrderData = async function (req, res) {
    let orders = await orderModel.find();
    res.send({ data: orders });
  };




module.exports.createOrderData = createOrderData;
module.exports.getOrderData = getOrderData;