'use strict';

var express = require('express');
var controller = require('./prestation.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/simulation', controller.simalate);

module.exports = router;
