const jwt = require('jsonwebtoken')
const userModel = require("../models/userModel")
const mongoose = require('mongoose')



const jwtAuthenticate = async function (req, res) {


    let userName = req.body.emailId;
    let user = await userModel.findOne({ emailId: userName })
    let token = jwt.sign(
        {
            userId: user._id.toString(),
            batch: "Plutonium",
            organisation: "Function-Up",
        },
        "Jyoti-Secrete-Key"
    );
    res.setHeader("x-auth-token", token);
    res.send({ status: true, data: token });


}


//==================================================================

const authenticate = function (req, res, next) {

    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    if (!token) return res.send({ status: false, msg: "token must be present" });

    let decodeToken = jwt.verify(token, "Jyoti-Secrete-Key", (err, decode) => {
        if (err) {
            return res.send("Error : Invalid Token or Expired Token")
        } (decode == true)
        next()
    });


}


//===================================================================

const authorise = function(req, res, next) {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    if (!token) return res.send({ status: false, msg: "token must be present" });

    let decodedToken = jwt.verify(token, "Jyoti-Secrete-Key")
    let userLoggedIn = decodedToken.userId
    let userToBeModified = req.params.userId

    let isValid = mongoose.Types.ObjectId.isValid(userToBeModified)

    if (isValid === false) {
        return res.send("Error : Invalid UserId")
    }
    else if (!decodedToken) {
        return res.send({ status: false, msg: "Invalid Token" });
    }
    else if (userToBeModified != userLoggedIn) {
        return res.send({ status: false, msg: 'Logged User not allowed to modify requested Data' })
    } else {
        next()
    }
}



module.exports.jwtAuthenticate = jwtAuthenticate;
module.exports.authenticate = authenticate;
module.exports.authorise = authorise;