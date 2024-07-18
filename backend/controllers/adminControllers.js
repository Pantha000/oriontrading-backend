const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const cloudinary = require("cloudinary");
// const KYC = require("../models/verifyKYCModel")
const Deposit = require("../models/depositModel")
const Withdraw = require("../models/withdrawModel")
const User = require("../models/userModel")


//All User Deposit Request
exports.depositRequest = catchAsyncError(async (req, res, next) => {
    const deposit = await  Deposit.find()
    res.status(200).json({
      success: true,
      deposit
    });
  });

//Load User Credit
exports.loadUserDeposit = catchAsyncError(async (req, res, next) => {
  const { userId, amount, status, depositId} = req.body;
  const user = await User.findById(userId)
  const deposit = await Deposit.findById(depositId)
 
  if(!user){
    return next(new ErrorHandler("User Not Found", 404))
  }
  if(!deposit){
    return next(new ErrorHandler("Deposit Not Found", 404))
  }

  if(status==="Paid"){
    const userBalance = user.fundingBalance + amount
    const newUserData = {
      fundingBalance: userBalance
    }
    const depositStatus = {
        status: status
    }
    await User.findByIdAndUpdate(user._id, newUserData, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        });
    await Deposit.findByIdAndUpdate(deposit._id, depositStatus, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
    });
  } else if(status ==="Rejected"){
    const depositStatus = {
      status: status
    }
    await Deposit.findByIdAndUpdate(deposit._id, depositStatus, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  }else{
    return next(new ErrorHandler("Something Went Wrong", 401))
  }

  res.status(200).json({
    success: true,
    message: `Successfully Loaded`,
  });
});


//All User Withdraw Request
exports.withdrawRequest = catchAsyncError(async (req, res, next) => {
  const withdraw = await  Withdraw.find()
  res.status(200).json({
    success: true,
    withdraw
  });
});

//Load User Debit
exports.loadUserWithdraw = catchAsyncError(async (req, res, next) => {
const { userId, status, withdrawId} = req.body;
const user = await User.findById(userId)
const withdraw = await Withdraw.findById(withdrawId)

if(!user){
  return next(new ErrorHandler("User Not Found", 404))
}
if(!withdraw){
  return next(new ErrorHandler("Withdraw Not Found", 404))
}

if(status==="Paid"){
 
  const withdrawStatus = {
      status: status
  }
  await Withdraw.findByIdAndUpdate(withdraw._id, withdrawStatus, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
  });
} else if(status ==="Rejected"){
  const withdrawStatus = {
    status: status
  }
  await Withdraw.findByIdAndUpdate(withdraw._id, withdrawStatus, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
}else{
  return next(new ErrorHandler("Something Went Wrong", 401))
}

res.status(200).json({
  success: true,
  message: `Successfully Loaded`,
});
});