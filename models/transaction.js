const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    user: {
        username: {
            type: String,
        },
        _id: {
            type: Schema.Types.ObjectId,
            require: true,
            ref: "User",
        },
    },
    hotelId: {
        type: String,
        required: true,
        ref: "Hotel"
    },
    hotel: {
        type: String,
        required: true,
    },
    rooms: {
        type: [Number],
        required: true
    },
    roomId: {
        type: [String],
        required: true
    },
    dateStart: {
        type: Date,
        required: true
    },
    dateEnd: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    payment: {
        type: String,
        required: true,
    },
    cardNumber: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Booked'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Transaction", TransactionSchema);
