const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");



exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const  token =  req.headers["authorization"] || req.cookies;
  const bearer = token.split(" ")

  if (!token) {
    next(new ErrorHandler("Please Login to access this resource", 401));
  } else {
   
    const decodeData = jwt.verify(bearer[1], process.env.JWT_SECRET);

    
    
      req.user = await User.findById(decodeData.id);
  // console.log(req.user)
    
  }
  // console.log(req.user)
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
