const express = require('express');
const express = require('express');
const router = express.Router();

router.get('/students/:name', function (req, res) {
    let studentName = req.params.name
    console.log(studentName)
    res.send(studentName)
})

router.get("/random", function (req, res) {
    res.send("hi there")
})


router.get("/test-api", function (req, res) {
    res.send("hi FunctionUp")
})


router.get("/test-api-2", function (req, res) {
    res.send("hi FunctionUp. This is another cool API")
})


router.get("/test-api-3", function (req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's ")
})


router.get("/test-api-4", function (req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})



router.get("/test-api-5", function (req, res) {
    res.send("hi FunctionUp5. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})

router.get("/test-api-6", function (req, res) {
    res.send({ a: 56, b: 45 })
})

router.post("/test-post", function (req, res) {
    res.send([23, 45, 6])
})


router.post("/test-post-2", function (req, res) {
    res.send({ msg: "hi", status: true })
})

router.post("/test-post-3", function (req, res) {
    // let id = req.body.user
    // let pwd= req.body.password
    // console.log( id , pwd)

    console.log(req.body)
    res.send({ msg: "hi", status: true })
})


// TA SESSION EXAMPLE OF APLI GET & POST--------
router.get("/test", function (req, res) {

    console.log(req)
    res.send({ message: "Test API Working Fine!" })
})



router.post("/test-post-4", function (req, res) {
    let arr = [12, "functionup"]
    let ele = req.body.element
    arr.push(ele)
    res.send({ msg: arr, status: true })

})

//Ques : =- Your player collection should be an ARRAY of player objects. Each player object
// should have the following attributes:


let players = [
    {
        name: "manish",
        dob: "1/1/1995",
        gender: "male",
        city: "jalandhar",
        sports: ["swimming"],
    },
    {
        name: "gopal",
        dob: "1/09/1995",
        gender: "male",
        city: "delhi",
        sports: ["soccer"],
    },
    {
        name: "lokesh",
        dob: "1/1/1990",
        gender: "male",
        city: "mumbai",
        sports: ["soccer"],
    },
];

// -------------------  Class Assignment -------------------------------------------//

router.post("/players", function (req, res) {
    for (let i = 0; i < players.length; i++) {
        if (players[i].name === req.body.name) {
            return res.send("This Player is already Exited here..!!");
        }
    }

    players.push(req.body);
    return res.send({ mes: players, status: true });
});

//--------------------------- 1st Assingment -----------------------------------------//


let booking = [
    {
        bookingNumber: 1,
        bookingId: 12,
        sportId: "",
        centerId: "",
        type: "private",
        slot: "16286598000000",
        bookedOn: "31/08/2021",
        bookedFor: "01/09/2021",
    },
];


router.post("/players/:playerName/bookings/:bookingId", function (req, res) {
    let playerExist = false
    for (let i = 0; i < players.length; i++) {
        if (players[i].name == req.params.playerName) {
            playerExist = true

        }
    }
    if (!playerExist) {
        return res.send("This player does not exist");
    }
    for (let i = 0; i < booking.length; i++) {
        if ((booking[i].bookingId == req.params.bookingId)) {
            return res.send("This booking id already existed in Data");
        }
    }
    req.body.playerName = req.params.playerName
    req.body.bookingId = req.params.bookingId

    booking.push(req.body);
    return res.send(booking);
});


//---------------------------------- 2nd Assignment --------------------------//

let persons = [{ Name: "PK", Age: 10, votingStatus: false},
    {name: "SK", age: 20, votingStatus: false},
    {name: "AA", age: 70, votingStatus: false},
    {name: "SC", age: 5, votingStatus: false},
    {name: "HO", age: 40, votingStatus: false}]

router.get("/persons",function(req,res){

     let age2=req.query.age
     let result=[]
     for(let i=0;i<persons.length;i++){
       if(persons[i].age>age2){
        persons[i].votingStatus=true
        result.push(persons[i])
       }
     }
     res.send(result)
})





// router.post('/players', function (req, res) {
//     let newPlayer = req.body
//     let newPlayersName = newPlayer.name
//     let isNameRepeated = false

// 1st method :==========
// let player = players. find(p => p.name == newPlayersName)


// 2nd method :===for loop 
// by Pritesh Sir===============Solution ====
//     for (let i = 0; i < players.length; i++) {
//         if (players[i].name == newPlayersName) {
//             isNameRepeated = true;
//             break;
//         }
//     }

//     // undefined is same as flase / a falsy value
//     if (isNameRepeated) {
//         //player exists
//         res.send("This player Name is already Existed.")
//     } else {
//         //new entry
//         players.push(newPlayer)
//     }
//     res.send(players)

// });






// router.post('/players', function (req, res) {
//     let newPlayer = req.body.player
//     let player1 = newPlayer.name

//     for (i = 0; i < players.length; i++) {
//         if (players[i].name == player1) {
//             return res.send("This player Detalis already Exit..!")
//         }
//     }
//     players.push(newPlayer)
//     res.send({ data: players, status: true })
//     res.send({ players })
// })



module.exports = router;

