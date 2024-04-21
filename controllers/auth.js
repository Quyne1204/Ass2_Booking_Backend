const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.postRegister = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const checkUserName = await User.findOne({ username: req.body.username });

    if (checkUserName) {
        return res.status(404).json({ message: "Username exists" });
    }

    const user = new User({ ...req.body, password: hash });
    user.save().then((item) => { return res.status(200).json({ message: "Created User" }); });


};
exports.postLogin = async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(404).json({ message: "Username not fount" });
    }

    const checkPass = await bcrypt.compare(req.body.password, user.password);
    if (!checkPass) {
        return res.status(404).json({ message: "Wrong password or username!" });
    }

    const accessToken = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin
    }, "nguyenvanquyne");

    const { password, isAdmin, ...ortherDetails } = user._doc;

    return res.status(200).json({ detail: { ...ortherDetails }, isAdmin, accessToken });
};
exports.getCheck = (req, res, next) => {
    const token = req.headers.cookies;
    const success = jwt.verify(token, 'nguyenvanquyne');

    if (success) {
        User.findOne({ _id: success.id })
            .then(user => {
                req.user = user;
                res.status(200).json(user);
                next();
            })
    } else {
        res.status(400).json({ message: "Ban can dang nhap" });
    }
}