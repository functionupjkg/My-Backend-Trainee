const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


const createUser = async function(req, res){
  let user = req.body;
  let saveData = await userModel.create(user);
  res.send ({msg: saveData});
}


const loginUser = async function(req, res){
  const {emailId, password} = req.body;
  let user =await userModel.findOne({emailId: emailId, password: password});
  if(user){
    let payload = {userId : user._id, emailId: emailId};
    const generateToken = jwt.sign(payload, "Jyoti-Secrete-Key") // pre-define syntax payload + secrete key 
    return res.send({status: true, msg : generateToken});
} else{
  return res.send({status : false, msg: "Invalid Credential"});
}
}



const getUserData = async function (req, res){
  let userId = req.params.userId
  let user  = await userModel.findById(userId);
  if (!user){
    return res.send({status: false, msg : "No Such User not Exits"});
  } else {
    res.send({status: true, msg: user});
  }
}


const updateUser = async function (req, res ){
  let userId = req.params.userId;
  let user = await userModel.findById(userId)
  if (!user){
    return res.send({status:false, msg: "No Such User not Exits"})
  } 
    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate({_id : userId }, userData, {new : true});
    res.send({status:true, msg: updatedUser});
  
}


const deleteUserData = async function(req, res){
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  console.log(user)
  if(!user){
    return res.send({status: false, msg: "Such User Not Exists"});
  }
  
  let deletedData = await userModel.findOneAndUpdate({ _id : userId }, { isDeleted : true }, { new : true } );
  console.log(deletedData)
  res.send({status: true , msg : deletedData});
}


module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.deleteUserData = deleteUserData;

