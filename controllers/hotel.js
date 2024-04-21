const Hotel = require("../models/hotel");
const Room = require("../models/room");
const Transaction = require("../models/transaction");

exports.countbyCity = (req, res, next) => {
    const city = req.query.city;
    Hotel.find({
        city: city
    }).then(items => {
        res.status(200).json({ item: items.length });
    })
}
exports.countbyCate = (req, res, next) => {
    const type = req.query.type.toLowerCase();
    Hotel.find({
        type: type
    }).then(items => {
        res.status(200).json({ item: items.length });
    })
}
exports.getTop3Rating = (req, res, next) => {
    Hotel.find()
        .then(items => {
            let newItems = items.sort((a, b) => b.rating - a.rating)
            res.status(200).json([...newItems.slice(0, 3)]);
        })
}
exports.getDetail = (req, res, next) => {
    const id = req.params.id;

    Hotel.findOne({
        _id: id
    }).then(item => {
        res.status(200).json(item);
    })
}
exports.getRoom = async (req, res, next) => {
    const { startDate, endDate, id } = req.body;
    const startDates = new Date(startDate);
    const endDates = new Date(endDate);

    startDates.setDate(startDates.getDate() + 1);
    endDates.setDate(endDates.getDate() + 1);
    const hotels = await Hotel.findById(id).populate("rooms");

    const checkRoomsPromises = hotels.rooms.map(async (room) => {
        const transactions = await Transaction.find({
            hotelId: hotels._id,
            $or: [
                {
                    dateStart: { $lte: endDates },
                    dateEnd: { $gte: startDates }
                },
                {
                    dateStart: { $gte: startDates, $lte: endDates }
                },
                {
                    dateEnd: { $gte: startDates, $lte: endDates }
                }
            ]
        });

        if (transactions.length > 0) {
            const bookedRoomNumbers = transactions.flatMap((tran) => tran.rooms);
            const availableRoomNumbers = room.roomNumbers.filter(
                (number) => !bookedRoomNumbers.includes(number)
            );

            if (availableRoomNumbers.length > 0) {
                return {
                    ...room._doc,
                    roomNumbers: availableRoomNumbers
                };
            }
        } else {
            return {
                ...room._doc,
                roomNumbers: room.roomNumbers
            };
        }
    });

    const checkRooms = await Promise.all(checkRoomsPromises);
    const filteredRooms = checkRooms.filter(room => room !== undefined);


    res.status(200).json(filteredRooms);

}
exports.getSearch = async (req, res, next) => {
    try {
        const { maxPeople, countRoom, city, startDate, endDate } = req.body;
        const startDates = new Date(startDate);
        const endDates = new Date(endDate);
        startDates.setDate(startDates.getDate() + 1);
        endDates.setDate(endDates.getDate() + 1);
      
        let query = {};
        if (city) {
          query = { city: { $regex: city, $options: 'i' } };
        }
      
        const hotels = await Hotel.find(query).populate('rooms');
      
        const checkHotels = await Promise.all(
          hotels.map(async (hotel) => {
            const roomIds = hotel.rooms;
            const roomById = await Room.find({ _id: { $in: roomIds } });
      
            const availableRooms = await Promise.all(
              roomById.map(async (room) => {
                const transactions = await Transaction.find({
                  hotelId: hotel._id,
                  roomId: room._id,
                  $or: [
                    {
                      dateStart: { $lte: endDates },
                      dateEnd: { $gte: startDates },
                    },
                    {
                      dateStart: { $gte: startDates, $lte: endDates },
                    },
                    {
                      dateEnd: { $gte: startDates, $lte: endDates },
                    },
                  ],
                });
      
                const bookedRooms = transactions.reduce((total, tr) => {
                  return total + tr.rooms.length;
                }, 0);
      
                const availableRoomCount = room.roomNumbers.length - bookedRooms;
      
                if (
                  (!maxPeople || room.maxPeople >= Number(maxPeople)) &&
                  availableRoomCount >= Number(countRoom)
                ) {
                  return room;
                }
              })
            );
      
            const availableRoomsFiltered = availableRooms.filter(
              (room) => room !== undefined
            );
      
            if (availableRoomsFiltered.length > 0) {
              return hotel;
            }
          })
        );
      
        const availableHotels = checkHotels.filter((hotel) => hotel !== undefined);
        
        res.status(200).json(availableHotels);
      } catch (error) {
        console.error(error);
      }
}



