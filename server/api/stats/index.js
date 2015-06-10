'use strict';

var express = require('express');
var controller = require('./stats.controller');

var router = express.Router();

router.get('/mdph', controller.mdph);
router.get('/site', controller.site);
router.get('/history', controller.history);

module.exports = router;
