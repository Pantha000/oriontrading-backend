const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  } , 
  font:{
    type:String,
  },
  back:{
    type:String,
  },
  selfie:{
    type:String,
  },
  type:{
    type:String,
  },
  document:{
    type:String,
  },
  dob:{
    type:Date,
  },
  createdAt:{
    type:Date,
    default:Date.now()
  }
});


module.exports = mongoose.model("kyc", kycSchema);