const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


//======================== Create User Data =================

const createUser = async function (req, res) {
  try {
    let data = req.body;
    let savedData = await userModel.create(data);
    res.send({ msg: savedData });
  } catch (error) {
    res.status(500).send(error.message)
  }
};


//=================== Login User Data =========================

const loginUser = async function (req, res, next) {
  try {
    let userName = req.body.emailId;
    let password = req.body.password;
    let user = await userModel.findOne({ emailId: userName, password: password });
    if (!user) {
      return res.send({ status: false, msg: " Your Credential not Valid" });
    } else if (user.isDeleted == true) {
      res.send("User Account Deleted in Database..!! Please create new user account")
    } else {
      next();
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}


//======================== Get User Data =============================

const getUserData = async function (req, res) {
  try {
    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    if (!userDetails) {
      return res.send({ status: false, msg: "No such user exists" });
    } else if (userDetails.isDeleted == true) {
      res.send("User Account Deleted in Database..!! You can't fetch the data")
    } else {
      res.send({ status: true, data: userDetails });
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
};


//======================= updateUser =======================================

const updateUser = async function (req, res) {
  try {

    let userId = req.params.userId;
    let user = await userModel.findById(userId);

    if (!user) {
      return res.send("No such user exists");
    } else if (user.isDeleted == true) {
      res.send("User Account Deleted in Database..!! You can't update anything.")
    } else {
      let userData = req.body;
      let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData, { new: true });
      res.send({ status: true, data: updatedUser });
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
};


//==================================== Post Message ===================================

const postMessage = async function (req, res) {
  try {
    let message = req.body.message
    let user = await userModel.findById(req.params.userId)
    if (!user) {
      return res.send({ status: false, msg: 'No such user exists' })
    } else if (user.isDeleted == true) {
      res.send("User Account Deleted in Database..!! You Can't Post Messages")
    } else {
      let updatedPosts = user.posts

      updatedPosts.push(message)
      let updatedUser = await userModel.findOneAndUpdate({ _id: user._id }, { posts: updatedPosts }, { new: true })

      return res.send({ status: true, data: updatedUser })
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}

//============================ Deleted User Data ==========================

const deleteUser = async function (req, res) {
  try {

    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if (!user) {
      return res.send("No such user exists");
    } else if (user.isDeleted == true) {
      res.send("User Account Already Deleted in Database..!! Try another one.")
    } else {
      let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, { isDeleted: true }, { new: true });
      res.send({ status: true, Deleted: "User deleted successfully", data: updatedUser });
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
};



module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.postMessage = postMessage;
module.exports.deleteUser = deleteUser;
