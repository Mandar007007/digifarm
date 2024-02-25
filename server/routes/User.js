const express = require('express');
const { register, login, logout, loadUser, verifyOTP, setPayment } = require('../controllers/User');
const { isAuthenticated } = require('../middlewares/auth');
const multer = require('multer');
const router = express.Router();



router.post('/register', multer({ storage: multer.diskStorage({}) }).single("avtar"),register)
router.post('/login',login)
router.get('/logout',isAuthenticated,logout)
router.post('/verify',verifyOTP)
router.get('/me',loadUser);
router.post('/setpayment',setPayment)


module.exports = router