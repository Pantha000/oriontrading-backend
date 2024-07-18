const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  title:{
    type:String,
  },
  desc:{
    type:String,
  },
  amount:{
    type:Number,
    default:0,
  },
  sendWallet:{
    type:String,
  },
  reciveWallet:{
    type:String,
  },
  createdAt:{
    type:Date,
    default:Date.now()
  }
 
});



module.exports = mongoose.model("transfer", transferSchema);