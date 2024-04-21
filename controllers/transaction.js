const mongoose = require('mongoose');

const Transaction = require("../models/transaction");
const Hotel = require("../models/hotel");
const User = require('../models/user');



exports.getByUser = async (req, res, next) => {
    // console.log(req.user);
    await Transaction.find({ 'user._id': req.user._id })
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.postBooking = async (req, res, next) => {
    try {

        const hotel = await Hotel.findOne({ _id: req.body.id_hotel }).exec();
        await User.findByIdAndUpdate(
            { _id: req.body.user._id },
            {
                $set: {
                    fullName: req.body.fullname,
                    email: req.body.email,
                    phoneNumber: req.body.phone,
                    cardNumber: req.body.cardnumber,
                }
            }
        )

        const dateStart = new Date(req.body.dateStart);
        const dateEnd = new Date(req.body.dateEnd);


        const transaction = new Transaction({
            user: req.body.user,
            hotelId: req.body.id_hotel,
            hotel: hotel.name,
            rooms: req.body.rooms,
            roomId: req.body.roomIds,
            dateStart: dateStart.setDate(dateStart.getDate() + 1),
            dateEnd: dateEnd.setDate(dateEnd.getDate() + 1),
            price: req.body.price,
            payment: req.body.payment,
            status: req.body.status,
            cardNumber: req.body.cardnumber
        });
        transaction.save().then((i) => res.status(200).json({ message: "Room booked successfully" }));

    } catch (error) {
        console.error(error);
    }
}