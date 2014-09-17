'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('travail', [
  {
    model: 'conditionTravail',
    titleDefault: 'Avez-vous actuellement un emploi ?',
    titleRep: 'A-t-<%= pronoun %> actuellement un emploi ?',
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
    model: 'milieuTravail',
    titleDefault: 'Où êtes-vous employé ?',
    titleRep: 'Où est-<%= pronoun %> employé<%= fem %> ?',
    answers: [
      {
        labelDefault: 'En milieu ordinaire',
        value: 'ordinaire'
      },
      {
        labelDefault: 'En entreprise adaptée',
        value: 'adaptee'
      },
      {
        labelDefault: 'En milieu protégé (Etablissements et services d’aide par le travail - ESAT)',
        value: 'etablissement'
      }
    ]
  },
  {
    model: 'typeTravail',
    titleDefault: 'Quel est votre type d\'emploi ?',
    titleRep: 'Quel est son type d\'emploi ?',
    answers: [
      {
        labelDefault: 'CDI',
        value: 'cdi'
      },
      {
        labelDefault: 'CDD',
        value: 'cdd'
      },
      {
        labelDefault: 'Interim',
        value: 'interim'
      },
      {
        labelDefault: 'Contrat aidé',
        value: 'contrat_aide'
      },
      {
        labelDefault: 'Travailleur indépendant',
        value: 'independant'
      }
    ]
  },
  {
    model: 'employeur',
    titleDefault: 'Qui est votre employeur ?',
    titleRep: 'Qui est son employeur ?'
  },
  {
    model: 'nomPoste',
    titleDefault: 'Quel est le nom de votre poste ?',
    titleRep: 'Quel est le nom de son poste ?'
  },
  {
    model: 'temps',
    titleDefault: 'Votre emploi est-il a temps complet ou partiel ?',
    titleRep: 'Son emploi est-il a temps complet ou partiel ?',
    answers: [
      {
        'labelDefault': 'Temps complet',
        'value': true
      },
      {
        'labelDefault': 'Temps partiel',
        'value': false
      }
    ]
  },
  {
    model: 'heures',
    titleDefault: 'Quellle est votre durée de travail par semaine ?',
    titleRep: 'Quellle est sa durée de travail par semaine ?'
  },
  {
    model: 'adapte',
    titleDefault: 'Votre emploi est-il adapté à votre handicap ?',
    titleRep: 'Son emploi est-il adapté à son handicap ?',
    answers: [
      {
        labelDefault: 'Non',
        value: false,
        detailUrl: 'components/detail/precisez.html',
        detailModel: 'adapteDetail'
      },
      {
        labelDefault: 'Oui',
        value: true
      }
    ]
  },
  {
    model: 'difficultes',
    titleRep: 'Quelles sont les difficultées liées à son handicap ?',
    titleDefault: 'Quelles sont les difficultées liées à votre handicap ?'
  },
  {
    model: 'amenagement',
    titleRep: 'Des aménagements ont-ils été réalisés sur son poste de travail ?',
    titleDefault: 'Des aménagements ont-ils été réalisés sur votre poste de travail ?',
    answers: [
      {
        labelDefault: 'Non',
        value: false
      },
      {
        labelDefault: 'Oui',
        value: true,
        detailUrl: 'components/detail/precisez.html',
        detailModel: 'amenagementDetail'
      }
    ]
  },
  {
    titleDefault: 'Etes-vous actuellement en arrêt de travail ?',
    titleRep: 'Est-<%= pronoun %> actuellement en arrêt de travail ?',
    model: 'arretDeTravail',
    answers: [
      {
        'labelDefault': 'Non',
        'value': false
      },
      {
        'labelDefault': 'Oui',
        'value': true,
        detailUrl: 'components/detail/precisez_date.html',
        detailModel: 'arretDeTravailDetail',
        detailLabel: 'Depuis quand ?'
      }
    ]
  },
  {
    titleRep: 'Touche-t-<%= pronoun %> des indemnités journalières ?',
    titleDefault: 'Touchez vous des indemnités journalières ?',
    model: 'indemniteJournaliere',
    answers: [
      {
        labelDefault: 'Non',
        value: false
      },
      {
        labelDefault: 'Oui',
        value: true,
        detailUrl: 'components/detail/precisez_date.html',
        detailModel: 'indemniteJournaliereDetail',
        detailLabel: 'Depuis quand ?'
      }
    ]
  },
  {
    titleRep: 'Est-<%= pronoun %> en arrêt suite à un accident du travail ou une maladie professionnelle ?',
    titleDefault: 'Etes-vous en arrêt suite à un accident du travail ou une maladie professionnelle ?',
    model: 'accidentTravail',
    'answers': [
      {
        'labelDefault': 'Non',
        'value': false
      },
      {
        'labelDefault': 'Oui',
        'value': true,
        detailUrl: 'components/detail/precisez_date.html',
        detailModel: 'accidentTravailDetail',
        detailLabel: 'Depuis quand ?'
      }
    ]
  },
  {
    titleRep: 'A-t-<%= pronoun %> rencontré un professionnel du service social de la CARSAT ?',
    titleDefault: 'Avez-vous rencontré un professionnel du service social de la CARSAT ?',
    model: 'profesionnelSocial',
    'answers': [
      {
        'labelDefault': 'Non',
        'value': false
      },
      {
        'labelDefault': 'Oui',
        'value': true,
        detailUrl: 'components/detail/precisez_date.html',
        detailModel: 'profesionnelSocialDetail',
        detailLabel: 'A quelle date ?'
      }
    ]
  },
  {
    titleRep: 'A-t-<%= pronoun %> rencontré le médecin du travail en visite de pré-reprise ?',
    titleDefault: 'Avez-vous rencontré le médecin du travail en visite de pré-reprise ?',
    model: 'medecinTravail',
    'answers': [
      {
        'labelDefault': 'Non',
        'value': false
      },
      {
        'labelDefault': 'Oui',
        'value': true,
        detailUrl: 'components/detail/precisez_date.html',
        detailModel: 'medecinTravailDetail',
        detailLabel: 'A quelle date ?'
      }
    ]
  },
  {
    titleRep: 'A-t-<%= pronoun %> un ou plusieurs projet(s) professionnel(s) ?',
    titleDefault: 'Avez-vous un ou plusieurs projet(s) professionnel(s) ?',
    model: 'description',
    'answers': [
      {
        'labelDefault': 'Non',
        'value': false
      },
      {
        'labelDefault': 'Oui',
        'value': true,
        detailUrl: 'components/detail/precisez_big.html',
        detailModel: 'descriptionDetail'
      }
    ]
  },
  {
    titleRep: 'Pour quoi a-t-<%= pronoun %> besoin de soutien ?',
    titleDefault: 'Pour quoi avez-vous besoin de soutien ?',
    model: 'besoinSoutien',
    type: 'checkbox',
    answers:
    [
      {'labelDefault': 'Faire un bilan de capacités professionnelles', model: 'bilan'},
      {'labelDefault': 'Préciser un projet professionnel', model: 'precisions'},
      {'labelDefault': 'Adapter l\'environnement de travail', model: 'environnement'},
      {'labelDefault': 'Accéder à un emploi', model: 'emploi'},
      {'labelDefault': 'Accéder à une formation', model: 'formation'},

      {'labelDefault': 'Autre besoin', model: 'autre', 'detailModel': 'besoinSoutienAutre', detailUrl: 'components/detail/precisez.html'}
    ]
  },
  {
    model: 'structure',
    titleDefault: 'Avez-vous déjà identifié une ou plusieurs structures qui pourraient répondre à vos attentes?'
  },
  {
    model: 'autresRenseignements',
    titleDefault: 'Avez-vous déjà identifié une ou plusieurs structures qui pourraient répondre à vos attentes?'
  }
]);
