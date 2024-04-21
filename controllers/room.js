const Hotel = require("../models/hotel");
const Room = require("../models/room");

exports.getRoom = (req, res, next) => {
    const id = req.query.id_room;
    Room.findOne({
        _id: id
    }).then(items => {
        const roomNumbers = items.roomNumbers; // Lấy giá trị roomNumbers từ đối tượng items
        res.status(200).json({ roomNumbers: roomNumbers });
    });
}

