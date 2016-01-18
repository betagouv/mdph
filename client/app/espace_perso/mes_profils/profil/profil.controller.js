'use strict';

angular.module('impactApp').controller('ProfilCtrl', function($scope, profile, estAdulte) {
  $scope.profile = profile;
  $scope.estAdulte = estAdulte;

  $scope.options = {
    identites: {
      beneficiaire: {
        title: 'Bénéficiaire',
        content: 'Identité de la personne concernée par la demande.',
        icon: 'fa-user',
        action: {
          label: 'Modifier',
          sref: 'espace_perso.mes_profils.profil.beneficiaire'
        }
      },

      autorite: {
        title: 'Autorité parentale',
        content: 'Autorité parentale ou délégation d\'autorité.',
        icon: 'fa-users',
        action: {
          label: 'Modifier',
          sref: 'espace_perso.mes_profils.profil.autorite'
        }
      },

      autre: {
        title: 'Personne vous aidant dans cette démarche',
        content: 'Si vous êtes accompagnés dans votre démarche auprès de votre MDPH par un proche, une association, un enseignant référent ou autre.',
        icon: 'fa-users',
        action: {
          label: 'Modifier',
          sref: 'espace_perso.mes_profils.profil.autre'
        }
      }
    },

    projet: {
      vieQuotidienne: {
        title: 'Vie quotidienne',
        content: '',
        icon: 'fa-home',
        action: {
          label: 'Modifier',
          sref: 'espace_perso.mes_profils.profil.vie_quotidienne'
        }
      },

      vieScolaire: {
        title: 'Vie scolaire',
        content: '',
        icon: 'fa-university',
        action: {
          label: 'Modifier',
          sref: 'espace_perso.mes_profils.profil.vie_scolaire'
        }
      },

      vieTravail: {
        title: 'Vie au travail',
        content: '',
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
        content: 'Si votre aidant familial (la personne qui s\'occupe de vous au quotidien) souhaite exprimer sa situation et ses besoins.',
        icon: 'fa-male',
        action: {
          label: 'Modifier',
          sref: '.' // TODO
        }
      },
      particulieres: {
        title: 'Situations particulières',
        content: 'Si vous vous trouvez dans une situation nécessitant une attention particulière.',
        icon: 'fa-warning',
        action: {
          label: 'Modifier',
          sref: '.' // TODO
        }
      }
    }
  };
});
