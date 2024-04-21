
const express = require('express');

const hotelController = require('../controllers/hotel');

const router = express.Router();

router.get('/city', hotelController.countbyCity);
router.get('/category', hotelController.countbyCate);
router.get('/top3-rating', hotelController.getTop3Rating);

router.get('/room/:id', hotelController.getDetail);
router.post('/search', hotelController.getSearch);
router.post('/room-hotels', hotelController.getRoom);

module.exports = router;