'use strict';

angular.module('impactApp').controller('ProfilCtrl', function($scope, profile) {
  $scope.profile = profile;

  $scope.options = {
    identites: {
      beneficiaire: {
        title: 'Bénéficiaire',
        subhead: 'Section incomplète',
        icon: 'fa-user',
        action: {
          label: 'Modifier',
          sref: 'espace_perso.mes_profils.profil.beneficiaire'
        }
      },

      autorite: {
        title: 'Autorité parentale',
        content: 'Autorité parentale ou délégation d\'autorité, obligatoire si le bénéficiaire est mineur.',
        subhead: 'Section incomplète',
        icon: 'fa-users',
        action: {
          label: 'Modifier',
          sref: '.' // TODO
        }
      }
    },

    projet: {
      vieQuotidienne: {
        title: 'Vie quotidienne',
        content: '',
        subhead: 'Section incomplète',
        icon: 'fa-home',
        action: {
          label: 'Modifier',
          sref: '.' // TODO
        }
      },

      vieScolaire: {
        title: 'Vie scolaire',
        content: '',
        subhead: 'Section incomplète',
        icon: 'fa-university',
        action: {
          label: 'Modifier',
          sref: '.' // TODO
        }
      },

      vieTravail: {
        title: 'Vie au travail',
        content: '',
        subhead: 'Section incomplète',
        icon: 'fa-industry',
        action: {
          label: 'Modifier',
          sref: '.' // TODO
        }
      }
    },

    autre: {
      aidant: {
        title: 'Vie de votre aidant familial',
        subhead: 'Section incomplète',
        content: 'Si votre aidant familial (la personne qui s\'occupe de vous au quotidien) souhaite exprimer sa situation et ses besoins.',
        icon: 'fa-male',
        action: {
          label: 'Modifier',
          sref: '.' // TODO
        }
      },
      particulieres: {
        title: 'Situations particulières',
        subhead: 'Section incomplète',
        content: 'Si vous vous trouvez dans une situation nécessitant une attention particulière.',
        icon: 'fa-warning',
        action: {
          label: 'Modifier',
          sref: '.' // TODO
        }
      }
    },

    nouvelleDemande: {
      title: 'Nouvelle demande',
      subhead: 'Envoyez une nouvelle demande à votre MDPH',
      action: 'Commencer',
      icon: 'fa-envelope',
      class: 'nouvelle-demande',
      action: {
        label: 'Modifier',
        sref: '.' // TODO
      }
    }
  };
});
