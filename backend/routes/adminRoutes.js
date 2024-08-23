const express = require("express");
const router = express.Router();
// const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { depositRequest, loadUserDeposit, withdrawRequest, loadUserWithdraw, getAllKyc,  getAllUser, getDepositBalance, getWithdrawBalance, pendingWithdraw, updateKYC, deleteKYC, allBalance, createStaff, deleteStaff, updateAdminUser, getAllSubscriber, subscriberMessage, adminAddReff, allUserReffer, adminLogin, registerAdmin, pendingDeposit, getPendingKyc } = require("../controllers/adminControllers");

router.route("/admin/create").post(registerAdmin)
router.route('/admin/login').post(adminLogin)

router.route("/user/all/deposit").get(depositRequest);
router.route("/user/deposit/load").put(loadUserDeposit )
router.route("/user/all/withdraw").get(withdrawRequest)
router.route("/user/withdraw/load").put(loadUserWithdraw)

router.route("/all/user").get(getAllUser)
router.route("/update/admin/user").put(updateAdminUser)
router.route("/all/subscriber").get(getAllSubscriber)
router.route("/subscriber/message").put(subscriberMessage)
router.route("/all/reffer/user").get(allUserReffer)
router.route("/admin/reffer").put(adminAddReff)

router.route("/all/balance").get(allBalance)
router.route("/deposit/balance").get(getDepositBalance)
router.route("/pending/deposit").get(pendingDeposit)
router.route("/pending/withdraw").get(pendingWithdraw)
router.route("/withdraw/balance").get(getWithdrawBalance)

router.route("/user/all/kyc").get(getAllKyc)
router.route("/user/pending/kyc").get(getPendingKyc)
router.route('/admin/update/kyc').put(updateKYC)
router.route('/admin/delete/kyc').put(deleteKYC)


router.route("/create/staff").post(createStaff)
router.route("/delete/staff").delete(deleteStaff)

module.exports = router