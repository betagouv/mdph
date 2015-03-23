'use strict';

var express = require('express');
var controller = require('./partenaire.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/:id', controller.show);
router.post('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.get('/:id/:secret', controller.confirm);

module.exports = router;
