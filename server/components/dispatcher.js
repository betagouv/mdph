'use strict';

var _ = require('lodash');

var DispatchRule = require('../api/dispatch-rule/dispatch-rule.model');

exports.findEvaluator = function(request, callback) {
  var evaluator = null;

  DispatchRule.find({}, function(err, rules) {
    if (rules) {
      rules.forEach(function(rule) {
        if (_.contains(rule.zipcodes, request.formAnswers.identites.beneficiaire.code_postal)) {
          evaluator = rule.evaluator;
        }
      });
    }

    callback(evaluator);
  });
}
