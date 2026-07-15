const express = require('express');
const router = express.Router();
const pingController = require('../controllers/pingController');

// System-level routes
router.get('/ping', pingController.getPing);

module.exports = router;
