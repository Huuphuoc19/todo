var express = require('express');
var router = express.Router();
var config = require('./config_route.js');

// route for shorten controller
router.use('/todo', require(config.controller.todo));

module.exports = router;