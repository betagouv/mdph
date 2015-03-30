'use strict';

/* jshint multistr: true */

module.exports = [
  {
    model: 'urgences',
    titleDefault: 'Vous trouvez-vous dans une des situations suivantes ?',
    titleRep: 'Se trouve-t-il dans une des situations suivantes ?',
    answers:
    [
      {
        label: 'Vous arrivez dans moins de 2 mois à la fin de vos droits (ex: AEEH, AAH, PCH, RQTH, ...)',
        labelRep: '<%= pronoun %> arrive dans moins de 2 mois à la fin de ses droits (ex: AEEH, AAH, PCH, RQTH, ...)',
        model: 'finDroit',
        detail: true,
        detailModel: 'finDroitDetail',
        detailUrl: 'components/detail/precisez.html',
        placeholder: 'Expliquez la difficulté'
      },
      {
        label: 'Vous n\'arrivez plus à vivre chez vous',
        labelRep: '<%= pronoun %> n\'arrive plus à vivre à domicile',
        model: 'domicile',
        detail: true,
        detailModel: 'domicileDetail',
        detailUrl: 'components/detail/precisez.html',
        placeholder: 'Expliquez la difficulté'
      },
      {
        label: 'Votre établissement ne peut plus vous accueillir et vous ne pouvez pas retourner chez vous',
        labelRep: 'Son établissement ne peut plus l\'accueillir et <%= pronoun %> ne peut pas retourner chez <%= pronounTonic %>',
        model: 'etablissement',
        detail: true,
        detailModel: 'etablissementDetail',
        detailUrl: 'components/detail/precisez.html',
        placeholder: 'Expliquez la difficulté'
      },
      {
        label: 'Vous sortez d\'hospitalisation et vous ne pouvez pas retourner chez vous' ,
        labelRep: '<%= pronoun %> sort d\'hospitalisation et ne peut pas retourner chez <%= pronounTonic %>',
        model: 'hospitalisation',
        detail: true,
        detailModel: 'hospitalisationDetail',
        detailUrl: 'components/detail/precisez.html',
        placeholder: 'Expliquez la difficulté'
      },
      {
        label: 'Votre école ne peut plus vous accueillir',
        labelRep: 'Son école ne peut plus l\'accueillir',
        detail: true,
        detailModel: 'ecoleDetail',
        detailUrl: 'components/detail/precisez.html',
        placeholder: 'Expliquez la difficulté',
        model: 'ecole'
      },
      {
        label: 'Vous risquez de perdre votre travail',
        labelRep: '<%= pronoun %> risque de perdre son travail',
        detail: true,
        detailModel: 'travailDetail',
        detailUrl: 'components/detail/precisez.html',
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
      },
      {
        label: 'Aucune des situations ne me correspond',
        labelRep: 'Aucune des situations ne lui correspond',
        model: 'aucun'
      }
    ]
  }
];
