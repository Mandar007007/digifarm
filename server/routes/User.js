const express = require('express');
const { register, login, logout, loadUser, verifyOTP } = require('../controllers/User');
const { isAuthenticated } = require('../middlewares/auth');
const multer = require('multer');
const router = express.Router();



router.post('/register', multer({ storage: multer.diskStorage({}) }).single("avtar"),register)
router.post('/login',login)
router.get('/logout',isAuthenticated,logout)
router.post('/verify',verifyOTP)
router.get('/me',loadUser);


module.exports = router