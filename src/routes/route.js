const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const bookInfo = require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", UserController.createUser  )
router.get("/getUsersData", UserController.getUsersData)

// Book Schema
router.post("/createNewBook", bookInfo.createBookData)
router.get("/getBookList", bookInfo.getBookData)


module.exports = router;