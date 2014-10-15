'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) return res.json(401, error);
    if (!user) return res.json(404, {message: 'Une erreur est survenue, veuillez réessayer.'});

    var token = auth.signToken(user._id, user.role);
    res.json({token: token, role:user.role});
  })(req, res, next)
});

module.exports = router;
