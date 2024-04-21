
const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.post('/register',authController.postRegister);
router.post('/login',authController.postLogin);
// router.get('/hotel')
router.get('/checklogin', authController.getCheck);

module.exports = router;