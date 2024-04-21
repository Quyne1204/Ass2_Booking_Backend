const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");

//hotels
router.get("/hotels", adminController.getHotels);
router.post("/hotel/delete", adminController.delHotel);
router.post("/hotel/add", adminController.addHotel);
// //rooms
router.get("/rooms", adminController.getRooms);
router.post("/room/delete", adminController.delRoom);
router.post("/room/add", adminController.addRoom);

//transaction
router.get("/home/transaction", adminController.getTrsHome);
router.get("/transactions", adminController.getTransactions);

//admin
router.get("/home", adminController.getHome);


module.exports = router;
