
const express = require('express');

const roomController = require('../controllers/room');

const router = express.Router();

router.get('/room',roomController.getRoom);

module.exports = router;