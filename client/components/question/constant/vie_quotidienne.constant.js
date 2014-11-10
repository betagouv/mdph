'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('vieQuotidienne', [
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
        labelDefault: 'Avec vos enfants (ou l\'un d\'entre eux)',
        labelRep: 'Avec ses enfants (ou l\'un d\'entre eux)',
        value: 'enfants',
        onlyAdult: true
      },
      {
        labelDefault: 'Vous vivez dans un établissement',
        labelRep: '<%= pronoun %> vit dans un établissement',
        value: 'etablissement',
        detailUrl: 'components/detail/precisez_big.html',
        detailModel: 'logement_etablissement',
        placeholder: 'Nom de l\'établissement, type et lieu',
        documents: [{category: 'sante', id: 'bilanAccompagnementEnfant'}]
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
        labelDefault: 'Vous avez un logement indépendant',
        labelRep: '<%= pronoun %> a un logement indépendant',
        value: 'independant', // TODO a verifier onlyAdult: true,
        detailUrl: 'components/detail/independant.html',
        detailModel: 'logement_independant'
      },
      {
        labelDefault: 'Vous êtes hébergé(e) au domicile par une autre personne',
        labelRep: '<%= pronoun %> est hébergé<%= fem %> au domicile par une autre personne',
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
    model: 'besoinsVie',
    titleDefault: 'Vous avez besoin d\'aide dans votre vie quotidienne :',
    titleRep: 'Elle a besoin d\'aide dans sa vie quotidienne :',
    type: 'checkbox',
    answers: [
      {
        labelDefault: 'Pour faire face aux dépenses courantes (loyer, énergie, habillement, alimentation, ...)',
        model: 'courant',
        onlyAdult: true
      },
      {labelDefault: 'Pour gérer votre budget et répondre à vos obligations (assurances, impôts... )', model: 'budget', onlyAdult: true},
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
      {labelDefault: 'Pour préparer les repas', model: 'cuisine', onlyAdult: true},
      {labelDefault: 'Pour prendre les repas', model: 'repas'},
      {labelDefault: 'Pour faire le ménage et l\'entretien des vêtements', model: 'menage', onlyAdult: true},
      {
        labelDefault: 'Pour prendre soin de votre santé (suivre un traitement, aller en consultation... )',
        labelRep: 'Pour prendre soin de sa santé (suivre un traitement, aller en consultation... )',
        model: 'sante'
      },
      {labelDefault: 'Autre besoin', model: 'autre', detailModel: 'besoinsVie_autre', detailUrl: 'components/detail/precisez.html'}
    ]
  },
  {
    model: 'besoinsDeplacement',
    titleDefault: 'Vous avez besoin d\'aide pour vous déplacer :',
    titleRep: 'Elle a besoin d\'aide pour se déplacer :',
    type: 'checkbox',
    answers:[
      {labelDefault: 'Pour se déplacer à l\'intérieur du domicile', model: 'intraDomicile'},
      {labelDefault: 'Pour sortir du domicile et y accéder', model: 'accesDomicile'},
      {labelDefault: 'Pour se déplacer à l\'extérieur du domicile', model: 'public'},
      {labelDefault: 'Pour utiliser un véhicule', model: 'conduite'},
      {labelDefault: 'Pour utiliser les transports en commun', model: 'transports'},
      {labelDefault: 'Pour partir en vacances', model: 'vacances'},
      {labelDefault: 'Autre besoin', model: 'autre', detailModel: 'besoinsDeplacement_autre', detailUrl: 'components/detail/precisez.html'}
    ]
  },
  {
    model: 'besoinsSocial',
    titleDefault: 'Vous avez besoin d\'aide pour votre vie sociale :',
    titleRep: '<%= pronoun %> a besoin d\'aide pour sa vie sociale :',
    answers: [
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
    model: 'besoinsLieuDeVie',
    titleDefault: 'Vous avez besoin d\'aide pour adapter votre environnement :',
    titleRep: '<%= pronoun %> a besoin d\'aide pour adapter son environnement :',
    answers: [
      {
        labelDefault: 'Pour vous équiper d\'un matériel spécifique',
        labelRep: 'Pour s\'équiper d\'un matériel spécifique',
        model: 'materiel'
      },
      {labelDefault: 'Pour adapter le véhicule pour pouvoir conduire', model: 'conduite', 'onlyAdult': true},
      {
        labelDefault: 'Pour aménager votre lieu de vie',
        labelRep: 'Pour aménager son lieu de vie',
        model: 'amenagement'
      },
      {labelDefault: 'Autre besoin', model: 'autre', detailModel: 'besoinsLieuDeVie_autre', detailUrl: 'components/detail/precisez.html'}
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
    model: 'structures',
    titleDefault: 'Avez-vous déjà identifié une ou plusieurs structures qui pourraient répondre à vos attentes?',
    type: 'checkbox'
  },
  {
    model: 'autresRenseignements',
    titleDefault: 'Autres renseignements que vous souhaiteriez nous communiquer',
    type: 'checkbox'
  }
]);
