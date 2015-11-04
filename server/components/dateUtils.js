'use strict';

var moment = require('moment');

function getDateNaissance(answers) {
  if (!answers || !answers.identites || !answers.identites.beneficiaire ||  !answers.identites.beneficiaire.dateNaissance) {
    return null;
  } else {
    var date = answers.identites.beneficiaire.dateNaissance;
    return moment(date, moment.ISO_8601);
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

function isAdult(answers) {
  return isMoreThan(answers, 20);
}

function isLessThan(answers, age) {
  var dateNaissance = getDateNaissance(answers);

  if (!dateNaissance) {
    return true;
  } else {
    return moment().diff(dateNaissance, 'years') < age;
  }
}

function getType(answers) {
  return isAdult(answers) ? 'adulte' : 'enfant';
}

exports.isMoreThan = isMoreThan;
exports.isLessThan = isLessThan;
exports.isAdult = isAdult;
exports.getType = getType;
