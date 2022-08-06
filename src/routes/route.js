const express = require('express');
//const abc = require('../introduction/intro')
const jyoti = require('../logger/logger')
const jyoti1 = require('../util/helper')
const jyoti2 = require('../validator/formatter')
const router = express.Router();

router.get('/test-me', function (req, res) {
    jyoti.introJyoti()
    jyoti1.today();
    console.log(jyoti1.month)
    jyoti1.aboutbatch();
    jyoti2.trim();
    jyoti2.lower();
    jyoti2.upper();
    

    res.send('My First Assignment of Nodejs  ever!')
});


router.get('/test-you', function (req, res) {
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data', function (req, res) {

})
module.exports = router;
// adding this comment for no reason