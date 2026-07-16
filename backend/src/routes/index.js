const express = require('express');
const router = express.Router();
const PingController = require('../controllers/PingController');

router.get('/ping', PingController.ping);

module.exports = router;
