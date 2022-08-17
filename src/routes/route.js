const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", UserController.createUser  )
router.get("/getUsersData", UserController.getUsersData)


// This is our Book Schema Assignment on 16th Aug. 22 =============
router.post("/createBook", BookController.createBook  )
router.get("/getBooksData", BookController.getBook)
router.get("/getBook", BookController.getBook)
router.post("/getBooksInYear", BookController.bookInYear)
router.get("/getParticularBooks", BookController.particularBooks)
router.get("/getXINRBooks", BookController.getINRBooks)
router.get("/getRandomBooks", BookController.getRandomBooks)

module.exports = router;