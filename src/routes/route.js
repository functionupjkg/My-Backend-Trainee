const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const midjwt = require("../middlewares/midAuth1")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})



router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId", midjwt.tokenAuth, userController.getUserData)

router.put("/users/:userId", midjwt.tokenAuth, userController.updateUser)

router.delete("/users/userId", midjwt.tokenAuth, userController.deleteUserData)

module.exports = router;