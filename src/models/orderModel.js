const mongoose = require('mongoose');
const moment = require ('moment');
const ObjectId = mongoose.Schema.Types.ObjectId;



const productSchema = new mongoose.Schema( {
    userId: {
        type : ObjectId,
        ref : "UserCollection"
    },
    productId: {
        type : ObjectId,
        ref : "ProductCollection"
    },
    amount : Number,
    isFreeAppUser:{
        type : Boolean,
        default : true
    },
    date: {
        type : String,
        date : moment().format("DD:MM:YYYY")
    }
    
}, { timestamps: true });

module.exports = mongoose.model('OrderCollection', productSchema) //orders


