'use strict';

angular.module('impactApp').controller('ProfilCtrl', function($scope, ProfileResource, currentUser, profileId) {
  $scope.profile = ProfileResource.get({userId: currentUser._id, id: profileId});

  $scope.options = {
    identites: {
      beneficiaire: {
        title: 'Bénéficiaire',
        subhead: 'Section incomplète',
        icon: 'fa-user'
      },

      autorite: {
        title: 'Autorité parentale',
        content: 'Autorité parentale ou délégation d\'autorité, obligatoire si le bénéficiaire est mineur.',
        subhead: 'Section incomplète',
        icon: 'fa-users'
      }
    },

    projet: {
      vieQuotidienne: {
        title: 'Vie quotidienne',
        content: '',
        subhead: 'Section incomplète',
        icon: 'fa-home'
      },

      vieScolaire: {
        title: 'Vie scolaire',
        content: '',
        subhead: 'Section incomplète',
        icon: 'fa-university'
      },

      vieTravail: {
        title: 'Vie au travail',
        content: '',
        subhead: 'Section incomplète',
        icon: 'fa-industry'
      }
    },

    autre: {
      aidant: {
        title: 'Vie de votre aidant familial',
        subhead: 'Section incomplète',
        content: 'Si votre aidant familial (la personne qui s\'occupe de vous au quotidien) souhaite exprimer sa situation et ses besoins.',
        icon: 'fa-male'
      },
      particulieres: {
        title: 'Situations particulières',
        subhead: 'Section incomplète',
        content: 'Si vous vous trouvez dans une situation nécessitant une attention particulière.',
        icon: 'fa-warning'
      }
    }
  };
});
