const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique : true
    },
    fullName: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: Number,
        required: false,
        unique : true
    },
    email: {
        type: String,
        required: false,
        unique : true
    },
    password: {
        type: String,
        required: true,
    },
    cardNumber: {
        type: Number,
        required: false,
    },
    isAdmin: {
        type: Boolean,
        default: false, 
    }
});

module.exports = mongoose.model("User",UserSchema);

