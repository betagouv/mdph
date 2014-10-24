'use strict';

var express = require('express');
var controller = require('./certificat.controller');

var router = express.Router();

router.post('/:shortId', controller.save);
router.put('/:shortId', controller.validate);

module.exports = router;
