#!/usr/bin/env node

require('babel-register');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/test_prod', {useMongoClient: true, poolSize: 2});

require('./mdph_headquarters.js');
//require('./default_profiles.js');
//require('./synthese-delete-profil.js');

