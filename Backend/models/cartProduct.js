const mongoose = require('mongoose')
const addtocart = new mongoose.Schema({
    productId: {
        ref: "product",
        type: String
    },
    quantity: Number,
    userId: String
}, {
    timestamps: true
})
const addtocartmodel = mongoose.model('CartProduct', addtocart)
module.exports = addtocartmodel