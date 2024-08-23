const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const cloudinary = require("cloudinary");
// const KYC = require("../models/verifyKYCModel")
const Deposit = require("../models/depositModel")
const Withdraw = require("../models/withdrawModel")
const User = require("../models/userModel")
const Admin = require("../models/adminModel")
const KYC = require("../models/verifyKYCModel")
const Staff = require("../models/staffModel")
const Subscriber = require("../models/subsriberModel")


//Register User
exports.registerAdmin = catchAsyncError(async (req, res, next) => {
  const { userId, name, email, password } = req.body;
  const emailUser = await Admin.findOne({ email });
  if (emailUser) {
    return next(new ErrorHandler("This user already exist.", 400));
  }

  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: "avatars",
  //   width: 300,
  //   height: 300,
  //   crop: "scale",
  // });
  await Admin.create({
    name,
    adminId:userId, 
    email,
    password, 
  });

  res.status(200).json({
    success: true,
    message: `Successfully Admin Created`,
  });
  
});

//Admin Login
exports.adminLogin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email | !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  const user = await Admin.findOne({ email }).select("+password")
   

  if (!user) {
    return next(new ErrorHandler("Invalid email and password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // console.log(user)
  sendToken(user, 200, res)
});


//All User Deposit Request
exports.depositRequest = catchAsyncError(async (req, res, next) => {
    const deposit = await  Deposit.find().populate("user")
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
  const withdraw = await  Withdraw.find().populate("user")
  res.status(200).json({
    success: true,
    withdraw
  });
});

//Load User Debit
exports.loadUserWithdraw = catchAsyncError(async (req, res, next) => {
const { userId, amount, status, withdrawId} = req.body;
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
  const userBalance = user.fundingBalance + amount
  const newUserData = {
    fundingBalance:userBalance
  }
  const withdrawStatus = {
    status: status
  }
  await User.findByIdAndUpdate(user._id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
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

//All Balance 
exports.allBalance = catchAsyncError(async (req, res, next) => {
  const deposit = await Deposit.find()
  let depositAmount = 0;
  for(var i=0; i<deposit.length; i++){
    depositAmount+=deposit[i].amount
  }


   const withdraw = await  Withdraw.find()
   let withdrawAmount = 0;
   for(var i=0; i<withdraw.length; i++){
     withdrawAmount+=withdraw[i].amount
   }

  let total = depositAmount - withdrawAmount
  res.status(200).json({
    success: true,
    depositAmount,
    withdrawAmount,
    totalBalance:total
  });
});

//Depsoit Balance
exports.getDepositBalance = catchAsyncError(async (req, res, next) => {
  
  //Total Deposit Amount
  const deposit = await  Deposit.find()
  let depositAmount = 0;
  for(var i=0; i<deposit.length; i++){
    depositAmount+=deposit[i].amount
  }

  var pendingDeposit = 0
  for(var i=0; i<deposit.length;i++){
    if(deposit[i].status==="Pending"){
      pendingDeposit += deposit[i].amount;
    }
  }

  var rejectedDeposit = 0
  for(var i=0; i<deposit.length;i++){
    if(deposit[i].status==="Rejected"){
      rejectedDeposit += deposit[i].amount;
    }
  }
 
  res.status(200).json({
    success: true,
    depositAmount:depositAmount,
    depositPending:pendingDeposit,
    depositRejected:rejectedDeposit
  });
});

//Pending Withdraw
exports.pendingDeposit = catchAsyncError(async (req, res, next) => {
  const depositAll = await  Deposit.find().populate("user")
  let deposit =[]
  for(var i=0; i<depositAll.length; i++){
    if(depositAll[i].status==="Pending"){
      deposit.push(depositAll[i])
    }
  }
  res.status(200).json({
    success: true,
    deposit
  });
});

//Pending Withdraw
exports.pendingWithdraw = catchAsyncError(async (req, res, next) => {
  const withdrawAll = await  Withdraw.find().populate("user")
  let withdraw =[]
  for(var i=0; i<withdrawAll.length; i++){
    if(withdrawAll[i].status==="Pending"){
      withdraw.push(withdrawAll[i])
    }
  }
  res.status(200).json({
    success: true,
    withdraw
  });
});

//Withdraw Balance
exports.getWithdrawBalance = catchAsyncError(async (req, res, next) => {
  
  //Total Withdraw Amount
  const withdraw = await  Withdraw.find()
  let withdrawAmount = 0;
  for(var i=0; i<withdraw.length; i++){
    withdrawAmount+=withdraw[i].amount
  }

  var pendingWithdraw = 0
  for(var i=0; i<withdraw.length;i++){
    if(withdraw[i].status==="Pending"){
      pendingWithdraw += withdraw[i].amount;
    }
  }

  var rejectedWithdraw = 0
  for(var i=0; i<withdraw.length;i++){
    if(withdraw[i].status==="Rejected"){
      rejectedWithdraw += withdraw[i].amount;
    }
  }
 
  res.status(200).json({
    success: true,
    withdrawAmount:withdrawAmount,
    withdrawPending:pendingWithdraw,
    withdrawRejected:rejectedWithdraw
  });
});

//All User
exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const user = await  User.find()
  res.status(200).json({
    success: true,
    user
  });
});

//Update User from Admin
exports.updateAdminUser = catchAsyncError(async (req, res, next) => {
  const {userName} = req.body
  const user = await  User.findById(req.body.id)
  if(!user){
    return next(new ErrorHandler("User Not Found", 404))
  }
  await User.findByIdAndUpdate(user._id, {userId:userName}, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  
  res.status(200).json({
    success: true,
    message:"Successfully Message Updated"  
  });
});


//All User Reffer
exports.allUserReffer = catchAsyncError(async (req, res, next) => {
  const user  = await User.find().populate("team")
  res.status(200).json({
    success: true,
    user  
  });
});

//Update User from Admin
exports.adminAddReff = catchAsyncError(async (req, res, next) => {
  const {userName, refferUser} = req.body
  const user = await  User.findOne({userId:userName})
  const reffUser = await User.findOne({userId:refferUser})
  

  if(reffUser){
    await user.team.push(reffUser._id)
    await user.save();
  }
  res.status(200).json({
    success: true,
    message:"Successfully Reffer Connected"  
  });
});

//All KYC request
exports.getPendingKyc = catchAsyncError(async (req, res, next) => {
  const kycAll = await  KYC.find().populate("user")
  const kyc = []
  for(var i=0; i<kycAll.length; i++){
    if(kycAll[i].status ==="Pending"){
      kyc.push(kycAll[i])
    }
  }
  res.status(200).json({
    success: true,
    kyc
  });
});

//All KYC request
exports.getAllKyc = catchAsyncError(async (req, res, next) => {
  const kyc = await  KYC.find().populate("user")
  res.status(200).json({
    success: true,
    kyc
  });
});

//Update KYC
exports.updateKYC = catchAsyncError(async (req, res, next) => {
  const user = await  User.findById(req.body.id)
  const kyc = await KYC.findById(req.body.kyc)
  if(!user){
    return next(new ErrorHandler("User Not Found", 404))
  }
  const kycStatus = {
    verified:true
  }
  await User.findByIdAndUpdate(user._id, kycStatus, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
});
  await KYC.findByIdAndUpdate(kyc._id, {
    status:"Successfull"
  })

  res.status(200).json({
    success: true,
    message:"Successfully KYC Updated"
  });
});

//Delete KYC
exports.deleteKYC = catchAsyncError(async (req, res, next) => {
  const user = await  User.findById(req.body.id)
  const kyc = await KYC.findById(req.body.kyc);
  
  if(!user){
    return next(new ErrorHandler("User Not Found", 404))
  }

  if(!kyc){
    return next(new ErrorHandler("KYC Not Found", 404))
  }

  const kycStatus = {
    verified:false
  }
  await User.findByIdAndUpdate(user._id, kycStatus, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  
  await KYC.findByIdAndDelete(kyc._id);
  
  res.status(200).json({
    success: true,
    message:"Successfully KYC Deleted"
  });
});


//Create Staff
exports.createStaff = catchAsyncError(async (req, res, next) => {
  const {name, userName, email, phone, password, role} = req.body

  const userNameUnique = await Staff.findOne({ userName });
  if (userNameUnique) {
    return next(new ErrorHandler("This user already exist.", 400));
  }

  await Staff.create({
    name,
    userId:userName, 
    email,
    password, 
    phone,
    role,
    avatar: {
      // public_id: myCloud.public_id,
      // url: myCloud.secure_url,
      public_id: "myCloud.public_id",
      url: "myCloud.secure_url",
    },
  })
  res.status(200).json({
    success: true,
    message:"Successfully Staff Created"
  });
});

//Edit Staff
exports.deleteStaff = catchAsyncError(async (req, res, next) => {

  const staff = await Staff.findById(req.body.staffId);
  if (!staff) {
    return next(new ErrorHandler("Staff Not Found", 404));
  }

  await Staff.findByIdAndDelete(staff._id)
  res.status(200).json({
    success: true,
    message:"Successfully Staff Deleted"
  });
});

//All Subsciber
exports.getAllSubscriber = catchAsyncError(async (req, res, next) => {

  const subscriber = await Subscriber.find()
 
  res.status(200).json({
    success: true,
    subscriber
  });
});

//Subscriber Message
exports.subscriberMessage = catchAsyncError(async (req, res, next) => {
  const subscriber = await Subscriber.findById(req.body.subscriberId).populate("user")
  const message = `${req.body.message}`;

  try {
    await sendMail({
      email: subscriber.user.email,
      subject: `Orion Trading Message`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      message:"A Error Occured Please Try Again"
    });
  }
});