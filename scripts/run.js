#!/usr/bin/env node

require('babel-register');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/test_prod', {useMongoClient: true, poolSize: 2});
//mongoose.connect('mongodb://localhost:9999/impact', {useMongoClient: true, poolSize: 2});

//require('./default_profiles.js');
//require('./synthese-delete-profil.js');
require('./request_in_progress.js');
