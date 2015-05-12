'use strict';

var moment = require('moment');

function getDateNaissance(answers) {
  if (!answers || !answers.identites || !answers.identites.beneficiaire ||  !answers.identites.beneficiaire.dateNaissance) {
    return null;
  } else {
    return answers.identites.beneficiaire.dateNaissance;
  }
}

 exports.estAdulte = function (answers) {
  var dateNaissance = getDateNaissance(answers);

  if (!dateNaissance) {
    return true;
  } else {
    return moment().diff(dateNaissance, 'years') >= 18;
  }
};

 exports.plusDe20ans = function (answers) {
  var dateNaissance = getDateNaissance(answers);

  if (!dateNaissance) {
    return true;
  } else {
    return moment().diff(dateNaissance, 'years') >= 20;
  }
};

 exports.aMoinsDe62Ans = function (answers) {
  var dateNaissance = getDateNaissance(answers);

  if (!dateNaissance) {
    return true;
  } else {
    return moment().diff(dateNaissance, 'years') < 62;
  }
};
