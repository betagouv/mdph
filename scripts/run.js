#!/usr/bin/env node

require('babel-register');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/impact-prod', {useMongoClient: true, poolSize: 2});

require('./migration-lot4');

