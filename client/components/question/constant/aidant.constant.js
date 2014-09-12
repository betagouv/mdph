'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('aidant', [
  {
    model: 'condition',
    titleDefault: 'Votre aidant familial souhaite-t-il s\'exprimer ?',
    answers: [
      {
        'labelDefault': 'Oui',
        'value': true
      },
      {
        'labelDefault': 'Non',
        'value': false
      }
    ]
  },
  {
    model: 'lien',
    titleDefault: 'Quel est votre lien avec la personne en situation de handicap ?'
  },
  {
    titleDefault: 'Vivez-vous avec la personne en situation de handicap ?',
    model: 'vie',
    answers: [
      {
        labelDefault: 'Non',
        value: false
      },
      {
        labelDefault: 'Oui',
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
    answers: [
      {
        labelDefault: 'Non',
        value: false
      },
      {
        labelDefault: 'Oui',
        value: true,
        detailUrl: 'components/detail/precisez_yes_no.html',
        detailModel: 'emploiDetail',
        detailLabel: 'Réduction d’activité liée à la prise en charge de la personne aidée'
      }
    ]
  },
  {
    titleDefault: 'Quelle est la nature de l\'aide apportée ? (1/2)',
    'model': 'natureAide',
    'answers':[
      {labelDefault: 'Surveillance / présence responsable', model: 'surveillance'},
      {labelDefault: 'Aide aux déplacements à l’intérieur du logement', model: 'deplacement_interieur'},
      {labelDefault: 'Aide aux déplacements à l’extérieur', model: 'deplacement_exterieur'},
      {labelDefault: 'Aide pour entretenir le logement et le linge', model: 'logement'},
      {labelDefault: 'Aide à l’hygiène corporelle', model: 'hygiene'},
      {labelDefault: 'Aide à la préparation des repas', model: 'repas_preparation'},
      {labelDefault: 'Aide à la prise de repas', model: 'repas_prise'}
    ]
  },
  {
    titleDefault: 'Quelle est la nature de l\'aide apportée ? (2/2)',
    'model': 'natureAideBis',
    'answers':[
      {labelDefault: 'Coordination des intervenants professionnels à l’extérieur', model: 'professionnels'},
      {labelDefault: 'Gestion administrative et juridique', model: 'juridique'},
      {labelDefault: 'Gestion financière', model: 'finances'},
      {labelDefault: 'Stimulation par des activités (loisirs, sorties, etc.)', model: 'loisirs'},
      {labelDefault: 'Aide à la communication et aux relations sociales', model: 'social'},
      {labelDefault: 'Aide au suivi médical', model: 'medical'},
      {labelDefault: 'Autres', model: 'autre', detailModel: 'natureAideDetail', detailUrl:'components/detail/precisez.html'}
    ]
  },
  {
    titleDefault: 'Etes vous dédommagé(e) pour l’aide apportée à votre proche ?',
    model: 'dedommagement',
    answers: [
      {
        labelDefault: 'Non',
        value: false
      },
      {
        labelDefault: 'Oui',
        value: true,
        detailUrl: 'components/detail/precisez_montant.html',
        detailModel: 'dedommagementDetail',
        placeholder: 'Montant mensuel'
      }
    ]
  },
  {
    titleDefault: 'Quelqu\'un participe-t-il avec vous à l\'accompagnement de la personne aidée ?',
    'model': 'accompagnement',
    type: 'checkbox',
    'answers':[
      {labelDefault: 'Oui, un (des) professionnel(s)', model: 'professionnel'},
      {labelDefault: 'Oui, un (ou plusieurs) autre(s) proche(s)', model: 'proches'}
    ]
  },
  {
    titleDefault: 'Etes-vous soutenu dans votre fonction d’aidant ?',
    'model': 'soutien',
    'answers':[
      {labelDefault: 'Vous participez à des rencontres avec d’autres aidants', model: 'rencontres'},
      {labelDefault: 'Vous êtes soutenu individuellement', model: 'individuel'}
    ]
  },
  {
    titleDefault: 'En cas d\'empêchement, avez-vous prévu une solution pour vous remplacer ?',
    model: 'empechement',
    answers: [
      {
        labelDefault: 'Non',
        value: false
      },
      {
        labelDefault: 'Oui',
        value: true,
        detailUrl: 'components/detail/precisez.html',
        detailModel: 'empechementDetail',
        placeholder: 'Laquelle'
      }
    ]
  },
  {
    titleDefault: 'Serez-vous prochainement dans une des situations suivantes ?',
    'model': 'situationFuture',
    'answers':[
      {labelDefault: 'Eloignement géographique (déménagement, ...)', model: 'eloignement'},
      {labelDefault: 'Indisponibilité prolongée (séjour à l’étranger, hospitalisation, ...)', model: 'indisponible'},
      {labelDefault: 'Problème de santé', model: 'sante'},
      {labelDefault: 'Changement majeur dans la situation professionnelle', model: 'professionnelle'},
      {labelDefault: 'Changement majeur dans la situation personnelle (séparation, départ en établissement de retraite ...)', model: 'personnel'},
      {labelDefault: 'Autres changements prochains de situation', model: 'autre', detailModel: 'situationDetail', detailUrl:'components/detail/precisez.html'}
    ]
  },
  {
    titleDefault: 'Avez-vous besoin de mieux connaitre les aides et dispositifs existants ?',
    'model': 'demandesAides',
    'answers':[
      {labelDefault: 'Pour vous', model: 'eloignement'},
      {labelDefault: 'Pour la personne aidée', model: 'indisponible'},
      {labelDefault: 'Autres', model: 'autre', detailModel: 'aidesDetail', detailUrl:'components/detail/precisez.html'}
    ]
  },
  {
    model: 'structure',
    titleDefault: 'Avez-vous déjà identifié une ou plusieurs structures qui pourraient répondre à vos attentes?'
  },
  {
    titleDefault: 'Quelles sont vos attentes en tant qu\'aidant familial ?',
    model: 'typeAttente',
    answers:
    [
      {'labelDefault': 'Pouvoir vous reposer au quotidien', 'model': 'repos'},
      {'labelDefault': 'Pouvoir vous faire remplacer en cas d’un imprévu', 'model': 'imprevu'},
      {'labelDefault': 'Pouvoir vous faire remplacer pour partir en week-end/vacances', 'model': 'vacances'},
      {'labelDefault': 'Reprendre/renforcer/maintenir votre activité professionnelle', 'model': 'professionnel'},
      {'labelDefault': 'Reprendre/renforcer/maintenir vos liens sociaux', 'model': 'social'},

      {'labelDefault': 'Obtenir une contre-partie financière', 'model': 'finance'},
      {'labelDefault': 'Echanger avec d’autres aidants', 'model': 'echanges'},
      {'labelDefault': 'Avoir un soutien psychologique', 'model': 'psychologique'},
      {'labelDefault': 'Etre affilié gratuitement à l’assurance vieillesse', 'model': 'vieillesse'},
      {'labelDefault': 'Etre conseillé pour mieux faire face au handicap de votre proche', 'model': 'conseil'},

      {'labelDefault': 'Autre attente', 'model': 'autre', detailModel: 'attentesDetail', detailUrl:'components/detail/precisez.html'}
    ]
  },
  {
    model: 'autresRenseignements',
    titleDefault: 'Autres renseignements que vous souhaiteriez nous communiquer concernant votre vie d\'aidant'
  }
]);
