const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const jwtAuth = require("../middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})



router.post("/users", userController.createUser )

router.post("/login", userController.loginUser, jwtAuth.jwtAuthenticate )

//The userId is sent by front end
router.get("/users/:userId" , jwtAuth.authenticate, jwtAuth.authorise ,  userController.getUserData)
router.post("/users/:userId/posts" , jwtAuth.authenticate, jwtAuth.authorise , userController.postMessage)

router.put("/users/:userId" , jwtAuth.authenticate, jwtAuth.authorise , userController.updateUser)
router.delete('/users/:userId' , jwtAuth.authenticate, jwtAuth.authorise , userController.deleteUser)

module.exports = router;