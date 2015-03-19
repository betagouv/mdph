'use strict';

/* jshint multistr: true */

exports.all = [
  {
    model: 'conditionTravail',
    neededForAdmin: true,
    titleDefault: 'Avez-vous actuellement un emploi ?',
    titleRep: 'A-t-<%= pronoun %> actuellement un emploi ?',
    type: 'radio',
    answers: [
      {
        'label': 'Oui',
        model: true,
        detailUrl: 'components/detail/precisez_date.html',
        detailModel: 'conditionTravailDetail',
        detailLabel: 'Depuis quand ?',
      },
      {
        'label': 'Non',
        model: false
      }
    ]
  },
  {
    model: 'milieuTravail',
    titleDefault: 'Où êtes-vous employé ?',
    titleRep: 'Où est-<%= pronoun %> employé<%= fem %> ?',
    type: 'radio',
    answers: [
      {
        label: 'En milieu ordinaire',
        model: 'ordinaire'
      },
      {
        label: 'En entreprise adaptée',
        model: 'adaptee'
      },
      {
        label: 'En milieu protégé (Etablissements et services d’aide par le travail - ESAT)',
        model: 'etablissement'
      }
    ]
  },
  {
    model: 'typeTravail',
    titleDefault: 'Quel est votre type d\'emploi ?',
    titleRep: 'Quel est son type d\'emploi ?',
    type: 'radio',
    answers: [
      {
        label: 'CDI',
        model: 'cdi'
      },
      {
        label: 'CDD',
        model: 'cdd'
      },
      {
        label: 'Interim',
        model: 'interim'
      },
      {
        label: 'Contrat aidé',
        model: 'contrat_aide'
      },
      {
        label: 'Travailleur indépendant',
        model: 'independant',
        detailUrl: 'components/detail/precisez.html',
        detailModel: 'independantDetail',
        detailLabel: 'Régime :'
      }
    ]
  },
  {
    model: 'employeur',
    titleDefault: 'Qui est votre employeur ?',
    titleRep: 'Qui est son employeur ?',
    type: 'employeur'
  },
  {
    model: 'nomPoste',
    titleDefault: 'Quel est le nom de votre poste ?',
    titleRep: 'Quel est le nom de son poste ?',
    placeholder: 'Nom du poste',
    type: 'text'
  },
  {
    model: 'temps',
    neededForAdmin: true,
    titleDefault: 'Votre emploi est-il à temps complet ou partiel ?',
    titleRep: 'Son emploi est-il à temps complet ou partiel ?',
    type: 'radio',
    answers: [
      {
        'label': 'Temps complet',
        model: true
      },
      {
        'label': 'Temps partiel',
        model: false
      }
    ]
  },
  {
    model: 'adapte',
    neededForAdmin: true,
    titleDefault: 'Votre emploi est-il adapté à votre handicap ?',
    titleRep: 'Son emploi est-il adapté à son handicap ?',
    type: 'radio',
    answers: [
      {
        label: 'Non',
        model: false,
        detailUrl: 'components/detail/precisez.html',
        detailModel: 'adapteDetail'
      },
      {
        label: 'Oui',
        model: true
      }
    ]
  },
  {
    model: 'difficultes',
    titleRep: 'Quelles sont les difficultés liées à son handicap ?',
    titleDefault: 'Quelles sont les difficultés liées à votre handicap ?',
    type: 'text'
  },
  {
    model: 'amenagement',
    titleRep: 'Des aménagements ont-ils été réalisés sur son poste de travail ?',
    titleDefault: 'Des aménagements ont-ils été réalisés sur votre poste de travail ?',
    type: 'radio',
    answers: [
      {
        label: 'Non',
        model: false
      },
      {
        label: 'Oui',
        model: true,
        detailUrl: 'components/detail/precisez.html',
        detailModel: 'amenagementDetail'
      }
    ]
  },
  {
    titleDefault: 'Êtes-vous actuellement en arrêt de travail ?',
    titleRep: 'Est-<%= pronoun %> actuellement en arrêt de travail ?',
    model: 'arretDeTravail',
    type: 'radio',
    answers: [
      {
        'label': 'Non',
        model: false
      },
      {
        'label': 'Oui',
        model: true,
        detailUrl: 'components/detail/precisez_date.html',
        detailModel: 'arretDeTravailDetail',
        detailLabel: 'Depuis quand ?',
        type: 'date'
      }
    ]
  },
  {
    titleDefault: 'Pour quelle raison êtes-vous en arrêt de travail ?',
    titleRep: 'Pour quelle raison est-<%= pronoun %> en arrêt de travail ?',
    model: 'arretDeTravailRaison',
    type: 'radio',
    answers: [
      {
        label: 'Arrêt maladie avec indemnités journalières',
        model: 'avecIndemnites'
      },
      {
        label: 'Arrêt maladie sans indemnités journalières',
        model: 'sansIndemnites'
      },
      {
        label: 'Vous êtes en arrêt suite à un accident du travail ou une maladie professionnelle',
        model: 'accidentTravail'
      },
      {
        label: 'Congé maternité/congé d\'adoption/autre',
        model: 'autre'
      }
    ]
  },
  {
    titleRep: 'A-t-<%= pronoun %> rencontré un professionnel du service social de votre caisse de retraite ?',
    titleDefault: 'Avez-vous rencontré un professionnel du service social de votre caisse de retraite ?',
    model: 'profesionnelSocial',
    type: 'radio',
    'answers': [
      {
        'label': 'Non',
        model: false
      },
      {
        'label': 'Oui',
        model: true,
        detailUrl: 'components/detail/precisez_date.html',
        detailModel: 'profesionnelSocialDetail',
        detailLabel: 'A quelle date ?',
        type: 'date'
      }
    ]
  },
  {
    titleRep: 'A-t-<%= pronoun %> rencontré le médecin du travail en visite de pré-reprise ?',
    titleDefault: 'Avez-vous rencontré le médecin du travail en visite de pré-reprise ?',
    model: 'medecinTravail',
    type: 'radio',
    'answers': [
      {
        'label': 'Non',
        model: false
      },
      {
        'label': 'Oui',
        model: true,
        detailUrl: 'components/detail/precisez_date.html',
        detailModel: 'medecinTravailDetail',
        detailLabel: 'A quelle date ?',
        type: 'date'
      }
    ]
  },
  {
    titleRep: 'Bénéficie-t-<%= pronoun %> d\'une ou des prestations suivantes ?',
    titleDefault: 'Bénéficiez-vous d\'une ou des prestations suivantes ?',
    model: 'prestations',
    type: 'checkbox',
    'answers': [
      {
        label: 'Aides de l\'association de gestion du fonds pour l\'insertion professionnelle handicapées (AGEFIPH)',
        model: 'agefiph'
      },
      {
        label: 'Aides du fonds pour l\'insertion des personnes handicapées dans la fonction publique (FIPHFP)',
        model: 'fiphfp'
      },
      {
        label: 'Autre',
        model: 'autre',
        detailUrl: 'components/detail/precisez.html',
        detailModel: 'prestationsDetail'
      }
    ]
  },
  {
    titleRep: 'Bénéficie-t-<%= pronoun %> d\'une reconnaissance de la qualité de travailleur handicapé (RQTH) ?',
    titleDefault: 'Bénéficiez-vous d\'une reconnaissance de la qualité de travailleur handicapé (RQTH) ?',
    model: 'rqth',
    type: 'radio',
    'answers': [
      {
        'label': 'Non',
        model: false
      },
      {
        'label': 'Oui',
        model: true
      }
    ]
  },
  {
    titleRep: 'A-t-<%= pronoun %> un ou plusieurs projet(s) professionnel(s) ?',
    titleDefault: 'Avez-vous un ou plusieurs projet(s) professionnel(s) ?',
    model: 'description',
    type: 'radio',
    'answers': [
      {
        'label': 'Non',
        model: false
      },
      {
        'label': 'Oui',
        model: true,
        detailUrl: 'components/detail/precisez_big.html',
        detailModel: 'descriptionDetail'
      }
    ]
  },
  {
    titleRep: 'Pourquoi a-t-<%= pronoun %> besoin de soutien ?',
    titleDefault: 'Pourquoi avez-vous besoin de soutien ?',
    model: 'besoinSoutien',
    type: 'checkbox',
    answers:
    [
      {'label': 'Faire un bilan de capacités professionnelles', model: 'bilan'},
      {'label': 'Préciser un projet professionnel', model: 'precisions'},
      {'label': 'Adapter l\'environnement de travail', model: 'environnement'},
      {'label': 'Accéder à un emploi', model: 'emploi'},
      {'label': 'Accéder à une formation', model: 'formation'},

      {'label': 'Autre besoin', model: 'autre', 'detailModel': 'besoinSoutienAutre', detailUrl: 'components/detail/precisez.html'}
    ]
  },
  {
    model: 'structures',
    type: 'structure',
    titleDefault: 'Avez-vous déjà identifié une ou plusieurs structures qui pourraient répondre à vos attentes ?',
    titleRep: 'A-t-<%= pronoun %> déjà identifié une ou plusieurs structures qui pourraient répondre à ses attentes ?'
  },
  {
    model: 'autresRenseignements',
    titleDefault: 'Autres renseignements concernant votre vie au travail que vous souhaiteriez nous communiquer',
    titleRep: 'Autres renseignements concernant sa vie au travail que vous souhaiteriez nous communiquer',
    type: 'text'
  },
  {
    titleRep: 'Est-<%= pronoun %> dans une des situations suivantes ?',
    titleDefault: 'Êtes-vous dans une des situations suivantes ?',
    model: 'situationSansEmploi',
    type: 'checkbox',
    answers:
    [
      {
        label: 'Inscrit à pôle emploi',
        model: 'poleEmploi',
        detailUrl: 'components/detail/precisez_big.html',
        detailModel: 'poleEmploiDetail',
      },
      {
        label: 'En formation continue',
        model: 'formation',
        detailUrl: 'components/detail/precisez_big.html',
        detailModel: 'formationDetail',
      },
      {
        label: 'Etudiant',
        model: 'etudiant',
        detailUrl: 'components/detail/precisez_big.html',
        detailModel: 'etudiantDetail',
      },
      {
        label: 'Stagiaire',
        model: 'stagiaire',
        detailUrl: 'components/detail/precisez_yes_no.html',
        detailModel: 'stagiaireDetail',
        detailLabel: 'Êtes-vous rémunéré ?'
      }
    ]
  },
  {
    model: 'situationStage',
    titleDefault: 'Au sein de quel organisme effectuez-vous votre stage ?',
    titleRep: 'Au sein de quel organisme effectue-t-<%= pronoun %> son stage ?',
    type: 'text',
    placeholder: 'Nom de l\'organisme'
  },
  {
    titleRep: 'Son accompagnement vers l\'emploi ou son maintien dans l\'emploi est réalisé par',
    titleDefault: 'Votre accompagnement vers l\'emploi ou votre maintien dans l\'emploi est réalisé par',
    model: 'situationAccompagnement',
    type: 'checkbox',
    answers:
    [
      {
        label: 'Mission locale',
        model: 'mission'
      },
      {
        label: 'Cap emploi',
        model: 'capEmploi'
      },
      {
        label: 'Pôle emploi',
        model: 'poleEmploi'
      },
      {
        label: 'Un référent RSA désigné par le Conseil Général',
        model: 'rsa',
      },
      {
        label: 'Autre',
        model: 'autre',
        detailUrl: 'components/detail/precisez.html',
        detailModel: 'autreDetail',
        detailLabel: 'Préciser :'
      }
    ]
  },
  {
    titleRep: 'A-t-<%= pronoun %> déjà travaillé ?',
    titleDefault: 'Avez-vous déjà travaillé ?',
    type: 'radio',
    model: 'passe',
    'answers': [
      {
        'label': 'Oui',
        model: true,
        detailUrl: 'components/detail/precisez_big.html',
        detailModel: 'passeDetail',
        detailLabel: 'Pourquoi êtes-vous actuellement sans emploi et depuis quand ?'
      },
      {
        'label': 'Non',
        model: false
      }
    ]
  }
];
