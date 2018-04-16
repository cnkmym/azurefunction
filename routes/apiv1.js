var express = require('express');
var router = express.Router();
var storage = require('../services/storage');
var remotecall = require('../services/remotecall');

router.get('/getWeather', remotecall.getWeather);
router.get('/getHistory', storage.getInputHistory);

exports.router = router;
