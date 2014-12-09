'use strict';

var express = require('express');
var controller = require('./send-mail.controller');

var router = express.Router();

router.post('/', controller.sendMail);
router.post('/confirmation', controller.sendConfirmation);

module.exports = router;
