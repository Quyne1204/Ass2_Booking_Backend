
const Hotel = require("../models/hotel");
const Room = require("../models/room");
const Transaction = require("../models/transaction");
const User = require("../models/user");

//Hotels 
exports.getHotels = (req, res, next) => {
  Hotel.find()
    .then((hotels) => {
      res.status(200).json(hotels);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.addHotel = (req, res, next) => {
  // console.log(req.body);
  const hotel = new Hotel({ ...req.body });
  hotel
    .save()
    .then((hotel) => {
      res.status(200).json({ hotel, success: "Success created hotel!" });
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.delHotel = (req, res, next) => {
  Hotel.deleteOne({ _id: req.body.id })
    .then((hotel) => {
      res.status(200).json({ hotel, message: "Success deleted hotel!" });
    })
    .catch((err) => console.log(err));
};



//rooms
exports.getRooms = (req, res, next) => {
  Room.find()
    .then((rooms) => {
      res.status(200).json(rooms);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.addRoom = (req, res, next) => {
  const room = new Room({ ...req.body });
  room
    .save()
    .then((room) => {
      res.status(200).json({ room, success: "Success created room!" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.delRoom = (req, res, next) => {
  Room.deleteOne({ _id: req.body.id })
    .then((room) => {
      res.status(200).json({ room, message: "Success deleted room!" });
    })
    .catch((err) => console.log(err));
};



// transaction
exports.getTrsHome = (req, res, next) => {
  Transaction.find()
    .sort({ createdAt: -1 })
    .limit(8)
    .then((transactions) => {
      res.status(200).json(transactions);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getTransactions = (req, res, next) => {
  Transaction.find()
    .then((transactions) => {
      res.status(200).json(transactions);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getHome = (req, res, next) => {
  let countUser = 0;
  let order = 0;
  let earnings = 0;
  let balance = 0;

  const startDate = new Date('2024-01-01');
  const currentDate = new Date();
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const totalMonths = (currentYear - startYear) * 12 + (currentMonth - startMonth) + 1;

  Promise.all([
    User.find().then((users) => {
      countUser = users.length;
    }),
    Transaction.find().then((result) => {
      order = result.length;
      earnings = result.reduce((total, transaction) => total + transaction.price, 0);
      balance = earnings / totalMonths;
    }),

  ])
    .then(() => {
      res.status(200).json({ countUser, order, earnings, balance });
    })
    .catch((err) => {
      console.log(err);
    });

};