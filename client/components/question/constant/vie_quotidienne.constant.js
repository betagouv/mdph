'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('vieQuotidienne', [
  {
    model: 'famille',
    neededForAdmin: true,
    titleDefault: 'Avec qui vivez-vous ?',
    titleRep: 'Avec qui vit-t-<%= pronoun %> ?',
    type: 'radio',
    answers: [
      {
        label: 'Avec vos parents',
        labelRecap: 'Avec ses parents',
        labelRep: 'Avec ses parents',
        value: 'parents'
      },
      {
        label: 'Seul(e)',
        labelRepMasc: 'Seul',
        labelRepFem: 'Seule',
        value: 'seul'
      },
      {
        label: 'En couple',
        value: 'couple',
        onlyAdult: true
      },
      {
        label: 'Avec vos enfants (ou l\'un d\'entre eux)',
        labelRep: 'Avec ses enfants (ou l\'un d\'entre eux)',
        value: 'enfants',
        onlyAdult: true
      },
      {
        label: 'Vous vivez dans un établissement',
        labelRep: '<%= pronoun %> vit dans un établissement',
        labelRecap: 'En établissement',
        value: 'etablissement',
        detailUrl: 'components/detail/precisez_big.html',
        detailModel: 'logement_etablissement',
        placeholder: 'Nom de l\'établissement, type et lieu',
        documents: [{category: 'sante', id: 'bilanAccompagnementEnfant'}]
      },
      {
        label: 'Autre',
        value: 'autre',
        detailModel: 'famille_autre',
        detailUrl: 'components/detail/precisez.html'
      }
    ]
  },
  {
    model: 'logement',
    neededForAdmin: true,
    titleDefault: 'Votre logement',
    titleRep: 'Votre logement',
    type: 'radio',
    answers: [
      {
        label: 'Vous avez un logement indépendant',
        labelRep: '<%= pronoun %> a un logement indépendant',
        value: 'independant', // TODO a verifier onlyAdult: true,
        detailUrl: 'components/detail/independant.html',
        detailModel: 'logement_independant'
      },
      {
        label: 'Vous êtes hébergé(e) au domicile',
        labelRep: '<%= pronoun %> est hébergé<%= fem %> au domicile',
        value: 'domicile',
        detailUrl: 'components/detail/domicile.html',
        detailModel: 'logement_domicile'
      },
      {
        label: 'Autre',
        value: 'autre',
        detailUrl: 'components/detail/precisez.html',
        detailModel: 'logement_autre'
      }
    ]
  },
  {
    model: 'besoinsVie',
    neededForAdmin: true,
    titleDefault: 'Vous avez besoin d\'aide dans votre vie quotidienne :',
    titleRep: '<%= pronoun %> a besoin d\'aide dans sa vie quotidienne :',
    type: 'checkbox',
    answers: [
      {
        label: 'Pour faire face aux dépenses courantes (loyer, énergie, habillement, alimentation, ...)',
        model: 'courant',
        onlyAdult: true
      },
      {label: 'Pour gérer votre budget et répondre à vos obligations (assurances, impôts... )', model: 'budget', onlyAdult: true},
      {
        label: 'Pour l\'hygiène corporelle (se laver, aller aux toilette)',
        model: 'hygiene'
      },
      {
        label: 'Pour vous habiller (mettre et ôter vos vêtements, les choisir ....)',
        labelRep: 'Pour s\'habiller (mettre et ôter ses vêtements, les choisir ....)',
        model: 'habits'
      },
      {label: 'Pour faire les courses', model: 'courses'},
      {label: 'Pour préparer les repas', model: 'cuisine', onlyAdult: true},
      {label: 'Pour prendre les repas', model: 'repas'},
      {label: 'Pour faire le ménage et l\'entretien des vêtements', model: 'menage', onlyAdult: true},
      {
        label: 'Pour prendre soin de votre santé (suivre un traitement, aller en consultation... )',
        labelRep: 'Pour prendre soin de sa santé (suivre un traitement, aller en consultation... )',
        model: 'sante'
      },
      {label: 'Autre besoin', model: 'autre', detailModel: 'besoinsVie_autre', detailUrl: 'components/detail/precisez.html'}
    ]
  },
  {
    model: 'besoinsDeplacement',
    neededForAdmin: true,
    titleDefault: 'Vous avez besoin d\'aide pour vous déplacer :',
    titleRep: 'Elle a besoin d\'aide pour se déplacer :',
    type: 'checkbox',
    answers:[
      {label: 'Pour se déplacer à l\'intérieur du domicile', model: 'intraDomicile'},
      {label: 'Pour sortir du domicile et y accéder', model: 'accesDomicile'},
      {label: 'Pour se déplacer à l\'extérieur du domicile', model: 'public'},
      {label: 'Pour utiliser un véhicule', model: 'conduite'},
      {label: 'Pour utiliser les transports en commun', model: 'transports'},
      {label: 'Pour partir en vacances', model: 'vacances'},
      {label: 'Autre besoin', model: 'autre', detailModel: 'besoinsDeplacement_autre', detailUrl: 'components/detail/precisez.html'}
    ]
  },
  {
    model: 'besoinsSocial',
    neededForAdmin: true,
    type: 'checkbox',
    titleDefault: 'Vous avez besoin d\'aide pour votre vie sociale :',
    titleRep: '<%= pronoun %> a besoin d\'aide pour sa vie sociale :',
    answers: [
      { label: 'Pour communiquer (s\'exprimer, se faire comprendre)', model: 'communication' },
      { label: 'Pour avoir des activités culturelles, sportives et de loisirs', model: 'loisirs' },
      {
        label: 'Pour les relations avec les autres',
        model: 'proches'
      },
      {
        label: 'Pour vous occuper de votre famille',
        labelRep: 'Pour s\'occuper de sa famille',
        model: 'famille', 'onlyAdult': true
      },
      {
        label: 'Pour vous accompagner dans votre vie citoyenne (ex: aller voter, vie associative ...)',
        labelRep: 'Pour se faire accompagner dans sa vie citoyenne (ex: aller voter, vie associative ...)',
        model: 'citoyen', 'onlyAdult': true
      },
      {
        label: 'Pour assurer votre sécurité',
        labelRep: 'Pour assurer sa sécurité',
        model: 'securite'
      },
      { label: 'Autre besoin', model: 'autre', detailModel: 'besoinsSocial_autre', detailUrl: 'components/detail/precisez.html' }
    ]
  },
  {
    model: 'besoinsLieuDeVie',
    neededForAdmin: true,
    type: 'checkbox',
    titleDefault: 'Vous avez besoin d\'aide pour adapter votre environnement :',
    titleRep: '<%= pronoun %> a besoin d\'aide pour adapter son environnement :',
    answers: [
      {
        label: 'Pour vous équiper d\'un matériel spécifique',
        labelRep: 'Pour s\'équiper d\'un matériel spécifique',
        model: 'materiel'
      },
      {label: 'Pour adapter le véhicule pour pouvoir conduire ou être transporté', model: 'conduite', 'onlyAdult': true},
      {
        label: 'Pour aménager votre lieu de vie',
        labelRep: 'Pour aménager son lieu de vie',
        model: 'amenagement'
      },
      {label: 'Autre besoin', model: 'autre', detailModel: 'besoinsLieuDeVie_autre', detailUrl: 'components/detail/precisez.html'}
    ]
  },
  {
    model: 'attentesTypeAide',
    neededForAdmin: true,
    type: 'checkbox',
    titleDefault: 'Quelles sont vos attentes pour compenser votre handicap ?',
    titleRep: 'Quelles sont ses attentes pour compenser son handicap ?',
    answers:
    [
      {label: 'Vivre à domicile', model: 'domicile'},
      {label: 'Une aide technique, du matériel ou équipement', model: 'materiel'},
      {label: 'Vivre en établissement', model: 'etablissement'},
      {
        label: 'Une aide financière, afin de vous assurer un revenu minimum',
        labelRep: 'Une aide financière, afin de lui assurer un revenu minimum',
        model: 'financierMinimum'
      },
      {
        label: 'Un aménagement de votre lieu de vie',
        labelRep: 'Un aménagement de son lieu de vie',
        model: 'amenagement'
      },
      {
        label: 'Une aide financière pour des dépenses liées à votre handicap',
        labelRep: 'Une aide financière pour des dépenses liées à son handicap',
        model: 'financierHandicap'
      },
      {
        label: 'Une aide humaine, avec quelqu\'un qui vous aide',
        labelRep: 'Une aide humaine, avec quelqu\'un qui l\'aide',
        model: 'humain'
      },
      {label: 'Une aide à la mobilité', model: 'mobilite'},
      {label: 'Autre attente', model: 'autre', detailModel: 'attentesTypeAide_autre', detailUrl: 'components/detail/precisez.html'}
    ]
  },
  {
    model: 'structures',
    titleDefault: 'Avez-vous déjà identifié une ou plusieurs structures qui pourraient répondre à vos attentes ?',
    type: 'checkbox'
  },
  {
    model: 'autresRenseignements',
    titleDefault: 'Autres renseignements que vous souhaiteriez nous communiquer',
    type: 'checkbox'
  }
]);
