const mongoose = require("mongoose");


const subscriberSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
  
});




module.exports = mongoose.model("subscriber", subscriberSchema);