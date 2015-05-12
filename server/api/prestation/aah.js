'use strict';

var _ = require('lodash');
var DateUtils = require('../../components/dateUtils');

function renouvellement(answers) {
  return true;
}

function premiereAttribution(answers) {
  return _.every([
    DateUtils.plusDe20Ans(answers),
    _.some([
      answers.vie_quotidienne.besoinsVie.courant,
      answers.vie_quotidienne.attentesTypeAide.financierMinimum
    ]),

  ]);
}

module.exports = function(answers) {
  if (answers.estRenouvellement) {
    return renouvellement(answers);
  } else {
    return premiereAttribution(answers);
  }
};

//   return _.every([
//     DateUtils.estAdulte(answers),
//     _.some([
//       getValue(besoinsVie, 'courant'),
//       getValue(attentesTypeAide, 'financierMinimum'),
//     ]),
//     _.some([
//       // MTP ??
//       // PCRTP ??
//       _.every([
//         getValue(attentesTypeAide, 'humain'),
//         _.some([
//           _.some( getValueList(besoinsVie, ['hygiene', 'habits', 'repas']) ),
//           getValue(besoinsDeplacement, 'intraDomicile')
//         ]),
//       ]),
//       _.every([
//         getValue(besoinsSocial, 'securite'),
//         _.every([
//           _.every( getValueList(besoinsSocial, ['proches', 'loisirs', 'citoyen']) ),
//           _.every( getValueList(besoinsVie, ['budget', 'courses', 'cuisine', 'menage', 'sante']) ),
//           estNonActif
//         ])
//       ]),
//       _.every([
//         getValue(besoinsLieuDeVie, 'materiel'),
//         _.every([
//           _.every( getValueList(besoinsVie, ['hygiene', 'habits', 'repas']) ),
//           getValue(besoinsDeplacement, 'public'),
//           estNonActif
//         ])
//       ])
//     ])
//   ]);
// };
