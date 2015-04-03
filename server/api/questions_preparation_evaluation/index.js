'use strict';

var express = require('express');
var controller = require('./questions_preparation_evaluation.controller');
var router = express.Router();

router.get('/', controller.index);

module.exports = router;
