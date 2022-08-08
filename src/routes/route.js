const express = require('express');
const lodashModule = require('lodash');
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

    // Month Print in quaterly ===
    let allMonth = ["January" , "February", "March", "April", "May", "June", "July" , "August", "September", "October", "November", "December"]
    let splitMonth = lodashModule.chunk(allMonth, 4);
    console.log(splitMonth);

    // Print last 9 odd element to given arry ====
    let oddNumber = [1,3,5,7,9,11,13,15,17,19]
    let printOddNum = lodashModule.tail(oddNumber);
    console.log(printOddNum);

    // Remove dublicate value print === 
    let num = [ 1, 3, 2, 1, 2, 5, 3]
    let findNum = lodashModule.union(num);
    console.log(findNum);

    //Print the given array in the form of object key value ====
    let pairsArr = [['horror',"The Shining"],['drama','Titanic'],['thriller','Shutter Island'],['fantasy','Pans Labyrinth']];
    let printParisArr = lodashModule.fromPairs(pairsArr)
    console.log(printParisArr);

    
    res.send('My First Assignment of Nodejs  ever!')
});


router.get('/test-you', function (req, res) {
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data', function (req, res) {

})
module.exports = router;
// adding this comment for no reason