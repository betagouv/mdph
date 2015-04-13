'use strict';

var express = require('express');
var controller = require('./partenaire.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.save);
router.get('/:id', controller.show);
router.post('/:id', controller.save);
router.patch('/:id', controller.save);
router.delete('/:id', controller.destroy);

router.get('/:id/:secret', controller.confirm);

module.exports = router;
