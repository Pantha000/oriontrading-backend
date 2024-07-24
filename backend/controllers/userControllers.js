const catchAsyncError = require("../middleware/catchAsyncError");
const crypto = require("crypto")
const ErrorHandler = require("../utils/errorhandler");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendMail = require("../utils/sendMail");
const cloudinary = require("cloudinary");
const KYC = require("../models/verifyKYCModel")
const Deposit = require("../models/depositModel")
const Withdraw = require("../models/withdrawModel")
const OTS = require("../models/otsModel")
const Transfer = require("../models/transferModel");
const { type } = require("os");


//Register User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { userId, name, email, password, refferId, phone } = req.body;
  const emailUser = await User.findOne({ email });
  if (emailUser) {
    return next(new ErrorHandler("This user already exist.", 400));
  }

  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: "avatars",
  //   width: 300,
  //   height: 300,
  //   crop: "scale",
  // });
  function Str_Random(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    
    // Loop to generate characters for the specified length
    for (let i = 0; i < length; i++) {
        const randomInd = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomInd);
    }
    return result;
  }
  const reffer = Str_Random(7)
  const user = await User.create({
    name,
    userId, 
    email,
    password, 
    phone,
    reffer,
    avatar: {
      // public_id: myCloud.public_id,
      // url: myCloud.secure_url,
      public_id: "myCloud.public_id",
      url: "myCloud.secure_url",
    },
  });

  if(refferId){
    const refferUser = await User.findOne({reffer: refferId})
    await refferUser.team.push(user._id)
    await refferUser.save();
  }
  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email | !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  const user = await User.findOne({ email }).select("+password")
   

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

