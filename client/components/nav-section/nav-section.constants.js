'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('SectionConstants', [
  {
    id: 'identite',
    sref: '.identite',
    label: 'Identité',
    desc: 'Identité de l\'enfant ou de l\'adulte concerné par la demande',
    optional: false
  },
  {
    id: 'autorite',
    sref: '.autorite',
    label: 'Autorité parentale',
    desc: 'Identité de l\'autorité parentale ou délégation d\'autorité parentale',
    optional: false
  },
  {
    id: 'vieQuotidienne',
    sref: '.vie_quotidienne.situation.vie_famille',
    label: 'Vie quotidienne',
    desc: '',
    optional: false
  },
  {
    id: 'detailRenouvellement',
    sref: '.renouvellement.evolution',
    label: 'Renouvellement',
    desc: 'Vous avez déjà un dossier dans une autre MDPH et souhaitez nous indiquer de quels droits vous bénéficiez actuellement',
    optional: true
  },
  {
    id: 'scolaire',
    sref: '.vie_scolaire.situation.condition',
    label: 'Vie scolaire ou étudiante',
    desc: 'Si votre demande concerne votre scolarité ou vie étudiante',
    optional: true
  },
  {
    id: 'travail',
    sref: '.vie_au_travail.situation_professionnelle.condition',
    label: 'Vie au travail',
    desc: 'Si votre demande concerne votre projet professionnel',
    optional: true
  },
  {
    id: 'aidant',
    sref: '.aidant.situation.lien',
    label: 'Vie de votre aidant familial',
    desc: 'Si vous souhaitez exprimer des besoins en tant qu\'aidant familial',
    optional: true
  },
  {
    id: 'aidePartenaire',
    sref: '.aide_partenaire',
    label: 'Vous êtes aidés dans vos démarches',
    desc: 'Si vous acceptez que nous contactons ces personnes afin de mieux évaluer votre situation',
    optional: true
  }
]);
