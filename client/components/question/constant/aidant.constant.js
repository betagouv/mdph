'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('aidant', [
  {
    model: 'condition',
    titleDefault: 'Votre aidant familial souhaite-t-il s\'exprimer ?',
    titleRep: 'L\'aidant familial de <%= name %> souhaite-t-il s\'exprimer ?',
    type: 'radio',
    answers: [
      {
        label: 'Oui',
        'value': true
      },
      {
        label: 'Non',
        'value': false
      }
    ]
  },
  {
    model: 'lien',
    titleDefault: 'Quel est votre lien avec la personne en situation de handicap ?',
    placeholder: 'Je suis...',
    type: 'text'
  },
  {
    titleDefault: 'Vivez-vous avec la personne en situation de handicap ?',
    model: 'vie',
    type: 'radio',
    neededForAdmin: true,
    answers: [
      {
        label: 'Non',
        value: false
      },
      {
        label: 'Oui',
        value: true,
        detailUrl: 'components/detail/precisez_date.html',
        detailModel: 'vieDetail',
        detailLabel: 'Depuis quand ?'
      }
    ]
  },
  {
    titleDefault: 'Avez-vous un emploi ?',
    model: 'emploi',
    type: 'radio',
    neededForAdmin: true,
    answers: [
      {
        label: 'Non',
        value: false
      },
      {
        label: 'Oui',
        value: true,
        detailUrl: 'components/detail/precisez_yes_no.html',
        detailModel: 'emploiDetail',
        detailLabel: 'Réduction d’activité liée à la prise en charge de la personne aidée'
      }
    ]
  },
  {
    titleDefault: 'Quelle est la nature de l\'aide apportée ?',
    model: 'natureAide',
    neededForAdmin: true,
    type: 'checkbox',
    'answers':[
      {label: 'Surveillance / présence responsable', model: 'surveillance'},
      {label: 'Aide aux déplacements à l’intérieur du logement', model: 'deplacementInterieur'},
      {label: 'Aide aux déplacements à l’extérieur', model: 'deplacementExterieur'},
      {label: 'Aide pour entretenir le logement et le linge', model: 'logement'},
      {label: 'Aide à l’hygiène corporelle', model: 'hygiene'},
      {label: 'Aide à la préparation des repas', model: 'repasPreparation'},
      {label: 'Aide à la prise de repas', model: 'repasPrise'},
      {label: 'Coordination des intervenants professionnels à l’extérieur', model: 'professionnels'},
      {label: 'Gestion administrative et juridique', model: 'juridique'},
      {label: 'Gestion financière', model: 'finances'},
      {label: 'Stimulation par des activités (loisirs, sorties, etc.)', model: 'loisirs'},
      {label: 'Aide à la communication et aux relations sociales', model: 'social'},
      {label: 'Aide au suivi médical', model: 'medical'},
      {label: 'Autres', model: 'autre', detailModel: 'natureAideDetail', detailUrl:'components/detail/precisez.html'}
    ]
  },
  {
    titleDefault: 'Etes vous dédommagé(e) pour l’aide apportée à votre proche ?',
    model: 'dedommagement',
    type: 'radio',
    answers: [
      {
        label: 'Non',
        value: false
      },
      {
        label: 'Oui',
        value: true,
        detailUrl: 'components/detail/precisez_montant.html',
        detailModel: 'dedommagementDetail',
        placeholder: 'Montant mensuel'
      }
    ]
  },
  {
    titleDefault: 'Quelqu\'un participe-t-il avec vous à l\'accompagnement de la personne aidée ?',
    model: 'accompagnement',
    type: 'checkbox',
    'answers':[
      {label: 'Oui, un (des) professionnel(s)', model: 'professionnel'},
      {label: 'Oui, un (ou plusieurs) autre(s) proche(s)', model: 'proches'}
    ]
  },
  {
    titleDefault: 'Etes-vous soutenu dans votre fonction d’aidant ?',
    model: 'soutien',
    type: 'checkbox',
    'answers':[
      {label: 'Vous participez à des rencontres avec d’autres aidants', model: 'rencontres'},
      {label: 'Vous êtes soutenu individuellement', model: 'individuel'}
    ]
  },
  {
    titleDefault: 'En cas d\'empêchement, avez-vous prévu une solution pour vous remplacer ?',
    model: 'empechement',
    type: 'radio',
    answers: [
      {
        label: 'Non',
        value: false
      },
      {
        label: 'Oui',
        value: true,
        detailUrl: 'components/detail/precisez.html',
        detailModel: 'empechementDetail',
        placeholder: 'Laquelle'
      }
    ]
  },
  {
    titleDefault: 'Serez-vous prochainement dans une des situations suivantes ?',
    model: 'situationFuture',
    type: 'checkbox',
    'answers':[
      {label: 'Eloignement géographique (déménagement, ...)', model: 'eloignement'},
      {label: 'Indisponibilité prolongée (séjour à l’étranger, hospitalisation, ...)', model: 'indisponible'},
      {label: 'Problème de santé', model: 'sante'},
      {label: 'Changement majeur dans la situation professionnelle', model: 'professionnelle'},
      {label: 'Changement majeur dans la situation personnelle (séparation, départ en établissement de retraite ...)', model: 'personnel'},
      {label: 'Autres changements prochains de situation', model: 'autre', detailModel: 'situationDetail', detailUrl:'components/detail/precisez.html'}
    ]
  },
  {
    titleDefault: 'Avez-vous besoin de mieux connaitre les aides et dispositifs existants ?',
    model: 'demandesAides',
    type: 'checkbox',
    'answers':[
      {label: 'Pour vous', model: 'eloignement'},
      {label: 'Pour la personne aidée', model: 'indisponible'},
      {label: 'Autres', model: 'autre', detailModel: 'aidesDetail', detailUrl:'components/detail/precisez.html'}
    ]
  },
  {
    model: 'structure',
    type: 'structure',
    titleDefault: 'Avez-vous déjà identifié une ou plusieurs structures qui pourraient répondre à vos attentes?'
  },
  {
    titleDefault: 'Quelles sont vos attentes en tant qu\'aidant familial ?',
    model: 'typeAttente',
    neededForAdmin: true,
    type: 'checkbox',
    answers:
    [
      {label: 'Pouvoir vous reposer au quotidien', model: 'repos'},
      {label: 'Pouvoir vous faire remplacer en cas d’un imprévu', model: 'imprevu'},
      {label: 'Pouvoir vous faire remplacer pour partir en week-end/vacances', model: 'vacances'},
      {label: 'Reprendre/renforcer/maintenir votre activité professionnelle', model: 'professionnel'},
      {label: 'Reprendre/renforcer/maintenir vos liens sociaux', model: 'social'},

      {label: 'Obtenir une contre-partie financière', model: 'finance'},
      {label: 'Echanger avec d’autres aidants', model: 'echanges'},
      {label: 'Avoir un soutien psychologique', model: 'psychologique'},
      {label: 'Etre conseillé pour mieux faire face au handicap de votre proche', model: 'conseil'},
      {label: 'Etre affilié gratuitement à l’assurance vieillesse', model: 'vieillesse'},

      {label: 'Autre attente', model: 'autre', detailModel: 'attentesDetail', detailUrl:'components/detail/precisez.html'}
    ]
  },
  {
    model: 'autresRenseignements',
    type: 'text',
    titleDefault: 'Autres renseignements que vous souhaiteriez nous communiquer concernant votre vie d\'aidant'
  }
]);