//Logout User
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const userEmail = await User.findOne({ email: req.body.email });
  const userId = await User.findOne({email:req.body.userId})

  if (!userEmail || userId) {
    return next(new ErrorHandler("User not found", 404));
  }
  //Get Reset Password Token
  const resetToken = userEmail.getResetPasswordToken();
  await userEmail.save({ validateBeforeSave: false });
  const resetPasswordUrl = `http://localhost:${process.env.FONTEND_URL}/password/reset/${resetToken}`;
  const message = `Your password reset token is :-\n\n ${resetPasswordUrl}\n\nIf you have not requested this email then, please ignore it`;

  try {
    await sendMail({
      email: userEmail.email,
      subject: `Orion Trading -- Password Recovary`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${userEmail.email} successfully`,
    });
  } catch (error) {
    userEmail.resetPasswordToken = undefined;
    userEmail.resetPasswordExpire = undefined;

    await userEmail.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  //Creating Token Hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password != req.body.confirmPassword) {
    return next(new ErrorHandler("Please does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});


//Get User Details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const  user = await User.findById(req.user.id).populate("fundingHistory.history").populate("spotHistory.history").populate("aiHistory.history")
  res.status(200).json({
    success: true,
    user,
  });
});

//Verification
exports.userVerification = catchAsyncError(async (req, res, next) => {
  const {font, back, selfie, document, type, dob} = req.body;
  const  user = await User.findById(req.user.id)

  const fontImage = await cloudinary.v2.uploader.upload(font, {
    folder: "kyc",
  });
  const backImage = await cloudinary.v2.uploader.upload(back, {
    folder: "kyc",
  });
  const selfieImage = await cloudinary.v2.uploader.upload(selfie, {
    folder: "kyc",
  });
   
  const kyc = await KYC.create({
    font:fontImage.secure_url,
    back:backImage.secure_url, 
    selfie:selfieImage.secure_url,
    type, 
    document,
    dob,
    user: user._id
  });
  await User.findByIdAndUpdate(user._id, {
    kyc: kyc._id,

  }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
  })
  
  res.status(200).json({
    success: true,
    message: "Successfully Request Sent"
  });
});


//Update Password Sent Token
exports.sentUpdatePasswordToken = catchAsyncError(async(req,res, next)=>{
  const user = await User.findById(req.user._id)
  //Get Reset Password Token
  const resetToken = user.getUpdatePasswordToken();
  await user.save({ validateBeforeSave: false });
  const message = `Your password Update token is :-\n\n ${resetToken}\n\nIf you have not requested this email then, please ignore it`;

  try {
    await sendMail({
      email: user.email,
      subject: `Orion Trading -- Password Update Token`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.updatePasswordToken = undefined;
    user.updatePasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
})

//Update User Password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
 //Creating Token Hash
 const updatePasswordToken = crypto
 .createHash("sha256")
 .update(req.body.token)
 .digest("hex");

const user = await User.findOne({
 updatePasswordToken,
 updatePasswordExpire: { $gt: Date.now() },
}).select("+password")

  const isPassowrdMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPassowrdMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }
  // if (req.body.newPassword !== req.body.confirmPassword) {
  //   return next(new ErrorHandler("Password does not matched", 401));
  // }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res );
});

//Update User Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const {name, email, gender, city, phone, address} = req.body
  const newUserData = {
    name: name,
    email:email,
    gender:gender,
    city:city, 
    phone:phone, 
    address:address
    // address: req.body.address,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    user,
  });
});

//Deposit User
exports.depositUser = catchAsyncError(async (req, res, next) => {
  const { amount, trxId, trxProof } = req.body;
  const  user = await User.findById(req.user.id)

  if(!amount){
    return next(new ErrorHandler("Please enter valid amount", 401))
  }
  const trxProofImage = await cloudinary.v2.uploader.upload(trxProof, {
    folder: "deposit",
  });
   
  // if(amount){
  //   return next(new ErrorHandler("Please enter number", 401))
  // }
  const deposit = await Deposit.create({
    trxProof:trxProofImage.secure_url,
    trxId, 
    amount,
    currency:"USDT",
    user: user._id
  });
  await user.deposit.push(deposit._id)
  await user.save()
  
  
  res.status(200).json({
    success: true,
    message: "Successfully Deposit Created"
  });
});

//Withdraw User
exports.withdrawUser = catchAsyncError(async (req, res, next) => {
  const { amount, address, password } = req.body;
  const  user = await User.findById(req.user.id).select("+password")

  if(!amount){
    return next(new ErrorHandler("Please enter valid amount", 401))
  }

  if(user.fundingBalance<amount){
    return next(new ErrorHandler("Invalid Fund", 401))
  }

  if(user.fundingBalance<10){
    return next(new ErrorHandler("Invalid Fund", 401))
  }
  if(amount<10){
    return next(new ErrorHandler("Initial withdraw is 10 usdt", 401))
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Password", 401));
  }
  // console.log(password)
  
  const withdraw = await Withdraw.create({
    address, 
    amount,
    user: user._id
  });

  const fundingBalance = user.fundingBalance - amount

  await User.findByIdAndUpdate(user._id, { fundingBalance: fundingBalance}, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  await user.withdraw.push(withdraw._id)
  await user.save()
  
  
  res.status(200).json({
    success: true,
    message: "Successfully Withdraw Created"
  });
  
   
  
});

//Funding To Spot
exports.fundingToSpot= catchAsyncError(async (req, res, next)=>{
  const {amount} = req.body
  const user = await User.findById(req.user.id)

  if(!amount){
    return next(new ErrorHandler("Please enter valid amount", 401))
  }
  if(user.fundingBalance < amount){
    return next(new ErrorHandler("Invalid Fund", 502))
  }

  const fundingBalance = user.fundingBalance - amount;
  const spotBalance = user.spotBalance + amount;

  const transfer = await Transfer.create({
    amount,
    user: user._id,
    title:"Spot Generated Bonus",
    desc:"8% Spot Generation 2nd Level",
    sendWallet:"Funding",
    reciveWallet:"Spot"
  })

  await User.findByIdAndUpdate(user._id, { fundingBalance: fundingBalance}, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  await User.findByIdAndUpdate(user._id, { spotBalance: spotBalance}, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });


  await user.fundingHistory.push({
    history:transfer._id,
    status:"Out"
  })
  await user.spotHistory.push({
    history:transfer._id,
    status:"In"
  })
  await user.save();

  res.status(200).json({
    success: true,
    message: "Successfully Amount Transfered"
  });
})

//Spot Transfer
exports.spotTransfer= catchAsyncError(async (req, res, next)=>{
  const {amount, wallet} = req.body
  const user = await User.findById(req.user.id)
  
  if(!amount){
    return next(new ErrorHandler("Please enter valid amount", 401))
  }
  if(user.spotBalance < amount){
    return next(new ErrorHandler("Invalid Fund", 502))
  }

  if(wallet ==="AI"){
    const aiBalance = user.aiBalance + amount;
    const spotBalance = user.spotBalance - amount;

    const transfer = await Transfer.create({
      amount,
      user: user._id,
      title:"Spot Generated Bonus",
      desc:"8% Spot Generation 2nd Level",
      sendWallet:"Spot",
      reciveWallet:"AI"
    })

    await User.findByIdAndUpdate(user._id, { aiBalance: aiBalance}, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    await User.findByIdAndUpdate(user._id, { spotBalance: spotBalance}, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });


    await user.aiHistory.push({
      history:transfer._id,
      status:"In"
    })
    await user.spotHistory.push({
      history:transfer._id,
      status:"Out"
    })
    await user.save();

    res.status(200).json({
      success: true,
      message: "Successfully Amount Transfered"
    });
  }
  if(wallet==="Funding"){
    const fundingBalance = user.fundingBalance + amount;
    const spotBalance = user.spotBalance - amount;

    const transfer = await Transfer.create({
      amount,
      user: user._id,
      title:"Spot Generated Bonus",
      desc:"8% Spot Generation 2nd Level",
      sendWallet:"Spot",
      reciveWallet:"Funding"
    })

    await User.findByIdAndUpdate(user._id, { fundingBalance: fundingBalance}, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    await User.findByIdAndUpdate(user._id, { spotBalance: spotBalance}, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });


    await user.fundingHistory.push({
      history:transfer._id,
      status:"In"
    })
    await user.spotHistory.push({
      history:transfer._id,
      status:"Out"
    })
    await user.save();

    res.status(200).json({
      success: true,
      message: "Successfully Amount Transfered"
    });
  }
})

//AI To Spot
exports.aiToSpot= catchAsyncError(async (req, res, next)=>{
  const {amount} = req.body
  const user = await User.findById(req.user.id)
  
  if(!amount){
    return next(new ErrorHandler("Please enter valid amount", 401))
  }

  if(user.aiBalance < amount){
    return next(new ErrorHandler("Invalid Fund", 502))
  }

  const aiBalance = user.aiBalance - amount;
  const spotBalance = user.spotBalance + amount;

  const transfer = await Transfer.create({
    amount,
    user: user._id,
    title:"AI Generated Bonus",
    desc:"8% AI Generation 2nd Level",
    sendWallet:"AI",
    reciveWallet:"Spot"
  })

  await User.findByIdAndUpdate(user._id, { aiBalance: aiBalance}, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  await User.findByIdAndUpdate(user._id, { spotBalance: spotBalance}, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });


  await user.aiHistory.push({
    history:transfer._id,
    status:"Out"
  })
  await user.spotHistory.push({
    history:transfer._id,
    status:"In"
  })
  await user.save();

  res.status(200).json({
    success: true,
    message: "Successfully Amount Transfered"
  });
})


//OTS Transfer
exports.otsTransfer = catchAsyncError(async (req, res, next) => {
  const { amount, reciver, charge } = req.body;
  const  sender = await User.findById(req.user.id)
  const  reciverUser  = await User.findOne({userId: reciver})

  if(!amount){
    return next(new ErrorHandler("Please enter valid amount", 401))
  }
  if(JSON.stringify(sender._id)===JSON.stringify(reciverUser._id)){
    return next(new ErrorHandler("User Not Found", 404))
  }
  if(!reciver){
    return next(new ErrorHandler("User Not Found", 404))
  }

  const senderBalance = sender.fundingBalance - amount - charge
  const reciverBalance = reciverUser.fundingBalance + amount

  if(sender.fundingBalance<(amount+charge)){
    return next(new ErrorHandler("Invalid Fund", 404))
  }else{
    const ots = await OTS.create({
      reciver: reciverUser._id, 
      amount,
      sender: sender._id,
      charge
    });
    
    await User.findByIdAndUpdate(sender._id, { fundingBalance: senderBalance}, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    await sender.otsHistory.sent.push(ots._id)
    await sender.save()
    await User.findByIdAndUpdate(reciverUser._id, { fundingBalance: reciverBalance}, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    await reciverUser.otsHistory.recive.push(ots._id)
    await reciverUser.save()
    
    
    res.status(200).json({
      success: true,
      message: "Successfully Amount Transfered"
    });
  }
   
  
});


// // Update Avatar Image
// exports.updateAvatar = catchAsyncError(async (req, res, next) => {
//   const newUserData = {};

//   if (req.body.avatar !== "") {
//     const user = await User.findById(req.user.id);

//     const imageId = user.avatar.public_id;

//     if (imageId) {
//       await cloudinary.v2.uploader.destroy(imageId);
//     }

//     const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
//       folder: "avatars",
//       width: 400,
//       height:400,
//       crop: "scale",
//     });

//     newUserData.avatar = {
//       public_id: myCloud.public_id,
//       url: myCloud.secure_url,
//     };
//   }
//   const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: false,
//   });
//   res.status(200).json({
//     success: true,
//     user,
//   });
// });


