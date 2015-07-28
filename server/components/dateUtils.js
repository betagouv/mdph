'use strict';

var moment = require('moment');

function getDateNaissance(answers) {
  if (!answers || !answers.identites || !answers.identites.beneficiaire ||  !answers.identites.beneficiaire.dateNaissance) {
    return null;
  } else {
    return answers.identites.beneficiaire.dateNaissance;
  }
}

function isMoreThan(answers, age) {
  var dateNaissance = getDateNaissance(answers);

  if (!dateNaissance) {
    return true;
  } else {
    return moment().diff(dateNaissance, 'years') >= age;
  }
}

exports.isMoreThan = isMoreThan;

exports.isLessThan = function(answers, age) {
  var dateNaissance = getDateNaissance(answers);

  if (!dateNaissance) {
    return true;
  } else {
    return moment().diff(dateNaissance, 'years') < age;
  }
};

exports.isAdult = function(answers) {
  return isMoreThan(answers, 20);
};
