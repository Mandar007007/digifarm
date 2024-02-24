const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const {
  getAllAuction,
  createAuction,
  checkMail,
  checkAuction,
} = require("../controllers/Auction");
const router = express.Router();
const multer = require("multer");

router.get("/auctions", getAllAuction);
router.post(
  "/auction",
  isAuthenticated,
  multer({ storage: multer.diskStorage({}) }).single("cropImage"),
  createAuction
);
router.post("/sendmail", checkMail);

module.exports = router;
