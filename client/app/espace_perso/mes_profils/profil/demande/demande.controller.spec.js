'use strict';

describe('Controller: demande', function() {
  let RequestService = {
    getCompletion() {
      return true;
    },

    postAction() {
      return {
        then() {
          return true;
        }
      };
    }
  };

  let toastr = {
    error() {}
  };

  let request = {
    user: 'userId',
    prestations: [],
    status: 'en_cours',
    $update() {}
  };

  let currentUser = {};

  let prestations = [
    {
      id: 'cartestationnement',
      type: 'carte',
      label: 'Carte stationnement',
      title: 'Carte de stationnement',
      description: 'La carte européenne de stationnement permet à son titulaire ou à la personne qui l\'accompagne de stationner sur les places réservées aux personnes handicapées.',
      link: 'http://vosdroits.service-public.fr/particuliers/F2891.xhtml'
    },
    {
      id: 'carteinvalidite',
      type: 'carte',
      label: 'Carte d\'invalidité ou de priorité',
      title: 'Carte d\'invalidité ou de priorité',
      description: 'La carte d\'invalidité civile a pour but d\'attester que son détenteur est handicapé et permet de bénéficier de certains droits spécifiques, notamment dans les transports. La carte de priorité permet d\'obtenir un droit de priorité pour l\'accès aux bureaux et guichets des administrations et services publics et aux transports publics.',
      link: 'http://vosdroits.service-public.fr/particuliers/F2446.xhtml'
    },
  ];

  // load the service's module
  beforeEach(module('impactApp'));

  it('should select the right prestations', function() {
    //given
    var $scope = {};

    //when
    inject(function($controller) {
      $controller('DemandeCtrl', {
        $state: {
          go() {}
        },

        $scope,
        currentUser,
        prestations,
        request,
        RequestService,
        toastr
      });
    });

    prestations[0].choice = true;
    prestations[1].choice = true;
    prestations[1].renouvellement = true;
    $scope.submit({$valid: true});

    //then
    expect($scope.request.renouvellements[0]).toEqual('carteinvalidite');
    expect($scope.request.prestations[0]).toEqual('cartestationnement');

  });

});
