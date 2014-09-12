'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('questions', [
  {
    model: 'estRepresentant',
    section: 'contexte',
    titleDefault: 'Pour qui faites vous cette demande ?',
    type: 'radio',
    answers: [
      {
        labelDefault: 'Pour vous',
        value: false,
        documents: [{category: 'obligatoire', id: 'carteIdentite'}]
      },
      {
        labelDefault: 'Pour une autre personne',
        value: true,
        detailUrl: 'components/detail/personne.html',
        documents: [{category: 'obligatoire', id: 'carteIdentite'}, {category: 'obligatoire', id: 'carteIdentiteRepresentant'}],
      }
    ]
  },
  {
    model: 'codePostal',
    section: 'contexte',
    titleDefault: 'Quel est votre code postal ?',
    titleRep: 'Quel est le code postal de <%= name %>?',
    type: 'text'
  },
  {
    model: 'nouveauDossier',
    section: 'contexte',
    titleDefault: 'Est-ce votre premier dossier ?',
    titleRep: 'Est-ce son premier dossier ?',
    type: 'radio',
    answers: [
      {
        labelDefault: 'Oui',
        value: true
      },
      {
        labelDefault: 'Non',
        value: false
      }
    ]
  },
  {
    model: 'numDossier',
    section: 'contexte',
    titleDefault: 'Connaissez-vous votre numéro de dossier ?',
    titleRep: 'Connaissez-vous son numéro de dossier ?',
    answers: [
      {
        labelDefault: 'Oui',
        value: true,
        detailModel: 'numeroDossier',
        detailUrl: 'components/detail/precisez.html',
        detailLabel: 'Numéro'
      },
      {
        labelDefault: 'Non',
        value: false
      }
    ],
  },
  {
    model: 'raison',
    type: 'checkbox',
    titleDefault: 'Quelle est la raison de votre renouvellement ?',
    titleRep: 'Quelle est la raison de son renouvellement ?',
    section: 'contexte',
    answers: [
      {
        labelDefault: 'Vous arrivez à la fin de vos droits',
        labelRep: '<%= name %> arrive à la fin de ses droits',
        model: 'finDeVosDroits'
      },
      {
        labelDefault: 'Votre situation a changé',
        labelRep: 'Sa situation a changé',
        model: 'changementDeSituation'
      }
    ]
  },
  {
    model: 'dateNaissance',
    type: 'text',
    titleDefault: 'Quelle est votre date de naissance ?',
    titleRep: 'Quelle est sa date de naissance ?',
    section: 'contexte'
  },
  {
    model: 'urgences',
    titleDefault: 'Vous trouvez-vous dans une des situations suivantes ?',
    titleRep: 'Se trouve-t-il dans une des situations suivantes ?',
    answers:
    [
      {
        labelDefault: 'Vous n\'arrivez plus à vivre chez vous',
        labelRep: '<%= pronoun %> n\'arrive plus à vivre à domicile',
        model: 'domicile',
        detail: true,
        detailModel: 'urgences_domicile',
        detailUrl: 'components/detail/precisez_big.html',
        placeholder: 'Expliquez la difficulté'
      },
      {
        labelDefault: 'Votre établissement ne peux plus vous acceuillir et vous ne pouvez pas retourner chez vous',
        labelRep: 'Son établissement ne peux plus l\'acceuillir et <%= pronoun %> ne peut pas retourner chez <%= pronounTonic %>',
        model: 'etablissement',
        detail: true,
        detailModel: 'urgences_etablissement',
        detailUrl: 'components/detail/precisez_big.html',
        placeholder: 'Expliquez la difficulté'
      },
      {
        labelDefault: 'Votre école ne peux plus vous acceuillir',
        labelRep: 'Son école ne peux plus l\'acceuillir',
        detail: true,
        detailModel: 'urgences_ecole',
        detailUrl: 'components/detail/precisez_big.html',
        placeholder: 'Expliquez la difficulté',
        model: 'ecole'
      },
      {
        labelDefault: 'Vous risquez de perdre votre travail',
        labelRep: '<%= pronoun %> risque de perdre son travail',
        detail: true,
        detailModel: 'urgences_travail',
        detailUrl: 'components/detail/precisez_big.html',
        placeholder: 'Expliquez la difficulté',
        model: 'travail'
      },
      {
        labelDefault: 'Vous commencez bientôt une nouvelle formation',
        labelRep: '<%= pronoun %> commence bientôt une nouvelle formation',
        detailModel: 'urgences_formation',
        detailUrl: 'components/detail/precisez_date.html',
        detailLabel: 'Date d\'entrée prévue',
        model: 'formation'
      }
    ]
  },

  /* Vie quotidienne */
  {
    model: 'famille',
    titleDefault: 'Avec qui vivez-vous ?',
    titleRep: 'Avec qui vit-t-<%= pronoun %> ?',
    answers: [
      {
        labelDefault: 'Avec vos parents',
        labelRep: 'Avec ses parents',
        value: 'parents'
      },
      {
        labelDefault: 'Seul(e)',
        labelRepMasc: 'Seul',
        labelRepFem: 'Seule',
        value: 'seul'
      },
      {
        labelDefault: 'En couple',
        value: 'couple',
        onlyAdult: true
      },
      {
        labelDefault: 'Avec vos enfants',
        labelRep: 'Avec ses enfants',
        value: 'enfants',
        onlyAdult: true
      },
      {
        labelDefault: 'Autre',
        value: 'autre',
        detailModel: 'famille_autre',
        detailUrl: 'components/detail/precisez.html'
      }
    ]
  },
  {
    model: 'logement',
    titleDefault: 'Où logez-vous ?',
    titleRep: 'Où loge-t-<%= pronoun %> ?',
    answers: [
      {
        labelDefault: 'En logement indépendant',
        value: 'independant', // TODO a verifier onlyAdult: true,
        detailUrl: 'components/detail/independant.html',
        detailModel: 'logement_independant'
      },
      {
        labelDefault: 'En établissement',
        value: 'etablissement',
        detailUrl: 'components/detail/precisez.html',
        detailModel: 'logement_etablissement',
        placeholder: 'Nom de l\'établissement',
        documents: [{category: 'sante', id: 'bilanAccompagnementEnfant'}]
      },
      {
        labelDefault: 'Hébergé(e) au domicile par une autre personne',
        value: 'domicile',
        detailUrl: 'components/detail/domicile.html',
        detailModel: 'logement_domicile'
      },
      {
        labelDefault: 'Autre',
        value: 'autre',
        detailUrl: 'components/detail/precisez.html',
        detailModel: 'logement_autre'
      }
    ]
  },
  {
    model: 'finDroits',
    titleDefault: 'De quelles prestations bénéficiez-vous actuellement ?',
    titleRep: 'De quelles prestations bénéficie-t-<%= pronoun %> actuellement ?',
    type: 'checkbox'
  },
  {
    model: 'besoinsVie',
    titleDefault: 'Quels sont vos besoins d\'aide dans la vie quotidienne ?',
    titleRep: 'Quels sont ses besoins d\'aide dans la vie quotidienne ?',
    type: 'checkbox',
    answers: [
      {
        labelDefault: 'Pour l\'hygiène corporelle (se laver, aller aux toilette)',
        model: 'hygiene'
      },
      {
        labelDefault: 'Pour vous habiller (mettre et ôter vos vêtements, les choisir ....)',
        labelRep: 'Pour s\'habiller (mettre et ôter ses vêtements, les choisir ....)',
        model: 'habits'
      },
      {labelDefault: 'Pour faire les courses', model: 'courses'},
      {labelDefault: 'Pour faire le ménage et l\'entretien des vêtements', model: 'menage', onlyAdult: true},
      {labelDefault: 'Pour préparer les repas', model: 'cuisine', onlyAdult: true},
      {labelDefault: 'Pour prendre les repas', model: 'repas'},
      {labelDefault: 'Pour gérer votre budget et répondre à vos obligations (assurances, impôts... )', model: 'budget', onlyAdult: true},
      {
        labelDefault: 'Pour prendre soin de votre santé (suivre un traitement, aller en consultation... )',
        labelRep: 'Pour prendre soin de sa santé (suivre un traitement, aller en consultation... )',
        model: 'sante'
      },
      {labelDefault: 'Pour vivre en logement autonome', model: 'logement'},
      {labelDefault: 'Autre besoin', model: 'autre', detailModel: 'besoinsVie_autre', detailUrl: 'components/detail/precisez.html'}
    ]
  },
  {
    'model': 'besoinsDeplacement',
    titleDefault: 'Quels sont vos besoins d\'aide concernant vos déplacements ?',
    titleRep: 'Quels sont ses besoins d\'aide concernant ses déplacements ?',
    type: 'checkbox',
    'answers':[
      {'labelDefault': 'Pour se déplacer au sein du domicile', 'model': 'intraDomicile'},
      {'labelDefault': 'Pour sortir du domicile et y accéder', 'model': 'accesDomicile'},
      {'labelDefault': 'Pour se déplacer à l\'extérieur du domicile', 'model': 'public'},
      {'labelDefault': 'Pour utiliser les transports en commun', 'model': 'transports'},
      {'labelDefault': 'Pour partir en vacances', 'model': 'vacances'},
      {'labelDefault': 'Pour adapter le véhicule pour pouvoir conduire', 'model': 'conduite', 'onlyAdult': true},
      {'labelDefault': 'Autre besoin', 'model': 'autre', detailModel: 'besoinsDeplacement_autre', detailUrl: 'components/detail/precisez.html'}
    ]
  },
  {
    model: 'besoinsSocial',
    titleDefault: 'Quels sont vos besoins d\'aide dans vos relations sociales et familiales ?',
    titleRep: 'Quels sont ses besoins d\'aide dans ses relations sociales et familiales ?',
    'answers': [
      { labelDefault: 'Pour communiquer (s\'exprimer, se faire comprendre)', model: 'communication' },
      { labelDefault: 'Pour avoir des activités culturelles, sportives et de loisirs', model: 'loisirs' },
      {
        labelDefault: 'Pour les relations les autres',
        model: 'proches'
      },
      {
        labelDefault: 'Pour vous occuper de votre famille',
        labelRep: 'Pour s\'occuper de sa famille',
        model: 'famille', 'onlyAdult': true
      },
      {
        labelDefault: 'Pour vous accompagner dans votre vie citoyenne (ex: aller voter, vie associative ...)',
        labelRep: 'Pour se faire accompagner dans sa vie citoyenne (ex: aller voter, vie associative ...)',
        model: 'citoyen', 'onlyAdult': true
      },
      {
        labelDefault: 'Pour assurer votre sécurité',
        labelRep: 'Pour assurer sa sécurité',
        model: 'securite'
      },
      { labelDefault: 'Autre besoin', model: 'autre', detailModel: 'besoinsSocial_autre', detailUrl: 'components/detail/precisez.html' }
    ]
  },
  {
    'model': 'besoinsLieuDeVie',
    titleDefault: 'Quels sont vos besoins d\'aide pour adapter votre lieu de vie ?',
    titleRep: 'Quels sont ses besoins d\'aide pour adapter son lieu de vie ?',
    'answers': [
      {
        'labelDefault': 'Pour vous équiper d\'un matériel spécifique',
        labelRep: 'Pour s\'équiper d\'un matériel spécifique',
        'model': 'materiel'
      },
      {
        'labelDefault': 'Pour aménager votre lieu de vie',
        labelRep: 'Pour aménager son lieu de vie',
        'model': 'amenagement'},
      {'labelDefault': 'Autre besoin', 'model': 'autre', detailModel: 'besoinsLieuDeVie_autre', detailUrl: 'components/detail/precisez.html'}
    ]
  },
  {
    model: 'attentesTypeAide',
    titleDefault: 'Quelles sont vos attentes pour compenser votre handicap ?',
    titleRep: 'Quelles sont ses attentes pour compenser son handicap ?',
    answers:
    [
      {labelDefault: 'Vivre à domicile', model: 'domicile'},
      {labelDefault: 'Une aide technique, du matériel ou équipement', model: 'materiel'},
      {labelDefault: 'Vivre en établissement', model: 'etablissement'},
      {
        labelDefault: 'Une aide financière, afin de vous\'assurer un revenu minimum',
        labelRep: 'Une aide financière, afin de lui\'assurer un revenu minimum',
        model: 'financierMinimum'
      },
      {
        labelDefault: 'Un aménagement de votre lieu de vie',
        labelRep: 'Un aménagement de son lieu de vie',
        model: 'amenagement'
      },
      {
        labelDefault: 'Une aide financière pour des dépenses liées à votre handicap',
        labelRep: 'Une aide financière pour des dépenses liées à son handicap',
        model: 'financierHandicap'
      },
      {
        labelDefault: 'Une aide humaine, avec quelqu\'un qui vient vous aider',
        labelRep: 'Une aide humaine, avec quelqu\'un qui vient l\'aider',
        model: 'humain'
      },
      {labelDefault: 'Une aide à la mobilité', model: 'mobilite'},
      {labelDefault: 'Autre besoin', model: 'autre', detailModel: 'attentesTypeAide_autre', detailUrl: 'components/detail/precisez.html'}
    ]
  },
  {
    model: 'vieQuotidienneStructure',
    titleDefault: 'Avez-vous déjà identifié une ou plusieurs structures qui pourraient répondre à vos attentes?',
    type: 'checkbox'
  },
  {
    model: 'vieQuotidienneAutresRenseignements',
    titleDefault: 'Autres renseignements que vous souhaiteriez nous communiquer',
    type: 'checkbox'
  },
  {
    model: 'objetDemande',
    titleDefault: 'Quels autres projets sont concernés par votre demande ?',
    titleRep: 'Quels autres projets sont concernés par sa demande ?',
    'answers': [
      {
        'labelDefault': 'Votre scolarité ou vie étudiante',
        'labelRep': 'Sa scolarité ou vie étudiante',
        'model': 'scolarite'
      },
      {
        'labelDefault': 'Votre vie professionnelle',
        'labelRep': 'Sa vie professionnelle',
        'model': 'travail'
      }
    ]
  }
]);
