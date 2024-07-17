const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, userVerification, depositUser, sentUpdatePasswordToken, updatePassword, updateProfile} = require("../controllers/userControllers")

router.route("/register/user").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/profile/me").get(isAuthenticatedUser, getUserDetails);

router.route("/user/verification").put(isAuthenticatedUser, authorizeRoles("user"), userVerification)
router.route("/user/deposit").post(isAuthenticatedUser, authorizeRoles("user"), depositUser)
router.route("/sent/password/token").get(isAuthenticatedUser, authorizeRoles("user"), sentUpdatePasswordToken)
router.route("/update/password").put(isAuthenticatedUser, authorizeRoles("user"), updatePassword)
// // router.route("/token").get(getToken)
router.route("/profile/update").put(isAuthenticatedUser, authorizeRoles("user"), updateProfile)
// router.route("/user/avatar/update").put(isAuthenticatedUser, authorizeRoles("user"), updateAvatar)
// router.route("/me/update").put(isAuthenticatedUser, updateProfile);
// router.route("/me/update/avatar").put(isAuthenticatedUser, updateAvatar);
// router.route("/me/update/banner").put(isAuthenticatedUser, updateBanner);
// router.route("/me/update/about").put(isAuthenticatedUser, updateAbout);

module.exports = router;