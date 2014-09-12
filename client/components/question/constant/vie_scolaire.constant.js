'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('vieScolaire', [
  {
    model: 'condition',
    titleDefault: 'Etes-vous actuellement scolarisé ?',
    titleRep: 'Est-<%= pronoun %> actuellement scolarisé<%= fem %> ?',
    'answers': [
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
    model: 'raisonNonScolaire',
    titleDefault: 'Pourquoi n\'êtes vous pas scolarisé ?',
    titleRep: 'Pourquoi n\'est-<%= pronoun %> pas scolarisé<%= fem %> ?',
    answers: [
      {
        labelDefault: 'Vous êtes trop jeune',
        labelRep: '<%= pronoun %> est trop jeune',
        value: 'tropJeune',

        detailModel: 'raisonNonScolaireTropJeune',
        placeholder: 'A partir de quand ?',
        detailUrl: 'components/detail/precisez.html'
      },
      {
        labelDefault: 'Vous ne trouvez pas solution d\'accueil en établissement scolaire, universitaire, ou médico-social',
        labelRep: '<%= pronoun %> ne trouve pas solution d\'accueil en établissement',
        value: 'etablissement',

        detailModel: 'raisonNonScolaireEtablissement',
        detailUrl: 'components/detail/precisez_big.html'
      },
      {
        labelDefault: 'Autre',
        value: 'autre',

        detailModel: 'raisonNonScolaireAutre',
        detailUrl: 'components/detail/precisez.html'
      }
    ]
  },
  {
    model: 'vieScolaireAutresRenseignements',
    titleDefault: 'Autres renseignements concernant la scolarité que vous souhaiteriez nous communiquer'
  },
  {
    model: 'vieScolaireType',
    titleDefault: 'Où êtes-vous scolarisé ?',
    titleRep: 'Où est-<%= pronoun %> scolarisé<%= fem %> ?',
    answers: [
      {
        labelDefault: 'En milieu ordinaire',
        value: 'ordinaire'
      },
      {
        labelDefault: 'A domicile',
        value: 'domicile'
      },
      {
        labelDefault: 'En internat',
        value: 'internat',

        detailUrl: 'components/detail/precisez_yes_no.html',
        detailModel: 'vieScolaireTypeInternat',
        detailLabel: 'Les frais de séjours sont-ils intégralement pris en charge par l\'assurance maladie, l\'Etat ou l\'aide sociale?'
      },
      {
        labelDefault: 'Avec accompagnement par un établissement médico-social',
        value: 'etablissement'
      },
      {
        labelDefault: 'En temps partagé entre l’établissement médico-social et le milieu ordinaire ou domicile',
        value: 'etablissementPartiel',
      },
      {
        labelDefault: 'En formation supérieure',
        value: 'superieur',
      },
      {
        labelDefault: 'Autre',
        value: 'autre',
        detailUrl: 'components/detail/precisez.html',
        detailModel: 'vieScolaireAutre'
      }
    ]
  },
  {
    model: 'etablissement',
    titleDefault: 'Dans quel(s) établissement(s) ?'
  }
]);
