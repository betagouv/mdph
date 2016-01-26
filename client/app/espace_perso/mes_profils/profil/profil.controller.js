'use strict';

angular.module('impactApp').controller('ProfilCtrl', function($scope, $state, User, ProfileService, RequestResource, currentUser, profile, requests, estAdulte) {
  $scope.profile = profile;
  $scope.estAdulte = ProfileService.estAdulte(profile);
  $scope.requests = requests;

  $scope.nouvelleDemande = function() {
    var formAnswers = _.pick(profile, 'identites', 'vie_quotidienne', 'vie_scolaire', 'vie_au_travail', 'aidant', 'situations_particulieres');
    new RequestResource({profile: profile._id, user: currentUser._id, formAnswers: formAnswers}).$save(function(saved) {
      $scope.requests.push(saved);
      $state.go('.demande', {shortId: saved.shortId});
    });
  };

  $scope.options = {
    identites: {
      beneficiaire: {
        title: 'Bénéficiaire',
        content: 'Identité de la personne concernée par la demande.',
        icon: 'fa-user',
        model: 'identites.beneficiaire',
        action: {
          label: 'Modifier',
          sref: 'espace_perso.mes_profils.profil.beneficiaire'
        }
      },

      autorite: {
        title: 'Autorité parentale',
        content: 'Autorité parentale ou délégation d\'autorité.',
        icon: 'fa-users',
        model: 'identites.autorite',
        action: {
          label: 'Modifier',
          sref: 'espace_perso.mes_profils.profil.autorite'
        }
      },

      autre: {
        title: 'Personne vous aidant dans cette démarche',
        content: 'Si vous êtes accompagnés dans votre démarche auprès de votre MDPH.',
        model: 'identites.autre',
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
        model: 'vie_quotidienne',
        icon: 'fa-home',
        action: {
          label: 'Modifier',
          sref: 'espace_perso.mes_profils.profil.vie_quotidienne'
        }
      },

      vieScolaire: {
        title: 'Vie scolaire',
        content: '',
        model: 'vie_scolaire',
        icon: 'fa-university',
        action: {
          label: 'Modifier',
          sref: 'espace_perso.mes_profils.profil.vie_scolaire'
        }
      },

      vieTravail: {
        title: 'Vie au travail',
        content: '',
        model: 'vie_au_travail',
        icon: 'fa-industry',
        action: {
          label: 'Modifier',
          sref: 'espace_perso.mes_profils.profil.vie_au_travail'
        }
      }
    },

    autre: {
      aidant: {
        title: 'Vie de votre aidant familial',
        content: 'Si vous souhaitez exprimer des besoins en tant qu’aidant familial.',
        icon: 'fa-male',
        model: 'aidant',
        action: {
          label: 'Modifier',
          sref: 'espace_perso.mes_profils.profil.aidant.situation.nom_aidant'
        }
      },
      particulieres: {
        title: 'Situations particulières',
        content: 'Si vous vous trouvez dans une situation nécessitant une attention particulière.',
        model: 'situations_particulieres',
        icon: 'fa-warning',
        action: {
          label: 'Modifier',
          sref: 'espace_perso.mes_profils.profil.situations_particulieres'
        }
      }
    }
  };
});
