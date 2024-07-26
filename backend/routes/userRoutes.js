const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, userVerification, depositUser, sentUpdatePasswordToken, updatePassword, updateProfile, withdrawUser, otsTransfer, fundingToSpot, spotTransfer, aiToSpot, tradeOption, updatePhone, sentUpdatePhoneToken} = require("../controllers/userControllers")

router.route("/register/user").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/profile/me").get(isAuthenticatedUser, getUserDetails);

router.route("/user/verification").put(isAuthenticatedUser, authorizeRoles("user"), userVerification)
router.route("/sent/password/token").get(isAuthenticatedUser, authorizeRoles("user"), sentUpdatePasswordToken)
router.route("/update/password").put(isAuthenticatedUser, authorizeRoles("user"), updatePassword)
router.route("/sent/phone/token").get(isAuthenticatedUser, authorizeRoles("user"), sentUpdatePhoneToken)
router.route("/update/phone").put(isAuthenticatedUser, authorizeRoles("user"), updatePhone)
// // router.route("/token").get(getToken)
router.route("/profile/update").put(isAuthenticatedUser, authorizeRoles("user"), updateProfile)
router.route("/user/withdraw").post(isAuthenticatedUser, authorizeRoles("user"), withdrawUser)
router.route("/user/deposit").post(isAuthenticatedUser, authorizeRoles("user"), depositUser)
router.route("/ots/transfer").put(isAuthenticatedUser, authorizeRoles("user"), otsTransfer)
router.route("/funding/to/spot").put(isAuthenticatedUser, authorizeRoles("user"), fundingToSpot)
router.route("/spot/transfer").put(isAuthenticatedUser, authorizeRoles("user"), spotTransfer)
router.route("/ai/to/spot").put(isAuthenticatedUser, authorizeRoles("user"), aiToSpot)
router.route("/trade/status").put(isAuthenticatedUser, authorizeRoles("user"), tradeOption)

// router.route("/user/avatar/update").put(isAuthenticatedUser, authorizeRoles("user"), updateAvatar)
// router.route("/me/update").put(isAuthenticatedUser, updateProfile);
// router.route("/me/update/avatar").put(isAuthenticatedUser, updateAvatar);
// router.route("/me/update/banner").put(isAuthenticatedUser, updateBanner);
// router.route("/me/update/about").put(isAuthenticatedUser, updateAbout);

module.exports = router;