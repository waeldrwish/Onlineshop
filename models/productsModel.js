const mongoose = require("mongoose")
// user Schema
const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type:String,
    required: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
},{ timestamps: true })
const productModel = mongoose.model("Product", productSchema)

module.exports = productModel