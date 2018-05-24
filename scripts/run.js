#!/usr/bin/env node

require('babel-register');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/impact_prod', {useMongoClient: true, poolSize: 2});

//require('./default_profiles.js');
require('./migration-lot4');
