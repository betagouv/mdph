'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('contexte', [
  {
    model: 'estRepresentant',
    titleDefault: 'Pour qui faites vous cette demande ?',
    type: 'radio',
    answers: [
      {
        label: 'Pour vous',
        value: false,
        documents: [{category: 'obligatoire', id: 'carteIdentite'}]
      },
      {
        label: 'Pour une autre personne',
        value: true,
        detailUrl: 'components/detail/personne.html',
        documents: [{category: 'obligatoire', id: 'carteIdentite'}, {category: 'obligatoire', id: 'carteIdentiteRepresentant'}]
      }
    ]
  },
  {
    model: 'consentement',
    titleRep: 'Quelle est votre relation avec <%= name %> ?',
    type: 'radio',
    answers: [
      {
        label: 'Vous êtes son représentant légal',
        value: 'representantLegal'
      },
      {
        label: 'Vous êtes son tuteur',
        value: 'tuteur'
      },
      {
        label: 'Vous êtes un ami, proche, curateur, établissement de santé, etc.',
        value: 'autre',
        detailModel: 'consentementDetail',
        detailUrl: 'components/detail/consentement.html'
      }
    ]
  },
  {
    model: 'mdph',
    titleDefault: 'Quelle est votre Mdph ?',
    titleRep: 'Quelle est la Mdph de <%= name %> ?',
    type: 'mdph'
  },
  {
    model: 'nouveauDossier',
    titleDefault: 'Est-ce votre premier dossier ?',
    titleRep: 'Est-ce son premier dossier ?',
    type: 'radio',
    answers: [
      {
        label: 'Oui',
        value: true
      },
      {
        label: 'Non',
        value: false
      }
    ]
  },
  {
    model: 'raisonRenouvellement',
    type: 'radio',
    titleDefault: 'Si il eu un changement dans votre situation ?',
    titleRep: 'Y-a-t-il eu un changement dans sa situation ?',
    answers: [
      {
        label: 'Oui',
        value: true
      },
      {
        label: 'Non',
        value: false
      }
    ]
  },
  {
    model: 'dateNaissance',
    type: 'date',
    neededForAdmin: true,
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
        label: 'Vous n\'arrivez plus à vivre chez vous',
        labelRep: '<%= pronoun %> n\'arrive plus à vivre à domicile',
        model: 'domicile',
        detail: true,
        detailModel: 'domicileDetail',
        detailUrl: 'components/detail/precisez_big.html',
        placeholder: 'Expliquez la difficulté'
      },
      {
        label: 'Votre établissement ne peut plus vous accueillir et vous ne pouvez pas retourner chez vous',
        labelRep: 'Son établissement ne peut plus l\'accueillir et <%= pronoun %> ne peut pas retourner chez <%= pronounTonic %>',
        model: 'etablissement',
        detail: true,
        detailModel: 'etablissementDetail',
        detailUrl: 'components/detail/precisez_big.html',
        placeholder: 'Expliquez la difficulté'
      },
      {
        label: 'Votre école ne peut plus vous accueillir',
        labelRep: 'Son école ne peut plus l\'accueillir',
        detail: true,
        detailModel: 'ecoleDetail',
        detailUrl: 'components/detail/precisez_big.html',
        placeholder: 'Expliquez la difficulté',
        model: 'ecole'
      },
      {
        label: 'Vous risquez de perdre votre travail',
        labelRep: '<%= pronoun %> risque de perdre son travail',
        detail: true,
        detailModel: 'travailDetail',
        detailUrl: 'components/detail/precisez_big.html',
        placeholder: 'Expliquez la difficulté',
        model: 'travail',
        onlyAdult: true
      },
      {
        label: 'Vous commencez bientôt une nouvelle formation',
        labelRep: '<%= pronoun %> commence bientôt une nouvelle formation',
        detailModel: 'formationDetail',
        detailUrl: 'components/detail/precisez_date.html',
        detailLabel: 'Date d\'entrée prévue',
        model: 'formation',
        onlyAdult: true
      }
    ]
  },
  {
    model: 'connaisTaux',
    titleDefault: 'Connaissez-vous votre taux d\'incapacité antérieur ?',
    titleRep: 'Connaissez-vous son taux d\'incapacité antérieur ?',
    answers: [
    {
      label: 'Oui',
      value: true,
      detailLabel: 'Taux',
      detailUrl: 'components/detail/precisez_pourcent.html',
      detailModel: 'tauxIncapacite'
    },
    {
      label: 'Non',
      value: false
    }
  ]},
  {
    model: 'contestationTaux',
    titleDefault: 'Que pensez-vous de votre situation par rapport à ce taux ?',
    titleRep: 'Que pensez-vous de sa situation par rapport à ce taux ?',
    answers: [
    {
      label: 'Votre situation est stable',
      labelRep: 'Sa situation est stable',
      value: 'stable'
    },
    {
      label: 'Votre situation s\'aggrave',
      labelRep: 'Sa situation s\'aggrave',
      value: 'aggrave'
    },
    {
      label: 'Votre situation s\'améliore',
      labelRep: 'Sa situation s\'améliore',
      value: 'ameliore'
    }
  ]}
]);
