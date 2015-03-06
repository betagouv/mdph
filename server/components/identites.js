'use strict';

var identiteToHtml = function(identite) {
  return '<div class="question">' + identite.prenom + ' ' + identite.nom + '</div>'
};

exports.sectionToHtml = function(identites) {
  var str = '';

  str += '<div class="section"><h2>Bénéficiaire</h2>';
  str += identiteToHtml(identites.beneficiaire);
  str += '</div>';

  return str;
};
