'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('SectionConstants', [
  {
    id: 'identite',
    sref: '.identite',
    label: 'Identité',
    desc: 'Identité de l\'enfant ou de l\'adulte concerné par la demande',
    section: 'obligatoire'
  },
  {
    id: 'autorite',
    sref: '.autorite',
    label: 'Autorité parentale',
    desc: 'Identité de l\'autorité parentale ou délégation d\'autorité parentale',
    section: 'obligatoire'
  },
  {
    id: 'vieQuotidienne',
    sref: '.vie_quotidienne.situation.vie_famille',
    label: 'Vie quotidienne',
    desc: '',
    section: 'obligatoire'
  },
  {
    id: 'scolaire',
    sref: '.vie_scolaire.situation.condition',
    label: 'Vie scolaire ou étudiante',
    desc: 'Si votre demande concerne votre scolarité ou vie étudiante',
    section: 'complementaire'
  },
  {
    id: 'travail',
    sref: '.vie_au_travail.situation_professionnelle.condition',
    label: 'Vie au travail',
    desc: 'Si votre demande concerne votre projet professionnel',
    section: 'complementaire'
  },
  {
    id: 'situationsParticulieres',
    sref: '.situations_particulieres',
    label: 'Situations particulières',
    desc: 'Si vous vous trouvez dans une situation nécessitant une attention particulière',
    section: 'complementaire'
  },
  {
    id: 'detailRenouvellement',
    sref: '.renouvellement.evolution',
    label: 'Renouvellement',
    desc: 'Vous avez déjà un dossier dans une autre MDPH et souhaitez nous indiquer de quels droits vous bénéficiez actuellement',
    section: 'autour_de_votre_demande'
  },
  {
    id: 'aidant',
    sref: '.aidant.situation.lien',
    label: 'Vie de votre aidant familial',
    desc: 'Si vous souhaitez exprimer des besoins en tant qu\'aidant familial',
    section: 'autour_de_votre_demande'
  },
  {
    id: 'aidePartenaire',
    sref: '.aide_partenaire',
    label: 'Vous êtes aidés dans vos démarches',
    desc: 'Si vous acceptez que nous contactons ces personnes afin de mieux évaluer votre situation',
    section: 'autour_de_votre_demande'
  }
]);
