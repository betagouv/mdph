'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('contexte', [
  {
    model: 'estRepresentant',
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
        documents: [{category: 'obligatoire', id: 'carteIdentite'}, {category: 'obligatoire', id: 'carteIdentiteRepresentant'}]
      }
    ]
  },
  {
    model: 'mdph',
    titleDefault: 'Quelle est votre Mdph ?',
    titleRep: 'Quelle est la Mdph de <%= name %>?',
    type: 'text'
  },
  {
    model: 'nouveauDossier',
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
    model: 'raison',
    type: 'radio',
    titleDefault: 'Y-a-t-il un changement dans votre situation ?',
    titleRep: 'Y-a-t-il un changement dans sa situation ?',
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
        detailModel: 'domicileDetail',
        detailUrl: 'components/detail/precisez_big.html',
        placeholder: 'Expliquez la difficulté'
      },
      {
        labelDefault: 'Votre établissement ne peut plus vous accueillir et vous ne pouvez pas retourner chez vous',
        labelRep: 'Son établissement ne peut plus l\'accueillir et <%= pronoun %> ne peut pas retourner chez <%= pronounTonic %>',
        model: 'etablissement',
        detail: true,
        detailModel: 'etablissementDetail',
        detailUrl: 'components/detail/precisez_big.html',
        placeholder: 'Expliquez la difficulté'
      },
      {
        labelDefault: 'Votre école ne peut plus vous accueillir',
        labelRep: 'Son école ne peut plus l\'accueillir',
        detail: true,
        detailModel: 'ecoleDetail',
        detailUrl: 'components/detail/precisez_big.html',
        placeholder: 'Expliquez la difficulté',
        model: 'ecole'
      },
      {
        labelDefault: 'Vous risquez de perdre votre travail',
        labelRep: '<%= pronoun %> risque de perdre son travail',
        detail: true,
        detailModel: 'travailDetail',
        detailUrl: 'components/detail/precisez_big.html',
        placeholder: 'Expliquez la difficulté',
        model: 'travail'
      },
      {
        labelDefault: 'Vous commencez bientôt une nouvelle formation',
        labelRep: '<%= pronoun %> commence bientôt une nouvelle formation',
        detailModel: 'formationDetail',
        detailUrl: 'components/detail/precisez_date.html',
        detailLabel: 'Date d\'entrée prévue',
        model: 'formation'
      }
    ]
  },
  {
    model: 'connaisTaux',
    titleDefault: 'Connaissez-vous votre taux d\'incapacité antérieur ?',
    titleRep: 'Connaissez-vous son taux d\'incapacité antérieur ?',
    answers: [
    {
      labelDefault: 'Oui',
      value: true,
      detailLabel: 'Taux',
      detailUrl: 'components/detail/precisez_pourcent.html',
      detailModel: 'tauxIncapacite'
    },
    {
      labelDefault: 'Non',
      value: false
    }
  ]},
  {
    model: 'contestationTaux',
    titleDefault: 'Que pensez-vous de votre situation par rapport à ce taux ?',
    titleRep: 'Que pensez-vous de sa situation par rapport à ce taux ?',
    answers: [
    {
      labelDefault: 'Votre situation est stable',
      labelRep: 'Sa situation est stable',
      value: 'stable'
    },
    {
      labelDefault: 'Votre situation s\'aggrave',
      labelRep: 'Sa situation s\'aggrave',
      value: 'aggrave'
    },
    {
      labelDefault: 'Votre situation s\'améliore',
      labelRep: 'Sa situation s\'améliore',
      value: 'ameliore'
    }
  ]}
]);
