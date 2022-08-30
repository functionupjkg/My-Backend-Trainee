const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


//======================== Create User Data =================

const createUser = async function (req, res) {
  let data = req.body;
  let savedData = await userModel.create(data);
  res.send({ msg: savedData });
};


//=================== Login User Data =========================

const loginUser = async function (req, res, next) {
  let userName = req.body.emailId;
  let password = req.body.password;
  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user) {
    return res.send({ status: false, msg: " Your Credential not Valid" });
  } else if (user.isDeleted == true) {
    res.send("User details not found.. You can't fetch user details ")
  } else { 
    next();
  } 
 
}


//======================== Get User Data =============================

const getUserData = async function (req, res) {
    
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails) {
    return res.send({ status: false, msg: "No such user exists" });
  } else if (userId.isDeleted == true) {
    res.send("User details not found.. You can't fetch user details ")
  } else { 
    res.send({ status: true, data: userDetails });
  }
};


//======================= updateUser =======================================

const updateUser = async function (req, res) {

  let userId = req.params.userId;
  let user = await userModel.findById(userId);

  if (!user) {
    return res.send("No such user exists");
  } else if (userId.isDeleted == true) {
    res.send("User details not found.. you can't update anything")
  } else {
    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData, { new: true });
    res.send({ status: true, data: updatedUser });
  }
};


//==================================== Post Message ===================================

const postMessage = async function (req, res) {
  let message = req.body.message
  let user = await userModel.findById(req.params.userId)
  if (!user) {
    return res.send({ status: false, msg: 'No such user exists' })
  } else if (user.isDeleted == true) {
    res.send("User details not found.. You can't post message ")
  } else {
    let updatedPosts = user.posts

    updatedPosts.push(message)
    let updatedUser = await userModel.findOneAndUpdate({ _id: user._id }, { posts: updatedPosts }, { new: true })

    return res.send({ status: true, data: updatedUser })
  }
}

//============================ Deleted User Data ==========================

const deleteUser = async function (req, res) {

  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (!user) {
    return res.send("No such user exists");
  } else if (userId.isDeleted == true) {
    res.send("User Account not found.. Create new Account for deleteuser")
  } else {
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, { isDeleted: true }, { new: true });
    res.send({ status: true, Deleted: "User deleted successfully", data: updatedUser });
  }
};



module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.postMessage = postMessage;
module.exports.deleteUser = deleteUser;
