const jwt = require('jsonwebtoken');

const tokenAuth = async function (req, res, next) {
    let token = req.headers['x-Auth-token'];
    if (!token) token = req.headers['x-auth-token'];
    if (!token) {
        return res.send({
            status: false,
            msg: "Token must be valid.."
        });
    }

   // console.log(token);

    let decodedToken = jwt.verify(token, "Jyoti-Secrete-Key");
    if (!decodedToken) {
        return res.send({ status: false, msg: "Invalid Token" })
    } else {
        next();
    }

}


module.exports.tokenAuth = tokenAuth;