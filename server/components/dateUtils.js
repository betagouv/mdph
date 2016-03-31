'use strict';

import moment from 'moment';

function isMoreThan(dateNaissance, age) {
  if (!dateNaissance) {
    return true;
  } else {
    return moment().diff(dateNaissance, 'years') >= age;
  }
}

function isLessThan(dateNaissance, age) {
  if (!dateNaissance) {
    return true;
  } else {
    return moment().diff(dateNaissance, 'years') < age;
  }
}

function isAdult(dateNaissance) {
  return isMoreThan(dateNaissance, 20);
}

function getType(dateNaissance) {
  return isAdult(dateNaissance) ? 'adulte' : 'enfant';
}

exports.isMoreThan = isMoreThan;
exports.isLessThan = isLessThan;
exports.isAdult = isAdult;
exports.getType = getType;
