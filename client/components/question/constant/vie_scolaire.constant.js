'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('vieScolaire', [
  {
    model: 'condition',
    titleDefault: 'Etes-vous actuellement scolarisé ?',
    titleRep: 'Est-<%= pronoun %> actuellement scolarisé<%= fem %> ?',
    type: 'radio',
    'answers': [
      {
        'label': 'Oui',
        'value': true
      },
      {
        'label': 'Non',
        'value': false
      }
    ]
  },
  {
    model: 'raisonNonScolaire',
    titleDefault: 'Pourquoi n\'êtes vous pas scolarisé ?',
    titleRep: 'Pourquoi n\'est-<%= pronoun %> pas scolarisé<%= fem %> ?',
    type: 'radio',
    answers: [
      {
        label: 'Vous êtes trop jeune',
        labelRep: '<%= pronoun %> est trop jeune',
        value: 'tropJeune',

        detailModel: 'raisonNonScolaireTropJeune',
        placeholder: 'A partir de quand sera-t-<%= pronoun %> scolarisé<%= fem %> ?',
        detailUrl: 'components/detail/precisez.html'
      },
      {
        label: 'Vous ne trouvez pas de solution d\'accueil en établissement scolaire, universitaire, ou médico-social',
        labelRep: '<%= pronoun %> ne trouve pas de solution d\'accueil en établissement scolaire, universitaire, ou médico-social',
        value: 'etablissement',

        detailModel: 'raisonNonScolaireEtablissement',
        detailUrl: 'components/detail/precisez_big.html'
      },
      {
        label: 'Autre',
        value: 'autre',

        detailModel: 'raisonNonScolaireAutre',
        detailUrl: 'components/detail/precisez.html'
      }
    ]
  },
  {
    model: 'vieScolaireAutresRenseignements',
    titleDefault: 'Autres renseignements concernant la scolarité que vous souhaiteriez nous communiquer',
    type: 'text'
  },
  {
    model: 'vieScolaireType',
    titleDefault: 'Où êtes-vous scolarisé ?',
    titleRep: 'Où est-<%= pronoun %> scolarisé<%= fem %> ?',
    type: 'radio',
    answers: [
      {
        label: 'En milieu ordinaire',
        value: 'ordinaire'
      },
      {
        label: 'A domicile',
        value: 'domicile'
      },
      {
        label: 'En internat',
        value: 'internat',

        detailUrl: 'components/detail/precisez_yes_no.html',
        detailModel: 'vieScolaireTypeInternat',
        detailLabel: 'Les frais de séjour sont-ils intégralement pris en charge par l\'assurance maladie, l\'Etat ou l\'aide sociale ?'
      },
      {
        label: 'Avec accompagnement par un établissement médico-social',
        value: 'etablissement'
      },
      {
        label: 'En temps partagé entre l’établissement médico-social et le milieu ordinaire ou domicile',
        value: 'etablissementPartiel',
      },
      {
        label: 'En formation supérieure',
        value: 'superieur',
      },
      {
        label: 'Autre',
        value: 'autre',
        detailUrl: 'components/detail/precisez.html',
        detailModel: 'vieScolaireAutre'
      }
    ]
  },
  {
    model: 'etablissement',
    titleDefault: 'Dans quel(s) établissement(s) ?',
    type:'text'
  }
]);
