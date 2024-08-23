const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  userId: {
    type: String,
    unique:true
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    select: false,
  },
  phone:{
    type:String
  },

  
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  role: {
    type: String,
    default: "Staff",
  },
  avatar: {
    public_id: { type: String },
    url: { type: String },
  },
  

  
});




module.exports = mongoose.model("Staff", staffSchema);