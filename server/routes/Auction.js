const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const {
  getAllAuction,
  createAuction,
  checkMail,
  checkAuction,
  getPendingPayments,
  verifyPayment,
} = require("../controllers/Auction");
const router = express.Router();
const multer = require("multer");
const { checkOut } = require("../controllers/Auction");

router.get("/auctions", getAllAuction);
router.post(
  "/auction",
  isAuthenticated,
  multer({ storage: multer.diskStorage({}) }).single("cropImage"),
  createAuction
);
router.post("/sendmail", checkMail);
router.post("/getPendingPayments",getPendingPayments)
router.post("/checkout",checkOut)
router.post("/verifyPayment",verifyPayment)
module.exports = router;
