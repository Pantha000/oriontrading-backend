const express = require("express");
const router = express.Router();
// const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { depositRequest, loadUserDeposit, withdrawRequest, loadUserWithdraw } = require("../controllers/adminControllers");

router.route("/user/all/deposit").get(depositRequest);
router.route("/user/deposit/load").put(loadUserDeposit )
router.route("/user/all/withdraw").get(withdrawRequest)
router.route("/user/withdraw/load").put(loadUserWithdraw)

module.exports = router