const authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel");
const publisherModel = require("../models/publisherModel");

//-----------------Create and Get Book  API Function --------------------------------

const createBook = async function (req, res) {
    let book = req.body

    let authorId = book.author_id
    let publisherId = book.publisher_id


    if (!authorId) {
        res.send("Author Id is mandatroy")
        return;
    } else {
        if (!publisherId) {
            res.send("Publisher Id is mandatory")
            return;
        }

    }

    let saveAuthorData = await authorModel.findById(authorId)
    if (!saveAuthorData) {
        res.send("Invalid Author Id")
        return;
    } else {
        let savePublisherData = await publisherModel.findById(publisherId)
        if (!savePublisherData) {
            res.send("Invalid Publisher Id")
            return;
        }
    }
    let saveData = await bookModel.create(book)
    res.send(saveData)
}



const getBooksData = async function (req, res) {
    let books = await bookModel.find()
    res.send({ data: books })
}

//-----------------Get Book with Author & Publisher Detalis API Function -------------------
const getPopulatedBooks = async function (req, res) {
    let allBooks = await bookModel.find().populate('author_id publisher_id')
    res.send({ data: allBooks })

}


// 5. Create a New PUT API/ books and perforem the following two operations:
//a--> for the books publisher by "Penguin" and "HarperCollins" update this key to true.


const booleanUpdate = async function (req, res) {
    let publisherId = await publisherModel.find({ $or: [{ name: "Penguin" }, { name: "HarperCollins" }] }).select({ _id: 1 })
    console.log(publisherId);
    let updateBook = await bookModel.updateMany({ publisher_id: publisherId }, { $set: { isHardCover: true } }, { new: true })
    console.log(updateBook)
    res.send({ msg: updateBook.name })
}


//---------------Update Book Price+10 whose rating >=3.5 ------------------------------------
const updatePriceValue = async function (req, res) {

    let authorId = await authorModel.find({ rating: { $gt: 3.5 } })
    console.log(authorId)
    let updatePrice = await bookModel.updateMany({ author_id: authorId }, { $inc: { price: 20 } }, { new: true })
    console.log(updatePrice)
    res.send({ msg: updatePrice })
}



// const updateBookPrice = async function (req, res) {
//     let ratings = await authorModel.find({ rating: { $gt: 3.5 } }).select('id')
//     let updatePrice = await bookModel.updateMany({ author: ratings }, { $inc: { price: 10 } }, { new: true })
//     res.send({ msg: updatePrice })
// }




module.exports.createBook = createBook
module.exports.getBooksData = getBooksData
module.exports.getPopulatedBooks = getPopulatedBooks
module.exports.booleanUpdate = booleanUpdate
module.exports.updatePriceValue = updatePriceValue
