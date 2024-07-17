const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendMail = require("../utils/sendMail");
const cloudinary = require("cloudinary");
const KYC = require("../models/verifyKYCModel")
const Deposit = require("../models/depositModel")
const crypto = require("crypto")


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
  const  user = await User.findById(req.user.id)
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

//Deposit User
exports.depositUser = catchAsyncError(async (req, res, next) => {
  const { amount, trxId, trxProof } = req.body;
  const  user = await User.findById(req.user.id)

  const trxProofImage = await cloudinary.v2.uploader.upload(trxProof, {
    folder: "deposit",
  });
   
  const deposit = await Deposit.create({
    trxProof:trxProofImage.secure_url,
    trxId, 
    amount,
    currency:"USDT",
    user: user._id
  });
  await user.deposit.push(deposit._id)
  await user.save()
  // await User.findByIdAndUpdate(user._id, {
  //   kyc: dep._id,

  // }, {
  //       new: true,
  //       runValidators: true,
  //       useFindAndModify: false,
  // })
  
  res.status(200).json({
    success: true,
    message: "Successfully Deposit Created"
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


