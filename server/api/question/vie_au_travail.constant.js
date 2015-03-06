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
        model: true
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
        model: 'independant'
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
    titleRep: 'A-t-<%= pronoun %> rencontré un professionnel du service social de la CARSAT ?',
    titleDefault: 'Avez-vous rencontré un professionnel du service social de la CARSAT ?',
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
    model: 'structure',
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
        label: 'Pôle emploi',
        model: 'poleEmploi'
      },
      {
        label: 'Cap emploi',
        model: 'capEmploi'
      },
      {
        label: 'Un référent RSA désigné par le Conseil Général',
        model: 'rsa',
      },
      {
        label: 'Le service d\'appui au maintien dans l\'emploi des travailleurs handicapés (SAMETH)',
        model: 'sameth',
      },
      {
        label: 'Autre',
        model: 'autre',
        detailUrl: 'components/detail/precisez.html',
        detailModel: 'autreDetail',
        detailLabel: 'Autre situation'
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
