'use strict';

var mongoose = require('mongoose');

mongoose.models = {};
mongoose.modelSchemas = {};

// Register the Babel require hook
require('babel-core/register');
