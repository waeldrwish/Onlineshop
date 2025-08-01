const mongoose = require("mongoose")
// user Schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type:String,
    required: true,
    default: "user"
  }
},{ timestamps: true })
const userModel = mongoose.model("User", userSchema)

module.exports = userModel