'use strict';

/* global _ */

describe('Controller: Mes demandes', function () {

  // load the service's module
  beforeEach(module('impactApp'));

  it('should render initial data', function () {
    //given
    var scope = {};
    var userRequests= [
      {
        user: {name: 'toto'},
        steps: [
          {
            name: 'questionnaire',
            state: 'complet'
          },
          {
            name: 'obligatoire',
            state: 'valide'
          },
          {
            name: 'preevaluation',
            state: 'valide'
          },
          {
            name: 'complementaire',
            state: 'valide'
          },
          {
            name: 'evaluation',
            state: 'valide'
          }
        ]
      }
    ];

    //when
    inject(function($controller){
      $controller('RepartitionDemandesCtrl', {
        $scope: scope,
        userRequests: userRequests
      });
    });

    //then
    expect(scope.userRequests.length).toBe(1);

  });

  it('should filter data on name', function () {
    //given
    var scope = {};
    var userRequests= [
      {
        user: {name: 'toto'}
      },
      {
        user: {name: 'alice'}
      },
      {
        user: {name: 'Aristote'}
      }
    ];

    //when
    inject(function($controller){
      $controller('RepartitionDemandesCtrl', {
        $scope: scope,
        userRequests: userRequests
      });
    });
    scope.query = 'tot';

    var result = _.map(userRequests, function(request) {
      return scope.filtres(request);
    });

    //then
    expect(result).toEqual([true, false, true]);

  });

  it('should filter data on steps', function () {
    //given
    var scope = {};
    var userRequests= [
      {
        user: {name: 'toto'},
        steps: [
          {
            name: 'questionnaire',
            state: 'complet'
          }
        ]

      },
      {
        user: {name: 'alice'},
        steps: [
          {
            name: 'questionnaire',
            state: 'complet'
          },
          {
            name: 'obligatoire',
            state: 'valide'
          }
        ]
      },
      {
        user: {name: 'Aristote'},
        steps: []
      }
    ];

    //when
    inject(function($controller){
      $controller('RepartitionDemandesCtrl', {
        $scope: scope,
        userRequests: userRequests
      });
    });
    scope.selectedFilters = {
      'obligatoire': true
    };

    var result = _.map(userRequests, function(request) {
      return scope.filtres(request);
    });

    //then
    expect(result).toEqual([false, true, false]);

  });

});
