
const express = require('express');

const transactionController = require('../controllers/transaction');
const user = require('../models/user');

const router = express.Router();

router.use((req, res, next) => {
    // console.log(req.headers)
    if (!req.headers.authorization) {
        return res.status(404).json({ message: "Xin lỗi bạn cần phải đăng nhập." });
    }

    const userId = req.headers.authorization;

    user.findOne({ _id: userId })
        .then((user) => {
            req.user = user;
            return next();
        })
        .catch((error) => {
            console.log(error);
        });
});

router.get("/getByUser", transactionController.getByUser);

router.post("/postBooking", transactionController.postBooking);

module.exports = router;