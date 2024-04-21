const User = require("../models/user");
module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(404).json({ message: "Xin lỗi bạn cần phải đăng nhập." });
    }

    const userId = req.headers.authorization;

    User.findOne({ _id: userId,isAdmin:true })
        .then((user) => {
            if (user) {
                req.user = user;
                return next();
            } else {
                return res.status(400).json({ message: "Ban khong co quyen admin" });
            }
        })
        .catch((error) => {
            console.log(error);
        });
};